import React, { Component } from 'react'

import '../styles/ServiceSearch.css'

import ContentLoader from "react-content-loader"

import gql from 'graphql-tag'

import Service from './ServiceComponent'

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
  }
}
`

const MyLoader = () => (
  <ContentLoader
    height={120}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="0" y="15" rx="4" ry="4" width="117" height="6" />
    <rect x="0" y="35" rx="3" ry="3" width="85" height="6" />
    <rect x="0" y="80" rx="3" ry="3" width="350" height="6" />
    <rect x="0" y="100" rx="3" ry="3" width="380" height="6" />
    <rect x="0" y="120" rx="3" ry="3" width="201" height="6" />
  </ContentLoader>
)

export default class SearchService extends Component {
  constructor(props) {
    super(props)

    this.state = {
      services: []
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
      })
  }


  render() {
    return (<div>
      <button id="flotante"></button>
      <div className="container">
        <div className="row">
          {this.state.services.map((serviceAux) => <Service service={serviceAux}/>)}
        </div>
      </div>
    </div >)
  }


}