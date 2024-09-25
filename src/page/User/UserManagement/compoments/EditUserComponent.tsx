import { OverLay } from "../../../../compoments/OverLay/OverLay";
import React, { ChangeEvent } from "react";
import { Role } from "../../../../interface/Role";
import { Account } from "../../../../interface/Account";
import validateFullname from "../../../../util/validateFullName";
import validateEmail from "../../../../util/validateEmail";
import validatePhone from "../../../../util/validatePhone";
import GetRolesAPI from "../../../../services/authen-api/GetRolesAPI";
import GetAccountById from "../../../../services/authen-api/GetAccountById";
import UpdateAccountAPI from "../../../../services/authen-api/UpdateAccountAPI";
import GetAccountsAPI from "../../../../services/authen-api/GetAccountsAPI";
import PaginationType from "../../../../interface/Pagination";
import { Alert, Col, Container, Form, Image, InputGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faChevronLeft, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import Gender from "../../../../enum/Gender";
import ChangePasswordForm from "./ChangePasswordForm";

interface EditUserComponentProps {
    hideOverlay: () => void;
    userId: string;
    updateUsers?: (response: Account[]) => void;
    updatePagination: (response: PaginationType) => void;
}

interface FormDataTypes {
    fullName?: string;
    dateOfBirth?: string;
    gender?: string;
    email?: string;
    phoneNumber?: string;
    position?: string;
    address?: string;
    username?: string;
    roleName?: string;
    password?: string;
    confirmPassword?: string;
}

interface FormErrorTypes {
    fullName?: string;
    dateOfBirth?: string;
    gender?: string;
    email?: string;
    phoneNumber?: string;
    position?: string;
    address?: string;
    username?: string;
    roleName?: string;
    password?: string;
    confirmPassword?: string;
}

export const EditUserComponent: React.FC<EditUserComponentProps> = ({ hideOverlay, userId, updateUsers, updatePagination }) => {

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isLoadingSubmit, setIsLoadingSubmit] = React.useState<boolean>(false);
    const [globalError, setGlobalError] = React.useState<string>("");
    const [globalSuccess, setGlobalSuccess] = React.useState<string>("");
    const [editUser, setEditUser] = React.useState<boolean>(false);
    const [changePassword, setChangePassword] = React.useState<boolean>(false);
    const [roles, setRoles] = React.useState<Role[]>([]);
    const [dataDefault, setDataDefault] = React.useState<FormDataTypes>({
        fullName: "",
        dateOfBirth: "",
        gender: "",
        email: "",
        phoneNumber: "",
        position: "",
        address: "",
        username: "",
        roleName: "",
    });
    const [formData, setFormData] = React.useState<FormDataTypes>({
        fullName: "",
        dateOfBirth: "",
        gender: "",
        email: "",
        phoneNumber: "",
        position: "",
        address: "",
        roleName: "",
        username: "",
    });

    const [formError, setFormError] = React.useState<FormErrorTypes>({
        fullName: "",
        dateOfBirth: "",
        gender: "",
        email: "",
        phoneNumber: "",
        position: "",
        address: "",
        roleName: "",
        username: "",
    });
    const gender: Gender[] = [Gender.Male, Gender.Female, Gender.Others];

    React.useEffect(() => {
        setIsLoading(true);
        GetRolesAPI()
            .then((response) => {
                setRoles(response);
            }).catch((err) => {
                console.error(err.message);
                setGlobalError(err.message);
            }).finally(() => {
                setIsLoading(false);
            })
    }, [])

    React.useEffect(() => {
        if (userId) {
            GetAccountById(userId)
                .then((response) => {
                    setFormData({
                        fullName: response.fullName,
                        dateOfBirth: response.dateOfBirth,
                        gender: response.gender,
                        email: response.email,
                        phoneNumber: response.phoneNumber,
                        position: response.position,
                        address: response.address,
                        username: response.username,
                        roleName: response.role.name,
                    });
                    setDataDefault({
                        fullName: response.fullName,
                        dateOfBirth: response.dateOfBirth,
                        gender: response.gender,
                        email: response.email,
                        phoneNumber: response.phoneNumber,
                        position: response.position,
                        address: response.address,
                        username: response.username,
                        roleName: response.role.name,
                    });
                }).catch((err) => {
                    console.error(err.message);
                    setGlobalError(err.message);
                })
        }
    }, [userId])

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(preVal => ({
            ...preVal,
            [name]: value
        }));
        setFormError(preVal => ({
            ...preVal,
            [name]: ""
        }));
    };

    const validate1 = (): boolean => {
        let check = true;

        if (!formData.fullName) {
            check = false;
            setFormError(preVal => {
                return { ...preVal, fullname: "Fullname is required" }
            })
        }

        if (!formData.roleName) {
            check = false;
            setFormError(preVal => {
                return { ...preVal, role: "Role is required" }
            })
        }

        if (!formData.email) {
            check = false;
            setFormError(preVal => {
                return { ...preVal, email: "Email is required" }
            })
        }

        if (!formData.phoneNumber) {
            check = false;
            setFormError(preVal => {
                return { ...preVal, phone: "Phone is required" }
            })
        }

        if (!formData.password && !userId) {
            check = false;
            setFormError(preVal => {
                return { ...preVal, password: "Password is required" }
            })
        }

        return check
    }

    const validate2 = (): boolean => {
        let check = true;
        const checkFullName = validateFullname(formData.fullName || "");
        const checkEmail = validateEmail(formData.email || "");
        const checkPhone = validatePhone(formData.phoneNumber || "");

        if (checkFullName) {
            check = false;
            setFormError(preVal => {
                return { ...preVal, fullname: checkFullName }
            })
        }

        if (checkEmail) {
            check = false;
            setFormError(preVal => {
                return { ...preVal, email: checkEmail }
            })
        }

        if (checkPhone) {
            check = false;
            setFormError(preVal => {
                return { ...preVal, phone: checkPhone }
            })
        }

        return check
    }

    const checkChangeFormData = (): boolean => {

        let check = true;

        if (formData.fullName !== dataDefault.fullName) {
            check = false;
        }

        if (formData.dateOfBirth !== dataDefault.dateOfBirth) {
            check = false;
        }

        if (formData.gender !== dataDefault.gender) {
            check = false;
        }

        if (formData.email !== dataDefault.email) {
            check = false;
        }

        if (formData.phoneNumber !== dataDefault.phoneNumber) {
            check = false;
        }

        if (formData.position !== dataDefault.position) {
            check = false;
        }

        if (formData.address !== dataDefault.address) {
            check = false;
        }

        if (formData.roleName !== dataDefault.roleName) {
            check = false;
        }

        return check;

    }

    const handleSubmit = () => {
        if (validate1() && validate2()) {
            setIsLoadingSubmit(true);
            if (userId) {
                UpdateAccountAPI(userId, formData)
                    .then(() => {
                        const dataRequest = {
                            ...formData,
                        }
                        delete dataRequest.username;
                        setDataDefault(dataRequest);
                        return GetAccountsAPI();
                    }).then((response) => {
                        if (updateUsers) {
                            updateUsers(response.data);
                            updatePagination({
                                totalPage: response.totalPage,
                                limit: response.limit,
                                offset: response.offset,
                                totalElementOfPage: response.totalElementOfPage
                            })
                            setGlobalSuccess("Update user successfully!");
                            setEditUser(false);
                        } else {
                            throw new Error("updateUsers is not a function");
                        }
                    }).catch((err) => {
                        const message: string = err.message.toLowerCase();
                        if (message.includes("password")) {
                            setFormError(preVal => {
                                return { ...preVal, password: err.message }
                            })
                        } else if (message.includes("role")) {
                            setFormError(preVal => {
                                return { ...preVal, roleName: err.message }
                            })
                        } else {
                            setGlobalError(err.message);
                        }
                    }).finally(() => {
                        setIsLoadingSubmit(false);
                    })
                return;
            } else {
                setGlobalError("User id is not found");
            }
        }
    }

    return (
        <OverLay className="disabled-padding">
            <Container fluid className="w-100 h-100 p-4 bg-light">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex flex-row align-items-center gap-2">
                        <button
                            onClick={() => hideOverlay()}
                            className="btn fs-3 px-3 text-primary"
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <h2 className="fw-bold mb-0">{userId ? "Edit User" : "Add User"}</h2>
                    </div>
                    {globalError && <Alert onClose={() => setGlobalError("")} variant="danger" dismissible>{globalError}</Alert>}
                    {globalSuccess && <Alert onClose={() => setGlobalSuccess("")} variant="success" dismissible>{globalSuccess}</Alert>}
                    {editUser ? (
                        <div className="d-flex flex-row gap-2">
                            <button
                                disabled={isLoadingSubmit || checkChangeFormData()}
                                onClick={() => handleSubmit()}
                                className="btn btn-primary d-flex align-items-center"
                            >
                                <FontAwesomeIcon icon={faSave} className="me-2" />
                                {isLoadingSubmit ? "Saving..." : "Save"}
                            </button>
                            <button
                                disabled={isLoadingSubmit}
                                onClick={() => {
                                    setEditUser(false);
                                    setFormData(dataDefault);
                                }}
                                className="btn btn-secondary"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            disabled={isLoadingSubmit || isLoading}
                            onClick={() => setEditUser(true)}
                            className="btn btn-danger fw-bold d-flex align-items-center"
                        >
                            <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                        </button>
                    )}
                </div>

                <Row className="p-4 rounded shadow">
                    <Col md={6} className="shadow rounded">
                        <div className="d-flex flex-row align-items-center p-3 gap-3 rounded mb-1 user-card">
                            <div className="position-relative">
                                <Image src="https://res.cloudinary.com/dlrionk8h/image/upload/v1727174250/er5mtiiis4yruphmbobm.jpg" roundedCircle style={{ width: "120px", height: "120px" }} />
                                <div className="position-absolute bottom-0 end-0">
                                    <button
                                        className="btn btn-light btn-sm shadow-sm rounded-circle d-flex align-items-center justify-content-center text-primary"
                                        style={{ width: "35px", height: "35px" }}
                                        onClick={() => { console.log("click") }}
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                </div>
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                                <span className="fw-semibold">{formData.fullName || "No data!"}</span>
                                <span>{formData.position || "No data!"}</span>
                                <span>{formData.address || "No data!"}</span>
                            </div>
                        </div>

                        <div className="p-3 gap-3 rounded mb-1">
                            <h5 className="fw-semibold">Basic Information</h5>
                            <Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        className="py-3"
                                        type="text"
                                        value={formData.fullName}
                                        name="fullName"
                                        onChange={handleChangeInput}
                                        disabled={!editUser}
                                    />
                                    <Form.Text className="text-danger">{formError.fullName}</Form.Text>
                                </Form.Group>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Date of Birth</Form.Label>
                                        <Form.Control
                                            className="py-3"
                                            type="date"
                                            value={formData.dateOfBirth}
                                            name="dateOfBirth"
                                            disabled={!editUser}
                                            onChange={handleChangeInput}
                                        />
                                        <Form.Text className="text-danger">{formError.dateOfBirth}</Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Select
                                            value={formData.gender}
                                            onChange={handleChangeInput}
                                            name="gender"
                                            disabled={!editUser}
                                            className="py-3"
                                        >
                                            <option value={""}>Choose...</option>
                                            {gender.map((item, index) => (
                                                <option key={index} value={item}>{item}</option>
                                            ))}
                                        </Form.Select>
                                        <Form.Text className="text-danger">{formError.gender}</Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                        <div className="p-3 gap-3 rounded">
                            <h5 className="fw-semibold">Personal Information</h5>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            className="py-3"
                                            type="email"
                                            value={formData.email}
                                            name="email"
                                            onChange={handleChangeInput}
                                            disabled={!editUser}
                                        />
                                        <Form.Text className="text-danger">{formError.email}</Form.Text>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Position</Form.Label>
                                        <Form.Control
                                            className="py-3"
                                            type="text"
                                            value={formData.position}
                                            name="position"
                                            onChange={handleChangeInput}
                                            disabled={!editUser}
                                        />
                                        <Form.Text className="text-danger">{formError.position}</Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            className="py-3"
                                            type="text"
                                            value={formData.phoneNumber}
                                            name="phoneNumber"
                                            onChange={handleChangeInput}
                                            disabled={!editUser}
                                        />
                                        <Form.Text className="text-danger">{formError.phoneNumber}</Form.Text>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control
                                            className="py-3"
                                            type="text"
                                            value={formData.address}
                                            name="address"
                                            onChange={handleChangeInput}
                                            disabled={!editUser}
                                        />
                                        <Form.Text className="text-danger">{formError.address}</Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    </Col>


                    <Col md={6} >
                        <div className="p-3 gap-3 rounded">
                            <h5 className="fw-semibold">Account Information</h5>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            className="py-3"
                                            type="text"
                                            value={formData.username}
                                            name="username"
                                            disabled
                                        />
                                        <Form.Text className="text-danger">{formError.username}</Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Role</Form.Label>
                                        <Form.Select
                                            value={formData.roleName}
                                            name="roleName"
                                            onChange={handleChangeInput}
                                            disabled={!editUser}
                                            className="py-3"
                                        >
                                            <option value={""}>Choose...</option>
                                            {roles.map((item, index) => (
                                                <option key={index} value={item.name}>{item.name}</option>
                                            ))}
                                        </Form.Select>
                                        <Form.Text className="text-danger">{formError.roleName}</Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        className="py-3"
                                        type="password"
                                        value={"********"}
                                        name="password"
                                        disabled
                                    />
                                    <InputGroup.Text>
                                        <button
                                            className="btn btn-outline-secondary btn-sm"
                                            disabled={!editUser}
                                            onClick={() => setChangePassword(true)}
                                        >
                                            Change Password
                                        </button>
                                    </InputGroup.Text>
                                </InputGroup>
                                <Form.Text className="text-danger">{formError.password}</Form.Text>
                            </Form.Group>
                        </div>
                    </Col>
                </Row>
                {changePassword && <ChangePasswordForm userId={userId} hideOver={() => setChangePassword(false)} />}
            </Container>
        </OverLay >
    );
}