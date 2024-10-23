import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('roles');

  // Check if the user is an admin
  if (role === 'admin') {
    return <Outlet />; // Render admin routes
  } else {
    return <Navigate to="/" />; // Redirect if not admin
  }
};

export default AdminRoute;
