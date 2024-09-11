import React from "react";
import { OverLay } from "../../OverLay/OverLay";
import "./AttributeManagement.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

interface EditAttributeValueProps {
    hideOverlay: (e: React.MouseEvent<HTMLButtonElement>) => void;
    attributeDetailId: number;
}

const EditAttributeValue: React.FC<EditAttributeValueProps> = ({ hideOverlay, attributeDetailId }) => {
    return (
        <OverLay>
            <div className="edit-attribute-value">
                <button onClick={hideOverlay} className="button-close">
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <h1 className={"primary-label form-lable"}>{`${attributeDetailId ? "Edit" : "Add"} Attribute Value`}</h1>
                <form className={"form"}>
                    <div className={"form-input-container"}>
                        <input
                            type={"text"}
                            className={"form-input"}
                            placeholder={"Enter your attribute value"}
                        />
                    </div>
                    <button className="form-input-submit">Save</button>
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
                    <FontAwesomeIcon icon={faTimes} />
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