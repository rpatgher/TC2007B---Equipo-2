import { Toolbar } from "@mui/material";

// ***************** Styles ***************** //
import styles from "./Toolbar.module.css";

const ToolbarComp = ({ perPage, setPerPage, page, setPage, total }: { perPage: number, setPerPage: (value: number) => void, page: number, setPage: (value: number) => void, total: number}) => {
    return (
        <Toolbar className={styles.toolbar}>
            <div className={styles["row-per-page"]}>
                <p>Filas por página: </p>
                <select
                    name="per-page"
                    id="per-page"
                    value={perPage}
                    onChange={(e) => {
                        setPerPage(parseInt(e.target.value));
                        setPage(1);
                    }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">20</option>
                    <option value="50">50</option>
                </select>
                <p className={styles.range}>
                    {(page - 1) * perPage + 1} -{" "}
                    {(page - 1) * perPage + perPage > total
                        ? total
                        : (page - 1) * perPage + perPage}{" "}
                    de {total}
                </p>
            </div>
            <div className={styles.pages}>
                <button
                    onClick={() => setPage(page - 1)}
                    className={`${styles["previous-page"]} ${
                        page <= 1 ? styles.disabled : ""
                    }`}
                    disabled={page <= 1}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e8eaed"
                    >
                        <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
                    </svg>
                </button>
                {[...Array(Math.ceil(total / perPage)).keys()].map((i) => (
                    <button
                        onClick={() => setPage(i + 1)}
                        key={i}
                        className={`${styles["page-button"]} ${
                            i + 1 === page ? styles.active : ""
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={() => setPage(page + 1)}
                    className={`${styles["next-page"]} ${
                        page >= Math.ceil(total / perPage)
                            ? styles.disabled
                            : ""
                    }`}
                    disabled={page >= Math.ceil(total / perPage)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e8eaed"
                    >
                        <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
                    </svg>
                </button>
            </div>
        </Toolbar>
    );
};

export default ToolbarComp;
