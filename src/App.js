import React, { Component } from 'react'
import 'normalize.css'
import './App.css'
import { Route } from 'react-router-dom'

import Header from './components/header/Header'
import Main from './components/Main'
import { CSSTransition, TransitionGroup } from 'react-transition-group'



import { queryAPI } from './services/api-services'
import { locationArray } from './services/locations'
import { characterArray, rickAndMortyCharacter } from './services/characters'
import { MainMenuCurrentSubMenuEnum } from './services/enums'



class App extends Component
{
  constructor(props)
  {
    super(props)

    this.state = {
      currentLocation: locationArray[1],
      currentLocationDetails: [],
      rickAndMortyCharacter: rickAndMortyCharacter,
      currentCharacter: characterArray[0],
      currentSubMenu: MainMenuCurrentSubMenuEnum.portal,
      currentMainMenuOpen: false,
      currentMenuDisplayArray: [1, 2, 3]
    }
  }

  mainMenuClick = () =>
  {
    this.setState((prevState) => ({
      currentMainMenuOpen: !prevState.currentMainMenuOpen
    }))
  }

  componentDidMount()
  {
    this.locationQuery(this.state.currentLocation.api_id)
  }

  locationQuery = async (api_id) =>
  {
    let queryResult = await queryAPI(`https://rickandmortyapi.com/api/location/${api_id}`)

    this.setState((prevState) => ({
      currentLocationDetails: queryResult
    }))
  }

  render()
  {
    return (
      <div>
        <Header />
        <TransitionGroup className='whole-app'>
          <CSSTransition in={true} appear={true} key={index} timeout={500} classNames='fade'>
            <Route exact path='/' component={() =>
              (
                <Main
                  currentLocation={this.state.currentLocation}
                  rickAndMortyCharacter={this.state.rickAndMortyCharacter}
                  currentCharacter={this.state.currentCharacter}
                  state={this.state}
                  mainMenuClick={this.mainMenuClick}
                />
              )} />
          </CSSTransition>
        </TransitionGroup>
      </div>
    )
  }
}

export default App
