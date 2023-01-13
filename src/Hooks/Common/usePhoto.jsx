import { useState, useEffect } from "react";
import { storage } from '../../Firebase/FirebaseConfig';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useDocuments } from '../Firebase/useDocuments';
import { useUser } from "../useUser";


export const usePhoto = (collectionName, parentId, parentIdField) => {
    const [photoError, setPhotoError] = useState(null);
    const [photoProgresspercent, setPhotoProgresspercent] = useState(null);
    const [isPhotoPending, setIsPhotoPending] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const { updateDoc } = useDocuments(collectionName);
    const { user } = useUser();
    const [successPhotoMes, setSuccessPhotoMes] = useState(null);
    const [successPhoto, setSuccessPhoto] = useState(false);
    const [uploadedURL, setUploadedURL] = useState(null);


    const clearPhotoMessage = () => {
        if (isActive) {
            setPhotoProgresspercent(0)
            setPhotoError(null)
            setIsPhotoPending(true)
            setUploadedURL(null)
        }
    };


    const updateLogo = async (photo, folderName, id, maxSize) => {

        if (isActive) {
            setPhotoProgresspercent(0)
            setPhotoError(null)
            setIsPhotoPending(true)
            setUploadedURL(null)
            try {
                if (photo.size > maxSize) {
                    setIsPhotoPending(false)
                    setPhotoError(`Photo must be less than ${maxSize / 1000} kb`)
                } else if (!photo.type.includes("image/")) {
                    setIsPhotoPending(false)
                    setPhotoError("Select an image type")
                }
                else {
                    const storageRef = ref(storage, `${folderName}/${user.uid}/${id}.jpg`);
                    const uploadTask = uploadBytesResumable(storageRef, photo);

                    uploadTask.on("state_changed",
                        (snapshot) => {
                            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                            setPhotoProgresspercent(progress);
                        },
                        (error) => {
                            setPhotoProgresspercent(null)
                            setIsPhotoPending(false)
                            setPhotoError(error.message.replace("Firebase Storage: ", "").replace("auth/", ""))
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                                // old
                                updateDoc(null, [parentIdField, '==', parentId], { photoURL: downloadURL }, true, false).then(() => {
                                    setSuccessPhoto(true)
                                    setSuccessPhotoMes("Photo has been updated")
                                    setIsPhotoPending(false)
                                    setPhotoProgresspercent(null)
                                    setUploadedURL(downloadURL)
                                })
                                    .catch((er) => {
                                        setPhotoProgresspercent(null)
                                        setIsPhotoPending(false)
                                        setPhotoError(er.message.replace("Firebase: ", "").replace("auth/", ""))
                                    })
                                ///

                            });
                        }
                    );
                }
            } catch (er) {
                setPhotoProgresspercent(null)
                setIsPhotoPending(false)
                setPhotoError(er.message.replace("Firebase: ", "").replace("auth/", ""))
            }
        }

    };


    useEffect(() => {
        setIsActive(true)
    }, []);


    return { updateLogo, photoError, photoProgresspercent, isPhotoPending, successPhotoMes, successPhoto, uploadedURL, clearPhotoMessage }
};