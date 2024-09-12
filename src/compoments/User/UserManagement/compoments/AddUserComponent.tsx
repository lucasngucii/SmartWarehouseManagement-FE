import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverLay } from "../../../OverLay/OverLay";
import Select, { MultiValue, SingleValue } from "react-select";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { ValidateUsername } from "../../../../util/validateUsername";
import { validateFullname } from "../../../../util/validateFullName";
import { validateEmail } from "../../../../util/validateEmail";
import { ValidatePassWord } from "../../../../util/validatePassword";
import { validatePhone } from "../../../../util/validatePhone";

interface OptionType {
    value: string;
    label: string;
}

interface Options {
    Category: OptionType[];
    Role: OptionType[];
}

interface AddUserComponentProps {
    hideOverlay: () => void;
    userId?: number | null;
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

export const AddUserComponent: React.FC<AddUserComponentProps> = ({ hideOverlay, userId }) => {

    const options: Options = {
        Category: [
            { value: "Electronics", label: "Electronics" },
            { value: "Clothes", label: "Clothes" },
            { value: "Furniture", label: "Furniture" },
        ],
        Role: [
            { value: "Admin", label: "Admin" },
            { value: "Staff", label: "Staff" },
            { value: "Customer", label: "Customer" },
        ]

    };

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

        if (!formData.password) {
            check = false;
            setFormError(preVal => {
                return { ...preVal, password: "Password is required" }
            })
        }

        if (!formData.confirmPassword) {
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

        if (checkPasswrod) {
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

    const handleSubmit = () => {
        if (validate1() && validate2()) {
            if (userId) {
                console.log("Update user");
                return;
            }
            console.log("Add user");
        }
    }

    return (
        <OverLay>
            <div className="add-user-modal">
                <button onClick={hideOverlay} className="button-close">
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <p className="primary-label form-lable">{userId ? "UPDATE USER" : "NEW USER"}</p>
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
                            onChange={handleChangeInput}
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
                        />
                        <span className="form-error">{formError.confirmPassword}</span>
                    </div>
                    <input
                        type="submit"
                        className="form-input-submit"
                        onClick={handleSubmit}
                        value={userId ? "Update User" : "Add User"}
                    />
                </form>
            </div>
        </OverLay>
    );
}