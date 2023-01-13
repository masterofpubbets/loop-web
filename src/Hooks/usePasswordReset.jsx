import { useState, useEffect } from "react";
import { fbAuth, serverTimestamp } from "../Firebase/FirebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { useDocuments } from "./Firebase/useDocuments";
import { v4 as uuidv4 } from 'uuid';

export const usePasswordReset = (email) => {
    const [isActive, setIsActive] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [mailSend, setMailSend] = useState(false);
    const [error, setError] = useState(null);
    const { data: userData, getDoc } = useDocuments('users');
    const { addNewDoc } = useDocuments('notifications');

    const resetMail = async () => {
        if (isActive) {
            setIsPending(true);

            if (email === '') {
                setError('Email is Empty')
                setIsPending(false)
                return
            };

            try {
                await sendPasswordResetEmail(fbAuth, email);
                await getDoc(null, ['email', '==', email])
                setIsPending(false);
                setMailSend(true)
            } catch (err) {
                setIsPending(false);
                setError(
                    err.message.replace("Firebase: ", "").replace("auth/", "")
                );
            }
        }
    };

    useEffect(() => {
        return () => setIsActive(true);
    }, []);

    useEffect(() => {
        setMailSend(false);
        setError(null)
        setIsPending(false)
    }, [email]);

    useEffect(() => {
        async function addNotifications() {
            if (userData !== null) {
                if (userData.length > 0) {
                    await addNewDoc({
                        body: 'Your password has been reset.',
                        title: 'Security',
                        id: uuidv4(),
                        uid: userData[0].data().uid,
                        type: "warning",
                        createdAt: serverTimestamp()
                    })
                }
            }
        }

        addNotifications()
        
    }, [userData]);

    return { resetMail, isPending, mailSend, error };
};
