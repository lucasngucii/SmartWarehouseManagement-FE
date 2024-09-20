import React from "react";
import "./AttributeManagement.css";
import { AttributeDetailManagement } from "./compoments/AttributeDetailManagement";
import { Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
            Name: "Model",
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
                    <Button
                        onClick={() => { handleEdit(attribute.Id) }}
                        variant="primary"
                    >
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </Button>
                </td>
            </tr>
        );
    });

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h2 className={"h2 fw-bold"}>Attribute Management</h2>
                    <p className={"h6"}>Add, edit, or delete attributes</p>
                </div>
            </div>
            <Table striped bordered hover>
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
            </Table>
            {
                showEditForm && <AttributeDetailManagement handleCancelEditAttribute={handleCancelEdit} attributeId={attributeId} />
            }
        </div>
    );
}