import { useState, useEffect } from "react";
import { firestore } from '../../Firebase/FirebaseConfig';
import { collection, query, where, getDocs, deleteDoc } from "firebase/firestore";


export const useDelete = () => {
    const [isActive, setIsActive] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [deleteError, setDeleteError] = useState(null);
    const [triggerName, setTriggerName] = useState(null);


    const activateIsPending = (tgName, status) => {
        if (triggerName !== null) {
            if (triggerName === tgName) {
                setIsPending(status);
                if (!status) {
                    setTriggerName(null)
                }
            }

        } else {
            setTriggerName(tgName);
            setIsPending(status);

        }
    };


    const deleteContact = async (queryArray) => {
        if (isActive) {
            activateIsPending('contacts', true);
            setDeleteError(null);

            try {
                //delete the collections
                //const queryArray = ['id', "==", id];
                const q = query(collection(firestore, 'contacts'), where(...queryArray));
                const { docs } = await getDocs(q);
                if (docs.length !== 0) {
                    docs.map(async (doc) => {
                        await deleteDoc(doc.ref)
                    })
                }

                activateIsPending('contacts', false)
                return (true)
            } catch (err) {
                activateIsPending('contacts', false)
                setDeleteError(err.message)
            }

        }
    };

    const deleteWorkspace = async (queryArray) => {
        if (isActive) {
            activateIsPending('workspace', true);
            setDeleteError(null);

            try {
                //delete the collections
                const q = query(collection(firestore, 'workspaces'), where(...queryArray), where('isDefault', '==', false));
                const { docs } = await getDocs(q);
                if (docs.length !== 0) {
                    docs.map(async (doc) => {
                        await deleteContact(['wsId', "==", doc._document.data.value.mapValue.fields.id.stringValue])
                        await deleteProduct(['wsId', "==", doc._document.data.value.mapValue.fields.id.stringValue])
                        await deleteDoc(doc.ref)
                    })
                }

                activateIsPending('workspace', false)
                return (true)
            } catch (err) {
                activateIsPending('workspace', false)
                setDeleteError(err.message)
            }

        }
    };

    const deleteProduct = async (queryArray) => {
        if (isActive) {
            activateIsPending('products', true);
            setDeleteError(null);

            try {
                //delete the collections
                //const queryArray = ['id', "==", id];
                const q = query(collection(firestore, 'products'), where(...queryArray));
                const { docs } = await getDocs(q);
                if (docs.length !== 0) {
                    docs.map(async (doc) => {
                        await deleteDoc(doc.ref)
                    })
                }

                activateIsPending('products', false)
                return (true)
            } catch (err) {
                activateIsPending('products', false)
                setDeleteError(err.message)
            }

        }
    };

    useEffect(() => {
        setIsActive(true);
    }, []);

    const deleteSharedUser = async (queryArray, queryArray2) => {
        if (isActive) {
            activateIsPending('ws-users', true);
            setDeleteError(null);

            try {
                //delete the collections
                //const queryArray = ['id', "==", id];
                const q = query(collection(firestore, 'ws-users'), where(...queryArray), where(...queryArray2));
                const { docs } = await getDocs(q);
                if (docs.length !== 0) {
                    docs.map(async (doc) => {
                        await deleteDoc(doc.ref)
                    })
                }

                activateIsPending('ws-users', false)
                return (true)
            } catch (err) {
                activateIsPending('ws-users', false)
                setDeleteError(err.message)
            }

        }
    };

    useEffect(() => {
        setIsActive(true);
    }, []);


    return { isPending, deleteContact, deleteError, activateIsPending, deleteWorkspace, deleteProduct, deleteSharedUser }
};