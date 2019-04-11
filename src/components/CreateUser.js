import React, { useEffect, useState } from 'react'

import gql from 'graphql-tag'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const CREATE_USER = gql`
mutation CreateUser($name:String!,$lastName:String!,$email:String!,$password:String!){
  CreateUser(data:{name:$name, lastName:$lastName, email:$email, password:$password})
}`

const LOGIN_USER = gql`
query LOGIN($email:String!,$password:String!){
  Login(email:$email, password:$password)
}`


export default function CreateUser(props) {

  const name = useFormInput('')
  const lastName = useFormInput('')
  const email = useFormInput('')
  const password = useFormInput('')

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

  function handleSubmit() {
    props.client
      .mutate({ mutation: CREATE_USER, variables: { name: name.value, lastName: lastName.value, email: email.value, password: password.value } })
      .then(result => {
        if (result.data.CreateUser) {
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
        } else {
          alert('Error')
        }
      })
  }

  return (
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Sign up</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Name:</label>
                <input type="text" class="form-control" id="recipient-name" {...name} />
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Last name:</label>
                <input type="text" class="form-control" id="recipient-name" {...lastName} />
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Email:</label>
                <input type="email" class="form-control" id="recipient-name" {...email} />
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Password:</label>
                <input type="password" class="form-control" id="recipient-name" {...password} />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" onClick={handleSubmit}>Sign up</button>
          </div>
        </div>
      </div>
    </div>)
}