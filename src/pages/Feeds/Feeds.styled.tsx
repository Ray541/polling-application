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

export const Searchbar = styled.input`
  padding: 5px 10px;
  font-size: 15px;
  letter-spacing: 1.3px;
  font-weight: 500;
  border: 2px solid #4B5563;
  outline: unset;
  color: #4B5563;
`;
