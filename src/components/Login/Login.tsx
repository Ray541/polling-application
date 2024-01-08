import React from 'react';
import {
  FormWrapper,
  LoginStyle,
  LoginImagediv,
  LoginImg,
} from './Login.styled';
import Form from '../Form/Form';
import LoginImage from '../../assets/login-img.png';

const Login = () => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('first');
  };

  return (
    <>
      <LoginStyle>
        <LoginImagediv>
          <LoginImg src={LoginImage} alt="" />
        </LoginImagediv>
        <FormWrapper>
          <Form
          formId="loginForm"
            title="Sign In"
            formInputArray={[
              {
                label: 'Username',
                name: 'username',
                type: 'text',
              },
              {
                label: 'Password',
                name: 'password',
                type: 'password',
              },
            ]}
            submitButton="Sign In"
            onSubmit={handleFormSubmit}
            forgotPassword={
              {
                link:
                {
                  label: "Forgot Password !!",
                  to: "/Forgot"
                }
              }
            }
            redirect={{
              redirectLabel: "Don't have an Account?",
              link: {
                label: 'Sign Up',
                to: '/SignUp',
              },
            }}
          />
        </FormWrapper>
      </LoginStyle>
    </>
  );
};

export default Login;
