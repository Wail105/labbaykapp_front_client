import React, { useState, useEffect } from 'react';
import { Layout, theme, Button, Dropdown, Menu, Avatar, Badge } from 'antd';
import { Route, Routes, useLocation, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import ii18 from './i18n'; 
import MarketingPage from './Client/Marketing/MarketingPage.js';
import { useTranslation } from 'react-i18next';

const {  Content, Footer, Sider } = Layout;


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

 

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
<>
<Routes>
           
          
          
           <Route path='/marketing' element={<MarketingPage />} />
    
        
       </Routes>

     <Footer
       style={{
         textAlign: 'center',
       }}
     >
       Ant Design 2024 Created by Ant zoominmedia
     </Footer>
  </>
      
         
  
  );
};

export default App;
