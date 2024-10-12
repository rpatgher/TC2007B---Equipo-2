// import { useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
import { usePermissions, useNotify, useAuthProvider } from "react-admin";

import AdminDash from "./AdminDash";
import DonorDash from "./DonorDash";
import { useEffect } from "react";
// import authProvider from "../../authProvider";


export const Dashboard = () => {
    const { permissions } = usePermissions();
    const notify = useNotify();
    const authProvider = useAuthProvider();

    useEffect(() => {
        authProvider?.getPermissions(null)
            .then((_) => {
                // console.log(response);
            })
            .catch((error) => {
                console.log(error);
                notify('Error al obtener los permisos. Refresca la página para volver a intentar', { type: 'error' });
            });
    }, [permissions, notify, authProvider]);

    return (
        permissions === "admin" ? (
                <AdminDash />
            ) : (
                <DonorDash />
            )
    );
}