import React, { Component } from 'react'

import '../styles/ServiceSearch.css'

import gql from 'graphql-tag'

import ServiceUser from './ServiceUser'

const SEARCH_SERVICE = gql`
query{
  Services{
    _id
    user{
      _id
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

export default class TableService extends Component {
  constructor(props) {
    super(props)

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

  }

  logOut = () => {
    localStorage.removeItem('token');
    window.location.replace('/');
  }


  render() {
    return (
    <div className="orden">
     <div className="container" id="content">
        {this.state.services.map((serviceAux) =>  (serviceAux.user._id == this.props.user) ? <ServiceUser client={this.props.client} service={serviceAux} /> : "")}
      </div>
    </div >)
  }


}