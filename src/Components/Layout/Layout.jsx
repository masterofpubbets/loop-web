import React from 'react';
import SideBar from "../Navs/SideBar";
import { useUser } from '../../Hooks/useUser';
import { useTheme } from '../../Hooks/useTheme';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const Layout = ({ children }) => {
    const { user } = useUser();
    const { preTheme } = useTheme();
    const theme = createTheme(preTheme);

    if (user) {
        return (

            <ThemeProvider theme={theme}>
                <SideBar>
                    {children}
                </SideBar>
            </ThemeProvider>

        );

    } else {
        return (
            <>
                {children}
            </>


        )
    }


};

export default Layout;