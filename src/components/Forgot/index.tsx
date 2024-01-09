import React from 'react';
import Form from '../Form/Form';
import { useForgotPassStore } from './forgotPassStore';
import { StyledForgotSection } from './Forgot.styled';

const ForgotPassword = () => {
  
  const {formData, setFormData, resetFormData} = useForgotPassStore();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleForgotPassFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData.email);
    console.log(formData.newPassword);

    resetFormData();
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
            value: formData.email,
          },
          {
            label: 'New Password',
            name: 'newPassword',
            type: 'password',
            value: formData.newPassword,
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
        onSubmit={handleForgotPassFormSubmit}
      />
    </StyledForgotSection>
  );
};

export default ForgotPassword;
