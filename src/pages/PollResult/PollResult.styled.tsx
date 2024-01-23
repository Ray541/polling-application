import styled from 'styled-components';

export const StyledPollResult = styled.section`
  padding: 30px 10px;
  width: 100%;
  min-height: 100vh;
  background-color: #001124;
  color: silver;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 30px;
`;

export const StyledPollResultTitle = styled.h1`
  font-size: 40px;
  letter-spacing: 1px;
  font-weight: 700;
`;

export const StyledPollDetails = styled.div`
  display: flex;
  padding: 10px;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #dadada;
  border-radius: 10px;
  background-color: #c0c0c033;
`;

export const StyledPollTextDetails = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  justify-content: center;
  gap: 20px;
`;

export const StyledPollGraphTitle = styled.h1`
  font-size: 35px;
  font-weight: 300;
`;

export const StyledGraphHolder = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;

export const StyledResultText = styled.span`
  margin: 10px;
  color: silver;
  font-size: 15px;
  font-weight: 500;
`;

export const StyledResultDetails = styled.div`
  width: 600px;
  height: 315px;
  padding: 10px;
  border: 1px solid #dadada;
  border-radius: 10px;
  background-color: #c0c0c033;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (width >=320px) and (width <= 600px) {
    width: 300px;
    height: auto;
  }
`;
