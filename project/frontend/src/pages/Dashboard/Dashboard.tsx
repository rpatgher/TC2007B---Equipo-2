// import { useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
import { usePermissions } from "react-admin";

import AdminDash from "./AdminDash";
import DonorDash from "./DonorDash";


export const Dashboard = () => {
    const { permissions } = usePermissions();

    return (
        permissions === "admin" ? (
                <AdminDash />
            ) : (
                <DonorDash />
            )
    );
}