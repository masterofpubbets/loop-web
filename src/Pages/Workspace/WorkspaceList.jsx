import React, { useContext } from "react";
import PageLayout from "../../Components/Layout/PageLayout";
import { WsContext } from "../../Context/WSContext";
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Typography from '@mui/material/Typography';
import ListObjects from "../../Components/Lists/ListObjects";
import { Link } from "react-router-dom";
import { UserContext } from '../../Context/UserContext';


const WorkspaceList = () => {
    const { user } = useContext(UserContext);
    const { workspace, dataVersion } = useContext(WsContext);
    const filterHeader = [{
        title: 'Name',
        value: 'workspaceName'
    },
    {
        title: 'Is Default',
        value: 'isDefault'
    },
    {
        title: 'Description',
        value: 'description'
    }]

    return (
        <div>
            <PageLayout
                header=" Workspaces"
                icon={<WorkspacesIcon color="primary" />}
                marginContent={4}
                rightButton={
                    (user.userType === 'master') &&
                    <Link to="/newworkspace">
                        <Button variant="contained" startIcon={<LibraryAddIcon />} >New</Button>
                    </Link>
                }
            >


                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    spacing={2}
                    mt={4}
                >


                    {(workspace.length === 0) &&
                        <Grid item>
                            <Typography variant="BUTTON" component="span" gutterBottom color="error">
                                You do not have any workspace!
                                You need to have at least one Workspace.
                            </Typography>
                        </Grid>
                    }

                </Grid>

                <ListObjects listName="Workspace" data={workspace} filterHeader={filterHeader} dataVersion={dataVersion}/>

            </PageLayout>

        </div>
    )
};

export default WorkspaceList;