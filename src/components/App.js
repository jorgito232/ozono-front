import React, { Component } from 'react'
import '../styles/App.css'
import client from '../utils/Client'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter, Route } from 'react-router-dom'



import Login from './Login'
import SearchService from './SearchService'
import SearchUser from './SearchUser'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ApolloProvider client={client}>
          <Route exact path='/' component={() => <Login client={client}/>} />
          <Route exact path='/service' component={() => <SearchService client={client} />} />
          <Route exact path='/user' component={() => <SearchUser client={client} />} />
        </ApolloProvider >
      </BrowserRouter >
    );
  }
}

export default App
