import React, { Component } from 'react'
import { Form, Icon, Button, Input, Checkbox } from "antd";
const FormItem = Form.Item

class RestoreForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    console.log(this.props);
    return (
      <div className="app-login">
        <Form prefixCls="app-form" className="app-login-form">
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
          <FormItem>
            <Button type="primary" htmlType="submit" className="app-login-form-button">
              Restaurar password
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export const AuthRestore = Form.create()(RestoreForm)