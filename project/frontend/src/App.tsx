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
import { UserCreate } from "./pages/User/UserCreate";

// ************ Project Components ************
import { ProjectList } from "./pages/Project/ProjectList";
import { ProjectCreate, ProjectUpdate } from "./pages/Project/ProjectCU";

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
                        list={ListGuesser}
                    />
                    {permissions === "admin" && (
                        <>
                            <Resource 
                                name="users" 
                                list={UserList}
                                create={UserCreate}
                            />
                            <Resource 
                                name="projects" 
                                list={ProjectList}
                                create={ProjectCreate}
                                edit={ProjectUpdate}
                            />
                        </>
                    )}
                </>
            )}
        </Admin>
    )
}

export default App
