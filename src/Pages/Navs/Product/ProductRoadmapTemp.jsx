import React, { useState, Fragment } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import InputIcon from '@mui/icons-material/Input';
import AppsIcon from '@mui/icons-material/Apps';
import LoopIcon from '@mui/icons-material/Loop';


export const ProductRoadmapTemp = ({ product }) => {
    const [openProduct, setOpenProduct] = useState(false);


    const handleClickProduct = () => {
        setOpenProduct(!openProduct);
    };


    return (

        <Fragment>


            <ListItemButton onClick={handleClickProduct}>
                <ListItemIcon>
                    <PlagiarismIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Roadmap" />
                {openProduct ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openProduct} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <InputIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Plateau" />
                    </ListItemButton>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <DriveFileMoveIcon color="Primary" />
                        </ListItemIcon>
                        <ListItemText primary="Strategy Roadmap" />
                    </ListItemButton>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <SwapVerticalCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Portfolio Roadmap" />
                    </ListItemButton>
                    
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <LoopIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Release Roadmap" />
                    </ListItemButton>
                    
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <LowPriorityIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Epics Roadmap" />
                    </ListItemButton>
                    
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <AppsIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Features Roadmap" />
                    </ListItemButton>

                </List>
            </Collapse>

        </Fragment>
    );
};

export default ProductRoadmapTemp;
