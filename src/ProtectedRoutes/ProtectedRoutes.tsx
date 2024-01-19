import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children
}) => {
  const session = localStorage.getItem('token');
  const location = useLocation();

  if (!session) {
    return <Navigate to="/" state={{ from: location }} />;
  } else {
    return <>{children}</>;
  }
};

export default ProtectedRoute;
