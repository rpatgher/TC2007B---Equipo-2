import { useState } from "react";
import { List, useGetList, usePermissions } from "react-admin";

// ***************** Styles ***************** //
import styles from "./DonationList.module.css";

// ***************** Componets ***************** //
import Toolbar from "../../components/Toolbar/Toolbar";
import Actions from "../../components/Actions/Actions";
import DonationCard from "../../components/DonationCard/DonationCard";
import DonationCardInShow from "../../components/DonationCard/DonationCardInShow";
import { Link } from "react-router-dom";

// ******************** Animation **************************
import AnimationComponent from '../../components/AnimationComponent/AnimationComponent';


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

const Empty = () => {
    return (
        <div>
            <p>No se encontraron donaciones</p>
            <p>Aportarías mucho a la fundación para que pueda seguir ayudando a la gente <Link to='/dashboard/donations/create'>reliazando una donación</Link>.</p>
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
            <AnimationComponent>
                <h1 className={styles.heading}>{permissions === 'admin' ? 'Donaciones' : 'Historial de Donaciones'}</h1>
            </AnimationComponent>
            <List emptyWhileLoading actions={false} pagination={false} empty={<Empty />}>
                <div className={styles.content}>
                    <div className={styles.table}>
                        <Actions
                            filter={filter}
                            setFilter={setFilter}
                            entity="donación"
                            createPath="/dashboard/donations/create"
                        />
                        <AnimationComponent dir="down">
                            <DonationListView data={data || []} />
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
                            {permissions === 'admin' ? (
                                <div className={styles["sidebar-content"]}>
                                    <p>En esta sección se lleva un registro de <span>todas la donaciones</span> que entran a la fundación. Se observa que se listan mostrando el nombre del <span>donardor</span> correspondiente, así como el <span>monto</span>, la <span>fecha</span> y el <span>proyecto asignado</span>.</p>
                                    <p>De igual forma se pueden crear <span>donaciones físicas</span>, que se asocian con <span>donadores físicos</span>. Sin embargo, para todas las donaciones hechas por <span>donadores digitales</span> (a través de la plataforma), únicamente se le puede actualizar el proyecto asignado. Esto para guardar la <span>integridad de la información</span>.</p>
                                    <p>Dando click en cada una de las donaciones se muestra más <span>información</span> sobre la donación y el proyecto al que fue asignada, así como el <span>método de pago</span> que se utilizó.</p>
                                </div>
                            ) : (
                                <div className={styles["sidebar-content"]}>
                                    <p>En esta sección se lleva un registro de <span>todas la donaciones</span> que has hecho a la fundación. Se observa que se listan mostrando el <span>monto</span>, la <span>fecha</span> y el <span>proyecto asignado</span>.</p>
                                    <p>De igual forma se puedes seguir <span>aportando</span> con <span>donaciones</span> al proyecto que tú eligas o dejar que la fundación asigne tu donación al proyecto <span>que más lo necesite</span>.</p>
                                    <p>Dando click en cada una de las donaciones se muestra más <span>información</span> sobre la donación y el proyecto al que fue asignada, así como el <span>método de pago</span> que se utilizó.</p>
                                </div>
                            )}
                        </AnimationComponent>
                    </aside>
                </div>
            </List>
        </>
    )
}