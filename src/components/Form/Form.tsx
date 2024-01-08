import React from 'react';
import {
  StyledForm,
  StyledFormTitle,
  StyledControl,
  StyledLabel,
  StyledInput,
  StyledFormButton,
  StyledForgot,
  StyledRedirect,
  StyledRedirectLabel,
  StyledRedirectLink,
} from './Form.styled';

interface FormProps {
  formId?: string;
  title: string;
  formInputArray: Array<{
    label: string;
    name: string;
    type: string;
  }>;
  submitButton: string;
  onSubmit: (e: React.FormEvent) => void;
  forgotPassword?: {
    link: {
      label: string;
      to: string;
    };
  } | null;
  redirect?: {
    redirectLabel: string;
    link: {
      label: string;
      to: string;
    };
  } | null;
}

const Form: React.FC<FormProps> = ({
  formId,
  title,
  formInputArray,
  submitButton,
  onSubmit,
  forgotPassword,
  redirect,
}) => {
  return (
    <>
      <StyledForm id={formId}>
        <StyledFormTitle>{title}</StyledFormTitle>
        {formInputArray.map(({ label, name, type }, index) => (
          <StyledControl key={index}>
            <StyledLabel htmlFor={name}>{label}</StyledLabel>
            <StyledInput id={name} type={type} name={name} />
          </StyledControl>
        ))}
        {forgotPassword && (
          <StyledForgot to={forgotPassword.link.to}>
            {forgotPassword.link.label}
          </StyledForgot>
        )}
        {redirect && (
          <StyledRedirect>
            <StyledRedirectLabel>{redirect.redirectLabel}</StyledRedirectLabel>
            <StyledRedirectLink to={redirect.link.to}>
              {redirect.link.label}
            </StyledRedirectLink>
          </StyledRedirect>
        )}
        <StyledFormButton onClick={onSubmit}>{submitButton}</StyledFormButton>
      </StyledForm>
    </>
  );
};

export default Form;
