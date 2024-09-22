import { Alert, Button, CloseButton, Col, Form, Row } from "react-bootstrap"
import { OverLay } from "../../../../compoments/OverLay/OverLay"
import React from "react";
import RegisterAPI from "../../../../services/authen-api/RegisterAPI";
import { Account } from "../../../../interface/Account";
import PaginationType from "../../../../interface/Pagination";
import GetAccountsAPI from "../../../../services/authen-api/GetAccountsAPI";
import { Role } from "../../../../interface/Role";
import GetRolesAPI from "../../../../services/authen-api/GetRolesAPI";
import validateFullname from "../../../../util/validateFullName";
import validateEmail from "../../../../util/validateEmail";
import ValidatePassWord from "../../../../util/validatePassword";
import validatePhone from "../../../../util/validatePhone";
import ValidateUsername from "../../../../util/validateUsername";

interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    phoneNumber: string;
    roleName: string;
    position: string;
    address: string;
    gender: string;
}

interface FormRegisterUserProps {
    handleClose: () => void;
    updateUsers: (response: Account[]) => void;
    updatePagination: (response: PaginationType) => void;
}

const FormRegisterUser: React.FC<FormRegisterUserProps> = ({ handleClose, updatePagination, updateUsers }) => {

    const [loading, setLoading] = React.useState<boolean>(false);
    const [globalError, setGlobalError] = React.useState<string>("");
    const [roles, setRoles] = React.useState<Role[]>([]);
    const [formData, setFormData] = React.useState<FormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        phoneNumber: '',
        roleName: '',
        position: '',
        address: '',
        gender: ''
    });
    const [formError, setFormError] = React.useState<FormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        phoneNumber: '',
        roleName: '',
        position: '',
        address: '',
        gender: ''
    });

    React.useEffect(() => {
        setLoading(true);
        GetRolesAPI()
            .then((response) => {
                setRoles(response);
            }).catch((error) => {
                console.error(error);
                setGlobalError(error.message);
            }).finally(() => {
                setLoading(false);
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setFormError({
            ...formError,
            [name]: ''
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate1() && !validate2()) {
            setLoading(true);
            RegisterAPI(formData)
                .then(() => {
                    return GetAccountsAPI();
                }).then((response) => {
                    updateUsers(response.data);
                    updatePagination({
                        totalPage: response.totalPage,
                        limit: response.limit,
                        offset: response.offset,
                        totalElementOfPage: response.totalElementOfPage
                    });
                    handleClose();
                })
                .catch((error) => {
                    console.error(error);
                    const message: string = error.message.toLowerCase();
                    if (message.includes("email")) {
                        setFormError((prev) => ({
                            ...prev,
                            email: message
                        }));
                    } else if (message.includes("username")) {
                        setFormError((prev) => ({
                            ...prev,
                            username: message
                        }));
                    } else {
                        setGlobalError(message);
                    }
                }).finally(() => {
                    setLoading(false);
                });
        }
    };

    const validate1 = () => {
        let isError = false;

        if (formData.password !== formData.confirmPassword) {
            setFormError((prev) => ({
                ...prev,
                confirmPassword: "Password and confirm password do not match."
            }));
            isError = true;
        }

        return isError;

    }

    const validate2 = () => {

        let isError = false;

        const checkFullName = validateFullname(formData.fullName);
        const checkEmail = validateEmail(formData.email);
        const checkPassword = ValidatePassWord(formData.password);
        const checkPhone = validatePhone(formData.phoneNumber);
        const checkUserName = ValidateUsername(formData.username);

        if (checkFullName) {
            setFormError((prev) => ({
                ...prev,
                fullName: checkFullName
            }));
            isError = true;
        }

        if (checkEmail) {
            setFormError((prev) => ({
                ...prev,
                email: checkEmail
            }));
            isError = true;
        }

        if (checkPassword) {
            setFormError((prev) => ({
                ...prev,
                password: checkPassword
            }));
            isError = true;
        }

        if (checkPhone) {
            setFormError((prev) => ({
                ...prev,
                phoneNumber: checkPhone
            }));
            isError = true;
        }

        if (checkUserName) {
            setFormError((prev) => ({
                ...prev,
                username: checkUserName
            }));
            isError = true;
        }

        return isError;
    }

    return (
        <OverLay>
            <div className="container mt-5">
                {
                    globalError && (
                        <Alert variant="danger" onClose={() => setGlobalError("")} dismissible>
                            {globalError}
                        </Alert>
                    )
                }
                <Form onSubmit={handleSubmit} className="shadow-lg p-5 rounded bg-light position-relative">
                    <CloseButton
                        onClick={handleClose}
                        className="position-absolute btn-close"
                        style={{ top: "20px", right: "20px", cursor: 'pointer' }}
                    />
                    <h2 className="text-center mb-4 fw-bold">User Registration</h2>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-4" controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter username"
                                    name="username"
                                    value={formData.username}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                    required
                                    className="rounded"
                                />
                                <Form.Text className="text-danger">{formError.username}</Form.Text>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-4" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={formData.email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                    required
                                    className="rounded"
                                />
                                <Form.Text className="text-danger">{formError.email}</Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-4" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    name="password"
                                    value={formData.password}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                    required
                                    className="rounded"
                                />
                                <Form.Text className="text-danger">{formError.password}</Form.Text>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-4" controlId="formConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                    required
                                    className="rounded"
                                />
                                <Form.Text className="text-danger">{formError.confirmPassword}</Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-4" controlId="formFullName">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter full name"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                    required
                                    className="rounded"
                                />
                                <Form.Text className="text-danger">{formError.fullName}</Form.Text>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-4" controlId="formPhoneNumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter phone number"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                    required
                                    className="rounded"
                                />
                                <Form.Text className="text-danger">{formError.phoneNumber}</Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-4" controlId="formRoleName">
                                <Form.Label>Role</Form.Label>
                                <Form.Select
                                    name="roleName"
                                    value={formData.roleName}
                                    onChange={handleChange}
                                    required
                                    className="rounded"
                                >
                                    <option value="">Choose role...</option>
                                    {roles.map((role, index) => (
                                        <option key={index} value={role.name}>
                                            {role.name}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Text className="text-danger">{formError.roleName}</Form.Text>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-4" controlId="formPosition">
                                <Form.Label>Position</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter position"
                                    name="position"
                                    value={formData.position}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                    required
                                    className="rounded"
                                />
                                <Form.Text className="text-danger">{formError.position}</Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-4" controlId="formAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter address"
                                    name="address"
                                    value={formData.address}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                    required
                                    className="rounded"
                                />
                                <Form.Text className="text-danger">{formError.address}</Form.Text>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-4" controlId="formGender">
                                <Form.Label>Gender</Form.Label>
                                <div className="d-flex align-items-center">
                                    <Form.Check
                                        inline
                                        label="Male"
                                        name="gender"
                                        type="radio"
                                        value="male"
                                        checked={formData.gender === 'male'}
                                        onChange={handleChange}
                                        className="me-3"
                                    />
                                    <Form.Check
                                        inline
                                        label="Female"
                                        name="gender"
                                        type="radio"
                                        value="female"
                                        checked={formData.gender === 'female'}
                                        onChange={handleChange}
                                    />
                                </div>
                                <Form.Text className="text-danger">{formError.gender}</Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Button disabled={loading} variant="primary" type="submit" className="w-100 py-3 rounded" style={{ fontWeight: 'bold', letterSpacing: '1px' }}>
                        {loading ? "Loading..." : "Register"}
                    </Button>
                </Form>
            </div>

        </OverLay>
    );
}

export default FormRegisterUser