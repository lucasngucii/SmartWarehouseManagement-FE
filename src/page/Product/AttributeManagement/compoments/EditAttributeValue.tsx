import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { OverLay } from "../../../../compoments/OverLay/OverLay";
import React from "react";
import AddAttributeValue from "../../../../services/attribute/AddAttributeValue";
import Attribute from "../../../../interface/Attribute";
import GetAttributeDetail from "../../../../services/attribute/GetAttributeDetail";
import PaginationType from "../../../../interface/Pagination";
import AttributeDetailType from "../../../../interface/AttributeDetail";
import { Alert, Button, CloseButton, Col, Form, Row } from "react-bootstrap";
import GetAttributeValueById from "../../../../services/attribute/GetAttributeValueById";
import UpdateAttributeValue from "../../../../services/attribute/UpdateAttributeValue";
import validateVietnamese from "../../../../util/validateVietnamese";

interface EditAttributeValueProps {
    hideOverlay: () => void;
    attributeDetailId: string;
    attributeId: number;
    updateAttributeValues: (data: AttributeDetailType[]) => void;
    updatePagination: (data: PaginationType) => void;
}

export const EditAttributeValue: React.FC<EditAttributeValueProps> = ({ hideOverlay, attributeDetailId, attributeId, updateAttributeValues, updatePagination }) => {

    const [formData, setFormData] = React.useState<Attribute>({
        name: "",
        description: "",
        sizeCode: ""
    });
    const [error, setError] = React.useState({
        name: "",
        description: "",
        sizeCode: ""
    });
    const [loading, setLoading] = React.useState(false);
    const [globalError, setGlobalError] = React.useState("");
    const [globalSuccess, setGlobalSuccess] = React.useState("");
    const [editAttributeValue, setEditAttributeValue] = React.useState(false);

    React.useEffect(() => {
        if (attributeDetailId) {
            GetAttributeValueById(attributeId, attributeDetailId)
                .then((response) => {
                    setFormData({
                        name: response.name,
                        description: response.description,
                        sizeCode: response.sizeCode || response.brandCode || response.colorCode || response.materialCode || response.categoryCode
                    });
                }).catch((error) => {
                    console.error(error);
                    setGlobalError(error.message);
                });
        }
    }, [attributeDetailId, attributeId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError(preValue => {
            return {
                ...preValue,
                [e.target.name]: ""
            }
        });
    }

    const handleSubmit = () => {
        setLoading(true);
        if (attributeDetailId) {
            UpdateAttributeValue(attributeId, attributeDetailId, formData)
                .then(() => {
                    return GetAttributeDetail({ id: attributeId });
                }).then((response) => {
                    updateAttributeValues(response.data);
                    updatePagination({
                        totalPage: response.totalPage,
                        limit: response.limit,
                        offset: response.offset,
                        totalElementOfPage: response.totalElementOfPage
                    });
                    setGlobalSuccess("Update attribute value successfully");
                    setEditAttributeValue(false);
                }).catch((error) => {
                    console.error(error);
                    setGlobalError(error.message);
                }).finally(() => {
                    setLoading(false);
                })
        } else {
            AddAttributeValue(attributeId, formData)
                .then(() => {
                    return GetAttributeDetail({ id: attributeId });
                }).then((response) => {
                    updateAttributeValues(response.data);
                    updatePagination({
                        totalPage: response.totalPage,
                        limit: response.limit,
                        offset: response.offset,
                        totalElementOfPage: response.totalElementOfPage
                    });
                    setEditAttributeValue(false);
                }).catch((error) => {
                    console.error(error);
                    setGlobalError(error.message);
                }).finally(() => {
                    setLoading(false);
                })
        }
    }

    const validate1 = (): boolean => {
        let check = true;

        if (!formData.name) {
            setError(preValue => {
                return {
                    ...preValue,
                    name: "Name is required"
                }
            });
            check = false;
        }

        if (!formData.description) {
            setError(preValue => {
                return {
                    ...preValue,
                    description: "Description is required"
                }
            });
            check = false;
        }

        if (!formData.sizeCode) {
            setError(preValue => {
                return {
                    ...preValue,
                    sizeCode: "Code is required"
                }
            });
            check = false;
        }

        return check;
    }

    const validate2 = (): boolean => {
        let check = true;

        const checkName = validateVietnamese(formData.name);
        const checkDescription = validateVietnamese(formData.description);

        if (checkName !== "") {
            setError(preValue => {
                return {
                    ...preValue,
                    name: checkName
                }
            });
            check = false;
        }

        if (checkDescription !== "") {
            setError(preValue => {
                return {
                    ...preValue,
                    description: checkDescription
                }
            });
            check = false;
        }

        return check;
    }

    return (
        <OverLay className="disabled-padding">
            <div className="edit-attribute-value p-4 bg-light rounded">
                {globalError && (
                    <Alert variant="danger" onClose={() => { setGlobalError("") }} dismissible>
                        {globalError}
                    </Alert>
                )}
                {globalSuccess && (
                    <Alert variant="success" onClose={() => { setGlobalSuccess("") }} dismissible>
                        {globalSuccess}
                    </Alert>
                )}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold mb-0">
                        {`${attributeDetailId ? "Edit" : "Add"} Value`}
                    </h2>
                    <CloseButton onClick={() => hideOverlay()} />
                </div>

                <div className="border rounded shadow-sm p-4 mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="fw-semibold h6">Attribute Value Information</span>
                        {attributeDetailId && (
                            <button
                                className="btn btn-outline-secondary btn-sm"
                                disabled={editAttributeValue}
                                onClick={() => setEditAttributeValue(true)}
                            >
                                Edit
                            </button>
                        )}
                    </div>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    className="p-3"
                                    type="text"
                                    value={formData.name}
                                    name="name"
                                    onChange={handleChange}
                                    disabled={!editAttributeValue && attributeDetailId !== ""}
                                    placeholder="Enter name"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Code</Form.Label>
                                <Form.Control
                                    className="p-3"
                                    type="text"
                                    value={formData.sizeCode}
                                    name="sizeCode"
                                    onChange={handleChange}
                                    disabled={!editAttributeValue && attributeDetailId !== ""}
                                    placeholder="Enter code"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <textarea
                            className="form-control p-3"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            disabled={!editAttributeValue && attributeDetailId !== ""}
                            placeholder="Enter description"
                            rows={3}
                        />
                    </Form.Group>
                    {editAttributeValue && attributeDetailId && (
                        <div className="d-flex gap-2">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setEditAttributeValue(false)}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    if (validate1() && validate2()) {
                                        handleSubmit();
                                    }
                                }}
                                disabled={loading}
                            >
                                Save
                            </button>
                        </div>
                    )}

                    {!attributeDetailId && (
                        <Button
                            variant="primary" type="submit" className="w-100 py-3 rounded" style={{ fontWeight: 'bold', letterSpacing: '1px' }}
                            onClick={() => {
                                if (validate1() && validate2()) {
                                    handleSubmit();
                                }
                            }}
                            disabled={loading}
                        >
                            Create
                        </Button>
                    )}
                </div>
            </div>
        </OverLay>
    );
}