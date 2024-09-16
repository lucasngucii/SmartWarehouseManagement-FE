import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import ValidateUsername from "../../util/validateUsername";
import ValidatePassWord from "../../util/validatePassword";
import LoginAPI from "../../services/authen-api/LoginAPI";
import GetProfileByTokenAPI from "../../services/authen-api/GetProfileByTokenAPI";

interface formDataType {
    username: string;
    password: string;
}

interface ErrorsType {
    username: string;
    password: string;
}

export const Login: React.FC = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = React.useState<formDataType>({
        username: "",
        password: ""
    });
    const [globalError, setGlobalError] = React.useState<string>("");
    const [errors, setErrors] = React.useState<ErrorsType>({
        username: "",
        password: ""
    });
    const [loading, setLoading] = React.useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGlobalError("");
        setErrors({
            ...errors,
            [e.target.name]: ""
        });
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const validate1 = () => {

        let check = true;

        if (!formData.username) {
            setErrors(prevState => {
                return {
                    ...prevState,
                    username: "Username is required"
                }
            });
            check = false;
        }

        if (!formData.password) {
            setErrors(prevState => {
                return {
                    ...prevState,
                    password: "Password is required"
                }
            });
            check = false;
        }

        return check;
    }

    const validate2 = () => {
        let check = true;
        const checkUsername = ValidateUsername(formData.username);
        const checkPassword = ValidatePassWord(formData.password);

        if (checkUsername) {
            setErrors(prevState => {
                return {
                    ...prevState,
                    username: "Invalid username"
                }
            });
            check = false;
        }

        if (checkPassword) {
            setErrors(prevState => {
                return {
                    ...prevState,
                    password: "Invalid password"
                }
            });
            check = false;
        }

        return check;
    }

    const handleSubmit = async () => {
        setLoading(true);

        LoginAPI(formData)
            .then((responseLogin) => {
                const token = responseLogin.token;
                localStorage.setItem("token", token);
                return GetProfileByTokenAPI(token);
            }).then((responseGetProfile) => {
                localStorage.setItem("profile", JSON.stringify(responseGetProfile));
                navigate("/");
                return
            }).catch((error) => {
                setGlobalError(error.message);
            }).finally(() => {
                setLoading(false);
            });
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Login</h1>
                <p className="primary-message-error margin-bottom-15 text-center">{globalError}</p>
                <form className="form">
                    <div className={"form-input-container"}>
                        <label className="form-input-lable">Username:</label>
                        <input
                            onChange={handleInputChange}
                            type="text"
                            name="username"
                            className="form-input"
                            placeholder="Enter your username"
                        />
                        <span className="form-error">{errors.username}</span>
                    </div>
                    <div className={"form-input-container"}>
                        <label className="form-input-lable">Password:</label>
                        <input
                            onChange={handleInputChange}
                            type="password"
                            name="password"
                            className="form-input"
                            placeholder="Enter your password" />
                        <span className="form-error">{errors.password}</span>
                    </div>
                    <button
                        onClick={() => { if (validate1() && validate2()) handleSubmit() }}
                        type="button"
                        className="form-input-submit"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}