import { useContext, useState, useEffect } from "react";
import { NotificationsContext } from "../Context/NotificationsContext";
import { firestore, serverTimestamp } from '../Firebase/FirebaseConfig';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useDocuments } from "./Firebase/useDocuments";
import { useUser } from "./useUser";

export const useNotifications = () => {
    const [error, setError] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const { notifications, addNotification } = useContext(NotificationsContext);
    const {user} = useUser();
    const { addNewDoc, error: docError } = useDocuments("notifications");

    const uploadNotification = async (not) => {
        if (isActive) {
            try {
                await addNewDoc({...not, createdAt: serverTimestamp()})
                setError(docError)
            } catch (err) {
                setError(err.message)
            }
        }
    };

    useEffect(() => {
        if (user.uid) {
            
            const q = query(collection(firestore, "notifications"), where("uid", "==", user.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const notiArry = [];
                try {
                    setError(null)
                    querySnapshot.forEach((doc) => {
                        notiArry.push({
                            id: doc.data().id,
                            title: doc.data().title,
                            body: doc.data().body,
                            createdAt: doc.data().createdAt,
                            type: doc.data().type,
                            ref: doc.ref
                        });
                    });
                    const notSorted = notiArry.sort((a, b) => b.createdAt - a.createdAt)
                    addNotification({ notifications: notSorted, count: notiArry.length })
    
                } catch (er) {
                    setError(er.message)
                }
            });
    
    
            return () => unsubscribe();
            
        }

    }, [user.uid])

    useEffect(() => {
        setIsActive(true)
    }, []);


    return { error, notifications, uploadNotification }
}