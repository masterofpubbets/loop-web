import React from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import IconBreadcrumbs from '../Navs/IconBreadcrumbs';

const PageLayout = ({ header, icon, links, marginContent, children, rightButton, withDivider }) => {

    return (
        <div>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
            >

                {links ?
                    <Grid item>
                        <IconBreadcrumbs links={links} />
                    </Grid>
                    :
                    <Grid item>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            spacing={2}
                        >
                            <Grid item >
                                {icon}
                            </Grid>
                            <Grid item >
                                <Typography variant="h5" component="h5" gutterBottom color="text.secondary">
                                    {header}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                }

                {rightButton &&
                    <Grid item>
                        {rightButton}
                    </Grid>
                }

            </Grid>

            {withDivider && <Divider />}

            <Box mt={marginContent} ml={1}>
                {children}
            </Box>

        </div>
    );
};

export default PageLayout;