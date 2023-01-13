import React, { Fragment } from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { NumberBox } from 'devextreme-react/number-box';


const BLButtons = ({ data }) => {


    return (
        <Fragment>
            <Grid
                container
                direction="column"
                justifyContent="space-around"
                alignItems="center"
            >
                <Grid item>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group" size="small" orientation="vertical">
                        <Button onClick={() => data.setIdle(data.id)} variant="contained" color="grey">Idle</Button>
                        <Button onClick={() => data.setBlocked(data.id)} variant="contained" color="error">Blocked</Button>
                        <Button onClick={() => data.setStarted(data.id)} variant="contained" color="warning">Started</Button>
                        <Button onClick={() => data.setOnReview(data.id)} variant="contained" color="primary">Review</Button>
                        <Button onClick={() => data.setDone(data.id)} variant="contained" color="success">Done</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>

            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                mt={2}
            >
                <Grid item>
                    <Typography variant="subtitle1" component="span">
                        Progress
                    </Typography>
                    <NumberBox
                        showSpinButtons={true}
                        defaultValue={data.progress}
                        rtlEnabled={false}
                        min={0}
                        max={100}
                        onValueChanged={(e) => data.setProgress(data.id, e.value)}
                    />
                </Grid>
            </Grid>

            <Grid
                container
                direction="column"
                justifyContent="space-around"
                alignItems="center"
            >
                <Grid item>
                    <IconButton onClick={() => data.setRemove(data.id)} aria-label="delete" size="large">
                        <DeleteIcon fontSize="inherit" color="error" />
                    </IconButton>
                </Grid>
            </Grid>

        </Fragment>
    )
};

export default BLButtons;