import React, { Component } from 'react'
import { Layout } from 'antd'
import { Switch, Route, Redirect } from 'react-router-dom'
import Planification from '../planification/Planification';

const { Content } = Layout;
const routes = [
  {
    path: '/planificacion',
    component: Planification
  }
]

export default class AppContent extends Component {
  render() {
    return (
      <Layout prefixCls="app-layout">
        <Content prefixCls="app-layout-content">
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))}
            <Redirect from="/" push to="/planificacion" />
          </ Switch>
        </Content>
      </Layout>
    )
  }
}
