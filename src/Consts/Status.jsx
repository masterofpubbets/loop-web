import React from 'react';
import SquareIcon from '@mui/icons-material/Square';
import BlockIcon from '@mui/icons-material/Block';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


export const status = [{
    ID: 1,
    Name: 'Idle',
    ImageSrc: <SquareIcon />,
}, {
    ID: 2,
    Name: 'Blocked',
    ImageSrc: <BlockIcon color="error" />,
}, {
    ID: 3,
    Name: 'Started',
    ImageSrc: <PlayCircleFilledIcon color="primary" />,
}, {
    ID: 4,
    Name: 'On Review',
    ImageSrc: <VisibilityIcon color="secondary" />,
}, {
    ID: 5,
    Name: 'Done',
    ImageSrc: <CheckCircleIcon color="success" />,
}];