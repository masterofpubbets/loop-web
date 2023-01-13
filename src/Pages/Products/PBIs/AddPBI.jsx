import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../../../Components/Layout/PageLayout";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CategoryIcon from '@mui/icons-material/Category';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useObject } from "../../../Hooks/Common/useObject";
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import HtmlTextEditor from "../../../Components/Editors/HtmlTextEditor";
import ComboStatus from "../../../Components/PreDefined/ComboStatus";
import ComboDateTime from "../../../Components/ComboBox/ComboDateTime";
import Checkbox from '@mui/material/Checkbox';
import ComboPriority from "../../../Components/PreDefined/ComboPriority";
import ProgressBar2Values from "../../../Components/Bars/ProgressBar2Values";
import { NumberBox } from 'devextreme-react/number-box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import TextArea from 'devextreme-react/text-area';
import TasksTable from "../../../Components/PreDefined/TasksTable";
import { v4 as uuidv4 } from 'uuid';
import BLItemsTable from "../../../Components/PreDefined/BLItemsTable";
import ComboBox from "../../../Components/ComboBox/ComboBox";
import DiagramTable from "../../../Components/PreDefined/DiagramTable";


const ranges = [{
    startValue: 0,
    endValue: 25,
    color: '#92000A'
},
{
    startValue: 25,
    endValue: 50,
    color: '#E6E200'
},
{
    startValue: 50,
    endValue: 75,
    color: '#0077b6'
}, {
    startValue: 75,
    endValue: 100,
    color: '#77DD77'
}];

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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

