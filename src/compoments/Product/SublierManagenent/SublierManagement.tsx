import React from 'react';
import './SublierManagement.css';
import { OverLay } from "../../OverLay/OverLay";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface Supplier {
    id: number;
    name: string;
    contactInfo: string;
}

interface FormSupplierProps {
    handleClose: () => void;
    supplierId: number | null;
}

const FormSublier: React.FC<FormSupplierProps> = ({ supplierId, handleClose }) => {

    const [supplierName, setSupplierName] = React.useState<string>('');

    const handleAdd = () => {
        console.log('Add supplier');
    }

    const handleUpdate = () => {
        console.log('Update supplier');
    }

    return (
        <OverLay>
            <div className="supplier-management-overlay">
                <button onClick={handleClose} className="button-close">
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <p className="primary-label form-lable">{supplierId ? "UPDATE SUPLIER" : "NEW SUBLIER"}</p>
                <form className={"form"}>
                    <div className={"form-input-container"}>
                        <label htmlFor={"supplier-name"} className="form-label">Supplier Name</label>
                        <input
                            id={"supplier-name"}
                            type="text"
                            placeholder="Enter supplier name"
                            className="form-input"
                            required
                            value={supplierName}
                            onChange={(e) => setSupplierName(e.target.value)}
                        />
                    </div>
                    <div className={"form-input-container"}>
                        <label htmlFor={"contact-info"} className="form-label">Contact Infor</label>
                        <input
                            id={"contact-info"}
                            type="text"
                            placeholder="Enter contact info"
                            className="form-input"
                            required
                            value={supplierName}
                            onChange={(e) => setSupplierName(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={supplierId ? handleUpdate : handleAdd}
                        className="form-input-submit"
                    >
                        {supplierId ? "Update Suplier" : "Add Supplier"}
                    </button>
                </form>
            </div>
        </OverLay>
    )
}

export const SublierManagement: React.FC = () => {

    const [suppliers, setSuppliers] = React.useState<Supplier[]>([
        { id: 1, name: 'Supplier A', contactInfo: '123456789' },
        { id: 2, name: 'Supplier B', contactInfo: '123456789' },
        { id: 3, name: 'Supplier C', contactInfo: '123456789' },
    ]);
    const [showOverlay, setShowOverlay] = React.useState(false);
    const [sublierId, setSublierId] = React.useState<number | null>(null);

    const handleAdd = () => {
        setShowOverlay(true);
    }

    const handleClose = () => {
        setShowOverlay(false);
        setSublierId(null);
    }

    const handleDelete = (id: number) => {
        console.log(`Delete supplier with ID: ${id}`);
    };

    const sublierList = suppliers.map((supplier, index) => {
        return (
            <tr key={supplier.id}>
                <td>{supplier.id}</td>
                <td>{supplier.name}</td>
                <td>{supplier.contactInfo}</td>
                <td>
                    <button className="edit-button"
                        onClick={() => {
                            setShowOverlay(true);
                            setSublierId(supplier.id);
                        }}
                    >
                        Edit
                    </button>
                    <button className="delete-button"
                        onClick={() => handleDelete(supplier.id)}>Delete
                    </button>
                </td>
            </tr>
        );
    }
    );

    return (
        <div>
            <div className="content-header-container">
                <div className="content-header-left">
                    <h2 className="primary-label">Sublier Management</h2>
                    <p className="primary-description">Manage your suppliers here</p>
                </div>
                <div className="content-header-right">
                    <form className="form-search">
                        <input
                            type="search"
                            className="form-input"
                            placeholder={"Search user"}
                        />
                        <button className="form-input-submit">Search</button>
                    </form>
                    <button onClick={handleAdd} className="add-button margin-top-button">Add Supplier</button>
                </div>
            </div>
            <div className="table-container">
                <table className="table id-column">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Contact Info</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sublierList}
                    </tbody>
                </table>
            </div>
            {
                showOverlay && <FormSublier handleClose={handleClose} supplierId={sublierId} />
            }
        </div>
    );
};
