import React, { Component } from "react";
import ReactDOM from "react-dom";
import Date from './Date'
import "./index.less";

export default class App extends Component{
  render(){
    return(
      <Date />
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"));