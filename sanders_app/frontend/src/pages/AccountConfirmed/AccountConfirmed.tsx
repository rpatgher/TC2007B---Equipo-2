import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

// ******************** styles ******************** //
import styles from './AccountConfirmed.module.css';

const AccountConfirmed = () => {
    const { token } = useParams<{ token: string }>();
    const [valid, setValid] = useState(true);

    useEffect(() => {
        const confirmAccount = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/confirm/${token}`);
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message);
                }
            } catch (error) {
                console.error(error);
                setValid(false);
            }
        }
        return () => confirmAccount();
    }, [token]);

    return (
        <main className={styles.main}>
            <div
                className={styles.form}
            >
                {valid ? (
                    <>
                        <h1 className={styles.heading}>Cuenta Confirmada</h1>
                        <p className={`${styles.description} ${styles.valid}`}>Tu cuenta ha sido confirmada, ahora puedes iniciar sesión y acceder a la plataforma de donaciones.</p>
                    </>
                ) : (
                    <>
                        <h1 className={`${styles.heading} ${styles.invalid}`}>Error</h1>
                        <p className={`${styles.description} ${styles.invalid}`}>El enlace de confirmación es inválido o ha expirado.</p>
                    </>
                )}
                <Link to='/dashboard/login' className={styles.link}>Iniciar Sesión</Link>
            </div>
        </main>
    )
}

export default AccountConfirmed
