import { useNavigate } from "react-router-dom";

// ***************** Helpers ******************* //
import formatDate from "../../helpers/formatDate";

// ***************** Componets ***************** //
import CircleGraph from "../../components/CircleGraph/CircleGraph";

// **************************** Styles ****************************
import styles from "./ProjectCardInShow.module.css";

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

const ProjectCardInShow = ({ project }: { project: Project }) => {
    const navigate = useNavigate();
    return (
        <div
            className={styles.project}
            onClick={() => project && navigate(`/projects/${project.id}/show`)}
        >
            <div className={styles.left}>
                {project?.type && (
                    <p className={styles.type}>
                        {project.type === "sexuality"
                            ? "Sexualidad"
                            : project.type === "nutrition"
                            ? "Nutrición"
                            : "Agua"}
                    </p>
                )}
                {project?.name ? (
                    <p className={styles.name}>
                        {project.name}
                    </p>
                ) : (
                    <p className={`${styles.name} ${styles.noproject}`}>
                        Sin proyecto asignado
                    </p>
                )}
                {project?.description && (
                    <p className={styles.description}>
                        {project.description}
                    </p>
                )}
            </div>
            <div className={styles.right}>
                <div className={styles.graphs}>
                    {project && (
                        <CircleGraph
                            heading="Recaudado"
                            amount={project.money_raised}
                            money
                            target={project.money_goal}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProjectCardInShow
