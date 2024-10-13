import { useNavigate } from "react-router-dom";

// ***************** Helpers ***************** //
import formatDate from "../../helpers/formatDate";

// ********************** Styles **********************
import styles from "./UserCard.module.css";

// ***************** Components ***************** //
import CardGraph from "../../components/CardGraph/CardGraph";

type User = {
    id: string;
    name: string;
    surname: string;
    email: string;
    role: string;
    createdAt: string;
    donations: Array<{ amount: number }>;
};

const UserCard = ({ user }: { user: User }) => {
    const navigate = useNavigate();
    return (
        <div
            className={styles.user}
            onClick={() => navigate(`/dashboard/users/${user.id}/show`)}
        >
            <div className={styles.left}>
                <p className={styles.role}>
                    {user.role === "donor"
                        ? "Donador"
                        : user.role === "admin"
                        ? "Administrador"
                        : "Donador Físico"}
                </p>
                <p className={styles.name}>
                    {user.name} {user.surname}
                    <span>{user.email}</span>
                </p>
                {/* <p>{user.email}</p> */}
                <p className={styles.since}>
                    Desde: <span>{formatDate(user.createdAt)}</span>
                </p>
            </div>
            <div className={styles.right}>
                <div className={styles.graphs}>
                    <CardGraph
                        heading="Donaciones"
                        amount={user?.donations?.length}
                    />
                    <CardGraph
                        heading="Total donado"
                        amount={user?.donations?.reduce(
                            (acc: number, donation: { amount: number }) =>
                                acc + donation.amount,
                            0
                        )}
                        money
                    />
                </div>
            </div>
        </div>
    );
};

export default UserCard;
