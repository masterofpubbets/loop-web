import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

export const homeMenu = [{
    id: 1,
    title: 'Home',
    link: '/',
    icon: <HomeIcon color="error" />,
}, {
    id: 2,
    title: 'Workspaces',
    link: '/workspaces',
    icon: <WorkspacesIcon color="primary" />,
}, {
    id: 3,
    title: 'Admin',
    link: '/workspaceadmin',
    icon: <SupervisorAccountIcon color="secondary" />,
}]