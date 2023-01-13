import React, { createContext, useReducer } from "react";

const types = {
    GETCONTACTS: 'GETCONTACTS',
    UPDATECOMPANY: 'UPDATECOMPANY'
};

export const ContactsContext = createContext();

const ContactsReducer = (state, action) => {
    switch (action.type) {
        case types.GETCONTACTS:
            return ({ ...state, contacts: action.payload, dataVersion: state.dataVersion + 1 })
        default:
            return ({ ...state })
    }
};

export const ContactsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ContactsReducer, { contacts: [], dataVersion: 0 })

    const getContacts = (contacts) => {
        dispatch({ type: types.GETCONTACTS, payload: contacts })
    };


    return (
        <ContactsContext.Provider value={{ ...state, getContacts }}>
            {children}
        </ContactsContext.Provider>
    )
};
