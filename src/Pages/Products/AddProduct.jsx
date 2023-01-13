import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../Components/Layout/PageLayout";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CategoryIcon from '@mui/icons-material/Category';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useObject } from "../../Hooks/Common/useObject";
import { ProductContext } from "../../Context/ProductsContext";
import { WsContext } from "../../Context/WSContext";
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&:after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
    },
}));

const AddProduct = () => {
    const nav = useNavigate();
    const [productName, setProductName] = useState('');
    const [vision, setVision] = useState('');
    const [mission, setMission] = useState('');
    const [organization, setOrganization] = useState('');
    const [productType, setProductType] = useState('');
    const [description, setDescription] = useState('');
    const [estInvestment, setEstInvestment] = useState(0);
    const [internalError, setInternalError] = useState(null);
    const [isFav, setIsFav] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);
    const { products } = useContext(ProductContext);
    const { currentWorkspace } = useContext(WsContext);
    const { add, error, isPending, successMes, clearSuccess, success } = useObject(products.length, "products", "Product");


    const handleBack = () => {
        nav(-1)
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };

    const handleIsFav = () => {
        setIsFav(!isFav)
    };

    const handleAdd = (e) => {
        if (isNaN(estInvestment)) {
            setInternalError('Estimated Investment must be a number!')
        } else {
            add({
                productName,
                vision,
                mission,
                organization,
                productType,
                estInvestment,
                isFav,
                description
            }, 1, "productName", productName, 'Product Name', { wsId: currentWorkspace.id })
        }
    };

    useEffect(() => {
        if (success) {
            setOpenSnack(true)
            clearSuccess()
            setProductName('')
            setVision('')
            setOrganization('')
            setProductType('')
            setMission('')
            setDescription('');
            setIsFav(false);
            setEstInvestment(0)
        }
    }, [success]);

    return (
        <div>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
                    {successMes}
                </Alert>
            </Snackbar>

            <PageLayout
                header="Add Product"
                icon={<CategoryIcon color="error" />}
                marginContent={4}
                rightButton={
                    <Grid
                        container
                        spacing={1}
                    >
                        <Grid item>
                            <Button onClick={handleBack} variant="contained" startIcon={<ArrowBackIcon />} color="secondary" size="small">
                                Back
                            </Button>
                        </Grid>

                    </Grid>
                }
            >

                <FormControl sx={{ mb: 2 }} fullWidth>
                    <TextField
                        sx={{ mt: 1, width: '100%' }}
                        label="Name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                    <TextField
                        sx={{ mt: 1, width: '100%' }}
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        sx={{ mt: 1, width: '100%' }}
                        label="Vision"
                        value={vision}
                        onChange={(e) => setVision(e.target.value)}
                    />
                    <TextField
                        sx={{ mt: 1, width: '100%' }}
                        label="Mission"
                        value={mission}
                        onChange={(e) => setMission(e.target.value)}
                    />
                    <TextField
                        sx={{ mt: 1, width: '50%' }}
                        label="Type"
                        value={productType}
                        onChange={(e) => setProductType(e.target.value)}
                    />
                    <TextField
                        sx={{ mt: 1, width: '50%' }}
                        label="Organization"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                    />
                    <TextField
                        sx={{ mt: 1, width: '50%' }}
                        label="Estimated Investment Budget"
                        value={estInvestment}
                        onChange={(e) => setEstInvestment(e.target.value)}
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    {(error) && <Typography variant="BUTTON" component="span" gutterBottom color="error">
                        {error}
                    </Typography>}
                    {(internalError) && <Typography variant="BUTTON" component="span" gutterBottom color="error">
                        {internalError}
                    </Typography>}
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <FormControlLabel
                        control={<Android12Switch checked={isFav} onChange={handleIsFav} />}
                        label="Favorite"
                    />
                </FormControl>

                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-end"
                >
                    <Grid item>
                        <Button disabled={isPending} onClick={handleAdd} variant="contained" >Add</Button>
                    </Grid>

                </Grid>

            </PageLayout >

        </div >
    )
};

export default AddProduct;