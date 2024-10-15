import { 
    Admin, 
    CustomRoutes, 
    Resource
} from "react-admin";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import authProvider from "./authProvider";
import dataProvider from "./dataProvider";
import lightTheme from "./lightTheme";
import { Dashboard } from "./pages/Dashboard/Dashboard";

// ************ Custom Pages ************
import Settings from "./pages/Settings/Settings";

// ************ User Components ************
import { UserList } from "./pages/User/UserList";
import { UserShow } from "./pages/User/UserShow";
import { UserCreate, UserUpdate } from "./pages/User/UserCU";

// ************ Project Components ************
import { ProjectList } from "./pages/Project/ProjectList";
import { ProjectShow } from "./pages/Project/ProjectShow";
import { ProjectCreate, ProjectUpdate } from "./pages/Project/ProjectCU";

// ************ Donation Components ************
import { DonationList } from "./pages/Donation/DonationList";
import { DonationShow } from "./pages/Donation/DonationShow";
import { DonationCreateAdmin, DonationUpdateAdmin, DonationCreateDonor } from "./pages/Donation/DonationCU";


// *********+** Success Page ************
import Success from "./pages/Success/Success";


// ************ Login Page ************
import Login from "./pages/Login/Login";
// *********** Register Page **********
import Register from "./pages/Register/Register";
// *********** Forgot Page **********
import Forgot from "./pages/Forgot/Forgot";
// *********** ResetPassword Page **********
import ResetPassword from "./pages/ResetPassword/ResetPassword";
// *********** AccountConfirmed Page **********
import AccountConfirmed from "./pages/AccountConfirmed/AccountConfirmed";

// ************ Homepage ************
import Homepage from "./pages/Homepage/Homepage";



// import {
//     DonationList
// } from "./pages/Donation/DonationComponents";


import { Layout } from "./Layout/Layout";

function DashboardPages() {
    return (
        <Admin 
            authProvider={authProvider}
            dataProvider={dataProvider}
            basename="/dashboard"
            loginPage={Login}
            dashboard={Dashboard}
            theme={lightTheme}
            layout={Layout}
            darkTheme={null}
        >
            <CustomRoutes noLayout>
                <Route path="/register" element={<Register />} />
                <Route path="/forgot" element={<Forgot />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/confirmed-account/:token" element={<AccountConfirmed />} />
            </CustomRoutes>
            {permissions => (
                <>
                    <Resource 
                        name="donations" 
                        list={DonationList}
                        create={permissions === 'admin' ? DonationCreateAdmin : DonationCreateDonor}
                        show={DonationShow}
                        edit={permissions === 'admin' ? DonationUpdateAdmin : null}
                    />
                    <CustomRoutes>
                        <Route path="/success/:donationId" element={<Success />} />
                    </CustomRoutes>
                    {permissions === "admin" && (
                        <>
                            <CustomRoutes>
                                <Route path="/settings" element={<Settings />} />
                                <Route path="/success/:donationId" element={<Success />} />
                            </CustomRoutes>
                            <Resource 
                                name="users" 
                                list={UserList}
                                create={UserCreate}
                                edit={UserUpdate}
                                show={UserShow}
                            />
                            <Resource 
                                name="projects" 
                                list={ProjectList}
                                create={ProjectCreate}
                                edit={ProjectUpdate}
                                show={ProjectShow}
                            />
                        </>
                    )}
                </>
            )}
        </Admin>
    )
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/dashboard/*" element={<DashboardPages />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
