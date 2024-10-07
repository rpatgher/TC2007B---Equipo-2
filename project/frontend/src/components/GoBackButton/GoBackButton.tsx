import { useNavigate } from "react-router-dom";

import styles from "./GoBackButton.module.css";

const GoBackButton = () => {
    const navigate = useNavigate();
    return (
        <button 
            onClick={() => navigate(-1)}
            className={styles["go-back"]}
        >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z"/></svg>
            Regresar
        </button>
    )
}

export default GoBackButton