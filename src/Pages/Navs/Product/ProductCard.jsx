import React, { Fragment } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';


export default function ProductCard({ productName, organization, id, productType, photoURL, vision, mission, isFav, estInvestment, description }) {

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

            <Card sx={{ width: 245, minHeight: 500 }}>
                <CardHeader
                    title={productName}
                    subheader={description}
                    action={
                        <IconButton aria-label="settings">
                            <Link to={`/product/${id}`}><MoreVertIcon /></Link>
                        </IconButton>
                    }
                />

                {photoURL &&
                    <CardMedia
                        component="img"
                        image={photoURL}
                        alt=''
                        sx={{ width: "96px", margin: "auto" }}
                    />
                }

                {!photoURL &&
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <Avatar {...stringAvatar(productName)} />
                        </Grid>
                    </Grid>
                }

                <CardHeader
                    align='center'
                    title={organization}
                />

                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {`Type: ${productType}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {`Est.Inv: ${estInvestment}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {`Favorite: ${isFav ? 'Yes' : 'No'}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <br></br>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {`Vision: ${vision}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <br></br>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {`Mission: ${mission}`}
                    </Typography>

                </CardContent>


            </Card>

        </Fragment>
    );
}
