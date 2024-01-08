import styled from "styled-components";

export const StyledButton = styled.button`
    padding: 7px 15px;
    color: white;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.5px;
    background-color: #3b82f6;
    transition: all .2s ease;
    outline: unset;

    &:hover,
    &:focus
    {
        background-color: #015FC7;
    }
`;