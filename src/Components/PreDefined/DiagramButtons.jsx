import React, { Fragment } from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


const DiagramButtons = ({ data }) => {


    return (
        <Fragment>
            <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
            >
                <Grid item>
                    <Button onClick={() => data.setEdit(data.id)} variant="contained" color="primary" size="small">Open</Button>
                </Grid>
                <Grid item>
                    <IconButton onClick={() => data.setRemove(data.id)} aria-label="delete" size="large">
                        <DeleteIcon fontSize="inherit" color="error" />
                    </IconButton>
                </Grid>
            </Grid>

        </Fragment>
    )
};

export default DiagramButtons;