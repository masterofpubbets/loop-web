import React, { useState, Fragment } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import StoreIcon from '@mui/icons-material/Store';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';


export const ProductReasearchTemp = ({ product }) => {
    const [openProduct, setOpenProduct] = useState(false);


    const handleClickProduct = () => {
        setOpenProduct(!openProduct);
    };


    return (

        <Fragment>


            <ListItemButton onClick={handleClickProduct}>
                <ListItemIcon>
                    <PlagiarismIcon color="warning" />
                </ListItemIcon>
                <ListItemText primary="Researchs" />
                {openProduct ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openProduct} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <StoreIcon color="warning" />
                        </ListItemIcon>
                        <ListItemText primary="Market" />
                    </ListItemButton>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <SwitchAccountIcon color="warning" />
                        </ListItemIcon>
                        <ListItemText primary="Competitors" />
                    </ListItemButton>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <SettingsAccessibilityIcon color="warning" />
                        </ListItemIcon>
                        <ListItemText primary="UX" />
                    </ListItemButton>
                    
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PersonPinCircleIcon color="warning" />
                        </ListItemIcon>
                        <ListItemText primary="Internal" />
                    </ListItemButton>

                </List>
            </Collapse>

        </Fragment>
    );
};

export default ProductReasearchTemp;
