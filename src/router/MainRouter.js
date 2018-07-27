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
import { store } from '../index'

class MainRouter extends Component{
  
  state = {
    loading: true,
    /* authed: false */
  }

  componentDidMount(){
    this.setInitialData()
  }

  setInitialData = () => {
    const { dispatch } = this.props
    console.log('init')
    getLocalCredentials()
      .then(res => 
        res === null ?
        this.setState({loading: false}) :
         dispatch(handleLogin(res.email, res.password))
         .then(() => this.setState({loading: false}))
         .catch(error => console.log(error)))
  }

  componentDidUpdate(prevProps, nextProps) {
    const { authed } = this.props

    console.log('prevProps', prevProps)
    console.log('nextProps', nextProps)

    if(authed){
      console.log('auth')
    }
    else {
      console.log('no auth')
    }
  }

  render(){
    const { loading } = this.state
    const { authed } = this.props
    console.log(loading, authed)
    return loading === true ? <h1>{ loading && 'true' } { authed ? 'true' : 'false' }</h1> : (
      <Router>
        <Switch>
          <PublicRoute authed={authed} path='/auth' component={AuthLogin} />
          <PublicRoute authed={authed} path='/restore' component={AuthRestore} />
          <PrivateRoute authed={authed} path="/" component={App} />
          <Route render={() => <h1>Oops! Esta ruta no existe</h1>} />
        </Switch>
      </Router>
    )
  }
}

function mapStateToProps(state){
  return {
    authed : !!state.auth.user.id
  }
}

export default connect(mapStateToProps)(MainRouter)