import { useState, useEffect, useContext } from 'react';
import { firestore, serverTimestamp } from '../Firebase/FirebaseConfig';
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { WsContext } from '../Context/WSContext';


export const useImportContacts = () => {
    const [isActive, setIsActive] = useState(false);
    const [ispending, setIsPending] = useState(false);
    const [finished, setFinished] = useState(false);
    const [error, setError] = useState(null);
    const [percentage, setPercentage] = useState(0);
    const { currentWorkspace } = useContext(WsContext);



    const importContacts = async (data) => {
        if (isActive && (data.length !== 0)) {
            try {
                setIsPending(true)
                setFinished(false)
                let inx = 0;
                let contactsTemp = [];

                data.forEach(async contact => {

                    // save to firestore here


                    // check if the contact exists
                    const queryArray = ['wsId', "==", currentWorkspace.id];
                    const queryArray2 = ['contactName', "==", (contact.NAME === '') ? 'No Name' : contact.NAME];
                    const q = query(collection(firestore, 'contacts'), where(...queryArray), where(...queryArray2));
                    const { docs: conDocs } = await getDocs(q);
                    if (conDocs.length === 0) {
                        // add new contact
                        const newContacts = {
                            id: uuidv4(),
                            contactName: (contact.NAME.replace('\r', '') === '') ? 'No Name' : contact.NAME,
                            companyName: (contact.COMPANY.replace('\r', '') === '') ? 'No Company' : contact.COMPANY,
                            address: (contact.ADDRESS === undefined) ? '' : contact.ADDRESS,
                            phone: (contact.PHONE === undefined) ? null : contact.PHONE,
                            mobile: (contact.MOBILE === undefined) ? null : contact.MOBILE,
                            email: (contact.EMAIL === undefined) ? null : contact.EMAIL,
                            job: (contact.JOB === undefined) ? null : contact.JOB,
                            workGroup: (contact.WORKGROUP === undefined) ? null : contact.WORKGROUP,
                            photoURL: (contact.PHOTO === undefined) ? null : contact.PHOTO.replace('\r', ''),
                            wsId: currentWorkspace.id,
                            createdAt: serverTimestamp(),
                        }
                        const contactTemp = contactsTemp.filter(c => c.contactName === newContacts.contactName)
                        if (contactTemp.length === 0) {
                            contactsTemp.push(newContacts)
                            await addDoc(collection(firestore, 'contacts'), newContacts);
                        }

                    }
                    //
                    inx = inx + 1;
                    setPercentage(Math.round(inx * 100 / data.length))
                })

                setFinished(true)
                //setPercentage(100)

            } catch (err) {
                setError(err.message)
                setIsPending(true)
                setFinished(false)
                setPercentage(100)
            }
        }
    };

    useEffect(() => {
        setIsActive(true)
    }, []);


    return { ispending, importContacts, error, percentage, finished }
}