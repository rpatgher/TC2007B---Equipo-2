import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo_sanders.webp';

// ************************** Styles **************************
import styles from './Homepage.module.css';

// ************************** Images **************************
import water from '../../assets/water.webp';
import sexuality from '../../assets/sexuality.webp';
import nutrition from '../../assets/nutrition.webp';
import history from '../../assets/image.png';

const Homepage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);


    return (
        <>
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
            <section className={styles.cover}>
                <div className={`${styles.image} ${styles.water}`}>
                    <img src={water} alt="Agua" />
                </div>
                <div className={`${styles.image} ${styles.sexuality}`}>
                    <img src={sexuality} alt="Agua" />
                </div>
                <div className={`${styles.image} ${styles.nutrition}`}>
                    <img src={nutrition} alt="Agua" />
                </div>
            </section>
            <section className={styles.who}>
                <h2>Quiénes somos</h2>
                <main className={styles.main}>
                    <div className={styles["image-history"]}>
                        <img src={history} alt="Historia de Sanders" />
                    </div>
                    <div className={styles.card}>
                        <h3>Historia</h3>
                        <p>Fundación Sanders A.C., es una Asociación Civil sin fines de lucro creada en el año 2016 por iniciativa del empresario mexicano Guillermo Sanders Acedo (1935-2019), para contribuir a la mejora de la calidad de vida en grupos sociales en situación de vulnerabilidad, mediante la promoción de la salud sexual y reproductiva, la nutrición comunitaria y el abastecimiento de agua.</p>
                        <p>Fundación Sanders A. C. es un referente por su modelo de intervención preventiva convencidos de que para llegar a la raíz de los problemas, hay que atacarlos desde el ángulo de la prevención y el desarrollo de herramientas sociales para la toma de decisiones</p>
                    </div>
                </main>
            </section>
            <div className={styles.background}>
                <section className={styles.values}>
                    <div className={styles.value}>
                        <h3>Objetivo Social</h3>
                        <p>Desarrollar proyectos para contribuir a enfrentar los rezagos sociales en materia de salud sexual y reproductiva, nutrición comunitaria y abasto de agua.</p>
                    </div>
                    <div className={styles.value}>
                        <h3>Misión</h3>
                        <p>Fomentar la salud sexual y reproductiva, la sana alimentación y el abasto de agua potable entre grupos más vulnerables de la sociedad, para prevenir y incidencia y prevalencia de embarazos no planificados, infecciones de transmisión sexual, así como padecimientos asociados a ala malnutrición y al consumo de agua contaminada.</p>
                    </div>
                    <div className={styles.value}>
                        <h3>Visión</h3>
                        <p>Fundación Sanders A.C. es un referente por su modelo de intervención preventiva para fomentar la salud sexual y reproductiva, la sana alimentación y el abasto de agua potable en grupos sociales en situación de vulnerabilidad, contribuyendo de esa manera a la construcción de condiciones de justicia social en México.</p>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Homepage;