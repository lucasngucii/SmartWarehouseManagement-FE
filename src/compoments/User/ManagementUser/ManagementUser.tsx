import React from "react";
import "./ManagementUser.css";
import {OverLay} from "../../OverLay/OverLay";
import Select, {MultiValue, SingleValue} from "react-select";

interface OptionType {
    value: string;
    label: string;
}

interface AddUserComponentProps {
    hideOverlay: () => void;
}

const AddUserComponent: React.FC<AddUserComponentProps> = ({hideOverlay}) => {

    const [selectedOption, setSelectedOption] = React.useState<OptionType | null>(null);
    const options: OptionType[] = [
        {value: "Admin", label: "Admin"},
        {value: "Staff", label: "Staff"},
        {value: "Customer", label: "Customer"},
    ];
    const handleSelectChange = (newValue: SingleValue<OptionType> | MultiValue<OptionType>) => {
        setSelectedOption(newValue as OptionType);
    };

    return (
        <div className="add-user-modal">
            <button onClick={hideOverlay} className="add-user-modal-close">
                <i className="fas fa-times"></i>
            </button>
            <h2 className="add-user-modal-title">New User</h2>
            <form className="add-user-modal-form">
                <div className="form-group">
                    <label htmlFor="username" className="form-group-label">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="form-group-input"
                        required
                        placeholder={"Enter Username"}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fullname" className="form-group-label">Fullname</label>
                    <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        className="form-group-input"
                        required
                        placeholder={"Enter your fullname"}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password" className="form-group-label">Group</label>
                    <Select
                        styles={{
                            control: (base) => ({
                                ...base,
                                height: "50px",
                                width: "100%",
                                borderRadius: "4px",
                                padding: "0 10px",
                                border: "1px solid #d1d1d1",
                            }),
                        }}
                        value={selectedOption as OptionType}
                        onChange={handleSelectChange}
                        options={options}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="form-group-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-group-input"
                        required
                        placeholder={"Enter Email"}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone" className="form-group-label">Phone Nunber</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="form-group-input"
                        required
                        placeholder={"Enter phone number"}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-group__label">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-group-input"
                        required
                        placeholder={"Enter Password"}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password" className="form-group-label">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        name="confirm-password"
                        className="form-group-input"
                        required
                        placeholder={"Confirm Password"}
                    />
                </div>
                <button type="submit" className="add-user-modal-submit">Add User</button>
            </form>
        </div>
    );
}

export const ManagementUser: React.FC = () => {

    const [showOverlay, setShowOverlay] = React.useState(false);

    const handleShowOverlay = () => {
        setShowOverlay(true);
    }

    const handleHideOverlay = () => {
        setShowOverlay(false);
    }

    return (
        <div className="container-user-management">
            <h2>User Account Management</h2>
            <p>Manage user accounts and their status</p>
            <table className="user-table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>john_doe</td>
                    <td>john@example.com</td>
                    <td>Active</td>
                    <td>
                        <button className="edit-button">Edit</button>
                        <button className="delete-button">Delete</button>
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>jane_smith</td>
                    <td>jane@example.com</td>
                    <td>Inactive</td>
                    <td>
                        <button className="edit-button">Edit</button>
                        <button className="delete-button">Delete</button>
                    </td>
                </tr>
                </tbody>
            </table>
            <button onClick={handleShowOverlay} className="add-user-button">Add User</button>
            {showOverlay && (
                <OverLay>
                    <AddUserComponent hideOverlay={handleHideOverlay}/>
                </OverLay>
            )}
        </div>
    );
}
