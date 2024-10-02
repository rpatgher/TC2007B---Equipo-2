import { useNavigate } from "react-router-dom";
import styles from "./UserCreate.module.css";

// type User = {
//     id: string;
//     name: string;
//     surname: string;
//     email: string;
//     role: string;
//     created_at: string;
// };

export const UserCreateForm = () => {

    return (
        <form
            className={styles.form}
        >
            <div className={styles.field}>
                <label htmlFor="name">Nombre</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Nombre del donador"
                    required
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="surname">Apellido(s)</label>
                <input 
                    type="text" 
                    id="surname" 
                    name="surname" 
                    placeholder="Apellido(s) del donador"
                    required
                />
            </div>


            <div className={styles.submit}>
                <button 
                    type="submit"
                    className={styles["submit-button"]}
                >
                    Crear Donador
                </button>
            </div>
        </form>
    )

}

export const UserCreate = () => {
    const navigate = useNavigate();

    return (
        <>
            <button 
                onClick={() => navigate(-1)}
                className={styles["go-back"]}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z"/></svg>
                Regresar
            </button>
            <h1 className={styles.heading}>Crear Nuevo Donador</h1>
            <div className={styles.content}>
                <UserCreateForm />
                <aside className={styles.sidebar}>

                </aside>
            </div>
        </>
    )
};