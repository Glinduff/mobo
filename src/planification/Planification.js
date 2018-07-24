import React, { Component } from 'react'
import { connect } from "react-redux";

class Planification extends Component {

  render() {
    const {assigned, notAssigned} = this.props
    return (
      <div>
        Planification
        {/* <ul>
          {  notAssigned.map((order, index) => (
            <li key={index}>{order.status}</li>
            )) 
          }
        </ul> */}
      </div>
    )
  }
}

function mapStateToProps({orders}){
  return{
    assigned : orders.assigned,
    notAssigned : orders.notAssigned
  }
}

export default connect(mapStateToProps)(Planification)