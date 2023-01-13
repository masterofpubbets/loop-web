import React, { createContext, useReducer } from 'react';

export const WsContext = createContext();

const types = {
    GETWORKSPACES: 'GETWORKSPACES',
    ADDWORKSPACE: 'ADDWORKSPACE',
    SETCURRENT: 'SETCURRENT',
    ADDSHAREDWORKSPACE: 'ADDSHAREDWORKSPACE'
};

const wsReducer = (state, action) => {
    switch (action.type) {
        case types.ADDWORKSPACE:
            localStorage.setItem('ws', null);
            localStorage.setItem('ws', JSON.stringify(action.payload));
            return { ...state, workspace: action.payload, dataVersion: state.dataVersion + 1, currentWorkspaceDataVersion: state.currentWorkspaceDataVersion + 1 }
        case types.SETCURRENT:
            return { ...state, currentWorkspace: action.payload, currentWorkspaceDataVersion: state.currentWorkspaceDataVersion + 1 }
            
        default:
            return state
    }
};

export const WsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(wsReducer, { workspace: !localStorage.getItem('ws') ? [] : JSON.parse(localStorage.getItem('ws')), currentWorkspace: {}, dataVersion: 0, currentWorkspaceDataVersion: 0 });

    const getWorkspaces = (userId) => {
        dispatch({ type: types.GETWORKSPACES, payload: userId })
    };

    const addWorkspace = (ws) => {
        dispatch({ type: types.ADDWORKSPACE, payload: ws })
    };

    const setCurrentWorkspace = (ws) => {
        dispatch({ type: types.SETCURRENT, payload: ws })
    };


    return (
        <WsContext.Provider value={{ ...state, getWorkspaces, addWorkspace, setCurrentWorkspace }}>
            {children}
        </WsContext.Provider>
    )
};
