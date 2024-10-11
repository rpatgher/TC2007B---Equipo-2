
import { useNotify } from 'react-admin';

// ******************** Styles ********************
import styles from './Settings.module.css';

type ImpactProps = {
    setConfig: (config: any) => void;
    config: {
        donations_asignment: string;
        impacts: {
            water: {
                description: string;
                unit: string;
            };
            nutrition: {
                description: string;
                unit: string;
            };
            sexuality: {
                description: string;
                unit: string;
            };
        };
    };
}

const Impact = ({ config, setConfig }: ImpactProps) => {
    const notify = useNotify();
    const { water, nutrition, sexuality } = config.impacts;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(config)
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/config/impacts`, options);
            const data = await response.json();
            setConfig(data);
            notify('Configuración actualizada', { type: 'success' });
        } catch (error) {
            console.log(error);
            notify('Ha ocurrido un error al cargar la configuración', { type: 'error' });
        }
    }

    return (
        <form 
            className={styles.setting}
            onSubmit={handleSubmit}
        >
            <h2 className={styles["label-setting"]}>Impacto de Proyectos</h2>
            <p>
                Configura la descripción y unidad de impacto que tendrán los
                proyectos según su categoría (Agua, Nutrición, Sexualidad).
            </p>
            <div className={styles.types}>
                <div className={styles.type}>
                    <h3 className={styles["label-type"]}>Agua</h3>
                    <div className={styles.field}>
                        <label htmlFor="impact-desc-water">
                            Descripción de Impacto
                        </label>
                        <input
                            type="text"
                            id="impact-desc-water"
                            name="impact-desc-water"
                            placeholder="Descripción del impacto de los proyectos de agua"
                            value={water.description}
                            onChange={(e) => setConfig({
                                ...config,
                                impacts: {
                                    ...config.impacts,
                                    water: { ...water, description: e.target.value }
                                }
                            })}
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="impact-unit-water">
                            Unidad de Impacto
                        </label>
                        <input
                            type="text"
                            id="impact-unit-water"
                            name="impact-unit-water"
                            placeholder="Unidad de impacto de los proyectos de agua"
                            value={water.unit}
                            onChange={(e) => setConfig({
                                ...config,
                                impacts: {
                                    ...config.impacts,
                                    water: { ...water, unit: e.target.value }
                                }
                            })}
                        />
                    </div>
                </div>
                <div className={styles.type}>
                    <h3 className={styles["label-type"]}>Nutrición</h3>
                    <div className={styles.field}>
                        <label htmlFor="impact-desc-nut">
                            Descripción de Impacto
                        </label>
                        <input
                            type="text"
                            id="impact-desc-nut"
                            name="impact-desc-nut"
                            placeholder="Descripción del impacto de los proyectos de nutrición"
                            value={nutrition.description}
                            onChange={(e) => setConfig({ 
                                ...config, 
                                impacts: { 
                                    ...config.impacts, 
                                    nutrition: { ...nutrition, description: e.target.value } 
                                }
                            })}
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="impact-unit-nut">
                            Unidad de Impacto
                        </label>
                        <input
                            type="text"
                            id="impact-unit-nut"
                            name="impact-unit-nut"
                            placeholder="Unidad de impacto de los proyectos de nutrición"
                            value={nutrition.unit}
                            onChange={(e) => setConfig({ 
                                ...config, 
                                impacts: { 
                                    ...config.impacts, 
                                    nutrition: { ...nutrition, unit: e.target.value } 
                                }
                            })}
                        />
                    </div>
                </div>
                <div className={styles.type}>
                    <h3 className={styles["label-type"]}>Sexualidad</h3>
                    <div className={styles.field}>
                        <label htmlFor="impact-desc-sex">
                            Descripción de Impacto
                        </label>
                        <input
                            type="text"
                            id="impact-desc-sex"
                            name="impact-desc-sex"
                            placeholder="Descripción del impacto de los proyectos de sexualidad"
                            value={sexuality.description}
                            onChange={(e) => setConfig({ 
                                ...config, 
                                impacts: { 
                                    ...config.impacts,
                                    sexuality: { ...sexuality, description: e.target.value }
                                }
                            })}    
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="impact-unit-sex">
                            Unidad de Impacto
                        </label>
                        <input
                            type="text"
                            id="impact-unit-sex"
                            name="impact-unit-sex"
                            placeholder="Unidad de impacto de los proyectos de sexualidad"
                            value={sexuality.unit}
                            onChange={(e) => setConfig({ 
                                ...config, 
                                impacts: { 
                                    ...config.impacts,
                                    sexuality: { ...sexuality, unit: e.target.value }
                                }
                            })}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.submit}>
                <button 
                    type="submit" 
                    className={styles["submit-button"]}
                >
                    Guardar Cambios
                </button>
            </div>
        </form>
    );
};

export default Impact;
