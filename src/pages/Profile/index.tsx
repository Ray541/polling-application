import React, { useEffect, useState } from 'react';
import { StyledProfile } from './Profile.styled';
import { supabase } from '../../supabase/supabaseClient';
import { Card, CardBody, CardTitle } from 'reactstrap';
import styled from 'styled-components';

const Profile = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');

  useEffect(() => {
    const fetchSession = async () => {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();
      if (sessionError || !sessionData?.session?.user?.email) return;

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', sessionData.session.user.email);
      if (error) {
        console.error('Error fetching user data: ', error);
      } else if (data.length > 0) {
        setUserName(data[0].username);
        setUserEmail(data[0].email);
        setCreatedAt(data[0].created_at);
        setUpdatedAt(data[0].updated_at);
      }
    };
    fetchSession();
  }, []);

  return (
    <>
      <StyledProfile>
        <StyledCard>
          <StyledCardTitle>Profile</StyledCardTitle>
          <StyledCardBody>
            <p>
              Username: <span>{userName}</span>
            </p>
            <p>
              Email: <span>{userEmail}</span>
            </p>
            <p>
              Account Created: <span>{createdAt}</span>
            </p>
            <p>
              Account Linked Created: <span>{updatedAt}</span>
            </p>
          </StyledCardBody>
        </StyledCard>
      </StyledProfile>
    </>
  );
};

export default Profile;

const StyledCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 10px;
  border-radius: 1px;
  border: 2px solid #7e8fa7;
  color: #141414;
  transition: all 0.2s ease;
`;

const StyledCardTitle = styled(CardTitle)`
  width: 100%;
  padding: 10px;
  background-color: #7e8fa7;
  color: #444444;
  font-size: 30px;
  letter-spacing: 0.3px;
`;

const StyledCardBody = styled(CardBody)`
padding: 10px;
  letter-spacing: 0.3px;
  color: #0088ff;

  p {
    font-size: 18px;
    font-weight: 700;

    span {
      font-size: 16px;
      color: gray;
      font-weight: 400;
    }
  }
`;
