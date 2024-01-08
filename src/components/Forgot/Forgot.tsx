import React from 'react';
import Form from '../Form/Form';
import { StyledForgotSection } from './Forgot.styled';

const Forgot = () => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('first');
  };

  return (
    <StyledForgotSection>
      <Form
        formId="forgotPasswordForm"
        title="Forgot Passowrd"
        formInputArray={[
          {
            label: 'Email',
            name: 'email',
            type: 'email',
          },
          {
            label: 'New Password',
            name: 'newpassword',
            type: 'text',
          },
        ]}
        submitButton="Reset Password"
        onSubmit={handleFormSubmit}
        forgotPassword={null}
        redirect={{
          redirectLabel: 'Have an Acount ?',
          link: {
            label: 'Sign In',
            to: '/',
          },
        }}
      />
    </StyledForgotSection>
  );
};

export default Forgot;
