import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import ValidateUsername from "../../util/validateUsername";
import ValidatePassWord from "../../util/validatePassword";
import LoginAPI from "../../services/authen-api/LoginAPI";
import GetProfileByTokenAPI from "../../services/authen-api/GetProfileByTokenAPI";
import { Form } from "react-bootstrap";

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
                <p className="h2 text-center fw-bold">Login</p>
                <p className="mb-3 text-center text-danger">{globalError}</p>
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    if (validate1() && validate2()) handleSubmit()
                }}>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            className="py-2"
                            type="text"
                            placeholder="Enter your username"
                            name="username"
                            onChange={handleInputChange}
                        />
                        <Form.Text className="text-danger">{errors.username}</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            className="py-2"
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            onChange={handleInputChange}
                        />
                        <Form.Text className="text-danger">{errors.password}</Form.Text>
                    </Form.Group>
                    <Form.Control className="btn btn-primary" type="submit" disabled={loading} value={loading ? "Loading..." : "Login"} />
                </Form>
            </div>
        </div>
    );
}