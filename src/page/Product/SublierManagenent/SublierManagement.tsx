import React from 'react';
import './SublierManagement.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormSublier } from './compoments/FormSublier';
import { Button, Form, Table } from 'react-bootstrap';

interface Supplier {
    id: number;
    name: string;
    description: string;
    phone: string;
    sublierCode: string;
    address: string;
    email: string;
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
                    <div className="d-flex flex-row gap-2">
                        <Button
                            onClick={() => {
                                setShowOverlay(true);
                                setSublierId(supplier.id);
                            }}
                            variant="primary"
                        >
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </Button>
                        <Button
                            onClick={() => handleDelete(supplier.id)}
                            variant="danger"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </div>
                </td>
            </tr>
        );
    }
    );

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h2 className={"h2 fw-bold"}>Sublier Management</h2>
                    <p className={"h6"}>Manage your suppliers here</p>
                </div>
                <div className="d-flex flex-row gap-5">
                    <div className="d-flex flex-row gap-2">
                        <Form.Control className="p-2" type="text" placeholder="Search" />
                        <Button variant="secondary">
                            <FontAwesomeIcon icon={faSearch} />
                        </Button>
                    </div>
                    <Button onClick={handleAdd} variant="success fw-bold">NEW +</Button>
                </div>
            </div>
            <Table striped hover bordered>
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
            </Table>
            {
                showOverlay && <FormSublier handleClose={handleClose} supplierId={sublierId} />
            }
        </div>
    );
};
