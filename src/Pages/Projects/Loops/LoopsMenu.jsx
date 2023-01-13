import React from "react";
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import PageLayout from "../../../Components/Layout/PageLayout";
import CardNav from "../../../Components/Navs/CardNav";
import folderImg from '../../../Images/folderyellow.svg';



const LoopsMenu = () => {
    const { appUUID } = useParams();

    const linksAdd = [{
        title: 'Import from File',
        url: `/importloops/${appUUID}`
    }];

    const linksList = [{
        title: 'Import from File',
        url: `/loopfolder/${appUUID}/05-X-50286`
    }];

    return (
        <PageLayout
            header="Loops Folders Menu"
            icon={<FolderIcon color="primary" />}
            marginContent={4}
            links={null}
            rightButton={null}
        >

            <Grid
                container
                gap={3}
            >
                <Grid item>
                    <CardNav
                        title='Import'
                        imgURL={folderImg}
                        description='Import Loops From csv File'
                        minWidth={175}
                        height={100}
                        links={linksAdd}
                    />
                </Grid>

                <Grid item>
                    <CardNav
                        title='List'
                        imgURL={folderImg}
                        description='List Loops Folders'
                        minWidth={175}
                        height={100}
                        links={linksList}
                    />
                </Grid>
            </Grid>


        </PageLayout >
    )
};

export default LoopsMenu;