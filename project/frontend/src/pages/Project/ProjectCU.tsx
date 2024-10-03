import { useState, useEffect } from "react";
import { useNotify } from 'react-admin';
import { useNavigate, useParams } from "react-router-dom";

import dataProvider from "../../dataProvider";

// *************** Styles ***************
import styles from "./ProjectCU.module.css";

// *************** Components ***************
import GoBackButton from "../../components/GoBackButton/GoBackButton";

// *************** Types ***************
type Project = {
    id?: string;
    name: string;
    description: string;
    money_goal: string;
    type: string;
};



const ProjectCreateForm = ({initialProject, edit} : { initialProject?: Project, edit?: boolean }) => {
    const navigate = useNavigate();
    const notify = useNotify();
    const [loading, setLoading] = useState(false);
    const [project, setProject] = useState<Project>({
        name: "",
        description: "",
        money_goal: "",
        type: ""
    });

    useEffect(() => {
        if(initialProject) {
            setProject(initialProject);
        }
    }, [initialProject]);

    const handleChange = (e: any) => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if(project.name === "" || project.description === "" || project.money_goal === "" || project.type === "") {
            notify("Todos los campos son requeridos", { type: "warning" });
            return;
        }
        setLoading(true);
        document.body.style.cursor = 'wait';
        if(edit && initialProject){
            dataProvider.update('projects', { id: initialProject.id, data: project })
                .then((response) => {
                    console.log(response);
                    notify("Proyecto actualizado exitosamente", { type: "success" });
                    navigate('/projects');
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                    document.body.style.cursor = 'default';
                });
        } else {
            dataProvider.create('projects', { data: project })
                .then((response) => {
                    console.log(response);
                    notify("Proyecto creado exitosamente", { type: "success" });
                    navigate('/projects');
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                    document.body.style.cursor = 'default';
                });
        }
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <div className={styles.fields}>
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
                <div className={`${styles.field} ${styles["type-field"]}`}>
                    <label htmlFor="type">Tipo:</label>
                    <select 
                        id="type" 
                        name="type"
                        onChange={handleChange}
                        value={project.type}
                        
                    >
                        <option value="" disabled>-- Seleccione un tipo --</option>
                        <option value="water">Agua</option>
                        <option value="nutrition">Nutrición</option>
                        <option value="sexuality">Sexualidad</option>
                    </select>
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
            <GoBackButton />
            <h1 className={styles.heading}>Crear Nuevo Proyecto</h1>
            <div className={styles.content}>
                <ProjectCreateForm />
                <aside className={styles.sidebar}>

                </aside>
            </div>
        </>
    )
}

export const ProjectUpdate = () => {
    const params = useParams();
    const [project, setProject] = useState({
        id: "",
        name: "",
        description: "",
        money_goal: "",
        type: ""
    });

    useEffect(() => {
        if(params.id){
            dataProvider.getOne('projects', params)
            .then((response) => {
                console.log(response);
                setProject({
                    id: response.data.id,
                    name: response.data.name,
                    description: response.data.description,
                    money_goal: response.data.money_goal,
                    type: response.data.type
                });
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }, [params]);

    return (
        <>
            <GoBackButton />
            <h1 className={styles.heading}>Editar Proyecto: {project.name}</h1>
            <div className={styles.content}>
                <ProjectCreateForm 
                    initialProject={project}
                    edit
                />
                <aside className={styles.sidebar}>

                </aside>
            </div>
        </>
    )
}