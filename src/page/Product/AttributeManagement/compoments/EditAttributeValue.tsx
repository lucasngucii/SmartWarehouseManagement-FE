import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { OverLay } from "../../../../compoments/OverLay/OverLay";
import React from "react";
import AddAttributeValue from "../../../../services/attribute/AddAttributeValue";
import Attribute from "../../../../interface/Attribute";
import GetAttributeDetail from "../../../../services/attribute/GetAttributeDetail";
import PaginationType from "../../../../interface/Pagination";
import AttributeDetailType from "../../../../interface/AttributeDetail";
import { Form } from "react-bootstrap";
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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
                    hideOverlay();
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
                    hideOverlay();
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
        <OverLay>
            <div className="edit-attribute-value">
                <button onClick={hideOverlay} className="button-close">
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <h1 className={"h2 text-center fw-bold"}>{`${attributeDetailId ? "Edit" : "Add"} Value`}</h1>
                <p className="text-center text-danger">{globalError}</p>
                <Form onSubmit={(event) => {
                    event.preventDefault();
                    if (validate1() && validate2()) {
                        // handleSubmit(event);
                    }
                }}>
                    <Form.Group className="mb-3">
                        <Form.Label className={"form-lable"}>Value Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Value name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <Form.Text className="text-danger">{error.name}</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className={"form-lable"}>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                        <Form.Text className="text-danger">{error.description}</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className={"form-lable"}>Code</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your code"
                            name="sizeCode"
                            value={formData.sizeCode}
                            onChange={handleChange}
                        />
                        <Form.Text className="text-danger">{error.sizeCode}</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="submit"
                            value={loading ? "Loading..." : (attributeDetailId ? "Update" : "Save")}
                            disabled={loading}
                            className="btn btn-primary"
                        />
                    </Form.Group>
                </Form>
            </div>
        </OverLay>
    );
}