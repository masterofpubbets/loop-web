import { useState, useEffect } from 'react';
import { fbAuth } from '../Firebase/FirebaseConfig';
import { signOut } from "firebase/auth";
import { useUser } from './useUser';

export const useSignOut = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const { unsetUser } = useUser();

    const signOutUser = async () => {

        if (isActive) {
            setError(null)
            setIsPending(true)
            try {
                await signOut(fbAuth)
                await unsetUser()
                setIsPending(false)
                return true
            } catch (er) {
                setError(er.message)
                setIsPending(false)
            }
        }
    };

    useEffect(() => {
        setIsActive(true)
    }, []);

    return { error, isPending, signOutUser }

};