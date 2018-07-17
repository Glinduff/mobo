import React, { Component } from 'react'
import { Layout, Menu, Avatar, Button, Icon } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleLogout } from '../auth/AuthActions'

const { SubMenu } = Menu;
const { Sider } = Layout;


const SectionMenu = withRouter(props => {
  const { location } = props;
  return (
    <Menu
      theme="light"
      mode="inline"
      prefixCls="app-menu"
      defaultSelectedKeys={[location.pathname]}>
      <Menu.Item key="/planificacion">
        <Link to="/planificacion">
        <Icon type="layout" />
          Planificacion
        </Link>
      </Menu.Item>
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
        <SectionMenu />
      </Sider>
    )
  }
}

export default connect()(SideBar)
