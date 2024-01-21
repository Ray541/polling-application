import styled from 'styled-components';

export const StyledCardBodyTop = styled.div`
  width: 100%;
  background-color: #242424;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

export const StyledPollBadge = styled.span`
  background-color: black;
  padding: 5px;
  border-radius: 5px;
  font-size: 11px;
  border: 1px solid transparent;
  letter-spacing: 0.3px;
  color: #0088ff;
  transition: all 0.1s ease;

  &:hover {
    background-color: #0088ff;
    color: #141414;
  }
`;

export const StyledCardBodyBotttom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;

  p {
    font-size: 15px;
    color: #f3f3f3;
    margin: 5px;
    font-weight: 700;
    letter-spacing: 0.3px;
  }

  span {
    margin: 5px;
    color: #dadada;
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 0.3px;
  }
`;
