import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import BoxView from "../../Components/Layout/BoxView";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { usePasswordReset } from "../../Hooks/usePasswordReset";


const ResetPass = () => {
    const [mail, setMail] = useState('');
    const { isPending, error, mailSend, resetMail } = usePasswordReset(mail);
    

    const handleLogin = (e) => {
        window.location.assign("/login")
    };

    const handleResetMail = (e) => {
        e.preventDefault();
        resetMail()
    };

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item xs={10} md={8} lg={8}>
                <Box mt={15}>
                    <Grid item xs={12} md={12}>
                        <BoxView>
                            <Grid
                                container
                                spacing={1}
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item mt={2} align="center" xs={12}>
                                    <Typography
                                        mt={2}
                                        ml={2}
                                        variant="h5"
                                        component="h5"
                                        gutterBottom
                                        fontWeight="bold"
                                        color="text.secondary"
                                        align="left"
                                    >
                                        Reset Your Password
                                    </Typography>
                                    <Divider />

                                    <Grid item xs={12} md={12} lg={12} align="center">
                                        <Box
                                            component="form"
                                            sx={{ '& .MuiTextField-root': { m: 2, width: '90%' }, }}
                                            noValidate
                                            autoComplete="off"
                                        >
                                            <div>
                                                <TextField
                                                    label="Enter you register mail"
                                                    value={mail}
                                                    onChange={(e) => setMail(e.target.value)}
                                                />
                                            </div>
                                        </Box>
                                    </Grid>

                                    {error &&
                                        <Grid item xs={12}>
                                            <Typography variant="caption" component="span" gutterBottom color="error">
                                                {error}
                                            </Typography>
                                        </Grid>
                                    }

                                    <Grid
                                        container
                                        spacing={1}
                                        direction="row"
                                        justifyContent="flex-end"
                                        alignItems="flex-end"
                                    >
                                        {isPending &&
                                            <Grid item >
                                                <CircularProgress />
                                            </Grid>
                                        }

                                        <Grid item >
                                            <Button disabled={isPending} onClick={handleResetMail} variant="contained" >Reset</Button>
                                        </Grid>

                                        <Grid item>
                                            <Box mr={1}>
                                                <Button disabled={isPending} onClick={handleLogin} variant="contained" color="secondary">Back</Button>
                                            </Box>
                                        </Grid>
                                    </Grid>

                                    {mailSend &&
                                        <Grid item xs={12}>
                                            <Box m={2}>
                                                <Typography variant="OVERLINE" component="span" gutterBottom color="primary">
                                                    {'Mail has been send to your inbox.'}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    }
                                    {mailSend &&
                                        <Grid item xs={12}>
                                            <Box m={2}>
                                                <Typography variant="OVERLINE" component="span" gutterBottom color="primary">
                                                    {'Please check your junk too.'}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    }


                                </Grid>
                            </Grid>
                        </BoxView>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ResetPass;
