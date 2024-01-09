import React from 'react';
import {
  FormWrapper,
  SignupStyle,
  SignupImagediv,
  SignupImg,
} from './Signup.styled';
import { useSignupStore } from './signupStore';
import Form from '../Form/Form';
import SignupImage from '../../assets/signup-img.png';

const SignUp = () => {
  const { formData, setFormData, resetFormData } = useSignupStore(); //Zustand Login Store

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData.username);
    console.log(formData.email);
    console.log(formData.password);

    resetFormData();
  };

  return (
    <SignupStyle>
      <SignupImagediv>
        <SignupImg src={SignupImage} alt="" />
      </SignupImagediv>
      <FormWrapper>
        <Form
          formId="signupForm"
          title="Sign Up"
          formInputArray={[
            {
              label: 'Username',
              name: 'username',
              type: 'text',
              value: formData.username,
            },
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
          submitButton="Sign Up"
          onChange={handleInputChange}
          redirect={{
            redirectLabel: 'Already have an Account ?',
            link: {
              label: 'Sign In',
              to: '/',
            },
          }}
          onSubmit={handleFormSubmit}
        />
      </FormWrapper>
    </SignupStyle>
  );
};

export default SignUp;
