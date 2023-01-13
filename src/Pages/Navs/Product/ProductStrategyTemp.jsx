import React, { useState, Fragment } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import BatterySaverIcon from '@mui/icons-material/BatterySaver';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadarIcon from '@mui/icons-material/Radar';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import WidgetsIcon from '@mui/icons-material/Widgets';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


export const ProductStrategyTemp = ({ product }) => {
    const [openProduct, setOpenProduct] = useState(false);


    const handleClickProduct = () => {
        setOpenProduct(!openProduct);
    };


    return (

        <Fragment>


            <ListItemButton onClick={handleClickProduct}>
                <ListItemIcon>
                    <CrisisAlertIcon color="error" />
                </ListItemIcon>
                <ListItemText primary="Strategy" />
                {openProduct ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openProduct} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <GpsFixedIcon color="error" />
                        </ListItemIcon>
                        <ListItemText primary="Drivers" />
                    </ListItemButton>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <QueryStatsIcon color="error" />
                        </ListItemIcon>
                        <ListItemText primary="Assesments" />
                    </ListItemButton>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <RadioButtonCheckedIcon color="error" />
                        </ListItemIcon>
                        <ListItemText primary="Goals" />
                    </ListItemButton>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <RadarIcon color="error" />
                        </ListItemIcon>
                        <ListItemText primary="Outcomes" />
                    </ListItemButton>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <CheckBoxOutlineBlankIcon color="error" />
                        </ListItemIcon>
                        <ListItemText primary="Requirements" />
                    </ListItemButton>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <WidgetsIcon color="error" />
                        </ListItemIcon>
                        <ListItemText primary="Capabilities" />
                    </ListItemButton>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <BatterySaverIcon color="error" />
                        </ListItemIcon>
                        <ListItemText primary="Resources" />
                    </ListItemButton>
                    
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PriorityHighIcon color="error" />
                        </ListItemIcon>
                        <ListItemText primary="Principles" />
                    </ListItemButton>
                    
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <ErrorOutlineIcon color="error" />
                        </ListItemIcon>
                        <ListItemText primary="Constraints" />
                    </ListItemButton>

                </List>
            </Collapse>

        </Fragment>
    );
};

export default ProductStrategyTemp;
