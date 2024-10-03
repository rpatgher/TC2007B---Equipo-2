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
                    <div key={record.id} className={styles.project}>
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
                            <button
                                className={styles["edit-button"]}
                                onClick={() => navigate(`/projects/${record.id}`)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                                {/* Editar */}
                            </button>
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
