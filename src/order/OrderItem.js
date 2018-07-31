import React, { Component } from 'react'
import locationIcon from '../../images/icons/location.svg';

export default class OrderItem extends Component {
  render() {
    const { service_id, info, status } = this.props
    const { client, datetime, destiny, origin } = info
    return (
      <div className="order-item">
        <div className="order-item-time">
          { datetime }
        </div>
        <div className="order-item-rejected"></div>
        <div className="order-item-info">
          <div className="order-item-id">
            { service_id }
          </div>
          <div className="order-item-user">
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
