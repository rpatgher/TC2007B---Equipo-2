//  *********************** Styles **************************
import styles from './Stats.module.css';

// *********************** Helpers **************************
import formatToMoney from '../../helpers/formatMoney';

type Card1_2Props = {
    title: string;
    type?: 'donations' | 'projects' | 'recent-donations';
    data?: any;
}

const Card1_2_Table = ({ title, type, data }: Card1_2Props) => {
    return (
        <div className={`${styles.card}`}>
            <div className={styles["card-body-2"]}>
                <p className={styles["card-title-2"]}>
                    {title}
                </p>
                <div className={styles["card-graph"]}>
                    {type === 'donations' ? (
                        <div className={styles.list}>
                            {data.map((donation: any, index: number) => (
                                <div key={index} className={styles.donor}>
                                    <div className={styles.profile}>
                                        <div className={styles.avatar}>
                                            {donation.donor.name.split(' ').map((name: string) => name[0].toUpperCase()).join('').slice(0, 2)}
                                        </div>
                                        <div className={styles.info}>
                                            <p className={styles["donor-name"]}>{donation.donor.name}</p>
                                            {donation.amount && <p className={styles["donor-amount"]}>Hizo una donación: <span>{formatToMoney(donation.amount)}</span></p>}
                                        </div>
                                    </div>
                                    <div className={styles["donor-date"]}>
                                        <p>{donation.date.replace('alrededor de ', '')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : type === 'projects' ? (
                        <div className={styles.list}>
                            {data.map((project: any, index: number) => (
                                <div key={index} className={styles.project}>
                                    <p className={styles["project-name"]}>{project.name} <span>{project.progress}%</span></p>
                                    <div className={styles["progress-bar"]}>
                                        <div 
                                            className={styles.progress}
                                            style={{ width: `${project.progress}%` }}
                                        ></div>
                                    </div>
                                    {project.label && <p className={styles["project-label"]}>Actualmente en fase: <span>{project.label}</span></p>}   
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.list}>
                            {data.map((donation: any, index: number) => (
                                <div 
                                    key={index} 
                                    className={styles.donation}
                                >
                                    <div className={styles.info}>
                                        <p className={styles["donation-label"]}>Tu aportación equivale a:</p>
                                        <p className={styles["donation-title"]}>{donation.impact}</p>
                                        <p className={styles["donation-label"]}>Donaste <span>{formatToMoney(donation.amount)}</span> al proyecto: <span>{donation.project}</span></p>
                                    </div>
                                    <div className={styles["donation-date"]}>
                                        <p>{donation.date.replace('alrededor de ', '')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Card1_2_Table;
