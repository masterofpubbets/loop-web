import React from 'react';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";


export const importedContactColumns = [
    {
        field: 'PHOTO',
        headerName: '',
        width: 200,
        disableColumnFilter: true,
        renderCell: params => {
            return (
                <CardMedia
                    component="img"
                    image={params.row.PHOTO}
                    alt=""
                    sx={{ width: "96px", height: "40px", margin: "auto" }}
                />
            )
        }
    },
    { field: 'COMPANY', headerName: 'COMPANY', width: 130 },
    { field: 'NAME', headerName: 'NAME', width: 130 },
    { field: 'PHONE', headerName: 'PHONE', width: 130 },
    { field: 'MOBILE', headerName: 'MOBILE', width: 130 },
    { field: 'MAIL', headerName: 'MAIL', width: 130 },
    { field: 'JOB', headerName: 'JOB', width: 130 },
    { field: 'WORKGROUP', headerName: 'WORKGROUP', width: 130 },
    { field: 'ADDRESS', headerName: 'ADDRESS', width: 130 },

];

export const contactColumns = [
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
    { field: 'companyName', headerName: 'Company', width: 130 },
    { field: 'contactName', headerName: 'Full Name', width: 130 },
    { field: 'phone', headerName: 'Phone', width: 130 },
    { field: 'mobile', headerName: 'Mobile', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'job', headerName: 'Job', width: 130 },
    { field: 'workGroup', headerName: 'Workgroup', width: 130 },
    { field: 'address', headerName: 'Address', width: 130 },
    {
        field: 'id',
        headerName: '',
        width: 200,
        renderCell: params => {
            return (
                <Link to={`/contact/${params.row.id}`}>
                    <Button size="small" color="secondary" variant="contained">Settings</Button>
                </Link>
            )
        }
    },

];

