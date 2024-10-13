import { useState } from "react";
import { List, useGetList } from "react-admin";

// ***************** Styles ***************** //
import styles from "./ProjectList.module.css";

// ***************** Componets ***************** //
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import Toolbar from "../../components/Toolbar/Toolbar";
import Actions from "../../components/Actions/Actions";

// ******************** Animation **************************
import AnimationComponent from '../../components/AnimationComponent/AnimationComponent';

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
    return (
        <div className={styles.projects}>
            {data &&
                data.map((record) => (
                    <ProjectCard
                        key={record.id}
                        project={record}
                    />
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
            <AnimationComponent>
                <h1 className={styles.heading}>Proyectos</h1>
            </AnimationComponent>
            <List emptyWhileLoading actions={false} pagination={false}>
                <div className={styles.content}>
                    <div className={styles.table}>
                        <Actions
                            filter={filter}
                            setFilter={setFilter}
                            entity="proyecto"
                            createPath="/dashboard/projects/create"
                        />
                        <AnimationComponent dir="down">
                            <ProjectListView data={data || []} />
                        </AnimationComponent>
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
