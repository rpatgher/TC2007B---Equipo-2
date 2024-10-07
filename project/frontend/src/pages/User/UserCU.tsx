import { useState, useEffect } from "react";
import { useNotify } from 'react-admin';
import { useNavigate, useParams } from "react-router-dom";

import dataProvider from "../../dataProvider";

// *************** Styles ***************
import styles from "./UserCU.module.css";

// *************** Components ***************
import GoBackButton from "../../components/GoBackButton/GoBackButton";

// *************** Types ***************
type User = {
    id: string;
    name: string;
    surname: string;
};

export const UserCreateForm = ({ initialUser, edit }: { initialUser?: User, edit?: boolean }) => {
    const navigate = useNavigate();
    const notify = useNotify();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User>({
        id: "",
        name: "",
        surname: ""
    });

    useEffect(() => {
        if(initialUser) {
            setUser(initialUser);
        }
    }, [initialUser]);

    const handleChange = (e: any) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if(user.name === "" || user.surname === "") {
            notify("Todos los campos son requeridos", { type: "warning" });
            return;
        }
        setLoading(true);
        document.body.style.cursor = 'wait';
        if(edit && initialUser){
            dataProvider.update('users', { id: initialUser.id, data: user })
                .then((response) => {
                    console.log(response);
                    notify("Donador Físico actualizado exitosamente", { type: "success" });
                    navigate('/users');
                })
                .catch((error) => {
                    notify("Error al actualizar el donador físico. Intenta nuevamente", { type: "error" });
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                    document.body.style.cursor = 'default';
                });
        } else {
            dataProvider.create('users', { data: user })
                .then((response) => {
                    console.log(response);
                    notify("Donador Físico creado exitosamente", { type: "success" });
                    navigate('/users');
                })
                .catch((error) => {
                    console.log(error);
                    notify("Error al crear el donador físico. Intenta nuevamente", { type: "error" });
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
            <div className={styles.field}>
                <label htmlFor="name">Nombre</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Nombre del donador"
                    onChange={handleChange}
                    value={user.name}
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="surname">Apellido(s)</label>
                <input 
                    type="text" 
                    id="surname" 
                    name="surname" 
                    placeholder="Apellido(s) del donador"
                    onChange={handleChange}
                    value={user.surname}
                />
            </div>


            <div className={styles.submit}>
                <button 
                    type="submit"
                    className={`${styles["submit-button"]} ${loading ? styles.loading : ""}`}
                    disabled={loading}
                >
                    Crear Donador
                </button>
            </div>
        </form>
    )

}

export const UserCreate = () => {
    return (
        <>
            <GoBackButton />
            <h1 className={styles.heading}>Crear Nuevo Donador Físico</h1>
            <div className={styles.content}>
                <UserCreateForm />
                <aside className={styles.sidebar}>

                </aside>
            </div>
        </>
    )
};

export const UserUpdate = () => {
    const params = useParams();
    const notify = useNotify();
    const [user, setUser] = useState<User>({
        id: "",
        name: "",
        surname: ""
    });

    useEffect(() => {
        if(params.id) {
            dataProvider.getOne('users', params)
                .then((response) => {
                    console.log(response);
                    setUser(response.data);
                })
                .catch((error) => {
                    console.log(error);
                    notify("Error al obtener el donador físico. Refresca la página para intentar nuevamente.", { type: "error" });
                });
        }
    }, [params]);


    return (
        <>
            <GoBackButton />
            <h1 className={styles.heading}>Editar Donador Físico: {user.name} {user.surname}</h1>
            <div className={styles.content}>
                <UserCreateForm 
                    initialUser={user}
                    edit
                />
                <aside className={styles.sidebar}>

                </aside>
            </div>
        </>
    )


}