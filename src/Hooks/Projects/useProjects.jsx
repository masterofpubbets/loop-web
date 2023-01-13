import { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../../Context/Projects/ProjectsContext";
import { firestore } from '../../Firebase/FirebaseConfig';
import { collection, query, where, onSnapshot } from "firebase/firestore";

export const useProjects = (wsId) => {
    const { projects, addProject, projectVersion } = useContext(ProjectContext);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        if (wsId !== undefined) {
            const q = query(collection(firestore, "projects"), where("wsId", "==", wsId));
            const unsubscribe = onSnapshot(q, async (querySnapshot) => {
                let dataArray = [];
                try {
                    setError(null)
                    querySnapshot.forEach((doc) => {
                        dataArray.push({
                            id: doc.data().id,
                            projectName: doc.data().projectName,
                            client: doc.data().client,
                            photoURL: (doc.data().photoURL === undefined) ? null : doc.data().photoURL,
                            location: doc.data().location,
                            proNo: doc.data().proNo,
                            createdAt: doc.data().createdAt,
                            lastUpdated: doc.data().lastUpdated,
                            description: doc.data().description,
                            appUUID: doc.data().appUUID,
                        });
                    });
                    addProject(dataArray)
                } catch (er) {
                    setError(er.message)
                }
            });


            return () => unsubscribe();
        }


    }, [wsId]);

    return { projects, error, projectVersion }
};