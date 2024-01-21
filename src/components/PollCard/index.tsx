import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/supabaseClient';
import { Card, CardBody, CardTitle } from 'reactstrap';
import styled from 'styled-components';
import {
  StyledCardBodyTop,
  StyledPollBadge,
  StyledCardBodyBotttom,
} from './PollCard.styled';

interface Poll {
  poll_id: string;
  question: string;
  options: {
    option_id: number;
    poll_id: number;
    option_text: string;
  }[];
  creator_id: string;
  created_at: string;
}

interface CardProps {
  data: Poll[];
  onClick: (poll: Poll) => void;
}

const PollCard: React.FC<CardProps> = ({ data, onClick }) => {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session?.user || !data.session.user.email) return;
      setUserEmail(data.session.user.email);
    };
    fetchSession();
  }, [userEmail]);

  return (
    <>
      {data.map((poll, index) => (
        <StyledCard key={index} onClick={onClick}>
          <CardBody>
            <StyledCardBodyTop>
              <StyledPollBadge>Poll Question</StyledPollBadge>
              <StyledCardTitle tag="h5">{poll.question}</StyledCardTitle>
            </StyledCardBodyTop>
            <StyledCardBodyBotttom>
              <p>
                Created By:<span> {poll.creator_id}</span>
              </p>
              <p>
                Created At:<span> {poll.created_at}</span>
              </p>
              <p>
                Options:
                {poll.options.map((option, index) => (
                  <span key={index}>| {option.option_text} |</span>
                ))}
              </p>
            </StyledCardBodyBotttom>
          </CardBody>
        </StyledCard>
      ))}
    </>
  );
};

export default PollCard;

const StyledCard = styled(Card)`
  width: 280px;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  // background-color: whitesmoke;
  background-color: #7e8fa7;
  border: 1px solid #dddddd;
  color: #141414;
  // box-shadow: 2px 3px 10px #c0c0c09c;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 2px 3px 10px silver;
  }
`;

const StyledCardTitle = styled(CardTitle)`
  font-size: 20px;
  letter-spacing: 0.3px;
  color: #0088ff;
`;
