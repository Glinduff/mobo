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
    /* this.setState({filter}) */
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
        <div className="order-list-search" style={{padding: '14px'}}>
          <Input 
            prefixCls="app-input" 
            value={this.state.search}
            onChange={this.updateSearch}
            suffix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}  
            placeholder="Buscar por ID de orden..."
            type="text"
          />
          <div>
            <Radio.Group prefixCls="app-radio" value={filter} size={'small'} onChange={this.handleFilter}>
              { filterButtons.map(button => (
                <Radio.Button
                  prefixCls="app-radio-button"
                  value={button.code}
                  key={button.code}>
                  {button.name
                }</Radio.Button>
              ))}
            </Radio.Group>

          </div>
        </div>
        <div style={{ width: '100%', flex: '1 1 0', overflow: 'auto', padding: '14px'}}>
          { filteredOrdes.map(({date, orders}) => (
            <div key={date}>
              { orders.length ?  <div>{date}</div> : '' }
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