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
import Events from './components/routed/Events'



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
  event: null,
  eventText: [],
}


class App extends Component
{
  constructor(props)
  {
    super(props)

    this.state = defaultState
    this.buildMenuDisplayArray(defaultState.currentSubMenu, defaultState.currentMainMenuOpen)
  }

  defaultMenu = [
    [
      { name: MainMenuSubMenuEnum.portal, click: this.toggleMainMenu },
      { name: '<', click: () => { this.prevSubMenu(-1) } },
      { name: '>', click: () => { this.prevSubMenu(1) } },
    ]
  ]

  componentDidMount()
  {
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

    }
    else if (newDay === this.state.totalDaysTillGameOver + 1)
    {
      this.setState((prevState) =>
        ({
          gameOver: true
        }))
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
      let tempPrice = newItem.currentPrice ? newItem.currentPrice : 0
      newItem.currentPrice = Math.floor(newItem.basePrice * ((Math.random() * adjustFactor) + (1 - adjustFactor / 2)))
      newItem.change = newItem.currentPrice - tempPrice
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

  getRandomItemID = () =>
  {
    return Math.floor(Math.random() * this.state.currentItems.length)
  }

  getRandomAdjustAmount = (id, highLow) =>
  {
    let adjustFactor = 0.6
    if (highLow == 'high')
    {
      return Math.floor(this.state.currentItems[id].highPrice * ((Math.random() * adjustFactor) + (1 - adjustFactor / 2)))
    }
    else
    {
      return Math.floor(this.state.currentItems[id].lowPrice * ((Math.random() * adjustFactor)))
    }
  }

  adjustIndividualItemPrice = (id, amount) =>
  {
    let tempArray = this.state.currentItems
    let tempPrice = tempArray[id].currentPrice
    tempArray[id].currentPrice += amount
    tempArray[id].change = tempArray[id].currentPrice - tempPrice
    this.setState({
      currentItems: tempArray
    })
  }

  adjustItemHigh = () =>
  {
    let highId = this.getRandomItemID()
    this.adjustIndividualItemPrice(highId, this.getRandomAdjustAmount(highId, 'high'))
    this.setState((prevState) => ({
      eventText: prevState.eventText.concat([`Prices of ${this.state.currentItems[highId].name} are sky high!`])
    }))
    return highId
  }

  adjustItemLow = () =>
  {
    let lowId = this.getRandomItemID()
    this.adjustIndividualItemPrice(lowId, this.getRandomAdjustAmount(lowId, 'low'))
    this.setState((prevState) => ({
      eventText: prevState.eventText.concat([`Prices of ${this.state.currentItems[lowId].name} have hit rock bottom!`])
    }))
    return lowId
  }

  freeItem = () =>
  {
    let freeId = this.getRandomItemID()
    let randomAmount = Math.ceil(Math.random() * 10) + 2
    this.addRemoveItem(freeId, randomAmount)
    this.setState((prevState) => ({
      eventText: prevState.eventText.concat([`You found ${randomAmount} ${this.state.currentItems[freeId].name}s`])
    }))
    return freeId
  }

  randomEvents = () =>
  {
    let chanceResult = Math.floor(Math.random() * 10)
    switch (chanceResult)
    {
      case 0:
      case 1:
      case 2:
      case 3:
        this.props.history.push('/')
        break
      case 4:
      case 5:
        this.setState({
          event: '1high1low',
          eventText: []
        })
        this.adjustItemHigh()
        this.adjustItemLow()
        this.props.history.push('/event')
        break
      case 6:
        this.setState({
          event: '2high',
          eventText: []
        })
        this.adjustItemHigh()
        this.adjustItemHigh()
        this.props.history.push('/event')
        break
      case 7:
        this.setState({
          event: '1high',
          eventText: []
        })
        this.adjustItemHigh()
        this.props.history.push('/event')
        break

      case 8:
        this.setState({
          event: '1low',
          eventText: []
        })
        this.adjustItemLow()
        this.props.history.push('/event')
        break

      case 9:
        this.setState({
          event: 'free',
          eventText: []
        })
        this.freeItem()
        this.props.history.push('/event')
        break

      default:
        break
    }
  }

  clickPortal = (id) =>
  {
    this.props.history.push('/portal')
    this.advanceDaysPassed()
    this.addInterestToDebt()
    this.adjustItemPrice()
    this.setState((prevState) =>
      ({
        currentLocation: locationArray[id]
      }))
    this.locationQuery(locationArray[id].api_id)
    this.toggleMainMenu()
  }

  addRemoveItem = (id, amount) =>
  {
    let tempArray = this.state.currentItems
    tempArray[id].owned += amount
    this.setState((prevState) =>
      ({
        currentItems: tempArray
      }))
  }

  clickBuy = (id) =>
  {
    let amount = 1
    let cost = this.state.currentItems[id].currentPrice
    let totalCost = cost * amount
    if (this.canAfford(totalCost))
    {
      this.addRemoveItem(id, amount)
      this.setState((prevState) =>
        ({
          currentMoneyBalance: prevState.currentMoneyBalance - totalCost
        }))
    }
  }

  clickSell = (id) =>
  {
    let amount = 1
    let cost = this.state.currentItems[id].currentPrice
    let totalCost = cost * amount
    if (this.canSell(amount, id))
    {
      this.addRemoveItem(id, -amount)
      this.setState((prevState) =>
        ({
          currentMoneyBalance: prevState.currentMoneyBalance + totalCost
        }))
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
                    name: (character === this.state.currentCharacter ? '' : 'Talk'),
                    click: character === this.state.currentCharacter ? null : () =>
                    {
                      (this.clickTalk(character.id))
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
    let newMenuItems = this.buildMenuDisplayArray(this.state.currentSubMenu, !this.state.currentMainMenuOpen)
    if (!newMenuItems)
    {
      newMenuItems = this.buildMenuDisplayArray(defaultState.currentSubMenu, !this.state.currentMainMenuOpen)
    }

    if (this.state.currentMainMenuOpen)
    {
      this.setState((prevState) => ({
        currentMainMenuOpen: false,
        currentMenuDisplayArray: newMenuItems
      }))
    }
    else
    {
      this.setState((prevState) => ({
        currentMainMenuOpen: true,
        currentMenuDisplayArray: newMenuItems
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
        <Route exact path='/portal'>
          <Portal randomEvents={this.randomEvents} {...this.props} />
        </Route>
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
        <Route exact path='/event'><Events event={this.state.event} eventText={this.state.eventText} /></Route>
        <Route exact path='/welcome'><GameStart clickNewGame={this.clickNewGame} clickContinueGame={this.clickContinueGame} /></Route>
      </div>
    )
  }
}

export default withRouter(App)
