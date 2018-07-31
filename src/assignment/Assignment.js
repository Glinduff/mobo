import React, { Component } from 'react'
import { connect } from "react-redux";
import OrderList from "../order/OrderList";

class Assignment extends Component {

  render() {
    const {notAssigned} = this.props
    return (
      <div>
        <OrderList orders={notAssigned} />
      </div>
    )
  }j
}

function mapStateToProps({order}){
  return{
    assigned : order.assigned,
    notAssigned : order.notAssigned
  }
}

export default connect(mapStateToProps)(Assignment)