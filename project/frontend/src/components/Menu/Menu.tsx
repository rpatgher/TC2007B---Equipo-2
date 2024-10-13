import { 
    Menu,
    usePermissions,
} from 'react-admin';

import HomeIcon from '@mui/icons-material/Home';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SettingsIcon from '@mui/icons-material/Settings';

import styles from './Menu.module.css';



export const MyMenu = () => {
    const { permissions } = usePermissions();
    return (
        <div className={styles.bar}>
            <nav className={styles.navbar}>
                <Menu.Item
                    to="/dashboard/"
                    primaryText="Inicio"
                    leftIcon={<HomeIcon />}
                    className={styles.navbarItem}
                />
                {permissions === "admin" &&
                    <Menu.Item
                        to="/dashboard/users"
                        primaryText="Donadores"
                        leftIcon={<Diversity1Icon />}
                    />
                }
                <Menu.Item
                    to="/dashboard/donations"
                    primaryText="Donaciones"
                    leftIcon={<VolunteerActivismIcon />}
                />
                {permissions === "admin" &&
                    <Menu.Item
                        to="/dashboard/projects"
                        primaryText="Proyectos"
                        leftIcon={<AccountTreeIcon />}
                    />
                }
            </nav>
            {permissions === "admin" &&
                <Menu.Item
                    to="/dashboard/settings"
                    primaryText="Configuración"
                    leftIcon={<SettingsIcon />}
                />
            }
        </div>
    )
}