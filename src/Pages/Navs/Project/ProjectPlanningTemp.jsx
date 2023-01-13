import React, { useState, Fragment } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DateRangeIcon from '@mui/icons-material/DateRange';
import BoyIcon from '@mui/icons-material/Boy';
import RocketIcon from '@mui/icons-material/Rocket';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';


export const ProjectPlanningTemp = ({ project }) => {
    const [openProduct, setOpenProduct] = useState(false);


    const handleClickProduct = () => {
        setOpenProduct(!openProduct);
    };


    return (

        <Fragment>


            <ListItemButton onClick={handleClickProduct}>
                <ListItemIcon>
                    <RocketIcon color="success" />
                </ListItemIcon>
                <ListItemText primary="Planning" />
                {openProduct ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openProduct} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <DateRangeIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary="Project Plan" />
                    </ListItemButton>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <AttachMoneyIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary="Budget" />
                    </ListItemButton>
                    
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <ReportProblemIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary="Risks" />
                    </ListItemButton>
                    
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <BoyIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary="Roles" />
                    </ListItemButton>
                    
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <ConnectWithoutContactIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary="Communications" />
                    </ListItemButton>

                </List>
            </Collapse>

        </Fragment>
    );
};

export default ProjectPlanningTemp;
