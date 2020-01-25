import React, { Component } from 'react'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import { queryAPI } from './services/api-services'
import { Route } from 'react-router-dom'

class App extends Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      locations: []
    }
  }

  componentDidMount()
  {
    this.locationQuery()
  }

  locationQuery = async () =>
  {
    let queryResult = await queryAPI('https://rickandmortyapi.com/api/location/1,2,3,4,5')
    this.setState({
      locations: queryResult
    })
    console.log(queryResult)
  }


  render()
  {
    return (
      <div>
        <Header />
        <Route exact path='/' component={() => (<Main />)} />
      </div>
    )
  }
}

export default App
