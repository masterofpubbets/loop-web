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
import { useObject } from "../../Hooks/Common/useObject";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const AddContacts = () => {
    const { contacts } = useContext(ContactsContext);
    const [contactName, setContactName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [phone, setPhone] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [workGroup, setWorkGroup] = useState('');
    const [job, setJob] = useState('');
    const [address, setAddress] = useState('');
    const { currentWorkspace } = useContext(WsContext);
    const { add, error, isPending, successMes, clearSuccess, success } = useObject(contacts.length, "contacts", "Contact");
    const [openSnack, setOpenSnack] = useState(false);
    const [internalError, setInternalError] = useState(null);

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


    const handleAdd = (e) => {
        add({
            contactName,
            mobile,
            phone,
            email,
            workGroup,
            address,
            job,
            companyName,
        }, 10, "contactName", contactName, 'Full Name', { wsId: currentWorkspace.id })
        setInternalError(null)
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
            setMobile('')
            setPhone('')
            setAddress('')
            setJob('')
            setWorkGroup('')
            setEmail('')
            setContactName('')
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
                header="New Contact"
                icon={<ContactPhoneIcon color="primary" />}
                marginContent={4}
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


            </PageLayout>
        </div>
    );
};

export default AddContacts;
