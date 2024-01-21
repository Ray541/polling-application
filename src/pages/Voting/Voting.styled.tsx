import styled from 'styled-components';

export const StyledVote = styled.section`
  width: 100%;
  min-height: 100vh;
  background-color: #001124;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
`;

export const StyleVoteTitle = styled.h1`
  color: #242424;
  color: silver;
  font-size: 50px;
  font-weight: 600;
  letter-spacing: 1px;
`;

export const StyledVotingHolder = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  @media (width >= 320px) and (width <= 425px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  @media (width >= 426px) and (width <= 768px) {
    width: 80%;
    flex-wrap: wrap;
  }
`;

export const StyledVotePoster = styled.div`
  width: 100%;
  height: auto;
  padding: 10px;
  background-color: #c0c0c033;
  border: 1px solid silver;
  border-radius: 10px;
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
`;

export const StyledVoteText = styled.span`
  margin: 10px;
  color: silver;
  font-size: 15px;
  font-weight: 500;
`;

export const StyledVotePanel = styled.div`
  width: 100%;
  height: auto;
  padding: 10px;
  border: 1px solid silver;
  border-radius: 10px;
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
`;

export const StyledVoteButtonHolder = styled.div`
  width: 100%;
  height: auto;
  padding: 10px;
  border-radius: 10px;
  gap: 5px;

  button {
    border-radius: 5px;
  }
`;
