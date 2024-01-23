import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const session = localStorage.getItem('token');
  const location = useLocation();

  if (
    (location.pathname === '/' || location.pathname === '/Signup') &&
    session
  ) {
    // If the user is trying to access these pages and they are already logged in, redirect them to the dashboard
    return <Navigate to="/Dashboard" />;
  }
  if (!session) {
    return <Navigate to="/LogIn" state={{ from: location }} />;
  } else {
    return <>{children}</>;
  }
};

export default ProtectedRoute;
