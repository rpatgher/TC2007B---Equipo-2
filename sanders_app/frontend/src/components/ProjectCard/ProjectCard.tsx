

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
    milestones: { percentage: number; reached: boolean }[];
    creator: { name: string; surname: string };
    type: string;
};

const ProjectCard = ({ project }: { project: Project }) => {
    const navigate = useNavigate();

    const calculateProgress = () => {
        if(project.milestones){
            let total = 0;
            const reachedMilestones = project.milestones.filter(milestone => milestone.reached);
            // Find the reached milestone with the maximum percentage
            const maxReachedMilestone = reachedMilestones.reduce((max, current) => {
                return (current.percentage > max.percentage) ? current : max;
            }, { percentage: 0 });
            total = maxReachedMilestone.percentage;
            return total;
        }
        return 0;
    }


    return (
        <div
            className={styles.project}
            onClick={() => navigate(`/dashboard/projects/${project.id}/show`)}
        >
            <div className={styles.left}>
                <p className={styles.type}>
                    {project.type === "sexuality"
                        ? "Sexualidad"
                        : project.type === "nutrition"
                        ? "Nutrición"
                        : "Agua"}
                </p>
                <div className={styles["name-desc"]}>
                    <p className={styles.name}>{project.name}</p>
                    <p className={styles.description}>{project.description}</p>
                </div>
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
                    <CircleGraph
                        heading="Progreso"
                        percentage
                        amount={calculateProgress()}
                        target={100}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
