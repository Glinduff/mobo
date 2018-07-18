import React, { Component } from 'react'
import { Layout, Menu, Avatar, Button, Icon } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleLogout } from '../auth/AuthActions'

const { SubMenu } = Menu;
const { Sider } = Layout;

const menuLinks = [
  {
    name: 'Planificacion',
    path: '/planificacion',
    icon: 'layout'
  },
  {
    name: 'Control',
    path: '/control',
    icon: 'layout'
  }
]

const SectionMenu = (props => {
  const { location } = props;
  return (
    <Menu
      theme="light"
      mode="inline"
      prefixCls="app-menu"
      selectedKeys={[location]}>
      {
        menuLinks.map(link => (
          <Menu.Item key={link.path}>
            <Link to={link.path}>
            <Icon type={link.icon} />
              {link.name}
            </Link>
          </Menu.Item>
        ))
      }
      {/* <SubMenu key="sub1" title="Reportes">
        <Menu.Item key="9">Actuales</Menu.Item>
        <Menu.Item key="10">Completadas</Menu.Item>
      </SubMenu> */}
    </Menu>
  );
});

class SideBar extends Component {

  handleLogout = () => {
    const { dispatch } = this.props
    dispatch(handleLogout(false))
  }

  render() {
    return (
      <Sider 
        width={200} 
        className="mainSideBar"
        prefixCls="app-layout-sider"
        style={{ background: '#fff' }}>
        <div>
          <Avatar size="large" icon="user" />
          <Button type="primary" htmlType="submit" onClick={this.handleLogout}>
            Log out
          </Button>
        </div>
        <SectionMenu {...this.props}/>
      </Sider>
    )
  }
}

export default connect()(SideBar)
