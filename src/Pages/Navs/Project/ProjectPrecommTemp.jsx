import React, { useState, Fragment } from 'react';
import { Link } from "react-router-dom";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PeopleIcon from '@mui/icons-material/People';
import FolderIcon from '@mui/icons-material/Folder';


const ProjectPrecommTemp = ({ project }) => {
    const [openProduct, setOpenProduct] = useState(false);


    const handleClickProduct = () => {
        setOpenProduct(!openProduct);
    };


    return (

        <Fragment>


            <ListItemButton onClick={handleClickProduct}>
                <ListItemIcon>
                    <PeopleIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="PreComm" />
                {openProduct ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openProduct} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    <Link to={`/loopfolders/${project.appUUID}`}>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <FolderIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Loop Folders" />
                        </ListItemButton>
                    </Link>

                </List>
            </Collapse>

        </Fragment>
    );
};

export default ProjectPrecommTemp;
