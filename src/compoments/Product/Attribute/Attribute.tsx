import React from "react";
import {OverLay} from "../../OverLay/OverLay";
import "./Attribute.css";

interface AttributeDetailManagementProps {
    handleCancelEditAttribute: () => void;
}

const AttributeDetailManagement: React.FC<AttributeDetailManagementProps> = ({handleCancelEditAttribute}) => {

    const [showEditAttributeName, setShowEditAttributeName] = React.useState(false);

    const handleEditAttributeName = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowEditAttributeName(true);
    }

    const handleCancelEditAttributeName = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowEditAttributeName(false);
    }

    return (
        <div className="attribute-detail-management">
            <h1 className={"primary-label"}>Attribute Detail Management</h1>
            <p className={"primary-description"}>Add, edit, or delete attribute values</p>
            <form className={"form"}>
                <div className={"form-input-container"}>
                    <label className={"form-input-lable lable-attribute-name attribute-name-lable"}>Attribute
                        Name</label>
                    <div className={"group-input-attribute-name"}>
                        <input
                            type={"text"}
                            disabled={!showEditAttributeName}
                            className={"form-input hidden-border-right-input-attribute-name"}
                            placeholder={"Enter your attribute name"}
                        />
                        <button onClick={handleEditAttributeName} className={"button-close-edit-attribute-name"}>
                            <i className="fas fa-pencil-alt"></i>
                        </button>
                    </div>
                </div>
                {
                    showEditAttributeName && <div className={"form-input-container"}>
                        <button onClick={handleCancelEditAttributeName} className="cancel-button">Cancel</button>
                        <button className="add-button">Save</button>
                    </div>
                }
            </form>
            <table className="table">
                <thead>
                <tr>
                    <th>Value</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Red</td>
                    <td>
                        <button className="edit-button">Edit</button>
                        <button className="delete-button">Delete</button>
                    </td>
                </tr>
                <tr>
                    <td>Blue</td>
                    <td>
                        <button className="edit-button">Edit</button>
                        <button className="delete-button">Delete</button>
                    </td>
                </tr>
                </tbody>
            </table>
            <button onClick={handleCancelEditAttribute} className="cancel-button">Cancel</button>
            <button className="add-button margin-top-button">Add Value</button>
        </div>
    );
};


export const Attribute: React.FC = () => {

    const [showEditForm, setShowEditForm] = React.useState(true);

    const handleEdit = () => {
        setShowEditForm(true);
    }

    const handleCancelEdit = () => {
        setShowEditForm(false);
    }

    return (
        <div className={"container-right"}>
            <h1 className={"primary-label"}>Attribute Management</h1>
            <p className={"primary-description"}>Add, edit, or delete attributes</p>
            <button onClick={handleEdit} className="add-button margin-top-button">Add Attribute</button>
            <table className={"table"}>
                <thead>
                <tr>
                    <th>Attribute Name</th>
                    <th>Total Value</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Color</td>
                    <td>15</td>
                    <td>
                        <button className={"edit-button"}>Edit</button>
                        <button className={"delete-button"}>Delete</button>
                    </td>
                </tr>
                <tr>
                    <td>Size</td>
                    <td>15</td>
                    <td>
                        <button className={"edit-button"}>Edit</button>
                        <button className={"delete-button"}>Delete</button>
                    </td>
                </tr>
                </tbody>
            </table>
            {
                showEditForm && <OverLay>
                    <AttributeDetailManagement handleCancelEditAttribute={handleCancelEdit}/>
                </OverLay>
            }
        </div>
    );
}