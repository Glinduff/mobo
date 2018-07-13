import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import MainRouter from "./router/MainRouter";
import reducers from './app/reducers' 
import middlewares from './middlewares/index'
import "./index.less";


const store = createStore(reducers, middlewares)

ReactDOM.render(
  <Provider store={store}>
    <MainRouter />
  </Provider>
, document.getElementById('root'));