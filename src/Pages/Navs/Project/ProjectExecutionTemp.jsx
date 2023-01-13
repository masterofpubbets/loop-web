import React, { useState, Fragment } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CategoryIcon from '@mui/icons-material/Category';
import FiberSmartRecordIcon from '@mui/icons-material/FiberSmartRecord';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';


export const ProjectExecutionTemp = ({ project }) => {
    const [openProduct, setOpenProduct] = useState(false);


    const handleClickProduct = () => {
        setOpenProduct(!openProduct);
    };


    return (

        <Fragment>


            <ListItemButton onClick={handleClickProduct}>
                <ListItemIcon>
                    <FiberSmartRecordIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Execution" />
                {openProduct ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openProduct} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <CategoryIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Manage Resources" />
                    </ListItemButton>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PublishedWithChangesIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Progress" />
                    </ListItemButton>

                </List>
            </Collapse>

        </Fragment>
    );
};

export default ProjectExecutionTemp;
