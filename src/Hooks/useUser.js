import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../Context/UserContext';
import { fbAuth, firestore, serverTimestamp, storage } from '../Firebase/FirebaseConfig';
import { updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { collection, query, where, onSnapshot, getDocs } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useDocuments } from './Firebase/useDocuments';
import { useTheme } from './useTheme';
import { WsContext } from '../Context/WSContext';
import { ProjectContext } from '../Context/Projects/ProjectsContext';
import { v4 as uuid } from 'uuid';

export const useUser = () => {
    const context = useContext(UserContext);
    const wsContext = useContext(WsContext);
    const { addProject } = useContext(ProjectContext);
    const [isActive, setIsActive] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [isPhotoPending, setIsPhotoPending] = useState(false);
    const [error, setError] = useState(null);
    const [photoError, setPhotoError] = useState(null);
    const [photoProgresspercent, setPhotoProgresspercent] = useState(null);
    const [passError, setPassError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [successMes, setSuccessMes] = useState(null);
    const { updateDoc } = useDocuments("users");
    const { setMode } = useTheme();
    const { addNewDoc: addNotifications } = useDocuments("notifications");


    if (context === undefined) {
        throw new Error("useUser() must be used inside a ThemeProvider")
    };

    const clearSuccess = () => {
        setSuccess(false);
    };

    const updateUser = async (info) => {
        if (isActive) {
            if (info.displayName === '') {
                setError('Display Name is empty')
            } else {
                setError(null)
                setIsPending(true)
                try {
                    await updateProfile(fbAuth.currentUser, { displayName: info.displayName })
                    await updateDoc(null, ['uid', '==', context.user.uid], info, true, false)
                    const not = {
                        body: "Basic information has been changed.",
                        id: uuid(),
                        title: "Security Warning",
                        type: "warning",
                        uid: context.user.uid,
                        createdAt: serverTimestamp()
                    }
                    await addNotifications(not)
                    setSuccess(true)
                    setSuccessMes('Information has been changed.')
                    setIsPending(false)
                } catch (er) {
                    setIsPending(false)
                    setError(er.message.replace("Firebase: ", "").replace("auth/", ""))
                }
            }
        }

    };

    const updateProfilePhoto = async (photo) => {
        if (isActive) {
            setPhotoProgresspercent(0)
            setPhotoError(null)
            setIsPhotoPending(true)
            try {
                if (photo.size > 250000) {
                    setIsPhotoPending(false)
                    setPhotoError("Profile's photo must be less than 150 kb")
                } else if (!photo.type.includes("image/")) {
                    setIsPhotoPending(false)
                    setPhotoError("Select an image type")
                }
                else {
                    const storageRef = ref(storage, `profiles/${context.user.uid}/primary.jpg`);
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
                                updateProfile(fbAuth.currentUser, { photoURL: downloadURL }).then(() => {
                                    updateDoc(null, ['uid', '==', context.user.uid], { photoURL: downloadURL }, true, false).then(() => {
                                        setSuccess(true)
                                        setSuccessMes("Profile's photo has been updated")
                                        setIsPhotoPending(false)
                                        setPhotoProgresspercent(null)
                                    })
                                })
                                    .catch((er) => {
                                        setPhotoProgresspercent(null)
                                        setIsPhotoPending(false)
                                        setPhotoError(er.message.replace("Firebase: ", "").replace("auth/", ""))
                                    })
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

    const updateMailNotification = async (notify) => {
        if (isActive) {
            setError(null)
            setIsPending(true)
            try {
                await updateDoc(null, ['uid', '==', context.user.uid], { mailNotification: notify }, true, false)
                setSuccess(true)
                setSuccessMes(notify ? 'Mail Notifications Enabled' : 'Mail Notifications Disabled')
                setIsPending(false)
            } catch (er) {
                setIsPending(false)
                setError(er.message.replace("Firebase: ", "").replace("auth/", ""))
            }
        }

    };

    const updateUserPassword = async (oldPass, conPass, newPass) => {
        if (isActive) {
            if (conPass !== newPass) {
                setPassError('Password is not matching!')
            } else if (oldPass === newPass) {
                setPassError('Old Password and New one are the same!')
            }
            else {
                setPassError(null)
                setIsPending(true)
                try {
                    const user = fbAuth.currentUser;
                    const credential = EmailAuthProvider.credential(
                        context.user.email,
                        oldPass
                    );

                    await reauthenticateWithCredential(user, credential)
                    await updatePassword(user, newPass)
                    const not = {
                        body: "Password has been changed.",
                        id: uuid(),
                        title: "Security Warning",
                        type: "warning",
                        uid: context.user.uid,
                        createdAt: serverTimestamp()
                    }
                    await addNotifications(not)
                    setSuccess(true)
                    setSuccessMes('Password has been changed.')
                    setIsPending(false)

                } catch (er) {
                    setIsPending(false)
                    setPassError(er.message.replace("Firebase: ", "").replace("auth/", ""))
                }
            }
        }
    };

    const updateUserMode = async (mode) => {
        if (isActive) {
            setError(null)
            setIsPending(true)
            try {
                await updateDoc(null, ['uid', '==', context.user.uid], { uid: context.user.uid, mode }, true, false)
                setIsPending(false)
            } catch (er) {
                setIsPending(false)
                setError(er.message)
            }
        }

    };

    useEffect(() => {
        if (context.user) {
            const q = query(collection(firestore, "users"), where("uid", "==", context.user.uid));
            const unsubscribe = onSnapshot(q, async (querySnapshot) => {
                let usersArray = [];
                try {
                    setError(null)
                    querySnapshot.forEach((doc) => {
                        usersArray.push({
                            uid: doc.data().uid,
                            id: doc.data().uid,
                            mode: (doc.data().mode === undefined) ? 'light' : doc.data().mode,
                            mailNotification: doc.data().mailNotification,
                            phoneNumber: doc.data().phoneNumber,
                            displayName: (doc.data().displayName === undefined) ? fbAuth.currentUser.displayName : doc.data().displayName,
                            company: doc.data().company,
                            role: doc.data().role,
                            photoURL: (doc.data().photoURL === undefined) ? fbAuth.currentUser.photoURL : doc.data().photoURL,
                            userType: (doc.data().userType === undefined) ? 'user' : doc.data().userType
                        });
                    });
                    if (usersArray.length > 0) {
                        await context.setDisplayName(usersArray[0].displayName)
                        await context.setPhone(usersArray[0].phoneNumber)
                        await context.setMailNotifications(usersArray[0].mailNotification)
                        await context.setRole(usersArray[0].role)
                        await context.setCompany(usersArray[0].company)
                        await context.setPhotoURL(usersArray[0].photoURL)
                        await context.setUserType(usersArray[0].userType)
                        await setMode(usersArray[0].mode)
                    }
                } catch (er) {
                    setError(er.message)
                }
            });


            return () => unsubscribe();
        }

    }, [])

    useEffect(() => {
        if (context.user) {
            
            if (context.user.userType === 'master') {
                const q = query(collection(firestore, "workspaces"), where("uid", "==", context.user.uid));
                const unsubscribe = onSnapshot(q, async (querySnapshot) => {
                    let wsArray = [];
                    try {
                        setError(null)
                        querySnapshot.forEach((doc) => {
                            wsArray.push({
                                id: doc.data().id,
                                workspaceName: doc.data().workspaceName,
                                isDefault: doc.data().isDefault,
                                photoURL: doc.data().photoURL,
                                description: doc.data().description,
                                createdAt: doc.data().createdAt,
                                lastUpdated: doc.data().lastUpdated
                            });
                        });
                        if (wsArray.length > 0) {
                            wsContext.addWorkspace(wsArray)
                            if (wsArray.length === 1) {
                                wsContext.setCurrentWorkspace(wsArray[0])
                            } else {
                                const defaultWs = wsArray.filter(a => a.isDefault === true)
                                wsContext.setCurrentWorkspace(defaultWs[0])
                            }
                        } else {
                            wsContext.addWorkspace([])
                            wsContext.setCurrentWorkspace(null)
                        }
                    } catch (er) {
                        setError(er.message)
                    }
                });


                return () => unsubscribe();
            }
        }

    }, [context.userVersion]);

    useEffect(() => {
        if (context.user) {
            
            if (context.user.userType === 'free') {
                const q = query(collection(firestore, "ws-users"), where("uid", "==", context.user.uid));
                const unsubscribe = onSnapshot(q, async (querySnapshot) => {
                    let wsArray = [];
                    try {
                        setError(null)
                        querySnapshot.forEach((WSUserDoc) => {
                            const q2 = query(collection(firestore, "workspaces"), where("id", "==", WSUserDoc.data().wsId));
                            getDocs(q2).then(querySnapshot => {
                                querySnapshot.forEach((doc) => {
                                    wsArray.push({
                                        id: doc.data().id,
                                        workspaceName: doc.data().workspaceName,
                                        isDefault: doc.data().isDefault,
                                        photoURL: doc.data().photoURL,
                                        description: doc.data().description,
                                        createdAt: doc.data().createdAt,
                                        lastUpdated: doc.data().lastUpdated
                                    });
                                })

                                if (wsArray.length > 0) {

                                    wsContext.addWorkspace(wsArray)
                                    if (wsArray.length === 1) {
                                        wsContext.setCurrentWorkspace(wsArray[0])
                                    } else {
                                        const defaultWs = wsArray.filter(a => a.isDefault === true)
                                        wsContext.setCurrentWorkspace(defaultWs[0])
                                    }
                                } else {
                                    wsContext.addWorkspace([])
                                    wsContext.setCurrentWorkspace(null)
                                }


                            })
                        });


                    } catch (er) {
                        setError(er.message)
                    }
                });


                return () => unsubscribe();
            }
        }
    }, [context.userVersion]);


    useEffect(() => {
        setIsActive(true)
    }, []);



    return {
        ...context,
        isPending, updateUser, error, passError, updateUserMode,
        updateUserPassword, success, successMes, clearSuccess, updateMailNotification,
        updateProfilePhoto, photoError, isPhotoPending, photoProgresspercent
    }
};