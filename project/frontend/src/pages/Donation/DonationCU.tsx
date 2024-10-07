import { useState, useEffect } from "react";
import { useNotify } from "react-admin";
import { useParams } from "react-router-dom";

import dataProvider from "../../dataProvider";

// ********************** Styles **********************
import styles from "./DonationCU.module.css";

// ********************** Components **********************
import GoBackButton from "../../components/GoBackButton/GoBackButton";

type Donation = {
    id?: string;
    amount: number;
    createdAt: string;
    project?: string;
    donor: {
        name: string;
        surname: string;
        role: string;
    };
    method: string;
};

const DonationCreateFormDonor = () => {
    const [selectedAmount, setSelectedAmount] = useState<number>(200);
    const [selectedMethod, setSelectedMethod] = useState<string>("");
    const [inialAmounts, _] = useState<Array<number>>([
        200, 250, 300, 350, 400,
    ]);

    const handleAmountSelection = (e: any) => {
        const amount = e.target.dataset.amount;
        if (amount === "other") {
            setSelectedAmount(0);
        } else {
            setSelectedAmount(parseInt(amount));
        }
    };

    return (
        <form className={styles.form}>
            <div className={styles.amounts}>
                {inialAmounts.map((amount, index) => (
                    <button
                        key={index}
                        className={`${styles.amount} ${
                            selectedAmount === amount ? styles.selected : ""
                        }`}
                        data-amount={amount}
                        type="button"
                        onClick={handleAmountSelection}
                    >
                        ${amount}
                    </button>
                ))}
                <button
                    className={`${styles.amount} ${styles["other-amount"]} ${
                        !inialAmounts.includes(selectedAmount)
                            ? styles.selected
                            : ""
                    }`}
                    data-amount="other"
                    type="button"
                    onClick={handleAmountSelection}
                >
                    Otra Cantidad
                </button>
            </div>
            <div className={styles.field}>
                <label htmlFor="amount">Cantidad</label>
                <input
                    id="amount"
                    type="number"
                    min="1"
                    step="1"
                    disabled={inialAmounts.includes(selectedAmount)}
                    className={`${
                        !inialAmounts.includes(selectedAmount)
                            ? ""
                            : styles.disabled
                    }`}
                    value={selectedAmount === 0 ? "" : selectedAmount}
                    onChange={(e) =>
                        setSelectedAmount(parseInt(e.target.value))
                    }
                    placeholder="Cantidad a donar"
                />
            </div>
            <div className={styles.field}>
                <label>Método de Pago</label>
                <div className={styles.methods}>
                    <button
                        type="button"
                        className={`${styles.method} ${
                            selectedMethod === "stripe" ? styles.selected : ""
                        }`}
                        onClick={() => setSelectedMethod("stripe")}
                    >
                        Tarjeta de Crédito
                    </button>
                    <button
                        type="button"
                        className={`${styles.method} ${
                            selectedMethod === "paypal" ? styles.selected : ""
                        }`}
                        onClick={() => setSelectedMethod("paypal")}
                    >
                        PayPal
                    </button>
                </div>
            </div>
        </form>
    );
};

export const DonationCreateDonor = () => {
    return (
        <>
            <GoBackButton />
            <h1 className={styles.heading}>Realizar Donación</h1>
            <div className={styles.content}>
                <main className={styles.main}>
                    <p>
                        ¿Cuánto le gustaría donar? Como colaborador de la
                        Fundación Sanders, nos aseguramos de que su donación
                        vaya directamente a apoyar nuestra causa.
                    </p>
                    <DonationCreateFormDonor />
                </main>
                <aside className={styles.sidebar}></aside>
            </div>
        </>
    );
};

export const DonationFormAdmin = ({
    initialDonation,
}: {
    initialDonation?: Donation;
}) => {


    return (
        <>
            <form className={styles.form}>
                {initialDonation && initialDonation.donor.role === "donor" ? (
                    <></>
                ) : (
                    <>
                        <div className={`${styles.field}`}>
                            <label htmlFor="amount">Donador</label>
                            <select name="donor">
                                <option value="" disabled>
                                    -- Seleccion un dondador físico --
                                </option>
                            </select>
                        </div>
                        <div className={`${styles.field}`}>
                            <label htmlFor="amount">Cantidad</label>
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                placeholder="Cantidad de donación"
                            />
                        </div>
                    </>
                )}
                <div className={`${styles.field}`}>
                    <label htmlFor="amount">Proyecto</label>
                    <select name="donor">
                        <option value="" disabled>
                            -- Seleccion un proyecto --
                        </option>
                    </select>
                </div>
            </form>
        </>
    );
};

export const DonationCreateAdmin = () => {
    return (
        <>
            <GoBackButton />
            <h1 className={styles.heading}>Crear Donación</h1>
            <div className={styles.content}>
                <DonationFormAdmin />
                <aside className={styles.sidebar}></aside>
            </div>
        </>
    );
};

export const DonationUpdateAdmin = () => {
    const params = useParams();
    const notify = useNotify();
    const [donation, setDonation] = useState<Donation>({
        id: "",
        amount: 0,
        createdAt: "",
        project: "",
        donor: {
            name: "",
            surname: "",
            role: "",
        },
        method: "",
    });

    useEffect(() => {
        if (params.id) {
            dataProvider
                .getOne("donations", params)
                .then((response) => {
                    console.log(response);
                    setDonation({
                        id: response.data.id,
                        amount: response.data.amount,
                        createdAt: response.data.createdAt,
                        project: response.data.project,
                        donor: {
                            name: response.data.donor.name,
                            surname: response.data.donor.surname,
                            role: response.data.donor.role,
                        },
                        method: response.data.method,
                    });
                })
                .catch((error) => {
                    console.log(error);
                    notify(
                        "Error al obtener la donación. Refresca la página para intentar nuevamente",
                        { type: "error" }
                    );
                });
        }
    }, [params]);

    return (
        <>
            <GoBackButton />
            <h1 className={styles.heading}>
                Editar Donación de {donation.donor.name}{" "}
                {donation.donor.surname}
            </h1>
            <div className={styles.content}>
                <DonationFormAdmin initialDonation={donation} />
                <aside className={styles.sidebar}></aside>
            </div>
        </>
    );
};
