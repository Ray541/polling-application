import styled from 'styled-components';

export const StyledModalWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(3px);
  z-index: 99999;
`;

export const StyledModal = styled.div`
  height: auto;
  background-color: white;
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  border-radius: 10px;
`;

export const StyledModalHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 0 30px;
`;

export const StyledModalTitle = styled.div`
  font-size: 30px;
  font-weight: 900;
  color: #0088ff;

  @media (width >= 320px) and (width <= 425px) {
    font-size: 25px;
  }
`;

export const StyledModalBody = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
`;

export const CloseModal = styled.button`
  cursor: pointer;
  padding: 5px 7px;
  background-color: transparent;
  font-size: 15px;
  letter-spacing: 0.7px;
  font-weight: 900;
  border-radius: 5px;
  border: 1px solid #141414;
  transition: all 0.2s ease;

  &:hover,
  &:focus {
    color: #dadada;
    background-color: #141414;
  }
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
  gap: 3px;
  }
`;

export const StyledLabel = styled.label`
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 5px;
`;

export const StyledErrorMessage = styled.p`
  font-size: 12px;
  color: #f74231;
`;

export const StyledFormButton = styled.button`
  width: 100%;
  margin-top: 10px;
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
