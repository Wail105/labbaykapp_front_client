import { Navigate, Outlet } from "react-router-dom";

const AuthMiddleware = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/login" />;
  } else {

    return <Outlet/>
  }
  
};

export default AuthMiddleware;
