import React, { Component } from 'react'
import { Form, Icon, Button, Input, Checkbox } from "antd";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleLogin } from './AuthActions'
const FormItem = Form.Item

class LoginForm extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(handleLogin(true))
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="app-login">
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

          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: false,
            })(
              <Checkbox>Recordar sesión</Checkbox>
            )}
            <Link to="/restore" className="app-login-form-forgot">Olvide mi contraseña</Link>
            <Button type="primary" htmlType="submit" className="app-login-form-button">
              Log in
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const AuthLogin = Form.create()(LoginForm)

export default connect()(AuthLogin)