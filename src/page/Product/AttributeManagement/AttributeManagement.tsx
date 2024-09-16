import React from "react";
import "./AttributeManagement.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AttributeDetailManagement } from "./compoments/AttributeDetailManagement";
import { AddAttribute } from "./compoments/AddAttribute";

interface ListAttributeType {
    Id: number;
    Name: string;
    Value: number;
}

export const AttributeManagement: React.FC = () => {

    const [listAttribute, setListAttribute] = React.useState<ListAttributeType[]>([
        {
            Id: 1,
            Name: "Color",
            Value: 12
        },
        {
            Id: 2,
            Name: "Material",
            Value: 15
        },
        {
            Id: 3,
            Name: "Brand",
            Value: 12
        },
        {
            Id: 4,
            Name: "Size",
            Value: 19
        },
        {
            Id: 5,
            Name: "Category",
            Value: 12
        }
    ]);
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

    const renderListAttribute = listAttribute.map((attribute) => {
        return (
            <tr key={attribute.Id}>
                <td>{attribute.Name}</td>
                <td>{attribute.Value}</td>
                <td>
                    <button onClick={handleEdit} className={"edit-button"}>Edit</button>
                    <button className={"delete-button"}>Delete</button>
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
                    <button onClick={handleAddAttribute} className="add-button margin-top-button">Add Attribute</button>
                </div>
            </div>
            <div className="table-container">
                <table className={"table"}>
                    <thead>
                        <tr>
                            <th>Attribute Name</th>
                            <th>Total Value</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderListAttribute}
                    </tbody>
                </table>
            </div>
            {
                showEditForm && <AttributeDetailManagement handleCancelEditAttribute={handleCancelEdit} />
            }
            {
                showAddAttribute && <AddAttribute hideOverlay={handleCancelAddAttribute} />
            }
        </div>
    );
}