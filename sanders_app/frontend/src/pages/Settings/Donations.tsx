
import { useNotify } from 'react-admin';


// ******************** Styles ********************
import styles from './Settings.module.css';


const Donations = ({ initialConfig, setConfig }: { initialConfig: string, setConfig: (value: any) => void }) => {
    const notify = useNotify();

    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === initialConfig || e.target.value === '') return;
        const token = localStorage.getItem('token');
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ donations_asignment: e.target.value })
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/config/donations-asignment`, options);
            const data = await response.json();
            setConfig(data);
            notify('Configuración actualizada', { type: 'success' });
        } catch (error) {
            console.log(error);
            notify('Ha ocurrido un error al cargar la configuración', { type: 'error' });
        }
    }

    return (
        <form className={styles.setting}>
            <h2 className={styles["label-setting"]}>Asignación de Donaciones</h2>
            <p>
                Ajusta la manera en que las donaciones serán asignadas a los proyectos.
            </p>
            <div className={styles.field}>
                <label htmlFor="donation-assign">
                    Asignación de Donaciones
                </label>
                <select 
                    id="donation-assign" 
                    name="donation-assign"
                    onChange={handleChange}
                    value={initialConfig || ''}
                >
                    <option value="manual">Asignación Manual</option>
                    <option value="impact">Asignación por Impacto</option>
                    <option value="progress">Asignación por Progreso</option>
                </select>
            </div>
        </form>
    )
}

export default Donations;