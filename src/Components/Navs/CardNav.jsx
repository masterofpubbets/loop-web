import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

const CardNav = ({ title, imgURL, description, links, minWidth, height }) => {


    return (
        <Card sx={{ maxWidth: '345px', minWidth: `${minWidth}px` }}>
            <CardMedia
                component="img"
                height={height}
                image={imgURL}
                alt={title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {
                    links &&
                    links.map((link, index) =>
                        <Link key={index} to={link.url}>
                            <Button size="small">{link.title}</Button>
                        </Link>
                    )
                }
            </CardActions>
        </Card >
    );
};

export default CardNav;
