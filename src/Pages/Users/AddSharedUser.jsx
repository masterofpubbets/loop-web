import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../Components/Layout/PageLayout";
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PeopleIcon from '@mui/icons-material/People';
import { WsContext } from "../../Context/WSContext";
import { useOtherUsers } from "../../Hooks/useOtherUsers";
import ListObjects from "../../Components/Lists/ListObjects";
import { usersFilterHeader } from '../Workspace/comboFilter';


const AddSharedUser = () => {
    const nav = useNavigate();
    const { currentWorkspace } = useContext(WsContext);
    const { users, sharedUsers, sharedUsersVersion, usersVersion } = useOtherUsers(currentWorkspace.id);
    const [allUsers, setAllUsers] = useState([]);
    const [allusersVersion, setAllUsersVersion] = useState(0);


    useEffect(() => {
        let allUsersTemp = [];

        users.map((n) => {
            const sharedStatus = () => {
                for (var i = 0; i < sharedUsers.length; i++) {
                if (n.uid === sharedUsers[i].uid) {
                    return true;
                }
            }
            return false
        }

            allUsersTemp.push({
                displayName: n.displayName,
                id: n.id,
                uid: n.uid,
                email: n.email,
                shared: sharedStatus()
            })
        });
        setAllUsers(allUsersTemp);
        setAllUsersVersion(prev => prev + 1);
    }, [usersVersion, sharedUsersVersion]);




    const handleBack = () => {
        nav(-1)
    };

    return (

        <PageLayout
            header="Shared Users"
            icon={<PeopleIcon color="error" />}
            marginContent={4}
            rightButton={
                <Button onClick={handleBack} variant="contained" startIcon={<ArrowBackIcon />} color="secondary" size="small">
                    Back
                </Button>
            }
        >

            <ListObjects listName="Users" data={allUsers} filterHeader={usersFilterHeader} dataVersion={allusersVersion} />

        </PageLayout>
    )
};

export default AddSharedUser;