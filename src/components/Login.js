import React, { useEffect, useState } from 'react'

import gql from 'graphql-tag'
import LoginStyle from '../styles/login.css'

import CreateUser from './CreateUser'

const LOGIN_USER = gql`
query LOGIN($email:String!,$password:String!){
  Login(email:$email, password:$password){
    token
    user{
      _id
      name
      lastName
      email
      type
    }
  }
}
`

export default function Login(props) {

  const email = useFormInput('')
  const password = useFormInput('')
  const [user, setUser] = useState('')

  function handleSubmit(e) {
    e.preventDefault();
    props.client
      .query({ query: LOGIN_USER, variables: { email: email.value, password: password.value } })
      .then(result => {
        if (result.data.Login) {
          const resultAux = result.data.Login;
          console.log(result)
          if (resultAux.token) {
            localStorage.setItem('token', JSON.stringify(resultAux.token));
            localStorage.setItem('user', JSON.stringify(resultAux.user));
            if (resultAux.user.type == "ADMIN") {
              window.location.replace('/service')
            } else {
              window.location.replace('/user')
            }
          }
        } else {
          alert('Email or password incorrect')
        }
      })
  }

  return (<div>
    <div id="contenedor">
      <div id="image">
        <span></span>
      </div>
      <div id="formulario">
        <form id="formularioCampos" onSubmit={handleSubmit}>
          <div id="logo" />
          <input type="email" placeholder="Enter email" required="true" {...email} />
          <input type="password" id="exampleInputPassword1" required="true" placeholder="Enter password" {...password} />
          <div id="control">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Sign up</button>
            <button class="btn btn-primary" type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
    <CreateUser client={props.client} />
  </div>
  )

  function useFormInput(initialValue) {
    const [value, setValue] = useState(initialValue)

    function handleChange(e) {
      setValue(e.target.value)
    }

    return {
      value,
      onChange: handleChange
    }
  }
}
