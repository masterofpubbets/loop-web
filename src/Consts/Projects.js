import React from 'react';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";



export const projectColumns = [
    {
        field: 'photoURL',
        headerName: '',
        width: 200,
        disableColumnFilter: true,
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
    { field: 'client', headerName: 'Client', width: 130 },
    { field: 'projectName', headerName: 'Name', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 },
    { field: 'location', headerName: 'Location', width: 130 },
    { field: 'proNo', headerName: 'Number', width: 130 },
    { field: 'appUUID', headerName: 'App UUID', width: 130 },
    {
        field: 'id',
        headerName: '',
        width: 200,
        renderCell: params => {
            return (
                <Link to={`/project/${params.row.id}`}>
                    <Button size="small" color="secondary" variant="contained">Settings</Button>
                </Link>
            )
        }
    },

];

