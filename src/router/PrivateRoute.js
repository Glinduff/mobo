import React from 'react'
import { Route, Redirect } from "react-router-dom";
export const PrivateRoute = ({component: Component, authed, ...rest}) => {
  return(
    <Route {...rest} render={(props) => authed === true 
      ? <Component exact {...props} />
      : <Redirect to={{pathname: '/auth', state: {from: props.location}}} />}
    />
  )
}