import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../../Components/Layout/PageLayout";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import CardMedia from '@mui/material/CardMedia';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useObject } from "../../Hooks/Common/useObject";
import { ProjectContext } from "../../Context/Projects/ProjectsContext";
import { WsContext } from "../../Context/WSContext";
import { usePhoto } from '../../Hooks/Common/usePhoto';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useDelete } from "../../Hooks/Common/useDelete";
import AlertDialog from "../../Components/Dialogs/AlertDialog";
import ButtonGroup from '@mui/material/ButtonGroup';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const ProjectSettings = () => {
    const { id } = useParams();
    const nav = useNavigate();
    const [links, setLinks] = useState(null);
    const [projectName, setProjectName] = useState('');
    const [photoURL, setPhotoURL] = useState(null);
    const [client, setClient] = useState('');
    const [appUUID, setAppUUID] = useState('');
    const [proNo, setProNo] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [internalError, setInternalError] = useState(null);
    const [openSnack, setOpenSnack] = useState(false);
    const { projects } = useContext(ProjectContext);
    const { currentWorkspace } = useContext(WsContext);
    const { update, error, isPending, successMes, clearSuccess, success } = useObject(projects.length, "projects", "Projects");
    const { updateLogo, photoError, uploadedURL, successPhotoMes, successPhoto, clearPhotoMessage } = usePhoto('projects', id, 'id');
    const { deleteProduct, isPending: isDeletePending, deleteError } = useDelete();
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogMes, setDialogMes] = useState('');
    const [dialogButton, setDialogButton] = useState(null);
    const navigate = useNavigate();


    const handleBack = () => {
        nav(-1)
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };

    const handleIsFav = () => {
        setIsFav(!isFav)
    };

    const handleOpenDeleteAllDialog = () => {
        setOpenDialog(true);
        setDialogButton('DELETE')
        setDialogMes(`Are you sure you want to delete Project (${projectName})?`)
    };

    const handleDialogClosed = (state) => {
        setOpenDialog(false);
        if (state) {
            //handle accept
            if (dialogButton === 'DELETE') {
                const result = deleteProduct(['id', '==', id]);
                if (result) {
                    navigate(-1)
                }
            }
        } else {
            //handle reject
        }
    };

    const handleUpdate = (e) => {
        update({
            projectName,
            client,
            appUUID,
            proNo,
            location,
            description
        }, "projectName", projectName, 'Project Name', id, { field: 'wsId', value: currentWorkspace.id })
    };

    const handlePhotoSelected = (e) => {
        if (e.target.files.length > 0) {
            updateLogo(e.target.files[0], 'projects', id, 250000)
        }
    };

    useEffect(() => {
        if (success) {
            setOpenSnack(true)
            clearSuccess()
        }
    }, [success]);

    useEffect(() => {
        if (projects !== undefined) {
            if (projects.length > 0) {
                const con = projects.find(c => c.id === id);
                if (con !== undefined) {
                    setProjectName(con.projectName)
                    if (con.description) {
                        setDescription(con.description)
                    }
                    if (con.location) {
                        setLocation(con.location)
                    }
                    if (con.client) {
                        setClient(con.client)
                    }
                    if (con.proNo) {
                        setProNo(con.proNo)
                    }
                    if (con.appUUID) {
                        setAppUUID(con.appUUID)
                    }
                    setPhotoURL(con.photoURL)

                    setLinks([{
                        title: "Projects",
                        link: "#",
                        icon: <AccountTreeIcon sx={{ mr: 0.5 }} fontSize="inherit" color="error" />
                    }, {
                        title: con.projectName,
                        link: "#",

                    }])
                }
            }
        }
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

            <PageLayout
                header="Project Settings"
                icon={<AccountTreeIcon color="error" />}
                marginContent={4}
                links={links}
                rightButton={
                    <Grid
                        container
                        spacing={1}
                    >
                        <Grid item>
                            <Button onClick={handleBack} variant="contained" startIcon={<ArrowBackIcon />} color="secondary" size="small">
                                Back
                            </Button>
                        </Grid>

                    </Grid>
                }
            >

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
                            Project Icon:
                        </Typography>
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

                <FormControl sx={{ mb: 2 }} fullWidth>
                    <TextField
                        sx={{ mt: 1, width: '100%' }}
                        label="Name"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                    <TextField
                        sx={{ mt: 1, width: '100%' }}
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        sx={{ mt: 1, width: '100%' }}
                        label="Client"
                        value={client}
                        onChange={(e) => setClient(e.target.value)}
                    />
                    <TextField
                        sx={{ mt: 1, width: '100%' }}
                        label="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <TextField
                        sx={{ mt: 1, width: '100%' }}
                        label="App UUID"
                        value={appUUID}
                        onChange={(e) => setAppUUID(e.target.value)}
                    />
                    <TextField
                        sx={{ mt: 1, width: '50%' }}
                        label="Project No"
                        value={proNo}
                        onChange={(e) => setProNo(e.target.value)}
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    {(error) && <Typography variant="BUTTON" component="span" gutterBottom color="error">
                        {error}
                    </Typography>}
                    {(deleteError) &&
                        <Typography variant="BUTTON" component="span" gutterBottom color="error">
                            {deleteError}
                        </Typography>
                    }
                    {(internalError) && <Typography variant="BUTTON" component="span" gutterBottom color="error">
                        {internalError}
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
                            <Button disabled={isDeletePending || isPending} onClick={handleUpdate} variant="contained" >Update</Button>
                        </ButtonGroup>
                    </Grid>

                </Grid>

            </PageLayout >

        </div >
    )
};

export default ProjectSettings;