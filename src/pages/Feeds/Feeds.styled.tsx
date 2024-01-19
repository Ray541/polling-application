import styled from 'styled-components';

export const StyledPollList = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;

  @media screen and (max-width: 600px) {
    table {
      display: block;
      width: 100%;
      overflow-x: auto;
    }
   }
`;
