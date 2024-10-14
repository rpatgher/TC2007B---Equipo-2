import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePermissions, useGetIdentity, useAuthProvider } from 'react-admin';


import styles from './AppBar.module.css';
// import authProvider from '../../authProvider';
import logo from '../../assets/logo_sanders.webp';
import LogoutIcon from '@mui/icons-material/Logout';

export const AppBar = () => {
    const navigate = useNavigate();
    const { permissions } = usePermissions();
    const authProvider = useAuthProvider();
    const { data } = useGetIdentity();

    const [fullName, setFullName] = useState('');

    useEffect(() => {
        const setData = async () => {
            if (data) {
                setFullName(data.fullName || '');
            }
        }
        setData();
    } , [data]);


    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link to="/"><img src={logo} alt="Sanders Logo" /></Link>
            </div>
            <div className={styles.profile}>
                <div className={styles["profile-image"]}>
                    {fullName && fullName.split(' ').map((name: string) => name[0].toUpperCase()).join('').slice(0, 2)}
                </div>
                <div className={styles["profile-info"]}>
                    <p className={styles["profile-name"]}>{fullName || ''}</p>
                    <p className={styles["profile-role"]}>{permissions === "admin" ? "Administrador" : "Donador"}</p>
                </div>
                <div className={styles["drop-down"]}>
                    <div onClick={() => {
                        authProvider?.logout(null).then(() => {
                            navigate('/dashboard/login');
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