import { useNavigate } from "react-router-dom";
import { usePermissions } from "react-admin"; 

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
    milestones: { percentage: number; reached: boolean };
    creator: { name: string; surname: string };
    type: string;
};

const ProjectCardInShow = ({ project }: { project: Project }) => {
    const navigate = useNavigate();
    const { permissions } = usePermissions();

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
            className={`${styles.project} ${(!project || permissions === 'donor') && styles["no-hover"]}`}
            onClick={() => permissions === 'admin' && project && navigate(`/dashboard/projects/${project.id}/show`)}
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
                {project?.milestones && (
                    <div className={styles.milestones}>
                        <div className={styles["progress-bar"]}>
                            <div 
                                className={styles["progress"]}
                                style={{
                                    width: `${calculateProgress()}%`
                                }}
                            ></div>
                        </div>
                        <div className={styles["milestones-list"]}>
                            {project.milestones && (
                                <>
                                    {project.milestones.length > 0 ? (
                                        project.milestones.map(milestone => (
                                            <div
                                                key={milestone._id}
                                                className={styles.milestone}
                                                style={{
                                                    left: `${milestone.percentage}%`,
                                                }}
                                            >
                                                <div className={`${styles.circle} ${milestone.reached ? styles.reached : ''}`}></div>
                                                <p>{milestone.description}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className={styles.nodonations}>Sin hitos asignados</p>
                                    )}
                                </>
                            )}
                        </div>
                    </div> 
                )}
            </div>
            <div className={styles.right}>
                <div className={styles.graphs}>
                    {project && (
                        <>
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
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProjectCardInShow
