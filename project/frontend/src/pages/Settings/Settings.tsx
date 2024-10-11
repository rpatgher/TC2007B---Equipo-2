import { useEffect, useState } from 'react';
import { useNotify } from 'react-admin';

// ******************** Styles ********************
import styles from './Settings.module.css';

// ******************** Settings Components ********************
import Impact from './Impact';
import Donations from './Donations';

const Settings = () => {
    const notify = useNotify();
    const [config, setConfig] = useState({
        donations_asignment: '',
        impacts: {
            water: {
                description: '',
                unit: ''
            },
            nutrition: {
                description: '',
                unit: ''
            },
            sexuality: {
                description: '',
                unit: ''
            }
        }
    });


    useEffect(() => {
        const getConfig = async () => {
            const token = localStorage.getItem('token');
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/config`, options);
                const data = await response.json();
                console.log(data);
                if (response.status === 200) {
                    setConfig(data);
                } else {
                    notify('Ha ocurrido un error al cargar la configuración', { type: 'error' });
                }
            } catch (error) {
                console.log(error);
                notify('Ha ocurrido un error al cargar la configuración', { type: 'error' });
            }
        }
        getConfig();
    }, []);


    return (
        <>
            <h1 className={styles.heading}>Configuración</h1>
            <div className={styles.content}>
                <p>Configuración de la aplicación</p>
            </div>
            <div className={styles.settings}>
                <Donations 
                    initialConfig={config.donations_asignment} 
                    setConfig={setConfig}
                />
                <Impact 
                    config={config}
                    setConfig={setConfig}
                />
            </div>
        </>
    )
}

export default Settings;