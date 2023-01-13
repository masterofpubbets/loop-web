import React, { Fragment, useContext } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import CancelIcon from '@mui/icons-material/Cancel';
import ShareIcon from '@mui/icons-material/Share';
import { useDelete } from '../../Hooks/Common/useDelete';
import { WsContext } from '../../Context/WSContext';
import { useObject } from '../../Hooks/Common/useObject';
import { uuidv4 } from '@firebase/util';

export default function UserCard({ displayName, email, uid, photoURL, sharedStatus }) {
    const { isPending, deleteError, deleteSharedUser } = useDelete();
    const { currentWorkspace } = useContext(WsContext);
    const { addSimple } = useObject(1, 'ws-users', 'Shared Users');

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
        if (name !== undefined) {
            return {
                sx: {
                    bgcolor: stringToColor(name),
                },
                children: (name.indexOf(' ') === -1) ? `${name.split(' ')[0][0]}` : `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
            };
        }
    };

    const handleBtnClick = () => {
        if (sharedStatus) {
            deleteSharedUser(['uid', "==", uid], ['wsId', "==", currentWorkspace.id])
        } else {
            addSimple({
                uid,
                wsId: currentWorkspace.id
            }, 10, 'id', uuidv4(), 'Id', [])
        }
    };


    return (
        <Fragment>

            <Card sx={{ width: 245, minHeight: 200 }}>
                <CardHeader
                    title={displayName}
                    subheader={email}
                    action={
                        <IconButton onClick={handleBtnClick} disabled={isPending} aria-label="settings">
                            {(sharedStatus) ? <CancelIcon color="error" /> : <ShareIcon color="primary" />}
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
                            <Avatar {...stringAvatar(displayName)} />
                        </Grid>
                    </Grid>
                }


            </Card>

        </Fragment>
    );
}
