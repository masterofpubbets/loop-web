import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../../../Components/Layout/PageLayout";
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Grid from '@mui/material/Grid';
import { useCSV } from "../../../Hooks/Common/useCSV";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import IconButton from '@mui/material/IconButton';
import HorizontalLinearStepper from "../../../Components/Navs/HorizontalLinearStepper";
import Typography from '@mui/material/Typography';
import { importedLoopsColumns } from "../../../Consts/Loops";
import DataTable from '../../../Components/DataViews/DataTable';
import TextField from '@mui/material/TextField';
import { useImportLoops } from "../../../Hooks/Projects/useImportLoops";
import LinearWithValueLabel from '../../../Components/Bars/LinearWithValueLabel';
import FolderIcon from '@mui/icons-material/Folder';



const steps = ['Select csv file', 'Reviewing', 'Save to Work Space'];

const ImportLoops = () => {
    const nav = useNavigate();
    const { readCSV, dataRead, fileError, isFilePending, readDone } = useCSV();
    const [pageStep, setPageStep] = useState(0);
    const [dataReview, setDataReview] = useState([]);
    const [delim, setDelim] = useState(';');
    const { appUUID } = useParams();
    const { percentage, importLoops, ispending, finished } = useImportLoops(appUUID);
    

    const handleBack = () => {
        nav(-1)
    };

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
        importLoops(dataReview)
    };

    useEffect(() => {
        if (readDone) {
            let arr = [];
            dataRead.map((d, index) => {
                return (
                    arr.push({
                        id: index,
                        area: d.area,
                        description: d.description,
                        folderStatus: d.folderStatus,
                        hasBlockage: d.hasBlockage,
                        loopName: d.loopName,
                        subType: d.subType,
                        subcontractor: d.subcontractor,
                        subsystem: d.subsystem,
                        type: d.type,
                        vendor: d.vendor,
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
                header="Import Loops"
                icon={<FolderIcon color="primary" />}
                marginContent={4}
                rightButton={
                    <Button onClick={handleBack} size="small" color="secondary" variant="contained" startIcon={<ArrowBackIcon />} >Back</Button>
                }
            >


                <HorizontalLinearStepper steps={steps} handleStep={handleStep} />

                {(pageStep === 0) &&
                    <Grid container mt={3}>
                        <Grid item>
                            <Typography variant="overline" component="h6">
                                CSV must contains these columns in sequence
                                [id, hasBlockage, area, loopName, description, type, subType, subsystem, subcontractor, vendor, folderStatus]
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
                                <IconButton disabled={isFilePending} onChange={handleFileSelected} color="primary" aria-label="Upload Loops" component="label" >
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
                                Imported Loops
                            </Typography>
                        </Grid>

                        <Grid
                            container
                        >
                            <DataTable rows={dataReview} columns={importedLoopsColumns} tableHeight={800} />
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
                                    Loops have been saved to project
                                </Typography>
                            </Grid>
                        }
                    </Grid>
                }

            </PageLayout>
        </div>
    )
};

export default ImportLoops;