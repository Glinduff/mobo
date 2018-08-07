import React, { Component } from 'react'
import OrderItem from "./OrderItem";
import { Input, Icon, Button, Radio } from "antd";
import { NavLink } from "react-router-dom";

const filterButtons = [
  {name: 'Todos', code: ''},
  {name: 'Pendientes', code: 'NAT'},
  {name: 'Esperando', code: 'WAT'},
]

export default class OrderList extends Component {

  state = {
    search: '',
    filter: ''
  }

  updateSearch = (event) => {
    this.setState({
      search: event.target.value.substr(0, 20)
    })
  }

  handleFilter = (filter) => {
    this.setState({filter: filter.target.value, search: ''})
  }

  handleOrderClick = (service_id) => {
    this.props.handleOrderDetail(service_id)
  }

  render() {
    
    const { dates, match } = this.props
    const { search, filter } = this.state
    
    const filteredOrdes = dates.map(date => (
      { 
        ...date, 
        orders: date.orders.filter(order => {
          return order.service_id.toString().indexOf(search.toString()) !== -1 && 
          order.status.event_code.toString().indexOf(filter) !== -1
        })
      }
    )) 
    return (
      <div className="order-list">
        <div className="order-list-actions">
          <div className="order-list-search">
            <Input 
              prefixCls="app-input" 
              value={this.state.search}
              onChange={this.updateSearch}
              suffix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}  
              placeholder="Buscar por ID de orden..."
              type="text"
            />
          </div>
          <div className="order-list-filter">
            <Radio.Group prefixCls="app-radio" className="order-list-filter-group" value={filter} size={'small'} onChange={this.handleFilter}>
              { filterButtons.map(button => (
                <Radio.Button
                  className="order-list-filter-group-item"
                  prefixCls="app-radio-button"
                  value={button.code}
                  key={button.code}>
                  {button.name
                }</Radio.Button>
              ))}
            </Radio.Group>
          </div>
        </div>
        <div className="order-list-container">
          { filteredOrdes.map(({date, orders}) => (
            <div className="order-list-group" key={date}>
              { orders.length ? 
                <div className="order-group-date">{date}</div> : 
                '' 
              }
              <div>{orders.map(order =>(
                <NavLink to={`${match.path}/order/${order.service_id}&${order.info.datetime}`} key={order.service_id} >
                  <OrderItem {...order} key={order.service_id}/>
                </NavLink>)) 
              }</div>
            </div>
          ))}
        </div> 
      </div>
    )
  }
}
