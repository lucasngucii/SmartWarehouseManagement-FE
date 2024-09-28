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
import { Alert, Button, Col, Container, Form, Image, InputGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import Gender from "../../../../enum/Gender";
import ChangePasswordForm from "./ChangePasswordForm";
import RegisterAPI from "../../../../services/authen-api/RegisterAPI";
import { FormDataUser } from "../../../../interface/FormDataUser";
import ValidatePassWord from "../../../../util/validatePassword";
import ValidateUsername from "../../../../util/validateUsername";

interface EditUserComponentProps {
    hideOverlay: () => void;
    userId: string;
    updateUsers: (response: Account[]) => void;
    updatePagination: (response: PaginationType) => void;
}

export const EditUserComponent: React.FC<EditUserComponentProps> = ({ hideOverlay, userId, updateUsers, updatePagination }) => {

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isLoadingSubmit, setIsLoadingSubmit] = React.useState<boolean>(false);
    const [globalError, setGlobalError] = React.useState<string>("");
    const [globalSuccess, setGlobalSuccess] = React.useState<string>("");
    const [editUser, setEditUser] = React.useState<boolean>(false);
    const [changePassword, setChangePassword] = React.useState<boolean>(false);
    const [roles, setRoles] = React.useState<Role[]>([]);
    const [dataDefault, setDataDefault] = React.useState<FormDataUser>({
        fullName: "",
        dateOfBirth: "",
        gender: "",
        email: "",
        phoneNumber: "",
        position: "",
        address: "",
        username: "",
        roleName: "",
        image: "",
    });
    const [formData, setFormData] = React.useState<FormDataUser>({
        fullName: "",
        dateOfBirth: "",
        gender: "",
        email: "",
        phoneNumber: "",
        position: "",
        address: "",
        roleName: "",
        username: "",
        confirmPassword: "",
        password: "",
        image: "",
    });
    const [formError, setFormError] = React.useState<FormDataUser>({
        fullName: "",
        dateOfBirth: "",
        gender: "",
        email: "",
        phoneNumber: "",
        position: "",
        address: "",
        roleName: "",
        username: "",
        confirmPassword: "",
        password: "",
        image: "",
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
                return { ...preVal, fullName: "Fullname is required" }
            })
        }

        if (!formData.dateOfBirth) {
            check = false;
            setFormError(preVal => {
                return { ...preVal, dateOfBirth: "Date of birth is required" }
            })
        }

        if (!formData.gender) {
            check = false;
            setFormError(preVal => {
                return { ...preVal, gender: "Gender is required" }
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
                return { ...preVal, phoneNumber: "Phone is required" }
            })
        }

        if (!formData.position) {
            check = false;
            setFormError(preVal => {
                return { ...preVal, position: "Position is required" }
            })
        }

        if (!formData.address) {
            check = false;
            setFormError(preVal => {
                return { ...preVal, address: "Address is required" }
            })
        }

        if (!formData.username && !userId) {
            check = false;
            setFormError(preVal => {
                return { ...preVal, username: "Username is required" }
            })
        }

        if (!formData.roleName) {
            check = false;
            setFormError(preVal => {
                return { ...preVal, roleName: "Role is required" }
            })
        }

        if (!formData.password && !userId) {
            check = false;
            setFormError(preVal => {
                return { ...preVal, password: "Password is required" }
            })
        }

        if (!formData.confirmPassword && !userId) {
            check = false;
            setFormError(preVal => {
                return { ...preVal, confirmPassword: "Confirm password is required" }
            })
        }

        if (formData.password !== formData.confirmPassword && !userId) {
            check = false;
            setFormError(preVal => {
                return { ...preVal, confirmPassword: "Confirm password is not match" }
            })
        }

        return check
    }

    const validate2 = (): boolean => {
        let check = true;
        const checkFullName = validateFullname(formData.fullName || "");
        const checkEmail = validateEmail(formData.email || "");
        const checkPhone = validatePhone(formData.phoneNumber || "");
        const checkPassword = ValidatePassWord(formData.password || "");
        const checkUsername = ValidateUsername(formData.username || "");

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

        if (checkPassword && !userId) {
            check = false;
            setFormError(preVal => {
                return { ...preVal, password: checkPassword }
            })
        }

        if (checkUsername && !userId) {
            check = false;
            setFormError(preVal => {
                return { ...preVal, username: checkUsername }
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
                const dataRequest = { ...formData }
                delete dataRequest.username;
                if (formData.roleName === dataDefault.roleName) delete dataRequest.roleName;
                UpdateAccountAPI(userId, dataRequest)
                    .then(() => {
                        const newData = {
                            ...formData,
                        }
                        delete newData.username;
                        setDataDefault(newData);
                        return GetAccountsAPI();
                    }).then((response) => {
                        updateUsers(response.data);
                        updatePagination({
                            totalPage: response.totalPage,
                            limit: response.limit,
                            offset: response.offset,
                            totalElementOfPage: response.totalElementOfPage
                        })
                        setGlobalSuccess("Update user successfully!");
                        setEditUser(false);
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
                const dataRequest = { ...formData }
                delete dataRequest.confirmPassword;
                delete dataRequest.image;
                RegisterAPI(dataRequest)
                    .then(() => {
                        return GetAccountsAPI();
                    }).then((response) => {
                        updateUsers(response.data);
                        updatePagination({
                            totalPage: response.totalPage,
                            limit: response.limit,
                            offset: response.offset,
                            totalElementOfPage: response.totalElementOfPage
                        })
                        setGlobalSuccess("Create user successfully!");
                        setTimeout(() => {
                            hideOverlay();
                        }, 1000);
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
                        } else if (message.includes("username")) {
                            setFormError(preVal => {
                                return { ...preVal, username: err.message }
                            })
                        } else {
                            setGlobalError(err.message);
                        }
                    }).finally(() => {
                        setIsLoadingSubmit(false);
                    })
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
                        <h2 className="fw-bold mb-0">{userId ? "Edit User" : "New User"}</h2>
                    </div>
                    {globalError && <Alert onClose={() => setGlobalError("")} variant="danger" dismissible>{globalError}</Alert>}
                    {globalSuccess && <Alert onClose={() => setGlobalSuccess("")} variant="success" dismissible>{globalSuccess}</Alert>}
                    {
                        userId &&
                            editUser ? (
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
                        ) : userId && (
                            <button
                                disabled={isLoadingSubmit || isLoading}
                                onClick={() => setEditUser(true)}
                                className="btn btn-danger fw-bold d-flex align-items-center"
                            >
                                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                            </button>
                        )
                    }
                </div>
                <Row className="p-4">
                    <Col md={6}>
                        <Row className="p-3">
                            {
                                userId && (
                                    <Col className="d-flex align-items-center justify-content-center">
                                        <div className="position-relative">
                                            <Image src="https://res.cloudinary.com/dlrionk8h/image/upload/v1727174250/er5mtiiis4yruphmbobm.jpg" rounded style={{ width: "200px", height: "auto" }} />
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
                                    </Col>
                                )
                            }
                            <Col>
                                <Row>
                                    <h5 className="fw-semibold border-bottom pb-2 mb-3">Basic Information</h5>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control
                                            className="py-3"
                                            type="text"
                                            value={formData.fullName}
                                            name="fullName"
                                            placeholder="Enter full name"
                                            onChange={handleChangeInput}
                                            disabled={userId !== "" && !editUser}
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
                                                disabled={userId !== "" && !editUser}
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
                                                disabled={userId !== "" && !editUser}
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
                            </Col>
                        </Row>
                        <div className="p-3">
                            <h5 className="fw-semibold border-bottom pb-2 mb-3">Personal Information</h5>
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
                                            disabled={userId !== "" && !editUser}
                                            placeholder="Enter email"
                                        />
                                        <Form.Text className="text-danger">{formError.email}</Form.Text>
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
                                            disabled={userId !== "" && !editUser}
                                            placeholder="Enter phone number"
                                        />
                                        <Form.Text className="text-danger">{formError.phoneNumber}</Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Position</Form.Label>
                                <Form.Control
                                    className="py-3"
                                    type="text"
                                    value={formData.position}
                                    name="position"
                                    onChange={handleChangeInput}
                                    disabled={userId !== "" && !editUser}
                                    placeholder="Enter position"
                                />
                                <Form.Text className="text-danger">{formError.position}</Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    className="py-3"
                                    type="text"
                                    value={formData.address}
                                    name="address"
                                    onChange={handleChangeInput}
                                    disabled={userId !== "" && !editUser}
                                    placeholder="Enter address"
                                />
                                <Form.Text className="text-danger">{formError.address}</Form.Text>
                            </Form.Group>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="p-3">
                            <h5 className="fw-semibold border-bottom pb-2 mb-3">Account Information</h5>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            className="py-3"
                                            type="text"
                                            value={formData.username}
                                            name="username"
                                            disabled={userId !== ""}
                                            placeholder="Enter username"
                                            onChange={handleChangeInput}
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
                                            disabled={userId !== "" && !editUser}
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
                            {
                                userId ? (
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
                                ) : (
                                    <>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Password</Form.Label>
                                            <InputGroup>
                                                <Form.Control
                                                    className="py-3"
                                                    type="password"
                                                    value={formData.password}
                                                    name="password"
                                                    disabled={userId !== ""}
                                                    placeholder="Enter password"
                                                    onChange={handleChangeInput}
                                                />
                                            </InputGroup>
                                            <Form.Text className="text-danger">{formError.password}</Form.Text>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Confirm Password</Form.Label>
                                            <InputGroup>
                                                <Form.Control
                                                    className="py-3"
                                                    type="password"
                                                    value={formData.confirmPassword}
                                                    name="confirmPassword"
                                                    disabled={userId !== ""}
                                                    placeholder="Enter confirm password"
                                                    onChange={handleChangeInput}
                                                />
                                            </InputGroup>
                                            <Form.Text className="text-danger">{formError.confirmPassword}</Form.Text>
                                        </Form.Group>
                                        <Button variant="primary" onClick={() => handleSubmit()} className="form-control py-3 fw-bold">
                                            {isLoadingSubmit ? "Creating..." : "Create"}
                                        </Button>
                                    </>
                                )
                            }
                        </div>
                    </Col>
                </Row>
                {userId != null && changePassword && <ChangePasswordForm userId={userId} hideOver={() => setChangePassword(false)} />}
            </Container >
        </OverLay >
    );
}