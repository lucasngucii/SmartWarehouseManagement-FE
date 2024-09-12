import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverLay } from "../../../OverLay/OverLay";
import Select, { MultiValue, SingleValue } from "react-select";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import React from "react";

interface OptionType {
    value: string;
    label: string;
}

interface Options {
    Category: OptionType[];
    Status: OptionType[];
}

interface AddUserComponentProps {
    hideOverlay: () => void;
    userId?: number | null;
}

interface FormDataTypes {
    username: string;
    fullname: string;
    group: OptionType | null;
    status: OptionType | null;
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
        Status: [
            { value: "Active", label: "Active" },
            { value: "Disable", label: "Disable" },
        ],
    };

    const [formData, setFormData] = React.useState<FormDataTypes>({
        username: "",
        fullname: "",
        group: null,
        status: null,
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const handleChangeSelect = (name: string, newValue: SingleValue<OptionType> | MultiValue<OptionType>) => {
        setFormData({ ...formData, [name]: newValue });
    }

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = () => {
        if (userId) {
            console.log("Update user");
            return;
        }
        console.log("Add user");
    }

    return (
        <OverLay>
            <div className="add-user-modal">
                <button onClick={hideOverlay} className="button-close">
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <p className="primary-label form-lable">{userId ? "Update User" : "New User"}</p>
                <form className="form">
                    <div className="form-input-container">
                        <label htmlFor="username" className="form-input-lable">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="form-input"
                            required
                            placeholder={"Enter Username"}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div className="form-input-container">
                        <label htmlFor="fullname" className="form-input-lable">Fullname</label>
                        <input
                            type="text"
                            id="fullname"
                            name="fullname"
                            className="form-input"
                            required
                            placeholder={"Enter your fullname"}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div className="form-input-container">
                        <label htmlFor="confirm-password" className="form-input-lable">Group</label>
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
                            value={formData.group}
                            onChange={(selectedOption) => handleChangeSelect("group", selectedOption)}
                            options={options.Category}
                        />
                    </div>
                    <div className="form-input-container">
                        <label htmlFor="confirm-password" className="form-input-lable">Status</label>
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
                            value={formData.status}
                            onChange={(selectedOption) => handleChangeSelect("status", selectedOption)}
                            options={options.Status}
                        />
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