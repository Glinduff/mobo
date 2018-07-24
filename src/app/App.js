import React, { Component } from 'react'
import AppSideBar from './SideBar'
import AppContent from './Content'
import { connect } from 'react-redux'
import { Layout } from 'antd';

import { reciveInitialOrders, addOrderListener } from "../orders/OrderActions";

class App extends Component {

  componentDidMount(){
    const { dispatch } = this.props
    dispatch(reciveInitialOrders())
    const listener = addOrderListener(dispatch);
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

/* function mapStateToProps(state){

} */

export default connect()(App)
