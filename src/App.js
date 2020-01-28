import React, { Component } from 'react'
import 'normalize.css'
import './App.css'
import { Route } from 'react-router-dom'

import Header from './components/header/Header'
import Main from './components/Main'

import { queryAPI } from './services/api-services'
import { locationArray } from './services/locations'
import { itemArray } from './services/items'
import { characterArray, rickAndMortyCharacter } from './services/characters'
import { MainMenuSubMenuEnum, MainMenuSubMenuByID, MainMenuLength } from './services/enums'

// leave april 10  - first day of leave april 13
// weeks off 13 and 20
// come back on april 23rd or 22
// come april 27

class App extends Component
{
  constructor(props)
  {
    super(props)

    this.state = {
      currentLocation: locationArray[1],
      currentLocationDetails: [],
      currentLocationCharacters: [],
      rickAndMortyCharacter: rickAndMortyCharacter,
      currentCharacter: characterArray[0],
      currentSubMenu: MainMenuSubMenuEnum.trade,
      currentMainMenuOpen: true,
      currentMenuDisplayArray: [],
      currentItems: itemArray,
      currentMoneyBalance: 100
    }
  }

  changeSubMenu = (subMenu, direction) =>
  {
    let currentSubMenuID = subMenu.id
    let newSubMenuID = currentSubMenuID + direction
    if (newSubMenuID >= MainMenuLength)
    {
      newSubMenuID = 0
    }
    else if (newSubMenuID < 0)
    {
      newSubMenuID = MainMenuLength - 1
    }
    return MainMenuSubMenuByID(newSubMenuID)
  }

  prevSubMenu = (direction) =>
  {
    let newSubMenu = this.changeSubMenu(this.state.currentSubMenu, direction)
    let newArray = this.buildMenuDisplayArray(newSubMenu, this.state.currentMainMenuOpen)
    this.setState((prevState) =>
      ({
        currentSubMenu: newSubMenu,
        currentMenuDisplayArray: newArray
      }))
  }

  clickPortal = (id) =>
  {
    this.setState((prevState) =>
      ({
        currentLocation: locationArray[id]
      }))
    this.locationQuery(locationArray[id].api_id)
    this.toggleMainMenu()
    console.log(this.state.currentLocationDetails)
  }

  clickBuy = (id) =>
  {
    let amount = 1
    let cost = this.state.currentItems[id].basePrice
    let totalCost = cost * amount
    if (this.canAfford(totalCost))
    {
      let tempArray = this.state.currentItems
      tempArray[id].owned += 1
      this.setState((prevState) =>
        ({
          currentItems: tempArray,
          currentMoneyBalance: prevState.currentMoneyBalance - totalCost
        }))
    }
    else
    {
    }
  }

  clickSell = (id) =>
  {
    let amount = 1
    let cost = this.state.currentItems[id].basePrice
    let totalCost = cost * amount
    if (this.canSell(amount, id))
    {
      let tempArray = this.state.currentItems
      tempArray[id].owned -= 1
      this.setState((prevState) =>
        ({
          currentItems: tempArray,
          currentMoneyBalance: prevState.currentMoneyBalance + totalCost
        }))
    }
    else
    {

    }
  }

  canAfford = (amount) =>
  {
    return amount <= this.state.currentMoneyBalance
  }

  canSell = (amount, id) =>
  {
    return amount <= this.state.currentItems[id].owned
  }

  buildMenuDisplayArray = (newSubMenu, menuOpen) =>
  {
    let newArray = [
      [
        { name: menuOpen ? 'Close' : newSubMenu.name, click: this.toggleMainMenu },
        { name: '<', click: () => { this.prevSubMenu(-1) } },
        { name: '>', click: () => { this.prevSubMenu(1) } },
      ]
    ]

    if (menuOpen)
    {
      switch (newSubMenu)
      {
        case MainMenuSubMenuEnum.portal:
          return (
            newArray.concat(
              locationArray.filter(location =>
                (location !== this.state.currentLocation)).map(location =>
                  ([
                    { name: location.name, click: this.toggleMainMenu },
                    { name: null, click: null },
                    { name: 'Portal', click: () => { this.clickPortal(location.id) } }
                  ])
                )
            )
          )

        case MainMenuSubMenuEnum.trade:
          return (
            newArray.concat(
              this.state.currentItems.map(item =>
                ([
                  { trade: item, click: null },
                  { name: 'Sell', click: () => { this.clickSell(item.id) } },
                  { name: 'Buy', click: () => { this.clickBuy(item.id) } }
                ])
              )
            )
          )

        case MainMenuSubMenuEnum.talk:
          return (
            newArray.concat(
              locationArray.filter(location =>
                (location !== this.state.currentLocation)).map(location =>
                  ([
                    { name: location.name, click: this.toggleMainMenu },
                    { name: null, click: null },
                    { name: 'Talk', click: this.toggleMainMenu }
                  ])
                )
            )
          )
        default:
      }
    }
    else
    {
      return newArray
    }
  }

  toggleMainMenu = () =>
  {
    if (this.state.currentMainMenuOpen)
    {
      this.setState((prevState) => ({
        currentMainMenuOpen: false,
        currentMenuDisplayArray: this.buildMenuDisplayArray(prevState.currentSubMenu, false)
      }))
    }
    else
    {
      this.setState((prevState) => ({
        currentMainMenuOpen: true,
        currentMenuDisplayArray: this.buildMenuDisplayArray(prevState.currentSubMenu, true)
      }))
    }
  }

  componentDidMount()
  {
    this.toggleMainMenu()
    this.locationQuery(this.state.currentLocation.api_id)
    // setInterval(() =>
    // {
    //   console.log(this.state.currentSubMenu.name)
    // }, 1000)
  }

  locationQuery = async (api_id) =>
  {
    try
    {
      let queryResult = await queryAPI(`https://rickandmortyapi.com/api/location/${api_id}`)
      this.setState((prevState) => ({
        currentLocationDetails: queryResult,
      }))
      this.parseLocationCharacters(queryResult)
    }
    catch (error)
    {
      console.log(error)
    }
  }

  parseLocationCharacters = async (queryResult) =>
  {
    try
    {
      let tempArray = queryResult.residents.map((resident) => (parseInt(resident.split("character/")[1])))
      await this.characterQuery(tempArray)
    }
    catch (error)
    {
      console.log(error)
    }
  }


  characterQuery = async (arrayOfCharIDs) =>
  {
    try
    {
      let charString = arrayOfCharIDs.join(',')
      let queryString = `https://rickandmortyapi.com/api/character/${charString}`
      let queryResult = await queryAPI(queryString)
      let randomID = Math.floor(Math.random() * queryResult.length)
      console.log(queryResult)
      console.log(queryResult[randomID])
      this.setState({
        currentLocationCharacters: queryResult,
        currentCharacter: queryResult[randomID]
      })
      console.log(queryResult)
    }
    catch (error)
    {
      console.log(error)
    }
  }

  render()
  {
    return (
      <div>
        <Header currentMoneyBalance={this.state.currentMoneyBalance} />
        <Route exact path='/' component={() =>
          (
            <Main
              currentLocation={this.state.currentLocation}
              rickAndMortyCharacter={this.state.rickAndMortyCharacter}
              currentCharacter={this.state.currentCharacter}
              state={this.state}
              mainMenuClick={this.toggleMainMenu}
            />
          )} />

      </div>
    )
  }
}

export default App
