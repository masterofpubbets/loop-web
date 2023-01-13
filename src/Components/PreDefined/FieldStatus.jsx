import React from 'react';
import TextBox from 'devextreme-react/text-box';
import Grid from '@mui/material/Grid';

export default function FieldStatus(data) {
    return (
        <div className="custom-item">
            {data &&
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    ml={2}
                >
                    <Grid item>
                        {data.ImageSrc}
                    </Grid>
                    <Grid item>
                        < TextBox className="product-name"
                            defaultValue={data && data.Name}
                            readOnly={true}
                        />
                    </Grid>
                </Grid>
            }
        </div>
    );
}
