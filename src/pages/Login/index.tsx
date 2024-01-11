import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import {
  LoginStyle,
  LoginImagediv,
  LoginImg,
  FormWrapper,
  StyledFormTitle,
  StyledInputDiv,
  StyledLabel,
  StyledErrorMessage,
  StyledForgot,
  StyledRedirect,
  StyledRedirectLabel,
  StyledRedirectLink,
  StyledFormButton,
} from './Login.styled';
import styled from 'styled-components';
import LoginImage from '../../assets/login-img.png';
import { supabase } from '../../supabase/supabaseClient';
import { useNavigate } from 'react-router-dom';

/**Validation Schema
 * Email -> Required, Invalid Mail
 * Password -> Required, MinLength - 6
 */

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is a Required field')
    .email('Invalid Email'),
  password: yup
    .string()
    .required('Password is a Required Field')
    .min(6, 'At least 6 Characters'),
});

const LoginForm = () => {
  const navigate = useNavigate();

  return (
    <LoginStyle>
      <LoginImagediv>
        <LoginImg src={LoginImage} alt="" />
      </LoginImagediv>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const { data, error } = await supabase.auth.signInWithPassword({
              email: values.email,
              password: values.password,
            });

            if (error) {
              throw error;
            } else {
              localStorage.setItem('token', data.session.access_token);
              // sessionStorage.setItem('token', data.session.access_token);
              navigate('/Dashboard');
              console.log(data);
            }
          } catch (error) {
            alert(error);
          } finally {
            resetForm();
          }
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
          <FormWrapper>
            <StyledForm onSubmit={handleSubmit}>
              <StyledFormTitle>Sign In</StyledFormTitle>
              <StyledInputDiv>
                <StyledLabel htmlFor="email">Email</StyledLabel>
                <StyledField
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="off"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email && (
                  <StyledErrorMessage>{errors.email}</StyledErrorMessage>
                )}
              </StyledInputDiv>
              <StyledInputDiv>
                <StyledLabel htmlFor="password">Password</StyledLabel>
                <StyledField
                  id="password"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.password && errors.password && (
                  <StyledErrorMessage>{errors.password}</StyledErrorMessage>
                )}
              </StyledInputDiv>
              <StyledForgot to="/Forgot">Forgot Password !!</StyledForgot>
              <StyledRedirect>
                <StyledRedirectLabel>
                  Don't have an Account?
                </StyledRedirectLabel>
                <StyledRedirectLink to="/Signup">Sign Up</StyledRedirectLink>
              </StyledRedirect>
              <StyledFormButton type="submit">Sign In</StyledFormButton>
            </StyledForm>
          </FormWrapper>
        )}
      </Formik>
    </LoginStyle>
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
