import React, { useState, Fragment } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import GradingIcon from '@mui/icons-material/Grading';
import EngineeringIcon from '@mui/icons-material/Engineering';


const ProjectConstructionTemp = ({ project }) => {
    const [openProduct, setOpenProduct] = useState(false);


    const handleClickProduct = () => {
        setOpenProduct(!openProduct);
    };


    return (

        <Fragment>


            <ListItemButton onClick={handleClickProduct}>
                <ListItemIcon>
                    <EngineeringIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Construction" />
                {openProduct ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openProduct} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <RadioButtonCheckedIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="Goals and Success Criteria" />
                    </ListItemButton>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <CropSquareIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="Define Scope" />
                    </ListItemButton>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <TrendingUpIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="OKRs" />
                    </ListItemButton>
                    
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <HomeRepairServiceIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="Business Case" />
                    </ListItemButton>
                    
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <GradingIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="Quality Standard" />
                    </ListItemButton>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <DocumentScannerIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="Project Charter" />
                    </ListItemButton>
                    
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <MoodBadIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="Stakeholders" />
                    </ListItemButton>

                </List>
            </Collapse>

        </Fragment>
    );
};

export default ProjectConstructionTemp;
