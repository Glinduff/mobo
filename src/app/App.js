import React, { Component } from 'react'
import AppSideBar from './SideBar'
import AppContent from './Content'
import { connect } from 'react-redux'
import { Layout } from 'antd';

import { 
  reciveInitialOrders, 
  initWatchOrders, 
  watchOrders, 
  endWatchOrders
} from "../orders/OrderActions";

import { 
  reciveDrivers, 
  initWatchDrivers,
  watchDrivers 
} from '../drivers/DriversActions';

class App extends Component {

  state = {
    loading: true
  }

  componentDidMount(){
    const { dispatch } = this.props

    // iniciamos listener de cada lista
    dispatch(initWatchOrders())
    dispatch(initWatchDrivers())

    // iniciamos los servicios antes de mostrar el UI
    Promise.all([dispatch(reciveDrivers()), dispatch(reciveInitialOrders())])
      .then(() => { 
        dispatch(watchOrders(true)),
        dispatch(watchDrivers(true)),
        this.setState({loading: false})
      })
  }

  componentWillUnmount(){
    const { dispatch } = this.props
    dispatch(endWatchOrders())
  }
  
  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <Layout className="main-layout" prefixCls="app-layout">
        <AppSideBar location={this.props.location.pathname}/>
        <AppContent />
      </Layout>
    )
  }
}

export default connect()(App)
