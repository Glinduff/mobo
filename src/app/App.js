import React, { Component } from 'react'
import AppSideBar from './SideBar'
import AppContent from './Content'
import { connect } from 'react-redux'
import { Layout } from 'antd';

import { 
  endWatchOrders
} from "../orders/OrderActions";

class App extends Component {
  componentWillUnmount(){
    const { dispatch } = this.props
    dispatch(endWatchOrders())
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

export default connect()(App)
