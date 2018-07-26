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
import { getLocalCredentials } from "../config/localStorage";
import { setAuth, handleLogin } from "../auth/AuthActions";

class MainRouter extends Component{

  componentDidMount(){
    const { dispatch } = this.props

    getLocalCredentials()
      .then(res => {
        res === null ?
          dispatch(setAuth(false)) :
          dispatch(handleLogin(res.email, res.password))
            .then(res => console.log(res) || res.status === 'success' ? (res.dispatchAuth(true)) : null)
      })
  }

  render(){
    return (
      <Router>
        <Switch>
          <PublicRoute authed={this.props.authed} path='/auth' component={AuthLogin} />
          <PublicRoute authed={this.props.authed} path='/restore' component={AuthRestore} />
          <PrivateRoute authed={this.props.authed} path="/" component={App} />
          <Route render={() => <h1>Oops! Esta ruta no existe</h1>} />
        </Switch>
      </Router>
    )
  }
}

function mapStateToProps(state){
  return {
    authed : state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(MainRouter)