import { 
    Menu,
    usePermissions,
} from 'react-admin';

import HomeIcon from '@mui/icons-material/Home';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import Diversity1Icon from '@mui/icons-material/Diversity1';

import styles from './Menu.module.css';



export const MyMenu = () => {
    const { permissions } = usePermissions();
    return (
        <nav className={styles.navbar}>
            <Menu.Item
                to="/"
                primaryText="Inicio"
                leftIcon={<HomeIcon />}
                className={styles.navbarItem}
            />
            {permissions === "admin" &&
                <Menu.Item
                    to="/users"
                    primaryText="Donadores"
                    leftIcon={<Diversity1Icon />}
                />
            }
            <Menu.Item
                to="/donations"
                primaryText="Donaciones"
                leftIcon={<VolunteerActivismIcon />}
            />
        </nav>
    )
}