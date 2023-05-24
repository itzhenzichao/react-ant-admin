import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useNavigate,Outlet,useLocation } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('统计', '/statistics', <PieChartOutlined />),
  getItem('列表', '/list', <DesktopOutlined />),
  getItem('User', 'page3', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'page4', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];

const breadcrumbItems = [
  {title:'User'},
  {title:'Bill'},
]

const View: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const defaultSelectedKeys = [location.pathname];
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  function menuClick(e:{key:string}){
    console.log(e);
    navigate(e.key)
  }
  const [openKeys, setOpenKeys] = useState(['']);
  const rootSubmenuKeys = ['page3','page4'];
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    console.log(keys);
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={defaultSelectedKeys} mode="inline" items={items}
        onClick={menuClick} 
        openKeys={openKeys}
        onOpenChange={onOpenChange}/>
      </Sider>
      <Layout>
        <Header style={{ height: '34px',padding: 0, background: colorBgContainer }} >
          <Breadcrumb style={{ lineHeight:'34px',paddingLeft:'16px' }} items={breadcrumbItems}>
          </Breadcrumb>
          </Header>
        <Content style={{ margin: '16px 16px' }}>
            <Outlet></Outlet>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default View;