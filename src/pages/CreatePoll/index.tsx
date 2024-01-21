import React from 'react';
import styled from 'styled-components';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
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
} from './CreatePoll.styled';
import { supabase } from '../../supabase/supabaseClient';

interface PollFormState {
  question: string;
  options: string[];
  onClose: () => void;
}

/**Validation Schema
 * Question -> Required
 * Options -> Required
 */

const validationSchema = Yup.object().shape({
  question: Yup.string().required('Required'),
  dynamicFields: Yup.array().of(Yup.string().required('Required')),
});

const CreatePoll: React.FC<PollFormState> = ({ onClose }) => {
  // const createPollWithOptions = async (
  //   userId,
  //   question,
  //   options,
  //   startTime,
  //   endTime,
  // ) => {
  //   const pollData = {
  //     creator_id: userId,
  //     question: question,
  //     start_time: startTime,
  //     end_time: endTime,
  //   };

  //   let pollId;

  //   // Start a transaction
  //   await supabase
  //     .from('polls')
  //     .insert([pollData])
  //     .then((prop) => {
  //       console.log(prop);

  //       // if (error) throw error;

  //       // console.log("Poll -",data);

  //       // if (data && data.length > 0) {
  //       //   pollId = data[0].poll_id; // Get the ID of the newly created poll
  //       //   const optionsData = options.map((option) => ({
  //       //     poll_id: pollId,
  //       //     option_text: option,
  //       //   }));

  //       //   console.log("Options -",data);
  //       //   // Insert options for this poll
  //       //   return supabase.from('options').insert(optionsData);
  //       // }
  //     })
  //     .then(({ error }) => {
  //       if (error) throw error;
  //     })
  //     .catch((error) => {
  //       console.error('Transaction error:', error);
  //       // Handle error, possibly rolling back the transaction
  //     });

  //   return { pollId };
  // };

  return (
    <>
      <StyledModalWrapper className="fixed inset-0">
        <StyledModal>
          <StyledModalHeader>
            <StyledModalTitle>Create a Poll</StyledModalTitle>
            <CloseModal className="flex items-center gap-0.5" onClick={onClose}>
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
              Close
            </CloseModal>
          </StyledModalHeader>
          <StyledModalBody>
            <Formik
              initialValues={{ question: '', dynamicFields: ['', ''] }}
              validationSchema={validationSchema}
              onSubmit={async (values, { resetForm }) => {
                const { data: sessionData, error: sessionError } =
                  await supabase.auth.getSession();
                if (sessionError || !sessionData?.session?.user?.id) return;
                // createPollWithOptions(sessionData.session.user.id, values.question, values.dynamicFields, new Date(), new Date());
                const { data, error } = await supabase.auth.getSession();
                if (data && data.session) {
                  const userId = data.session.user.id;
                  const { error: pollError } = await supabase
                    .from('polls')
                    .insert({ creator_id: userId, question: values.question });

                  if (pollError) {
                    alert(pollError);
                  }

                  /**Insert poll options in options table */

                  const { data: extractPollData, error: pollExtractError } =
                    await supabase
                      .from('polls')
                      .select('poll_id')
                      .eq('creator_id', userId)
                      .limit(1)
                      .order('created_at', { ascending: false });

                  if (pollExtractError) {
                    alert(pollExtractError);
                  }

                  const pollId = extractPollData
                    ? extractPollData[0].poll_id
                    : null;

                  const options = values.dynamicFields.map((option) => ({
                    poll_id: pollId,
                    option_text: option,
                  }));

                  await supabase.from('options').insert(options);
                } else {
                  alert(error);
                }
                resetForm();
              }}
            >
              {({ values }) => (
                <PollCreationForm>
                  <StyledLabel htmlFor="question">Poll Question</StyledLabel>
                  <StyledField
                    className="mb-2"
                    id="question"
                    type="text"
                    name="question"
                    placeholder="Type Question..."
                  />
                  <StyledErrorMessage name="question" component="div" />
                  <FieldArray name="dynamicFields">
                    {({ remove, push }) => (
                      <div className="w-full">
                        <span className="options-label">Options</span>
                        {values.dynamicFields.length > 0 &&
                          values.dynamicFields.map((_field, index) => (
                            <StyledInputDiv key={index}>
                              <div className="w-full flex gap-2">
                                <StyledField
                                  name={`dynamicFields.${index}`}
                                  placeholder={`Type Option ${index + 1}...`}
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    values.dynamicFields.length > 2
                                      ? remove(index)
                                      : alert(
                                          'Altlest 2 Options must be Entered',
                                        )
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6 hover:text-red-700"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                    />
                                  </svg>
                                </button>
                              </div>
                              <StyledErrorMessage
                                name={`dynamicFields.${index}`}
                                component="div"
                              />
                            </StyledInputDiv>
                          ))}
                        {values.dynamicFields.length < 4 && (
                          <button
                            className="mt-3 p-1.5 rounded-md flex items-center gap-0.5 text-white text-sm"
                            style={{ backgroundColor: '#4B5563' }}
                            type="button"
                            onClick={() => {
                              push('');
                            }}
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
                        )}
                      </div>
                    )}
                  </FieldArray>
                  <StyledFormButton type="submit">Create Poll</StyledFormButton>
                </PollCreationForm>
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
  font-size: 13px;
  letter-spacing: 0.7px;
  background-color: transparent;
  outline: none;
  border-radius: 5px;
  border: 1px solid #015fc7;

  &:focus {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;
