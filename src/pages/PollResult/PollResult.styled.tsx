import styled from 'styled-components';

export const StyledPollResult = styled.section`
  width: 100%;
  min-height: 100vh;
  background-color: #001124;
  color: silver;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
`;

export const StyledPollDetails = styled.section`
  display: flex;
  padding: 10px;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #dadada;
  border-radius: 10px;
  background-color: #c0c0c033;
`;

export const StyledResultText = styled.span`
  margin: 10px;
  color: silver;
  font-size: 15px;
  font-weight: 500;
`;

export const StyledResultDetails = styled.section`
  padding: 10px;
  border: 1px solid #dadada;
  border-radius: 10px;
  background-color: #c0c0c033;
`;
