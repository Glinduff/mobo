import React, { Component } from 'react'
import { connect } from "react-redux";

class Planification extends Component {

  render() {
    return (
      <div>
        Planification
      </div>
    )
  }
}

export default connect()(Planification)