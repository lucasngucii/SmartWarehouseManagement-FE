import React, { useState } from 'react';
import { Form, Button, Row, Col, CloseButton, Alert } from 'react-bootstrap';
import Supplier from '../../../../interface/Supplier';
import PaginationType from '../../../../interface/Pagination';
import { OverLay } from '../../../../compoments/OverLay/OverLay';
import CreateSupplier from '../../../../services/supplier/CreateSupplier';
import GetSuppliers from '../../../../services/supplier/GetSuppliers';

interface SupplierData {
    name: string;
    description: string;
    phone: string;
    email: string;
    address: string;
    supplierCode: string;
    contactPerson: string;
    location: string;
    notes: string;
    website: string;
    taxId: string;
}

interface SupplierFormProps {
    handleClose: () => void;
    updateSuppliers: (suppliers: Supplier[]) => void;
    updatePagination: (pagination: PaginationType) => void;
}


const SupplierForm: React.FC<SupplierFormProps> = ({ handleClose, updatePagination, updateSuppliers }) => {

    const [isloading, setIsLoading] = useState(false);
    const [globalError, setGlobalError] = useState<string>("");
    const [globalSuccess, setGlobalSuccess] = useState<string>("");
    const [formData, setFormData] = useState<SupplierData>({
        name: '',
        description: '',
        phone: '',
        email: '',
        address: '',
        supplierCode: '',
        contactPerson: '',
        location: '',
        notes: '',
        website: '',
        taxId: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        CreateSupplier(formData)
            .then(() => {
                return GetSuppliers();
            }).then((response) => {
                updateSuppliers(response.data);
                updatePagination({
                    limit: response.limit,
                    offset: response.offset,
                    totalElementOfPage: response.totalElementOfPage,
                    totalPage: response.totalPage
                });
                setGlobalSuccess("Supplier created successfully");
                setTimeout(() => {
                    handleClose();
                }, 1000);
            }).catch((error) => {
                console.error(error);
                setGlobalError(error.message);
            }).finally(() => {
                setIsLoading(false);
            });

    };

    return (
        <OverLay>
            <div className="supplier-form-container">
                {
                    globalError && <Alert variant="danger" onClose={() => setGlobalError("")} dismissible>{globalError}</Alert>
                }
                {
                    globalSuccess && <Alert variant="success" onClose={() => setGlobalSuccess("")} dismissible>{globalSuccess}</Alert>
                }
                <Row>
                    <Col className='position-relative'>
                        <CloseButton
                            onClick={handleClose}
                            className="position-absolute btn-close"
                            style={{ top: "20px", right: "30px", cursor: 'pointer' }}
                        />
                        <div className="supplier-form shadow p-4 rounded">
                            <h2 className="text-center mb-4 fw-bold">Create Supplier</h2>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Company Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter company name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter phone number"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Supplier Code</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter supplier code"
                                                name="supplierCode"
                                                value={formData.supplierCode}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Contact Person</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter contact person"
                                                name="contactPerson"
                                                value={formData.contactPerson}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Location</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter location"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder="Enter address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Notes</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter notes"
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Website</Form.Label>
                                            <Form.Control
                                                type="url"
                                                placeholder="Enter website"
                                                name="website"
                                                value={formData.website}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Tax ID</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter tax ID"
                                                name="taxId"
                                                value={formData.taxId}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button disabled={isloading} variant="primary" type="submit" className="w-100 py-3 rounded" style={{ fontWeight: 'bold', letterSpacing: '1px' }}>
                                    {isloading ? 'Loading...' : 'Create'}
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        </OverLay>
    );
};

export default SupplierForm;
