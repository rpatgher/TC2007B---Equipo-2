import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

// ******************** Styles **************************
import styles from './AdminDash.module.css';

// ******************** Components **************************
import Card1_4 from '../../components/Stats/Card1_4';
import Card1_2_Gaph from '../../components/Stats/Card1_2_Gaph';
import Card1_2_Table from '../../components/Stats/Card1_2_Table';

// ******************** Animation **************************
import AnimationComponent from '../../components/AnimationComponent/AnimationComponent';

const AdminDash = () => {
    const [totalDonations, setTotalDonations] = useState(0);
    const [donationsPercentage, setDonationsPercentage] = useState('');
    const [totalDonors, setTotalDonors] = useState(0);
    const [totalProjects, setTotalProjects] = useState(0);
    const [donorThisMonth, setDonorThisMonth] = useState(0);
    const [almostFinishedProjects, setAlmostFinishedProjects] = useState(0);
    const [recentDonations, setRecentDonations] = useState([]);
    const [highestProgressProjects, setHighestProgressProjects] = useState([]);
    const [donationsPerMonth, setDonationsPerMonth] = useState([]);
    const [bestDonor, setBestDonor] = useState({
        name: '',
        surname: '',
        email: ''
    });

    

    
    useEffect(() => {
        const getStats = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/stats/admin`, config);
                const data = await res.json();
                setTotalDonations(data.donations.totalFunded);
                setTotalDonors(data.users.total);
                setTotalProjects(data.projects.total);
                setDonorThisMonth(data.users.thisMonth);
                setAlmostFinishedProjects(data.projects.moreThan80Projects);
                setRecentDonations(data.donations.recentDonations.map((donation: any) => {
                    return {
                        donor: { name: donation.donor.name + ' ' + donation.donor.surname },
                        amount: donation.amount,
                        date: formatDistanceToNow(new Date(donation.createdAt),  { addSuffix: true, locale: es })
                    }
                }));
                setHighestProgressProjects(data.projects.projectWithHighestProgress.map((project: any) => {
                    return {
                        name: project.name,
                        progress: project.maxPercentage
                    }
                }));
                const donationsThisMonth = data.donations.thisMonth;
                const donationsLastMonth = data.donations.lastMonth;

                let percentage = ``;
                if (donationsThisMonth > donationsLastMonth) {
                    percentage = `+${((donationsThisMonth - donationsLastMonth) / (donationsLastMonth || 1)) * 100}`;
                } else{
                    percentage = `-${((donationsLastMonth - donationsThisMonth) / (donationsLastMonth || 1)) * 100}`;
                }
                setDonationsPercentage(percentage);
                setDonationsPerMonth(data.donations.thisYear);
                setBestDonor(data.users.bestDonor);
            } catch (error) {
                console.log(error);
            }
        }
        getStats();
    }, []);


    return (
        <>
            <AnimationComponent>
                <h1 className={styles.heading}>¡Bienvenid@ de nuevo!</h1>
            </AnimationComponent>
            <div className={styles.content}>
                <AnimationComponent>
                    <div className={styles["grid-4"]}>
                        <Card1_4 
                            title="Donaciones totales"
                            value={totalDonations}
                            money
                            icon={<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M441-120v-86q-53-12-91.5-46T293-348l74-30q15 48 44.5 73t77.5 25q41 0 69.5-18.5T587-356q0-35-22-55.5T463-458q-86-27-118-64.5T313-614q0-65 42-101t86-41v-84h80v84q50 8 82.5 36.5T651-650l-74 32q-12-32-34-48t-60-16q-44 0-67 19.5T393-614q0 33 30 52t104 40q69 20 104.5 63.5T667-358q0 71-42 108t-104 46v84h-80Z"/></svg>}
                            legend={`${donationsPercentage}% del último mes`}
                        />
                        <Card1_4 
                            title="Donadores totales"
                            value={totalDonors}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>}
                            legend={`${donorThisMonth} donadores nuevos este mes`}
                        />
                        <Card1_4 
                            title="Proyectos totales"
                            value={totalProjects}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m656-120-56-56 63-64-63-63 56-57 64 64 63-64 57 57-64 63 64 64-57 56-63-63-64 63Zm-416-80q17 0 28.5-11.5T280-240q0-17-11.5-28.5T240-280q-17 0-28.5 11.5T200-240q0 17 11.5 28.5T240-200Zm0 80q-50 0-85-35t-35-85q0-50 35-85t85-35q37 0 67.5 20.5T352-284q39-11 63.5-43t24.5-73v-160q0-83 58.5-141.5T640-760h46l-63-63 57-57 160 160-160 160-57-56 63-64h-46q-50 0-85 35t-35 85v160q0 73-47 128.5T354-203q-12 37-43.5 60T240-120Zm-64-480-56-56 63-64-63-63 56-57 64 64 63-64 57 57-64 63 64 64-57 56-63-63-64 63Z"/></svg>}
                            legend={`${almostFinishedProjects} proyectos casi por finalizar`}
                        />
                        <Card1_4 
                            title="Mejor donador"
                            value={bestDonor.name + ' ' + bestDonor.surname}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M702-480 560-622l57-56 85 85 170-170 56 57-226 226Zm-342 0q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 260Zm0-340Z"/></svg>}
                            legend={bestDonor.email}
                        />
                    </div>
                </AnimationComponent>
                <AnimationComponent dir='down'>
                    <div className={styles["grid-2"]}>
                        <Card1_2_Gaph 
                            title="Recaudado por mes en el último año"
                            type='donations-funding'
                            data={donationsPerMonth}
                        />
                        <Card1_2_Gaph 
                            title="Donaciones por mes en el último año"
                            type='donations-number'
                            data={donationsPerMonth}
                        />
                    </div>
                </AnimationComponent>
                <AnimationComponent dir='down'>
                    <div className={styles["grid-2"]}>
                        <Card1_2_Table 
                            title="Donaciones recientes"
                            type='donations'
                            data={recentDonations}
                        />
                        <Card1_2_Table
                            title="Proyectos por finalizar"
                            type='projects'
                            data={highestProgressProjects}
                        />
                    </div>
                </AnimationComponent>
            </div>
        </>
    )
}

export default AdminDash;
