import React, { Component } from 'react'
import 'normalize.css'
import './App.css'
import { Route } from 'react-router-dom'

import Header from './components/header/Header'
import Main from './components/Main'



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
      prevSubMenu: MainMenuCurrentSubMenuEnum.portal,
      currentSubMenu: MainMenuCurrentSubMenuEnum.portal,
      nextSubMenu: MainMenuCurrentSubMenuEnum.portal,
      currentMainMenuOpen: false,
      currentMenuDisplayArray: [[
        { name: 'Portal', click: this.mainMenuClick },
        { name: 'Trade', click: this.mainMenuClick },
        { name: 'Talk', click: this.mainMenuClick },
      ]]
    }
  }



  getButtonDetails = (subMenu) =>
  {
    switch (subMenu)
    {
      case MainMenuCurrentSubMenuEnum.portal:
        return (
          [[
            { name: 'Portal', click: this.mainMenuClick },
            { name: 'Trade', click: this.mainMenuClick },
            { name: 'Talk', click: this.mainMenuClick },
          ]].concat(
            locationArray.filter(location =>
              (location !== this.state.currentLocation)).map(location =>
                ([
                  { name: location.name, click: this.mainMenuClick },
                  { name: null, click: null },
                  { name: 'Fly', click: this.mainMenuClick }
                ])
              )
          )
        )

      default:
        break
    }
    return [[1], [2], [3], [4]]
  }

  mainMenuClick = () =>
  {
    if (this.state.currentMainMenuOpen)
    {
      this.setState(() => ({
        currentMainMenuOpen: false,
        currentMenuDisplayArray: [[
          { name: 'Portal', click: this.mainMenuClick },
          { name: 'Trade', click: this.mainMenuClick },
          { name: 'Talk', click: this.mainMenuClick },
        ]]
      }))
    }
    else
    {
      this.setState(() => ({
        currentMainMenuOpen: true,
        currentMenuDisplayArray: this.getButtonDetails(this.state.currentSubMenu)
      }))
    }

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

      </div>
    )
  }
}

export default App
