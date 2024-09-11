import React from 'react';
import './SublierManagement.css';
import { OverLay } from "../../OverLay/OverLay";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

interface Supplier {
    id: number;
    name: string;
    description: string;
    phone: string;
    sublierCode: string;
    address: string;
    email: string;
}

interface FormSupplierProps {
    handleClose: () => void;
    supplierId: number | null;
}

interface FormDataTypes {
    supplierName: string;
    description: string;
    phone: string;
    sublierCode: string;
    address: string;
    email: string;
}

const FormSublier: React.FC<FormSupplierProps> = ({ supplierId, handleClose }) => {

    const [formData, setFormData] = React.useState<FormDataTypes>({
        supplierName: '',
        description: '',
        phone: '',
        sublierCode: '',
        address: '',
        email: '',
    });

    const handleChageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

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
                            value={formData.supplierName}
                            name='supplierName'
                            onChange={handleChageInput}
                        />
                    </div>
                    <div className={"form-input-container"}>
                        <label htmlFor={"description"} className="form-label">Description</label>
                        <input
                            id={"description"}
                            type="text"
                            placeholder="Enter your description"
                            className="form-input"
                            required
                            name='description'
                            value={formData.description}
                            onChange={handleChageInput}
                        />
                    </div>
                    <div className={"form-input-container"}>
                        <label htmlFor={"phone"} className="form-label">Phone</label>
                        <input
                            id={"phone"}
                            type="phone"
                            placeholder="Enter your supplier phone"
                            className="form-input"
                            required
                            name='phone'
                            value={formData.phone}
                            onChange={handleChageInput}
                        />
                    </div>
                    <div className={"form-input-container"}>
                        <label htmlFor={"address"} className="form-label">Address</label>
                        <input
                            id={"address"}
                            type="address"
                            placeholder="Enter your supplier address"
                            className="form-input"
                            required
                            name='address'
                            value={formData.address}
                            onChange={handleChageInput}
                        />
                    </div>
                    <div className={"form-input-container"}>
                        <label htmlFor={"email"} className="form-label">Email</label>
                        <input
                            id={"email"}
                            type="email"
                            placeholder="Enter your supplier email"
                            className="form-input"
                            required
                            name='email'
                            value={formData.email}
                            onChange={handleChageInput}
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
        {
            id: 1,
            name: 'Supplier 1',
            description: 'Description 1',
            phone: '0123456789',
            sublierCode: 'S001',
            address: 'Address 1',
            email: 'abc@gmail.com',
        },
        {
            id: 2,
            name: 'Supplier 2',
            description: 'Description 2',
            phone: '0123456789',
            sublierCode: 'S002',
            address: 'Address 2',
            email: 'hailua@gmail.com',
        },
        {
            id: 3,
            name: 'Supplier 3',
            description: 'Description 3',
            phone: '0123456789',
            sublierCode: 'S003',
            address: 'Address 3',
            email: 'trantrong@gmail.com',
        },
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
                <td>{index + 1}</td>
                <td>{supplier.name}</td>
                <td>{supplier.description}</td>
                <td>{supplier.phone}</td>
                <td>{supplier.sublierCode}</td>
                <td>{supplier.address}</td>
                <td>{supplier.email}</td>
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
                        <button className="form-input-submit">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
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
                            <th>Description</th>
                            <th>Phone</th>
                            <th>Supplier Code</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Action</th>
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
