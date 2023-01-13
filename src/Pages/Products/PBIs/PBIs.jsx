import React from "react";
import PageLayout from "../../../Components/Layout/PageLayout";
import { usePBI } from "../../../Hooks/Products/usePBI";
import Button from '@mui/material/Button';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ListObjects from "../../../Components/Lists/ListObjects";
import { Link, useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import ClassIcon from '@mui/icons-material/Class';


const PBIs = () => {
    const { id } = useParams();
    const { pbi, pbiVersion } = usePBI(id);


    const filterHeader = [{
        title: 'Title',
        value: 'title'
    },
    {
        title: 'Status',
        value: 'status'
    }, {
        title: 'Team',
        value: 'team'
    },
    {
        title: 'Story Point',
        value: 'storyPoint'
    }, {
        title: 'User Story',
        value: 'userStory'
    }, {
        title: 'Favorite',
        value: 'isFav'
    }, {
        title: 'Sprint',
        value: 'sprint'
    }];

    return (
        <div>
            <PageLayout
                header="Backlog Items"
                icon={<ClassIcon color="error" />}
                marginContent={4}
                rightButton={
                    <Grid
                        container
                        spacing={1}
                    >
                        <Grid item>
                            <Link to={`/newpbi/${id}`}>
                                <Button variant="contained" startIcon={<LibraryAddIcon />} >
                                    New
                                </Button>
                            </Link>
                        </Grid>

                    </Grid>
                }
            >

                <ListObjects listName="Backlog Items" data={pbi} filterHeader={filterHeader} dataVersion={pbiVersion} />

            </PageLayout>

        </div>
    )
};

export default PBIs;