import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import PageLayout from "../../Components/Layout/PageLayout";
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { WsContext } from "../../Context/WSContext";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns'
import Divider from '@mui/material/Divider';
import ListObjects from "../../Components/Lists/ListObjects";
import { projectsFilterHeader } from "./comboFilter";
import { useProjects } from "../../Hooks/Projects/useProjects";
import AccountTreeIcon from '@mui/icons-material/AccountTree';


const WorkspaceAdmin = () => {
    const { currentWorkspace, dataVersion } = useContext(WsContext);
    const [wsInfo, setWsInfo] = useState({ workspaceName: '', createdAt: '', lastUpdated: '', description: '' });
    const { projects, projectVersion } = useProjects(currentWorkspace.id);

    useEffect(() => {
        if (dataVersion > 0) {
            setWsInfo({
                workspaceName: currentWorkspace.workspaceName,
                createdAt: format(new Date(currentWorkspace.createdAt.seconds * 1000), 'EEEE, dd-MM-yyyy'),
                lastUpdated: (currentWorkspace.lastUpdated !== undefined) ? format(new Date(currentWorkspace.lastUpdated.seconds * 1000), 'EEEE, dd-MM-yyyy') : '',
                description: currentWorkspace.description
            })
        }
    }, [dataVersion])


    return (
        <PageLayout header="Workspace Admin Panel" icon={<WorkspacesIcon color="primary" />} marginContent={4}>

            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <Grid item>
                    <Typography variant="BUTTON" component="span" gutterBottom color="text.secondary">
                        {`Name: ${wsInfo.workspaceName}`}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="BUTTON" component="span" gutterBottom color="text.secondary">
                        {`Created: ${wsInfo.createdAt}`}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="BUTTON" component="span" gutterBottom color="text.secondary">
                        {`Updated: ${wsInfo.lastUpdated}`}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="BUTTON" component="span" gutterBottom color="text.secondary">
                        {`Description: ${wsInfo.description}`}
                    </Typography>
                </Grid>

            </Grid>

            <Divider sx={{ marginBottom: '15px', marginTop: '5px' }} />

            <PageLayout
                header="Projects"
                icon={<AccountTreeIcon color="error" />}
                marginContent={4}
                rightButton={
                    <Link to="/addproject">
                        <Button variant="contained" startIcon={<LibraryAddIcon />} size="small" >
                            Add
                        </Button>
                    </Link>
                }
            >
                <ListObjects listName="Projects" data={projects} filterHeader={projectsFilterHeader} dataVersion={projectVersion} />

            </PageLayout>

        </PageLayout>
    )
};

export default WorkspaceAdmin;