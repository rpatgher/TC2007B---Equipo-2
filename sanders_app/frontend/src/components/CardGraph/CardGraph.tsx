

import styles from './CardGraph.module.css';

import formatToMoney from '../../helpers/formatMoney';

interface CardGraphProps {
    heading: string;
    amount: number;
    money?: boolean;
}

const CardGraph = ({ heading, amount, money }: CardGraphProps) => {
    return (
        <div className={styles.graph}>
            <h3 className={styles["graph-heading"]}>{heading}</h3>
            <div className={styles["graph-chart"]}>
                <div className={styles["graph-canvas"]}>
                    <div className={styles["card-graph"]}>
                        <p className={styles.amount}>
                            {money ? formatToMoney(amount) : amount}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardGraph;