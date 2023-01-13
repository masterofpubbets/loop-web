import React, { Fragment, useContext } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { format } from 'date-fns'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import pmsImg from '../../Images/pms128.png';
import { Link } from "react-router-dom";
import { UserContext } from '../../Context/UserContext';



export default function WorkspaceCard({ title, id, description, photoURL, createdAt, isDefault }) {
    const { user } = useContext(UserContext);

    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    };

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: (name.indexOf(' ') === -1) ? `${name.split(' ')[0][0]}` : `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    };


    return (
        <Fragment>

            <Card sx={{ width: 220, minHeight: 300 }}>
                <CardHeader
                    avatar={
                        <Avatar {...stringAvatar(title)} />
                    }
                    action=
                    {(user.userType === 'master') &&
                        <Link to={`/workspace/${id}`}>
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        </Link>
                    }
                    title={title}
                    subheader={`${format(new Date(createdAt.seconds * 1000), 'EEEE, dd-MM-yyyy')}`}
                />
                {photoURL &&
                    <CardMedia
                        component="img"
                        image={photoURL}
                        alt={title}
                        sx={{ width: "96px", margin: "auto" }}
                    />
                }
                {!photoURL &&
                    <CardMedia
                        component="img"
                        height="96"
                        image={pmsImg}
                        alt={title}
                    />
                }

                <CardContent>

                    {isDefault && <CheckCircleOutlineIcon color="success" />}


                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>


            </Card>

        </Fragment>
    );
}
