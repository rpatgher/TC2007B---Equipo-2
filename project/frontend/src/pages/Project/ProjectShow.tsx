import { useState, useEffect } from "react";
import { useNotify } from "react-admin";
import { useNavigate, useParams } from "react-router-dom";

import dataProvider from "../../dataProvider";

// *************** Components ***************
import GoBackButton from "../../components/GoBackButton/GoBackButton";
import ModalDelete from "../../components/ModalDelete/ModalDelete";

// ***************** Helpers ***************** //
import formatDate from "../../helpers/formatDate";

// *************** Styles ***************
import styles from "./ProjectShow.module.css";

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
        description: "",
        money_goal: "",
        type: "",
        creator: { name: "", surname: "" },
        createdAt: ""
    });

    useEffect(() => {
        if(params.id){
            dataProvider.getOne('projects', params)
            .then((response) => {
                // console.log(response);
                setProject({
                    id: response.data.id,
                    name: response.data.name,
                    description: response.data.description,
                    creator: {
                        name: response.data.creator.name,
                        surname: response.data.creator.surname
                    },
                    money_goal: response.data.money_goal,
                    type: response.data.type,
                    createdAt: response.data.createdAt
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
        .then((response) => {
            // console.log(response);
            notify('El proyecto ha sido eliminado', { type: "success" });
            navigate('/projects');
        })
        .catch((error) => {
            notify('Error al eliminar el proyecto. Inténtalo nuevamente.', { type: 'error' });
            console.log(error);
        });
    }

    return (
        <>
            <GoBackButton />
            <h1 className={styles.heading}>{project.name}</h1>
            <div className={styles.content}>
                <div className={styles.info}>
                    <p className={styles.type}>
                        {project.type === "sexuality"
                            ? "Sexualidad"
                            : project.type === "nutrition" ? "Nutrición" : "Agua"}
                    </p>
                    <p className={styles.description}>
                        {project.description}
                    </p>
                    <p className={styles.goal}>
                        Objetivo: {project.money_goal}
                    </p>
                    <p className={styles.since}>
                        Creado el {" "}
                        <span>{formatDate(project.createdAt)}</span>
                        {" "} por {" "}
                        <span>{project.creator.name} {project.creator.surname}</span>
                    </p>
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
                        onClick={() => navigate(`/projects/${project.id}`)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                        Editar
                    </button>    
                </div>  
            </div>
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