import React from "react";
import "./AttributeManagement.css";
import { AttributeDetailManagement } from "./compoments/AttributeDetailManagement";

interface ListAttributeType {
    Id: number;
    Name: string;
}

export const AttributeManagement: React.FC = () => {

    const listAttribute: ListAttributeType[] = [
        {
            Id: 1,
            Name: "Color",
        },
        {
            Id: 2,
            Name: "Material",
        },
        {
            Id: 3,
            Name: "Brand",
        },
        {
            Id: 4,
            Name: "Size",
        },
        {
            Id: 5,
            Name: "Category",
        }
    ]

    const [attributeId, setAttributeId] = React.useState(0);
    const [showEditForm, setShowEditForm] = React.useState(false);

    const handleEdit = (attributeId: number) => {
        setAttributeId(attributeId);
        setShowEditForm(true);
    }

    const handleCancelEdit = () => {
        setShowEditForm(false);
    }

    const renderListAttribute = listAttribute.map((attribute) => {
        return (
            <tr key={attribute.Id}>
                <td>{attribute.Id}</td>
                <td>{attribute.Name}</td>
                <td>
                    <button onClick={() => { handleEdit(attribute.Id) }} className={"edit-button"}>Add Value</button>
                </td>
            </tr>
        );
    });

    return (
        <div>
            <div className="content-header-container">
                <div className="content-header-left">
                    <h2 className={"primary-label"}>Attribute Management</h2>
                    <p className={"primary-description"}>Add, edit, or delete attributes</p>
                </div>
            </div>
            <div className="table-container">
                <table className={"table id-column"}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Attribute Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderListAttribute}
                    </tbody>
                </table>
            </div>
            {
                showEditForm && <AttributeDetailManagement handleCancelEditAttribute={handleCancelEdit} attributeId={attributeId} />
            }
        </div>
    );
}