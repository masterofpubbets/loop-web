import React from 'react';
import { format } from 'date-fns'
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

export const defaultWorkspace = {
    workspaceName: 'No xxxxx',
    workspaceId: null,
    workspaceIconURL: null,
    hasWorkspace: false,
    home: [],
    favorite: [],
    projects: [],

};

export const workspaceColumns = [
    {
        field: 'photoURL',
        headerName: '',
        width: 200,
        renderCell: params => {
            return (
                <CardMedia
                    component="img"
                    image={params.row.photoURL}
                    alt=""
                    sx={{ width: "96px", height: "40px", margin: "auto" }}
                />
            )
        }
    },
    { field: 'workspaceName', headerName: 'Workspace Name', width: 130 },
    {
        field: 'createdAt',
        headerName: 'Created At',
        width: 150,
        valueGetter: (params) => `${format(new Date(params.row.createdAt.seconds * 1000), 'EEEE, dd-MM-yyyy')}`
    }, {
        field: 'lastUpdated',
        headerName: 'Last Updated',
        width: 150,
        valueGetter: (params) => (params.row.lastUpdated !== undefined) ? `${format(new Date(params.row.lastUpdated.seconds * 1000), 'EEEE, dd-MM-yyyy')}` : null
    }, {
        field: 'isDefault',
        headerName: 'Is Default',
        type: 'bool',
        width: 90,
        valueGetter: (params) => params.row.isDefault ? 'Yes' : null
    },
    {
        field: 'id',
        headerName: '',
        width: 200,
        renderCell: params => {
            return (
                <Link to={`/workspace/${params.row.id}`}>
                    <Button size="small" color="secondary" variant="contained">Settings</Button>
                </Link>
            )
        }
    },

];