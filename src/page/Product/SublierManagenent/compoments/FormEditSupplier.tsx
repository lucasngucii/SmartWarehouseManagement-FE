import React, { useState } from 'react';
import { OverLay } from '../../../../compoments/OverLay/OverLay';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import GetSupplierById from '../../../../services/supplier/GetSupplierById';
import Supplier from '../../../../interface/Supplier';
import UpdateSupplierById from '../../../../services/supplier/UpdateSupplierById';
import PaginationType from '../../../../interface/Pagination';
import GetSuppliers from '../../../../services/supplier/GetSuppliers';
import CreateSupplier from '../../../../services/supplier/CreateSupplier';
import FormDataTypes from '../../../../interface/FormDataSupplier';

interface SupplierDetailProps {
    supplierId: string;
    hideOverlay: () => void;
    updateSuppliers: (suppliers: Supplier[]) => void;
    updatePagination: (pagination: PaginationType) => void;
}

const FormEditSupplier: React.FC<SupplierDetailProps> = ({ supplierId, hideOverlay, updatePagination, updateSuppliers }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [globalError, setGlobalError] = useState<string>("");
    const [globalSuccess, setGlobalSuccess] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormDataTypes>({
        name: "",
        description: "",
        phone: "",
        email: "",
        address: "",
        supplierCode: "",
        createdBy: "",
        contactPerson: "",
        location: "",
        status: true,
        notes: "",
        website: "",
        taxId: "",
        isActive: true
    });
    const [formError, setFormError] = useState<FormDataTypes>({

        name: "",
        description: "",
        phone: "",
        email: "",
        address: "",
        supplierCode: "",
        createdBy: "",
        contactPerson: "",
        location: "",
        status: true,
        notes: "",
        website: "",
        taxId: "",
        isActive: true
    });
    const [dataDefault, setDataDefault] = useState<FormDataTypes>({
        name: "",
        description: "",
        phone: "",
        email: "",
        address: "",
        supplierCode: "",
        createdBy: "",
        contactPerson: "",
        location: "",
        status: true,
        notes: "",
        website: "",
        taxId: "",
        isActive: true
    });

    const validate1 = () => {

        let isError = false;

        if (!formData.name) {
            isError = true;
            setFormError((preValue) => {
                return { ...preValue, name: "Name is required" };
            });
        }

        if (!formData.phone) {
            isError = true;
            setFormError((preValue) => {
                return { ...preValue, phone: "Phone is required" };
            })
        }

        if (!formData.email) {
            isError = true;
            setFormError((preValue) => {
                return { ...preValue, email: "Email is required" };
            })
        }

        if (!formData.address) {
            isError = true;
            setFormError((preValue) => {
                return { ...preValue, address: "Address is required" };
            })
        }

        if (!formData.website) {
            isError = true;
            setFormError((preValue) => {
                return { ...preValue, website: "Website is required" };
            })
        }

        if (!formData.contactPerson) {
            isError = true;
            setFormError((preValue) => {
                return { ...preValue, contactPerson: "Contact person is required" };
            })
        }

        if (!formData.supplierCode) {
            isError = true;
            setFormError((preValue) => {
                return { ...preValue, supplierCode: "Supplier code is required" };
            })
        }

        if (!formData.location) {
            isError = true;
            setFormError((preValue) => {
                return { ...preValue, location: "Location is required" };
            })
        }

        if (!formData.taxId) {
            isError = true;
            setFormError((preValue) => {
                return { ...preValue, taxId: "Tax id is required" };
            })
        }

        if (!formData.notes) {
            isError = true;
            setFormError((preValue) => {
                return { ...preValue, notes: "Notes is required" };
            })
        }

        if (!formData.description) {
            isError = true;
            setFormError((preValue) => {
                return { ...preValue, description: "Description is required" };
            })
        }

        return isError;
    }

    React.useEffect(() => {
        if (supplierId) {
            setIsLoading(true);
            GetSupplierById(supplierId)
                .then((response) => {
                    setFormData({
                        name: response.name,
                        description: response.description,
                        phone: response.phone,
                        email: response.email,
                        address: response.address,
                        supplierCode: response.supplierCode,
                        createdBy: response.createdBy,
                        contactPerson: response.contactPerson,
                        location: response.location,
                        status: response.status,
                        notes: response.notes,
                        website: response.website,
                        taxId: response.taxId,
                        isActive: response.isActive
                    });
                    setDataDefault(response);
                }).catch((error) => {
                    console.error(error);
                    setGlobalError(error.message);
                }).finally(() => {
                    setIsLoading(false);
                });
        }
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
        if (!validate1()) {
            setIsSaving(true);
            if (supplierId) {
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
            } else {
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
                        setGlobalSuccess("Create supplier successfully");
                        setTimeout(() => {
                            hideOverlay();
                        }, 1000);
                    }).catch((error) => {
                        console.error(error);
                        setGlobalError(error.message);
                    }).finally(() => {
                        setIsSaving(false);
                    });
            }
        }
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
                        <h2 className="fw-bold mb-0">{`${supplierId ? "Edit" : "New"}`} Supplier</h2>
                    </div>
                    {globalError && <Alert onClose={() => setGlobalError("")} variant="danger" dismissible>{globalError}</Alert>}
                    {globalSuccess && <Alert onClose={() => setGlobalSuccess("")} variant="success" dismissible>{globalSuccess}</Alert>}
                    {supplierId && isEditing ? (
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
                    ) : supplierId && (
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
                                        disabled={supplierId !== "" && !isEditing}
                                        required
                                        placeholder='Enter supplier name'
                                    />
                                    <Form.Text className="text-danger">{formError.name}</Form.Text>
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
                                            disabled={supplierId !== "" && !isEditing}
                                            required
                                            placeholder='Enter phone number'
                                        />
                                        <Form.Text className="text-danger">{formError.phone}</Form.Text>
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
                                            disabled={supplierId !== "" && !isEditing}
                                            required
                                            placeholder='Enter email'
                                        />
                                        <Form.Text className="text-danger">{formError.email}</Form.Text>
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
                                        disabled={supplierId !== "" && !isEditing}
                                        required
                                        placeholder='Enter address'
                                    />
                                    <Form.Text className="text-danger">{formError.address}</Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Website</Form.Label>
                                    <Form.Control
                                        className="py-3"
                                        type="website"
                                        value={formData.website}
                                        name="website"
                                        onChange={handleChange}
                                        disabled={supplierId !== "" && !isEditing}
                                        required
                                        placeholder='Enter website'
                                    />
                                    <Form.Text className="text-danger">{formError.website}</Form.Text>
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
                                            disabled={supplierId !== "" && !isEditing}
                                            required
                                            placeholder='Enter contact person'
                                        />
                                        <Form.Text className="text-danger">{formError.contactPerson}</Form.Text>
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
                                            disabled={supplierId !== "" && !isEditing}
                                            required
                                            placeholder='Enter supplier code'
                                        />
                                        <Form.Text className="text-danger">{formError.supplierCode}</Form.Text>
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
                                    disabled={supplierId !== "" && !isEditing}
                                    required
                                    placeholder='Enter location'
                                />
                                <Form.Text className="text-danger">{formError.location}</Form.Text>
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
                                            disabled={supplierId !== "" && !isEditing}
                                            required
                                        >
                                            <option value="true">Đang Cung Cấp</option>
                                            <option value="false">Ngừng Cung Cấp</option>
                                        </Form.Select>
                                        <Form.Text className="text-danger">{formError.status}</Form.Text>
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
                                            disabled={supplierId !== "" && !isEditing}
                                            required
                                        >
                                            <option value="true">Active</option>
                                            <option value="false">Disable</option>
                                        </Form.Select>
                                        <Form.Text className="text-danger">{formError.isActive}</Form.Text>
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
                                            disabled={supplierId !== "" && !isEditing}
                                            required
                                            placeholder='Enter tax id'
                                        />
                                        <Form.Text className="text-danger">{formError.taxId}</Form.Text>
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
                                            disabled={supplierId !== "" && !isEditing}
                                            required
                                            placeholder='Enter notes'
                                        />
                                        <Form.Text className="text-danger">{formError.notes}</Form.Text>
                                    </Form.Group>
                                </Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <textarea
                                        className="form-control p-3"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        disabled={supplierId !== "" && !isEditing}
                                        placeholder="Enter description"
                                        rows={3}
                                    />
                                    <Form.Text className="text-danger">{formError.description}</Form.Text>
                                </Form.Group>
                            </Row>
                            {
                                supplierId === "" &&
                                <Button
                                    onClick={handleSubmit}
                                    disabled={isSaving}
                                    variant="primary"
                                    className='form-control fw-bold py-3'>
                                    {isSaving ? "Creating..." : "Create"}
                                </Button>
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        </OverLay>
    );
};

export default FormEditSupplier;
