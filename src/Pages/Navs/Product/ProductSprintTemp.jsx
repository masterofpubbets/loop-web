import React, { useState, Fragment, useEffect } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import RestoreIcon from '@mui/icons-material/Restore';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import SprintTemp from './SprintTemp';
import { sprints } from '../../../Consts/SprintsDummy';


export const ProductSprintTemp = ({ product }) => {
    const [openProduct, setOpenProduct] = useState(false);
    const [productSprints, setProductSprints] = useState(null)


    const handleClickProduct = () => {
        setOpenProduct(!openProduct);
    };

    useEffect(() => {
        setProductSprints(sprints.filter((s) => s.productId === product.id))
    }, [])


    return (

        <Fragment>


            <ListItemButton onClick={handleClickProduct}>
                <ListItemIcon>
                    <RestoreIcon color="success" />
                </ListItemIcon>
                <ListItemText primary="Sprints" />
                {openProduct ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openProduct} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    {productSprints && productSprints.map((sprint, index) => <SprintTemp key={index} sprint={sprint} />)}

                </List>

                <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                        <ManageHistoryIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Manage Sprints" />
                </ListItemButton>

            </Collapse>

        </Fragment>
    );
};

export default ProductSprintTemp;
