import { useState, useEffect } from "react";
import { firestore } from '../../Firebase/FirebaseConfig';
import { doc, setDoc, collection, query, where, getDocs, addDoc, deleteDoc } from "firebase/firestore";

export const useDocuments = (collectionName) => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [data, setData] = useState(null);
    const [isActive, setIsActive] = useState(false);


    const addNewDoc = async (newData) => {
        if (isActive) {
            setError(null)
            setIsPending(true)
            try {
                await addDoc(collection(firestore, collectionName), newData);
                setIsPending(false)
            } catch (er) {
                setIsPending(false)
                setError(er.message)
            }
        }
    };


    const updateDoc = async (docName, queryArray, data, merge, addIfNotExists) => {
        if (isActive) {
            setError(null)
            setIsPending(true)
            try {
                if (queryArray === undefined) {
                    const docRef = doc(firestore, collectionName, docName);
                    setIsPending(false)
                    return await setDoc(docRef, data, { merge });
                } else {
                    const q = query(collection(firestore, collectionName), where(...queryArray));
                    const { docs } = await getDocs(q);
                    if ((docs.length === 0) && (addIfNotExists)) {
                        //add doc
                        await addDoc(collection(firestore, collectionName), data);
                        setIsPending(false)
                    } else if (docs.length !== 0) {
                        docs.map(async (doc) => {
                            setIsPending(false)
                            return await setDoc(doc.ref, data, { merge })
                        })
                    }
                }
            } catch (err) {
                setIsPending(false)
                setError(err.message)
            }
        }

    };

    const getDoc = async (docName, queryArray, data, merge) => {
        if (isActive) {
            setError(null)
            setIsPending(true)
            try {
                if (queryArray === undefined) {
                    const docRef = doc(firestore, collectionName, docName);
                    await setDoc(docRef, data, { merge });
                } else {
                    const q = query(collection(firestore, collectionName), where(...queryArray));
                    const { docs } = await getDocs(q);
                    setData(docs)
                    setIsPending(false)
                    return true;
                }
            } catch (err) {
                setIsPending(false)
                setError(err.message)
            }
        }

    };

    const delDoc = async (docName, queryArray) => {
        if (isActive) {
            setError(null)
            setIsPending(true)
            try {
                if (queryArray === undefined) {
                    const docRef = doc(firestore, collectionName, docName);
                    await deleteDoc(docRef);
                } else {
                    const q = query(collection(firestore, collectionName), where(...queryArray));
                    const { docs } = await getDocs(q);
                    docs.forEach(async (doc) => {
                        await deleteDoc(doc.ref)
                    })
                    setIsPending(false)
                    return true;
                }
            } catch (err) {
                setIsPending(false)
                setError(err.message)
            }
        }

    };

    const delDocByRef = async (ref) => {
        if (isActive) {
            setError(null)
            setIsPending(true)
            try {
                await deleteDoc(ref)
                setIsPending(false)
                return true;
            } catch (err) {
                setIsPending(false)
                setError(err.message)
            }
        }

    };

    useEffect(() => {
        setIsActive(true)
    }, [])


    return { isPending, error, updateDoc, data, getDoc, addNewDoc, delDoc, delDocByRef }

};