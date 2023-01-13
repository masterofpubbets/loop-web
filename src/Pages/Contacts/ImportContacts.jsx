import React, { useState, useEffect } from "react";
import PageLayout from "../../Components/Layout/PageLayout";
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { useCSV } from "../../Hooks/Common/useCSV";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import IconButton from '@mui/material/IconButton';
import HorizontalLinearStepper from "../../Components/Navs/HorizontalLinearStepper";
import Typography from '@mui/material/Typography';
import { importedContactColumns } from '../../Consts/Contacts';
import DataTable from '../../Components/DataViews/DataTable';
import TextField from '@mui/material/TextField';
import { useImportContacts } from "../../Hooks/useImportContacts";
import LinearWithValueLabel from '../../Components/Bars/LinearWithValueLabel';



const steps = ['Select csv file', 'Reviewing', 'Save to Work Space'];

const ImportContacts = () => {
    const { readCSV, dataRead, fileError, isFilePending, readDone } = useCSV();
    const [pageStep, setPageStep] = useState(0);
    const [dataReview, setDataReview] = useState([]);
    const [delim, setDelim] = useState(';');
    const { percentage, importContacts, ispending, finished } = useImportContacts();

    const handleFileSelected = (e) => {
        if (e.target.files.length > 0) {
            readCSV(e.target.files[0], delim)
        }
    };

    const handleStep = (step) => {
        setPageStep(step)
    };

    const handleSaveToWorkspace = (e) => {
        e.preventDefault();
        importContacts(dataReview)
    };

    useEffect(() => {
        if (readDone) {
            let arr = [];
            dataRead.map((d, index) => {
                return (
                    arr.push({
                        id: index,
                        COMPANY: d.COMPANY,
                        NAME: d.NAME,
                        MOBILE: d.MOBILE,
                        PHONE: d.PHONE,
                        ADDRESS: d.ADDRESS,
                        PHOTO: d.PHOTO,
                        WORKGROUP: d.WORKGROUP
                    }

                    )
                )
            })
            setDataReview(arr)
        }
    }, [readDone, dataRead.length])


    return (
        <div>
            <PageLayout
                header="Import Contacts"
                icon={<RecentActorsIcon color="primary" />}
                marginContent={4}
                rightButton={<Link to="/contacts">
                    <Button size="small" color="secondary" variant="contained" startIcon={<ArrowBackIcon />} >Back</Button>
                </Link>
                }
            >


                <HorizontalLinearStepper steps={steps} handleStep={handleStep} />

                {(pageStep === 0) &&
                    <Grid container mt={3}>
                        <Grid item>
                            <Typography variant="overline" component="h6">
                                CSV must contains these columns in sequence
                                [Company, Name, Phone, Mobile, Mail, Job, Workgroup, Address, Photo]
                                even if it's empty.
                            </Typography>
                        </Grid>

                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                        >
                            <Grid item>
                                <TextField
                                    disabled={isFilePending}
                                    sx={{ width: '80px' }}
                                    size="small"
                                    label="Delimeter"
                                    required
                                    value={delim}
                                    onChange={(e) => setDelim(e.target.value)}
                                />
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" component="h6">
                                    Select CSV File
                                </Typography>
                            </Grid>
                            <Grid item>
                                <IconButton disabled={isFilePending} onChange={handleFileSelected} color="primary" aria-label="Upload Contacts" component="label" >
                                    <input hidden accept=".csv" type="file" />
                                    <UploadFileIcon />
                                </IconButton>
                            </Grid>
                        </Grid>

                        {readDone &&
                            <Grid item>
                                <Typography variant="h6" component="h6" color="primary">
                                    Read file is complete
                                </Typography>
                            </Grid>
                        }

                        {fileError &&
                            <Grid item>
                                <Typography variant="h6" component="h6" color="error">
                                    {fileError}
                                </Typography>
                            </Grid>
                        }
                    </Grid>
                }

                {(pageStep === 1) &&
                    <Grid container mt={3}>
                        <Grid item>
                            <Typography variant="body1" component="h6">
                                Imported Contacts
                            </Typography>
                        </Grid>

                        <Grid
                            container
                        >
                            <DataTable rows={dataReview} columns={importedContactColumns} tableHeight={800} />
                        </Grid>

                    </Grid>
                }

                {(pageStep === 2) &&
                    <Grid
                        container
                        mt={3}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={3}
                    >
                        <Grid item>
                            <Button disabled={(dataRead.length === 0 ? true : false)} onClick={handleSaveToWorkspace} variant="contained" >Save to Workspace</Button>
                        </Grid>

                        {ispending &&
                            <LinearWithValueLabel progress={percentage} />
                        }

                        {finished &&
                            <Grid item>
                                <Typography variant="subtitle1" component="h6" color="primary">
                                    Contacts have been saved to Workspace
                                </Typography>
                            </Grid>
                        }
                    </Grid>
                }

            </PageLayout>
        </div>
    )
};

export default ImportContacts;