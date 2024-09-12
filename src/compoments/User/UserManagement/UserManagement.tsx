import React from "react";
import "./UserManagement.css";
import { User } from "../../../interface/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { AddUserComponent } from "./compoments/AddUserComponent";

export const UserManagement: React.FC = () => {

    const [users, setUsers] = React.useState<User[]>([
        {
            id: 1,
            username: "lecongkhanh124",
            fullName: "john_doe",
            role: "Admin",
            email: "john@example.com",
            phoneNumber: "0321547895",
        },
        {
            id: 2,
            username: "tadsabc123",
            fullName: "john_doe",
            role: "Staff",
            email: "abc@example.com",
            phoneNumber: "0321547895",
        },
    ]);
    const [showOverlay, setShowOverlay] = React.useState(false);
    const [userId, setUserId] = React.useState<number | null>(null);

    const handleShowOverlay = () => {
        setShowOverlay(true);
    }

    const handleHideOverlay = () => {
        setShowOverlay(false);
        setUserId(null);
    }

    const listUser = users.map((user, index) => {
        return (
            <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.fullName}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>
                    <button
                        onClick={() => {
                            setUserId(user.id)
                            handleShowOverlay()
                        }}
                        className="edit-button"
                    >
                        Edit
                    </button>
                    <button className="delete-button">Delete</button>
                </td>
            </tr>
        )
    }
    );

    return (
        <div>
            <div className="content-header-container">
                <div className="content-header-left">
                    <h2 className={"primary-label"}>User Account Management</h2>
                    <p className={"primary-description"}>Manage user accounts and their status</p>
                </div>
                <div className="content-header-right">
                    <form className="form-search">
                        <input
                            type="search"
                            className="form-input"
                            placeholder={"Search user"}
                        />
                        <button className="form-input-submit">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </form>
                    <button onClick={handleShowOverlay} className="add-button">Add User</button>
                </div>
            </div>
            <div className="table-container">
                <table className="table id-column">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>FullName</th>
                            <th>Group</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUser}
                    </tbody>
                </table>
            </div>
            {showOverlay && <AddUserComponent hideOverlay={handleHideOverlay} userId={userId} />}
        </div>
    );
}
