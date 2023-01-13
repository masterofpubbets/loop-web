import React, { useReducer, createContext } from 'react';
import { defaultNotifications } from '../Consts/Notifications';

const types = {
    ADD: 'ADD'
};

export const NotificationsContext = createContext();

const NotificationsReducer = (state, action) => {
    switch (action.type) {
        case types.ADD:
            return { ...state, notifications: action.payload }
        default:
            return state
    }
};

export const NotificationsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(NotificationsReducer, { notifications: defaultNotifications })
    const addNotification = (notification) => {
        dispatch({ type: types.ADD, payload: notification })
    };

    return (
        <NotificationsContext.Provider value={{ ...state, addNotification }}>
            {children}
        </NotificationsContext.Provider>
    )
};