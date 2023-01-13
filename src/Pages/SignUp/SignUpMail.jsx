import React, { useState } from "react";
import styles from './SignUpMail.module.css';
import logoImg from '../../Images/pms128.png';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useSignUp } from '../../Hooks/useSignUp';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import GoogleIcon from '@mui/icons-material/Google';
import MarkunreadIcon from '@mui/icons-material/Markunread';


function SignUpMail() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPass, setConPass] = useState('');
    const { error, errorGoogle, errorUserName, errorEmail, errorPass, isPending, signUpUser, clearErrors, signUpUserWithGoogle } = useSignUp();

    const handleSubmit = (e) => {
        e.preventDefault();
        signUpUser(userName, email, password, conPass)
    };

    const handleSignInWithGoogle = (e) => {
        e.preventDefault();
        signUpUserWithGoogle()
    }

    return (
        <>
            <div className={styles.title}>
                <img src={logoImg} alt="Task Director"></img>
                <p>Tasks Director</p>
            </div>

            <div className={styles.container}>


                <div className={styles.googleContainer}>
                    <Typography variant="h6" gutterBottom className={styles.h6} align="center">
                        Sign Up With Google
                    </Typography>

                    <div className={styles.form}>
                        {errorGoogle &&
                            <Typography variant="caption" gutterBottom align="left" color="error" className={`${styles.body2} ${styles.h6}`}>
                                {errorGoogle}
                            </Typography>
                        }

                        {!isPending && <Button size="large" onClick={handleSignInWithGoogle} variant="outlined" startIcon={<GoogleIcon className="startIcon" />} >Sign Up</Button>}
                        {isPending &&
                            <Box sx={{ display: 'block', marginRight: 'auto', marginLeft: 'auto', marginTop: '20px', height: '10px' }}>
                                <CircularProgress />
                            </Box>
                        }

                    </div>
                </div>

                <div className={styles.formContainer}>
                    <Typography variant="h6" gutterBottom className={styles.h6} align="center">
                        Sign Up
                    </Typography>

                    <form className={styles.form}>

                        <TextField
                            error={errorUserName}
                            helperText={errorUserName}
                            required
                            label="Name"
                            fullWidth
                            size="small"
                            value={userName}
                            onChange={(e) => {
                                setUserName(e.target.value)
                                clearErrors()
                            }}
                        />
                        <TextField
                            error={errorEmail}
                            helperText={errorEmail}
                            required
                            label="E-Mail"
                            fullWidth
                            size="small"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                clearErrors()
                            }}
                        />
                        <TextField
                            error={errorPass}
                            helperText={errorPass}
                            required
                            label="Password"
                            fullWidth
                            size="small"
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                clearErrors()
                            }}
                        />
                        <TextField
                            required
                            label="Confirm Password"
                            fullWidth
                            size="small"
                            type="password"
                            value={conPass}
                            onChange={(e) => {
                                setConPass(e.target.value)
                                clearErrors()
                            }}
                        />

                        {error &&
                            <Typography variant="caption" gutterBottom align="left" color="error" className={`${styles.body2} ${styles.h6}`}>
                                {error}
                            </Typography>
                        }

                        {isPending &&
                            <Box sx={{ display: 'block', marginRight: 'auto', marginLeft: 'auto', marginTop: '20px', height: '10px' }}>
                                <CircularProgress />
                            </Box>
                        }
                        {!isPending && <Button onClick={handleSubmit} variant="contained" startIcon={<MarkunreadIcon className="startIcon" />}>Sign Up</Button>}

                    </form>
                </div>



            </div>
        </>
    )
};

export default SignUpMail;