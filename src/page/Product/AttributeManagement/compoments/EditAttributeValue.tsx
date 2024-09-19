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
    const [loading, setLoading] = React.useState(false);
    const [globalError, setGlobalError] = React.useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
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

    return (
        <OverLay>
            <div className="edit-attribute-value">
                <button onClick={hideOverlay} className="button-close">
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <h1 className={"h2 text-center fw-bold"}>{`${attributeDetailId ? "Edit" : "Add"} Value`}</h1>
                <span className="primary-message-error text-center">{globalError}</span>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className={"form-lable"}>Value Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Value name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
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