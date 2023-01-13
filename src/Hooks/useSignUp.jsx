import { useState, useEffect } from 'react';
import { fbAuth, serverTimestamp } from '../Firebase/FirebaseConfig';
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDocuments } from './Firebase/useDocuments';
import { v4 as uuidv4 } from 'uuid';


export const useSignUp = () => {
    const [error, setError] = useState(null);
    const [errorGoogle, setErrorGoogle] = useState(null);
    const [errorUserName, setErrorUserName] = useState(null);
    const [errorEmail, setErrorEmail] = useState(null);
    const [errorPass, setErrorPass] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const { updateDoc } = useDocuments("users");
    const { updateDoc: updateNotifications } = useDocuments("notifications");



    const clearErrors = () => {
        if (!isActive) {
            setIsPending(false)
            setError(null)
            setErrorUserName(null)
            setErrorEmail(null)
            setErrorPass(null)
            setErrorGoogle(null)
        }
    };

    const signUpUser = async (userName, email, pass, conPass) => {
        if (isActive) {
            setIsPending(true)
            setError(null)
            setErrorUserName(null)
            setErrorEmail(null)
            setErrorPass(null)

            if (userName === '') {
                setErrorUserName('Missing Name')
                setIsPending(false)
            } else if (email === '') {
                setErrorEmail('Missing E-Mail')
                setIsPending(false)
            } else if (pass === '') {
                setErrorPass('Password Cannot Be Null')
                setIsPending(false)
            } else if (pass !== conPass) {
                setErrorPass('Password Mismatched')
                setIsPending(false)
            } else {
                try {
                    //here is to call firebase authentication
                    const res = await createUserWithEmailAndPassword(fbAuth, email, pass);
                    const user = res.user;
                    await updateProfile(fbAuth.currentUser, { displayName: userName })
                    const userToSave = {
                        uid: user.uid,
                        displayName: user.displayName,
                        email: user.email,
                        createdAt: user.metadata.createdAt,
                        createdOn: serverTimestamp(),
                        lastLogin: serverTimestamp(),
                        authProvider: "password",
                        userType: "free",
                        photoURL: (user.photoURL !== undefined) ? user.photoURL : null,
                        mode: 'light',
                        mailNotification: false,
                    }
                    const noti = {
                        id: uuidv4(),
                        uid: user.uid,
                        title: 'Tasks Director',
                        body: `Welcome ${user.displayName} to Task Directors.`,
                        type: 'primary',
                        createdAt: serverTimestamp()
                    }
                    const q = ["uid", "==", user.uid]
                    await updateDoc('', q, userToSave, true, true);
                    await updateNotifications('', q, noti, true, true);

                    setIsPending(false)
                } catch (err) {
                    setError(err.message.replace("Firebase: ", "").replace("auth/", ""))
                    setIsPending(false)
                }
            }

        }
    };


    const signUpUserWithGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();

        if (isActive) {
            setIsPending(true)
            setErrorGoogle(null)

            try {

                const res = await signInWithPopup(fbAuth, googleProvider);
                const user = res.user;
                const userToSave = {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    createdAt: user.metadata.createdAt,
                    createdOn: serverTimestamp(),
                    lastLogin: serverTimestamp(),
                    authProvider: "google",
                    userType: "free",
                    photoURL: (user.photoURL !== undefined) ? user.photoURL : null,
                    mode: 'light',
                    mailNotification: false,
                }

                const noti = {
                    id: uuidv4(),
                    uid: user.uid,
                    title: 'Tasks Director',
                    body: `Welcome ${user.displayName} to Task Directors.`,
                    type: 'normal',
                    createdAt: serverTimestamp()
                }
                const q = ["uid", "==", user.uid]
                await updateDoc('', q, userToSave, true, true);
                await updateNotifications('', q, noti, true, true);

                setIsPending(false)
            } catch (err) {
                if (err.message !== "Firebase: Error (auth/popup-closed-by-user).") {
                    setErrorGoogle(err.message.replace("Firebase: ", "").replace("auth/", ""))
                }
                setIsPending(false)
            }
        }


    };

    useEffect(() => {
        return () => setIsActive(true)
    }, [])


    return { error, errorGoogle, isPending, errorUserName, errorEmail, errorPass, signUpUser, clearErrors, signUpUserWithGoogle };
};