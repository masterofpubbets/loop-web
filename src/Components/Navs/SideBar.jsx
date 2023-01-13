import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import pmsIcon from '../../Images/pms128.png'
import Grid from '@mui/material/Grid';
import HeaderBar from './HeaderBar'
import { homeMenu } from '../../Consts/NavMenu';
import ProjectNav from '../../Pages/Navs/Project/ProjectNav';
import { WsContext } from '../../Context/WSContext';
import { useUser } from '../../Hooks/useUser';



const drawerWidth = 240;

function SideBar(props) {
    const { window: wdw } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const { currentWorkspace } = useContext(WsContext);
    const { user } = useUser();


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Box m={2} pt={2}>
                <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">

                    {(currentWorkspace === null) ? <img src={pmsIcon} alt="Workspace" style={{ width: '64px' }}></img>
                        : <img src={currentWorkspace.photoURL} alt={currentWorkspace.workspaceName} style={{ width: '64px' }}></img>
                    }

                    <Typography component="span" variant="subtitle2" noWrap color="text" sx={{ fontWeight: 'bold' }}>
                        {(currentWorkspace === null) ? "No Workspace" : currentWorkspace.workspaceName}
                    </Typography>
                </Grid>
            </Box>
            <Divider />
            {(user.userType === 'master') &&
                <List>
                    {homeMenu.map((item) => (
                        <Link key={item.id} to={item.link}>
                            <ListItem disablePadding >
                                <ListItemButton >
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.title} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}
                </List>
            }
            <Divider />
            {currentWorkspace &&
                <ProjectNav />
            }
        </div>
    );

    const container = wdw !== undefined ? () => wdw().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <HeaderBar handleDrawerToggle={handleDrawerToggle} drawerWidth={240} />

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {props.children}
            </Box>

        </Box>
    );
}

SideBar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    wdw: PropTypes.func,
};

export default SideBar;