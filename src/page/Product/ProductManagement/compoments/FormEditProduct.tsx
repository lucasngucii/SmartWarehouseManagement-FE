import React from "react";
import { OverLay } from "../../../../compoments/OverLay/OverLay";
import { Alert, Col, Container, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Color } from "../../../../interface/Color";
import { Brand } from "../../../../interface/Brand";
import { Material } from "../../../../interface/Material";
import { Size } from "../../../../interface/Size";
import Supplier from "../../../../interface/Supplier";
import AttributeDetailType from "../../../../interface/AttributeDetail";

interface FormEditProductProps {
    handleClose: () => void;
}

const FormEditProduct: React.FC<FormEditProductProps> = ({ handleClose }) => {

    const [globalError, setGlobalError] = React.useState<string>("");
    const [globalSuccess, setGlobalSuccess] = React.useState<string>("");
    const [colors, setColors] = React.useState<AttributeDetailType[]>([]);
    const [branchs, setBranchs] = React.useState<AttributeDetailType[]>([]);
    const [models, setModels] = React.useState<AttributeDetailType[]>([]);
    const [sizes, setSizes] = React.useState<AttributeDetailType[]>([]);
    const [suppliers, setSuppliers] = React.useState<AttributeDetailType[]>([]);
    const [categories, setCategories] = React.useState<AttributeDetailType[]>([]);

    React.useEffect(() => {
        Promise.all([])

    }, []);

    return (
        <OverLay className="disabled-padding">
            <Container fluid className="bg-light h-100 w-100 p-4" >
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex flex-row align-items-center gap-2">
                        <button
                            onClick={() => handleClose()}
                            className="btn fs-3 px-3 text-primary"
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <h2 className="fw-bold mb-0">{"New Product"}</h2>
                    </div>
                    {globalError && <Alert onClose={() => setGlobalError("")} variant="danger" dismissible>{globalError}</Alert>}
                    {globalSuccess && <Alert onClose={() => setGlobalSuccess("")} variant="success" dismissible>{globalSuccess}</Alert>}
                </div>
                <Row className="p-4">
                    <Col md={6} className="p-3">
                        <h5 className="fw-semibold border-bottom pb-2 mb-3">Product Details</h5>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product name"
                                className="py-3"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <div className="d-flex flex-column">
                                <Form.Label>Description</Form.Label>
                                <textarea
                                    className="form-control py-3"
                                    placeholder="Enter description"
                                    cols={3}
                                />
                            </div>
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Unit</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Unit"
                                        className="py-3"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Weight</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter weight"
                                        className="py-3"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product code"
                                className="py-3"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Demension</Form.Label>
                            <div className="d-flex flex-row gap-3 align-items-center">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Lenght"
                                    className="py-3"
                                />
                                <span>X</span>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Width"
                                    className="py-3"
                                />
                                <span>X</span>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Height"
                                    className="py-3"
                                />
                            </div>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Row className="p-3">
                            <h5 className="fw-semibold border-bottom pb-2 mb-3">Product Attributes</h5>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Color</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter category"
                                        className="py-3"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Model</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter category"
                                        className="py-3"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Branch</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter supplier"
                                        className="py-3"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Size</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter supplier"
                                        className="py-3"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="p-3">
                            <h5 className="fw-semibold border-bottom pb-2 mb-3">Classification And Supplier</h5>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter category"
                                        className="py-3"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Supplier</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter supplier"
                                        className="py-3"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container >
        </OverLay >
    )
}

export default FormEditProduct;