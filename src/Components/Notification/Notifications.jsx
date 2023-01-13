import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import BadgeIcon from '../Navs/BadgeIcon';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { useNotifications } from "../../Hooks/useNotifications";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDocuments } from '../../Hooks/Firebase/useDocuments';
import { useUser } from '../../Hooks/useUser';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Notifications() {
    const [open, setOpen] = React.useState(false);
    const { notifications } = useNotifications();
    const { delDocByRef, delDoc } = useDocuments('notifications');
    const { user } = useUser();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClearAll = () => {
        if (user) {
            delDoc(null, ['uid', '==', user.uid])
        }
    };

    const handleDeleteDoc = (ref) => {
        if (open) {
            delDocByRef(ref)
        }
        //
    };

    return (
        <div>
            <BadgeIcon clickHandle={handleClickOpen} icon={<NotificationsActiveIcon color="action" />} notificationCount={notifications.count} color="info" />
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Notifications
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClearAll}>
                            Clear All
                        </Button>
                    </Toolbar>
                </AppBar>

                <List>

                    {
                        (notifications.notifications) && notifications.notifications.map((not, index) => {
                            return (
                                <div key={index}>
                                    <ListItem
                                        button
                                        secondaryAction={
                                            <IconButton aria-label="delete" onClick={() => handleDeleteDoc(not.ref)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemIcon>
                                            <NotificationsOutlinedIcon color={not.type} />
                                        </ListItemIcon>
                                        <ListItemText primary={not.title} secondary={not.body} />
                                    </ListItem>
                                    <Divider />
                                </div>
                            )
                        })
                    }

                </List>

            </Dialog>
        </div>
    );
}
