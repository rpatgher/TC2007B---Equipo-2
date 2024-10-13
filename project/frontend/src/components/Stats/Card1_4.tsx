

//  *********************** Styles **************************
import styles from './Stats.module.css';

// *********************** Helpers **************************
import formatToMoney from '../../helpers/formatMoney';

type Card1_4Props = {
    title: string;
    money?: boolean;
    value: number;
    percentage?: boolean;
    icon: any;
    legend?: string;
}

const Card1_4 = ({ title, money = false, value, percentage = false, icon, legend }: Card1_4Props) => {
  return (
    <div className={`${styles.card}`}>
        <div className={styles["card-body-4"]}>
            <p className={styles["card-title"]}>
                {title}
            </p>
            <div className={styles["card-content"]}>
                <p className={styles["card-value"]}>{money ? formatToMoney(value) : value}{percentage && "%"}</p>
                {legend && <p className={styles["card-legend"]}>{legend}</p>}
            </div>
            <div className={styles["card-icon"]}>
                {icon}
            </div>
          </div>
    </div>
  )
}

export default Card1_4;
