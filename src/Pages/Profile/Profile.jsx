import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import BoxView from "../../Components/Layout/BoxView";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import LinearProgress from '@mui/material/LinearProgress';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import { useUser } from '../../Hooks/useUser';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

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


const Profile = () => {
    const { user, error, passError, isPending, updateUserPassword, updateUser, success, successMes, clearSuccess, updateMailNotification, updateProfilePhoto, photoError, isPhotoPending, photoProgresspercent } = useUser();
    const [displayName, setDisplayName] = useState(user.displayName);
    const [phone, setPhone] = useState((user.phoneNumber !== undefined) ? user.phoneNumber : '');
    const [role, setRole] = useState((user.role !== undefined) ? user.role : '');
    const [company, setCompany] = useState((user.company !== undefined) ? user.company : '');
    const [mailNotify, setMailNotify] = useState(false);
    const [currentPass, setCurrentPass] = useState('');
    const [pass, setPass] = useState('');
    const [conPass, setConPass] = useState('');
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
        if (name !== undefined) {
            return {
                sx: {
                    bgcolor: stringToColor(name),
                },
                children: (name.indexOf(' ') === -1) ? `${name.split(' ')[0][0]}` : `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
            };
        }
    };


    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };

    const toggleMailNotify = () => {
        setMailNotify(!mailNotify)
        updateMailNotification(!mailNotify)
    };

    const handleUpdatePassClick = (e) => {
        e.preventDefault()
        updateUserPassword(currentPass, conPass, pass)
    };

    const handleClickUpdateInfo = (e) => {
        e.preventDefault();
        updateUser({
            displayName,
            phoneNumber: phone,
            role,
            company
        })
    };

    const handlePhotoSelected = (e) => {
        if (e.target.files.length > 0) {
            updateProfilePhoto(e.target.files[0])
        }
    };

    useEffect(() => {
        if (user.role !== undefined) {
            setRole(user.role)
        }
    }, [user.role])

    useEffect(() => {
        if (user.company !== undefined) {
            setCompany(user.company)
        }
    }, [user.company])

    useEffect(() => {
        if (user.mailNotification !== undefined) {
            setMailNotify(user.mailNotification)
        }
    }, [user.mailNotification])

    useEffect(() => {
        if (user.phoneNumber !== undefined) {
            setPhone(user.phoneNumber !== null ? user.phoneNumber : '')
        }
    }, [user.phoneNumber])

    useEffect(() => {
        if (user.displayName !== undefined) {
            setDisplayName(user.displayName)
        }
    }, [user.displayName])

    useEffect(() => {
        if (success) {
            setOpenSnack(true)
            clearSuccess()
        }
    }, [success]);

    return (
        <div>

            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
                    {successMes}
                </Alert>
            </Snackbar>

            <Typography variant="h4" component="h4" gutterBottom color="text.secondary">
                Profile
            </Typography>

            <Grid container mt={2} spacing={2}>

                <Grid item xs={12} md={4} lg={3} ml={2}>
                    <BoxView >
                        <Grid container spacing={1} direction="row" justifyContent="center" alignItems="center">
                            <Grid item xs={6} md={6} lg={6} mt={2} align="center">
                                {user.photoURL ? <img alt={user.displayName} src={user.photoURL} referrerPolicy="no-referrer" style={{ width: '100%', borderRadius: '50%' }}></img> : <Avatar {...stringAvatar(user.displayName)} sx={{ backgroundColor: stringToColor(user.displayName) }} />}
                            </Grid>

                            <Grid item xs={12} md={12} lg={12} align="center">
                                <Typography variant="h6" component="h6" gutterBottom>
                                    {user.displayName}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} align="center">
                                <Typography variant="caption" component="span" gutterBottom color="text.secondary">
                                    {user.email}
                                </Typography>
                            </Grid>

                            {(user.provider === 'password') && <Grid item xs={12} md={12} lg={12} align="center">
                                <Divider />
                            </Grid>}

                            <Grid item xs={12} md={12} lg={12} align="center">
                                {(user.provider === 'password') && photoProgresspercent &&
                                    <LinearProgress variant="determinate" value={photoProgresspercent} />
                                }

                                {(user.provider === 'password') &&
                                    <Box m={1}>
                                        <IconButton disabled={isPhotoPending || isPending} onChange={handlePhotoSelected} color="primary" aria-label="upload picture" component="label" >
                                            <input hidden accept="image/*" type="file" />
                                            <PhotoCamera />
                                        </IconButton>
                                    </Box>
                                }

                                {(user.provider === 'password') && photoError &&
                                    <Typography variant="caption" component="span" gutterBottom color="error">
                                        {photoError}
                                    </Typography>
                                }
                            </Grid>
                        </Grid>
                    </BoxView>
                </Grid>

                <Grid item xs={12} md={7} lg={8} ml={2}>
                    <BoxView >
                        <Grid container spacing={1}>

                            <Grid item xs={12} md={12} lg={12} >
                                <Typography mt={2} ml={2} variant="h5" component="h5" gutterBottom fontWeight="bold" color="text.secondary">
                                    Information
                                </Typography>
                            </Grid>

                            <Grid item xs={12} md={12} lg={12} align="center">
                                <Divider />
                            </Grid>

                            <Grid item xs={12} md={12} lg={12} align="center">
                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': { m: 2, width: '90%' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <div>
                                        <TextField
                                            disabled={!user.provider === 'password' || isPending}
                                            label="Display Name"
                                            required
                                            value={displayName}
                                            onChange={(e) => setDisplayName(e.target.value)}
                                        />
                                        <TextField
                                            label="Phone Number"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />

                                        <TextField
                                            label="Role"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                        />

                                        <TextField
                                            label="Company"
                                            value={company}
                                            onChange={(e) => setCompany(e.target.value)}
                                        />

                                    </div>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={8} lg={8}>
                                            {error &&
                                                <Box ml={2} mb={2} align="left">
                                                    <Typography variant="caption" component="span" gutterBottom color="error">
                                                        {error}
                                                    </Typography>
                                                </Box>
                                            }

                                        </Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <Box mb={2} mr={2} align="right">
                                                <Button onClick={handleClickUpdateInfo} variant="contained" >update</Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>

                        </Grid>
                    </BoxView>
                </Grid>

            </Grid>


            <Box mt={5}>
                <Typography variant="h4" component="h4" gutterBottom color="text.secondary">
                    Security
                </Typography>

                <Grid container mt={2} spacing={2}>
                    <Grid item xs={12} md={11} lg={11} ml={2}>
                        <BoxView >
                            <Grid container spacing={1}>

                                <Grid item xs={12} md={12} lg={12} >
                                    <Typography mt={2} ml={2} variant="h5" component="h5" gutterBottom fontWeight="bold" color="text.secondary">
                                        {(user.provider === 'password') ? 'Password' : 'Password (By provider)'}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={12} lg={12} align="center">
                                    <Divider />
                                </Grid>

                                <Grid item xs={12} md={12} lg={12} align="center">
                                    <Box
                                        component="form"
                                        sx={{
                                            '& .MuiTextField-root': { m: 2, width: '90%' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <div>
                                            <TextField
                                                disabled={(user.provider === 'password') ? false : true}
                                                label="Current"
                                                type="password"
                                                required
                                                value={currentPass}
                                                onChange={(e) => setCurrentPass(e.target.value)}
                                            />
                                            <TextField
                                                disabled={(user.provider === 'password') ? false : true}
                                                label="New"
                                                type="password"
                                                required
                                                value={pass}
                                                onChange={(e) => setPass(e.target.value)}
                                            />
                                            <TextField
                                                disabled={(user.provider === 'password') ? false : true}
                                                label="Confirm"
                                                type="password"
                                                required
                                                value={conPass}
                                                onChange={(e) => setConPass(e.target.value)}
                                            />

                                        </div>

                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={8} lg={8}>
                                                <Box ml={2} mb={2} align="left">
                                                    {passError &&
                                                        <Typography variant="caption" component="span" gutterBottom color="error">
                                                            {passError}
                                                        </Typography>
                                                    }
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} md={4} lg={4}>
                                                <Box mb={2} mr={2} align="right">
                                                    <Button variant="contained" disabled={(user.provider === 'password') ? false : true} onClick={handleUpdatePassClick}>update</Button>
                                                </Box>
                                            </Grid>
                                        </Grid>

                                    </Box>
                                </Grid>

                            </Grid>
                        </BoxView>
                    </Grid>
                </Grid>

            </Box>

            <Box mt={5}>
                <Typography variant="h4" component="h4" gutterBottom color="text.secondary">
                    Notifications
                </Typography>

                <Grid container mt={2} spacing={2}>
                    <Grid item xs={12} md={11} lg={11} ml={2}>
                        <BoxView >
                            <Grid container spacing={1}>

                                <Grid item xs={12} md={12} lg={12} >
                                    <Typography mt={2} ml={2} variant="h5" component="h5" gutterBottom fontWeight="bold" color="text.secondary">
                                        Mail
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12} >
                                    <Box ml={3}>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={<Android12Switch checked={mailNotify} onChange={toggleMailNotify} />}
                                                label="Receive Notifications"
                                            />
                                        </FormGroup>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} md={12} lg={12} align="center">
                                    <Divider />
                                </Grid>

                            </Grid>
                        </BoxView>
                    </Grid>
                </Grid>

            </Box>

            <Box mt={2}>

                <Grid container mt={2} spacing={2}>
                    <Grid item xs={12} md={11} lg={11} ml={2}>
                        <BoxView >
                            <Grid container spacing={1}>

                                <Grid item xs={12} md={12} lg={12} >
                                    <Typography mt={2} ml={2} variant="h5" component="h5" gutterBottom fontWeight="bold" color="text.secondary">
                                        Options
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={12} lg={12} align="center">
                                    <Divider />
                                </Grid>
                                <Grid item xs={12} md={12} lg={12} align="center">
                                    <Box m={2} align="right">
                                        <Button variant="contained" color="warning">Delete Account</Button>
                                    </Box>
                                </Grid>

                            </Grid>
                        </BoxView>
                    </Grid>
                </Grid>

            </Box>

        </div>
    );
};

export default Profile;