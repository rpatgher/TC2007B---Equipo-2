import { useState } from 'react';
import { useLogin, useNotify } from 'react-admin';
import { Link } from 'react-router-dom';


// **************** Styles ***************
import styles from './Login.module.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    // const navigate = useNavigate();
    const notify = useNotify();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!username || !password) {
            notify('Debes ingresar un correo y contraseña', { type:'error' });
            return;
        }
        try {
            await login({ username, password });
        } catch (error) {
            notify('Usuario o contraseña incorrectos', { type:'error' });
        }
    }


    return (
        <main className={styles.main}>
            <form 
                className={styles.form}
                onSubmit={handleSubmit}
            >
                <h1 className={styles.heading}>Inicia Sesión</h1>
                <p className={styles.description}>Ingresa tu correo y contraseña para ingresar a tu cuenta.</p>
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
                    <div className={styles.field}>
                        <label htmlFor="password">Contraseña</label>
                        <div className={styles["input-icon"]}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>
                            <input 
                                type={showPassword ? 'text' : 'password'}
                                name="password" 
                                id='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {showPassword ? (
                                <svg onClick={() => setShowPassword(!showPassword)} className={styles["show-pass"]} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>
                            ) : (
                                <svg onClick={() => setShowPassword(!showPassword)} className={styles["show-pass"]} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
                            )}
                        </div>
                    </div>
                </div>
                <button 
                    type="submit"
                    className={styles.submit}
                >
                    Iniciar Sesión
                </button>
                <div className={styles.actions}>
                    <p>¿No tienes cuenta? <Link to='/dashboard/register'>Regístrate</Link></p>
                    <p>¿Olvistaste tu contraseña? <Link to='/dashboard/forgot'>Reestablécela</Link></p>
                </div>
            </form>
        </main>
    )
}

export default Login;