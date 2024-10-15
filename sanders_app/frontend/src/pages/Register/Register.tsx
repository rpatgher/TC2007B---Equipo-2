import { useState } from 'react';
import { useNotify } from 'react-admin';
import { Link, useNavigate } from 'react-router-dom';

import authProvider from '../../authProvider';

// **************** Styles ***************
import styles from './Register.module.css';

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        password2: ''
    });
    const notify = useNotify();
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const [registered, setRegistered] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!user.name || !user.surname || !user.email || !user.password || !user.password2) {
            notify('Todos los campos son requeridos', { type:'error' });
            return;
        }
        if (user.password !== user.password2) {
            notify('Las contraseñas no coinciden', { type:'error' });
            return;
        }
        try {
            await authProvider.register({
                name: user.name,
                surname: user.surname,
                email: user.email,
                password: user.password
            });
            notify('Usuario registrado correctamente', { type:'success' });
            setRegistered(true);
        } catch (error) {
            notify('Error al registrar usuario. Intente nuevamente.', { type:'error' });
            setUser({
                name: '',
                surname: '',
                email: '',
                password: '',
                password2: ''
            });
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }


    return (
        <main className={styles.main}>
            <button
                className={styles["go-back"]}
                type='button'
                onClick={() => navigate('/')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
            </button>
            {registered ? (
                <div className={styles.form}>
                    <h1 className={styles.heading}>Registro Completado</h1>
                    <p className={styles.description}>Te enviamos un correo para confirmar tu cuenta. Por favor revisa tu correo electrónico y confirma tu cuenta.</p>
                </div>
            ) : (
                <form 
                className={styles.form}
                onSubmit={handleSubmit}
            >
                <h1 className={styles.heading}>Registro</h1>
                <p className={styles.description}>Ingresa información para registrate.</p>
                <div className={styles.content}>
                    <div className={styles.field}>
                        <label htmlFor="name">Nombre</label>
                        <div className={styles["input-icon"]}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M560-440h200v-80H560v80Zm0-120h200v-80H560v80ZM200-320h320v-22q0-45-44-71.5T360-440q-72 0-116 26.5T200-342v22Zm160-160q33 0 56.5-23.5T440-560q0-33-23.5-56.5T360-640q-33 0-56.5 23.5T280-560q0 33 23.5 56.5T360-480ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z"/></svg>
                            <input 
                                type="text" 
                                name="name" 
                                id='name'
                                value={user.name}
                                placeholder='John'
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="surname">Apellido(s)</label>
                        <div className={styles["input-icon"]}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M563-491q73-54 114-118.5T718-738q0-32-10.5-47T679-800q-47 0-83 79.5T560-541q0 14 .5 26.5T563-491ZM120-120v-80h80v80h-80Zm160 0v-80h80v80h-80Zm160 0v-80h80v80h-80Zm160 0v-80h80v80h-80Zm160 0v-80h80v80h-80ZM136-280l-56-56 64-64-64-64 56-56 64 64 64-64 56 56-64 64 64 64-56 56-64-64-64 64Zm482-40q-30 0-55-11.5T520-369q-25 14-51.5 25T414-322l-28-75q28-10 53.5-21.5T489-443q-5-22-7.5-48t-2.5-56q0-144 57-238.5T679-880q52 0 85 38.5T797-734q0 86-54.5 170T591-413q7 7 14.5 10.5T621-399q26 0 60.5-33t62.5-87l73 34q-7 17-11 41t1 42q10-5 23.5-17t27.5-30l63 49q-26 36-60 58t-63 22q-21 0-37.5-12.5T733-371q-28 25-57 38t-58 13Z"/></svg>
                            <input 
                                type="text" 
                                name="surname" 
                                id='surname'
                                value={user.surname}
                                placeholder='Doe'
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="email">Correo Electrónico</label>
                        <div className={styles["input-icon"]}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/></svg>
                            <input 
                                type="email" 
                                name="email" 
                                id='email'
                                value={user.email}
                                placeholder='ejemplo@sanders.com.mx'
                                onChange={handleChange}
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
                                value={user.password}
                                onChange={handleChange}
                            />
                            {showPassword ? (
                                <svg onClick={() => setShowPassword(!showPassword)} className={styles["show-pass"]} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>
                            ) : (
                                <svg onClick={() => setShowPassword(!showPassword)} className={styles["show-pass"]} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
                            )}
                        </div>
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="password2">Confirma tu Contraseña</label>
                        <div className={styles["input-icon"]}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>
                            <input 
                                type={showPassword2 ? 'text' : 'password'}
                                name="password2" 
                                id='password2'
                                value={user.password2}
                                onChange={handleChange}
                            />
                            {showPassword2 ? (
                                <svg onClick={() => setShowPassword2(!showPassword2)} className={styles["show-pass"]} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>
                            ) : (
                                <svg onClick={() => setShowPassword2(!showPassword2)} className={styles["show-pass"]} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
                            )}
                        </div>
                    </div>
                </div>
                <button 
                    type="submit"
                    className={styles.submit}
                >
                    Registrarse
                </button>
                <div className={styles.actions}>
                    <p>¿Ya tienes cuenta? <Link to='/dashboard/login'>Inicia Sesión</Link></p>
                    <p>¿Olvistaste tu contraseña? <Link to='/dashboard/forgot'>Reestablécela</Link></p>
                </div>
            </form>
            )}
        </main>
    )
}

export default Login;