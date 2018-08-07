import React, { Component } from 'react'
import { Icon } from 'antd'
import Moment from 'react-moment';
import locationIcon from '../../images/icons/location.svg';

export default class OrderItem extends Component {

  handleOrderClick = (service_id) => {
    this.props.clickOrder(service_id)
  }

  render() {

    const { service_id, info, status: { rejected } } = this.props
    const { client, datetime, origin } = info
    
    return (
      <div className="order-item" onClick={() => this.handleOrderClick(service_id)} >
        <div className="order-item-time">
        <Moment format="HH:mm">{datetime*1000}</Moment>
        </div>
        { 
          rejected && 
          <div className="order-item-rejected">
            <div className="order-item-rejected-icon">
              <Icon type="warning"/>
            </div>
            <div className="order-item-rejected-info">
              <div className="order-item-rejected-title">Rechazada</div>
              <div className="order-item-rejected-by">por: {rejected.driver_name}, código: {rejected.driver_code}</div>
            </div>
            
          </div>
        }
        <div className="order-item-info">
          <div className="order-item-id">
            { service_id }
          </div>
          <div className="order-item-user">
           {client.type === 1 && <span style={{fontWeight: 900}}>{'VIP '}</span>}
           { client.name }
          </div>
          <div className="order-item-street">
            <img className="order-item-street-icon" src={locationIcon} />
            { origin.name }
          </div>
        </div>
        <div className="order-item-actions">
        </div>
      </div>
    )
  }
}
