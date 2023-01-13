import { useState, useEffect, useContext } from 'react';
import { firestore, serverTimestamp } from '../../Firebase/FirebaseConfig';
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";



export const useImportLoops = (appUUID) => {
    const [isActive, setIsActive] = useState(false);
    const [ispending, setIsPending] = useState(false);
    const [finished, setFinished] = useState(false);
    const [error, setError] = useState(null);
    const [percentage, setPercentage] = useState(0);



    const importLoops = async (data) => {
        if (isActive && (data.length !== 0)) {
            try {
                setIsPending(true)
                setFinished(false)
                let inx = 0;
                let contactsTemp = [];

                data.forEach(contact => {

                    // save to firestore here


                    // add new Loop
                    const newContacts = {
                        id: contact.id,
                        hasBlockage: (contact.hasBlockage === '') ? 'No' : contact.hasBlockage,
                        area: (contact.area === '') ? 'No Area' : contact.area,
                        loopName: (contact.loopName === undefined) ? '' : contact.loopName,
                        description: (contact.description === undefined) ? null : contact.description,
                        type: (contact.type === undefined) ? null : contact.type,
                        subType: (contact.subType === undefined) ? null : contact.subType,
                        subsystem: (contact.subsystem === undefined) ? null : contact.subsystem,
                        subcontractor: (contact.subcontractor === undefined) ? null : contact.subcontractor,
                        vendor: (contact.vendor === undefined) ? null : contact.vendor,
                        folderStatus: (contact.folderStatus === undefined) ? null : contact.folderStatus,
                        createdAt: serverTimestamp(),
                    }
                    const contactTemp = contactsTemp.filter(c => c.loopName === newContacts.loopName)
                    if (contactTemp.length === 0) {
                        contactsTemp.push(newContacts)
                        addDoc(collection(firestore, `lf-${appUUID}`), newContacts).then(() => {
                            inx = inx + 1;
                            setPercentage(Math.round(inx * 100 / data.length))
                        })
                    }

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


    return { ispending, importLoops, error, percentage, finished }
}