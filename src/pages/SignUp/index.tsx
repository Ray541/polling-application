import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import {
  SignupStyle,
  SignupImagediv,
  SignupImg,
  FormWrapper,
  StyledFormTitle,
  StyledInputDiv,
  StyledLabel,
  StyledErrorMessage,
  StyledRedirect,
  StyledRedirectLabel,
  StyledRedirectLink,
  StyledFormButton,
} from './Signup.styled';
import styled from 'styled-components';
import SignUpImage from '../../assets/signup-img.png';
import { supabase } from '../../supabase/supabaseClient';

/**Validation Schema
 * Email -> Required, Invalid Mail
 * Password -> Required, MinLength - 6
 */

const validationSchema = yup.object().shape({
  fullname: yup.string().required('Fullname is a Required field'),
  email: yup
    .string()
    .required('Email is a Required field')
    .email('Invalid Email'),
  password: yup
    .string()
    .required('Password is a Required Field')
    .min(6, 'At least 6 Characters'),
});

const Signup = () => {
  return (
    <SignupStyle>
      <SignupImagediv>
        <SignupImg src={SignUpImage} alt="" />
      </SignupImagediv>
      <Formik
        initialValues={{ fullname: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          const { error } = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
          });
          if (error) {
            console.log(error);
          } else {
            alert('Email Verification Link is sent to the email you entered.');
          }
          resetForm();
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
              <StyledFormTitle>Sign Up</StyledFormTitle>
              <StyledInputDiv>
                <StyledLabel htmlFor="fullname">Fullname</StyledLabel>
                <StyledField
                  id="fullname"
                  autoComplete="off"
                  type="text"
                  name="fullname"
                  value={values.fullname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.fullname && errors.fullname && (
                  <StyledErrorMessage>{errors.fullname}</StyledErrorMessage>
                )}
              </StyledInputDiv>
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
                <StyledLabel htmlFor="password">Password</StyledLabel>
                <StyledField
                  id="password"
                  autoComplete="off"
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
              <StyledRedirect>
                <StyledRedirectLabel>Have an Account?</StyledRedirectLabel>
                <StyledRedirectLink to="/">Sign In</StyledRedirectLink>
              </StyledRedirect>
              <StyledFormButton type="submit">Sign Up</StyledFormButton>
            </StyledForm>
          </FormWrapper>
        )}
      </Formik>
    </SignupStyle>
  );
};

export default Signup;

const StyledForm = styled(Form)`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #015fc7;
  padding: 25px;
  border-radius: 5px;
  color: white;

  @media (width >= 320px) and (width <= 425px) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 15px 30px;
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
