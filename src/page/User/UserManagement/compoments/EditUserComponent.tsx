import { OverLay } from "../../../../compoments/OverLay/OverLay";
import Select, { MultiValue, SingleValue, StylesConfig } from "react-select";
import React from "react";
import { Role } from "../../../../interface/Role";
import RegisterAPI, { RegisterRequest } from "../../../../services/authen-api/RegisterAPI";
import { Account } from "../../../../interface/Account";
import ValidateUsername from "../../../../util/validateUsername";
import validateFullname from "../../../../util/validateFullName";
import validateEmail from "../../../../util/validateEmail";
import ValidatePassWord from "../../../../util/validatePassword";
import validatePhone from "../../../../util/validatePhone";
import GetRolesAPI from "../../../../services/authen-api/GetRolesAPI";
import GetAccountById from "../../../../services/authen-api/GetAccountById";
import UpdateAccountAPI from "../../../../services/authen-api/UpdateAccountAPI";
import GetAccountsAPI from "../../../../services/authen-api/GetAccountsAPI";
import PaginationType from "../../../../interface/Pagination";
import { Col, Container, Form, Image, InputGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEdit } from "@fortawesome/free-solid-svg-icons";

interface OptionType {
    value: string;
    label: string;
}

interface Options {
    Role: OptionType[];
}

interface EditUserComponentProps {
    hideOverlay: () => void;
    userId?: string | null;
    updateUsers?: (response: Account[]) => void;
    updatePagination: (response: PaginationType) => void;
}

