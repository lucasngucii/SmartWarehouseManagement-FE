import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { OverLay } from "../../../../compoments/OverLay/OverLay";
import { Form } from "react-bootstrap";

interface FormSupplierProps {
    handleClose: () => void;
    supplierId: string;
}

interface FormDataTypes {
    supplierName: string;
    description: string;
    phone: string;
    sublierCode: string;
    address: string;
    email: string;
}

export const FormSupplier: React.FC<FormSupplierProps> = ({ supplierId, handleClose }) => {

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
                <p className="h2 fw-bold text-center">{supplierId ? "UPDATE SUPLIER" : "NEW SUBLIER"}</p>
                <Form onClick={supplierId ? handleUpdate : handleAdd}>
                    <Form.Group className="mb-3">
                        <Form.Label>Supplier Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter supplier name"
                            value={formData.supplierName}
                            name='supplierName'
                            onChange={handleChageInput}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your description"
                            name='description'
                            value={formData.description}
                            onChange={handleChageInput}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="phone"
                            placeholder="Enter your supplier phone"
                            name='phone'
                            value={formData.phone}
                            onChange={handleChageInput}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="address"
                            placeholder="Enter your supplier address"
                            name='address'
                            value={formData.address}
                            onChange={handleChageInput}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your supplier email"
                            name='email'
                            value={formData.email}
                            onChange={handleChageInput}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="submit"
                            value={supplierId ? "Update Suplier" : "Add Supplier"}
                            className="btn btn-primary"
                        />
                    </Form.Group>
                </Form>
            </div>
        </OverLay>
    )
}