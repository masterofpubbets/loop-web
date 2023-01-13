import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Context/ProductsContext";
import { firestore } from '../Firebase/FirebaseConfig';
import { collection, query, where, onSnapshot } from "firebase/firestore";

export const useProducts = (wsId) => {
    const { products, getProducts, dataVersion: productVersion } = useContext(ProductContext);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (wsId !== undefined) {
            const q = query(collection(firestore, "products"), where("wsId", "==", wsId));
            const unsubscribe = onSnapshot(q, async (querySnapshot) => {
                let dataArray = [];
                try {
                    setError(null)
                    querySnapshot.forEach((doc) => {
                        dataArray.push({
                            id: doc.data().id,
                            productName: doc.data().productName,
                            vision: doc.data().vision,
                            photoURL: doc.data().photoURL,
                            mission: doc.data().mission,
                            isFav: doc.data().isFav,
                            organization: doc.data().organization,
                            createdAt: doc.data().createdAt,
                            lastUpdated: doc.data().lastUpdated,
                            estInvestment: doc.data().estInvestment,
                            productType: doc.data().productType,
                            description: doc.data().description,
                        });
                    });
                    getProducts(dataArray)
                } catch (er) {
                    setError(er.message)
                }
            });


            return () => unsubscribe();
        }


    }, [wsId]);


    return { products, error, productVersion }
};