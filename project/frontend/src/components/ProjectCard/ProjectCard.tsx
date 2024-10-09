

import { useNavigate } from "react-router-dom";

// ***************** Componets ***************** //
import CircleGraph from "../../components/CircleGraph/CircleGraph";

// ***************** Helpers ******************* //
import formatDate from "../../helpers/formatDate";

// ****************** styles ******************* //
import styles from "./ProjectCard.module.css";

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

const ProjectCard = ({ project }: { project: Project }) => {
    const navigate = useNavigate();
    return (
        <div
            className={styles.project}
            onClick={() => navigate(`/projects/${project.id}/show`)}
        >
            <div className={styles.left}>
                <p className={styles.type}>
                    {project.type === "sexuality"
                        ? "Sexualidad"
                        : project.type === "nutrition"
                        ? "Nutrición"
                        : "Agua"}
                </p>
                <p className={styles.name}>
                    {project.name}
                    <span>{project.description}</span>
                </p>
                <p className={styles.since}>
                    Creado el <span>{formatDate(project.createdAt)}</span> por{" "}
                    <span>
                        {project.creator.name} {project.creator.surname}
                    </span>
                </p>
            </div>
            <div className={styles.right}>
                <div className={styles.graphs}>
                    <CircleGraph
                        heading="Recaudado"
                        amount={project.money_raised}
                        money
                        target={project.money_goal}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
