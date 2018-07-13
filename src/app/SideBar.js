import React, { Component } from 'react'
import { Layout, Menu, Avatar } from 'antd';

const { SubMenu } = Menu;
const { Sider } = Layout;

export default class SideBar extends Component {
  render() {
    return (
      <Sider 
        width={200} 
        className="mainSideBar"
        prefixCls="app-layout-sider"
        style={{ background: '#fff' }}>
        <div>
          <Avatar size="large" icon="user" />
        </div>
        <Menu
          theme="light"
          mode="inline"
          prefixCls="app-menu"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}>
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
    )
  }
}