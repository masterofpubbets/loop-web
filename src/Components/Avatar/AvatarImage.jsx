import React, { Fragment } from "react";
import Avatar from '@mui/material/Avatar';


const AvatarImage = ({ imageURL, imageName, icon }) => {


    function stringToColor(string) {
        let hash = 0;
        let i;
        if (string !== undefined) {
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
        }

    };

    function stringAvatar(name) {
        if (name !== undefined) {
            return {
                sx: {
                    bgcolor: stringToColor(name),
                },
                children: (name.indexOf(' ') === -1) ? `${name.split(' ')[0][0]}` : `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
            };
        }
    };


    return (
        <Fragment>
            {
                icon ?
                icon
                :
                imageURL ?
                    <img
                        alt={imageName} src={imageURL} referrerPolicy="no-referrer" style={{ width: '32px', marginRight: '10px' }}
                    ></img > :
                    <Avatar
                        {...stringAvatar(imageName)} sx={{ width: 28, height: 28, backgroundColor: stringToColor(imageName) }}
                    />
            }
        </Fragment>

    )
};

export default AvatarImage;