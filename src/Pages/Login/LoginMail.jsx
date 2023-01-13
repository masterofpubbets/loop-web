import React, { useState } from "react";
import styles from './LoginMail.module.css';
import logoImg from '../../Images/pms128.png';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useSignIn } from '../../Hooks/useSignIn';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import MarkunreadIcon from '@mui/icons-material/Markunread';

function LoginMail() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { error, isPending, signInMail, clearErrors } = useSignIn();

    const handleSubmit = (e) => {
        e.preventDefault();
        signInMail( email, password)
    };

    return (
        <>
            <div className={styles.title}>
                <img src={logoImg} alt="Task Director"></img>
                <p>Tasks Director</p>
            </div>

            <div className={styles.container}>

                <div className={styles.formContainer}>
                    <Typography variant="h6" gutterBottom className={styles.h6} align="center">
                        Log In
                    </Typography>

                    <form className={styles.form}>

                        <TextField
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

                        {!isPending && <Button onClick={handleSubmit} variant="contained" startIcon={<MarkunreadIcon className="startIcon"/>}>Log In</Button>}

                    </form>

                    {isPending &&
                        <Box sx={{ display: 'block', marginRight: 'auto', marginLeft: 'auto', marginTop: '20px', height: '10px' }}>
                            <CircularProgress />
                        </Box>
                    }

                    {error &&
                        <Typography variant="caption" gutterBottom align="left" color="error" className={`${styles.body2} ${styles.h6}`}>
                            {error}
                        </Typography>
                    }

                </div>

            </div>
        </>
    )
};

export default LoginMail;