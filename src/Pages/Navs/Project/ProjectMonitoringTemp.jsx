import React, { useState, Fragment } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import FindReplaceIcon from '@mui/icons-material/FindReplace';
import SimCardAlertIcon from '@mui/icons-material/SimCardAlert';


export const ProjectMonitoringTemp = ({ project }) => {
    const [openProduct, setOpenProduct] = useState(false);


    const handleClickProduct = () => {
        setOpenProduct(!openProduct);
    };


    return (

        <Fragment>


            <ListItemButton onClick={handleClickProduct}>
                <ListItemIcon>
                    <FindReplaceIcon color="error" />
                </ListItemIcon>
                <ListItemText primary="Monitoring" />
                {openProduct ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openProduct} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <SimCardAlertIcon color="error" />
                        </ListItemIcon>
                        <ListItemText primary="Risks Mitigation" />
                    </ListItemButton>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PublishedWithChangesIcon color="error" />
                        </ListItemIcon>
                        <ListItemText primary="KPI" />
                    </ListItemButton>


                </List>
            </Collapse>

        </Fragment>
    );
};

export default ProjectMonitoringTemp;
