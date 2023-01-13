import React, { useState, useEffect, useContext } from "react";
import { ContactsContext } from "../../Context/ContactsContext";
import { WsContext } from "../../Context/WSContext";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PageLayout from "../../Components/Layout/PageLayout";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Avatar from '@mui/material/Avatar';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import IconButton from '@mui/material/IconButton';
import { useObject } from "../../Hooks/Common/useObject";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useParams, useNavigate } from "react-router-dom";
import { usePhoto } from '../../Hooks/Common/usePhoto';
import CardMedia from '@mui/material/CardMedia';
import pmsImage from '../../Images/pms128.png';
import { useDelete } from "../../Hooks/Common/useDelete";
import ButtonGroup from '@mui/material/ButtonGroup';
import AlertDialog from "../../Components/Dialogs/AlertDialog";


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const ContactSettings = () => {
    const { id } = useParams();
    const [links, setLinks] = useState(null);
    const { contacts } = useContext(ContactsContext);
    const [photoURL, setPhotoURL] = useState(null);
    const [contactName, setContactName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [phone, setPhone] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [workGroup, setWorkGroup] = useState('');
    const [job, setJob] = useState('');
    const [address, setAddress] = useState('');
    const { currentWorkspace } = useContext(WsContext);
    const { update, error, isPending, successMes, clearSuccess, success } = useObject(contacts.length, "contacts", "Contact");
    const [openSnack, setOpenSnack] = useState(false);
    const [internalError, setInternalError] = useState(null);
    const { updateLogo, photoError, uploadedURL, successPhotoMes, successPhoto, clearPhotoMessage } = usePhoto('contacts', id, 'id');
    const { deleteContact, isPending: isDeletePending, deleteError } = useDelete();
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogMes, setDialogMes] = useState('');
    const [dialogButton, setDialogButton] = useState(null);
    const navigate = useNavigate();

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
        setDialogMes(`Are you sure you want to delete Contact (${contactName})?`)
    };

    const handleDialogClosed = (state) => {
        setOpenDialog(false);
        if (state) {
            //handle accept
            if (dialogButton === 'DELETE') {
                const result = deleteContact(['id', '==', id]);
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
            contactName,
            mobile,
            phone,
            email,
            workGroup,
            address,
            job,
            companyName,
        }, "contactName", contactName, 'Full Name', id, { field: 'wsId', value: currentWorkspace.id })
        setInternalError(null)
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };

    const handlePhotoSelected = (e) => {
        if (e.target.files.length > 0) {
            updateLogo(e.target.files[0], 'contacts', id, 250000)
        }
    };

    useEffect(() => {
        if (success) {
            setOpenSnack(true)
            clearSuccess()
        }
    }, [success]);

    useEffect(() => {
        if (contacts !== undefined) {
            if (contacts.length > 0) {
                const con = contacts.find(c => c.id === id);
                if (con !== undefined) {
                    setContactName(con.contactName)
                    if (con.address) {
                        setAddress(con.address)
                    }
                    if (con.mobile) {
                        setMobile(con.mobile)
                    }
                    if (con.phone) {
                        setPhone(con.phone)
                    }
                    if (con.email) {
                        setEmail(con.email)
                    }
                    if (con.workGroup) {
                        setWorkGroup(con.workGroup)
                    }
                    if (con.companyName) {
                        setCompanyName(con.companyName)
                    }

                    setPhotoURL(con.photoURL)

                    setLinks([{
                        title: "Contacts",
                        link: "/contacts",
                        icon: <ContactPhoneIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    }, {
                        title: con.contactName,
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
                header="Contact Settings"
                icon={<ContactPhoneIcon color="primary" />}
                marginContent={4}
                links={links}
                rightButton={
                    <Link to="/contacts">
                        <Button size="small" color="secondary" variant="contained" startIcon={<ArrowBackIcon />} >Back</Button>
                    </Link>
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
                            Contact Icon:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar {...stringAvatar((contactName === '') ? 'N C' : contactName)} sx={{ backgroundColor: stringToColor((contactName === '') ? 'N W' : contactName), width: '52px', height: '52px' }} />
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


                <FormControl sx={{ mb: 2 }} fullWidth>
                    <TextField
                        sx={{ mt: 1, width: '100%' }}
                        label="Company"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <TextField
                        sx={{ mt: 1, width: '100%' }}
                        label="Full Name"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                    />
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={3}
                        sx={{ width: '100%' }}
                    >
                        <Grid item>
                            <TextField
                                sx={{ mt: 1 }}
                                label="Phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                sx={{ mt: 1 }}
                                label="Mobile"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        sx={{ mt: 1, width: '75%' }}
                        label="Mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        sx={{ mt: 1, width: '75%' }}
                        label="Job Title"
                        value={job}
                        onChange={(e) => setJob(e.target.value)}
                    />
                    <TextField
                        sx={{ mt: 1, width: '75%' }}
                        label="Work Group"
                        value={workGroup}
                        onChange={(e) => setWorkGroup(e.target.value)}
                    />
                    <TextField
                        sx={{ mt: 1, width: '100%' }}
                        label="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
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
                    {(internalError) &&
                        <Typography variant="BUTTON" component="span" gutterBottom color="error">
                            {internalError}
                        </Typography>
                    }
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


            </PageLayout>
        </div>
    );
};

export default ContactSettings;
