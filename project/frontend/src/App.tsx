import { 
    Admin, 
    Resource, 
    ListGuesser,
} from "react-admin";
import authProvider from "./authProvider";
import dataProvider from "./dataProvider";
import lightTheme from "./lightTheme";
import { Dashboard } from "./pages/Dashboard/Dashboard";

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


// import {
//     DonationList
// } from "./pages/Donation/DonationComponents";


import { Layout } from "./Layout/Layout";

function App() {
    return (
        <Admin 
            authProvider={authProvider}
            dataProvider={dataProvider}
            dashboard={Dashboard}
            theme={lightTheme}
            layout={Layout}
            darkTheme={null}
        >
            {permissions => (
                <>
                    <Resource 
                        name="donations" 
                        list={DonationList}
                        create={permissions === 'admin' ? DonationCreateAdmin : DonationCreateDonor}
                        show={DonationShow}
                        edit={permissions === 'admin' ? DonationUpdateAdmin : null}
                    />
                    {permissions === "admin" && (
                        <>
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

export default App
