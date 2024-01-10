// import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabase/supabaseClient';

interface ProtectedRouteProps {
 children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
 const location = useLocation();
 const session = supabase.auth.session();

 if (!session) {
  return <Navigate to="/" state={{ from: location }} />;
 }

 return <>{children}</>;
};

export default ProtectedRoute;
