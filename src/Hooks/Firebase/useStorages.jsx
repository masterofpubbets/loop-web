import { useState, useEffect } from 'react';
import { fbAuth, storage } from '../Firebase/FirebaseConfig';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";


export const useStorages = () => {
    const [isPending, setIsPending] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(null);

    const uploadFile = async (file, fileRef) => {
        if (isActive) {
            setProgress(0)
            setError(null)
            setIsPending(true)
            try {
                if (file.size > 250000) {
                    setIsPending(false)
                    setError("Uploaded file must be less than 150 kb")
                }
                else {
                    const storageRef = ref(storage, fileRef);
                    const uploadTask = uploadBytesResumable(storageRef, file);

                    uploadTask.on("state_changed",
                        (snapshot) => {
                            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                            setProgress(progress);
                        },
                        (error) => {
                            setProgress(null)
                            setIsPending(false)
                            setError(error.message.replace("Firebase Storage: ", "").replace("auth/", ""))
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                return(downloadURL)
                            });
                        }
                    );
                }
            } catch (er) {
                setProgress(null)
                setIsPending(false)
                setError(er.message.replace("Firebase: ", "").replace("auth/", ""))
            }
        }

    };


    useEffect(() => {
        setIsActive(true);
    })

    return {error, isPending, uploadFile, progress}
}