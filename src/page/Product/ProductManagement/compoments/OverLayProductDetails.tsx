import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Select, { MultiValue, SingleValue, StylesConfig } from "react-select";
import { OverLay } from "../../../../compoments/OverLay/OverLay";
import { Form } from "react-bootstrap";

interface OptionType {
    value: string;
    label: string;
}

interface Options {
    Category: OptionType[];
    Supplier: OptionType[];
    Color: OptionType[];
    Size: OptionType[];
    Brand: OptionType[];
    Material: OptionType[];
}

interface OverLayProductDetailsProps {
    productId: number;
    handleClose: () => void
}

interface FormDataTypes {
    productName: string;
    category: OptionType | null;
    unit: string;
    publisher: OptionType | null;
    color: OptionType | null;
    size: OptionType | null;
    brand: OptionType | null;
    material: OptionType | null;
}

export const OverLayProductDetails: React.FC<OverLayProductDetailsProps> = ({ handleClose, productId }) => {

    const [openEdit, setOpenEdit] = React.useState<boolean>(true);

    const [formData, setFormData] = React.useState<FormDataTypes>({
        productName: "",
        category: null,
        unit: "",
        publisher: null,
        color: null,
        size: null,
        brand: null,
        material: null,
    });

    const handleChangeSelect = (name: string, newValue: SingleValue<OptionType> | MultiValue<OptionType>) => {
        setFormData({ ...formData, [name]: newValue });
    }

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (openEdit) {
            setOpenEdit(false)
            return;
        }
        alert("Product is saved")
        setOpenEdit(true)
    }

    const customSelectStyles: StylesConfig<any, false> = {
        control: (base) => ({
            ...base,
            width: "100%",
            borderRadius: "4px",
            border: "1px solid #d1d1d1",
            fontSize: "14px",
        }),
    };

    const options: Options = {
        Category: [
            { value: "Electronics", label: "Electronics" },
            { value: "Clothes", label: "Clothes" },
            { value: "Furniture", label: "Furniture" },
        ],
        Supplier: [
            { value: "Supplier 1", label: "Supplier 1" },
            { value: "Supplier 2", label: "Supplier 2" },
            { value: "Supplier 3", label: "Supplier 3" },
        ],
        Color: [
            { value: "Red", label: "Red" },
            { value: "Blue", label: "Blue" },
            { value: "Green", label: "Green" },
        ],
        Size: [
            { value: "S", label: "S" },
            { value: "M", label: "M" },
            { value: "L", label: "L" },
        ],
        Brand: [
            { value: "Brand 1", label: "Brand 1" },
            { value: "Brand 2", label: "Brand 2" },
            { value: "Brand 3", label: "Brand 3" },
        ],
        Material: [
            { value: "Material 1", label: "Material 1" },
            { value: "Material 2", label: "Material 2" },
            { value: "Material 3", label: "Material 3" },
        ],
    };


    return (
        <OverLay>
            <div className="product-details-container">
                <button onClick={handleClose} className="button-close">
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <h2 className="h2 text-center fw-bold">Product Details</h2>
                <Form onClick={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Product Name"
                            disabled={openEdit}
                            onChange={handleChangeInput}
                            name="productName"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>SKU Code</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Your SKU"
                            disabled
                            onChange={handleChangeInput}
                            name="sku"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Batch Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Your Batch Number"
                            disabled
                            onChange={handleChangeInput}
                            name="batchNumber"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Category</Form.Label>
                        <Select
                            styles={customSelectStyles}
                            value={formData.category}
                            onChange={(newValue) => handleChangeSelect("category", newValue)}
                            options={options.Category}
                            isDisabled={openEdit}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Unit</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your product unit"
                            disabled={openEdit}
                            onChange={handleChangeInput}
                            name="unit"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Weight</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter your product weight"
                            disabled={openEdit}
                            onChange={handleChangeInput}
                            name="weight"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Your quantity"
                            disabled
                            onChange={handleChangeInput}
                            name="quantity"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Deminsion ( L - W - H )</Form.Label>
                        <div className="group-deminsion-attribute">
                            <Form.Control
                                type="number"
                                placeholder="Length"
                                disabled={openEdit}
                                onChange={handleChangeInput}
                                name="length"
                            />
                            <span className="deminsion-separator">x</span>
                            <Form.Control
                                type="number"
                                placeholder="Width"
                                disabled={openEdit}
                                onChange={handleChangeInput}
                                name="width"
                            />
                            <span className="deminsion-separator">x</span>
                            <Form.Control
                                type="number"
                                placeholder="Height"
                                disabled={openEdit}
                                onChange={handleChangeInput}
                                name="height"
                            />
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Pulisher</Form.Label>
                        <Select
                            styles={customSelectStyles}
                            value={formData.publisher}
                            onChange={(newValue) => handleChangeSelect("publisher", newValue)}
                            options={options.Supplier}
                            isDisabled={openEdit}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Color</Form.Label>
                        <Select
                            styles={customSelectStyles}
                            value={formData.color}
                            onChange={(newValue) => handleChangeSelect("color", newValue)}
                            options={options.Color}
                            isDisabled={openEdit}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Size</Form.Label>
                        <Select
                            styles={customSelectStyles}
                            value={formData.size}
                            onChange={(newValue) => handleChangeSelect("size", newValue)}
                            options={options.Size}
                            isDisabled={openEdit}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Material</Form.Label>
                        <Select
                            styles={customSelectStyles}
                            value={formData.material}
                            onChange={(newValue) => handleChangeSelect("material", newValue)}
                            options={options.Material}
                            isDisabled={openEdit}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Brand</Form.Label>
                        <Select
                            styles={customSelectStyles}
                            value={formData.brand}
                            onChange={(newValue) => handleChangeSelect("brand", newValue)}
                            options={options.Brand}
                            isDisabled={openEdit}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Supplier</Form.Label>
                        <Select
                            styles={customSelectStyles}
                            value={formData.color}
                            onChange={(newValue) => handleChangeSelect("supplier", newValue)}
                            options={options.Supplier}
                            isDisabled={openEdit}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="submit" value={openEdit ? "Edit" : "Save"} className="btn btn-primary" />
                    </Form.Group>
                </Form>
            </div>
        </OverLay>
    )
}