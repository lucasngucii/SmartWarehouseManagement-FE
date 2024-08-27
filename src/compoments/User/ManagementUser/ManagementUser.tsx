import React from "react";
import "./ManagementUser.css";

export const ManagementUser: React.FC = () => {
    return (
        <div className="container-user-management">
            <h2>User Account Management</h2>
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
                    <td>1</td> {/* Serial Number */}
                    <td>john_doe</td>
                    <td>john@example.com</td>
                    <td>Active</td>
                    <td>
                        <button className="edit-button">Edit</button>
                        <button className="delete-button">Delete</button>
                    </td>
                </tr>
                <tr>
                    <td>2</td> {/* Serial Number */}
                    <td>jane_smith</td>
                    <td>jane@example.com</td>
                    <td>Inactive</td>
                    <td>
                        <button className="edit-button">Edit</button>
                        <button className="delete-button">Delete</button>
                    </td>
                </tr>
                {/* Add more rows as needed */}
                </tbody>
            </table>
            <button className="add-user-button">Add User</button>
        </div>
    );
}
