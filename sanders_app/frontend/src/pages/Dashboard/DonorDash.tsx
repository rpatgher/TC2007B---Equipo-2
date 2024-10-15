import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

// ******************** Styles **************************
import styles from './DonorDash.module.css';

// ******************** Components **************************
import Card1_4 from '../../components/Stats/Card1_4';
import Card1_2_Table from '../../components/Stats/Card1_2_Table';

// ******************** Animation **************************
import AnimationComponent from '../../components/AnimationComponent/AnimationComponent';

const DonorDash = () => {
    const navigate = useNavigate();
    const [totalDonated, setTotalDonated] = useState(0);
    const [topThreeProjects, setTopThreeProjects] = useState([]);
    const [recentDonations, setRecentDonations] = useState([
        {
            impact: '333 comidas proporcionadas a personas en necesidad',
            amount: 1000,
            project: 'Alimentando a los más necesitados',
            date: 'Hace 2 días'
        }
    ]);
    const [totalDonations, setTotalDonations] = useState(0);


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
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/stats/donor`, config);
                const data = await res.json();
                setTotalDonated(data.donations.totalDonated);
                setTopThreeProjects(data.projects.topThree.map((project: any) => {
                    return {
                        name: project.projectInfo.name,
                        description: project.projectInfo.description,
                        progress: project.progress,
                        label: `${project.currentMilestone.description}`,
                    }
                }));
                setRecentDonations(data.donations.threeRecent.map((donation : any) => {
                    return {
                        amount: donation.amount,
                        date: formatDistanceToNow(new Date(donation.createdAt),  { addSuffix: true, locale: es }),
                        project: donation.projectInfo.name,
                        impact: `${donation.generatedImpact.toFixed(0)} ${donation.impactInfo.unit} ${donation.impactInfo.description}`
                    }
                }));
                setTotalDonations(data.donations.totalDonations);
            } catch (error) {
                console.log(error);
            }
        }
        getStats();
    }, []);



    return (
        <>
            <AnimationComponent>
                <div className={styles.header}>
                    <h1 className={styles.heading}>¡Bienvenid@ de nuevo!</h1>
                    <button
                        className={styles["donate-now"]}
                        onClick={() => navigate('/dashboard/donations/create')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg>
                        Donar ahora
                    </button>
                </div>
            </AnimationComponent>
            <div className={styles.content}>
                <AnimationComponent>
                    <div className={styles["grid-4"]}>
                        <Card1_4 
                            title="Total donado"
                            value={totalDonated}
                            money
                            icon={<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M441-120v-86q-53-12-91.5-46T293-348l74-30q15 48 44.5 73t77.5 25q41 0 69.5-18.5T587-356q0-35-22-55.5T463-458q-86-27-118-64.5T313-614q0-65 42-101t86-41v-84h80v84q50 8 82.5 36.5T651-650l-74 32q-12-32-34-48t-60-16q-44 0-67 19.5T393-614q0 33 30 52t104 40q69 20 104.5 63.5T667-358q0 71-42 108t-104 46v84h-80Z"/></svg>}
                            legend={`has aportado a la fundación`}
                        />
                        <Card1_4 
                            title="Donaciones realizadas"
                            value={totalDonations}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg>}
                            legend={`donaciones en total`}
                        />
                        {/* <Card1_4 
                            title="*** poner algo aquí ***"
                            value={0}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M441-120v-86q-53-12-91.5-46T293-348l74-30q15 48 44.5 73t77.5 25q41 0 69.5-18.5T587-356q0-35-22-55.5T463-458q-86-27-118-64.5T313-614q0-65 42-101t86-41v-84h80v84q50 8 82.5 36.5T651-650l-74 32q-12-32-34-48t-60-16q-44 0-67 19.5T393-614q0 33 30 52t104 40q69 20 104.5 63.5T667-358q0 71-42 108t-104 46v84h-80Z"/></svg>}
                            legend={`****`}
                        />
                        <Card1_4 
                            title="*** poner algo aquí ***"
                            value={0}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M441-120v-86q-53-12-91.5-46T293-348l74-30q15 48 44.5 73t77.5 25q41 0 69.5-18.5T587-356q0-35-22-55.5T463-458q-86-27-118-64.5T313-614q0-65 42-101t86-41v-84h80v84q50 8 82.5 36.5T651-650l-74 32q-12-32-34-48t-60-16q-44 0-67 19.5T393-614q0 33 30 52t104 40q69 20 104.5 63.5T667-358q0 71-42 108t-104 46v84h-80Z"/></svg>}
                            legend={`****`}
                        /> */}
                    </div>
                </AnimationComponent>
                <AnimationComponent dir="down">
                    <div className={styles["grid-2"]}>
                        <Card1_2_Table 
                            title="Donaciones Recientes"
                            type='recent-donations'
                            data={recentDonations}
                        />
                        <Card1_2_Table 
                            title="Proyectos a los que has aportado"
                            type='projects'
                            data={topThreeProjects}
                        />
                    </div>
                </AnimationComponent>
            </div>
        </>
    )
}

export default DonorDash
