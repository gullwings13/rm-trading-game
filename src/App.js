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

import { characterArray, rickAndMortyCharacter, krombopulosBichael } from './services/characters'
import { MainMenuSubMenuEnum, MainMenuSubMenuByID, MainMenuLength } from './services/enums'
import Portal from './components/routed/Portal'
import Onboarding from './components/routed/Onboarding'
import Gameover from './components/routed/Gameover'
import Info from './components/routed/Info'
import GameStart from './components/routed/GameStart'

// const defaultMenu = [
//   [
//     { name: MainMenuSubMenuEnum.portal, click: this.toggleMainMenu },
//     { name: '<', click: () => { this.prevSubMenu(-1) } },
//     { name: '>', click: () => { this.prevSubMenu(1) } },
//   ]
// ]

const defaultState = {
  currentLocation: locationArray[1],
  currentLocationDetails: [],
  currentLocationCharacters: [],
  rickAndMortyCharacter: rickAndMortyCharacter,
  currentCharacter: characterArray[0],
  currentSubMenu: MainMenuSubMenuEnum.portal,
  currentMainMenuOpen: true,
  currentMenuDisplayArray: [],
  currentItems: itemArray,
  currentMoneyBalance: 1000,
  currentDebtBalance: 5000,
  debtInterestRate: 1.1,
  currentDaysPassed: 0,
  totalDaysTillGameOver: 30,
  secondToLastDay: false,
  gameOver: false,
  onboardingComplete: true, // change to false for game start
  onboardingDialogID: 0,
}

// leave april 10  - first day of leave april 13
// weeks off 13 and 20
// come back on april 23rd or 22
// come april 27

class App extends Component
{
  constructor(props)
  {
    super(props)

    this.state = defaultState
    this.buildMenuDisplayArray(defaultState.currentSubMenu, defaultState.currentMainMenuOpen)
  }

  componentDidMount()
  {
    // this.buildMenuDisplayArray(defaultState.currentSubMenu, defaultState.currentMainMenuOpen)
    this.locationQuery(this.state.currentLocation.api_id)
    this.props.history.push('/welcome')
    this.toggleMainMenu()
    this.adjustItemPrice()
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

  advanceDaysPassed = () =>
  {
    let newDay = this.state.currentDaysPassed + 1
    this.setState((prevState) =>
      ({
        currentDaysPassed: prevState.currentDaysPassed + 1
      }))

    if (newDay === this.state.totalDaysTillGameOver)
    {
      this.setState((prevState) =>
        ({
          secondToLastDay: true
        }))
      // this.buildPortalMenuForFinalDay()
    }
    else if (newDay === this.state.totalDaysTillGameOver + 1)
    {
      this.setState((prevState) =>
        ({
          gameOver: true
        }))
      // this.buildPortalMenuForFinalDay()
    }
  }

  addInterestToDebt = () =>
  {
    this.setState((prevState) =>
      ({
        currentDebtBalance: Math.floor(prevState.currentDebtBalance * this.state.debtInterestRate)
      }))
  }

  adjustItemPrice = () =>
  {
    let adjustFactor = 0.6
    let tempArray = this.state.currentItems.map((item) =>
    {
      let newItem = item
      if (newItem.currentPrice)
      {
        // existing price, adjust based on existing price
        let tempPrice = newItem.currentPrice
        newItem.currentPrice = Math.floor(newItem.currentPrice * ((Math.random() * adjustFactor) + (1 - adjustFactor / 2)))
        newItem.currentPrice = newItem.currentPrice < 1 ? 1 : newItem.currentPrice
        newItem.change = newItem.currentPrice - tempPrice
      }
      else
      {
        // New price, adjust based on base price
        newItem.currentPrice = Math.floor(newItem.basePrice * ((Math.random() * adjustFactor) + (1 - adjustFactor / 2)))
        newItem.change = 0
      }
      return newItem
    })
    this.setState({
      currentItems: tempArray
    })
  }

  newGame = () =>
  {
    if (this.state.onboardingComplete === false)
    {

    }
  }

  loadGame = (potentialLoadGame) =>
  {
    this.setState(JSON.parse(potentialLoadGame))
  }

  saveGame = () =>
  {
    localStorage.setItem('RMTradingGameSave', JSON.stringify(this.state))
  }

  clickContinueGame = () =>
  {
    let potentialLoadGame = localStorage.getItem('RMTradingGameSave')

    if (potentialLoadGame != null)
    {
      console.log('load game exists')
      this.loadGame(potentialLoadGame)
      this.buildMenuDisplayArray(defaultState.currentSubMenu, defaultState.currentMainMenuOpen)
    }
    else
    {
      console.log('no load game')
    }


  }


  randomEvents = () =>
  {

  }

  clickPortal = (id) =>
  {
    // console.log(this.props)
    this.props.history.push('/portal')
    this.advanceDaysPassed()
    this.addInterestToDebt()
    this.adjustItemPrice()
    this.randomEvents()
    this.setState((prevState) =>
      ({
        currentLocation: locationArray[id]
      }))
    this.locationQuery(locationArray[id].api_id)
    this.toggleMainMenu()
    this.saveGame()
  }

  clickBuy = (id) =>
  {
    let amount = 1
    let cost = this.state.currentItems[id].currentPrice
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
      this.saveGame()
    }
    else
    {
    }
  }

