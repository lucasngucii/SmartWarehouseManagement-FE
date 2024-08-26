import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {

    const navigate = useNavigate();

    const moveDashboard = () => {
        navigate("/dashboard");
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Login</h1>
                <form>
                    <div className={"form-group"}>
                        <label>Username:</label>
                        <input type="text" placeholder="Enter your username"/>
                        <span className="form-error">username is required</span>
                    </div>
                    <div className={"form-group"}>
                        <label>Password:</label>
                        <input type="password" placeholder="Enter your password"/>
                        <span className="form-error">password is required</span>
                    </div>
                    <button
                        onClick={()=> moveDashboard()}
                        type="button"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}