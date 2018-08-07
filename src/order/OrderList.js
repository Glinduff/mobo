import React, { Component } from 'react'
import OrderItem from "./OrderItem";
export default class OrderList extends Component {
  render() {

    const { orders } = this.props
    return (
      <div>
        {orders.map(({date, orders}) => (
            <div key={date}>
              { orders.length && <div>{date}</div>}
              <div>{orders.map(order =>(<OrderItem {...order} key={order.service_id} />)) }</div>
            </div>
        ))}
      </div>
    )
  }
}
