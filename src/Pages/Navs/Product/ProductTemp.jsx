import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AvatarImage from '../../../Components/Avatar/AvatarImage';
import Grid from '@mui/material/Grid';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import Box from '@mui/material/Box';
import ProductStrategyTemp from './ProductStrategyTemp';
import ProductBusinessTemp from './ProductBusinessTemp';
import ProductReasearchTemp from './ProductResearchTemp';
import ProductRoadmapTemp from './ProductRoadmapTemp';
import ProductSprintTemp from './ProductSprintTemp';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TableBarIcon from '@mui/icons-material/TableBar';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import GradingIcon from '@mui/icons-material/Grading';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';



export const ProductTemp = ({ product }) => {
    const [openProduct, setOpenProduct] = useState(false);


    const handleClickProduct = () => {
        setOpenProduct(!openProduct);
    };


    return (

        <Fragment>


            <ListItemButton onClick={handleClickProduct}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <AvatarImage imageURL={product.photoURL} imageName="" />
                    <ListItemText primary={product.productName} />
                </Grid>

                {openProduct ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openProduct} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <InfoIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Info" />
                    </ListItemButton>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <MoodBadIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Stakeholders" />
                    </ListItemButton>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <MonetizationOnIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="ROI" />
                    </ListItemButton>

                    <Box pl={2}>
                        <ProductReasearchTemp product={product} />
                    </Box>
                    <Box pl={2}>
                        <ProductStrategyTemp product={product} />
                    </Box>
                    <Box pl={2}>
                        <ProductBusinessTemp product={product} />
                    </Box>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PublishedWithChangesIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary="KPI" />
                    </ListItemButton>

                    <Box pl={2}>
                        <ProductRoadmapTemp product={product} />
                    </Box>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <GradingIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary="Definition of Done" />
                    </ListItemButton>

                    <Link to={`/pbis/${product.id}`}>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <ListAltIcon color="error" />
                            </ListItemIcon>
                            <ListItemText primary="Backlog Items" />
                        </ListItemButton>
                    </Link>

                    <Box pl={2}>
                        <ProductSprintTemp product={product} />
                    </Box>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <TableBarIcon color="warning" />
                        </ListItemIcon>
                        <ListItemText primary="Minutes of Meetings" />
                    </ListItemButton>

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <ConfirmationNumberIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="Tickets" />
                    </ListItemButton>

                    <Link to={`/product/${product.id}`}>
                        <ListItemButton sx={{ pl: 4 }} >
                            <ListItemIcon>
                                <SettingsIcon color="warning" />
                            </ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItemButton>
                    </Link>


                </List>
            </Collapse>

        </Fragment>
    );
};

export default ProductTemp;
