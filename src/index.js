import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from './app/App'
import {Login} from './auth/Login'
import "./index.less";

export default class Root extends Component{
  render(){
    return(
      <Login />
    )
  }
}

ReactDOM.render(<Root />, document.getElementById("root"));