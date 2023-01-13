import React, { useEffect, createContext, useReducer } from "react";
import { fbAuth, onAuthStateChanged } from '../Firebase/FirebaseConfig';

export const UserContext = createContext();

const types = {
    SETCURRENTUSER: 'SETCURRENTUSER',
    UNSETUSER: 'UNSETUSER',
    SETMAILNOTIFICATION: 'SETMAILNOTIFICATION',
    MODE: 'MODE',
    DISPLAYNAME: 'DISPLAYNAME',
    PHONE: 'PHONE',
    PHOTOURL: 'PHOTOURL',
    ROLE: 'ROLE',
    COMPANY: 'COMPANY',
    USERTYPE: 'USERTYPE',
    GETUSERS: 'GETUSERS'

}


const userReducer = (state, action) => {
    switch (action.type) {
        case types.SETCURRENTUSER:
            localStorage.removeItem('user')
            localStorage.setItem('user', JSON.stringify(action.payload));
            return { ...state, user: action.payload, userVersion: state.userVersion + 1 };
        case types.UNSETUSER:
            return { ...state, user: null }
        case types.SETMAILNOTIFICATION:
            return { ...state, user: { ...state.user, mailNotification: action.payload }, userVersion: state.userVersion + 1 }
        case types.DISPLAYNAME:
            return { ...state, user: { ...state.user, displayName: action.payload }, userVersion: state.userVersion + 1 }
        case types.PHONE:
            return { ...state, user: { ...state.user, phoneNumber: action.payload }, userVersion: state.userVersion + 1 }
        case types.COMPANY:
            return { ...state, user: { ...state.user, company: action.payload }, userVersion: state.userVersion + 1 }
        case types.ROLE:
            return { ...state, user: { ...state.user, role: action.payload }, userVersion: state.userVersion + 1 }
        case types.PHOTOURL:
            return { ...state, user: { ...state.user, photoURL: action.payload }, userVersion: state.userVersion + 1 }
        case types.MODE:
            return { ...state, user: { ...state.user, mode: action.payload }, userVersion: state.userVersion + 1 }
        case types.USERTYPE:
            return { ...state, user: { ...state.user, userType: action.payload }, userVersion: state.userVersion + 1 }
        default:
            return state
    }
};

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, { user: !localStorage.getItem('user') ? null : JSON.parse(localStorage.getItem('user')), users: [], userVersion: 0 });

    const setCurrentUser = (user) => {
        dispatch({ type: types.SETCURRENTUSER, payload: user })
    };

    const setMode = (mode) => {
        dispatch({ type: types.SETMAILNOTIFICATION, payload: mode })
    };

    const setMailNotifications = (mode) => {
        dispatch({ type: types.SETMAILNOTIFICATION, payload: mode })
    };

    const setDisplayName = (displayName) => {
        dispatch({ type: types.DISPLAYNAME, payload: displayName })
    };

    const setPhone = (phone) => {
        dispatch({ type: types.PHONE, payload: phone })
    };

    const setRole = (role) => {
        dispatch({ type: types.ROLE, payload: role })
    };

    const setCompany = (company) => {
        dispatch({ type: types.COMPANY, payload: company })
    };

    const setPhotoURL = (url) => {
        dispatch({ type: types.PHOTOURL, payload: url })
    };

    const setUserType = (userType) => {
        dispatch({ type: types.USERTYPE, payload: userType })
    };

    const unsetUser = () => {
        dispatch({ type: types.UNSETUSER })
    };

    useEffect(() => {
        onAuthStateChanged(fbAuth, (currentUser) => {
            if (currentUser) {
                const usr = {
                    uid: currentUser.uid,
                    id: currentUser.uid,
                    displayName: currentUser.displayName,
                    email: currentUser.email,
                    photoURL: currentUser.photoURL,
                    provider: currentUser.providerData[0].providerId,
                    accessToken: currentUser.accessToken,
                    userType: currentUser.userType,
                }
                dispatch({ type: types.SETCURRENTUSER, payload: usr })
            } else {
                dispatch({ type: types.UNSETUSER })
            }
        });
    }, [])

    return (
        <UserContext.Provider value={{ ...state, setCurrentUser, unsetUser, setMailNotifications, setMode, setDisplayName, setPhone, setRole, setCompany, setPhotoURL, setUserType }} >
            {children}
        </UserContext.Provider>
    )
};