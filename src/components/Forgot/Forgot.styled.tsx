import styled from 'styled-components';

export const StyledForgotSection = styled.section`
  width: 100%;
  min-height: 100vh;
  display: grid;
  place-content:center;
  background-color: #001124;

  #forgotPasswordForm
  {
    padding: 50px;

    @media(width >= 320px) and (width <= 425px)
    {
    padding: 25px;

    }
  }
`;

// export const LoginStyle = styled.section`
//   width: 100%;
//   height: 100%;
//   min-height: 100vh;
//   background-color: #001124;
//   display: grid;
//   grid-template-columns: 2fr 2.5fr;

//   @media (width >= 768px) and (width<= 1024px) {
//     grid-template-columns: 1fr 1fr;
//     padding: 2rem;
//     grid-gap: 1rem;
// }

// @media (width >= 320px) and (width < 768px) {
//     grid-gap: 1rem;
//     grid-template-columns: unset;
//   }
// `;

// export const FormWrapper = styled.div`
//   display: grid;
//   place-items: center;
// `;

// export const LoginImagediv = styled.div`
//   display: grid;
//   // align-items: center;
//   place-content: center;

//   @media (width >= 768px) and (width<= 1024px) {
//     place-items: center;
// }

// @media (width >= 320px) and (width < 768px) {
//     place-items: center;
//   }
// `;

// export const LoginImg = styled.img`
//   width: 100%;

//   @media (width >= 768px) and (width<= 1024px) {
//     width: 80%;
//   }

//   @media (width >= 320px) and (width < 768px) {
//     width: 80%;
//   }
// `;

// export const StyledFormTitle = styled.h1`
// color: #015fc7;
// font-size: 30px;
// font-weight: 700;
// `;

// export const StyledInputDiv = styled.div`
// width: 100%;
// height: auto;
// margin: 10px 0px 10px 0px;
// display: flex;
// flex-direction: column; 
// gap: 5px;

// input {
//     width: 100%;
//     padding: 5px 10px;
//     font-size: 15px;
//     font-weight: 500;
//     letter-spacing: 1px;
//     color: black;
//     background-color: rgba(255, 255, 255, 0.8);
//     outline: none;
//     border-radius: 5px;
//     border: 2px solid transparent;

//     &:focus{
//         border: 2px solid #015FC7;
//     }
//   }
// `;