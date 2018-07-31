import React, { Component } from 'react'
import { Form, Icon, Button, Input, Checkbox } from "antd";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleLogin, setAuthUser } from './AuthActions'
import { 
  reciveInitialOrders, 
  initWatchOrders, 
  watchOrders, 
} from "../orders/OrderActions";

import { 
  reciveDrivers, 
  initWatchDrivers,
  watchDrivers 
} from '../drivers/DriversActions';

import logo from '../../images/logo.svg';

const FormItem = Form.Item

class LoginForm extends Component {

  constructor(){
    super()
    this.state = {
      loading: false,
      iconLoading: false,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    this.props.form.validateFields((err, {email, password}) => {
      if(!err){
        dispatch(handleLogin(email, password))
        .then((user) => {
          // iniciamos listener de cada lista
          dispatch(initWatchOrders()),
          dispatch(initWatchDrivers()),
          // iniciamos los servicios antes de mostrar el UI
          Promise.all([dispatch(reciveDrivers()), dispatch(reciveInitialOrders())])
            .then(() => { 
              dispatch(watchOrders(true)),
              dispatch(watchDrivers(true)),
              dispatch(setAuthUser(user))
            })
        })
        .catch((response) => {
          console.log(response)
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="app-login">
        <div className="app-login-header">
          <div className="app-login-header-logo">
            <img src={logo}  /> 
          </div>
        </div>
        <Form prefixCls="app-form" className="app-login-form" onSubmit={this.handleSubmit}>
          <FormItem prefixCls="app-form">
          {getFieldDecorator('email', {
            rules: [ 
              { type: 'email', message: 'Ingrese un E-mail válido'}, 
              {required: true, message: 'Por favor ingrese su E-mail',}
            ]
          })(
            <Input 
              prefixCls="app-input" 
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}  
              placeholder="Email"
              type="email"
            />
          )}
          </FormItem>
          <FormItem prefixCls="app-form">
            {getFieldDecorator('password', {
              rules: [
                {required: true, message: 'Por favor ingrese su password',}
              ]
            })(
              <Input 
                prefixCls="app-input" 
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}  
                placeholder="Password"
                type="password"
              />
            )}
          </FormItem>

          <FormItem prefixCls="app-form">
            <Button type="primary" htmlType="submit" className="app-btn app-btn-primary app-login-form-button" loading={this.state.loading} onClick={this.enterLoading}>
              Entrar
            </Button>
          </FormItem>
          <FormItem prefixCls="app-form" className="app-login-form-forgot">
            <Link to="/restore">Olvide mi contraseña</Link>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const AuthLogin = Form.create()(LoginForm)

export default connect()(AuthLogin)