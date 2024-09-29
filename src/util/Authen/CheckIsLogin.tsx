import React from "react";

const CheckIsLogin = <P extends Object>(WrapComponent: React.ComponentType<P>) => {
    return (props: P) => {
        const token = localStorage.getItem("token");
        if (token) {
            return <WrapComponent {...props} />;
        } else {
            window.location.href = "/login";
            return null;
        }
    }
}

export default CheckIsLogin;