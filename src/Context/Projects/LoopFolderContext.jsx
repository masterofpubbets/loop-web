import React, { createContext, useReducer } from "react";

export const LoopFolderContext = createContext();

const types = {
    LOADLOOPSFOLDERS: 'LOADLOOPSFOLDERS'
};

const loopFolderReducer = (state, action) => {
    switch (action.type) {
        case types.LOADLOOPSFOLDERS:
            return {...state, folders: action.payload, foldersVersion: state.foldersVersion + 1};
        default:
            return state;
    }
};

export const LoopFolderProvider = ({ children }) => {
    const [state, dispatch] = useReducer(loopFolderReducer, { folders: [], foldersVersion: 0 })

    const loadFolder = (folders) => {
        dispatch({ type: types.LOADLOOPSFOLDERS, payload: folders })
    };

    return (
        <LoopFolderContext.Provider value={{ ...state, loadFolder }}>
            {children}
        </LoopFolderContext.Provider>
    )
};