import React from "react";
import { OverLay } from "../../../compoments/OverLay/OverLay";
import { Button, CloseButton, Col, Container, Form, Image, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faImage, faImages } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select';
import GetSizesByName from "../../../services/Attribute/Size/GetSizesByName";
import GetColorsByName from "../../../services/Attribute/Color/GetColorsByName";
import GetBrandsByName from "../../../services/Attribute/Brand/GetBrandsByName";
import GetMaterialsByName from "../../../services/Attribute/Material/GetMaterialsByName";
import GetCategoriesByName from "../../../services/Attribute/Category/GetCategoriesByName";
import GetSuppliersByName from "../../../services/Supplier/GetSuppliersByName";
import DataTypeCreateProductAdmin from "../../../interface/PageProduct/FormEdit/DataTypeCreateProductAdmin";
import CreateProduct from "../../../services/Product/CreateProduct";
import {useDispatchMessage} from "../../../Context/ContextMessage";
import ActionTypeEnum from "../../../enum/ActionTypeEnum";

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

    const dispatch = useDispatchMessage();
    const uploadRef = React.useRef<HTMLInputElement>(null);
    const [loading, setLoading] = React.useState<boolean>(false);

    const [color, setColor] = React.useState<string>("");
    const [branch, setBranch] = React.useState<string>("");
    const [model, setModel] = React.useState<string>("");
    const [size, setSize] = React.useState<string>("");
    const [category, setCategory] = React.useState<string>("");
    const [supplier, setSupplier] = React.useState<string>("");
    const [images, setImages] = React.useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);

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

    React.useEffect(() => {
        const id = setTimeout(() => {
            GetColorsByName(color)
                .then((data) => {
                    setColors(data.map((size) => ({ value: size.id, label: size.name })));
                })
                .catch((error) => {
                    dispatch({type: ActionTypeEnum.ERROR, message: error.message});
                });
        }, 1000);
        return () => clearTimeout(id);
    }, [color, dispatch]);

    React.useEffect(() => {
        const id = setTimeout(() => {
            GetBrandsByName(branch)
                .then((data) => {
                    setBranches(data.map((size) => ({ value: size.id, label: size.name })));
                })
                .catch((error) => {
                    dispatch({type: ActionTypeEnum.ERROR, message: error.message});
                });
        }, 1000);
        return () => clearTimeout(id);
    }, [branch, dispatch]);

    React.useEffect(() => {
        const id = setTimeout(() => {
            GetMaterialsByName(model)
                .then((data) => {
                    setModels(data.map((size) => ({ value: size.id, label: size.name })));
                })
                .catch((error) => {
                    dispatch({type: ActionTypeEnum.ERROR, message: error.message});
                });
        }, 1000);
        return () => clearTimeout(id);
    }, [model, dispatch]);

    React.useEffect(() => {
        const id = setTimeout(() => {
            GetSizesByName(size)
                .then((data) => {
                    setSizes(data.map((size) => ({ value: size.id, label: size.name })));
                })
                .catch((error) => {
                    dispatch({type: ActionTypeEnum.ERROR, message: error.message});
                });
        }, 1000);
        return () => clearTimeout(id);
    }, [size, dispatch]);

    React.useEffect(() => {
        const id = setTimeout(() => {
            GetCategoriesByName(category)
                .then((data) => {
                    setCategories(data.map((size) => ({ value: size.id, label: size.name })));
                })
                .catch((error) => {
                    dispatch({type: ActionTypeEnum.ERROR, message: error.message});
                });
        }, 1000);
        return () => clearTimeout(id);
    }, [category, dispatch]);

    React.useEffect(() => {
        const id = setTimeout(() => {
            GetSuppliersByName(supplier)
                .then((data) => {
                    setSuppliers(data.map((size) => ({ value: size.id, label: size.name })));
                })
                .catch((error) => {
                    dispatch({type: ActionTypeEnum.ERROR, message: error.message});
                });
        }, 1000);
        return () => clearTimeout(id);
    }, [supplier, dispatch]);

    const formartData = (): DataTypeCreateProductAdmin => {
        return {
            name: formData.name,
            unit: formData.unit,
            categoryId: formData.category!.value,
            description: formData.description,
            productCode: formData.productCode,
            supplierId: formData.supplier!.value,
            colorId: formData.color!.value,
            sizeId: formData.size!.value,
            materialId: formData.model!.value,
            brandId: formData.branch!.value,
            dimension: `${formData.length}x${formData.width}x${formData.height}`,
            weight: Number(formData.weight),
            image: images,
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        CreateProduct(formartData())
            .then(() => {
                dispatch({type: ActionTypeEnum.SUCCESS, message: "Create product success"});
                setTimeout(() => {
                    handleClose();
                }, 1000);
            })
            .catch((error) => {
                dispatch({type: ActionTypeEnum.ERROR, message: error.message});
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files: FileList | null = e.target.files;
        if (files !== null) {
            const listFiles: File[] = [];
            for (let i = 0; i < files.length; i++) {
                listFiles.push(files[i]);
                imagePreviews.push(URL.createObjectURL(files[i]));
            }
            setImages(listFiles);
        }
    }

    const handleRemoveImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        const newPreviews = imagePreviews.filter((_, i) => i !== index);
        setImages(newImages);
        setImagePreviews(newPreviews);
    }

    return (
        <OverLay className="disabled-padding bg-light p-4">
            <Container fluid className="h-100 w-100 position-relative shadow p-3 rounded">
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
                </div>
                <Form onSubmit={handleSubmit}>
                    <Row className="px-4">
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
                                    disabled={loading}
                                />
                            </Row>
                        </Col>
                    </Row>
                    <Row className="p-3">
                        <div className="border-bottom pb-2 mb-3 d-flex justify-content-between">
                            <h5 className="fw-semibold d-flex align-items-center">
                                <FontAwesomeIcon icon={faImages} className="me-2" />
                                Images
                            </h5>
                            <Button
                                variant="outline-primary"
                                className="fw-semibold"
                                onClick={() => { uploadRef.current?.click() }}
                            >+ Add Images</Button>
                        </div>
                        <Form.Group className="mb-3">
                            <Form.Control
                                ref={uploadRef}
                                type="file"
                                placeholder="Enter name supplier"
                                className="py-3 d-none"
                                multiple
                                onChange={handleChangeFile}
                            />
                        </Form.Group>
                        <div className="d-flex flex-row flex-wrap gap-3 justify-content-center">
                            {imagePreviews.map((image, index) => (
                                <div className="position-relative">
                                    <Image
                                        key={index}
                                        src={image}
                                        alt="preview"
                                        thumbnail
                                        style={{ width: "250px", height: "auto" }}
                                    />
                                    <CloseButton
                                        className="position-absolute bg-light"
                                        onClick={() => { handleRemoveImage(index) }}
                                        style={{ top: "0.5rem", right: "0.5rem" }}
                                    />
                                </div>
                            ))}
                            {
                                imagePreviews.length === 0 &&
                                <div className="d-flex flex-column align-items-center justify-content-center gap-2 text-secondary">
                                    <FontAwesomeIcon icon={faImage} size="3x" />
                                    <span>No images</span>
                                </div>
                            }
                        </div>
                    </Row>
                </Form>
            </Container >
        </OverLay >
    )
}

export default FormEditProduct;