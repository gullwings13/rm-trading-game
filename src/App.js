import React, { Component } from 'react'
import 'normalize.css'
import './App.css'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'

import Header from './components/header/Header'
import Main from './components/Main'

import { queryAPI } from './services/api-services'
import { locationArray } from './services/locations'
import { itemArray } from './services/items'
import { onboardingDialogArray } from './services/onboarding-dialog'

import { characterArray, rickAndMortyCharacter } from './services/characters'
import { MainMenuSubMenuEnum, MainMenuSubMenuByID, MainMenuLength } from './services/enums'
import Portal from './components/routed/Portal'
import Onboarding from './components/routed/Onboarding'

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
      currentMoneyBalance: 100,
      onboardingComplete: false,
      onboardingDialogID: 0
    }
  }

  componentDidMount()
  {
    this.toggleMainMenu()
    this.locationQuery(this.state.currentLocation.api_id)
    if (this.state.onboardingComplete == false)
    {
      this.props.history.push('/hello')
    }
  }

  onboardingNextButton = () =>
  {
    this.setState((prevState) => ({
      onboardingDialogID: prevState.onboardingDialogID + 1,
    }))
  }

  onboardingCompleted = () =>
  {
    this.setState({
      onboardingComplete: true
    })
    this.props.history.push('/portal')
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
    // console.log(this.props)
    this.props.history.push('/portal')
    this.setState((prevState) =>
      ({
        currentLocation: locationArray[id]
      }))
    this.locationQuery(locationArray[id].api_id)
    this.toggleMainMenu()

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

  clickTalk = (api_id) =>
  {
    console.log('talk to ' + api_id)

    let id = this.convertCharacterAPIIDtoArrayID(api_id)
    this.setState((prevState) =>
      ({
        currentCharacter: prevState.currentLocationCharacters[id],
      }))
    this.toggleMainMenu()
  }

  convertCharacterAPIIDtoArrayID = (api_id) =>
  {
    for (let index = 0; index < this.state.currentLocationCharacters.length; index++)
    {
      if (api_id === this.state.currentLocationCharacters[index].id)
        return index
    }
    return -1
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
                    { name: location.name, click: null },
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
              this.state.currentLocationCharacters.filter(character =>
                (character !== this.state.currentCharacter)).map(character =>
                  ([
                    { name: character.name, click: null },
                    { name: null, click: null },
                    { name: 'Talk', click: () => { this.clickTalk(character.id) } }
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
      let characterQueryResult = await queryAPI(queryString)

      // console.log('is array ' + Array.isArray(queryResult))
      // console.log(queryResult)
      if (Array.isArray(characterQueryResult))
      {
        let aliveCharacters = characterQueryResult.filter((character) => (character.status.toLowerCase() !== "dead"))
        let randomID = Math.floor(Math.random() * aliveCharacters.length)
        this.setState({
          currentLocationCharacters: aliveCharacters,
          currentCharacter: aliveCharacters[randomID]
        })
      }
      else
      {
        this.setState({
          currentLocationCharacters: [characterQueryResult],
          currentCharacter: characterQueryResult
        })
      }
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
        <Route exact path='/portal'><Portal {...this.props} /></Route>
        <Route exact path='/hello'>
          <Onboarding {...this.props}
            onboardingCompleted={this.onboardingCompleted}
            onboardingNextButton={this.onboardingNextButton}
            onboardingDialogID={this.state.onboardingDialogID}
            onboardingDialog={onboardingDialogArray[this.state.onboardingDialogID]}
          /></Route>
      </div>
    )
  }
}

export default withRouter(App)
