import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const CircularColor = ({color}) => {
  return (
      <CircularProgress color={color} />
  );
};

export default CircularColor;
