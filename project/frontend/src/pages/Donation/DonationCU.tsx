import { useState, useEffect } from "react";
import { useNotify } from "react-admin";
import { useNavigate, useParams } from "react-router-dom";

import dataProvider from "../../dataProvider";

// ********************** Styles **********************
import styles from "./DonationCU.module.css";

// ********************** Components **********************
import GoBackButton from "../../components/GoBackButton/GoBackButton";

type Donation = {
    id?: string;
    amount: string;
    createdAt: string;
    project?: {
        id: string;
    };
    donor: {
        id: string;
        name?: string;
        surname?: string;
        role?: string;
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
    edit
}: {
    initialDonation?: Donation;
    edit?: boolean;
}) => {
    const notify = useNotify();
    const navigate = useNavigate();
    const [donors, setDonors] = useState<Array<any>>([]);
    const [projects, setProjects] = useState<Array<any>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [donation, setDonation] = useState<Donation>({
        id: "",
        amount: "",
        createdAt: "",
        project: {
            id: ""
        },
        donor: {
            id: "",
            name: "",
            surname: "",
            role: "",
        },
        method: "",
    });

    useEffect(() => {
        if (initialDonation) {
            setDonation(initialDonation);
        }
    }, [initialDonation]);


    useEffect(() => {
        // Get all physical donors and projects
        dataProvider.getPhyDonorsAndProjects("users").then((response) => {
            setDonors(response.data.donors);
            setProjects(response.data.projects);
        }).catch((error) => {
            console.log(error);
            notify("Error al obtener los donadores y proyectos. Refresca la página para intentar nuevamente",{ type: "error" });
        });
    }, []);

    const handleChange = (e: any) => {
        setDonation({
            ...donation,
            [e.target.name]: e.target.value,
        });
    }

    const handleSelectChange = (e: any) => {
        const value = e.target.value;
        if(e.target.name === "donor") {
            const donor = donors.find((donor) => donor.id === value);
            setDonation({
                ...donation,
                donor: {
                    id: donor.id,
                    name: donor.name,
                    surname: donor.surname,
                    role: donor.role,
                },
            });
        } else{
            const project = projects.find((project) => project.id === value);
            setDonation({
                ...donation,
                project: {
                    id: project.id,
                },
            });
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!donation.amount || !donation.donor.id) {
            notify("Por favor, rellene todos los campos obligatorios", { type: "error" });
            return;
        }
        setLoading(true);
        document.body.style.cursor = "wait";
        if(edit && initialDonation){
            dataProvider.update("donations", { id: initialDonation.id, data: donation })
                .then((_) => {
                    notify("Donación actualizada exitosamente", { type: "success" });
                    navigate("/donations");
                    setLoading(false);
                    document.body.style.cursor = "default";
                })
                .catch((error) => {
                    console.log(error);
                    notify("Error al actualizar la donación. Intenta Nuevamente", { type: "error" });
                    setLoading(false);
                    document.body.style.cursor = "default";
                })
                .finally(() => {
                    setLoading(false);
                    document.body.style.cursor = "default";
                });
        } else {
            dataProvider.create("donations", { data: donation })
                .then((_) => {
                    notify("Donación creada exitosamente", { type: "success" });
                    setLoading(false);
                    navigate("/donations");
                    document.body.style.cursor = "default";
                })
                .catch((error) => {
                    console.log(error);
                    notify("Error al crear la donación. Intenta Nuevamente", { type: "error" });
                    setLoading(false);
                    document.body.style.cursor = "default";
                })
                .finally(() => {
                    setLoading(false);
                    document.body.style.cursor = "default";
                });
        }
    }


    return (
        <>
            <form 
                className={styles.form}
                onSubmit={handleSubmit}
            >
                {initialDonation && initialDonation.donor.role === "donor" ? (
                    <></>
                ) : (
                    <>
                        <div className={`${styles.field}`}>
                            <label htmlFor="donor">Donador</label>
                            <select 
                                name="donor"
                                id="donor"
                                value={donation.donor.id}
                                onChange={handleSelectChange}
                            >
                                <option value="" disabled>
                                    -- Seleccion un dondador físico --
                                </option>
                                {donors.map((donor, index) => (
                                    <option 
                                        key={index} 
                                        value={donor.id}
                                    >
                                        {donor.name} {donor.surname}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={`${styles.field}`}>
                            <label htmlFor="amount">Cantidad</label>
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                placeholder="Cantidad de donación"
                                value={donation.amount}
                                onChange={handleChange}
                            />
                        </div>
                    </>
                )}
                <div className={`${styles.field}`}>
                    <label htmlFor="project">Proyecto</label>
                    <select 
                        name="project"
                        id="project"
                        value={donation?.project?.id || ""}
                        onChange={handleSelectChange}
                    >
                        <option value="" disabled>
                            -- Seleccion un proyecto --
                        </option>
                        {projects.map((project, index) => (
                            <option 
                                key={index} 
                                value={project.id}
                            >
                                {project.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.submit}>
                    <button 
                        type="submit"
                        className={`${styles["submit-button"]} ${loading ? styles.loading : ""}`}
                        disabled={loading}
                    >
                        {edit ? 'Guardar Donación' : 'Crear Donación'}
                    </button>
                </div>
            </form>
        </>
    );
};

export const DonationCreateAdmin = () => {
    return (
        <>
            <GoBackButton />
            <h1 className={styles.heading}>Crear Donación Física</h1>
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
        amount: "",
        createdAt: "",
        project: {
            id: ""
        },
        donor: {
            id: "",
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
                        project: {
                            id: response.data?.project?.id || "",
                        },
                        donor: {
                            id: response.data.donor.id,
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
