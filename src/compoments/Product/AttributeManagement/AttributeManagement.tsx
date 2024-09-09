import React from "react";
import { OverLay } from "../../OverLay/OverLay";
import "./AttributeManagement.css";

interface EditAttributeValueProps {
    hideOverlay: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const EditAttributeValue: React.FC<EditAttributeValueProps> = ({ hideOverlay }) => {
    return (
        <OverLay>
            <div className="edit-attribute-value">
                <h1 className={"primary-label"}>Edit Attribute Value</h1>
                <form className={"form"}>
                    <div className={"form-input-container"}>
                        <input
                            type={"text"}
                            className={"form-input"}
                            placeholder={"Enter your attribute value"}
                        />
                    </div>
                    <div className={"form-input-container"}>
                        <button onClick={hideOverlay} className="cancel-button">Cancel</button>
                        <button className="add-button">Save</button>
                    </div>
                </form>
            </div>
        </OverLay>
    );
}

interface AddAttributeProps {
    hideOverlay: () => void;
}

const AddAttribute: React.FC<AddAttributeProps> = ({ hideOverlay }) => {
    return (
        <OverLay>
            <div className="add-attribute-container">
                <button onClick={hideOverlay} className="button-close">
                    <i className="fas fa-times"></i>
                </button>
                <h1 className={"primary-label form-lable"}>NEW ATTRIBUTE</h1>
                <form className={"form"}>
                    <div className={"form-input-container"}>
                        <input
                            type={"text"}
                            className={"form-input"}
                            placeholder={"Enter your attribute name"}
                        />
                    </div>
                    <button className="form-input-submit">Add Attribute</button>
                </form>
            </div>
        </OverLay>
    );
}


interface AttributeDetailManagementProps {
    handleCancelEditAttribute: () => void;
}

const AttributeDetailManagement: React.FC<AttributeDetailManagementProps> = ({ handleCancelEditAttribute }) => {

    const [showEditAttributeName, setShowEditAttributeName] = React.useState(false);
    const [showEditAttributeValue, setShowEditAttributeValue] = React.useState(false);

    const handleEditAttributeName = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowEditAttributeName(true);
    }

    const handleCancelEditAttributeName = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowEditAttributeName(false);
    }

    const handleCancelEditAttributeValue = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowEditAttributeValue(false);
    }

    const handleEditAttributeValue = () => {
        setShowEditAttributeValue(true);
    }

    return (
        <OverLay>
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
                                <button onClick={handleEditAttributeValue} className="edit-button">Edit</button>
                                <button className="delete-button">Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Blue</td>
                            <td>
                                <button onClick={handleEditAttributeValue} className="edit-button">Edit</button>
                                <button className="delete-button">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={handleCancelEditAttribute} className="cancel-button">Cancel</button>
                <button className="add-button margin-top-button">Add Value</button>
                {
                    showEditAttributeValue && <EditAttributeValue hideOverlay={handleCancelEditAttributeValue} />
                }
            </div>
        </OverLay>
    );
};


export const AttributeManagement: React.FC = () => {

    const [showEditForm, setShowEditForm] = React.useState(false);
    const [showAddAttribute, setShowAddAttribute] = React.useState(false);

    const handleEdit = () => {
        setShowEditForm(true);
    }

    const handleCancelEdit = () => {
        setShowEditForm(false);
    }

    const handleAddAttribute = () => {
        setShowAddAttribute(true);
    }

    const handleCancelAddAttribute = () => {
        setShowAddAttribute(false);
    }

    return (
        <div className={"container-right"}>
            <h1 className={"primary-label"}>Attribute Management</h1>
            <p className={"primary-description"}>Add, edit, or delete attributes</p>
            <button onClick={handleAddAttribute} className="add-button margin-top-button">Add Attribute</button>
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
                            <button onClick={handleEdit} className={"edit-button"}>Edit</button>
                            <button className={"delete-button"}>Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Size</td>
                        <td>15</td>
                        <td>
                            <button onClick={handleEdit} className={"edit-button"}>Edit</button>
                            <button className={"delete-button"}>Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            {
                showEditForm && <AttributeDetailManagement handleCancelEditAttribute={handleCancelEdit} />
            }
            {
                showAddAttribute && <AddAttribute hideOverlay={handleCancelAddAttribute} />
            }
        </div>
    );
}