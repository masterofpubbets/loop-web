import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Logout from '@mui/icons-material/Logout';
import { useUser } from '../../Hooks/useUser';
import { useSignOut } from '../../Hooks/useSignOut';
import { useTheme } from '../../Hooks/useTheme';
import WorkspacesIcon from '@mui/icons-material/Workspaces';

export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const { user, updateUserMode } = useUser();
    const { signOutUser } = useSignOut();
    const { setMode, preTheme } = useTheme();
    const { mode } = preTheme.palette;
    const open = Boolean(anchorEl);


    const clickProfile = () => {
        window.location.assign("/profile")
    };

    const clickWorkspaceSettings = (e) => {
        window.location.assign("/workspaces")
    };

    function stringToColor(string) {
        let hash = 0;
        let i;
        if (string !== null) {
            for (i = 0; i < string.length; i += 1) {
                hash = string.charCodeAt(i) + ((hash << 5) - hash);
            }

            let color = '#';

            for (i = 0; i < 3; i += 1) {
                const value = (hash >> (i * 8)) & 0xff;
                color += `00${value.toString(16)}`.slice(-2);
            }
            /* eslint-enable no-bitwise */

            return color;
        }
        /* eslint-disable no-bitwise */
    };

    function stringAvatar(name) {
        if (name !== null) {
            return {
                sx: {
                    bgcolor: stringToColor(name),
                },
                children: (name.indexOf(' ') === -1) ? `${name.split(' ')[0][0]}` : `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
            };
        }
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignout = async () => {
        const res = await signOutUser();
        if (res) setMode('light')
    };

    const handleSetModeTheme = () => {
        if (mode === 'light') {
            updateUserMode('dark')
            setMode('dark')
        } else {
            updateUserMode('light')
            setMode('light')
        }

    };

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

                <Tooltip title={user.displayName}>
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        {user.photoURL ? <img alt={user.displayName} src={user.photoURL} referrerPolicy="no-referrer" style={{ width: '28px', borderRadius: '50%' }}></img> : <Avatar {...stringAvatar(user.displayName)} sx={{ width: 28, height: 28, backgroundColor: stringToColor(user.displayName) }} />}
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={clickProfile}>
                    <ListItemIcon>
                        {user.photoURL ? <img alt={user.displayName} src={user.photoURL} referrerPolicy="no-referrer" style={{ width: '24px', borderRadius: '50%' }}></img> : <Avatar {...stringAvatar(user.displayName)} />}
                    </ListItemIcon>
                    {`${user.displayName} (${user.userType})`}
                </MenuItem>
                <Divider />
                <MenuItem onClick={clickWorkspaceSettings}>
                    <ListItemIcon>
                        <WorkspacesIcon color="primary" />
                    </ListItemIcon>
                    Workspaces Settings
                </MenuItem>
                <Divider />

                {(mode === 'dark') ?
                    <MenuItem onClick={handleSetModeTheme}>
                        <ListItemIcon>
                            <Brightness5Icon fontSize="small" color="warning" />
                        </ListItemIcon>
                        Light Mode
                    </MenuItem>
                    :
                    <MenuItem onClick={handleSetModeTheme}>
                        <ListItemIcon>
                            <Brightness4Icon fontSize="small" color="warning" />
                        </ListItemIcon>
                        Dark Mode
                    </MenuItem>
                }
                <Divider />
                <MenuItem onClick={handleSignout}>
                    <ListItemIcon>
                        <Logout fontSize="small" color="warning" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
