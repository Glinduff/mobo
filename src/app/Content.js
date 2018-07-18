import React, { Component } from 'react'
import { Layout, Icon } from 'antd'
import { Switch, Route, withRouter } from 'react-router-dom'
import { routes } from './routes'

const { Content } = Layout;

class AppContent extends Component {

  componentDidMount(){
    const { history, location } = this.props
    location.pathname === '/' &&  history.push('/planificacion')
  }

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
            <Route render={() => 
              <div>
                <Icon type="frown-o"/>
                <h1>Oops! Esta ruta no existe</h1>
              </div>
            } />
          </Switch>
        </Content>
      </Layout>
    )
  }
}
export default withRouter(AppContent)