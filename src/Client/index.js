import React from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Home from './home/home.jsx'
import ThanksPage from './ThanksPage/ThanksPage.jsx'
import Signin from "../auth/signin/signin.jsx"
import Signup from "../auth/signup/signup.jsx"
import NavBar from '../navBar/navBar.jsx';
import DashboardCl from './dashboard/dashboard.jsx';

// const NotAdminRoute = () => {
//     const role = localStorage.getItem('roles');
//     return role !== "admin" ? <Outlet /> : <Navigate to="/admin" />;
//   };
  const PublicRoute = () => {
    const token = localStorage.getItem('token');
    return token ? <Navigate to="/" /> : <Outlet />;
  };

const ClientPages = () => {
    const location = useLocation();
    const showSidebar = location.pathname.startsWith('/admin');
    return (
        <>
        {!showSidebar && <NavBar/> }
        <Routes>
                <Route path="/client" element={<DashboardCl/>}/>
                <Route path="/" element={<Home />} />
                <Route path="/thanks" element={<ThanksPage />} />
                
                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<Signin />} />
                    <Route path="/register" element={<Signup />} />
                </Route>

           
        </Routes>
        </>
    );
}

export default ClientPages;
