import React, { useState } from 'react'

import gql from 'graphql-tag'

export default function Service(props) {

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  const FISNISH_SERVICE = gql`
  mutation UpdateService($_id:ID!, $dateEnd: date){
    UpdateService(data:{_id: $_id, dateEnd: $dateEnd})
  }`

  const Service = props.service;

  function handleFinishService() {
    props.client
      .mutate({ mutation: FISNISH_SERVICE, variables: { _id: Service._id, dateEnd: Date.now()} })
      .then(result => {
        if (result.data.UpdateService) {
          window.location.reload();
        } else {
          alert('Error')
        }
      })
  }

  return (
    <div class="card" style={{ width: "20rem" }}>
      <div class="card-body">
        <h5 class="card-title">{Service.type}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{formatter.format(Service.price)}</h6>
        <p class="card-text">The user: {Service.user.name + " " + Service.user.lastName} ask with the following desctription: {Service.description}.</p>
        <a href="#" class="btn btn-primary" onClick={handleFinishService}>Finish service</a>
      </div>
    </div>)
}