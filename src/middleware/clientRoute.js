import { Navigate, Outlet } from 'react-router-dom';

const ClientRoute = () => {
  const role = localStorage.getItem('roles');

  console.log(role)
  // Check if the user is a client
  if (role === 'client') {
    return <Outlet />; // Render client routes
  } else {
    return <Navigate to="/admin" />; // Redirect if not client
  }
};

export default ClientRoute;
