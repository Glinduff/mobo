import React, { Component } from "react";
import ReactDOM from "react-dom";
import { 
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router
 } from "react-router-dom";

import App from './app/App'
import { Login } from './auth/Login'
import { Restore } from './auth/Restore'
import "./index.less";


const PrivateRoute = ({component: Component, authed, ...rest}) => {
  return(
    <Route {...rest} render={(props) => authed === true 
      ? <Component exact {...props} />
      : <Redirect to={{pathname: '/auth', state: {from: props.location}}} />}
    />
  )
}

const PublicRoute = ({component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/' />}
    />
  )
}

export default class Root extends Component{

  state = {
    authed: false,
    loading: true
  }

  render(){
    return (
      <Router>
        <Switch>
          <PublicRoute authed={this.state.authed} path='/auth' component={Login} />
          <PublicRoute authed={this.state.authed} path='/restore' component={Restore} />
          <PrivateRoute authed={this.state.authed} path="/" component={App} />
          {/* <Route render={() => <h1>Oops! Esta ruta no existe</h1>} /> */}
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(<Root />, document.getElementById("root"));