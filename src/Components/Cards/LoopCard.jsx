import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import greyShape from '../../Images/shapes/grey.svg';
import yellowShape from '../../Images/shapes/yellow.svg';
import blueShape from '../../Images/shapes/blue.svg';
import darkOrangeShape from '../../Images/shapes/darkOrange.svg';
import greenShape from '../../Images/shapes/green.svg';
import purbleShape from '../../Images/shapes/purble.svg';
import redShape from '../../Images/shapes/red.svg';


const LoopCard = ({ folder, links, minWidth, height }) => {

    const getImage = (status) => {
        switch (status) {
            case 'Not Ready':
                return greyShape;
            case 'Folder Prepared':
                return yellowShape;
            case 'QC Released':
                return blueShape;
            case 'Folder Ready':
                return darkOrangeShape;
            case 'Loop Done':
                return greenShape;
            case 'Folder Approved':
                return purbleShape;
            case 'Submitted To Pre-Comm':
                return redShape;
            default:
                return greyShape
        }
    };

    return (
        <Card sx={{ maxWidth: '345px', minWidth: `${minWidth}px` }}>
            <CardMedia
                component="img"
                height={height}
                image={getImage(folder.folderStatus)}
                alt={folder.loopName}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {folder.loopName}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    {folder.folderStatus}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {`Area: ${folder.area}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {`Subsystem: ${folder.subsystem}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {`Vendor: ${folder.vendor}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {folder.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {`Type: ${folder.type}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {`Subtype: ${folder.subType}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {`Subcontractor: ${folder.subcontractor}`}
                </Typography>
                {(folder.hasBlockage === 'Yes') &&
                    <Typography variant="body2" sx={{ color: '#BF4949' }}>
                        Has Blockage
                    </Typography>
                }
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

export default LoopCard;
