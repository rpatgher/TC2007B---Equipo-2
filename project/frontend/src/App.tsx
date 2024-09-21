import { 
    Admin, 
    Resource, 
    ListGuesser,
} from "react-admin";
import authProvider from "./authProvider";
import dataProvider from "./dataProvider";
import { Dashboard } from "./pages/Dashboard";





function App() {
    return (
        <Admin 
            authProvider={authProvider}
            dataProvider={dataProvider}
            dashboard={Dashboard}
        >
            {permissions => (
                <>
                    <Resource 
                        name="donations" 
                        list={ListGuesser}
                    />
                    {permissions === "admin" && (
                        <Resource 
                            name="users" 
                            list={ListGuesser}
                        />
                    )}
                </>
            )}
        </Admin>
    )
}

export default App
