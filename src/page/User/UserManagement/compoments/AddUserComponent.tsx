import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverLay } from "../../../../compoments/OverLay/OverLay";
import Select, { MultiValue, SingleValue } from "react-select";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
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

interface OptionType {
    value: string;
    label: string;
}

interface Options {
    Role: OptionType[];
}

interface AddUserComponentProps {
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

export const AddUserComponent: React.FC<AddUserComponentProps> = ({ hideOverlay, userId, updateUsers, updatePagination }) => {

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isLoadingSubmit, setIsLoadingSubmit] = React.useState<boolean>(false);
    const [globalError, setGlobalError] = React.useState<string>("");
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
                                total: response.total,
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
        <OverLay>
            <div className="add-user-modal">
                <button onClick={hideOverlay} className="button-close">
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <p className="primary-label form-lable">{userId ? "UPDATE USER" : "NEW USER"}</p>
                <p className="primary-message-error margin-bottom-15 text-center">{globalError}</p>
                <form className="form">
                    <div className="form-input-container">
                        <label htmlFor="username" className="form-input-lable">UserName</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="form-input"
                            required
                            placeholder={"Enter Username"}
                            value={formData.username}
                            onChange={handleChangeInput}
                            disabled={userId ? true : false}
                        />
                        <span className="form-error">{formError.username}</span>
                    </div>
                    <div className="form-input-container">
                        <label htmlFor="fullname" className="form-input-lable">FullName</label>
                        <input
                            type="text"
                            id="fullname"
                            name="fullname"
                            className="form-input"
                            required
                            placeholder={"Enter your fullname"}
                            value={formData.fullname}
                            onChange={handleChangeInput}
                        />
                        <span className="form-error">{formError.fullname}</span>
                    </div>
                    <div className="form-input-container">
                        <label htmlFor="confirm-password" className="form-input-lable">Role</label>
                        <Select
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    width: "100%",
                                    height: "45px",
                                    borderRadius: "4px",
                                    border: "1px solid #d1d1d1",
                                    fontSize: "14px",
                                }),
                            }}
                            value={formData.role}
                            onChange={(selectedOption) => handleChangeSelect("role", selectedOption)}
                            options={options.Role}
                            isLoading={isLoading}
                        />
                        <span className="form-error">{formError.role}</span>
                    </div>
                    <div className="form-input-container">
                        <label htmlFor="email" className="form-input-lable">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-input"
                            required
                            placeholder={"Enter Email"}
                            onChange={handleChangeInput}
                            value={formData.email}
                        />
                        <span className="form-error">{formError.email}</span>
                    </div>
                    <div className="form-input-container">
                        <label htmlFor="phone" className="form-input-lable">Phone Number</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            className="form-input"
                            required
                            placeholder={"Enter phone number"}
                            onChange={handleChangeInput}
                            value={formData.phone}
                        />
                        <span className="form-error">{formError.phone}</span>
                    </div>
                    <div className="form-input-container">
                        <label htmlFor="password" className="form-input-lable">{userId ? "New Password" : "Password"}</label>
                        <p className={"form-group-label-second"}>{userId ? "** Leave blank if you don't want to change password" : ""}</p>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-input"
                            required
                            placeholder={"Enter Password"}
                            onChange={handleChangeInput}
                            value={formData.password}
                        />
                        <span className="form-error">{formError.password}</span>
                    </div>
                    <div className="form-input-container">
                        <label htmlFor="confirm-password" className="form-input-lable">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirmPassword"
                            className="form-input"
                            required
                            placeholder={"Confirm Password"}
                            onChange={handleChangeInput}
                            value={formData.confirmPassword}
                        />
                        <span className="form-error">{formError.confirmPassword}</span>
                    </div>
                    <input
                        type="submit"
                        className="form-input-submit"
                        onClick={handleSubmit}
                        value={isLoadingSubmit ? "Loading..." : userId ? "Update User" : "Add User"}
                    />
                </form>
            </div>
        </OverLay>
    );
}