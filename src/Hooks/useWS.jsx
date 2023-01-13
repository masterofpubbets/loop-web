import { useEffect, useState } from "react";
import { firestore, serverTimestamp } from '../Firebase/FirebaseConfig';
import { collection, query, where, addDoc, getDocs, setDoc } from "firebase/firestore";
import { useUser } from "./useUser";
import { v4 as uuidv4 } from 'uuid';

export const useWS = (storeLength, collectionName, collectionTitle) => {
    const { user } = useUser();
    const [error, setError] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [successMes, setSuccessMes] = useState(null);
    const [success, setSuccess] = useState(false);



    const clearSuccess = () => {
        setSuccess(false)
    };

    const addWorkspace = async (data, maxFreeTire, uniqueField, uniqueValue, parent) => {

        if (isActive) {
            setError(null);
            setIsPending(true);
            if (uniqueValue === '') {
                setIsPending(false)
                setError(`${uniqueField} Name cannot be null`)
                return false
            }

            let newData = { ...data, uid: user.uid, id: uuidv4(), photoURL: null, createdAt: serverTimestamp() };
            if (parent !== undefined) newData = { ...newData, ...parent }

            try {
                //get user type
                const queryArray = ["uid", "==", user.uid];
                let q = query(collection(firestore, "users"), where(...queryArray));
                const { docs } = await getDocs(q);
                const userType = docs[0].data().userType
                if ((storeLength > maxFreeTire - 1) && (userType !== 'master')) {
                    setError(`In free tire you cannot create more than one ${collectionTitle}!`)
                    setIsPending(false)
                } else {
                    //add new document

                    //check the duplicated name
                    let queryArray2 = [uniqueField, "==", uniqueValue];
                    q = query(collection(firestore, collectionName), where(...queryArray), where(...queryArray2));
                    const { docs: wsDocs } = await getDocs(q);
                    if (wsDocs.length > 0) {
                        setError(`There is another ${collectionTitle} with the same name!`)
                        setIsPending(false)
                    } else {
                        //add to collection

                        await addDoc(collection(firestore, collectionName), newData);

                        //Update the other collections if this is default
                        if (data.isDefault) {
                            queryArray2 = [uniqueField, "!=", uniqueValue];
                            q = query(collection(firestore, collectionName), where(...queryArray), where(...queryArray2));
                            const { docs: otherDocs } = await getDocs(q);
                            if (otherDocs.length !== 0) {
                                otherDocs.map(async (doc) => {
                                    await setDoc(doc.ref, { isDefault: false }, { merge: true })
                                })
                            }
                        }

                        //update notifications
                        const nots = {
                            id: uuidv4(),
                            title: `New ${collectionTitle}`,
                            body: `${collectionTitle} (${uniqueValue}) has been added to your account.`,
                            type: "primary",
                            createdAt: serverTimestamp(),
                            uid: user.uid
                        }
                        await addDoc(collection(firestore, "notifications"), nots);
                        //


                        setIsPending(false)
                        setSuccessMes(`${collectionTitle} (${uniqueValue}) has been added`)
                        setSuccess(true)

                    }

                }

            } catch (err) {
                setIsPending(false)
                setError(err.message)
            }

        }
    };

    const updateWorkspace = async (data, uniqueField, uniqueValue, id) => {

        if (isActive) {
            setError(null);
            setIsPending(true);
            if (uniqueValue === '') {
                setIsPending(false)
                setError(`${uniqueField} Name cannot be null`)
                return false
            }

            const newData = { ...data, lastUpdated: serverTimestamp() };

            try {

                //check the duplicated name
                const queryArray = ['id', "!=", id];
                const queryArray3 = ["uid", "==", user.uid];
                let queryArray2 = [uniqueField, "==", uniqueValue];
                let q = query(collection(firestore, collectionName), where(...queryArray), where(...queryArray2), where(...queryArray3));
                const { docs: wsDocs } = await getDocs(q);
                if (wsDocs.length > 0) {
                    setError(`There is another ${collectionTitle} with the same name!`)
                    setIsPending(false)
                } else {

                    //Update the collections
                    queryArray2 = ['id', "==", id];
                    q = query(collection(firestore, collectionName), where(...queryArray2));
                    const { docs: otherDocs } = await getDocs(q);
                    if (otherDocs.length !== 0) {
                        otherDocs.map(async (doc) => {
                            await setDoc(doc.ref, newData, { merge: true })
                        })
                    }

                    //Update the other collections if this is default
                    if (data.isDefault) {
                        queryArray2 = [uniqueField, "!=", data.workspaceName];
                        q = query(collection(firestore, collectionName), where(...queryArray3), where(...queryArray2));
                        const { docs: otherDocs } = await getDocs(q);
                        if (otherDocs.length !== 0) {
                            otherDocs.map(async (doc) => {
                                await setDoc(doc.ref, { isDefault: false }, { merge: true })
                            })
                        }
                    }

                    //update notifications
                    const nots = {
                        id: uuidv4(),
                        title: `${collectionTitle} Updated`,
                        body: `In ${collectionTitle} item changed to (${uniqueValue}) has been added to your account.`,
                        type: "primary",
                        createdAt: serverTimestamp(),
                        uid: user.uid
                    }
                    await addDoc(collection(firestore, "notifications"), nots);
                    //


                    setIsPending(false)
                    setSuccessMes(`${collectionTitle} (${uniqueValue}) has been updated`)
                    setSuccess(true)

                }


            } catch (err) {
                setIsPending(false)
                setError(err.message)
            }

        }
    };


    useEffect(() => {
        setIsActive(true);
    }, []);


    return { error, addWorkspace, updateWorkspace, isPending, successMes, clearSuccess, success }
};
