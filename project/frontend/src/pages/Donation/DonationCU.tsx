import { useState } from "react";


// ********************** Styles **********************
import styles from "./DonationCU.module.css";

// ********************** Components **********************
import GoBackButton from "../../components/GoBackButton/GoBackButton";

type Donation = {
    id?: string;
    amount: number;
    createdAt: string;
    project: string;
    user: string;
}


const DonationCreateForm = ({ initialDonation }: { initialDonation?: Donation }) => {
    const [selectedAmount, setSelectedAmount] = useState<number>(200);
    const [selectedMethod, setSelectedMethod] = useState<string>("");
    const [inialAmounts, _] = useState<Array<number>>([
        200, 250, 300, 350, 400
    ]);

    const handleAmountSelection = (e: any) => {
        const amount = e.target.dataset.amount;
        if (amount === "other") {
            setSelectedAmount(0);
        } else {
            setSelectedAmount(parseInt(amount));
        }
    }

    return (
        <form
            className={styles.form}
        >
            <div
                className={styles.amounts}
            >
                {inialAmounts.map((amount, index) => (
                    <button
                        key={index}
                        className={`${styles.amount} ${selectedAmount === amount ? styles.selected : ""}`}
                        data-amount={amount}
                        type="button"
                        onClick={handleAmountSelection}
                    >
                        ${amount}
                    </button>    
                ))}
                <button
                    className={`${styles.amount} ${styles["other-amount"]} ${!inialAmounts.includes(selectedAmount) ? styles.selected : ""}`}
                    data-amount="other"
                    type="button"
                    onClick={handleAmountSelection}
                >
                    Otra Cantidad
                </button>
            </div>
            <div
                className={styles.field}
            >
                <label
                    htmlFor="amount"
                >
                    Cantidad
                </label>
                <input
                    id="amount"
                    type="number"
                    min="1"
                    step="1"
                    disabled={inialAmounts.includes(selectedAmount)}
                    className={`${!inialAmounts.includes(selectedAmount) ? '' : styles.disabled}`}
                    value={selectedAmount === 0 ? "" : selectedAmount}
                    onChange={(e) => setSelectedAmount(parseInt(e.target.value))}
                    placeholder="Cantidad a donar"
                />
            </div>
            <div
                className={styles.field}
            >
                <label>Método de Pago</label>
                <div
                    className={styles.methods}
                >
                    <button
                        type="button"
                        className={`${styles.method} ${selectedMethod === "stripe" ? styles.selected : ""}`}
                        onClick={() => setSelectedMethod("stripe")}
                    >
                        Tarjeta de Crédito
                    </button>
                    <button
                        type="button"
                        className={`${styles.method} ${selectedMethod === "paypal" ? styles.selected : ""}`}
                        onClick={() => setSelectedMethod("paypal")}
                    >
                        PayPal
                    </button>
                </div>
            </div>
        </form>
    )
}

export const DonationCreate = () => {
    return (
        <>
            <GoBackButton />
            <h1 className={styles.heading}>Realizar Donación</h1>
            <div className={styles.content}>
                <main className={styles.main}>
                    <p>
                        ¿Cuánto le gustaría donar? Como colaborador de la Fundación Sanders, nos aseguramos de que su donación vaya directamente a apoyar nuestra causa.
                    </p>
                    <DonationCreateForm />
                </main>
                <aside className={styles.sidebar}>

                </aside>
            </div>
        </>
    )
}