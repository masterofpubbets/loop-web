import React from 'react';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

export default function ContactsDatarow(rowInfo) {


    return (
        <React.Fragment>

            <tr className="main-row mouse-cursor-pointer">

                <td rowSpan="2">
                    {rowInfo.data.photoURL &&
                        <CardMedia
                            component="img"
                            width="64"
                            image={rowInfo.data.photoURL}
                            alt=""
                        />
                    }
                </td>
                <td>{rowInfo.data.contactName}</td>
                <td>{rowInfo.data.job}</td>
                <td>{rowInfo.data.mobile}</td>
                <td>{rowInfo.data.phone}</td>
                <td>{rowInfo.data.email}</td>
                <td>{rowInfo.data.address}</td>
                <td>{rowInfo.data.workGroup}</td>
            </tr>
            <tr className="notes-row">
                <td colSpan="6">
                    <div>
                        <Typography variant="body2" color="text.secondary">
                            {rowInfo.data.companyName}
                        </Typography>
                    </div>
                </td>
                <td>
                    <Link to={`/contact/${rowInfo.data.id}`}>
                        <Button size="small" color="secondary" variant="contained">Settings</Button>
                    </Link>
                </td>
            </tr>

        </React.Fragment>
    );
}