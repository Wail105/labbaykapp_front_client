import React, { useState, useEffect } from 'react';
import { Layout, theme, Button, Dropdown, Menu, Avatar, Badge } from 'antd';
import { Route, Routes, useLocation, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import ii18 from './i18n';
import Home from './Client/home/home';
import Signin from './auth/signin/signin';
import Signup from './auth/signup/signup';
import NavBar from './navBar/navBar';
import AdminRoute from './middleware/adminRoute'; 
import MarketingPage from './Client/Marketing/MarketingPage.js';
import ClientRoute from './middleware/clientRoute';
import DashboardCl from './Client/dashboard/dashboard';
import { useTranslation } from 'react-i18next';

const { Header, Content, Footer, Sider } = Layout;

const PublicRoute = () => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/" /> : <Outlet />;
};

const App = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isMarketingPage = location.pathname === '/marketing';
  const showSidebar = location.pathname.startsWith('/admin') && !isMarketingPage;
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
    window.location.reload();
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout
        style={{
          marginLeft: isMobile || !showSidebar ? 0 : ii18.dir() === "rtl" ? 0 : (collapsed ? 80 : 200),
          marginRight: isMobile || !showSidebar ? 0 : ii18.dir() === "ltr" ? 0 : (collapsed ? 80 : 200),
          transition: 'margin 0.2s',
          zIndex: 1,
        }}
      >
        {!isMarketingPage && (
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              height: 64,
              display: 'flex',
              justifyContent: ii18.dir() === "rtl" ? 'start' : 'end',
            }}
          >
            {showSidebar && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row-reverse',
                direction: ii18.dir(),
              }}>
                <Dropdown overlay={
                  <Menu>
                    <Menu.Item key="1">User Profile</Menu.Item>
                    <Menu.Item key="2">Settings</Menu.Item>
                    <Menu.Divider />
                    <Menu.Item key="3">
                      <a onClick={handleLogout}>{t('logout')}</a>
                    </Menu.Item>
                  </Menu>
                }>
                  <Avatar icon={<UserOutlined />} style={{ marginRight: 8, marginLeft: 8 }} />
                </Dropdown>
                {/* Language and Notification dropdowns can be added here */}
              </div>
            )}

            {isMobile && (
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                  position: 'absolute',
                  top: 0,
                  [ii18.dir() === "rtl" ? 'right' : 'left']: 0,
                }}
              />
            )}
          </Header>
        )}
        <Content
          style={{
            margin: isMarketingPage ? 0 : '50px 10px 16px 10px',
            padding: isMarketingPage ? 0 : 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
           
            <Route element={<ClientRoute />}>
              <Route path='/client' element={<DashboardCl />} />
              <Route path='/marketing' element={<MarketingPage />} />
            </Route>
            <Route path="/" element={<Home />} />
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Signin />} />
              <Route path="/register" element={<Signup />} />
            </Route>
          </Routes>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design 2024 Created by Ant zoominmedia
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
