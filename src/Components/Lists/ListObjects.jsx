import React, { Fragment, useState, useEffect } from "react";
import WorkspaceCard from '../../Pages/Workspace/WorkspaceCard';
import ContactsCard from "../../Pages/Contacts/ContactsCard";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PaginationControlled from "../Pagination/PaginationControlled";
import ComboBox from "../ComboBox/ComboBox";
import { standardOperators, itemsPerPageSelection } from '../../Consts/Operators';
import DataTable from "../DataViews/DataTable";
import { workspaceColumns } from '../../Consts/Workspace';
import { contactColumns } from "../../Consts/Contacts";
import AlertDialog from "../Dialogs/AlertDialog";
import { useDelete } from "../../Hooks/Common/useDelete";
import CircularColor from "../Bars/CircularColor";
import ProductCard from "../../Pages/Navs/Product/ProductCard";
import { productsColumns } from "../../Consts/Products";
import PBIsCard from "../../Pages/Products/PBIs/PBIsCard";
import ProjectCard from "../../Pages/Navs/Project/ProjectCard";
import { projectColumns } from "../../Consts/Projects";
import UserCard from "../../Pages/Users/UserCard";



const ListObjects = ({ listName, data, filterHeader, dataVersion }) => {
    const [viewType, setViewType] = useState(0);
    const [searchInValue, setSearchInValue] = useState('None');
    const [searchValue, setSearchValue] = useState('');
    const [searchOperator, setSearchOperator] = useState('=');
    const [filterData, setFilterData] = useState(data);
    const [pagedData, setPagedData] = useState(data);
    const [pageIndex, setPageIndex] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogMes, setDialogMes] = useState('');
    const [dialogButton, setDialogButton] = useState(null);
    const { deleteContact, isPending: isDeletePending, deleteWorkspace, deleteError, deleteProduct } = useDelete();
    


    const handleOpenDeleteAllDialog = () => {
        setOpenDialog(true);
        setDialogButton('DELETE')
        switch (listName) {
            case "Workspace":
                setDialogMes(`Are you sure you want to delete all ${listName} below and all of its children? NOTE: Default Workspace Cannot Be Deleted.`)
                break;
            default:
                setDialogMes(`Are you sure you want to delete all ${listName} below and all of its children?`)
                break;
        }

    };

    const handleDialogClosed = (state) => {
        setOpenDialog(false);
        if (state) {
            //handle accept
            if (dialogButton === 'DELETE') {
                switch (listName) {
                    case "Contacts":
                        filterData.forEach(async d => await deleteContact(['id', '==', d.id]))
                        break;
                    case "Workspace":
                        filterData.forEach(async d => await deleteWorkspace(['id', '==', d.id]))
                        break;
                    case "Products":
                        filterData.forEach(async d => await deleteProduct(['id', '==', d.id]))
                        break;
                    case "Projects":
                        filterData.forEach(async d => await deleteProduct(['id', '==', d.id]))
                        break;
                    default:
                        return;
                }
            }
        } else {
            //handle reject
        }
    };

    const handleSelectItemsPerPage = (e) => {
        e.preventDefault();
        setPageIndex(1)
        setItemsPerPage(e.target.value);
    };

    const handleSearchInSelect = (e) => {
        setSearchInValue(e.target.value);
    };

    const handleSearchOperator = (e) => {
        setSearchOperator(e.target.value);
    };

    const handleSearchValue = (e) => {
        setSearchValue(e.target.value)
    };

    const handleClearFilter = (e) => {
        e.preventDefault();
        setFilterData(data);
        setSearchInValue('None');
        setSearchValue('');

        const result = data.filter((d, index) => ((index + 1) <= itemsPerPage) && ((index + 1) > 0))
        setPagedData(result);
    };

    const returnedPage = (page) => {
        setPageIndex(page)
    };

    const handleFilter = (e) => {
        e.preventDefault();
        if (searchInValue !== 'None') {
            let result = [];
            switch (searchOperator) {
                case '=':
                    result = data.filter(d => d[searchInValue] === searchValue)
                    break;
                case 'contains':
                    result = data.filter(d => d[searchInValue].search(searchValue) > -1)
                    break;
                case '>':
                    result = data.filter(d => d[searchInValue] > searchValue)
                    break;
                case '<':
                    result = data.filter(d => d[searchInValue] < searchValue)
                    break;
                case '>=':
                    result = data.filter(d => d[searchInValue] >= searchValue)
                    break;
                case '<=':
                    result = data.filter(d => d[searchInValue] <= searchValue)
                    break;
                case '<>':
                    result = data.filter(d => d[searchInValue] !== searchValue)
                    break;
                default:
                    break;
            }
            setPagedData(result);
            setFilterData(result);
        }
    };

    function renderListCard() {
        switch (listName) {
            case "Workspace":
                return (
                    pagedData && pagedData.map((d, index) => {
                        return (
                            <Grid key={index} item>
                                <WorkspaceCard title={d.workspaceName} id={d.id} description={d.description} createdAt={d.createdAt} photoURL={d.photoURL} isDefault={d.isDefault} />
                            </Grid>
                        )
                    }
                    ));

            case "Contacts":
                return (
                    pagedData && pagedData.map((d, index) => {
                        return (
                            <Grid key={index} item>
                                <ContactsCard contactName={d.contactName} company={d.companyName} id={d.id} email={d.email} job={d.job} photoURL={d.photoURL} phone={d.phone} mobile={d.mobile} workGroup={d.workGroup} address={d.address} companyPhotoURL={d.companyPhotoURL} />
                            </Grid>
                        )
                    }
                    ));

            case "Products":
                return (
                    pagedData && pagedData.map((d, index) => {
                        return (
                            <Grid key={index} item>
                                <ProductCard productName={d.productName} organization={d.organization} id={d.id} productType={d.productType} estInvestment={d.estInvestment} photoURL={d.photoURL} vision={d.vision} mission={d.mission} isFav={d.isFav} description={d.description} />
                            </Grid>
                        )
                    }
                    ));

            case "Backlog Items":
                return (
                    pagedData && pagedData.map((d, index) => {
                        return (
                            <Grid key={index} item>
                                <PBIsCard itemName={d.itemName} statusId={d.statusId} id={d.id} productType={d.productType} estInvestment={d.estInvestment} photoURL={d.photoURL} vision={d.vision} mission={d.mission} isFav={d.isFav} description={d.description} />
                            </Grid>
                        )
                    }
                    ));

            case "Projects":
                return (
                    pagedData && pagedData.map((d, index) => {
                        return (
                            <Grid key={index} item>
                                <ProjectCard projectName={d.projectName} client={d.client} id={d.id} proNo={d.proNo} location={d.location} photoURL={d.photoURL} appUUID={d.appUUID} description={d.description} />
                            </Grid>
                        )
                    }
                    ));

            case "Users":
                return (
                    pagedData && pagedData.map((d, index) => {
                        return (
                            <Grid key={index} item>
                                <UserCard displayName={d.displayName} email={d.email} uid={d.uid} photoURL={d.photoURL} sharedStatus={d.shared} />
                            </Grid>
                        )
                    }
                    ));

            default:
                return null
        }
    };

    function renderListTable() {
        switch (listName) {
            case "Workspace":
                return (
                    pagedData ? <DataTable rows={pagedData} columns={workspaceColumns} tableHeight={800} /> : null
                );

            case "Contacts":
                return (
                    pagedData ? <DataTable rows={pagedData} columns={contactColumns} tableHeight={800} /> : null
                );

            case "Products":
                return (
                    pagedData ? <DataTable rows={pagedData} columns={productsColumns} tableHeight={800} /> : null
                );

            case "Projects":
                return (
                    pagedData ? <DataTable rows={pagedData} columns={projectColumns} tableHeight={800} /> : null
                );

            default:
                return null
        }
    };


    function renderViewType() {
        switch (viewType) {
            case 0:
                return renderListCard();
            case 1:
                return renderListTable();
            default:
                return null

        }
    };


    useEffect(() => {
        const ident = itemsPerPage * pageIndex;
        const identLast = itemsPerPage * (pageIndex - 1);
        const result = filterData.filter((d, index) => ((index + 1) <= ident) && ((index + 1) > identLast))
        setPagedData(result);
    }, [pageIndex, itemsPerPage]);

    useEffect(() => {
        setFilterData(data);
        setSearchInValue('None');
        setSearchValue('');
        setPagedData(data);
        setFilterData(data);

        const result = data.filter((d, index) => ((index + 1) <= 10) && ((index + 1) > 0))
        setPagedData(result);
    }, [dataVersion]);

    return (
        <Fragment>

            <Grid container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
            >

                <Grid item>
                    <Grid container mb={1}>
                        <Grid item>
                            <ButtonGroup size="small" aria-label="outlined button group" color="success">
                                <Button onClick={() => setViewType(0)} variant={(viewType === 0) ? "contained" : "text"}>Cards</Button>
                                <Button onClick={() => setViewType(1)} variant={(viewType === 1) ? "contained" : "text"}>Table</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item>
                    <Grid container alignItems="flex-end">
                        <Grid item>
                            <ComboBox
                                size="small"
                                variant="standard"
                                color="warning"
                                label="Search In"
                                hasNone
                                items={filterHeader}
                                selectValue={searchInValue}
                                handleSelect={handleSearchInSelect}
                            />
                        </Grid>

                        <Grid item>
                            <ComboBox
                                size="small"
                                variant="standard"
                                color="warning"
                                items={standardOperators}
                                selectValue={searchOperator}
                                handleSelect={handleSearchOperator}
                            />
                        </Grid>

                        <Grid item>
                            <TextField onChange={handleSearchValue} id="standard-basic" label="Value" variant="standard" value={searchValue} color="warning" />
                        </Grid>
                        <Grid item>
                            <ButtonGroup size="small" aria-label="outlined button group" color="warning">
                                <Button onClick={handleFilter}>Apply</Button>
                                <Button onClick={handleClearFilter}>Clear</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>

            <Divider />

            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="baseline"
            >

                <Grid item>
                    <Grid
                        container
                        mt={2}
                        mb={4}
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-end"
                        spacing={2}
                    >

                        <Grid item>
                            <PaginationControlled dataLength={filterData.length} itemsPerPage={itemsPerPage} returnedPage={returnedPage} />
                        </Grid>
                        <Grid item>
                            <ComboBox
                                size="small"
                                color="primary"
                                label="Items"
                                items={itemsPerPageSelection}
                                selectValue={itemsPerPage}
                                handleSelect={handleSelectItemsPerPage}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant="overline" component="h6">
                                {`${listName}(s): ${filterData.length}`}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>

            <Grid container>
                <Grid item>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Grid item>
                            <Button disabled={isDeletePending} onClick={handleOpenDeleteAllDialog} variant="contained" color="error" size="small">Delete All</Button>
                        </Grid>
                        {isDeletePending &&
                            <Grid item>
                                <CircularColor color="error" />
                            </Grid>
                        }
                        {deleteError &&
                            <Grid item>
                                <Typography variant="overline" component="h6" color="error">
                                    {deleteError}
                                </Typography>
                            </Grid>
                        }
                    </Grid>

                </Grid>
            </Grid>

            <AlertDialog openDialog={openDialog} handleDialogClosed={handleDialogClosed} message={dialogMes} />

            <Grid container spacing={3} mt={2} mb={2} sx={{ width: '100%' }}>
                {renderViewType()}
            </Grid>


        </Fragment>
    )
};

export default ListObjects;