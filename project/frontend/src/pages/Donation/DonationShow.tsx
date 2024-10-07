import { useState, useEffect } from "react";
import { useNotify, usePermissions } from "react-admin";
import { useNavigate, useParams } from "react-router-dom";

import dataProvider from "../../dataProvider";

// *************** Components ***************
import GoBackButton from "../../components/GoBackButton/GoBackButton";

// ***************** Helpers ***************** //
import formatDate from "../../helpers/formatDate";

// *************** Styles ***************
import styles from "./DonationShow.module.css";

// *************** Types ***************
type Donation = {
    id?: string;
    amount: number;
    createdAt: string;
    project?: string;
    donor: {
        name: string;
        surname: string;
    };
    method: string;
};

export const DonationShow = () => {
    const { permissions } = usePermissions();
    const navigate = useNavigate();
    const notify = useNotify();
    const params = useParams();
    const [donation, setDonation] = useState<Donation>({
        id: "",
        donor: {
            name: "",
            surname: "",
        },
        amount: 0,
        createdAt: "",
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
                        donor: {
                            name: response.data.donor.name,
                            surname: response.data.donor.surname,
                        },
                        amount: response.data.amount,
                        createdAt: response.data.createdAt,
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
                Donación de {donation.donor.name} {donation.donor.surname}
            </h1>
            <div className={styles.content}>
                <div className={styles.info}>
                    

                </div>
                <div className={styles.actions}>
                    {permissions === "admin" && (
                        <button
                            className={styles["edit-button"]}
                            onClick={() => navigate(`/donations/${donation.id}`)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="#e8eaed"
                            >
                                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                            </svg>
                            Editar
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};
