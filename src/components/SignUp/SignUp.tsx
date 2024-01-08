import React from 'react';
import {
    FormWrapper,
    SignupStyle,
    SignupImagediv,
    SignupImg,
} from './Signup.styled';
import Form from '../Form/Form';
import SignupImage from "../../assets/signup-img.png"

const SignUp = () => {
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('first');
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
              },
              {
                label: 'Email',
                name: 'email',
                type: 'email',
              },
              {
                label: 'Password',
                name: 'password',
                type: 'password',
              },
            ]}
            submitButton="Sign Up"
            onSubmit={handleFormSubmit}
            redirect={{
              redirectLabel: "Already have an Account ?",
              link: {
                label: 'Sign In',
                to: '/',
              },
            }}
          />
        </FormWrapper>
      </SignupStyle>
    );
};

export default SignUp;