  clickSell = (id) =>
  {
    let amount = 1
    let cost = this.state.currentItems[id].currentPrice
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
      this.saveGame()
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
    let id = this.convertCharacterAPIIDtoArrayID(api_id)
    this.setState((prevState) =>
      ({
        currentCharacter: prevState.currentLocationCharacters[id],
      }))
    this.toggleMainMenu()
  }

  clickPayDebt = () =>
  {
    if (this.state.currentDebtBalance >= 1000)
    {
      if (this.canAfford(1000))
      {
        this.setState((prevState) =>
          ({
            currentMoneyBalance: prevState.currentMoneyBalance - 1000,
            currentDebtBalance: prevState.currentDebtBalance - 1000
          }))
        this.saveGame()
      }

    } else
    {
      if (this.canAfford(this.state.currentDebtBalance))
      {
        this.setState((prevState) =>
          ({
            currentMoneyBalance: prevState.currentMoneyBalance - prevState.currentDebtBalance,
            currentDebtBalance: prevState.currentDebtBalance - prevState.currentDebtBalance
          }))

      }
    }
  }

  clickGetDebt = () =>
  {
    if (this.state.currentDebtBalance < 10000)
    {
      this.setState((prevState) =>
        ({
          currentMoneyBalance: prevState.currentMoneyBalance + 1000,
          currentDebtBalance: prevState.currentDebtBalance + 1000
        }))
    }
  }

  gameOver = () =>
  {
    this.props.history.push('/gameover')
  }

  clickResetGame = () =>
  {
    this.setState(defaultState)
    this.locationQuery(defaultState.currentLocation.api_id)
    this.toggleMainMenu()
  }

  clickNewGame = () =>
  {
    this.clickResetGame()
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

          if (this.state.secondToLastDay === true)
          {
            return (

              newArray.concat([[
                { name: 'Final Day', click: null },
                { name: null, click: null },
                { name: 'Finish', click: this.gameOver }
              ]]))
          }
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
          if (this.state.currentCharacter.id === 196)
          {
            return (
              newArray.concat([[
                { name: 'Debt', click: null },
                { name: 'Get Debt', click: () => { this.clickGetDebt() } },
                { name: 'Pay Debt', click: () => { this.clickPayDebt() } }
              ]])
            )
          }
          else
          {
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
          }

        case MainMenuSubMenuEnum.talk:
          return (

            newArray.concat(
              this.state.currentLocationCharacters.map(character =>
                ([
                  { name: character.name, click: null },
                  { name: null, click: null },
                  {
                    name: (character === this.state.currentCharacter ? '' : 'Talk'), click: () =>
                    {
                      (character === this.state.currentCharacter ? console.log() : this.clickTalk(character.id))
                    }
                  }
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

      if (characterQueryResult.id === 242)
      {
        characterQueryResult = [characterQueryResult, krombopulosBichael]
      }

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
        <Route exact path='/' component={() =>
          (
            <div>
              <Header
                currentMoneyBalance={this.state.currentMoneyBalance}
                currentDebtBalance={this.state.currentDebtBalance}
                currentDaysPassed={this.state.currentDaysPassed}
                totalDaysTillGameOver={this.state.totalDaysTillGameOver}
                currentLocationDetails={this.state.currentLocationDetails}
              />
              <Main
                currentLocation={this.state.currentLocation}
                rickAndMortyCharacter={this.state.rickAndMortyCharacter}
                currentCharacter={this.state.currentCharacter}
                state={this.state}
                mainMenuClick={this.toggleMainMenu}
              />
            </div>
          )} />
        <Route exact path='/portal'><Portal {...this.props} /></Route>
        <Route exact path='/hello'>
          <Onboarding {...this.props}
            onboardingCompleted={this.onboardingCompleted}
            onboardingNextButton={this.onboardingNextButton}
            onboardingDialogID={this.state.onboardingDialogID}
            onboardingDialog={onboardingDialogArray[this.state.onboardingDialogID]}
          /></Route>
        <Route exact path="/gameover">
          <Gameover
            currentMoneyBalance={this.state.currentMoneyBalance}
            currentDebtBalance={this.state.currentDebtBalance}
            clickResetGame={this.clickResetGame}
          />
        </Route>
        <Route exact path='/info'><Info /></Route>
        <Route exact path='/welcome'><GameStart clickNewGame={this.clickNewGame} clickContinueGame={this.clickContinueGame} /></Route>
      </div>
    )
  }
}

export default withRouter(App)
