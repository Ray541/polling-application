import React from 'react';
import {
  FormWrapper,
  LoginStyle,
  LoginImagediv,
  LoginImg,
} from './Login.styled';
import { useLoginStore } from './loginStore'; //Import Zustand Login Store
import Form from '../Form/Form';
import LoginImage from '../../assets/login-img.png';

const Login = () => {
  const { formData, setFormData, resetFormData } = useLoginStore(); //Zustand Login Store

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData.email);
    console.log(formData.password);

    resetFormData();
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
                label: 'Email',
                name: 'email',
                type: 'email',
                value: formData.email,
              },
              {
                label: 'Password',
                name: 'password',
                type: 'password',
                value: formData.password,
              },
            ]}
            submitButton="Sign In"
            onChange={handleInputChange}
            forgotPassword={{
              link: {
                label: 'Forgot Password !!',
                to: '/Forgot',
              },
            }}
            redirect={{
              redirectLabel: "Don't have an Account?",
              link: {
                label: 'Sign Up',
                to: '/SignUp',
              },
            }}
            onSubmit={handleFormSubmit}
          />
        </FormWrapper>
      </LoginStyle>
    </>
  );
};

export default Login;
