import React, { Component } from 'react'
import { connect } from "react-redux";
import OrderDateList from "../order/OrderDateList";
import { getDateMD } from "../helpers/date";
import GoogleMapReact from 'google-map-react';

class Assignment extends Component {

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };


  render() {
    const {notAssigned} = this.props
    return ( 
      <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'row' }}>
        <OrderDateList dates={notAssigned} />
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
    assigned : order.assigned,
    notAssigned : [
      ...new Set(order.notAssigned
          .map(({ info: { datetime } }) => getDateMD(datetime))
        )
    ].map((date) => (
      {
        date,
        orders: order.notAssigned.filter(({ info: { datetime } }) => getDateMD(datetime) === date)
      }
    ))
  }
}

export default connect(mapStateToProps)(Assignment)