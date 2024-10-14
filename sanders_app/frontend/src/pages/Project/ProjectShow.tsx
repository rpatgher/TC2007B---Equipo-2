import { useState, useEffect } from "react";
import { useNotify } from "react-admin";
import { useNavigate, useParams } from "react-router-dom";

import dataProvider from "../../dataProvider";

// *************** Components ***************
import GoBackButton from "../../components/GoBackButton/GoBackButton";
import ModalDelete from "../../components/ModalDelete/ModalDelete";
import DonationCard from "../../components/DonationCard/DonationCard";
import CircleGraph from "../../components/CircleGraph/CircleGraph";

// ***************** Helpers ***************** //
import formatDate from "../../helpers/formatDate";
import formatToMoney from "../../helpers/formatMoney";

// *************** Styles ***************
import styles from "./ProjectShow.module.css";

// ******************** Animation **************************
import AnimationComponent from '../../components/AnimationComponent/AnimationComponent';

// *************** Types ***************
// type Project = {
//     id?: string;
//     name: string;
//     description: string;
//     money_goal: string;
//     type: string;
// };

export const ProjectShow = () => {
    const navigate = useNavigate();
    const notify = useNotify();
    const params = useParams();
    const [modalDelete, setModalDelete] = useState(false);
    const [project, setProject] = useState({
        id: "",
        name: "",
        image: "",
        description: "",
        money_goal: "",
        money_raised: "",
        type: "",
        creator: { name: "", surname: "" },
        createdAt: "",
        donations: [{
            id: "",
            amount: "",
            donor: {
                name: "",
                surname: ""
            },
            createdAt: ""
        }],
        milestones: [{
            _id: "",
            description: "",
            percentage: 0,
            reached: false
        }],
        impact: 0,
        impacts: {
            sexuality: {
                unit: "",
                description: ""
            },
            nutrition: {
                unit: "",
                description: ""
            },
            water: {
                unit: "",
                description: ""
            }
        }
    });

    useEffect(() => {
        if(params.id){
            dataProvider.getOne('projects', params)
            .then((response) => {
                // console.log(response);
                setProject({
                    id: response.data.id,
                    name: response.data.name,
                    image: response.data.image,
                    description: response.data.description,
                    creator: {
                        name: response.data.creator.name,
                        surname: response.data.creator.surname
                    },
                    money_goal: response.data.money_goal,
                    money_raised: response.data.money_raised,
                    type: response.data.type,
                    createdAt: response.data.createdAt,
                    donations: response.data.donations,
                    milestones: response.data.milestones,
                    impact: response.data.impact,
                    impacts: response.data.impacts
                });
            })
            .catch((error) => {
                console.log(error);
                notify('Error al obtener el proyecto. Refresca la página para intentar nuevamente.', { type: 'error' });
            });
        }
    }, [params]);

    const handleDelete = () => {
        setModalDelete(true);
    }

    const handleDeleteProject = () => {
        dataProvider.delete('projects', { id: project.id })
        .then((_) => {
            // console.log(response);
            notify('El proyecto ha sido eliminado', { type: "success" });
            navigate('/dashboard/projects');
        })
        .catch((error) => {
            notify('Error al eliminar el proyecto. Inténtalo nuevamente.', { type: 'error' });
            console.log(error);
        });
    }

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

    console.log(project);

    return (
        <>
            <AnimationComponent>
                <GoBackButton />
                <h1 className={styles.heading}>{project.name}</h1>
            </AnimationComponent>
            <AnimationComponent dir="down">
                <div className={styles.content}>
                    <div className={styles["image-info"]}>
                        <div className={styles.image}>
                            <img 
                                src={`${import.meta.env.VITE_API_URL}/uploads/projects/${project.image}`} 
                                alt={project.name} 
                            />
                        </div>
                        <div className={styles.info}>
                            <div className={styles.graphs}>
                                <CircleGraph
                                    heading="Progreso"
                                    percentage
                                    amount={calculateProgress()}
                                    target={100}
                                />
                                <CircleGraph
                                    heading="Recaudado"
                                    amount={project.money_raised}
                                    money
                                    target={project.money_goal}
                                />
                            </div>
                            <p className={styles.type}>
                                {project.type === "sexuality"
                                    ? "Sexualidad"
                                    : project.type === "nutrition" ? "Nutrición" : "Agua"}
                            </p>
                            <p className={styles.description}>
                                {project.description}
                            </p>
                            <p className={styles.goal}>
                                Objetivo: <span>{formatToMoney(parseInt(project.money_goal))}</span>
                            </p>
                            <p className={styles.impact}>
                                Impacto: <span>{project.impact} {project.type && project.impacts && project.impacts[project.type] ? project.impacts[project.type].unit + ' ' + project.impacts[project.type].description : ''}</span> 
                            </p>
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
                            <p className={styles.since}>
                                Creado el {" "}
                                <span>{formatDate(project.createdAt)}</span>
                                {" "} por {" "}
                                <span>{project.creator.name} {project.creator.surname}</span>
                            </p>
                        </div>
                        <div className={styles["label-content-donations"]}>
                            <p className={styles["donations-label"]}>Donaciones:</p>
                            <div className={styles.donations}>
                                {project.donations && (
                                    <>
                                        {project.donations.length > 0 ? (
                                            project.donations.map((donation) => (
                                                <DonationCard
                                                    key={donation.id}
                                                    donation={donation}
                                                    inShow={false}
                                                />
                                            ))
                                        ) : (
                                            <p className={styles.nodonations}>Sin donaciones asignadas</p>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div
                        className={styles.actions}
                    >
                        <button
                            className={styles["delete-button"]}
                            onClick={handleDelete}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                            Borrar
                        </button>
                        <button
                            className={styles["edit-button"]}
                            onClick={() => navigate(`/dashboard/projects/${project.id}`)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                            Editar
                        </button>    
                    </div>  
                </div>
            </AnimationComponent>
            {modalDelete && (
                <ModalDelete
                    entity='proyecto'
                    setModalDelete={setModalDelete}
                    handleDeleteElement={handleDeleteProject}
                />
            )}
        </>
    )
}