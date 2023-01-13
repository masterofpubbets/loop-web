import React, { createContext, useReducer } from "react";

export const OtherUsersContext = createContext();

const types = {
    GETUSERS: 'GETUSERS',
    GETSHAREDUSERS: 'GETSHAREDUSERS'
};

const usersReducer = (state, action) => {
    switch (action.type) {
        case types.GETUSERS:
            return { ...state, users: action.payload, usersVersion: state.usersVersion + 1 };
        case types.GETSHAREDUSERS:

            const sharedUsers = state.users.filter((n) => {
                for(var i=0; i < action.payload.length; i++){
                  if(n.uid === action.payload[i].uid){
                    return true;
                  }
                }
                return false;
            });

            return {...state, sharedUsers: sharedUsers, sharedUsersVersion: state.sharedUsersVersion + 1}
        default:
            return state;
    }
};

export const OtherUsersProvider = ({ children }) => {
    const [state, dispatch] = useReducer(usersReducer, { users: [], usersVersion: 0, sharedUsers: [], sharedUsersVersion: 0 })

    const loadUsers = (users) => {
        dispatch({ type: types.GETUSERS, payload: users })
    };

    const loadSharedUsers = (users) => {
        dispatch({ type: types.GETSHAREDUSERS, payload: users })
    };

    return (
        <OtherUsersContext.Provider value={{ ...state, loadUsers, loadSharedUsers }}>
            {children}
        </OtherUsersContext.Provider>
    )
};