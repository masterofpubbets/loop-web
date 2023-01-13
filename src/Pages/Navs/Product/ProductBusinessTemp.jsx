import React, { useState, Fragment } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FunctionsIcon from '@mui/icons-material/Functions';
import MemoryIcon from '@mui/icons-material/Memory';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import BusinessIcon from '@mui/icons-material/Business';


export const ProductBusinessTemp = ({ product }) => {
    const [openProduct, setOpenProduct] = useState(false);


    const handleClickProduct = () => {
        setOpenProduct(!openProduct);
    };


    return (

        <Fragment>


            <ListItemButton onClick={handleClickProduct}>
                <ListItemIcon>
                    <BusinessIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Business" />
                {openProduct ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openProduct} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <HomeRepairServiceIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="Services" />
                    </ListItemButton>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <FunctionsIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="Functions" />
                    </ListItemButton>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <MemoryIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="Process" />
                    </ListItemButton>

                </List>
            </Collapse>

        </Fragment>
    );
};

export default ProductBusinessTemp;
