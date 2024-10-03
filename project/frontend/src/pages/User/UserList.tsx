import { useState } from "react";
import { List, useGetList } from "react-admin";

// ***************** Helpers ***************** //
import formatDate from "../../helpers/formatDate";

// ***************** Styles ***************** //
import styles from "./UserList.module.css";

// ***************** Components ***************** //
import Toolbar from "../../components/Toolbar/Toolbar";
import Actions from "../../components/Actions/Actions";
import CardGraph from "../../components/CardGraph/CardGraph";

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
                    <div key={record.id} className={styles.user}>
                        <div className={styles.left}>
                            <p className={styles.role}>
                                {record.role === "donor"
                                    ? "Donador"
                                    : "Administrador"}
                            </p>
                            <p className={styles.name}>
                                {record.name} {record.surname}
                                <span>{record.email}</span>
                            </p>
                            {/* <p>{record.email}</p> */}
                            <p className={styles.since}>
                                Desde:{" "}
                                <span>{formatDate(record.createdAt)}</span>
                            </p>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.graphs}>
                                <CardGraph
                                    heading="Donaciones"
                                    amount={record?.donations?.length}
                                />
                                <CardGraph
                                    heading="Total donado"
                                    amount={record?.donations?.reduce(
                                        (
                                            acc: number,
                                            donation: { amount: number }
                                        ) => acc + donation.amount,
                                        0
                                    )}
                                    money
                                />
                            </div>
                        </div>
                    </div>
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
            <h1 className={styles.heading}>Donadores</h1>
            <List emptyWhileLoading actions={false} pagination={false}>
                <div className={styles.content}>
                    <div className={styles.table}>
                        <Actions
                            filter={filter}
                            setFilter={setFilter}
                            entity="donador"
                        />
                        <UserListView data={data || []} />
                        <Toolbar
                            perPage={perPage}
                            setPerPage={setPerPage}
                            page={page}
                            setPage={setPage}
                            total={total || 0}
                        />
                    </div>
                    <aside className={styles.sidebar}></aside>
                </div>
            </List>
        </>
    );
};

export const UserShow = () => {};

export const UserEdit = () => {};
