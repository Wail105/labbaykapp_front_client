import React, { useEffect, useRef, useState } from "react";
import "./navBar.css";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Ripple, initMDB } from "mdb-ui-kit";

initMDB({ Dropdown, Ripple });

const NavBar = () => {
    const navRef = useRef(null);
    const searchToggleRef = useRef(null);
    const sidebarOpenRef = useRef(null);
    const sidebarCloseRef = useRef(null);
    const actionDropdownRef = useRef(null);
    const languageDropdownRef = useRef(null);
    const userMenuRef = useRef(null);

    const [isActionDropdownOpen, setIsActionDropdownOpen] = useState(false);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // State for user authentication
    const [username, setUsername] = useState(''); // State for user's name

    const { t, i18n } = useTranslation();
    const navigate = useNavigate(); // For redirecting after logout

    useEffect(() => {
        // Simulate authentication check (replace this with real auth logic)
        const token = localStorage.getItem('token');
        if (token) {
            // Assume the user is authenticated if there's a token
            setIsAuthenticated(true);
            // Simulate fetching user's name (replace with real API call)
            setUsername(JSON.parse(localStorage.getItem('user')).username || 'User'); 
        }

        const nav = navRef.current;
        const searchToggle = searchToggleRef.current;
        const sidebarOpen = sidebarOpenRef.current;
        const sidebarClose = sidebarCloseRef.current;

        const handleSearchToggle = () => {
            searchToggle.classList.toggle("active");
        };

        const handleSidebarOpen = () => {
            nav.classList.add("active");
        };

        const handleSidebarClose = () => {
            nav.classList.remove("active");
        };

        const handleBodyClick = (e) => {
            let clickedElm = e.target;

            if (!clickedElm.classList.contains("my-sidebarOpen") && !clickedElm.closest(".my-nav-bar")) {
                nav.classList.remove("active");
            }

            if (actionDropdownRef.current && !actionDropdownRef.current.contains(clickedElm)) {
                setIsActionDropdownOpen(false);
            }

            if (languageDropdownRef.current && !languageDropdownRef.current.contains(clickedElm)) {
                setIsLanguageDropdownOpen(false);
            }

            if (userMenuRef.current && !userMenuRef.current.contains(clickedElm)) {
                setIsUserMenuOpen(false);
            }
        };

        if (searchToggle) {
            searchToggle.addEventListener("click", handleSearchToggle);
        }

        if (sidebarOpen) {
            sidebarOpen.addEventListener("click", handleSidebarOpen);
        }

        if (sidebarClose) {
            sidebarClose.addEventListener("click", handleSidebarClose);
        }

        document.body.addEventListener("click", handleBodyClick);

        return () => {
            if (searchToggle) {
                searchToggle.removeEventListener("click", handleSearchToggle);
            }
            if (sidebarOpen) {
                sidebarOpen.removeEventListener("click", handleSidebarOpen);
            }
            if (sidebarClose) {
                sidebarClose.removeEventListener("click", handleSidebarClose);
            }
            document.body.removeEventListener("click", handleBodyClick);
        };
    }, []);

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        setIsLanguageDropdownOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsAuthenticated(false);
        navigate('/login');
        window.location.reload(); 
 
    };  

    return (
        <nav ref={navRef}>
            <div className="my-nav-bar">
                <i className="bx bx-menu my-sidebarOpen" ref={sidebarOpenRef}></i>
                <span className="my-logo my-navLogo"><a href="#">
                    <img src="\images\logos\Full logo\PNG\white on orange.png" alt="" width={"100px"}/>
                    </a></span>
                <div className="my-menu">
                    <div className="my-logo-toggle">
                        <span className="my-logo"><a href="#">menu</a></span>
                        <i className="bx bx-x my-siderbarClose" ref={sidebarCloseRef}></i>
                    </div>
                    <ul className="my-nav-links mt-3">
                        <li><Link to="/">{t('home')}</Link></li>
                        <li><Link to="/about">{t('about')}</Link></li>
                        <li><Link to="/portfolio">{t('portfolio')}</Link></li>
                        <li><Link to="/services">{t('services')}</Link></li>

                        <li ref={languageDropdownRef}>
                            <a
                                className="btn btn-link dropdown-toggle"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
                                }}
                                aria-expanded={isLanguageDropdownOpen}
                            >
                                {t('language')}
                            </a>
                            <ul className={`dropdown-menu ${isLanguageDropdownOpen ? "show" : ""}`}>
                                <li><a className="dropdown-item d-flex align-items-center" href="#" onClick={() => changeLanguage('en')}>
                                    <img width={"15px"} src="images/flags/us.png" alt="us" />
                                    <span className="mt-1 ms-2">English</span>
                                    </a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => changeLanguage('fr')}>
                                   <img width={"15px"} src="images/flags/fr.png" alt="fr" />  
                                    <span className="mt-1 ms-2">Français</span>    
                                </a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => changeLanguage('ar')}>
                                    <img width={"15px"} src="images/flags/ma.png" alt="ar" />   
                                    <span className="mt-1 ms-2">العربية</span>    
                                </a></li>
                            </ul>
                        </li>
                    </ul>
                </div>

                {/* User Toggle Menu */}
                <div ref={userMenuRef} className="user-toggle mt-1">
                    <a
                        style={{'fontSize':'20px'}}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsUserMenuOpen(!isUserMenuOpen);
                        }}
                        aria-expanded={isUserMenuOpen}
                    >
                        <i className="bi bi-person-circle"></i>
                    </a>
                    <ul style={{'right':"10px"}} className={`dropdown-menu ${isUserMenuOpen ? "show" : ""}`}>
                        {isAuthenticated ? (
                            <>
                                <li><Link Link className="dropdown-item" to="/test">{t('hello')}, {username}</Link></li>
                                <li><a className="dropdown-item" href="#" onClick={handleLogout}>{t('logout')}</a></li>
                            </>
                        ) : (
                            <>
                                <li><Link className="dropdown-item" to="/login">{t('signin.loginButton')} <i className="bi bi-box-arrow-in-right"></i></Link></li>
                                <li><Link className="dropdown-item" to="/register">{t('signin.createAccount')}</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
