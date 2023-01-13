import React, { useState, Fragment } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AvatarImage from '../../../Components/Avatar/AvatarImage';
import Grid from '@mui/material/Grid';
import UpdateIcon from '@mui/icons-material/Update';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import AlarmIcon from '@mui/icons-material/Alarm';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import GroupsIcon from '@mui/icons-material/Groups';



export const TasksTemp = ({ tasksGroup }) => {
    const [openProduct, setOpenProduct] = useState(false);


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
                    <AvatarImage imageURL={tasksGroup.imgURL}  imageName={tasksGroup.imgName} icon={tasksGroup.icon}/>
                    <ListItemText primary={tasksGroup.groupName} />
                </Grid>

                {openProduct ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openProduct} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PlaylistAddCheckIcon color={tasksGroup.colorName} />
                        </ListItemIcon>
                        <ListItemText primary="Tasks" />
                    </ListItemButton>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <UpdateIcon color={tasksGroup.colorName} />
                        </ListItemIcon>
                        <ListItemText primary="Schedule Tasks" />
                    </ListItemButton>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <AlarmIcon color={tasksGroup.colorName} />
                        </ListItemIcon>
                        <ListItemText primary="Remainders" />
                    </ListItemButton>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <TextSnippetIcon color={tasksGroup.colorName} />
                        </ListItemIcon>
                        <ListItemText primary="Notes" />
                    </ListItemButton>
                    
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <GroupsIcon color={tasksGroup.colorName} />
                        </ListItemIcon>
                        <ListItemText primary="Meetings" />
                    </ListItemButton>

                </List>
            </Collapse>

        </Fragment>
    );
};

export default TasksTemp;
