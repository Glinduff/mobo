import React, { Component } from 'react'
import OrderItem from "./OrderItem";
export default class OrderList extends Component {
  render() {
    const { orders } = this.props
    return (
      <div>
        {orders.map(order => (<OrderItem {...order} key={order.service_id} />))}
      </div>
    )
  }
}
