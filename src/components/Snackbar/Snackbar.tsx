// Snackbar.tsx
import React, { FC, useState, useEffect } from 'react';
import { StyledSnackbar } from './Snackbar.styled';

interface SnackbarProps {
  message: string;
  duration?: number;
}

const Snackbar: FC<SnackbarProps> = ({ message, duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  return <StyledSnackbar style={{ opacity: isVisible ? 1 : 0 }}>{message}</StyledSnackbar>;
};

export default Snackbar;
