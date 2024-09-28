import React from "react";
import { OverLay } from "../../../../compoments/OverLay/OverLay";
import { Alert, Col, Container, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select';
import GetSizesByName from "../../../../services/size/GetSizesByName";
import GetColorsByName from "../../../../services/color/GetColorsByName";
import GetBrandsByName from "../../../../services/brand/GetBrandsByName";
import GetMaterialsByName from "../../../../services/material/GetMaterialsByName";
import GetCategoriesByName from "../../../../services/category/GetCategoriesByName";
import GetSuppliersByName from "../../../../services/supplier/GetSuppliersByName";
import CreateProductHeader from "../../../../services/product/CreateProductHeader";
import ProductHeader from "../../../../interface/ProductHeader";
import ProductDetail from "../../../../interface/ProductDetail";
import CreateProductDetail from "../../../../services/product/CreateProductDetail";

interface FormEditProductProps {
    handleClose: () => void;
    productId?: string;
}

interface OptionType {
    value: string;
    label: string;
}

interface FormDataType {
    name: string;
    description: string;
    unit: string;
    weight: string;
    productCode: string;
    length: string;
    width: string;
    height: string;
    color: OptionType | null;
    branch: OptionType | null;
    model: OptionType | null;
    size: OptionType | null;
    category: OptionType | null;
    supplier: OptionType | null;
}

const Utils: string[] = ["kg", "g", "l", "ml", "unit", "box", "carton"];

const FormEditProduct: React.FC<FormEditProductProps> = ({ productId, handleClose }) => {

    const [globalError, setGlobalError] = React.useState<string>("");
    const [globalSuccess, setGlobalSuccess] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);

    const [color, setColor] = React.useState<string>("");
    const [branch, setBranch] = React.useState<string>("");
    const [model, setModel] = React.useState<string>("");
    const [size, setSize] = React.useState<string>("");
    const [category, setCategory] = React.useState<string>("");
    const [supplier, setSupplier] = React.useState<string>("");

    const [colors, setColors] = React.useState<OptionType[]>([]);
    const [branches, setBranches] = React.useState<OptionType[]>([]);
    const [models, setModels] = React.useState<OptionType[]>([]);
    const [sizes, setSizes] = React.useState<OptionType[]>([]);
    const [categories, setCategories] = React.useState<OptionType[]>([]);
    const [suppliers, setSuppliers] = React.useState<OptionType[]>([]);

    const [formData, setFormData] = React.useState<FormDataType>({
        name: "",
        description: "",
        unit: "",
        weight: "",
        productCode: "",
        length: "",
        width: "",
        height: "",
        color: null,
        branch: null,
        model: null,
        size: null,
        category: null,
        supplier: null,
    })

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    // React.useEffect(() => {
    //     if (productId) {
    //         GetProductById(productId)
    //             .then((data) => {
    //                 setFormData({
    //                     name: data.name,
    //                     description: data.description,
    //                     unit: data.unit,
    //                     weight: data.weight.toString(),
    //                     productCode: data.productCode,
    //                     length: data.dimension.split("x")[0],
    //                     width: data.dimension.split("x")[1],
    //                     height: data.dimension.split("x")[2],
    //                     color: { value: data.color.id, label: data.color.name },
    //                     branch: { value: data.brand.id, label: data.brand.name },
    //                     model: { value: data.material.id, label: data.material.name },
    //                     size: { value: data.size.id, label: data.size.name },
    //                     category: { value: data.category.id, label: data.category.name },
    //                     supplier: { value: data.supplier.id, label: data.supplier.name },
    //                 })
    //             })
    //             .catch((error) => {
    //                 setGlobalError(error.message);
    //             })
    //     }
    // }, [productId]);

    React.useEffect(() => {
        const id = setTimeout(() => {
            GetColorsByName(color)
                .then((data) => {
                    setColors(data.map((size) => ({ value: size.id, label: size.name })));
                })
                .catch((error) => {
                    setGlobalError(error.message);
                });
        }, 1000);

        return () => clearTimeout(id);
    }, [color]);

    React.useEffect(() => {
        const id = setTimeout(() => {
            GetBrandsByName(branch)
                .then((data) => {
                    setBranches(data.map((size) => ({ value: size.id, label: size.name })));
                })
                .catch((error) => {
                    setGlobalError(error.message);
                });
        }, 1000);

        return () => clearTimeout(id);
    }, [branch]);

    React.useEffect(() => {
        const id = setTimeout(() => {
            GetMaterialsByName(model)
                .then((data) => {
                    setModels(data.map((size) => ({ value: size.id, label: size.name })));
                })
                .catch((error) => {
                    setGlobalError(error.message);
                });
        }, 1000);

        return () => clearTimeout(id);
    }, [model]);

    React.useEffect(() => {
        const id = setTimeout(() => {
            GetSizesByName(size)
                .then((data) => {
                    setSizes(data.map((size) => ({ value: size.id, label: size.name })));
                })
                .catch((error) => {
                    setGlobalError(error.message);
                });
        }, 1000);

        return () => clearTimeout(id);
    }, [size]);

    React.useEffect(() => {
        const id = setTimeout(() => {
            GetCategoriesByName(category)
                .then((data) => {
                    setCategories(data.map((size) => ({ value: size.id, label: size.name })));
                })
                .catch((error) => {
                    setGlobalError(error.message);
                });
        }, 1000);

        return () => clearTimeout(id);
    }, [category]);

    React.useEffect(() => {
        const id = setTimeout(() => {
            GetSuppliersByName(supplier)
                .then((data) => {
                    setSuppliers(data.map((size) => ({ value: size.id, label: size.name })));
                })
                .catch((error) => {
                    setGlobalError(error.message);
                });
        }, 1000);

        return () => clearTimeout(id);
    }, [supplier]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const dataHeader: ProductHeader = {
            name: formData.name,
            unit: formData.unit,
            categoryId: formData.category!.value,
            description: formData.description,
            productCode: formData.productCode,
        }
        const dataDetail: ProductDetail = {
            supplierId: formData.supplier!.value,
            colorId: formData.color!.value,
            sizeId: formData.size!.value,
            materialId: formData.model!.value,
            brandId: formData.branch!.value,
            dimension: `${formData.length}x${formData.width}x${formData.height}`,
            weight: Number(formData.weight),
            description: formData.description,
        }

        setLoading(true);
        CreateProductHeader(dataHeader)
            .then((data) => {
                return CreateProductDetail(data.id, dataDetail);
            })
            .then(() => {
                setGlobalSuccess("Create product success");
                setTimeout(() => {
                    handleClose();
                }, 1000);
            })
            .catch((error) => {
                setGlobalError(error.message);
            })
            .finally(() => {
                setLoading(false);
            })
    }

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
                <Form onSubmit={handleSubmit}>
                    <Row className="p-4">
                        <Col md={6} className="p-3">
                            <h5 className="fw-semibold border-bottom pb-2 mb-3">Product Details</h5>
                            <Form.Group className="mb-3">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter product name"
                                    className="py-3"
                                    name="name"
                                    onChange={handleChangeInput}
                                    required
                                    value={formData.name}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <div className="d-flex flex-column">
                                    <Form.Label>Description</Form.Label>
                                    <textarea
                                        className="form-control py-3"
                                        placeholder="Enter description"
                                        cols={3}
                                        name="description"
                                        onChange={handleChangeInput}
                                        required
                                        value={formData.description}
                                    />
                                </div>
                            </Form.Group>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Unit</Form.Label>
                                        <Form.Select
                                            className="py-3"
                                            name="unit"
                                            onChange={handleChangeInput}
                                            required
                                            value={formData.unit}
                                        >
                                            <option value={""} >Select unit...</option>
                                            {Utils.map((unit) => (
                                                <option key={unit} value={unit}>{unit}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Weight</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter weight"
                                            className="py-3"
                                            name="weight"
                                            onChange={handleChangeInput}
                                            value={formData.weight}
                                            required
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
                                    name="productCode"
                                    onChange={handleChangeInput}
                                    required
                                    value={formData.productCode}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Demension</Form.Label>
                                <div className="d-flex flex-row gap-3 align-items-center">
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter Lenght"
                                        className="py-3"
                                        name="length"
                                        onChange={handleChangeInput}
                                        value={formData.length}
                                        required
                                    />
                                    <span>X</span>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter Width"
                                        className="py-3"
                                        name="width"
                                        onChange={handleChangeInput}
                                        value={formData.width}
                                        required
                                    />
                                    <span>X</span>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter Height"
                                        className="py-3"
                                        name="height"
                                        onChange={handleChangeInput}
                                        value={formData.height}
                                        required
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
                                        <Select
                                            placeholder="Enter name color"
                                            isClearable
                                            styles={{
                                                control: (provided) => ({
                                                    ...provided,
                                                    padding: "0.5rem 0px",
                                                }),
                                            }}
                                            onInputChange={setColor}
                                            value={formData.color}
                                            onChange={(value) => setFormData({ ...formData, color: value })}
                                            options={colors}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Model</Form.Label>
                                        <Select
                                            placeholder="Enter name model"
                                            isClearable
                                            styles={{
                                                control: (provided) => ({
                                                    ...provided,
                                                    padding: "0.5rem 0px",
                                                }),
                                            }}
                                            onInputChange={setModel}
                                            value={formData.model}
                                            onChange={(value) => setFormData({ ...formData, model: value })}
                                            options={models}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Branch</Form.Label>
                                        <Select
                                            placeholder="Enter name branch"
                                            isClearable
                                            styles={{
                                                control: (provided) => ({
                                                    ...provided,
                                                    padding: "0.5rem 0px",
                                                }),
                                            }}
                                            onInputChange={setBranch}
                                            value={formData.branch}
                                            onChange={(value) => setFormData({ ...formData, branch: value })}
                                            options={branches}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Size</Form.Label>
                                        <Select
                                            placeholder="Enter name size"
                                            isClearable
                                            styles={{
                                                control: (provided) => ({
                                                    ...provided,
                                                    padding: "0.5rem 0px",
                                                }),
                                            }}
                                            onInputChange={setSize}
                                            value={formData.size}
                                            onChange={(value) => setFormData({ ...formData, size: value })}
                                            options={sizes}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="p-3">
                                <h5 className="fw-semibold border-bottom pb-2 mb-3">Classification And Supplier</h5>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Category</Form.Label>
                                        <Select
                                            placeholder="Enter name category"
                                            isClearable
                                            styles={{
                                                control: (provided) => ({
                                                    ...provided,
                                                    padding: "0.5rem 0px",
                                                }),
                                            }}
                                            onInputChange={setCategory}
                                            value={formData.category}
                                            onChange={(value) => setFormData({ ...formData, category: value })}
                                            options={categories}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Supplier</Form.Label>
                                        <Select
                                            placeholder="Enter name supplier"
                                            isClearable
                                            styles={{
                                                control: (provided) => ({
                                                    ...provided,
                                                    padding: "0.5rem 0px",
                                                }),
                                            }}
                                            onInputChange={setSupplier}
                                            value={formData.supplier}
                                            onChange={(value) => setFormData({ ...formData, supplier: value })}
                                            options={suppliers}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Form.Control
                                    type="submit"
                                    className="btn btn-primary fw-bold py-3"
                                    value={loading ? "Loading..." : "Create"}
                                />
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Container >
        </OverLay >
    )
}

export default FormEditProduct;