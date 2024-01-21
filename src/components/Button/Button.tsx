import React from 'react';
import { StyledButton } from './Button.styled';

const noop = () => {};
interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({label, onClick = noop}) => {
    return (
        <>
            <StyledButton type='submit' onClick={onClick}>
                {label}
            </StyledButton>
        </>
    );
};

export default Button;
