import { useState } from 'react';
import { useNotify } from 'react-admin';
import { Link } from 'react-router-dom';


// **************** Styles ***************
import styles from './Forgot.module.css';

const Login = () => {
    const [username, setUsername] = useState('');
    // const navigate = useNavigate();
    const notify = useNotify();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!username) {
            notify('Debes ingresar un correo', { type:'error' });
            return;
        }
        try {
            
        } catch (error) {
            notify('Usuario no existe', { type:'error' });
        }
    }


    return (
        <main className={styles.main}>
            <form 
                className={styles.form}
                onSubmit={handleSubmit}
            >
                <h1 className={styles.heading}>Recupera tu Acceso</h1>
                <p className={styles.description}>Ingresa tu correo para recibir intrucciones y recuperar el acceso a tu cuenta.</p>
                <div className={styles.content}>
                    <div className={styles.field}>
                        <label htmlFor="email">Correo Electrónico</label>
                        <div className={styles["input-icon"]}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/></svg>
                            <input 
                                type="email" 
                                name="email" 
                                id='email'
                                value={username}
                                placeholder='ejemplo@sanders.com.mx'
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <button 
                    type="submit"
                    className={styles.submit}
                >
                    Enviar instrucciones
                </button>
                <div className={styles.actions}>
                    <p>¿Ya tienes cuenta? <Link to='/login'>Inicia Sesión</Link></p>
                    <p>¿No tienes cuenta? <Link to='/register'>Regístrate</Link></p>
                </div>
            </form>
        </main>
    )
}

export default Login;