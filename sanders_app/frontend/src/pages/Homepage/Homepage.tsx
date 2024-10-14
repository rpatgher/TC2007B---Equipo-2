import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo_sanders.webp';

// ************************** Styles **************************
import styles from './Homepage.module.css';

const Homepage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);


    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link to="/"><img src={logo} alt="Sanders Logo" /></Link>
            </div>
            <div className={styles.actions}>
                {isAuthenticated ? (
                    <Link to="/dashboard">Dashboard</Link>
                ) : (
                    <>
                        <Link to="/dashboard/login">Iniciar Sesión</Link>
                        <Link to="/dashboard/register">Registrarse</Link>
                    </>
                )}
            </div>
        </header>
    )
}

export default Homepage;