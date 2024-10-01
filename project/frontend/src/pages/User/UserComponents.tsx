import { useState } from "react";
import {
    List,
    useGetList,
    CreateButton,
    ExportButton,
} from "react-admin";

import {
    Toolbar
} from "@mui/material";


import formatDate from "../../helpers/formatDate";

import styles from "./UserComponents.module.css";

import CircleGraph from "../../components/CircleGraph/CircleGraph";
import CardGraph from "../../components/CardGraph/CardGraph";

type User = {
	id: string;
	name: string;
	surname: string;
	email: string;
    role: string;
    created_at: string;
};

const UserListView = ({ data }: { data: Array<{ id: any, name: String, surname: String, role: String, email: String, createdAt: String, donations: Array<{ amount: Number }> }> | Array<any> }) => {
    return (
        <div className={styles.users}>
            {data && data.map((record) => (
                <div key={record.id} className={styles.user}>
                    <div className={styles.left}>
                        <p className={styles.role}>{record.role === 'donor' ? 'Donador' : 'Administrador'}</p>
                        <p className={styles.name}>
                            {record.name} {record.surname}
                            <span>
                                {record.email}
                            </span>
                        </p>
                        {/* <p>{record.email}</p> */}
                        <p className={styles.since}>Desde: <span>{formatDate(record.createdAt)}</span></p>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.graphs}>
                            <CardGraph 
                                heading="Donaciones"
                                amount={record?.donations?.length}
                            />
                            <CardGraph 
                                heading="Total donado"
                                amount={record?.donations?.reduce((acc, donation) => acc + donation.amount, 0)}
                                money
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
};
export const UserList = () => {
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const { data, total, isPending } = useGetList<User>('users', {
        filter: { q: filter },
        pagination: { page, perPage },
        sort: { field: 'name', order: 'ASC' }
    });

    if (isPending) {
        return <p>Loading...</p>
    }

    return (
        <>
            <h1 className={styles.heading}>Donadores</h1>
            <List 
                emptyWhileLoading
                actions={false}
                pagination={false}
            >
                <div className={styles.actions}>
                    <CreateButton />
                    <ExportButton />            
                </div>
                <UserListView 
                    data={data || []}
                />
                <Toolbar
                    className={styles.toolbar}
                >
                    <div className={styles["row-per-page"]}>
                        <p>Filas por página: </p>
                        <select 
                            name="per-page" 
                            id="per-page"
                            value={perPage}
                            onChange={(e) => {
                                setPerPage(parseInt(e.target.value));
                                setPage(1);
                            }}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">20</option>
                            <option value="50">50</option>
                        </select>
                        <p className={styles.range}>{(page - 1) * perPage + 1} - {(page - 1) * perPage + perPage > total ? total : (page - 1) * perPage + perPage} de {total}</p>
                    </div>
                    <div className={styles.pages}>
                        <button 
                            onClick={() => setPage(page - 1)}
                            className={`${styles["previous-page"]} ${page <= 1 ? styles.disabled : ''}`}
                            disabled={page <= 1}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
                        </button>
                        {[...Array(Math.ceil(total / perPage)).keys()].map((i) => (
                            <button
                                onClick={() => setPage(i + 1)}
                                key={i}
                                className={`${styles["page-button"]} ${i + 1 === page ? styles.active : ''}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        
                        <button 
                            onClick={() => setPage(page + 1)}
                            className={`${styles["next-page"]} ${page >= Math.ceil(total / perPage) ? styles.disabled : ''}`}
                            disabled={page >= Math.ceil(total / perPage)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
                        </button>
                    </div>
                </Toolbar>
            </List>
        </>
    );
};

export const UserShow = () => {};

export const UserEdit = () => {};

export const UserCreate = () => {};
