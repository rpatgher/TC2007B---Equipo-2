// import { useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
import { usePermissions } from "react-admin";

import AdminDash from "./AdminDash";
import DonorDash from "./DonorDash";
import { useEffect } from "react";
import authProvider from "../../authProvider";


export const Dashboard = () => {
    const { permissions } = usePermissions();

    useEffect(() => {
        authProvider.getPermissions(null)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        permissions === "admin" ? (
                <AdminDash />
            ) : (
                <DonorDash />
            )
    );
}