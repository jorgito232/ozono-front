import React, { useEffect, useState, Component } from 'react'

import gql from 'graphql-tag'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const CREATE_SERVICE = gql`
mutation CreateService($user:ID!,$description:String!,$price:String!,$type:ServiceType!){
  CreateService(data:{user:$user, description:$description, price:$price, type:$type})
}`

export default function CreateServiceUser(props) {

  const user = useFormInput(props.user)
  const description = useFormInput('')
  const price = useFormInput('')
  const type = useFormInput('DELIVERY')

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
      .mutate({ mutation: CREATE_SERVICE, variables: { user: user.value, description: description.value, price: price.value, type: type.value } })
      .then(result => {
        if (result.data.CreateService) {
          window.location.reload();
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
            <h5 class="modal-title" id="exampleModalLongTitle">Create service</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Description:</label>
                <input type="text" class="form-control" id="recipient-name" {...description} />
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Price:</label>
                <input type="number" class="form-control" id="recipient-name" {...price} />
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">type:</label>
                <select class="form-control" id="exampleFormControlSelect1" {...type}>
                  <option value="DELIVERY">Delivery</option>
                  <option value="PRODUCT">Product</option>
                  <option value="STAND">Stand</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" onClick={handleSubmit}>Create</button>
          </div>
        </div>
      </div>
    </div>)
}