interface FormDataTypes {
    username: string;
    fullname: string;
    role: OptionType | null;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

interface FormErrorTypes {
    username: string;
    fullname: string;
    role: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

export const EditUserComponent: React.FC<EditUserComponentProps> = ({ hideOverlay, userId, updateUsers, updatePagination }) => {

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isLoadingSubmit, setIsLoadingSubmit] = React.useState<boolean>(false);
    const [globalError, setGlobalError] = React.useState<string>("");
    const [editBaseInfo, setEditBaseInfo] = React.useState<boolean>(false);
    const [editPersonalInfo, setEditPersonalInfo] = React.useState<boolean>(false);
    const [editAccountInfo, setEditAccountInfo] = React.useState<boolean>(false);
    const [options, setOptions] = React.useState<Options>({
        Role: []
    });
    const [formData, setFormData] = React.useState<FormDataTypes>({
        username: "",
        fullname: "",
        role: null,
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [formError, setFormError] = React.useState<FormErrorTypes>({
        username: "",
        fullname: "",
        role: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    React.useEffect(() => {
        setIsLoading(true);
        GetRolesAPI()
            .then((response) => {
                const roles: Role[] = response;
                const roleOptions = roles.map((role) => {
                    return {
                        value: role.name,
                        label: role.name,
                    }
                });

                setOptions(preVal => {
                    return { ...preVal, Role: roleOptions }
                })

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
                    const data: Account = response;
                    const roleOption: OptionType = {
                        value: data.role.name,
                        label: data.role.name,
                    }

                    setFormData({
                        username: data.username,
                        fullname: data.fullName,
                        role: roleOption,
                        email: data.email,
                        phone: data.phoneNumber,
                        password: "",
                        confirmPassword: "",
                    })

                }).catch((err) => {
                    console.error(err.message);
                    setGlobalError(err.message);
                })
        }
    }, [userId])

    const handleChangeSelect = (name: string, newValue: SingleValue<OptionType> | MultiValue<OptionType>) => {
        setFormData({ ...formData, [name]: newValue });
        setFormError(preVal => {
            return { ...preVal, [name]: "" }
        })
    }

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setFormError(preVal => {
            return { ...preVal, [e.target.name]: "" }
        })
    }

    const customSelectStyles: StylesConfig<any, false> = {
        control: (base) => ({
            ...base,
            width: "100%",
            borderRadius: "4px",
            border: "1px solid #d1d1d1",
            fontSize: "1rem",
            padding: "0.5rem",
        }),
    };

    const validate1 = (): boolean => {
        let check = true;

        if (!formData.username) {
            check = false;
            setFormError(preVal => {
                return { ...preVal, username: "Username is required" }
            })
        }

        if (!formData.fullname) {
            check = false;
            setFormError(preVal => {
                return { ...preVal, fullname: "Fullname is required" }
            })
        }

        if (!formData.role) {
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

        if (!formData.phone) {
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

        if (!formData.confirmPassword && !userId) {
            check = false;
            setFormError(preVal => {
                return { ...preVal, confirmPassword: "ConfirmPassword is required" }
            })
        }

        return check
    }

    const validate2 = (): boolean => {
        let check = true;
        const checkUserName = ValidateUsername(formData.username);
        const checkFullName = validateFullname(formData.fullname);
        const checkEmail = validateEmail(formData.email)
        const checkPasswrod = ValidatePassWord(formData.password);
        const checkPhone = validatePhone(formData.phone);

        if (checkUserName) {
            check = false;
            setFormError(preVal => {
                return { ...preVal, username: checkUserName }
            })
        }

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

        if (checkPasswrod && (userId !== null && formData.password.length > 0)) {
            check = false;
            setFormError(preVal => {
                return { ...preVal, password: checkPasswrod }
            })
        }

        if (checkPhone) {
            check = false;
            setFormError(preVal => {
                return { ...preVal, phone: checkPhone }
            })
        }

        if (formData.password !== formData.confirmPassword) {
            check = false;
            setFormError(preVal => {
                return { ...preVal, confirmPassword: "ConfirmPassword must match password" }
            })
        }

        return check
    }

    const handleSubmit = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (validate1() && validate2()) {

            const dataRequest: RegisterRequest = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                fullName: formData.fullname,
                phoneNumber: formData.phone,
                roleName: formData.role!.value,
            }

            setIsLoadingSubmit(true);
            if (userId) {
                if (dataRequest.password === "") {
                    delete dataRequest.password;
                }
                UpdateAccountAPI(userId, dataRequest)
                    .then(() => {
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
                            hideOverlay();
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
                                return { ...preVal, role: err.message }
                            })
                        } else {
                            setGlobalError(err.message);
                        }
                    }).finally(() => {
                        setIsLoadingSubmit(false);
                    })
                return;
            }

            console.log(dataRequest);
            RegisterAPI(dataRequest)
                .then(() => {
                    return GetAccountsAPI();
                }).then((response) => {
                    if (updateUsers) {
                        updateUsers(response.data);
                        hideOverlay();
                    } else {
                        throw new Error("updateUsers is not a function");
                    }
                }).catch((err) => {
                    const message: string = err.message.toLowerCase();
                    if (message.includes("username")) {
                        setFormError(preVal => {
                            return { ...preVal, username: err.message }
                        })
                    } else if (message.includes("email")) {
                        setFormError(preVal => {
                            return { ...preVal, email: err.message }
                        })
                    } else if (message.includes("phone")) {
                        setFormError(preVal => {
                            return { ...preVal, phone: err.message }
                        })
                    } else {
                        setGlobalError(err.message);
                    }
                }).finally(() => {
                    setIsLoadingSubmit(false);
                })
        }
    }

