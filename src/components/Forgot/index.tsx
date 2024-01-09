import React, { useState } from 'react';
import Form from '../Form/Form';
import { StyledForgotSection } from './Forgot.styled';

const Forgot = () => {
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData.email);
    console.log(formData.newPassword);

    setFormData({
      email: '',
      newPassword: '',
    });
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
            name: 'newassword',
            type: 'text',
          },
        ]}
        submitButton="Reset Password"
        onChange={handlePasswordChange}
        forgotPassword={null}
        redirect={{
          redirectLabel: 'Have an Acount ?',
          link: {
            label: 'Sign In',
            to: '/',
          },
        }}
        onSubmit={handleFormSubmit}
      />
    </StyledForgotSection>
  );
};

export default Forgot;
