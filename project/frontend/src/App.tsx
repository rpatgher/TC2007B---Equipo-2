import { Admin, Resource, ListGuesser } from "react-admin";
import authProvider from "./authProvider";
import dataProvider from "./dataProvider";

function App() {

    return (
        <Admin 
            authProvider={authProvider}
            dataProvider={dataProvider}
        >
            <Resource name="users" list={ListGuesser} />
        </Admin>
    )
}

export default App
