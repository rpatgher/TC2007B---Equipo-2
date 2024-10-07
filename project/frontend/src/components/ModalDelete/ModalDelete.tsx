

// ********************** Styles **********************
import styles from "./ModalDelete.module.css";



const ModalDelete = ({ entity, setModalDelete, handleDeleteElement }: { entity: string, setModalDelete: (value: boolean) => void, handleDeleteElement: () => void }) => {
    return (
        <div className={styles.modal}>
            <div className={styles["modal-content"]}>
                <p>¿Estás seguro de que deseas borrar este {entity}?</p>
                <div className={styles["modal-buttons"]}>
                    <button
                        className={styles["cancel-button-modal"]}
                        onClick={() => setModalDelete(false)}
                    >
                        Cancelar
                    </button>
                    <button
                        className={styles["delete-button-modal"]}
                        onClick={handleDeleteElement}
                    >
                        Borrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalDelete;
