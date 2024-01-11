// import React from 'react'
import { StyledDashboard } from './Dashboard.style';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase/supabaseClient';

const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error);
    } else {
      localStorage.removeItem('token');
      // sessionStorage.removeItem('token');
      navigate('/');
    }
  };

  return (
    <>
      <StyledDashboard>
        Dashboard
        <Button label="Log Out" onClick={handleLogOut} />
      </StyledDashboard>
    </>
  );
};

export default Dashboard;
