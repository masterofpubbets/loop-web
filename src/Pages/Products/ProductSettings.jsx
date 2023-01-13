import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../../Components/Layout/PageLayout";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CategoryIcon from '@mui/icons-material/Category';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import CardMedia from '@mui/material/CardMedia';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useObject } from "../../Hooks/Common/useObject";
import { ProductContext } from "../../Context/ProductsContext";
import { WsContext } from "../../Context/WSContext";
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { usePhoto } from '../../Hooks/Common/usePhoto';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useDelete } from "../../Hooks/Common/useDelete";
import AlertDialog from "../../Components/Dialogs/AlertDialog";
import ButtonGroup from '@mui/material/ButtonGroup';


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

const ProductSettings = () => {
    const { id } = useParams();
    const nav = useNavigate();
    const [links, setLinks] = useState(null);
    const [productName, setProductName] = useState('');
    const [photoURL, setPhotoURL] = useState(null);
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
    const { update, error, isPending, successMes, clearSuccess, success } = useObject(products.length, "products", "Product");
    const { updateLogo, photoError, uploadedURL, successPhotoMes, successPhoto, clearPhotoMessage } = usePhoto('products', id, 'id');
    const { deleteProduct, isPending: isDeletePending, deleteError } = useDelete();
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogMes, setDialogMes] = useState('');
    const [dialogButton, setDialogButton] = useState(null);
    const navigate = useNavigate();


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

    const handleOpenDeleteAllDialog = () => {
        setOpenDialog(true);
        setDialogButton('DELETE')
        setDialogMes(`Are you sure you want to delete Product (${productName})?`)
    };

    const handleDialogClosed = (state) => {
        setOpenDialog(false);
        if (state) {
            //handle accept
            if (dialogButton === 'DELETE') {
                const result = deleteProduct(['id', '==', id]);
                if (result) {
                    navigate(-1)
                }
            }
        } else {
            //handle reject
        }
    };

    const handleUpdate = (e) => {
        if (isNaN(estInvestment)) {
            setInternalError('Estimated Investment must be a number!')
        } else {
            update({
                productName,
                vision,
                mission,
                organization,
                productType,
                estInvestment,
                isFav,
                description
            }, "productName", productName, 'Product Name', id, { field: 'wsId', value: currentWorkspace.id })
        }
    };

    const handlePhotoSelected = (e) => {
        if (e.target.files.length > 0) {
            updateLogo(e.target.files[0], 'contacts', id, 250000)
        }
    };

    useEffect(() => {
        if (success) {
            setOpenSnack(true)
            clearSuccess()
        }
    }, [success]);

    useEffect(() => {
        if (products !== undefined) {
            if (products.length > 0) {
                const con = products.find(c => c.id === id);
                if (con !== undefined) {
                    setProductName(con.productName)
                    if (con.description) {
                        setDescription(con.description)
                    }
                    if (con.productType) {
                        setProductType(con.productType)
                    }
                    if (con.estInvestment) {
                        setEstInvestment(con.estInvestment)
                    }
                    if (con.isFav) {
                        setIsFav(con.isFav)
                    }
                    if (con.organization) {
                        setOrganization(con.organization)
                    }
                    if (con.vision) {
                        setVision(con.vision)
                    }
                    if (con.mission) {
                        setMission(con.mission)
                    }

                    setPhotoURL(con.photoURL)

                    setLinks([{
                        title: "Products",
                        link: "/products",
                        icon: <CategoryIcon sx={{ mr: 0.5 }} fontSize="inherit" color="error" />
                    }, {
                        title: con.productName,
                        link: "#",

                    }])
                }
            }
        }
    }, [id]);

    useEffect(() => {
        if (uploadedURL) {
            setPhotoURL(uploadedURL)
        }
    }, [uploadedURL]);

    useEffect(() => {
        if (successPhoto) {
            setOpenSnack(true)
            clearPhotoMessage()
        }
    }, [successPhoto]);

    return (
        <div>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
                    {successMes || successPhotoMes}
                </Alert>
            </Snackbar>

            <PageLayout
                header="Add Product"
                icon={<CategoryIcon color="error" />}
                marginContent={4}
                links={links}
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

                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    mt={4}
                    mb={3}
                >
                    <Grid item>
                        <Typography variant="BUTTON" component="span" gutterBottom color="text.secondary">
                            Contact Icon:
                        </Typography>
                    </Grid>

                    <Grid item>
                        {photoURL &&
                            <CardMedia
                                component="img"
                                height="128"
                                image={photoURL}
                                alt={id}
                            />
                        }
                    </Grid>


                    <Grid item>
                        <IconButton disabled={isPending} onChange={handlePhotoSelected} color="primary" aria-label="upload picture" component="label" >
                            <input hidden accept="image/*" type="file" />
                            <PhotoCamera />
                        </IconButton>
                    </Grid>

                    {photoError &&
                        <Grid item>
                            <Typography variant="caption" component="span" gutterBottom color="error">
                                {photoError}
                            </Typography>
                        </Grid>
                    }

                </Grid>

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
                    {(deleteError) &&
                        <Typography variant="BUTTON" component="span" gutterBottom color="error">
                            {deleteError}
                        </Typography>
                    }
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

                <AlertDialog openDialog={openDialog} handleDialogClosed={handleDialogClosed} message={dialogMes} />

                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-end"
                >
                    <Grid item>
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            <Button disabled={isDeletePending || isPending} onClick={handleOpenDeleteAllDialog} color="error">delete</Button>
                            <Button disabled={isDeletePending || isPending} onClick={handleUpdate} variant="contained" >Update</Button>
                        </ButtonGroup>
                    </Grid>

                </Grid>

            </PageLayout >

        </div >
    )
};

export default ProductSettings;