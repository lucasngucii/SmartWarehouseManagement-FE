import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import ValidateUsername from "../../util/validateUsername";
import ValidatePassWord from "../../util/validatePassword";
import LoginAPI from "../../services/authen-api/LoginAPI";
import GetProfileByTokenAPI from "../../services/authen-api/GetProfileByTokenAPI";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
        <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <Row className="w-100">
                <Col xs={12} md={6} lg={4} className="mx-auto">
                    <div className="login-box shadow-lg p-4 rounded bg-white">
                        <h2 className="text-center mb-4 fw-bold">Login</h2>
                        {globalError && <p className="text-danger text-center">{globalError}</p>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    className="py-3"
                                    type="text"
                                    placeholder="Enter your username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    isInvalid={!!errors.username}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.username}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    className="py-3"
                                    type="password"
                                    placeholder="Enter your password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    isInvalid={!!errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button
                                variant="primary"
                                className="w-100 py-3 fw-bold"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Loading...' : 'Login'}
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}