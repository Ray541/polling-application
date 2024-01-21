import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  skipLoginCheck?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  skipLoginCheck = false,
}) => {
  const session = localStorage.getItem('token');
  const location = useLocation();

  if (!skipLoginCheck && !session) {
    return <Navigate to="/" state={{ from: location }} />;
  } else {
    return <>{children}</>;
  }
};

export default ProtectedRoute;
