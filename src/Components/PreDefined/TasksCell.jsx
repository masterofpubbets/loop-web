import React from "react";
import CircleIcon from '@mui/icons-material/Circle';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const TasksCell = ({ data }) => {

    const renderStatus = () => {
        switch (data.status) {
            case 'Pending':
                return <CircleIcon />
            case 'Open':
                return <PlayCircleFilledIcon color="primary" />
            case 'Done':
                return <CheckCircleIcon color="success" />
            default:
                return <CircleIcon />
        }

    };

    return (
        <div>
            {renderStatus()}
        </div>
    )
};

export default TasksCell;