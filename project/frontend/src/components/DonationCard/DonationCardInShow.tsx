import { useNavigate } from "react-router-dom";

// ***************** Helpers ***************** //
import formatDate from "../../helpers/formatDate";
import formatMoney from "../../helpers/formatMoney";

// ************************ Styles ************************
import styles from "./DonationCardInShow.module.css";

type Donation = {
    id: string;
    amount: number;
    createdAt: string;
    donor?: { name: string; surname: string };
    project: { name: string; description: string; type: string };
};

const DonationCardInShow = ({ donation }: { donation: Donation }) => {
    const navigate = useNavigate();
    return (
        <div
            className={styles.donation}
            onClick={() => navigate(`/dashboard/donations/${donation.id}/show`)}
        >
            <div className={styles.left}>
                {donation.project ? (
                    <p className={styles.name}>
                        {donation.project.name} <span>{donation.project.type === 'water' ? 'Agua' : donation.project.type === 'sexuality' ? 'Sexualidad' : 'Nutrición'}</span>
                    </p>
                ) : (
                    <p className={styles.noproject}>Sin proyecto asignado</p>
                )}
                <p className={styles.since}>
                    Donado el <span>{formatDate(donation.createdAt)}</span>
                </p>
            </div>
            <div className={styles.right}>
                <p className={styles.amount}>{formatMoney(donation.amount)}</p>
            </div>
        </div>
    );
};

export default DonationCardInShow;
