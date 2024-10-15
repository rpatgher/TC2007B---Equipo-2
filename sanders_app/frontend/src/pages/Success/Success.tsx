import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// ********************** styles **********************
import styles from './Success.module.css';

// ***************** Helpers ******************* //
import formatToMoney from '../../helpers/formatMoney';

const Success = () => {
    const { donationId } = useParams();
    const [donation, setDonation] = useState({});

    useEffect(() => {
        const fetchDonation = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/donations/${donationId}`, config);
                const data = await response.json();
                console.log(data);
                setDonation(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchDonation();
    }, []);

    const calculateProgress = () => {
        if(donation.project.milestones){
            let total = 0;
            const reachedMilestones = donation.project.milestones.filter(milestone => milestone.reached);
            // Find the reached milestone with the maximum percentage
            const maxReachedMilestone = reachedMilestones.reduce((max, current) => {
                return (current.percentage > max.percentage) ? current : max;
            }, { percentage: 0 });
            total = maxReachedMilestone.percentage;
            return total;
        }
        return 0;
    }

    return (
        <div className={styles.info}>
            <h1 className={styles.heading}>¡Gracias por tu donación!</h1>
            <p className={styles.description}>Tu aportación equivale a: <span>{donation?.project?.generatedImpact}</span></p>
            <div className={styles.body}>
                <div className={styles.image}>
                    <img 
                        src={`${import.meta.env.VITE_API_URL}/uploads/projects/${donation?.project?.image}`} 
                        alt={donation?.project?.name} 
                    />
                </div>
                <div className={styles.amount}>
                    <p>Monto: {formatToMoney(donation?.amount)}</p>
                </div>
            </div>
            <p className={styles.description}>El progreso del proyecto <span>{donation?.project?.name}</span> es:</p>
            {donation?.project?.milestones && (
                <div className={styles.milestones}>
                    <div className={styles["progress-bar"]}>
                        <div 
                            className={styles["progress"]}
                            style={{
                                width: `${calculateProgress()}%`
                            }}
                        ></div>
                    </div>
                    <div className={styles["milestones-list"]}>
                        {donation?.project.milestones && (
                            <>
                                {donation?.project.milestones.map(milestone => (
                                    <div
                                        key={milestone._id}
                                        className={styles.milestone}
                                        style={{
                                            left: `${milestone.percentage}%`,
                                        }}
                                    >
                                        <div className={`${styles.circle} ${milestone.reached ? styles.reached : ''}`}></div>
                                        <p>{milestone.description}</p>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div> 
            )}
        </div>
    )
}

export default Success
