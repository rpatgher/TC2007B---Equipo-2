import { Admin, Resource, ListGuesser } from "react-admin";

function App() {

    return (
        <Admin>
            <Resource name="users" list={ListGuesser} />
        </Admin>
    )
}

export default App
