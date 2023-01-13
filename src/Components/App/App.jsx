import { Route, Routes, Navigate } from "react-router-dom";
import React, { useContext } from "react";
import Home from "../../Pages/Home/Home";
import Profile from "../../Pages/Profile/Profile";
import { useUser } from "../../Hooks/useUser";
import Login from "../../Pages/Login/Login";
import SignUpMail from "../../Pages/SignUp/SignUpMail";
import LoginMail from "../../Pages/Login/LoginMail";
import ResetPass from "../../Pages/ResetPassword/ResetPass";
import { useTheme } from "../../Hooks/useTheme";
import { WsContext } from "../../Context/WSContext";
import AddWorkspace from "../../Pages/Workspace/AddWorkspace";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import WorkspaceList from "../../Pages/Workspace/WorkspaceList";
import WorkspaceSettings from "../../Pages/Workspace/WorkspaceSettings";
import WorkspaceAdmin from "../../Pages/Workspace/WorkspaceAdmin";
import AddProject from "../../Pages/Projects/AddProject";
import ProjectSettings from "../../Pages/Projects/ProjectSettings";
import AddSharedUser from "../../Pages/Users/AddSharedUser";
import LoopsMenu from "../../Pages/Projects/Loops/LoopsMenu";
import ImportLoops from "../../Pages/Projects/Loops/ImportLoops";
import LoopFolder from "../../Pages/Projects/Loops/LoopFolder";




const App = () => {
    const { user } = useUser();
    const { preTheme } = useTheme();
    const theme = createTheme(preTheme);
    const { workspace } = useContext(WsContext);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <Routes>
                <Route
                    path="/"
                    exact
                    element={user ? <Home /> : <Navigate to="/login" />}
                />

                <Route
                    path="/workspaces"
                    exact
                    element={user ? <WorkspaceList /> : <Navigate to="/login" />}
                />

                <Route
                    path="/newworkspace"
                    exact
                    element={user ? <AddWorkspace /> : <Navigate to="/login" />}
                />

                <Route
                    path="/workspace/:id"
                    element={user ? <WorkspaceSettings /> : <Navigate to="/login" />}
                />

                <Route
                    path="/workspaceadmin"
                    exact
                    element={user ? <WorkspaceAdmin /> : <Navigate to="/login" />}
                />

                <Route
                    path="/login"
                    exact
                    element={!user ? <Login /> : <Navigate to="/" />}
                />

                <Route
                    path="/signupmail"
                    exact
                    element={!user ? <SignUpMail /> : <Navigate to="/" />}
                />

                <Route
                    path="/loginmail"
                    exact
                    element={!user ? <LoginMail /> : <Navigate to="/" />}
                />

                <Route
                    path="/profile"
                    exact
                    element={!user ? <Login /> : <Profile />}
                />

                <Route
                    path="/resetpassword"
                    exact
                    element={user ? <Home /> : <ResetPass />}
                />

                <Route
                    path="/addproject"
                    exact
                    element={user ? (user.userType === 'master') ? <AddProject /> : <Navigate to="/" />
                        : <Navigate to="/login" />}
                />

                <Route
                    path="/project/:id"
                    element={user ? <ProjectSettings /> : <Navigate to="/login" />}
                />

                <Route
                    path="/addshareduser"
                    element={user ? <AddSharedUser /> : <Navigate to="/login" />}
                />

                <Route
                    path="/loopfolders/:appUUID"
                    element={user ? <LoopsMenu /> : <Navigate to="/login" />}
                />

                <Route
                    path="/importloops/:appUUID"
                    element={user ? <ImportLoops /> : <Navigate to="/login" />}
                />

                <Route
                    path="/loopfolder/:appUUID/:tag"
                    element={user ? <LoopFolder /> : <Navigate to="/login" />}
                />

            </Routes>

        </ThemeProvider>
    );
};

export default App;
