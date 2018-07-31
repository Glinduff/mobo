import React, { Component } from 'react'
import { Form, Icon, Button, Input } from "antd";
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
      error: false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    this.props.form.validateFields((err, {email, password}) => {
      if(!err){
        this.setState({loading: true, iconLoading: true, error: false})
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
          this.setState({loading: false, iconLoading: false, error: true})

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
          <div className="app-login-header-text">
            <span>Tú sistema de gestión y ordenes <br/> de viajes.</span>
          </div>
        </div>
        <Form prefixCls="app-form" className="app-login-form" onSubmit={this.handleSubmit}>

          {this.state.error && <p className="app-login-form-error">El email de usuario y la contraseña no coinciden.</p>}

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
                placeholder="Contraseña"
                type="password"
              />
            )}
          </FormItem>

          <FormItem prefixCls="app-form">
            <Button 
              type="primary" 
              htmlType="submit" 
              prefixCls="app-btn" 
              className="app-login-form-button"
              loading={this.state.loading} 
              onClick={this.enterLoading}>
                {this.state.loading ? '' : 'Entrar'} 
            </Button>
          </FormItem>
          <FormItem prefixCls="app-form" className="app-login-form-forgot">
            <Link to="/restore">Olvidé mi contraseña</Link>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const AuthLogin = Form.create()(LoginForm)

export default connect()(AuthLogin)