import React, { Component } from 'react'
import { connect } from "react-redux";
import OrderDateList from "../order/OrderDateList";
import { getDateMD } from "../helpers/date";

class Assignment extends Component {

  render() {
    const {notAssigned} = this.props
    return ( <OrderDateList dates={notAssigned} /> )
  }j
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