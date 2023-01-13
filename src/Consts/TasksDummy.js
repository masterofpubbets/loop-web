import React from 'react';
import Box from '@mui/material/Box';
import personalImg from '../Images/personal.svg';
import workImg from '../Images/case.svg';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import FolderIcon from '@mui/icons-material/Folder';
import PersonIcon from '@mui/icons-material/Person';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';


export const tasksDummy = [{
    id: 1,
    taskName: '',

}]

export const tasksGroupDummy = [{
    id: 1,
    groupName: 'All',
    imgURL: personalImg,
    imgName: null,
    icon: <Box mr={2}><LibraryBooksIcon color='success' /></Box>,
    colorName: 'success'

}, {
    id: 2,
    groupName: 'Default',
    imgURL: null,
    imgName: 'Default',
    icon: <Box mr={2}><FolderIcon color='primary' /></Box>,
    colorName: 'primary'

}, {
    id: 3,
    groupName: 'Work',
    imgURL: workImg,
    imgName: null,
    icon: <Box mr={2}><HomeRepairServiceIcon color='error' /></Box>,
    colorName: 'error'

}, {
    id: 4,
    groupName: 'Personal',
    imgURL: personalImg,
    imgName: null,
    icon: <Box mr={2}><PersonIcon color='warning' /></Box>,
    colorName: 'warning'

}]