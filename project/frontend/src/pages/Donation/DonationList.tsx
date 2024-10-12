import { useState } from "react";
import { List, useGetList, usePermissions } from "react-admin";

// ***************** Styles ***************** //
import styles from "./DonationList.module.css";

// ***************** Componets ***************** //
import Toolbar from "../../components/Toolbar/Toolbar";
import Actions from "../../components/Actions/Actions";
import DonationCard from "../../components/DonationCard/DonationCard";
import DonationCardInShow from "../../components/DonationCard/DonationCardInShow";


type Donation = {
    id: string;
    amount: number;
    createdAt: string;
    donor: { name: string; surname: string };
    project: { name: string; description: string };
};

const DonationListView = ({ data }: { data: Array<Donation> }) => {
    const { permissions } = usePermissions();

    return (
        <div className={styles.donations}>
            {data &&
                data.map((record) => (
                    permissions === "admin" ? (
                        <DonationCard
                            key={record.id} 
                            donation={record}
                        />   
                    ) : (
                        <DonationCardInShow
                            key={record.id} 
                            donation={record}
                        />
                    )
                ))
            }
        </div>
    )
}


export const DonationList = () => {
    const { permissions } = usePermissions();
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
            <h1 className={styles.heading}>{permissions === 'admin' ? 'Donaciones' : 'Historial de Donaciones'}</h1>
            <List emptyWhileLoading actions={false} pagination={false}>
                <div className={styles.content}>
                    <div className={styles.table}>
                        <Actions
                            filter={filter}
                            setFilter={setFilter}
                            entity="donación"
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