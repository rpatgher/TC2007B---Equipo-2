import { useState, useEffect } from "react";
import { useNotify, usePermissions } from "react-admin";
import { useNavigate, useParams } from "react-router-dom";

import dataProvider from "../../dataProvider";

// *************** Components ***************
import GoBackButton from "../../components/GoBackButton/GoBackButton";
import ModalDelete from "../../components/ModalDelete/ModalDelete";
import ProjectCardInShow from "../../components/ProjectCard/ProjectCardInShow";

// ***************** Helpers ***************** //
import formatDate from "../../helpers/formatDate";
import formatMoney from "../../helpers/formatMoney";

// *************** Styles ***************
import styles from "./DonationShow.module.css";

// ******************** Animation **************************
import AnimationComponent from '../../components/AnimationComponent/AnimationComponent';

// *************** Types ***************
type Donation = {
    id?: string;
    amount: number;
    createdAt: string;
    project?: {
        id: string;
        name: string;
        description: string;
        createdAt: string;
        type: string;
        money_goal: number;
        money_raised: number;
        milestones?: [];
        impact?: string;
        generatedImpact?: string;
    };
    donor: {
        name: string;
        surname: string;
        role: string;
    };
    method: string;
};

export const DonationShow = () => {
    const { permissions } = usePermissions();
    const navigate = useNavigate();
    const notify = useNotify();
    const params = useParams();
    const [modalDelete, setModalDelete] = useState(false);
    const [donation, setDonation] = useState<Donation>({
        id: "",
        donor: {
            name: "",
            surname: "",
            role: "",
        },
        project: {
            id: "",
            name: "",
            description: "",
            createdAt: "",
            type: "",
            money_goal: 0,
            money_raised: 0,
            milestones: [],
            impact: "",
            generatedImpact: "",
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
                            role: response.data.donor.role,
                        },
                        project: response.data.project,
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

    const handleDelete = () => {
        setModalDelete(true);
    }

    const handleDeleteProject = () => {
        dataProvider
            .delete("donations", { id: donation.id })
            .then((_) => {
                notify("Donación eliminada correctamente", { type: "info" });
                navigate("/dashboard/donations");
            })
            .catch((error) => {
                console.log(error);
                notify(
                    "Error al eliminar la donación. Refresca la página para intentar nuevamente",
                    { type: "error" }
                );
            });
    }

    return (
        <>
            <GoBackButton />
            <AnimationComponent>
                {permissions === "admin" && (
                    <h1 className={styles.heading}>
                        Donación de {donation.donor.name} {donation.donor.surname}
                    </h1>
                )}
            </AnimationComponent>
            <AnimationComponent dir="down">
                <div className={styles.content}>
                    <div className={styles.info}>
                        <div className={styles.left}>
                            {permissions !== "admin" && (
                                donation.project && (
                                    <p className={styles.generated}>
                                        Tu aportación equivale a: <span>{donation?.project?.generatedImpact}</span>
                                    </p>
                                )
                            )}
                            <p className={styles.since}>
                                Donado el <span>{formatDate(donation.createdAt)}</span>
                            </p>
                            <p className={styles.method}>
                                Método de pago: <span>{donation.method.slice(0, 1).toUpperCase() + donation.method.slice(1)}</span>
                            </p>
                            <p className={styles["project-label"]}>Proyecto:</p>
                            <ProjectCardInShow 
                                project={donation.project} 
                            />
                        </div>
                        <div className={styles.right}>
                            <p className={styles.amount}>Monto: {formatMoney(donation.amount)}</p>
                        </div>
                    </div>
                    <div className={styles.actions}>
                        {permissions === "admin" && (
                            <>
                                <button
                                    className={styles["edit-button"]}
                                    onClick={() => navigate(`/dashboard/donations/${donation.id}`)}
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
                                {donation.donor.role === 'physical-donor' && (
                                    <button
                                        className={styles["delete-button"]}
                                        onClick={handleDelete}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                                        Borrar
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </AnimationComponent>
            {modalDelete && (
                <ModalDelete
                    entity='proyecto'
                    setModalDelete={setModalDelete}
                    handleDeleteElement={handleDeleteProject}
                />
            )}
        </>
    );
};
