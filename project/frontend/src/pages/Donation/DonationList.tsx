import { useState } from "react";
import { List, useGetList } from "react-admin";


// ***************** Helpers ***************** //
import formatDate from "../../helpers/formatDate";
import formatMoney from "../../helpers/formatMoney";

// ***************** Styles ***************** //
import styles from "./DonationList.module.css";

// ***************** Componets ***************** //
import Toolbar from "../../components/Toolbar/Toolbar";
import Actions from "../../components/Actions/Actions";


type Donation = {
    id: string;
    amount: number;
    createdAt: string;
    donor: { name: string; surname: string };
    project: { name: string; description: string };
};

const DonationListView = ({ data }: { data: Array<Donation> }) => {
    
    return (
        <div className={styles.donations}>
            {data &&
                data.map((record) => (
                    <div 
                        key={record.id} 
                        className={styles.donation}
                    >
                        <div className={styles.left}>
                            <p className={styles.name}>
                                {record.donor.name} {record.donor.surname}
                            </p>
                            <p className={styles.since}>
                                Donado el {" "}
                                <span>{formatDate(record.createdAt)}</span>
                            </p>
                        </div>
                        <div>
                            {record.project ? (
                                <p className={styles.project}>
                                    {record.project.name}
                                </p>
                            ) : (
                                <p className={styles.project}>
                                    Sin proyecto asignado
                                </p>
                            )}
                        </div>
                        <div className={styles.right}>
                            <p className={styles.amount}>{formatMoney(record.amount)}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}


export const DonationList = () => {
    const [filter, setFilter] = useState("");
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const { data, total, isPending } = useGetList<Donation>("donations", {
        filter: { q: filter },
        pagination: { page, perPage },
        sort: { field: "name", order: "ASC" },
    });

    if (isPending) {
        return <p>Loading...</p>;
    }

    return(
        <>
            <h1 className={styles.heading}>Donaciones</h1>
            <List emptyWhileLoading actions={false} pagination={false}>
                <div className={styles.content}>
                    <div className={styles.table}>
                        <Actions
                            filter={filter}
                            setFilter={setFilter}
                            entity="proyecto"
                        />
                        <DonationListView data={data || []} />
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
    )
}

export const DonationShow = () => {

}

export const DonationEdit = () => {

}

export const DonationCreate = () => {

}