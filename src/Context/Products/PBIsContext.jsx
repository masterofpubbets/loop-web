import React, { createContext, useReducer } from "react";

const types = {
    GETPBI: 'GETPBI'
};

export const PBIsContext = createContext();

const PBIReducer = (state, action) => {
    switch (action.type) {
        case types.GETPBI:
            return ({ ...state, pbi: action.payload, dataVersion: state.dataVersion + 1 });
        default:
            return { ...state }
    }
};


export const PBIProvider = ({ children }) => {
    const [state, dispatch] = useReducer(PBIReducer, { pbi: [], dataVersion: 0 });

    const getPBI = (pbis) => {
        dispatch({type: types.GETPBI, payload: pbis})
    };


    return (
        <PBIsContext.Provider value={{ ...state, getPBI }}>
            {children}
        </PBIsContext.Provider>
    )
};