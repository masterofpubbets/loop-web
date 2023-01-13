import { useContext, useState, useEffect } from "react";
import { firestore, serverTimestamp } from '../Firebase/FirebaseConfig';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useUser } from "./useUser";
import { OtherUsersContext } from "../Context/OtherUsersContext";

export const useOtherUsers = (wsId) => {
    const [error, setError] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const {user} = useUser();
    const { users, loadUsers, loadSharedUsers, sharedUsers, sharedUsersVersion, usersVersion } = useContext(OtherUsersContext);


    useEffect(() => {
        if (user.uid) {
            const q = query(collection(firestore, "users"), where("uid", "!=", user.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const notiArry = [];
                try {
                    setError(null)
                    querySnapshot.forEach((doc) => {
                        notiArry.push({
                            displayName: doc.data().displayName,
                            email: doc.data().email,
                            photoURL: doc.data().photoURL,
                            uid: doc.data().uid,
                            id: doc.data().uid,
                        });
                    });
                    const notSorted = notiArry.sort((a, b) => a.displayName - b.displayName)
                    loadUsers(notSorted)
    
                } catch (er) {
                    setError(er.message)
                }
            });
    
    
            return () => unsubscribe();
            
        }

    }, [user.uid])

    useEffect(() => {
        setIsActive(true)
    }, [user.uid]);

    useEffect(() => {
        if (wsId) {
            const q = query(collection(firestore, "ws-users"), where("wsId", "==", wsId));
            const unsubscribe = onSnapshot(q, async (querySnapshot) => {
                let wsUserArray = [];
                try {
                    setError(null)
                    querySnapshot.forEach((doc) => {
                        wsUserArray.push({
                            id: doc.data().id,
                            uid: doc.data().uid,
                            wsId: doc.data().wsId,
                            photoURL: (doc.data().photoURL === undefined) ? null : doc.data().photoURL
                        });
                    });
                    if (wsUserArray.length > 0) {
                        // Load shared users
                        loadSharedUsers(wsUserArray)
                    } else {
                        loadSharedUsers([])
                    }
                } catch (er) {
                    setError(er.message)
                }
            });


            return () => unsubscribe();
        }

    }, [wsId]);

    useEffect(() => {
        setIsActive(true)
    }, []);

    return { users, sharedUsers, sharedUsersVersion, error, usersVersion }
}