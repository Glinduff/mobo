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
import { handleLogin, setAuthUser } from "../auth/AuthActions";

import { 
  reciveInitialOrders, 
  initWatchOrders, 
  watchOrders, 
} from "../order/OrderActions";

import { 
  reciveDrivers, 
  initWatchDrivers,
  watchDrivers 
} from '../drivers/DriversActions';


class MainRouter extends Component{
  
  state = {
    loading: true,
  }

  componentDidMount(){
    this.setInitialData()
  }

  setInitialData = () => {
    const { dispatch } = this.props
    getLocalCredentials()
      .then(res => 
        res === null ?
        this.setState({loading: false}) :
         dispatch(handleLogin(res.email, res.password))
         .then((user) => {
             // iniciamos listener de cada lista
            dispatch(initWatchOrders()),
            dispatch(initWatchDrivers()),
            // iniciamos los servicios antes de mostrar el UI
            Promise.all([dispatch(reciveDrivers()), dispatch(reciveInitialOrders())])
              .then(() => { 
                dispatch(watchOrders(true)),
                dispatch(watchDrivers(true)),
                dispatch(setAuthUser(user)),
                this.setState({loading: false})
              })
          
        })
        .catch(error => console.log(error)))
  }

  render(){
    const { loading } = this.state
    const { authed } = this.props
    return loading === true ? <h1>Loading...</h1> : (
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