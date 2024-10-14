import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// ********************** styles **********************
import styles from './Success.module.css';

const Success = () => {
    const { donationId } = useParams();

    useEffect(() => {
        const fetchDonation = async () => {
            console.log(donationId);
        }
        fetchDonation();
    }, []);

    return (
        <div>
            <h1 className={styles.heading}>¡Gracias por tu donación!</h1>
        </div>
    )
}

export default Success
