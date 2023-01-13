import { useState, useEffect } from "react";
import { fbAuth, serverTimestamp } from '../Firebase/FirebaseConfig';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDocuments } from '../Hooks/Firebase/useDocuments';

export const useSignIn = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const { updateDoc } = useDocuments('users')

    const clearErrors = () => {
        if (isActive) {
            setIsPending(false)
            setError(null)
        }
    };

    const signInMail = async (mail, pass) => {
        if (isActive) {
            setIsPending(true)

            if ((mail !== '') && (pass !== '')) {
                try {
                    setIsPending(true)
                    const result = await signInWithEmailAndPassword(fbAuth, mail, pass);
                    const user = result.user;
                    const userToSave = {
                        uid: user.uid,
                        lastLogin: serverTimestamp(),
                        createdAt: user.metadata.createdAt,
                        createdOn: serverTimestamp(),
                        email: user.email
                    }

                    const q = ["uid", "==", user.uid]
                    const updated = await updateDoc('', q, userToSave, true, true);

                    setIsPending(!updated)

                } catch (err) {
                    setIsPending(false)
                    setError(err.message.replace("Firebase: ", "").replace("auth/", ""))
                }
            } else {
                setIsPending(false)
                setError("Invalid Mail Or Password")
            }


        }

    };

    const signInUserWithGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();

        if (isActive) {
            setIsPending(true)
            setError(null)

            try {

                const res = await signInWithPopup(fbAuth, googleProvider);
                const user = res.user;
                const userToSave = {
                    uid: user.uid,
                    lastLogin: serverTimestamp(),
                    createdAt: user.metadata.createdAt,
                    createdOn: serverTimestamp(),
                    email: user.email
                }

                const q = ["uid", "==", user.uid]
                const updated = await updateDoc('', q, userToSave, true, true);

                setIsPending(!updated)
            } catch (err) {
                if (err.message !== "Firebase: Error (auth/popup-closed-by-user).") {
                    setError(err.message.replace("Firebase: ", "").replace("auth/", ""))
                }
                setIsPending(false)
            }
        }


    };

    useEffect(() => {
        return () => setIsActive(true)
    }, [])


    return { error, isPending, clearErrors, signInMail, signInUserWithGoogle }
};