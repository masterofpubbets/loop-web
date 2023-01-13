import React from "react";
import Box from '@mui/material/Box';
import { useTheme } from '../../Hooks/useTheme';

const BoxView = ({ children }) => {
    const { preTheme } = useTheme();
    const bgColor = preTheme.palette.mode === 'light' ? 'common.white' : 'grey.800';


    return (
        <Box sx={{ flexGrow: 1, backgroundColor: bgColor, borderRadius: 3 }} >
            {children}
        </Box>
    )
};

export default BoxView;