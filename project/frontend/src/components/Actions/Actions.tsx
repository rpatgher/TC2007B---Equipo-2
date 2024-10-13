import { CreateButton, ExportButton } from "react-admin";
import { useNavigate } from "react-router-dom";

// ***************** Styles ***************** //
import styles from "./Actions.module.css";

// ******************** Animation **************************
import AnimationComponent from '../../components/AnimationComponent/AnimationComponent';

const Actions = ({ filter, setFilter, entity, createPath }: { filter: string, setFilter: (value: string) => void, entity: string, createPath: string } ) => {
    const navigate = useNavigate();
    return (
        <AnimationComponent>
            <div className={styles.actions}>
                <div className={styles.search}>
                    <input
                        type="text"
                        placeholder={`Buscar ${entity}`}
                        // value={filter}
                        // onChange={(e) => setFilter(e.target.value)}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e8eaed"
                    >
                        <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                    </svg>
                </div>
                <div className={styles["create-export"]}>
                    <ExportButton
                        label={'Exportar'}
                    />
                    <button
                        className={styles.create}
                        onClick={() => navigate(createPath)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                        Crear {entity}
                    </button>
                </div>
            </div>
        </AnimationComponent>
    );
};

export default Actions;
