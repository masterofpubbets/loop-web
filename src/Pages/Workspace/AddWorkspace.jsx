import React, { useState, useEffect, useContext } from "react";
import { WsContext } from "../../Context/WSContext";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import PageLayout from "../../Components/Layout/PageLayout";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { useWS } from "../../Hooks/useWS";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&:after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
    },
}));

const AddWorkspace  = () => {
    const [workspaceName, setWorkspaceName] = useState('');
    const [description, setDescription] = useState('');
    const [isDefault, setIsDefault] = useState(true);
    const { workspace } = useContext(WsContext);
    const { addWorkspace, error, isPending, successMes, clearSuccess, success } = useWS(workspace.length, "workspaces", "Workspace");
    const [openSnack, setOpenSnack] = useState(false);

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

    const handleIsDefault = () => {
        setIsDefault(!isDefault)
    };

    const handleAddWorkSpace = (e) => {
        addWorkspace({
            workspaceName,
            description,
            isDefault
        }, 1, "workspaceName", workspaceName)
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };

    useEffect(() => {
        if (success) {
            setOpenSnack(true)
            clearSuccess()
            setDescription('')
            setIsDefault(false)
            setWorkspaceName('')
        }
    }, [success]);

    return (
        <div>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
                    {successMes}
                </Alert>
            </Snackbar>

            <PageLayout 
            header=" Workspaces Settings" 
            icon={<WorkspacesIcon 
            color="primary" />} 
            marginContent={4}
            rightButton={
                <Link to="/workspaces">
                    <Button size="small" color="secondary" variant="contained" startIcon={<ArrowBackIcon />} >Back</Button>
                </Link>
            }
            >

                {(workspace.length === 0) && <Typography variant="BUTTON" component="span" gutterBottom color="error">
                    You do not have any workspace!
                    You need to have at least one Workspace.
                </Typography>}

                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    mt={4}
                    mb={3}
                >
                    <Grid item>
                        <Typography variant="BUTTON" component="span" gutterBottom color="text.secondary">
                            Workspace Icon:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar {...stringAvatar((workspaceName === '') ? 'N W' : workspaceName)} sx={{ backgroundColor: stringToColor((workspaceName === '') ? 'N W' : workspaceName), width: '52px', height: '52px' }} />
                    </Grid>

                </Grid>

                <FormControl sx={{ mb: 2 }}>
                    <TextField
                        label="Workspace Name"
                        required
                        value={workspaceName}
                        onChange={(e) => setWorkspaceName(e.target.value)}
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <FormControlLabel
                        control={<Android12Switch checked={isDefault} onChange={handleIsDefault} />}
                        label="Default Workspace"
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    {(error) && <Typography variant="BUTTON" component="span" gutterBottom color="error">
                        {error}
                    </Typography>}
                </FormControl>

                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-end"
                >
                    <Grid item>
                        <Button disabled={isPending} onClick={handleAddWorkSpace} variant="contained" >Add</Button>
                    </Grid>

                </Grid>


            </PageLayout>
        </div>
    );
};

export default AddWorkspace;
