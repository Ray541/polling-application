import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

type SearchBarProps = {
  type: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ type, placeholder, onChange }: SearchBarProps) => {
  return <StyledSearchInput type={type} placeholder={placeholder} onChange={onChange}></StyledSearchInput>;
};

export default SearchBar;

const StyledSearchInput = styled.input`
  padding: 5px 10px;
  font-size: 15px;
  letter-spacing: 1.3px;
  font-weight: 500;
  border: 2px solid #4b556399;
  border-radius: 6px;
  outline: unset;
  color: #4b5563;

  &:focus {
  border: 2px solid #4b5563;
  }
`;
