import React, { Component } from 'react'
import { Form, Icon, Button, Input, Checkbox } from "antd";
const FormItem = Form.Item

class LoginForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    console.log(this.props);
    return (
      <Form prefixCls="app-form">
        <FormItem prefixCls="app-form">
          <Input 
            prefixCls="app-input" 
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}  
            placeholder="Username"
            type="mail"
          />
        </FormItem>

        <FormItem prefixCls="app-form">
          <Input 
            prefixCls="app-input" 
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}  
            placeholder="Username"
            type="password"
          />
        </FormItem>

        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export const Login = Form.create()(LoginForm)