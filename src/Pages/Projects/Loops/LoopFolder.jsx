import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useLoopFolder } from "../../../Hooks/Projects/useLoopFolders";
import Divider from '@mui/material/Divider';
import LoopCard from "../../../Components/Cards/LoopCard";


const LoopFolder = () => {
    const { appUUID, tag } = useParams();
    const { folders, foldersVersion } = useLoopFolder(appUUID, tag);
    const [selectedFolder, setSelectedFolder] = useState(null);


    useEffect(() => {
        const folderTemp = folders.filter(f => f.loopName === tag);
        if (folderTemp !== undefined) {
            if (folderTemp.length > 0) {
                setSelectedFolder(folderTemp[0])
            }
        }
    }, [foldersVersion]);

    return (

        <Fragment>

            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item mt={10}>
                    { selectedFolder && <LoopCard folder={selectedFolder} minWidth={350} height={300} />}
                </Grid>
            </Grid>

        </Fragment>

    )
};

export default LoopFolder;