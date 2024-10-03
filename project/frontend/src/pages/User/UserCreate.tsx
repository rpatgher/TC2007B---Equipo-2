import styles from "./UserCreate.module.css";

// *************** Components ***************
import GoBackButton from "../../components/GoBackButton/GoBackButton";

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
    return (
        <>
            <GoBackButton />
            <h1 className={styles.heading}>Crear Nuevo Donador</h1>
            <div className={styles.content}>
                <UserCreateForm />
                <aside className={styles.sidebar}>

                </aside>
            </div>
        </>
    )
};