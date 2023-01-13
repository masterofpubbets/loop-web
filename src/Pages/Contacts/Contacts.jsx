import React, { useContext } from "react";
import PageLayout from "../../Components/Layout/PageLayout";
import { useContacts } from "../../Hooks/useContacts";
import { WsContext } from "../../Context/WSContext";
import Button from '@mui/material/Button';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ListObjects from "../../Components/Lists/ListObjects";
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import UploadIcon from '@mui/icons-material/Upload';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';


const Contacts = () => {
    const { currentWorkspace } = useContext(WsContext);
    const { contacts, contactsVersion } = useContacts(currentWorkspace.id);


    const filterHeader = [{
        title: 'Name',
        value: 'contactName'
    },
    {
        title: 'Phone',
        value: 'phone'
    }, {
        title: 'Mobile',
        value: 'mobile'
    },
    {
        title: 'Email',
        value: 'email'
    }, {
        title: 'Address',
        value: 'address'
    }, {
        title: 'Job',
        value: 'job'
    }, {
        title: 'Work Group',
        value: 'workGroup'
    }, {
        title: 'Company',
        value: 'companyName'
    }];

    return (
        <div>
            <PageLayout
                header="Contacts"
                icon={<ContactPhoneIcon color="primary" />}
                marginContent={4}
                rightButton={
                    <Grid
                        container
                        spacing={1}
                    >
                        <Grid item>
                            <Link to="/importcontacts">
                                <Button variant="contained" startIcon={<UploadIcon />} >
                                    Import
                                </Button>
                            </Link>
                        </Grid>

                        <Grid item>
                            <Link to="/newcontact">
                                <Button variant="contained" startIcon={<LibraryAddIcon />} >
                                    New
                                </Button>
                            </Link>
                        </Grid>

                    </Grid>
                }
            >

                <ListObjects listName="Contacts" data={contacts} filterHeader={filterHeader} dataVersion={contactsVersion} />

            </PageLayout>

        </div>
    )
};

export default Contacts;