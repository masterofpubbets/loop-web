import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../Components/Layout/PageLayout";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useObject } from "../../Hooks/Common/useObject";
import { ProjectContext } from "../../Context/Projects/ProjectsContext";
import { WsContext } from "../../Context/WSContext";
import { v4 as uuidv4 } from 'uuid';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const AddProject = () => {
    const nav = useNavigate();
    const [projectName, setProjectName] = useState('');
    const [client, setClient] = useState('');
    const [location, setLocation] = useState('');
    const [proNo, setProNo] = useState('');
    const [description, setDescription] = useState('');
    const [appUUID, setAppUUID] = useState('');
    const [internalError, setInternalError] = useState(null);
    const [openSnack, setOpenSnack] = useState(false);
    const { projects } = useContext(ProjectContext);
    const { currentWorkspace } = useContext(WsContext);
    const { add, error, isPending, successMes, clearSuccess, success } = useObject(projects.length, "projects", "Project");


    const handleBack = () => {
        nav(-1)
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };


    const handleAdd = (e) => {
        add({
            projectName,
            client,
            location,
            proNo,
            description,
            appUUID
        }, 1, "projectName", projectName, 'Product Name', { wsId: currentWorkspace.id })
    };

    useEffect(() => {
        if (success) {
            setOpenSnack(true)
            clearSuccess()
            setProjectName('')
            setClient('')
            setLocation('')
            setProNo('')
            setAppUUID('')
            setDescription('');
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
                header="Add Project"
                icon={<AccountTreeIcon color="error" />}
                marginContent={4}
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
                    <Button sx={{ mt: 1, width: '50%' }} disabled={isPending} onClick={() => setAppUUID(uuidv4())} variant="contained" >Generate New</Button>

                    <TextField
                        sx={{ mt: 1, width: '50%' }}
                        label="Pro No"
                        value={proNo}
                        onChange={(e) => setProNo(e.target.value)}
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    {(error) && <Typography variant="BUTTON" component="span" gutterBottom color="error">
                        {error}
                    </Typography>}
                    {(internalError) && <Typography variant="BUTTON" component="span" gutterBottom color="error">
                        {internalError}
                    </Typography>}
                </FormControl>

                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-end"
                >
                    <Grid item>
                        <Button disabled={isPending} onClick={handleAdd} variant="contained" >Add</Button>
                    </Grid>

                </Grid>

            </PageLayout >

        </div >
    )
};

export default AddProject;