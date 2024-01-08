import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #015fc7;
  padding: 20px 30px;
  width: auto;
  height: auto;
  border-radius: 5px;
  color: white;

  @media (width >= 320px) and (width <= 425px) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 15px;
  }
`;

export const StyledFormTitle = styled.span`
  font-size: 25px;
  font-weight: 700;
  color: #015fc7;
  margin-bottom: 10px;
`;

export const StyledControl = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  margin: 5px 0 5px 0;
`;

export const StyledLabel = styled.label`
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 5px;
`;

export const StyledInput = styled.input`
  outline: unset;
  padding: 5px;
  width: 250px;
  border: 1px solid #015fc7;
  background-color: transparent;
  color: black;
  border-radius: 5px;
  color: white;
  letter-spacing: 0.7px;
  font-size: 15px;
  font-weight: 300;

  &:focus {
    border: 1px solid #015fc7fa;
  }
`;

export const StyledFormButton = styled.button`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 7px 15px;
  color: white;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.5px;
  transition: all 0.2s ease;
  outline: unset;
  border-radius: 5px;
  background-color: #3b82f6;

  &:hover,
  &:focus {
    background-color: #015fc7;
  }
`;

export const StyledForgot = styled(Link)`
  margin-top: 15px;
  font-size: 15px;
  color: white;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover,
  &:focus {
    color: #f74231;
  }
`;

export const StyledRedirect = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
  margin: 17px;

  @media (width >= 320px) and (width <= 425px) {
    margin: 10px;
  }
`;

export const StyledRedirectLabel = styled.span`
  font-size: 15px;
`;

export const StyledRedirectLink = styled(Link)`
  font-size: 17px;
  font-weight: 700;
  color: #015fc7;
  outline: none;
  transition: color 0.3s ease;

  &:hover,
  &:focus {
    color: #f74231;
  }
`;
