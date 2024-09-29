import React from "react";
import { AttributeValueManagement } from "./compoments/AttributeValueManagement";
import AttributeSquares from "./compoments/AttributeSquares";

export const AttributeManagement: React.FC = () => {

    const [attributeId, setAttributeId] = React.useState(0);
    const [showEditForm, setShowEditForm] = React.useState(false);

    const handleEdit = (attributeId: number) => {
        setAttributeId(attributeId);
        setShowEditForm(true);
    }

    const handleCancelEdit = () => {
        setShowEditForm(false);
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h2 className={"h2 fw-bold"}>Attribute Management</h2>
                    <p className={"h6"}>Add, edit, or delete attributes</p>
                </div>
            </div>
            <AttributeSquares editAttribute={handleEdit} />
            {
                showEditForm && <AttributeValueManagement handleCancelEditAttribute={handleCancelEdit} attributeId={attributeId} />
            }
        </div>
    );
}