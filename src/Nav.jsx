import React from 'react';
import NavBar from './navBar/navBar';
import SideBar from './admin/sideBar/sidebar';

const Nav = () => {
    const role=localStorage.getItem('roles')
    return role=="admin"? <SideBar/> : <NavBar/>;
}

export default Nav;
