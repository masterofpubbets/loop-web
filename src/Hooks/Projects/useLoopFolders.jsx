import { useContext, useEffect, useState } from "react";
import { LoopFolderContext } from "../../Context/Projects/LoopFolderContext";
import { firestore } from '../../Firebase/FirebaseConfig';
import { collection, query, onSnapshot, where } from "firebase/firestore";

export const useLoopFolder = (appUUID, tag) => {
    const { folders, foldersVersion, loadFolder } = useContext(LoopFolderContext);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (appUUID !== undefined) {
            const collectionName = `lf-${appUUID}`
            let q = '';
            if (tag !== undefined) {
                 q = query(collection(firestore, collectionName), where("loopName", "==", tag));
            } else {
                q = query(collection(firestore, collectionName));
            }
            const unsubscribe = onSnapshot(q, async (querySnapshot) => {
                let dataArray = [];
                try {
                    setError(null)
                    querySnapshot.forEach((doc) => {
                        dataArray.push({
                            id: doc.data().id,
                            hasBlockage: doc.data().hasBlockage,
                            area: doc.data().area,
                            loopName: doc.data().loopName,
                            description: doc.data().description,
                            type: doc.data().type,
                            subType: doc.data().subType,
                            subsystem: doc.data().subsystem,
                            subcontractor: doc.data().subcontractor,
                            vendor: doc.data().vendor,
                            folderStatus: doc.data().folderStatus,
                        });
                    });
                    loadFolder(dataArray)
                    console.log(dataArray)
                } catch (er) {
                    setError(er.message)
                }
            });


            return () => unsubscribe();
        }


    }, [appUUID]);


    return { folders, foldersVersion, error }
};