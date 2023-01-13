import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import IconButton from '@mui/material/IconButton';
import { useWS } from "../../Hooks/useWS";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { usePhoto } from '../../Hooks/Common/usePhoto';
import CardMedia from '@mui/material/CardMedia';
import pmsImage from '../../Images/pms128.png';
import { useDelete } from "../../Hooks/Common/useDelete";
import ButtonGroup from '@mui/material/ButtonGroup';
import AlertDialog from "../../Components/Dialogs/AlertDialog";
import ListObjects from "../../Components/Lists/ListObjects";
import PeopleIcon from '@mui/icons-material/People';
import { usersFilterHeader } from './comboFilter';
import { useOtherUsers } from "../../Hooks/useOtherUsers";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Divider from '@mui/material/Divider';




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

const WorkspaceSettings = () => {
    const [workspaceName, setWorkspaceName] = useState('');
    const [photoURL, setPhotoURL] = useState(null);
    const [description, setDescription] = useState('');
    const [isDefault, setIsDefault] = useState(true);
    const { workspace, currentWorkspace } = useContext(WsContext);
    const { updateWorkspace, error, isPending, successMes, clearSuccess, success } = useWS(workspace.length, "workspaces", "Workspace");
    const { sharedUsers, sharedUsersVersion } = useOtherUsers(currentWorkspace.id);
    const [openSnack, setOpenSnack] = useState(false);
    const [links, setLinks] = useState(null);
    const { id } = useParams();
    const { updateLogo, photoError, uploadedURL, successPhotoMes, successPhoto, clearPhotoMessage } = usePhoto('workspaces', id, 'id');
    const { deleteWorkspace, isPending: isDeletePending, deleteError } = useDelete();
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogMes, setDialogMes] = useState('');
    const [dialogButton, setDialogButton] = useState(null);
    const navigate = useNavigate();
    const [internalErr, setInternalErr] = useState(null);


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

    const handleOpenDeleteAllDialog = () => {
        setOpenDialog(true);
        setDialogButton('DELETE')
        setDialogMes(`Are you sure you want to delete Workspace (${workspaceName}) and all of its children? NOTE: Default Workspace Cannot Be Deleted.`)
    };

    const handleDialogClosed = (state) => {
        setOpenDialog(false);
        if (state) {
            //handle accept
            if (dialogButton === 'DELETE') {
                const result = deleteWorkspace(['id', '==', id]);
                if (result) {
                    navigate(-1)
                }
            }
        } else {
            //handle reject
        }
    };

    const handleIsDefault = () => {
        if (isDefault) {
            setInternalErr('You must have at least one default Workspace!')
        } else {
            setIsDefault(true)
        }
    };

    const handleUpdateWorkSpace = (e) => {
        setInternalErr(null)
        updateWorkspace({
            workspaceName,
            description,
            isDefault
        }, "workspaceName", workspaceName, id)
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };

    const handlePhotoSelected = (e) => {
        if (e.target.files.length > 0) {
            updateLogo(e.target.files[0], 'workspaces', id, 250000)
        }
    };

    useEffect(() => {
        if (success) {
            setOpenSnack(true)
            clearSuccess()
            const ws = workspace.find(w => w.id === id)
            setWorkspaceName(ws.workspaceName)
            if (ws.description) {
                setDescription(ws.description)
            }
            setIsDefault(ws.isDefault)
            setPhotoURL(ws.photoURL)

            setLinks([{
                title: "Workspaces",
                link: "/workspaces",
                icon: <WorkspacesIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            }, {
                title: ws.workspaceName,
                link: "#",

            }])
        }
    }, [success]);

    useEffect(() => {
        const ws = workspace.find(w => w.id === id)
        setWorkspaceName(ws.workspaceName)
        if (ws.description) {
            setDescription(ws.description)
        }
        setIsDefault(ws.isDefault)
        setPhotoURL(ws.photoURL)

        setLinks([{
            title: "Workspaces",
            link: "/workspaces",
            icon: <WorkspacesIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        }, {
            title: ws.workspaceName,
            link: "#",

        }])
    }, [id]);

    useEffect(() => {
        if (uploadedURL) {
            setPhotoURL(uploadedURL)
        }
    }, [uploadedURL]);

    useEffect(() => {
        if (successPhoto) {
            setOpenSnack(true)
            clearPhotoMessage()
        }
    }, [successPhoto]);

    return (
        <div>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
                    {successMes || successPhotoMes}
                </Alert>
            </Snackbar>

            <PageLayout header=" Workspace Settings" icon={<WorkspacesIcon color="primary" />} links={links} marginContent={4}>

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
                >

                    <Grid item>
                        <Typography variant="BUTTON" component="span" gutterBottom color="text.secondary">
                            Workspace Icon:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar {...stringAvatar((workspaceName === '') ? 'N W' : workspaceName)} sx={{ backgroundColor: stringToColor((workspaceName === '') ? 'N W' : workspaceName), width: '52px', height: '52px' }} />
                    </Grid>


                    <Grid item>
                        {photoURL &&
                            <CardMedia
                                component="img"
                                height="128"
                                image={photoURL}
                                alt={id}
                            />
                        }
                        {!photoURL &&
                            <CardMedia
                                component="img"
                                height="128"
                                image={pmsImage}
                                alt={id}
                            />
                        }
                    </Grid>


                    <Grid item>
                        <IconButton disabled={isPending} onChange={handlePhotoSelected} color="primary" aria-label="upload picture" component="label" >
                            <input hidden accept="image/*" type="file" />
                            <PhotoCamera />
                        </IconButton>
                    </Grid>

                    {photoError &&
                        <Grid item>
                            <Typography variant="caption" component="span" gutterBottom color="error">
                                {photoError}
                            </Typography>
                        </Grid>
                    }

                </Grid>

                <FormControl sx={{ mb: 2, mt: 4 }}>
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
                    {(deleteError) &&
                        <Typography variant="BUTTON" component="span" gutterBottom color="error">
                            {deleteError}
                        </Typography>}
                    {(internalErr) &&
                        <Typography variant="BUTTON" component="span" gutterBottom color="error">
                            {internalErr}
                        </Typography>}
                </FormControl>

                <AlertDialog openDialog={openDialog} handleDialogClosed={handleDialogClosed} message={dialogMes} />

                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-end"
                >
                    <Grid item>
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            <Button disabled={isDeletePending || isPending} onClick={handleOpenDeleteAllDialog} color="error">delete</Button>
                            <Button disabled={isPending || isDeletePending} onClick={handleUpdateWorkSpace} variant="contained" >update</Button>
                        </ButtonGroup>
                    </Grid>

                </Grid>

                <Divider sx={{marginTop: '25px'}}/>

                <PageLayout
                    header="Shared Users"
                    icon={<PeopleIcon color="error" />}
                    marginContent={4}
                    rightButton={
                        <Link to="/addshareduser">
                            <Button variant="contained" startIcon={<LibraryAddIcon />} size="small" >
                                Add User
                            </Button>
                        </Link>
                    }
                >
                    <ListObjects listName="Users" data={sharedUsers} filterHeader={usersFilterHeader} dataVersion={sharedUsersVersion} />

                </PageLayout>


            </PageLayout>
        </div>
    );
};

export default WorkspaceSettings;
