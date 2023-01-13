import React from 'react';
import Grid from '@mui/material/Grid';

export default function StatusItem(data) {
    return (
        <div className="custom-item">
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                ml={2}
                spacing={2}
            >
                <Grid item>
                    {data.ImageSrc}
                </Grid>
                <Grid item>
                    <div className="product-name">{data.Name}</div>
                </Grid>
            </Grid>

        </div >
    );
}
