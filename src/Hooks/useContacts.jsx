import { useContext, useEffect, useState } from "react";
import { ContactsContext } from "../Context/ContactsContext";
import { firestore } from '../Firebase/FirebaseConfig';
import { collection, query, where, onSnapshot } from "firebase/firestore";

export const useContacts = (wsId) => {
    const { contacts, getContacts, dataVersion: contactsVersion } = useContext(ContactsContext);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (wsId !== undefined) {
            const q = query(collection(firestore, "contacts"), where("wsId", "==", wsId));
            const unsubscribe = onSnapshot(q, async (querySnapshot) => {
                let dataArray = [];
                try {
                    setError(null)
                    querySnapshot.forEach((doc) => {
                        dataArray.push({
                            id: doc.data().id,
                            contactName: doc.data().contactName,
                            address: doc.data().address,
                            photoURL: doc.data().photoURL,
                            phone: doc.data().phone,
                            mobile: doc.data().mobile,
                            email: doc.data().email,
                            createdAt: doc.data().createdAt,
                            lastUpdated: doc.data().lastUpdated,
                            workGroup: doc.data().workGroup,
                            job: doc.data().job,
                            companyName: doc.data().companyName,
                        });
                    });
                    getContacts(dataArray)
                } catch (er) {
                    setError(er.message)
                }
            });


            return () => unsubscribe();
        }


    }, [wsId]);


    return { contacts, error, contactsVersion }
};