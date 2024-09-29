import React from "react";
import "./Dashboard.css";
import checkIsLogin from "../../util/Authen/CheckIsLogin";

const Dashboard: React.FC = () => {
    return (
        <div className={"container-dashboard"}>

        </div>
    )
}

const ProtectedDashboard: React.FC = () => {
    const AuthenticatedOutlet = checkIsLogin(Dashboard);
    return <AuthenticatedOutlet />;
}

export default ProtectedDashboard