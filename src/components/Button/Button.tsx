import React from 'react';
import { StyledButton } from './Button.styled';

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({label, onClick}) => {
    return (
        <>
            <StyledButton type='submit' onClick={onClick}>
                {label}
            </StyledButton>
        </>
    );
};

export default Button;
