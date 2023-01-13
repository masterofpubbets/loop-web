import React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { tasksGroupDummy } from '../../../Consts/TasksDummy';
import TasksTemp from './TasksTemp';
import AddIcon from '@mui/icons-material/Add';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import Divider from '@mui/material/Divider';


export const TasksNav = () => {

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Tasks
                </ListSubheader>
            }
        >

            <ListItemButton sx={{ pl: 2 }}>
                <ListItemIcon>
                    <PlaylistAddIcon color='primary' />
                </ListItemIcon>
                <ListItemText primary="Add Category" />
            </ListItemButton>
            
            <ListItemButton sx={{ pl: 2 }}>
                <ListItemIcon>
                    <AddIcon color='primary' />
                </ListItemIcon>
                <ListItemText primary="Add Task" />
            </ListItemButton>
            
            <ListItemButton sx={{ pl: 2 }}>
                <ListItemIcon>
                    <MoreTimeIcon color='primary' />
                </ListItemIcon>
                <ListItemText primary="Add Schedule Task" />
            </ListItemButton>
            
            <ListItemButton sx={{ pl: 2 }}>
                <ListItemIcon>
                    <NoteAddIcon color='primary' />
                </ListItemIcon>
                <ListItemText primary="Add Note" />
            </ListItemButton>
            
            <ListItemButton sx={{ pl: 2 }}>
                <ListItemIcon>
                    <AddAlarmIcon color='primary' />
                </ListItemIcon>
                <ListItemText primary="Add Remainder" />
            </ListItemButton>


            <Divider />
            
            {tasksGroupDummy.map((group, index) => {
                return <TasksTemp key={index} tasksGroup={group} />
            })}

        </List>
    );
};

export default TasksNav;
