import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import AccountMenu from "./AccountMenu";
import BadgeIcon from "./BadgeIcon";
import MailIcon from '@mui/icons-material/Mail';
import Notifications from "../Notification/Notifications";

const HeaderBar = ({ handleDrawerToggle, drawerWidth }) => {

    return (

        <AppBar
            position="fixed"
            color="common"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                height: '52px'
            }}
        >
            <Toolbar>
                <IconButton
                    color="primary"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>


                <Grid container spacing={1} direction="row" justifyContent="right" alignItems="center">
                    <Box m={1} pt={1}>
                        <Stack
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            spacing={3}
                        >
                            <BadgeIcon icon={<MailIcon color="action" />} notificationCount={2} color="warning" />
                            <Notifications />
                            <AccountMenu />
                        </Stack>
                    </Box>

                </Grid>

            </Toolbar>
        </AppBar>
    )
};

export default HeaderBar;