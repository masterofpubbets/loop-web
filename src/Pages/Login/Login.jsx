import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import logoImg from "../../Images/pms128.png";
import { BsGoogle } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSignIn } from "../../Hooks/useSignIn";
import { useTheme } from "../../Hooks/useTheme";

const Login = () => {
    const navigate = useNavigate();
    const { signInUserWithGoogle } = useSignIn();
    const { preTheme } = useTheme();
    const bgColor = (preTheme.palette.mode === 'light') ? styles.bgColorWhite : styles.bgColorBlack;


    const clickSignupMail = (e) => {
        e.preventDefault();
        navigate("/signupmail");
    };

    const clickLoginMail = (e) => {
        e.preventDefault();
        navigate("/loginmail");
    };

    const clickLoginGoogle = (e) => {
        e.preventDefault();
        signInUserWithGoogle();
    };

    const clickReset = () => {
        window.location.assign("/resetpassword")
    };

    return (
        <div className={`${styles.mainCard} ${bgColor}`}>
            <div className={styles.content}>
                <div className={styles.title}>
                    <img src={logoImg} alt="google login"></img>
                    <p>Tasks Director</p>
                </div>
                <div className={styles.subContent}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth={true}
                        onClick={clickLoginGoogle}
                        startIcon={<BsGoogle />}
                    >
                        Log in with Google
                    </Button>
                </div>
                <div className={styles.subContent}>
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth={true}
                        onClick={clickLoginMail}
                        startIcon={<AiOutlineMail />}
                    >
                        Log in with E-Mail
                    </Button>
                </div>
                <div className={styles.signupTextContainer}>
                    <Typography
                        align="center"
                        variant="subtitle2"
                        component="p"
                    >
                        Don't have an account?
                        <Button
                            variant="text"
                            size="small"
                            color="primary"
                            onClick={clickSignupMail}
                        >
                            Sign up
                        </Button>
                    </Typography>

                    <Typography align="center" variant="caption" component="p">
                        Forget My Password!
                        <Button
                            variant="text"
                            size="small"
                            color="warning"
                            onClick={clickReset}
                        >
                            Click Here
                        </Button>
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default Login;
