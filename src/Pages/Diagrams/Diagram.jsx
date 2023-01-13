import React, { useEffect } from "react";
import PageLayout from "../../Components/Layout/PageLayout";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useParams } from "react-router-dom";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DiagramViewer from "../../Components/Diagrams/DiagramViewer";
import { diagramDummy } from "../../Consts/DiagramDummy";


const Diagram = () => {
    const { id } = useParams();

    const SaveData = (diagramData) => {
        console.log(diagramData)
    };

    useEffect(() => {
        if (id !== undefined) {
            
        }
    }, [id]);


    return (
        <div>
            <PageLayout
                header="Diagrams"
                icon={<AccountTreeIcon color="primary" />}
                marginContent={4}
                rightButton={
                    <Grid
                        container
                        spacing={1}
                    >
                        <Grid item>
                            <Link to="/importcontacts">
                                <Button variant="contained" startIcon={<LibraryAddIcon />} >
                                    New
                                </Button>
                            </Link>
                        </Grid>

                        <Grid item>
                            <Link to="/newcontact">
                                <Button variant="contained" startIcon={<ArrowBackIcon />} color="secondary">
                                    Back
                                </Button>
                            </Link>
                        </Grid>

                    </Grid>
                }
            >

                <DiagramViewer data={diagramDummy} SaveData={SaveData}/>

            </PageLayout>
        </div>
    )
};

export default Diagram;