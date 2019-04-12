import React, { Component } from 'react'

import '../styles/ServiceSearch.css'

import gql from 'graphql-tag'

import ServiceUser from './ServiceUser'

import { LineChart, Line, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip,Area} from 'recharts';

const data = [
  {
    "name": "Page A",
    "uv": 4000,
    "pv": 2400
  },
  {
    "name": "Page B",
    "uv": 3000,
    "pv": 1398,
    "amt": 2210
  },
  {
    "name": "Page C",
    "uv": 2000,
    "pv": 9800
  },
  {
    "name": "Page D",
    "uv": 2780,
    "pv": 3908
  },
  {
    "name": "Page E",
    "uv": 1890,
    "pv": 4800
  },
  {
    "name": "Page F",
    "uv": 2390,
    "pv": 3800
  },
  {
    "name": "Page G",
    "uv": 3490,
    "pv": 4300
  }
]


const SEARCH_SERVICE = gql`
query{
  Services{
    _id
    user{
      _id
    }
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
      services: []
    }
  }

  componentDidMount() {
    this.props.client
      .query({ query: SEARCH_SERVICE })
      .then(result => {
        if (result.data.Services) {
          this.setState({ services: result.data.Services.filter((service) => service.user._id == this.props.user) })
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
      <div className="container">
        <AreaChart width={730} height={250} data={this.state.services}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="dateStart" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="price" stroke="#8884d8" fillOpacity={1} fill="url(#colorPrice)" />
        </AreaChart>
      </div >)
  }


}

