import React from 'react';
import { format } from 'date-fns'
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

export default function WorkspaceDatarow(rowInfo) {


    return (
        <React.Fragment>

            <tr className="main-row mouse-cursor-pointer">

                <td rowSpan="2">
                    {rowInfo.data.photoURL &&
                        <CardMedia
                            component="img"
                            width="64"
                            image={rowInfo.data.photoURL}
                            alt={rowInfo.data.workspaceName}
                        />
                    }
                </td>
                <td>{rowInfo.data.workspaceName}</td>
                <td>{`${format(new Date(rowInfo.data.createdAt.seconds * 1000), 'EEEE, dd-MM-yyyy')}`}</td>
                <td>{`${format(new Date((rowInfo.data.lastUpdated === undefined) ? rowInfo.data.createdAt.seconds : rowInfo.data.lastUpdated.seconds * 1000), 'EEEE, dd-MM-yyyy')}`}</td>
                <td>
                    <Typography variant="body2" color="text.secondary" align="center">
                        {rowInfo.data.isDefault === true ? 'Yes' : 'No'}
                    </Typography>
                </td>
            </tr>
            <tr className="notes-row">
                <td colSpan="6">
                    <div>
                        <Typography variant="body2" color="text.secondary">
                            {rowInfo.data.description}
                        </Typography>
                    </div>
                </td>
                <td>
                    <Link to={`/workspace/${rowInfo.data.id}`}>
                        <Button size="small" color="secondary" variant="contained">Settings</Button>
                    </Link>
                </td>
            </tr>

        </React.Fragment>
    );
}