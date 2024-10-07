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
import styles from "./UserShow.module.css";

// *************** Types ***************
// type User = {
//     id: string;
//     name: string;
//     surname: string;
// };

export const UserShow = () => {
    const navigate = useNavigate();
    const notify = useNotify();
    const params = useParams();
    const [modalDelete, setModalDelete] = useState(false);
    const [user, setUser] = useState({
        id: "",
        name: "",
        surname: "",
        role: "",
    });

    useEffect(() => {
        if(params.id){
            dataProvider.getOne('users', params)
            .then((response) => {
                console.log(response);
                setUser({
                    id: response.data.id,
                    name: response.data.name,
                    surname: response.data.surname,
                    role: response.data.role,
                });
            })
            .catch((error) => {
                console.log(error);
                notify("Error al obtener el donador físico. Intenta nuevamente", { type: "error" });
            });
        }
    }, [params]);

    const handleDelete = () => {
        setModalDelete(true);
    }

    const handleDeleteUser = () => {
        dataProvider.delete('users', params)
            .then((response) => {
                console.log(response);
                notify("Donador Físico eliminado exitosamente", { type: "success" });
                navigate('/users');
            })
            .catch((error) => {
                console.log(error);
                notify("Error al eliminar el donador físico. Intenta nuevamente", { type: "error" });
            });
    }

    return (
        <>
            <GoBackButton />
            <h1 className={styles.heading}>{user.name} {user.surname}</h1>
            <div className={styles.content}>
                <div className={styles.info}>

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
                    {user.role === "physical-donor" &&
                        <button
                            className={styles["edit-button"]}
                            onClick={() => navigate(`/users/${user.id}`)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                            Editar
                        </button>
                    }
                </div> 
            </div>
            {modalDelete && (
                <ModalDelete
                    entity='donador'
                    setModalDelete={setModalDelete}
                    handleDeleteElement={handleDeleteUser}
                />
            )}
        </>   
    )
}