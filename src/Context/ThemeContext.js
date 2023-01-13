import React, { useReducer, createContext } from "react";
import { ThemeDefault } from '../Consts/Themes';

export const ThemeContext = createContext();

const types = {
    SELECTED_USER_THEME: 'SELECTED_USER_THEME',
    SETMODE: 'SETMODE',
};

const themeReducer = (state, action) => {
    switch (action.type) {
        case types.SELECTED_USER_THEME:
            return { ...state, preTheme: action.payload };
        case types.SETMODE:
            const mode = action.payload
            const background = {
                default: mode === 'light' ? '#f8f8f8' : '#212121',
                paper: mode === 'light' ? '#f8f8f8' : '#212121',
            }
            const newPalette = { ...state.preTheme.palette, mode, background }
            const newTheme = { ...state.preTheme, palette: newPalette }
            return { ...state, preTheme: newTheme }
        default:
            return state
    }
}

export const PreThemeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(themeReducer, { preTheme: ThemeDefault })

    const addUserTheme = (theme) => {
        dispatch({ type: types.SELECTED_USER_THEME, payload: theme })
    }

    const setMode = (mode) => {
        dispatch({ type: types.SETMODE, payload: mode })
    }

    return (
        <ThemeContext.Provider value={{ ...state, addUserTheme, setMode }} >
            {children}
        </ThemeContext.Provider>
    )
};