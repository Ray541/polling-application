import React from 'react';
import styled from 'styled-components';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import Button from '../../components/Button/Button';
import {
  StyledModalWrapper,
  StyledModal,
  StyledModalHeader,
  StyledModalTitle,
  StyledModalBody,
  StyledInputDiv,
  StyledLabel,
  StyledFormButton,
  CloseModal,
} from './CreatePoll';

interface PollFormState {
  question: string;
  options: string[];
  onClose: () => void;
}

/**Validation Schema
 * Email -> Required, Invalid Mail
 * Password -> Required, MinLength - 6
 */

const validationSchema = Yup.object().shape({
  question: Yup.string().required('Required'),
  options: Yup.array().of(Yup.string().required('Required')),
});

const CreatePoll: React.FC<PollFormState> = ({ onClose }) => {
  return (
    <>
      <StyledModalWrapper className="fixed inset-0 font-mono">
        <StyledModal>
          <StyledModalHeader>
            <StyledModalTitle>Make a Poll</StyledModalTitle>
            <CloseModal className="flex items-center gap-1" onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </CloseModal>
          </StyledModalHeader>
          <StyledModalBody>
            <Formik
              initialValues={{ question: '', dynamicFields: [] }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {() => (
                <Formik
                  initialValues={{ question: '', dynamicFields: [] }}
                  onSubmit={(values) => {
                    // Handle form submission
                    console.log(values);
                  }}
                >
                  {({ values }) => (
                    <PollCreationForm>
                      <StyledLabel htmlFor="question">
                        Poll Question
                      </StyledLabel>
                      <StyledField id="question" type="text" name="question" />
                      <StyledErrorMessage name="question" component="div" />
                      <FieldArray name="dynamicFields">
                        {({ remove, push }) => (
                          <div className="w-full">
                            {values.dynamicFields.length > 0 &&
                              values.dynamicFields.map((field, index) => (
                                <StyledInputDiv key={index}>
                                  <StyledLabel>
                                    {`Option ${index + 1}`}
                                  </StyledLabel>

                                  <div className="w-full flex gap-2">
                                    <StyledField
                                      name={`dynamicFields.${index}`}
                                      placeholder={`Option ${index + 1}`}
                                    ></StyledField>
                                    <button
                                      type="button"
                                      onClick={() => remove(index)}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                </StyledInputDiv>
                              ))}
                            <button
                              className="mt-3 p-2 rounded-md flex items-center gap-2 bg-black text-white text-sm"
                              type="button"
                              onClick={() => push('')}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                              </svg>
                              Options
                            </button>
                          </div>
                        )}
                      </FieldArray>
                      <StyledFormButton type="submit">
                        Create Poll
                      </StyledFormButton>
                    </PollCreationForm>
                  )}
                </Formik>
              )}
            </Formik>
          </StyledModalBody>
        </StyledModal>
      </StyledModalWrapper>
    </>
  );
};

export default CreatePoll;

const PollCreationForm = styled(Form)`
  margin: 15px;
`;

const StyledErrorMessage = styled(ErrorMessage)`
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.7px;
  color: #f74231;
`;

const StyledField = styled(Field)`
  width: 100%;
  padding: 5px 10px;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.3px;
  background-color: transparent;
  outline: none;
  border-radius: 5px;
  border: 1px solid #015fc7;

  &:focus {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
