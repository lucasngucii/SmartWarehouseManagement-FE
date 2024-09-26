import React, { useState } from 'react';
import { OverLay } from '../../../../compoments/OverLay/OverLay';
import { Alert, Col, Container, Form, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronLeft, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import GetSupplierById from '../../../../services/supplier/GetSupplierById';
import Supplier from '../../../../interface/Supplier';
import UpdateSupplierById from '../../../../services/supplier/UpdateSupplierById';
import PaginationType from '../../../../interface/Pagination';
import GetSuppliers from '../../../../services/supplier/GetSuppliers';

interface SupplierDetailProps {
    supplierId: string;
    hideOverlay: () => void;
    updateSuppliers: (suppliers: Supplier[]) => void;
    updatePagination: (pagination: PaginationType) => void;
}

const SupplierDetail: React.FC<SupplierDetailProps> = ({ supplierId, hideOverlay, updatePagination, updateSuppliers }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [globalError, setGlobalError] = useState<string>("");
    const [globalSuccess, setGlobalSuccess] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<Supplier>({
        id: "",
        name: "",
        description: "",
        phone: "",
        email: "",
        address: "",
        supplierCode: "",
        createdAt: "",
        updatedAt: "",
        createdBy: "",
        isDeleted: false,
        contactPerson: "",
        location: "",
        status: false,
        notes: "",
        website: "",
        taxId: "",
        isActive: false
    });
    const [dataDefault, setDataDefault] = useState<Supplier>({
        id: "",
        name: "",
        description: "",
        phone: "",
        email: "",
        address: "",
        supplierCode: "",
        createdAt: "",
        updatedAt: "",
        createdBy: "",
        isDeleted: false,
        contactPerson: "",
        location: "",
        status: false,
        notes: "",
        website: "",
        taxId: "",
        isActive: false
    });

    React.useEffect(() => {
        setIsLoading(true);
        GetSupplierById(supplierId)
            .then((response) => {
                setFormData(response);
                setDataDefault(response);
            }).catch((error) => {
                console.error(error);
                setGlobalError(error.message);
            }).finally(() => {
                setIsLoading(false);
            });
    }, [supplierId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value === "true" ? true : false });
    }

    const handleSubmit = () => {
        setIsSaving(true);
        UpdateSupplierById(supplierId, formData)
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
                setGlobalSuccess("Update supplier successfully");
                setDataDefault(formData);
                setIsEditing(false);
            }).catch((error) => {
                console.error(error);
                setGlobalError(error.message);
            }).finally(() => {
                setIsSaving(false);
            });
    }

    const checkChangeFormData = () => {

        let check = false;

        if (formData.name !== dataDefault.name) check = true;
        if (formData.phone !== dataDefault.phone) check = true;
        if (formData.email !== dataDefault.email) check = true;
        if (formData.address !== dataDefault.address) check = true;
        if (formData.website !== dataDefault.website) check = true;
        if (formData.contactPerson !== dataDefault.contactPerson) check = true;
        if (formData.supplierCode !== dataDefault.supplierCode) check = true;
        if (formData.location !== dataDefault.location) check = true;
        if (formData.status !== dataDefault.status) check = true;
        if (formData.isActive !== dataDefault.isActive) check = true;
        if (formData.taxId !== dataDefault.taxId) check = true;
        if (formData.notes !== dataDefault.notes) check = true;
        if (formData.description !== dataDefault.description) check = true;

        return check;
    }

    return (
        <OverLay className='disabled-padding'>
            <Container fluid className='bg-light w-100 h-100 p-4'>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex flex-row align-items-center gap-2">
                        <button
                            onClick={hideOverlay}
                            className="btn fs-3 px-3 text-primary"
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <h2 className="fw-bold mb-0">Edit Supplier</h2>
                    </div>
                    {globalError && <Alert onClose={() => setGlobalError("")} variant="danger" dismissible>{globalError}</Alert>}
                    {globalSuccess && <Alert onClose={() => setGlobalSuccess("")} variant="success" dismissible>{globalSuccess}</Alert>}
                    {isEditing ? (
                        <div className="d-flex flex-row gap-2">
                            <button
                                disabled={isLoading || isSaving || !checkChangeFormData()}
                                onClick={() => handleSubmit()}
                                className="btn btn-primary d-flex align-items-center"
                            >
                                <FontAwesomeIcon icon={faSave} className="me-2" />
                                {isSaving ? "Saving..." : "Save"}
                            </button>
                            <button
                                disabled={isSaving || isLoading}
                                onClick={() => {
                                    setIsEditing(false);
                                    setFormData(dataDefault);
                                }}
                                className="btn btn-secondary"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            disabled={isSaving || isLoading}
                            onClick={() => setIsEditing(true)}
                            className="btn btn-danger fw-bold d-flex align-items-center"
                        >
                            <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                        </button>
                    )}
                </div>
                <Row className="p-4">
                    <Col md={6}>
                        <div className="p-3 gap-3 rounded mb-1">
                            <h5 className="fw-semibold border-bottom pb-2 mb-3">Basic Information</h5>
                            <Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Supplier Name</Form.Label>
                                    <Form.Control
                                        className="py-3"
                                        type="text"
                                        value={formData.name}
                                        name="name"
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        required
                                    />
                                </Form.Group>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control
                                            className="py-3"
                                            type="tel"
                                            value={formData.phone}
                                            name="phone"
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            className="py-3"
                                            type="email"
                                            value={formData.email}
                                            name="email"
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        className="py-3"
                                        type="text"
                                        value={formData.address}
                                        name="address"
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Website</Form.Label>
                                    <Form.Control
                                        className="py-3"
                                        type="website"
                                        value={formData.website}
                                        name="website"
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        required
                                    />
                                </Form.Group>
                            </Row>
                        </div>
                        <div className="p-3 gap-3 rounded mb-1">
                            <h5 className="fw-semibold border-bottom pb-2 mb-3">Contact Information</h5>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Contact Person</Form.Label>
                                        <Form.Control
                                            className="py-3"
                                            type="text"
                                            value={formData.contactPerson}
                                            name="contactPerson"
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Supplier Code</Form.Label>
                                        <Form.Control
                                            className="py-3"
                                            type="text"
                                            value={formData.supplierCode}
                                            name="supplierCode"
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col md={6} className="rounded">
                        <div className="p-3 gap-3 rounded mb-1">
                            <h5 className="fw-semibold border-bottom pb-2 mb-3">Location Information</h5>
                            <Form.Group className="mb-3">
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                    className="py-3"
                                    type="text"
                                    value={formData.location}
                                    name="location"
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    required
                                />
                            </Form.Group>
                        </div>
                        <div className="p-3 gap-3 rounded mb-1">
                            <h5 className="fw-semibold border-bottom pb-2 mb-3">Status Information</h5>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Status</Form.Label>
                                        <Form.Select
                                            className="py-3"
                                            value={formData.status + ""}
                                            name="status"
                                            onChange={handleChangeSelect}
                                            disabled={!isEditing}
                                            required
                                        >
                                            <option value="true">Đang Cung Cấp</option>
                                            <option value="false">Ngừng Cung Cấp</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Is Active</Form.Label>
                                        <Form.Select
                                            className="py-3"
                                            value={formData.isActive + ""}
                                            name="isActive"
                                            onChange={handleChangeSelect}
                                            disabled={!isEditing}
                                            required
                                        >
                                            <option value="true">Active</option>
                                            <option value="false">Disable</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                        <div className="p-3 gap-3 rounded mb-1">
                            <h5 className="fw-semibold border-bottom pb-2 mb-3">Additional Information</h5>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Tax ID</Form.Label>
                                        <Form.Control
                                            className="py-3"
                                            type="text"
                                            value={formData.taxId}
                                            name="taxId"
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Notes</Form.Label>
                                        <Form.Control
                                            className="py-3"
                                            type="text"
                                            value={formData.notes}
                                            name="notes"
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <textarea
                                        className="form-control p-3"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        placeholder="Enter description"
                                        rows={3}
                                    />
                                </Form.Group>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </OverLay>
    );
};

export default SupplierDetail;
