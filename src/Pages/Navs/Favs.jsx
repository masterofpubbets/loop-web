import React, { useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import CategoryIcon from '@mui/icons-material/Category';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function Favs() {
    const [openProduct, setOpenProduct] = useState(false);
    const [openProject, setOpenProject] = useState(false);
    const [openTask, setOpenTask] = useState(false);

    const handleClickProduct = () => {
        setOpenProduct(!openProduct);
    };
    const handleClickProject = () => {
        setOpenProject(!openProject);
    };
    const handleClickTask = () => {
        setOpenTask(!openTask);
    };

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Favorites
                </ListSubheader>
            }
        >

            <ListItemButton onClick={handleClickProduct}>
                <ListItemIcon>
                    <CategoryIcon color="error" />
                </ListItemIcon>
                <ListItemText primary="Products" />
                {openProduct ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openProduct} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <StarBorder color="error"/>
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                    </ListItemButton>
                </List>
            </Collapse>

            <ListItemButton onClick={handleClickProject}>
                <ListItemIcon>
                    <AccountTreeIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Projects" />
                {openProject ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openProject} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <StarBorder color="secondary"/>
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                    </ListItemButton>
                </List>
            </Collapse>

            <ListItemButton onClick={handleClickTask}>
                <ListItemIcon>
                    <AssignmentIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Tasks" />
                {openTask ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openTask} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <StarBorder color="primary"/>
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                    </ListItemButton>
                </List>
            </Collapse>

        </List>
    );
}
