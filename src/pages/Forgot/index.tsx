// import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
// import { useNavigate } from 'react-router-dom';
import {
  StyledForgotSection,
  StyledFormTitle,
  StyledInputDiv,
  StyledLabel,
  StyledErrorMessage,
  StyledRedirect,
  StyledRedirectLabel,
  StyledRedirectLink,
  StyledFormButton,
} from './Forgot.styled';
import styled from 'styled-components';
// import { supabase } from '../../supabase/supabaseClient';

/**Validation Schema
 * Email -> Required, Invalid Mail
 * Password -> Required, MinLength - 6
 */

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is a Required field')
    .email('Invalid Email'),
  newPassword: yup
    .string()
    .required('Password is a Required Field')
    .min(6, 'At least 6 Characters'),
});

const LoginForm = () => {
  // const navigate = useNavigate();

  return (
    <StyledForgotSection>
      <Formik
        initialValues={{ email: '', newPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({
          touched,
          errors,
          values,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <StyledForm onSubmit={handleSubmit}>
            <StyledFormTitle>Forgot Password</StyledFormTitle>
            <StyledInputDiv>
              <StyledLabel htmlFor="email">Email</StyledLabel>
              <StyledField
                id="email"
                autoComplete="off"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email && (
                <StyledErrorMessage>{errors.email}</StyledErrorMessage>
              )}
            </StyledInputDiv>
            <StyledInputDiv>
              <StyledLabel htmlFor="newPassword">Password</StyledLabel>
              <StyledField
                id="newPassword"
                autoComplete="off"
                type="password"
                name="newPassword"
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.newPassword && errors.newPassword && (
                <StyledErrorMessage>{errors.newPassword}</StyledErrorMessage>
              )}
            </StyledInputDiv>
            <StyledRedirect>
              <StyledRedirectLabel>Have an Account?</StyledRedirectLabel>
              <StyledRedirectLink to="/">Log In</StyledRedirectLink>
            </StyledRedirect>
            <StyledFormButton type="submit">Reset Password</StyledFormButton>
          </StyledForm>
        )}
      </Formik>
    </StyledForgotSection>
  );
};

export default LoginForm;

const StyledForm = styled(Form)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #015fc7;
  padding: 20px 50px;
  // width: 300px;
  border-radius: 5px;
  color: white;

  @media (width >= 320px) and (width <= 425px) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

const StyledField = styled(Field)`
  width: 100%;
  padding: 5px 10px;
  font-size: 13px;
  font-weight: 300;
  letter-spacing: 0.7px;
  color: white;
  background-color: transparent;
  outline: none;
  border-radius: 5px;
  border: 1px solid #015fc7;

  &:focus {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
