import React from 'react';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";



export const productsColumns = [
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
    { field: 'organization', headerName: 'Organization', width: 130 },
    { field: 'productName', headerName: 'Name', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 },
    { field: 'estInvestment', headerName: 'Estimated Investment', width: 130 },
    { field: 'productType', headerName: 'Type', width: 130 },
    { field: 'vision', headerName: 'Vision', width: 130 },
    { field: 'mission', headerName: 'Mission', width: 130 },
    {
        field: 'id',
        headerName: '',
        width: 200,
        renderCell: params => {
            return (
                <Link to={`/product/${params.row.id}`}>
                    <Button size="small" color="secondary" variant="contained">Settings</Button>
                </Link>
            )
        }
    },

];

