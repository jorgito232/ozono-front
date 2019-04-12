import React, { Component } from 'react'


import '../styles/ServiceSearch.css'

import gql from 'graphql-tag'

import TableService from './TableService'

import ChartUser from './ChartUser'

import CreateServiceUser from './CreateServiceUser'

export default class SearchUser extends Component {

  constructor(props) {
    super(props)



    const token = JSON.parse(localStorage.getItem('token'));
    if (!token) {
      window.location.replace('/');
    }

    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
      view: 'Chart'
    }
  }

  logOut = () => {
    localStorage.removeItem('token');
    window.location.replace('/');
  }

  updateView = () => {
    (this.state.view === "Chart") ? this.setState({ view: "Data Table" }) : this.setState({ view: "Chart" })
  }

  render() {
    return (<div>
      <nav class="navbar  fixed-top">
        <a href="#" class="navbar-brand mb-0 h1" onClick={this.logOut}>ServiceApp</a>
      </nav>
      <div class="jumbotron">
        <button id="flotante" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">+</button>
        <h1 class="display-4">Welcome, {this.state.user.name + " " + this.state.user.lastName}!</h1>
        <p class="lead">Read down below you whole your info about services that you had asked for.</p>
        <hr class="my-4" />
        <p>You can choose between chart or data table.</p>
        <p class="lead">
          <button type="button" onClick={this.updateView} class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">
            {this.state.view}!
          </button>
        </p>
      </div>
      <div class="content-fluid">
        {(this.state.view === "Chart") ? <TableService client={this.props.client} user={this.state.user._id}/> :  <ChartUser client={this.props.client} user={this.state.user._id}/> }
      </div>
          <CreateServiceUser client={this.props.client} user={this.state.user._id} />
    </div>)
        }
}