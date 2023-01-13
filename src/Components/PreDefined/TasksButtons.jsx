import React from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


const TasksButtons = ({ data }) => {


    return (
        <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
        >
            <Grid item>
                <ButtonGroup variant="contained" aria-label="outlined primary button group" size="small" >
                    <Button onClick={() => data.setPending(data.id)} variant="contained" size="small" color="secondary">Pendingd</Button>
                    <Button onClick={() => data.setOpen(data.id)} variant="contained" size="small" color="primary">Open</Button>
                    <Button onClick={() => data.setDone(data.id)} variant="contained" size="small" color="success">Done</Button>
                </ButtonGroup>
                <Grid item>
                    <IconButton onClick={() => data.setDelete(data.id)} aria-label="delete" size="large">
                        <DeleteIcon fontSize="inherit" color="error"/>
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default TasksButtons;