import { useState } from "react";
import { List, useGetList } from "react-admin";
import { useNavigate } from "react-router-dom";

// ***************** Helpers ***************** //
import formatDate from "../../helpers/formatDate";

// ***************** Styles ***************** //
import styles from "./ProjectList.module.css";

// ***************** Componets ***************** //
import Toolbar from "../../components/Toolbar/Toolbar";
import Actions from "../../components/Actions/Actions";
import CircleGraph from "../../components/CircleGraph/CircleGraph";

type Project = {
    id: string;
    name: string;
    description: string;
    money_goal: number;
    money_raised: number;
    createdAt: string;
    creator: { name: string; surname: string };
    type: string;
};

const ProjectListView = ({ data }: { data: Array<Project> }) => {
    const navigate = useNavigate();
    return (
        <div className={styles.projects}>
            {data &&
                data.map((record) => (
                    <div 
                        key={record.id} 
                        className={styles.project}
                        onClick={() => navigate(`/projects/${record.id}/show`)}
                    >
                        <div className={styles.left}>
                            <p className={styles.type}>
                                {record.type === "sexuality"
                                    ? "Sexualidad"
                                    : record.type === "nutrition" ? "Nutrición" : "Agua"}
                            </p>
                            <p className={styles.name}>
                                {record.name}
                                <span>{record.description}</span>
                            </p>
                            <p className={styles.since}>
                                Creado el {" "}
                                <span>{formatDate(record.createdAt)}</span>
                                {" "} por {" "}
                                <span>{record.creator.name} {record.creator.surname}</span>
                            </p>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.graphs}>
                                <CircleGraph
                                    heading="Recaudado"
                                    amount={record.money_raised}
                                    money
                                    target={record.money_goal}
                                />
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export const ProjectList = () => {
    const [filter, setFilter] = useState("");
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const { data, total, isPending } = useGetList<Project>("projects", {
        filter: { q: filter },
        pagination: { page, perPage },
        sort: { field: "name", order: "ASC" },
    });

    if (isPending) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h1 className={styles.heading}>Proyectos</h1>
            <List emptyWhileLoading actions={false} pagination={false}>
                <div className={styles.content}>
                    <div className={styles.table}>
                        <Actions
                            filter={filter}
                            setFilter={setFilter}
                            entity="proyecto"
                        />
                        <ProjectListView data={data || []} />
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