import React, { useState } from 'react'

export default function Service(props) {

  const Service = props.service;

  return (
    <div class="card" style={{width: "20rem"}}>
      <div class="card-body">
        <h5 class="card-title">{Service.type}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${Service.price}</h6>
        <p class="card-text">The user: {Service.user.name + " "  + Service.user.lastName} ask with the following desctription: {Service.description}.</p>
        <a href="#" class="card-link" style={{margin: "1rem"}}>Card link</a>
        <a href="#" class="btn btn-primary">Another link</a>
      </div>
    </div>)
}