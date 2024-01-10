import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SignupStyle = styled.section`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #001124;
  display: grid;
  grid-template-columns: 2fr 2.5fr;

  @media (width >= 768px) and (width<= 1024px) {
    grid-template-columns: 1fr 1fr;
    padding: 2rem;
    grid-gap: 1rem;
  }

  @media (width >= 320px) and (width < 768px) {
    grid-gap: 1rem;
    grid-template-columns: unset;
    padding: 30px 10px;
  }
`;

export const SignupImagediv = styled.div`
  display: grid;
  // align-items: center;
  place-content: center;

  @media (width >= 768px) and (width<= 1024px) {
    place-items: center;
  }

  @media (width >= 320px) and (width < 768px) {
    place-items: center;
  }
`;

export const SignupImg = styled.img`
  width: 100%;

  @media (width >= 768px) and (width<= 1024px) {
    width: 80%;
  }

  @media (width >= 320px) and (width < 768px) {
    width: 80%;
  }
`;

export const FormWrapper = styled.div`
  display: grid;
  place-items: center;
`;

export const StyledFormTitle = styled.h1`
  color: #015fc7;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 10px;
`;

export const StyledInputDiv = styled.div`
  width: 100%;
  height: auto;
  margin: 10px 0px 10px 0px;
  display: flex;
  align-items: start;
  justify-content: center;

  flex-direction: column;
  gap: 5px;
  }
`;

export const StyledLabel = styled.label`
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 5px;
`;

export const StyledErrorMessage = styled.p`
  font-size: 12px;
  color: #f74231;
`;

export const StyledRedirect = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
  margin: 10px;

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
