import React, { Component } from 'react'
import {WrappedHorizontalLoginForm} from './Form';
import { Layout, Menu, Avatar } from 'antd';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

export default class Date extends Component {
  
  render() {
    return (
      <div className="main-layout">
        <Layout>
          <Sider 
            width={200} 
            className="mainSideBar" 
            style={{ background: '#fff' }}>
            <div>
              <Avatar size="large" icon="user" />
            </div>
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}>
              <Menu.Item key="1">Dashboard</Menu.Item>
              <Menu.Item key="2">Control</Menu.Item>
              <Menu.Item key="3"> Ordenes</Menu.Item>
              <Menu.Item key="4">Usuarios</Menu.Item>
              <Menu.Item key="5">Clientes</Menu.Item>
              <Menu.Item key="6">Flota</Menu.Item>
              <SubMenu key="sub3" title="Reportes">
                <Menu.Item key="9">Actuales</Menu.Item>
                <Menu.Item key="10">Completadas</Menu.Item>
              </SubMenu>
              <Menu.Item key="7">Acerca</Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ background: '#fff', padding: 24, margin: 0 }}>
              <WrappedHorizontalLoginForm />
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}
