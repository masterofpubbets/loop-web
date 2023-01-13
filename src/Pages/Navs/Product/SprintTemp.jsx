import React, { Fragment } from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import RestoreIcon from '@mui/icons-material/Restore';

const SprintTemp = ({ sprint }) => {
    const sprintCurrent = (sprint.isCurrent) ? ' (Current)' : '';
    const sprintClosed = (sprint.isStart && !sprint.isCurrent) ? ' (Closed)' : '';
    const sprintNotStarted = (!sprint.isStart && !sprint.isCurrent) ? ' (Idle)' : '';
    const sprintName = sprint.sprintName + sprintCurrent + sprintClosed + sprintNotStarted;

    return (
        <Fragment>
            <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                    <RestoreIcon color="success" />
                </ListItemIcon>
                <ListItemText primary={sprintName} />
            </ListItemButton>
        </Fragment>
    )
};

export default SprintTemp;