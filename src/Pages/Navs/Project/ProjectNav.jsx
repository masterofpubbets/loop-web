import React, { useContext, useEffect, useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ProjectTemp from './ProjectTemp';
import { useProjects } from '../../../Hooks/Projects/useProjects';
import { WsContext } from '../../../Context/WSContext';


export const ProjectNav = () => {
    const { currentWorkspace, currentWorkspaceDataVersion } = useContext(WsContext);
    const [wsId, setWsId] = useState(currentWorkspace.id);
    const { projects } = useProjects(wsId);

    useEffect(() => {
        setWsId(currentWorkspace.id)
    }), [currentWorkspaceDataVersion];

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    All Projects
                </ListSubheader>
            }
        >

            {projects && projects.map((project, index) => {
                return <ProjectTemp key={index} project={project} />
            })}

        </List>
    );
};

export default ProjectNav;
