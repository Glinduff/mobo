import React, { Component } from 'react'
import AppSideBar from './SideBar'
import AppContent from './Content'
import { connect } from 'react-redux'
import { Layout } from 'antd';

import { getOrders } from "../api/orders";

class App extends Component {

  componentDidMount(){
    const { dispatch } = this.props
    getOrders()
    .then(orders => console.log(orders))
  }
  
  render() {
    return (
      <Layout className="main-layout" prefixCls="app-layout">
        <AppSideBar location={this.props.location.pathname}/>
        <AppContent />
      </Layout>
    )
  }
}

function mapStateToProps(state){

}

export default connect()(App)
