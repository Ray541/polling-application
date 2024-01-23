import styled from 'styled-components';

export const StyledSnackbar = styled.div`
  position: fixed;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.7px;
  top: 10%;
  right: 50px;
  transform: translateY(-50px);
  background-color: #141414ee;
  color: #0088ff;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-bottom: 2px solid #0088ff;
`;
