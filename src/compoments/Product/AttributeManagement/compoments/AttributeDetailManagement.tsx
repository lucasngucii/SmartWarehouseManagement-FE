import React from "react";
import { EditAttributeValue } from "./EditAttributeValue";
import { OverLay } from "../../../OverLay/OverLay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

interface AttributeDetailManagementProps {
    handleCancelEditAttribute: () => void;
}

export const AttributeDetailManagement: React.FC<AttributeDetailManagementProps> = ({ handleCancelEditAttribute }) => {

    const [showEditAttributeName, setShowEditAttributeName] = React.useState(false);
    const [showEditAttributeValue, setShowEditAttributeValue] = React.useState(false);
    const [attributeDetailId, setAttributeDetailId] = React.useState(0);

    const handleEditAttributeName = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowEditAttributeName(true);
    }

    const handleCancelEditAttributeName = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowEditAttributeName(false);
    }

    const handleCancelEditAttributeValue = () => {
        setAttributeDetailId(0)
        setShowEditAttributeValue(false);
    }

    const handleEditAttributeValue = (attributeId: number) => {
        setAttributeDetailId(attributeId);
        setShowEditAttributeValue(true);
    }

    const handleAddAttributeValue = () => {
        setShowEditAttributeValue(true);
    }

    return (
        <OverLay className="disabled-padding">
            <div className="attribute-detail-management">
                <h1 className={"primary-label"}>Attribute Detail Management</h1>
                <p className={"primary-description"}>Add, edit, or delete attribute values</p>
                <form className={"form"}>
                    <div className={"form-input-container"}>
                        <label className={"form-input-lable lable-attribute-name attribute-name-lable"}>Attribute Name</label>
                        <div className={"group-input-attribute-name"}>
                            <input
                                type={"text"}
                                disabled={!showEditAttributeName}
                                className={"form-input hidden-border-right-input-attribute-name"}
                                placeholder={"Enter your attribute name"}
                            />
                            <button onClick={handleEditAttributeName} className={"button-close-edit-attribute-name"}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </button>
                        </div>
                    </div>
                    {
                        showEditAttributeName && <div className={"form-input-container"}>
                            <button onClick={handleCancelEditAttributeName} className="cancel-button">Cancel</button>
                            <button className="edit-button">Save</button>
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
                                <button onClick={() => { handleEditAttributeValue(1) }} className="edit-button">Edit</button>
                                <button className="delete-button">Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Blue</td>
                            <td>
                                <button onClick={() => { handleEditAttributeValue(1) }} className="edit-button">Edit</button>
                                <button className="delete-button">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="group-button">
                    <button onClick={handleCancelEditAttribute} className="cancel-button">Cancel</button>
                    <button onClick={handleAddAttributeValue} className="edit-button">Add Value</button>
                </div>
                {
                    showEditAttributeValue && <EditAttributeValue attributeDetailId={attributeDetailId} hideOverlay={handleCancelEditAttributeValue} />
                }
            </div>
        </OverLay>
    );
};