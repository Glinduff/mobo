import React, { Component } from 'react'
import OrderItem from "./OrderItem";
import { Input, Icon } from "antd";
export default class OrderList extends Component {

  state = {
    search: ''
  }

  updateSearch = (event) => {
    this.setState({
      search: event.target.value.substr(0, 20)
    })
  }

  render() {
    
    const { dates } = this.props
    
    /* let filteredOrdes = dates.filter(date => date.orders.some(order => order.service_id.toString() === this.state.search.toString()))
      .map(date => ({...date, orders: date.orders.filter(order => order.service_id.toString() === this.state.search.toString())}))
 */


    const filteredOrdes = dates.map(date => (
      { ...date, orders: date.orders.filter(order => order.service_id.toString().indexOf(this.state.search.toString()) !== -1)}
    ))

    return (
      <div className="order-list">
        <Input 
          prefixCls="app-input" 
          value={this.state.search}
          onChange={this.updateSearch}
          suffix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}  
          placeholder="Buscar por ID de orden..."
          type="text"
        />
        <div>
        {
          filteredOrdes.map(({date, orders}) => (
          <div key={date}>
            { 
              orders.length ? 
              <div>{date}</div> : 
              ''
            }
            <div>{orders.map(order =>(<OrderItem {...order} key={order.service_id} />)) }</div>
          </div>
        ))}
      </div>
      </div>
    )
  }
}

/* {filteredOrdes.map(({date, orders}) => (
  <div key={date}>
    <div>{date}</div>
    <div>{orders.map(order =>(<OrderItem {...order} key={order.service_id} />)) }</div>
  </div>
))} */