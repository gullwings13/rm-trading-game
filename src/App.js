import React, { Component } from 'react'
import './App.css'
import { Route } from 'react-router-dom'

import Header from './components/header/Header'
import Main from './components/Main'

import { queryAPI } from './services/api-services'
import { locationArray } from './services/locations'
import { characterArray, rickAndMortyCharacter } from './services/characters'

class App extends Component
{
  constructor(props)
  {
    super(props)

    this.state = {
      currentLocation: locationArray[1],
      currentLocationDetails: [],
      rickAndMortyCharacter: rickAndMortyCharacter,
      currentCharacter: characterArray[0]
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
            />

          )} />
      </div>
    )
  }
}

export default App
