import React from "react";
import "./ManagementGroup.css";

export const ManagementGroup: React.FC = () => {
    return (
        <div className="container-management-group">
            <h2>Permissions Management</h2>
            <table className="permissions-table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Permission Name</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td> {/* Serial Number */}
                    <td>View Dashboard</td>
                    <td>Active</td>
                    <td>
                        <button className="edit-button">Edit</button>
                    </td>
                </tr>
                <tr>
                    <td>2</td> {/* Serial Number */}
                    <td>Edit User</td>
                    <td>Inactive</td>
                    <td>
                        <button className="edit-button">Edit</button>
                    </td>
                </tr>
                {/* Add more rows as needed */}
                </tbody>
            </table>
            <button className="add-permission-button">Add Permission</button>
        </div>
    );
}
