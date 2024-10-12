
import styles from './CircleGraph.module.css'

interface CircleGraphProps {
    heading: string;
    percentage?: boolean;
    amount: number;
    money?: boolean;
    target: number;
}

import formatToMoney from '../../helpers/formatMoney';


const CircleGraph = ({ heading, percentage, amount, money, target }: CircleGraphProps) => {
    
    const setAmount = (amount: number) => {
        if (percentage) {
            return `${amount}%`
        }
        if (money) {
            return formatToMoney(amount)
        }
        return amount;
    }
    
    return (
        <div className={styles.graph}>
            <h3 className={styles["graph-heading"]}>{heading}: <span>{setAmount(amount)}</span></h3>
            <div className={styles["graph-chart"]}>
                <div className={styles["graph-canvas"]}>
                    <div className={styles["circle-graph"]}>
                        <div 
                            className={styles["circle-graph-circle"]}
                            style={{
                                background: `conic-gradient(var(--green) ${(amount / target * 100).toFixed(0)}%, var(--white) 0)`,
                            }}
                        >
                            <div className={`${styles["circle-graph-cirle"]} ${styles["circle-graph-circle-inner"]}`}>
                                <p>{(amount / target * 100).toFixed(0)}%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CircleGraph;
