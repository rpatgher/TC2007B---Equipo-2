import { usePermissions, ExportButton } from "react-admin";
import { useNavigate } from "react-router-dom";

// ***************** Styles ***************** //
import styles from "./Actions.module.css";

// ******************** Animation **************************
import AnimationComponent from '../../components/AnimationComponent/AnimationComponent';

const Actions = ({ filter, setFilter, entity, createPath }: { filter: string, setFilter: (value: string) => void, entity: string, createPath: string } ) => {
    const { permissions } = usePermissions();
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
                    {permissions === 'admin' ? (
                        <button
                            className={styles.create}
                            onClick={() => navigate(createPath)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                            Crear {entity}
                        </button>
                    ): (
                        <button
                            className={`${styles.create} ${styles["donate-now"]}`}
                            onClick={() => navigate(createPath)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg>
                            Donar ahora
                        </button>
                    )}
                </div>
            </div>
        </AnimationComponent>
    );
};

export default Actions;
