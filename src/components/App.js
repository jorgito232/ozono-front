import React, { Component } from 'react'
import '../styles/App.css'
import client from '../utils/Client'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Login from './Login'
import SearchService from './SearchService'
import SearchUser from './SearchUser'

class App extends Component {
  componentDidMount(){
    document.title = 'ServiceApp'
  }
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
