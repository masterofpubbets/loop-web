import { useContext, useEffect, useState } from "react";
import { PBIsContext } from "../../Context/Products/PBIsContext";
import { firestore } from '../../Firebase/FirebaseConfig';
import { collection, query, where, onSnapshot } from "firebase/firestore";

export const usePBI = (proId) => {
    const { pbi, getPBI, dataVersion: pbiVersion } = useContext(PBIsContext);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (proId !== undefined) {
            const q = query(collection(firestore, "productsBacklogs"), where("proId", "==", proId));
            const unsubscribe = onSnapshot(q, async (querySnapshot) => {
                let dataArray = [];
                try {
                    setError(null)
                    querySnapshot.forEach((doc) => {
                        dataArray.push({
                            id: doc.data().id,
                            itemName: doc.data().itemName,
                            dependencies: doc.data().dependencies,
                            description: doc.data().description,
                            diagrams: doc.data().diagrams,
                            hasRemainder: doc.data().hasRemainder,
                            statusId: doc.data().statusId,
                            team: doc.data().team,
                            startedDate: doc.data().startedDate,
                            isFav: doc.data().isFav,
                            itemType: doc.data().itemType,
                            priorityId: doc.data().priorityId,
                            proId: doc.data().proId,
                            progress: doc.data().progress,
                            relatedParent: doc.data().relatedParent,
                            remainder: doc.data().remainder,
                            story: doc.data().story,
                            storyPoint: doc.data().storyPoint,
                            createdAt: doc.data().createdAt,
                            lastUpdated: doc.data().lastUpdated,
                            storyTasks: doc.data().storyTasks,
                            tag: doc.data().tag,
                            sprint: doc.data().sprint
                            
                        });
                    });
                    getPBI(dataArray)
                } catch (er) {
                    setError(er.message)
                }
            });


            return () => unsubscribe();
        }


    }, [proId]);


    return { pbi, error, getPBI, pbiVersion }
};