const AddPBI = () => {
    const { id } = useParams();
    const nav = useNavigate();
    const [itemType, setItemType] = useState('feature');
    const [title, setTitle] = useState('');
    const [story, setStory] = useState('');
    const [hasRemainder, setHasRemainder] = useState(false);
    const [remainder, setRemainder] = useState(new Date());
    const [storyHeight, setStoryHeight] = useState(300);
    const [statusId, setStatusId] = useState(0);
    const [progress, setProgress] = useState(0);
    const [priorityId, setPriorityId] = useState(0);
    const [storyPoints, setStoryPoints] = useState(1);
    const [description, setDescription] = useState('');
    const [storyTasks, setStoryTasks] = useState([]);
    const [blItems, setBLItems] = useState([]);
    const [blItemsVersion, setBLItemsVersion] = useState(0);
    const [storyTasksDataVersion, setStoryTasksDataVersion] = useState(0);
    const [newTask, setNewTask] = useState('');
    const [tag, setTag] = useState('');
    const [epicItems, setEpicItems] = useState([]);
    const [epicItemsVersion, setEpicItemsVersion] = useState(0);
    const [openEpics, setOpenEpics] = useState([]);
    const [relatedEpic, setRelatedEpic] = useState('');
    const [openFeature, setOpenFeature] = useState([]);
    const [relatedFeature, setRelatedFeature] = useState('');
    const [diagrams, setDiagrams] = useState([]);
    const [diagramsVersion, setDiagramsVersion] = useState(0);
    const [tempDiagramName, setTempDiagramName] = useState('');
    const [tempDiagramType, setTempDiagramType] = useState('');
    const [internalError, setInternalError] = useState(null);
    const [isFav, setIsFav] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);
    const { add, error, isPending, successMes, clearSuccess, success } = useObject(0, "productsBacklogs", "Backlog Items");


    const handleBack = () => {
        nav(-1)
    };

    const handleAddNewDiagram = () => {
        setInternalError(null)
        if (tempDiagramName !== '') {
            const chk = diagrams.find(t => t.title === tempDiagramName);
            if (chk === undefined) {
                let tempDiagrams = diagrams.map(t => {
                    return (
                        {
                            id: t.id,
                            title: t.title,
                            type: t.type
                        }
                    )
                });
                tempDiagrams.push({
                    id: uuidv4(),
                    title: tempDiagramName,
                    type: (tempDiagramType === '') ? 'Undefined' : tempDiagramType
                });
                setDiagrams(tempDiagrams);
                setDiagramsVersion((prevVersion) => prevVersion + 1);
                setTempDiagramName('')
                setTempDiagramType('')
            } else {
                setInternalError('This Diagram already exists!')
            }
        }
    };

    const handleDiagramRemove = (id) => {
        const temp = diagrams.filter(t => t.id !== id)
        setDiagrams(temp);
        setDiagramsVersion(prevVersion => prevVersion + 1);
    };

    const handleDiagramRemoveAll = () => {
        setDiagrams([]);
        setDiagramsVersion(prevVersion => prevVersion + 1);
    };

    const handleSelectRelatedEpic = (e) => {
        setRelatedEpic(e.target.value)
    };

    const handleSelectRelatedFeature = (e) => {
        setRelatedFeature(e.target.value)
    };

    const handleSetDependIdle = (id) => {
        switch (itemType) {
            case "userStory":
                const temp = blItems.map(t => {
                    if (t.id === id) {
                        return { ...t, status: 'Idle' }
                    } else {
                        return { ...t }
                    }
                })
                setBLItems(temp);
                setBLItemsVersion(prevVersion => prevVersion + 1);
                break;
            case "epic":
                const tempEpic = epicItems.map(t => {
                    if (t.id === id) {
                        return { ...t, status: 'Idle' }
                    } else {
                        return { ...t }
                    }
                })
                setEpicItems(tempEpic);
                setEpicItemsVersion(prevVersion => prevVersion + 1);
                break;
            case "feature":
            default:

        }

    };

    const handleSetDependBlocked = (id) => {
        switch (itemType) {
            case "userStory":
                const temp = blItems.map(t => {
                    if (t.id === id) {
                        return { ...t, status: 'Blocked' }
                    } else {
                        return { ...t }
                    }
                })
                setBLItems(temp);
                setBLItemsVersion(prevVersion => prevVersion + 1);
                break;
            case "epic":
                const tempEpic = epicItems.map(t => {
                    if (t.id === id) {
                        return { ...t, status: 'Blocked' }
                    } else {
                        return { ...t }
                    }
                })
                setEpicItems(tempEpic);
                setEpicItemsVersion(prevVersion => prevVersion + 1);
                break;
            case "feature":
            default:

        }

    };

    const handleSetDependStarted = (id) => {
        switch (itemType) {
            case "userStory":
                const temp = blItems.map(t => {
                    if (t.id === id) {
                        return { ...t, status: 'Started' }
                    } else {
                        return { ...t }
                    }
                })
                setBLItems(temp);
                setBLItemsVersion(prevVersion => prevVersion + 1);
                break;
            case "epic":
                const tempEpic = epicItems.map(t => {
                    if (t.id === id) {
                        return { ...t, status: 'Started' }
                    } else {
                        return { ...t }
                    }
                })
                setEpicItems(tempEpic);
                setEpicItemsVersion(prevVersion => prevVersion + 1);
                break;
            case "feature":
            default:

        }

    };

    const handleSetDependOnReview = (id) => {
        switch (itemType) {
            case "userStory":
                const temp = blItems.map(t => {
                    if (t.id === id) {
                        return { ...t, status: 'On Review' }
                    } else {
                        return { ...t }
                    }
                })
                setBLItems(temp);
                setBLItemsVersion(prevVersion => prevVersion + 1);
                break;
            case "epic":
                const tempEpic = epicItems.map(t => {
                    if (t.id === id) {
                        return { ...t, status: 'On Review' }
                    } else {
                        return { ...t }
                    }
                })
                setEpicItems(tempEpic);
                setEpicItemsVersion(prevVersion => prevVersion + 1);
                break;
            case "feature":
            default:

        }

    };

    const handleSetDependDone = (id) => {
        switch (itemType) {
            case "userStory":
                const temp = blItems.map(t => {
                    if (t.id === id) {
                        return { ...t, status: 'Done' }
                    } else {
                        return { ...t }
                    }
                })
                setBLItems(temp);
                setBLItemsVersion(prevVersion => prevVersion + 1);
                break;
            case "epic":
                const tempEpic = epicItems.map(t => {
                    if (t.id === id) {
                        return { ...t, status: 'Done' }
                    } else {
                        return { ...t }
                    }
                })
                setEpicItems(tempEpic);
                setEpicItemsVersion(prevVersion => prevVersion + 1);
                break;
            case "feature":
            default:

        }

    };

    const handleSetDependProgress = (id, value) => {
        switch (itemType) {
            case "userStory":
                const temp = blItems.map(t => {
                    if (t.id === id) {
                        return { ...t, progress: value }
                    } else {
                        return { ...t }
                    }
                })
                setBLItems(temp);
                setBLItemsVersion(prevVersion => prevVersion + 1);
                break;
            case "epic":
                const tempEpic = epicItems.map(t => {
                    if (t.id === id) {
                        return { ...t, progress: value }
                    } else {
                        return { ...t }
                    }
                })
                setEpicItems(tempEpic);
                setEpicItemsVersion(prevVersion => prevVersion + 1);
                break;
            case "feature":
            default:

        }

    };

    const handleSetDependRemove = (id) => {
        switch (itemType) {
            case "userStory":
                const temp = blItems.filter(t => t.id !== id)
                setBLItems(temp);
                setBLItemsVersion(prevVersion => prevVersion + 1);
                break;
            case "epic":
                const tempEpic = epicItems.filter(t => t.id !== id)
                setEpicItems(tempEpic);
                setEpicItemsVersion(prevVersion => prevVersion + 1);
                break;
            case "feature":
            default:

        }

    };

    const handleSetDependRemoveAll = () => {
        switch (itemType) {
            case "userStory":
                setBLItems([]);
                setBLItemsVersion(prevVersion => prevVersion + 1);
                break;
            case "epic":
                setEpicItems([]);
                setEpicItemsVersion(prevVersion => prevVersion + 1);
                break;
            case "feature":
            default:

        }

    };

    const handleAddDependency = () => {
        switch (itemType) {
            case "userStory":
            case "epic":
            case "feature":
            default:

        }
    };

    const handleSetTasksPending = (id) => {
        const tempTasks = storyTasks.map(st => {
            if (st.id === id) {
                return { ...st, status: 'Pending' }
            } else {
                return { ...st }
            }
        });
        setStoryTasks(tempTasks);
        setStoryTasksDataVersion((prevVersion) => prevVersion + 1);
    };
    const handleSetTasksOpen = (id) => {
        const tempTasks = storyTasks.map(st => {
            if (st.id === id) {
                return { ...st, status: 'Open' }
            } else {
                return { ...st }
            }
        });
        setStoryTasks(tempTasks);
        setStoryTasksDataVersion((prevVersion) => prevVersion + 1);
    };
    const handleSetTasksDone = (id) => {
        const tempTasks = storyTasks.map(st => {
            if (st.id === id) {
                return { ...st, status: 'Done' }
            } else {
                return { ...st }
            }
        });
        setStoryTasks(tempTasks);
        setStoryTasksDataVersion((prevVersion) => prevVersion + 1);
    };
    const handleSetTasksDelete = (id) => {
        const tempTasks = storyTasks.filter(st => st.id !== id);
        setStoryTasks(tempTasks);
        setStoryTasksDataVersion((prevVersion) => prevVersion + 1);
    };

    const handleAddNewTask = () => {
        setInternalError(null)
        if (newTask !== '') {
            const chk = storyTasks.find(t => t.title === newTask);
            if (chk === undefined) {
                let tempTasks = storyTasks.map(t => {
                    return (
                        {
                            id: t.id,
                            title: t.title,
                            status: t.status
                        }
                    )
                });
                tempTasks.push({
                    id: uuidv4(),
                    title: newTask,
                    status: 'Pending'
                });
                setStoryTasks(tempTasks);
                setStoryTasksDataVersion((prevVersion) => prevVersion + 1);
                setNewTask('')
            } else {
                setInternalError('This Task already exists!')
            }
        }
    };

    const handleDeleteAllTasks = () => {
        setStoryTasks([]);
        setStoryTasksDataVersion((prevVersion) => prevVersion + 1);
    };

    const handleItemType = (type) => {
        setItemType(type)
    };

    const handlePriorityChanged = (e) => {
        setPriorityId(e.value - 1);
    };
    const handleStatusChanged = (e) => {
        setStatusId(e.value - 1);
    };
    const handleRemainderCheck = () => {
        setHasRemainder((prevRemainder) => !prevRemainder)
    };

    const handleRemainderDateChange = (e) => {
        setRemainder(e.value)
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
        add({
            itemName: title,
            itemType,
            statusId,
            priorityId,
            hasRemainder,
            remainder,
            isFav,
            tag,
            description,
            diagrams,
            dependencies: (itemType === 'feature') ? [] : (itemType === 'epic') ? epicItems : blItems,
            relatedParent: (itemType === 'feature') ? null : (itemType === 'epic') ? relatedFeature : relatedEpic,
            story,
            storyPoints,
            storyTasks,
            progress,
        }, 10, "itemName", title, 'Item Name', { proId: id })
    };

    const handleOnHtmlTextChange = (e) => {
        try {
            setStory(e.value)
        } catch (er) {

        }
    };

    const storyIncrease = () => {
        setStoryHeight((prevHeight) => prevHeight + 200)
    };

    const storyDecrease = () => {
        if (storyHeight > 300) {
            setStoryHeight((prevHeight) => prevHeight - 200)
        }
    };

    useEffect(() => {
        if (success) {
            setOpenSnack(true)
            clearSuccess()

            setDescription('');
            setTag('')
            setTitle('')
            setProgress(0)
            setIsFav(false)
            setHasRemainder(false)
            setDiagrams([])
            setDiagramsVersion(preVersion => preVersion + 1)

            if (itemType === 'userStory') {
                setBLItems([])
                setBLItemsVersion((prevVersion) => prevVersion + 1)
                setStoryTasks([])
                setStoryTasksDataVersion(prevVersion => prevVersion + 1)
                setRelatedEpic('')
                setStory(null)
                setStoryPoints(0)
            } else if (itemType === 'epic') {
                setEpicItems([])
                setEpicItemsVersion((prevVersion) => prevVersion + 1)
                setRelatedFeature('')
            } 
            
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
                header="Add Product Backlog Item"
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

                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Item Type</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        defaultValue="feature"
                    >
                        <FormControlLabel onClick={() => handleItemType('feature')} value="feature" control={<Radio />} label="Feature" />
                        <FormControlLabel onClick={() => handleItemType('epic')} value="epic" control={<Radio />} label="Epic" />
                        <FormControlLabel onClick={() => handleItemType('userStory')} value="userStory" control={<Radio />} label="User Story" />
                    </RadioGroup>
                </FormControl>

                <FormControl sx={{ mb: 3 }} fullWidth>
                    <TextField
                        sx={{ mt: 1, width: '100%' }}
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={4}
                    >
                        <Grid item mt={2}>
                            <Typography variant="subtitle1" component="span">
                                Status
                            </Typography>
                            <ComboStatus selectedStatus={statusId} handleStatusChanged={handleStatusChanged} />
                        </Grid>
                        <Grid item mt={2}>
                            <Typography variant="subtitle1" component="span">
                                Priority
                            </Typography>
                            <ComboPriority selectedPriority={priorityId} handlePriorityChanged={handlePriorityChanged} />
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid item>
                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                            >
                                <Grid item>
                                    <Typography variant="subtitle1" component="span">
                                        Remainder
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Checkbox onClick={handleRemainderCheck} {...label} checked={hasRemainder} />
                                </Grid>
                                {hasRemainder &&
                                    <Grid item>
                                        <ComboDateTime value={remainder} onValueChanged={handleRemainderDateChange} />
                                    </Grid>
                                }
                            </Grid>
                        </Grid>

                        <Grid item>
                            <FormControlLabel
                                control={<Android12Switch checked={isFav} onChange={handleIsFav} />}
                                label="Favorite"
                            />
                        </Grid>
                    </Grid>
                </FormControl>

                <FormControl sx={{ mb: 3 }} fullWidth>
                    <TextField
                        sx={{ mt: 1, width: '100%' }}
                        label="Tags"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                    />
                </FormControl>

                {(itemType === 'userStory') &&
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        mb={1}

                    >
                        <Grid item>
                            <Typography variant="subtitle1" component="span">
                                User Story
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="caption" component="span">
                                Story Height
                            </Typography>
                        </Grid>
                        <Grid item>
                            <ButtonGroup variant="contained" aria-label="outlined primary button group" size="small" color="secondary">
                                <Button onClick={storyIncrease}>+</Button>
                                <Button onClick={storyDecrease}>-</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                }

                {(itemType === 'userStory') &&
                    <HtmlTextEditor height={`${storyHeight}px`} handleOnHtmlTextChange={handleOnHtmlTextChange} />
                }

                {(itemType === 'userStory') &&
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={1}
                    >
                        <Grid item>
                            <Typography variant="subtitle1" component="span" mr={2}>
                                Progress
                            </Typography>
                            <NumberBox
                                showSpinButtons={true}
                                defaultValue={0}
                                rtlEnabled={false}
                                min={0}
                                max={100}
                                onValueChanged={(e) => setProgress(e.value)}
                            />
                        </Grid>
                        <Grid item>
                            <ProgressBar2Values ranges={ranges} value={progress} startValue={0} endValue={100} tickInterval={25} subValues={[0, 100]} />
                        </Grid>
                    </Grid>
                }

                {(itemType === 'userStory') &&
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={1}
                        mb={3}
                    >
                        <Grid item>
                            <Typography variant="subtitle1" component="span">
                                Story Point
                            </Typography>
                            <NumberBox
                                showSpinButtons={true}
                                defaultValue={storyPoints}
                                rtlEnabled={false}
                                min={1}
                                max={100}
                                onValueChanged={(e) => setStoryPoints(e.value)}
                            />
                        </Grid>
                    </Grid>
                }

                {(itemType === 'userStory') &&
                    <div>
                        <Typography variant="subtitle1" component="span">
                            Tasks
                        </Typography>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            mb={1}
                            spacing={1}
                        >
                            <Grid item sx={{ width: '60%' }}>
                                <TextField
                                    sx={{ width: '100%' }}
                                    size="small"
                                    label=""
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)}
                                />
                            </Grid>
                            <Grid item>
                                <Button onClick={handleAddNewTask} variant="contained" size="small" color="secondary">Add</Button>
                            </Grid>
                            <Grid item>
                                <Button onClick={handleDeleteAllTasks} variant="contained" size="small" color="error">Delete All</Button>
                            </Grid>
                        </Grid>
                        <TasksTable
                            tasks={storyTasks}
                            setTaskPending={handleSetTasksPending}
                            setTaskOpen={handleSetTasksOpen}
                            setTaskDone={handleSetTasksDone}
                            setTaskDelete={handleSetTasksDelete}
                            dataVersion={storyTasksDataVersion}
                        />
                    </div>
                }

                {(itemType !== 'userStory') &&
                    <div>
                        <Typography variant="subtitle1" component="span" mt={4}>
                            Description
                        </Typography>
                        <TextArea
                            height={90}
                            width={'100%'}
                            value={description}
                            onValueChanged={(e) => setDescription(e.value)}
                        />
                    </div>
                }

                {(itemType === 'userStory') &&
                    <div style={{ marginTop: '40px' }}>
                        <Typography variant="subtitle1" component="span">
                            Dependencies (Backlog Items)
                        </Typography>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            mb={1}
                            spacing={1}
                        >
                            <Grid item>
                                <Button onClick={handleAddDependency} variant="contained" size="small" color="secondary">Add</Button>
                            </Grid>
                            <Grid item>
                                <Button onClick={handleSetDependRemoveAll} variant="contained" size="small" color="error">Remove All</Button>
                            </Grid>
                        </Grid>
                        <BLItemsTable
                            bl={blItems}
                            setItemIdle={handleSetDependIdle}
                            setItemBlocked={handleSetDependBlocked}
                            setItemStarted={handleSetDependStarted}
                            setItemOnReview={handleSetDependOnReview}
                            setItemDone={handleSetDependDone}
                            setItemProgress={handleSetDependProgress}
                            setItemRemove={handleSetDependRemove}
                            dataVersion={blItemsVersion}
                        />
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            mt={4}
                        >
                            <Grid item xs={12} md={12} lg={12}>
                                <Typography variant="subtitle1" component="span">
                                    Related Epic (Unfinished Only)
                                </Typography>
                                <ComboBox
                                    size="small"
                                    variant="outlined"
                                    color="primary"
                                    items={openEpics}
                                    selectValue={relatedEpic}
                                    label="Epic"
                                    minWidth="100%"
                                    handleSelect={handleSelectRelatedEpic}
                                />
                            </Grid>
                        </Grid>
                    </div>
                }

                {(itemType === 'epic') &&
                    <div style={{ marginTop: '40px' }}>
                        <Typography variant="subtitle1" component="span">
                            Dependencies (Epics)
                        </Typography>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            mb={1}
                            spacing={1}
                        >
                            <Grid item>
                                <Button onClick={handleAddDependency} variant="contained" size="small" color="secondary">Add</Button>
                            </Grid>
                            <Grid item>
                                <Button onClick={handleSetDependRemoveAll} variant="contained" size="small" color="error">Remove All</Button>
                            </Grid>
                        </Grid>
                        <BLItemsTable
                            bl={epicItems}
                            setItemIdle={handleSetDependIdle}
                            setItemBlocked={handleSetDependBlocked}
                            setItemStarted={handleSetDependStarted}
                            setItemOnReview={handleSetDependOnReview}
                            setItemDone={handleSetDependDone}
                            setItemProgress={handleSetDependProgress}
                            setItemRemove={handleSetDependRemove}
                            dataVersion={epicItemsVersion}
                        />
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            mt={4}
                        >
                            <Grid item xs={12} md={12} lg={12}>
                                <Typography variant="subtitle1" component="span">
                                    Related Feature (Unfinished Only)
                                </Typography>
                                <ComboBox
                                    size="small"
                                    variant="outlined"
                                    color="primary"
                                    items={openFeature}
                                    selectValue={relatedFeature}
                                    label="Feature"
                                    minWidth="100%"
                                    handleSelect={handleSelectRelatedFeature}
                                />
                            </Grid>
                        </Grid>
                    </div>
                }

                <div style={{ width: '100%', marginTop: '40px' }}>
                    <Typography variant="subtitle1" component="span">
                        Diagrams
                    </Typography>
                </div>
                <FormControl sx={{ mb: 1 }} fullWidth>
                    <TextField
                        sx={{ mt: 1, width: '100%' }}
                        label="Diagram Name"
                        value={tempDiagramName}
                        onChange={(e) => setTempDiagramName(e.target.value)}
                    />
                    <TextField
                        sx={{ mt: 1, width: '100%' }}
                        label="Type"
                        value={tempDiagramType}
                        onChange={(e) => setTempDiagramType(e.target.value)}
                    />
                </FormControl>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={1}
                    mb={3}
                >
                    <Grid item>
                        <Button onClick={handleAddNewDiagram} variant="contained" size="small" color="secondary">Add</Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={handleDiagramRemoveAll} variant="contained" size="small" color="error">Remove All</Button>
                    </Grid>
                </Grid>
                <DiagramTable
                    diagrams={diagrams}
                    setItemRemove={handleDiagramRemove}
                    dataVersion={diagramsVersion}
                />

                <FormControl fullWidth sx={{ mb: 2 }}>
                    {(error) && <Typography variant="BUTTON" component="span" gutterBottom color="error">
                        {error}
                    </Typography>}
                    {(internalError) && <Typography variant="BUTTON" component="span" gutterBottom color="error">
                        {internalError}
                    </Typography>}
                </FormControl>



                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-end"
                >
                    <Grid item>
                        <Button disabled={isPending} onClick={handleAdd} variant="contained" >Add Item</Button>
                    </Grid>

                </Grid>

            </PageLayout >

        </div >
    )
};

export default AddPBI;