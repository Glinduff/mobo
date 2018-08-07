import React, { Component } from 'react'
import { connect } from "react-redux";
import OrderDateList from "../order/OrderDateList";
import { getDateMD } from "../helpers/date";
import GoogleMapReact from 'google-map-react';
import { getOrder } from "../api/orders";

class Assignment extends Component {

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  handleOrderDetail = (service_id) => {
    return getOrder(service_id).then(res => console.log(res))
  }

  render() {
    console.log(this.props);
    const {orders} = this.props
    return ( 
      <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'row' }}>
        <OrderDateList dates={orders} handleOrderDetail={this.handleOrderDetail}/>
        <div style={{position: 'relative',  height: '100%', width: '100%'}}>
          <div style={{ height: '100%', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyCGqjpXT0tEtJf6rHnvO0eXZrs4cb2L1_k'}}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}>
            </GoogleMapReact>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({order}){
  return{
    orders : [
      ...new Set(order.list
          .filter(({status: {event_code}}) =>event_code === 'NAT' || event_code === 'WAT')
          .map(({ info: { datetime } }) => getDateMD(datetime))
        )
    ].map((date) => (
      {
        date,
        orders: order.list.filter(({ info: { datetime }, status: {event_code}}) => getDateMD(datetime) === date && event_code === 'NAT' || event_code === 'WAT')
      }
    ))
  }
}

export default connect(mapStateToProps)(Assignment)