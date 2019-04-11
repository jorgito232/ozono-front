import React, { useEffect, useState } from 'react'

import gql from 'graphql-tag'
import LoginStyle from '../styles/login.css'

import CreateUser from './CreateUser'

const LOGIN_USER = gql`
query LOGIN($email:String!,$password:String!){
  Login(email:$email, password:$password)
}
`

export default function Login(props) {

  const email = useFormInput('')
  const password = useFormInput('')

  function handleSubmit(e) {
    e.preventDefault();
    props.client
      .query({ query: LOGIN_USER, variables: { email: email.value, password: password.value } })
      .then(result => {
        if (result.data.Login) {
          localStorage.setItem('token', result)
          window.location.replace('/user')
        } else {
          alert('Error')
        }
      })
  }

  return (<div>
    <div id="contenedor">
      <div id="image">
        <span>ServiceApp</span>
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
    <CreateUser client={props.client}/>
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
