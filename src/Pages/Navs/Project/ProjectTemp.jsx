import React, { useState, Fragment, useContext } from 'react';
import { Link } from "react-router-dom";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AvatarImage from '../../../Components/Avatar/AvatarImage';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InfoIcon from '@mui/icons-material/Info';
import ProjectPlanningTemp from './ProjectPlanningTemp';
import ProjectConstructionTemp from './ProjectConstructionTemp';
import ProjectPrecommTemp from './ProjectPrecommTemp';
import SettingsIcon from '@mui/icons-material/Settings';
import TableBarIcon from '@mui/icons-material/TableBar';
import { UserContext } from '../../../Context/UserContext';


export const ProjectTemp = ({ project }) => {
    const [openProduct, setOpenProduct] = useState(false);
    const { user } = useContext(UserContext);

    const handleClickProduct = () => {
        setOpenProduct(!openProduct);
    };


    return (

        <Fragment>


            <ListItemButton onClick={handleClickProduct}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <AvatarImage imageURL={project.photoURL} imageName={project.projectName} />
                    <ListItemText primary={project.projectName} />
                </Grid>

                {openProduct ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openProduct} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <InfoIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Info" />
                    </ListItemButton>

                    <Box pl={2}>
                        <ProjectConstructionTemp project={project} />
                    </Box>

                    <Box pl={2}>
                        <ProjectPlanningTemp project={project} />
                    </Box>

                    <Box pl={2}>
                        <ProjectPrecommTemp project={project} />
                    </Box>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <TableBarIcon color="warning" />
                        </ListItemIcon>
                        <ListItemText primary="Minutes of Meetings" />
                    </ListItemButton>

                    {(user.userType) === 'master' &&
                        <Link to={`/project/${project.id}`}>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <SettingsIcon color="warning" />
                                </ListItemIcon>
                                <ListItemText primary="Settings" />
                            </ListItemButton>
                        </Link>
                    }
                </List>
            </Collapse>

        </Fragment>
    );
};

export default ProjectTemp;
