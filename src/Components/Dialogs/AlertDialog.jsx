import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AlertDialog = ({ openDialog, handleDialogClosed, message, acceptButtonTitle='Yes', rejectButtonTitle='No' }) => {
    const [open, setOpen] = useState(openDialog);
    const [dialogMes, setDialogMes] = useState(message);

    useEffect(() => {
        setOpen(openDialog);
    }, [openDialog]);

    useEffect(() => {
        setDialogMes(message);
    }, [message]);


    const handleClose = () => {
        setOpen(false);
        handleDialogClosed(false);
    };

    const handleAccept = () => {
        setOpen(false);
        handleDialogClosed(true);
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogMes}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{rejectButtonTitle}</Button>
                    <Button onClick={handleAccept} autoFocus>
                        {acceptButtonTitle}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AlertDialog;
