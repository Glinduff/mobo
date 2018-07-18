import React, { Component } from 'react'
import AppSideBar from './SideBar'
import AppContent from './Content'
import { Layout } from 'antd';

export default class App extends Component {
  render() {
    return (
      <Layout className="main-layout" prefixCls="app-layout">
        <AppSideBar location={this.props.location.pathname}/>
        <AppContent />
      </Layout>
    )
  }
}
