import { Navigate, useLocation } from 'react-router-dom';

interface AnonymousRouteProps {
 children: React.ReactNode;
}

const AnonymousRoute: React.FC<AnonymousRouteProps> = ({ children }) => {
 const session = localStorage.getItem('token');
 const location = useLocation();

 if (session) {
    return <Navigate to="/Dashboard" state={{ from: location }} />;
 }

 return <>{children}</>;
};

export default AnonymousRoute;