    return (
        <OverLay className="disabled-padding">
            <Container fluid className="bg-light w-100 h-100 p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="fw-bold h2">{userId ? "Edit User" : "Add User"}</span>
                    <button
                        onClick={() => hideOverlay()}
                        className="btn btn-outline-primary"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} /> Back
                    </button>
                </div>
                <Row>
                    <Col>
                        <div className="d-flex flex-row algin-items-center border p-3 gap-3 rounded mb-4 shadow-sm">
                            <div className="position-relative">
                                <Image src="images/default-avt.png" roundedCircle style={{ width: "100px", height: "auto" }} />
                                <div className="position-absolute bottom-0 end-0 pe-auto">
                                    <Form>
                                        <button className="btn btn-light btn-sm shadow-sm" onClick={() => { console.log("click") }}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                    </Form>
                                </div>
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                                <span className="fw-semibold">{formData.fullname}</span>
                                <span>Product Design</span>
                                <span>951 Đường Di Động, Quận 13, TP.HCM</span>
                            </div>
                        </div>
                        <div className="border p-3 gap-3 rounded mb-4 shadow-sm">
                            <div className="d-flex justify-content-between">
                                <span className="fw-semibold">Basic Information</span>
                                <button className="btn btn-outline-secondary btn-sm" disabled={editBaseInfo} onClick={() => { setEditBaseInfo(true) }}>Edit</button>
                            </div>
                            <Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>FullName</Form.Label>
                                    <Form.Control
                                        className="py-3"
                                        type="text"
                                        value={formData.fullname}
                                        name="fullname"
                                        onChange={handleChangeInput}
                                        disabled={!editBaseInfo}
                                    />
                                </Form.Group>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Date of Birth</Form.Label>
                                        <Form.Control
                                            className="py-3"
                                            type="date"
                                            value={"2002-02-02"}
                                            name="dob"
                                            disabled={!editBaseInfo}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Select disabled={!editBaseInfo} className="py-3">
                                            <option>Choose...</option>
                                            <option>Male</option>
                                            <option>Femail</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            {
                                editBaseInfo &&
                                <div className="d-flex gap-2">
                                    <button className="btn btn-secondary" onClick={() => { setEditBaseInfo(false) }}>Cancel</button>
                                    <button className="btn btn-primary" onClick={() => { setEditBaseInfo(false) }}>Save</button>
                                </div>
                            }
                        </div>
                        <div className="border p-3 gap-3 rounded shadow-sm">
                            <div className="d-flex justify-content-between">
                                <span className="fw-semibold">Persionnal Information</span>
                                <button className="btn btn-outline-secondary btn-sm" disabled={editPersonalInfo} onClick={() => { setEditPersonalInfo(true) }}>Edit</button>
                            </div>
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
                                            disabled={!editPersonalInfo}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Position</Form.Label>
                                        <Form.Control
                                            className="py-3"
                                            type="text"
                                            value="Product Design"
                                            disabled={!editPersonalInfo}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>PhoneNumber</Form.Label>
                                        <Form.Control
                                            className="py-3"
                                            type="text"
                                            value={formData.phone}
                                            name="phone"
                                            onChange={handleChangeInput}
                                            disabled={!editPersonalInfo}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control
                                            className="py-3"
                                            type="text"
                                            value="951 Đường Di Động, Quận 13, TP.HCM"
                                            disabled={!editPersonalInfo}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            {
                                editPersonalInfo &&
                                <div className="d-flex gap-2">
                                    <button className="btn btn-secondary" onClick={() => { setEditPersonalInfo(false) }}>Cancel</button>
                                    <button className="btn btn-primary" onClick={() => { setEditPersonalInfo(false) }}>Save</button>
                                </div>
                            }
                        </div>
                    </Col>
                    <Col>
                        <div className="border p-3 gap-3 rounded mb-4 shadow-sm">
                            <div className="d-flex justify-content-between">
                                <span className="fw-semibold">Account Information</span>
                                <button className="btn btn-outline-secondary btn-sm" disabled={editAccountInfo} onClick={() => { setEditAccountInfo(true) }}>Edit</button>
                            </div>
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
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Role</Form.Label>
                                        <Select
                                            styles={customSelectStyles}
                                            options={options.Role}
                                            value={formData.role}
                                            onChange={(newValue) => handleChangeSelect("role", newValue)}
                                            isDisabled={!editAccountInfo}
                                        />
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
                                        <button className="btn btn-outline-secondary btn-sm" disabled={!editAccountInfo} >ChangePassword</button>
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                            {
                                editAccountInfo &&
                                <div className="d-flex gap-2">
                                    <button className="btn btn-secondary" onClick={() => { setEditAccountInfo(false) }}>Cancel</button>
                                    <button className="btn btn-primary" onClick={() => { setEditAccountInfo(false) }}>Save</button>
                                </div>
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        </OverLay >
    );
}