import { useState, useEffect } from "react";
import { useNotify } from 'react-admin';
import { useNavigate, useParams } from "react-router-dom";

import dataProvider from "../../dataProvider";

// *************** Styles ***************
import styles from "./ProjectCU.module.css";

// *************** Components ***************
import GoBackButton from "../../components/GoBackButton/GoBackButton";

// ******************** Animation **************************
import AnimationComponent from '../../components/AnimationComponent/AnimationComponent';

// *************** Types ***************
type Project = {
    id?: string;
    name: string;
    img: string;
    description: string;
    money_goal: string;
    type: string;
    impact: number;
    milestones?: Array<any>;
};

const ProjectCreateForm = ({initialProject, edit} : { initialProject?: Project, edit?: boolean }) => {
    const navigate = useNavigate();
    const notify = useNotify();
    const [loading, setLoading] = useState(false);
    const [project, setProject] = useState<Project>({
        name: "",
        img: "",
        description: "",
        money_goal: "",
        impact: 0,
        type: "",
        milestones: []
    });
    const [impacts, setImpacts] = useState<Array<any>>([]);

    useEffect(() => {
        if(initialProject) {
            setProject(initialProject);
        }
    }, [initialProject]);

    useEffect(() => {
        const getImpacts = async () => {
            const token = localStorage.getItem('token');
            try{
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/config`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setImpacts(data.impacts);
            } catch(error) {
                console.log(error);
                notify("Error al obtener los impactos. Intenta nuevamente", { type: "error" });
            }
        }
        getImpacts();
    }, []);

    const handleChange = (e: any) => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if(project.name === "" || project.description === "" || project.money_goal === "" || project.type === "" || project.impact === 0 || project.milestones.length === 0) {
            notify("Todos los campos son requeridos", { type: "warning" });
            return;
        }
        setLoading(true);
        document.body.style.cursor = 'wait';
        if(edit && initialProject){
            dataProvider.update('projects', { id: initialProject.id, data: project }, true)
                .then((_) => {
                    // console.log(response);
                    notify("Proyecto actualizado exitosamente", { type: "success" });
                    navigate('/dashboard/projects');
                })
                .catch((error) => {
                    console.log(error);
                    notify("Error al actualizar el proyecto. Intenta Nuevamente", { type: "error" });
                })
                .finally(() => {
                    setLoading(false);
                    document.body.style.cursor = 'default';
                });
        } else {
            dataProvider.create('projects', { data: project }, true)
                .then((_) => {
                    // console.log(response);
                    notify("Proyecto creado exitosamente", { type: "success" });
                    navigate('/dashboard/projects');
                })
                .catch((error) => {
                    console.log(error);
                    notify("Error al crear el proyecto. Intenta Nuevamente", { type: "error" });
                })
                .finally(() => {
                    setLoading(false);
                    document.body.style.cursor = 'default';
                });
        }
    }


    const addMilestone = () => {
        const milestoneDesc = document.getElementById("milestone-desc") as HTMLInputElement;
        const milestonePercentage = document.getElementById("milestone-percentage") as HTMLInputElement;
        if(milestoneDesc.value === "" || milestonePercentage.value === "") {
            notify("El porcentaje y la descripción del milestone son necesarios", { type: "warning" });
            return;
        }
        setProject({
            ...project,
            milestones: [
                ...project.milestones,
                {
                    description: milestoneDesc.value,
                    percentage: milestonePercentage.value
                }
            ]
        });
        milestoneDesc.value = "";
        milestonePercentage.value = "";
    }

    const removeMilestone = (index: number) => {
        setProject({
            ...project,
            milestones: project.milestones.filter((_, i) => i !== index)
        });
    }

    const handleMilestoneReached = (e: any, index: number) => {
        if(e.target.checked){
            setProject({
                ...project,
                milestones: project.milestones.map((milestone, i) => {
                    if(i <= index){
                        return {
                            ...milestone,
                            reached: true
                        }
                    }
                    return milestone;
                })
            });
        } else {
            setProject({
                ...project,
                milestones: project.milestones.map((milestone, i) => {
                    if(i >= index){
                        return {
                            ...milestone,
                            reached: false
                        }
                    }
                    return milestone;
                })
            });
        }
    }

    const handleChangeImage = (e: any) => {
        const file = e.target.files[0];
        setProject({
            ...project,
            img: file
        });
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <div className={styles.fields}>
                <div className={`${styles.field} ${styles["image-field"]}`}>
                    <label htmlFor="img">Imagen</label>
                    <input 
                        type="file" 
                        id="img" 
                        name="img"
                        accept="image/*"
                        onChange={handleChangeImage}
                    />
                    {project.img && typeof project.img !== 'string' ? (
                        <div className={styles.image}>
                            <img src={URL.createObjectURL(project.img)} alt="project" />
                        </div>
                    ): project.img === '' ? null : (
                        <div className={styles.image}>
                            <img 
                                src={`${import.meta.env.VITE_API_URL}/uploads/projects/${project.img}`} 
                                alt={project.name} 
                            />
                        </div>
                    )}
                </div>
                <div className={`${styles.field} ${styles["type-field"]}`}>
                    <label htmlFor="type">Categoría</label>
                    <select 
                        id="type" 
                        name="type"
                        onChange={handleChange}
                        value={project.type}
                        
                    >
                        <option value="" disabled>-- Seleccione una categoría --</option>
                        <option value="water">Agua</option>
                        <option value="nutrition">Nutrición</option>
                        <option value="sexuality">Sexualidad</option>
                    </select>
                </div>
                <div className={`${styles.field} ${styles["name-field"]}`}>
                    <label htmlFor="name">Nombre</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        placeholder="Nombre del proyecto"
                        onChange={handleChange}
                        value={project.name}
                    />
                </div>
                <div className={`${styles.field} ${styles["description-field"]}`}>
                    <label htmlFor="description">Descripción</label>
                    <textarea 
                        id="description" 
                        name="description" 
                        placeholder="Descripción del proyecto"
                        onChange={handleChange}
                        value={project.description}
                    />
                </div>
                <div className={`${styles.field} ${styles["goal-field"]}`}>
                    <label htmlFor="goal">Meta</label>
                    <input 
                        type="number" 
                        id="goal" 
                        name="money_goal" 
                        placeholder="Meta de Donaciones del proyecto"
                        onChange={handleChange}
                        value={project.money_goal}
                    />
                </div>
                <div className={`${styles.field} ${styles["impact-field"]}`}>
                    <label htmlFor="impact">Impacto {project.type && <>({impacts && impacts[project.type].unit})</>}</label>
                    <input 
                        type="number" 
                        id="impact" 
                        name="impact" 
                        placeholder="Impacto del proyecto"
                        onChange={handleChange}
                        value={project.impact === 0 ? "" : project.impact}
                    />
                </div>
                <div className={`${styles.field} ${styles["milestones"]}`}>
                    <div className={styles["milestones-actions-label"]}>
                        <label htmlFor="milestones">Milestones</label>
                        <div className={styles["milestones-actions"]}>
                            <button 
                                type="button"
                                className={styles["add-milestone"]}
                                onClick={addMilestone}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                                Agregar
                            </button>
                        </div>
                    </div>
                    <div className={styles["milestones-list"]}>
                        {project.milestones && project.milestones.map((milestone, index) => (
                            <div key={index} className={styles["milestone"]}>
                                <div className={styles["milestone-reached"]}>
                                    <input 
                                        type="checkbox" 
                                        id={`milestone-reached-${index}`} 
                                        name={`milestone-reached-${index}`} 
                                        checked={milestone.reached}
                                        onChange={(e) => handleMilestoneReached(e, index)}
                                    />
                                </div>
                                <div className={styles["milestone-desc"]}>
                                    <span>{milestone.description}</span>
                                </div>
                                <div className={styles["milestone-percentage"]}>
                                    <span>{milestone.percentage}%</span>
                                </div>
                                {project.milestones && project.milestones.length <= index + 1 && (
                                    <button 
                                        className={styles["delete-milestone"]}
                                        type="button"
                                        onClick={() => removeMilestone(index)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className={styles["field-inputs"]}>
                        <input 
                            type="text" 
                            id="milestone-desc" 
                            name="milestone-desc" 
                            placeholder="Descripción del milestone"
                        />
                        <input 
                            type="number" 
                            id="milestone-percentage" 
                            name="milestone-percentage" 
                            placeholder="Procentaje que representa el milestone"
                        />
                    </div>
                </div>
            </div>


            <div className={styles.submit}>
                <button 
                    type="submit"
                    className={`${styles["submit-button"]} ${loading ? styles.loading : ""}`}
                    disabled={loading}
                >
                    {edit ? 'Guardar Proyecto' : 'Crear Proyecto'}
                </button>
            </div>
        </form>
    )
}


export const ProjectCreate = () => {
    return (
        <>
            <AnimationComponent>
                <GoBackButton />
                <h1 className={styles.heading}>Crear Nuevo Proyecto</h1>
            </AnimationComponent>
            <AnimationComponent dir="down">
                <div className={styles.content}>
                    <ProjectCreateForm />
                    <aside className={styles.sidebar}>
                        
                    </aside>
                </div>
            </AnimationComponent>
        </>
    )
}

export const ProjectUpdate = () => {
    const params = useParams();
    const notify = useNotify();
    const [project, setProject] = useState({
        id: "",
        name: "",
        img: "",
        description: "",
        money_goal: "",
        type: "",
        milestones: [],
        impact: 0
    });

    useEffect(() => {
        if(params.id){
            dataProvider.getOne('projects', params)
            .then((response) => {
                // console.log(response);
                setProject({
                    id: response.data.id,
                    name: response.data.name,
                    img: response.data.image,
                    description: response.data.description,
                    money_goal: response.data.money_goal,
                    type: response.data.type,
                    milestones: response.data.milestones,
                    impact: response.data.impact
                });
            })
            .catch((error) => {
                console.log(error);
                notify("Error al obtener el proyecto. Refresca la página para intentar nuevamente", { type: "error" });
            });
        }
    }, [params]);

    return (
        <>
            <AnimationComponent>
                <GoBackButton />
                <h1 className={styles.heading}>Editar Proyecto: {project.name}</h1>
            </AnimationComponent>
            <AnimationComponent dir="down">
                <div className={styles.content}>
                    <ProjectCreateForm 
                        initialProject={project}
                        edit
                    />
                    <aside className={styles.sidebar}>

                    </aside>
                </div>
            </AnimationComponent>
        </>
    )
}