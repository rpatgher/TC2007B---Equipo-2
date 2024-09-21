import { usePermissions } from "react-admin";
import { Card, CardContent, CardHeader } from "@mui/material";


export const Dashboard = () => {
    const { permissions } = usePermissions();

    return (
        permissions === "admin" ? (
            <Card>
                <CardHeader title="Welcome to the administration">
                    <CardContent> Lorem ipsum sic dolor amet... </CardContent>
                </CardHeader>
            </Card>
            ) : (
                <Card>
                    <CardHeader title="Welcome to the donor dashboard">
                        <CardContent> Lorem ipsum sic dolor amet... </CardContent>
                    </CardHeader>
                </Card>
            )
    );
}