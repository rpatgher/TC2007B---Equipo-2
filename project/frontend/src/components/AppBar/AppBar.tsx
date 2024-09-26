import { useNavigate } from 'react-router-dom';
import { usePermissions } from 'react-admin';


import styles from './AppBar.module.css';
import authProvider from '../../authProvider';
import logo from '../../assets/logo_sanders.webp';
import LogoutIcon from '@mui/icons-material/Logout';

export const AppBar = () => {
    const navigate = useNavigate();
    const { permissions } = usePermissions();
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src={logo} alt="Sanders Logo" />
            </div>
            <div className={styles.profile}>
                <div className={styles["profile-image"]}>
                    <img
                        src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                        alt="John Doe"
                    />
                </div>
                <div className={styles["profile-info"]}>
                    <p className={styles["profile-name"]}>John Doe</p>
                    <p className={styles["profile-role"]}>{permissions === "admin" ? "Administrador" : "Donador"}</p>
                </div>
                <div className={styles["drop-down"]}>
                    <div onClick={() => {
                        authProvider.logout().then(() => {
                            navigate('/login');
                        });
                    }}>
                        <LogoutIcon />
                        <p>Cerrar Sesión</p>
                    </div>
                </div>
            </div>
        </header>
    )
}