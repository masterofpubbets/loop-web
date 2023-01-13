import React, { createContext, useReducer } from 'react';

const types = {
    ADDPROJECT: 'ADDPROJECT'
};

export const ProjectContext = createContext();

const projectReducer = (state, action) => {
    switch (action.type) {
        case types.ADDPROJECT:
            return ({...state, projects: action.payload, projectVersion: state.projectVersion + 1})
        default:
            return state;
    }
};

export const ProjectsProvider = ({children}) => {
    const [state, dispatch] = useReducer(projectReducer, {projects: [], projectVersion: 0});

    const addProject = (project) => {
        dispatch({type: types.ADDPROJECT, payload: project})
    };

    return(
        <ProjectContext.Provider value={{...state, addProject}}>
            {children}
        </ProjectContext.Provider>
    )
};