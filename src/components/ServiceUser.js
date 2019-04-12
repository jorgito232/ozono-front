import React from 'react'

export default function ServiceUser(props) {

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  const Service = props.service;

  return (
    <div class="card" style={{ width: "20rem" }}>
      <div class="card-body">
        <h5 class="card-title">{Service.type}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{formatter.format(Service.price)}</h6>
        <p class="card-text">The user: {Service.user.name + " " + Service.user.lastName} ask with the following desctription: {Service.description}.</p>
        <span>{(Service.dateEnd) ? "Finished" : "Pending"}</span>
      </div>
    </div>)
}