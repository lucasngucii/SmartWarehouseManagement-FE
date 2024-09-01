import React from 'react';
import './SublierManagement.css';
import {OverLay} from "../../OverLay/OverLay";

interface Supplier {
    id: number;
    name: string;
}

interface FormSupplierProps {
    handleClose: () => void;
    supplierId: number | null;
}

const FormSublier: React.FC<FormSupplierProps> = ({supplierId, handleClose}) => {

    const [supplierName, setSupplierName] = React.useState<string>('');

    const handleAdd = () => {
        console.log('Add supplier');
    }

    const handleUpdate = () => {
        console.log('Update supplier');
    }

    return (
        <div className="supplier-management-overlay">
            <button onClick={handleClose} className="modal-close">
                <i className="fas fa-times"></i>
            </button>
            <h1 className="supplier-management-overlay-title">{supplierId ? "Update Sublier" : "Add Sublier"}</h1>
            <input
                type="text"
                placeholder="Supplier name"
                className="supplier-management-overlay-input"
                required
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
            />
            <button
                onClick={supplierId ? handleUpdate : handleAdd}
                className="supplier-management-overlay-add-button"
            >
                {supplierId ? "Update" : "Add"}
            </button>
        </div>
    )
}

export const SublierManagement: React.FC = () => {

    const [suppliers, setSuppliers] = React.useState<Supplier[]>([
        {id: 1, name: 'Supplier A'},
        {id: 2, name: 'Supplier B'},
        {id: 3, name: 'Supplier C'},
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
                    <td>
                        <button className="supplier-management-action-button-edit"
                                onClick={() => {
                                    setShowOverlay(true);
                                    setSublierId(supplier.id);
                                }}
                        >
                            Edit
                        </button>
                        <button className="supplier-management-action-button-delete"
                                onClick={() => handleDelete(supplier.id)}>Delete
                        </button>
                    </td>
                </tr>
            );
        }
    );

    return (
        <div className="supplier-management-container">
            <h1 className="supplier-management-title">Sublier Management</h1>
            <p className="supplier-management-description">Manage your suppliers here</p>
            <table className="supplier-management-table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {sublierList}
                </tbody>
            </table>
            <button onClick={handleAdd} className="supplier-management-add-button">Add Supplier</button>
            {
                showOverlay && <OverLay>
                    <FormSublier handleClose={handleClose} supplierId={sublierId}/>
                </OverLay>
            }
        </div>
    );
};
