import React, { Component } from 'react'
import OrderItem from "./OrderItem";
import { Input, Icon, Button, Radio } from "antd";

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

  render() {
    const { dates } = this.props
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

    const filterButtons = [
      {name: 'Todos', code: ''},
      {name: 'Pendientes', code: 'PEN'},
      {name: 'Esperando', code: 'WAI'},
    ]

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
              <div>{orders.map(order =>(<OrderItem {...order} key={order.service_id} />)) }</div>
            </div>
          ))}
        </div> 
      </div>
    )
  }
}

/* { filterButtons.map(button => (
  <Button 
    prefixCls="app-btn" 
    className={ filter === button.code ? 'app-btn-active' : ''}
    size={'small'} 
    onClick={() => this.handleFilter(button.code)}
    key={button.code}>
    {button.name}
  </Button>
))} */