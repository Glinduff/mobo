import React, { Component } from 'react'
import { Layout } from 'antd';
const { Content } = Layout;

export default class AppContent extends Component {
  render() {
    return (
      <Layout prefixCls="app-layout">
        <Content prefixCls="app-layout-content">
        </Content>
      </Layout>
    )
  }
}
