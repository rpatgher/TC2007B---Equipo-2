
import { useNavigate } from "react-router-dom";

// ***************** Helpers ***************** //
import formatDate from "../../helpers/formatDate";
import formatMoney from "../../helpers/formatMoney";

// ************************** styles **************************
import styles from "./DonationCard.module.css";

type Donation = {
    id: string;
    amount: number;
    createdAt: string;
    donor?: { name: string; surname: string };
    project: { name: string; description: string, type: string };
};

const DonationCard = ({ donation, inShow = true }: { donation: Donation, inShow: boolean }) => {
    const navigate = useNavigate();
    return (
        <div
            className={styles.donation}
            onClick={() => navigate(`/dashboard/donations/${donation.id}/show`)}
        >
            <div className={styles.left}>
                <p className={`${styles.name} ${!inShow ? styles.inshow : ''}`}>
                    {donation.donor ? (
                        <>{donation.donor.name} {donation.donor.surname}</>
                    ) : (
                        <>Anónimo</>
                    )}
                </p>
                <p className={styles.since}>
                    Donado el <span>{formatDate(donation.createdAt)}</span>
                </p>
            </div>
            <div>
                {donation.project ? (
                    <div className={styles.project}>
                        <p className={styles["project-name"]}>
                            {donation.project.name}
                        </p>
                        <p className={styles["project-label"]}>Proyecto</p>
                    </div>
                ) : (
                    inShow && <p className={styles.noproject}>Sin proyecto asignado</p>
                )}
            </div>
            <div className={styles.right}>
                <p className={styles.amount}>{formatMoney(donation.amount)}</p>
            </div>
        </div>
    );
};

export default DonationCard;
