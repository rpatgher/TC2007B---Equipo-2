
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';

//  *********************** Styles **************************
import styles from './Stats.module.css';

// *********************** Helpers **************************
import formatToMoney from '../../helpers/formatMoney';

type Card1_2Props = {
    title: string;
    type?: 'donations-funding' | 'donations-number';
    data: any;
}

const MONTHS = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic'
];

const Card1_2_Gaph = ({ title, type, data }: Card1_2Props) => {
    const monthsLabel = data.map((month: any) => `${MONTHS[month.month - 1]} - ${month.year}`);
    const totalPerMonth = data.map((month: any) => month.totalDonations);
    const donationsPerMonth = data.map((month: any) => month.totalAmount);

    return (
        <div className={`${styles.card}`}>
            <div className={styles["card-body-2"]}>
                <p className={styles["card-title-2"]}>
                    {title}
                </p>
                <div className={styles["card-graph"]}>
                    {type === 'donations-funding' ? (
                        <LineChart
                            width={550}
                            height={300}
                            series={[
                                { data: totalPerMonth, color: 'var(--blue)' },
                            ]}
                            xAxis={[{ scaleType: 'point', data: monthsLabel }]}
                        />
                    ) : (
                        <BarChart
                            xAxis={[{ scaleType: 'band', data: monthsLabel }]}
                            series={[{ data: donationsPerMonth, color: 'var(--blue)' }]}
                            width={500}
                            height={300}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Card1_2_Gaph;
