import React from 'react';
import './SupplierManagement.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button, Form, Table } from 'react-bootstrap';
import { FormSupplier } from './compoments/FormSupplier';
import GetSuppliers from '../../../services/supplier/GetSuppliers';
import Supplier from '../../../interface/Supplier';
import PaginationType from '../../../interface/Pagination';

export const SublierManagement: React.FC = () => {

    const [suppliers, setSuppliers] = React.useState<Supplier[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [globalError, setGlobalError] = React.useState<string>("");
    const [showOverlay, setShowOverlay] = React.useState(false);
    const [sublierId, setSublierId] = React.useState<string>("");
    const [pagination, setPagination] = React.useState<PaginationType>({
        limit: 0,
        offset: 0,
        totalPage: 0,
        totalElementOfPage: 0
    });

    React.useEffect(() => {
        setIsLoading(true);
        GetSuppliers()
            .then((response) => {
                setSuppliers(response.data);
                setPagination({
                    limit: response.limit,
                    offset: response.offset,
                    totalPage: response.totalPage,
                    totalElementOfPage: response.totalElementOfPage
                });
            }).catch((error) => {
                console.error(error);
                setGlobalError(error.message);
            }).finally(() => {
                setIsLoading(false);
            });
    }, []);

    const handleAdd = () => {
        setShowOverlay(true);
    }

    const handleClose = () => {
        setShowOverlay(false);
        setSublierId("");
    }

    const handleDelete = (id: string) => {
        console.log(`Delete supplier with ID: ${id}`);
    };

    const sublierList = suppliers.map((supplier, index) => {
        return (
            <tr key={supplier.id}>
                <td>{index + 1}</td>
                <td>{supplier.name}</td>
                <td>{supplier.description}</td>
                <td>{supplier.phone}</td>
                <td>{supplier.supplierCode}</td>
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
                showOverlay && <FormSupplier handleClose={handleClose} supplierId={sublierId} />
            }
        </div>
    );
};
