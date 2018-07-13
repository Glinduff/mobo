import React, { Component } from "react";
import { 
  Route,
  Switch,
  BrowserRouter as Router
 } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRouter";
import App from '../app/App'
import AuthLogin from '../auth/AuthLogin'
import { AuthRestore } from '../auth/AuthRestore'
import  { connect } from 'react-redux'

class MainRouter extends Component{

  state = {
    authed: false,
    loading: true
  }

  render(){
    return (
      <Router>
        <Switch>
          <PublicRoute authed={this.state.authed} path='/auth' component={AuthLogin} />
          <PublicRoute authed={this.state.authed} path='/restore' component={AuthRestore} />
          <PrivateRoute authed={this.state.authed} path="/" component={App} />
          <Route render={() => <h1>Oops! Esta ruta no existe</h1>} />
        </Switch>
      </Router>
    )
  }
}

export default connect()(MainRouter)