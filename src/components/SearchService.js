import React, { Component } from 'react'

import '../styles/ServiceSearch.css'

import ContentLoader from "react-content-loader"

import gql from 'graphql-tag'

import Service from './ServiceComponent'

import CreateService from './CreateService'

const SEARCH_SERVICE = gql`
query{
  Services{
    _id
    user{
      name
      lastName
    }
    description
    price
    type
    dateStart
    dateEnd
  }
}
`

const SEARCH_USER = gql`
query{
  Users{
    _id
    email
    type
  }
}`

export default class SearchService extends Component {
  constructor(props) {
    super(props)
    const token = JSON.parse(localStorage.getItem('token'));
    if (!token) {
      window.location.replace('/');
    }

    this.state = {
      services: [],
      users: []
    }
  }


  componentDidMount() {


    this.props.client
      .query({ query: SEARCH_SERVICE })
      .then(result => {
        if (result.data.Services) {
          this.setState({ services: result.data.Services })
        } else {
          alert('Error')
        }
      });

    this.props.client
      .query({ query: SEARCH_USER })
      .then(result => {
        if (result.data.Users) {
          this.setState({ users: result.data.Users })
        } else {
          alert('Error')
        }
      })

  }

  logOut = () => {
    localStorage.removeItem('token');
    window.location.replace('/');
  }


  render() {
    return (<div className="orden">
      <nav class="navbar  fixed-top">
        <a href="#" class="navbar-brand mb-0 h1" onClick={this.logOut}>ServiceApp</a>
      </nav>
      <button id="flotante" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">+</button>
      <div className="container" id="content">
        {this.state.services.map((serviceAux) => (!serviceAux.dateEnd) ? <Service client={this.props.client} service={serviceAux} /> : "")}
      </div>
      <CreateService client={this.props.client} users={this.state.users} />
    </div >)
  }


}