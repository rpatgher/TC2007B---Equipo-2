import { useState } from "react";
import { List, useGetList } from "react-admin";

// ***************** Styles ***************** //
import styles from "./UserList.module.css";

// ***************** Components ***************** //
import Toolbar from "../../components/Toolbar/Toolbar";
import Actions from "../../components/Actions/Actions";
import UserCard from "../../components/UserCard/UserCard";

// ******************** Animation **************************
import AnimationComponent from '../../components/AnimationComponent/AnimationComponent';

type User = {
    id: string;
    name: string;
    surname: string;
    email: string;
    role: string;
    createdAt: string;
    donations: Array<{ amount: number }>;
};

const UserListView = ({ data }: {data: Array<User>}) => {
    return (
        <div className={styles.users}>
            {data &&
                data.map((record) => (
                    <UserCard 
                        key={record.id} 
                        user={record}
                    />
                ))}
        </div>
    );
};
export const UserList = () => {
    const [filter, setFilter] = useState("");
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const { data, total, isPending } = useGetList<User>("users", {
        filter: { q: filter },
        pagination: { page, perPage },
        sort: { field: "name", order: "ASC" },
    });

    if (isPending) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <AnimationComponent>
                <h1 className={styles.heading}>Donadores</h1>
            </AnimationComponent>
            <List emptyWhileLoading actions={false} pagination={false}>
                <div className={styles.content}>
                    <div className={styles.table}>
                        <Actions
                            filter={filter}
                            setFilter={setFilter}
                            entity="donador"
                            createPath="/dashboard/users/create"
                        />
                        <AnimationComponent dir="down">
                            <UserListView data={data || []} />
                        </AnimationComponent>
                        <Toolbar
                            perPage={perPage}
                            setPerPage={setPerPage}
                            page={page}
                            setPage={setPage}
                            total={total || 0}
                        />
                    </div>
                    <aside className={styles.sidebar}>
                        <AnimationComponent dir="right">
                            <div className={styles["sidebar-content"]}>
                                <p>Esta sección es donde puedes ver a todos los <span>donadores</span> que han aportado a la fundación. Puedes ver su información y el total de donaciones que han hecho.</p>
                                <p>Da click en un donador para ver más <span>información sobre él</span>. Puedes filtrar a los donadores por su nombre o correo electrónico.</p>
                                <p>De igual forma puedes agregar un nuevo <span>donador físico</span>. Esto permite llevar registro no sólo de los que donan a través de la plataforma, sino también de los que aportan por <span>otros medios</span>.</p>
                            </div>
                        </AnimationComponent>
                    </aside>
                </div>
            </List>
        </>
    );
};

export const UserShow = () => {};

export const UserEdit = () => {};
