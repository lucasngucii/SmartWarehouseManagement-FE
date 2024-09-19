import Select, { ActionMeta, MultiValue, SingleValue, StylesConfig } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "../ProductManagement.css";
import { OverLay } from "../../../../compoments/OverLay/OverLay";
import { Form } from "react-bootstrap";

interface OptionType {
    value: string;
    label: string;
}

interface SKUFormData {
    productName?: string;
    productType?: OptionType | null;
    color?: OptionType | null;
    size?: OptionType | null;
    material?: OptionType | null;
    brand?: OptionType | null;
    supplier?: OptionType | null;
    dimension?: Dimension;
}

interface Dimension {
    length: number;
    width: number;
    height: number;
}

interface OverLayProductManagementProps {
    handleClose: () => void;
}

export const OverLayProductManagement: React.FC<OverLayProductManagementProps> = ({ handleClose }) => {

    const listOptions = {
        categories: [
            { value: "Category 1", label: "Category 1" },
            { value: "Category 2", label: "Category 2" },
            { value: "Category 3", label: "Category 3" },
        ],
        color: [
            { value: "Black", label: "Black" },
            { value: "Red", label: "Red" },
            { value: "Blue", label: "Blue" },
        ],
        supplier: [
            { value: "Supplier 1", label: "Supplier 1" },
            { value: "Supplier 2", label: "Supplier 2" },
            { value: "Supplier 3", label: "Supplier 3" },
        ],
        brand: [
            { value: "Brand 1", label: "Brand 1" },
            { value: "Brand 2", label: "Brand 2" },
            { value: "Brand 3", label: "Brand 3" },
        ],
        material: [
            { value: "Material 1", label: "Material 1" },
            { value: "Material 2", label: "Material 2" },
            { value: "Material 3", label: "Material 3" },
        ],
        size: [
            { value: "Size 1", label: "Size 1" },
            { value: "Size 2", label: "Size 2" },
            { value: "Size 3", label: "Size 3" },
        ],
    }
    const [formData, setFormData] = React.useState<SKUFormData>();
    const handleSelectChangeGroup = (newValue: SingleValue<OptionType> | MultiValue<OptionType>, actionMeta: ActionMeta<OptionType>) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [actionMeta.name as string]: newValue
        }));
    };
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value
        }));
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
    return (
        <OverLay>
            <div className='modal-product-detail'>
                <button onClick={handleClose} className="button-close">
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <p className='h2 fw-bold text-center'>NEW PRODUCT</p>
                <Form>
                    <Form.Group className='mb-3'>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter product name'
                            value={formData?.productName}
                            name='productName'
                            onChange={handleChangeInput}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Category</Form.Label>
                        <Select
                            styles={customSelectStyles}
                            value={formData?.productType}
                            onChange={(valueSelect, actionMeta) => handleSelectChangeGroup(valueSelect, {
                                ...actionMeta,
                                name: "productType"
                            })}
                            options={listOptions.categories}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Color</Form.Label>
                        <Select
                            styles={customSelectStyles}
                            value={formData?.color}
                            onChange={(valueSelect, actionMeta) => handleSelectChangeGroup(valueSelect, {
                                ...actionMeta,
                                name: "color"
                            })}
                            options={listOptions.color}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Size</Form.Label>
                        <Select
                            styles={customSelectStyles}
                            value={formData?.size}
                            onChange={(valueSelect, actionMeta) => handleSelectChangeGroup(valueSelect, {
                                ...actionMeta,
                                name: "size"
                            })}
                            options={listOptions.size}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Material</Form.Label>
                        <Select
                            styles={customSelectStyles}
                            value={formData?.material}
                            onChange={(valueSelect, actionMeta) => handleSelectChangeGroup(valueSelect, {
                                ...actionMeta,
                                name: "material"
                            })}
                            options={listOptions.material}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Brand</Form.Label>
                        <Select
                            styles={customSelectStyles}
                            value={formData?.brand}
                            onChange={(valueSelect, actionMeta) => handleSelectChangeGroup(valueSelect, {
                                ...actionMeta,
                                name: "brand"
                            })}
                            options={listOptions.brand}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Supplier</Form.Label>
                        <Select
                            styles={customSelectStyles}
                            value={formData?.color}
                            onChange={(valueSelect, actionMeta) => handleSelectChangeGroup(valueSelect, {
                                ...actionMeta,
                                name: "supplier"
                            })}
                            options={listOptions.supplier}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Supplier</Form.Label>
                        <div className={"group-deminsion-attribute"}>
                            <Form.Control type="number" placeholder="Length" className="form-input" />
                            <span>x</span>
                            <Form.Control type="number" placeholder="Width" className="form-input" />
                            <span>x</span>
                            <Form.Control type="number" placeholder="Height" className="form-input" />
                        </div>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Control type="submit" value={"Add Product"} className="btn btn-primary" />
                    </Form.Group>
                </Form>
            </div>
        </OverLay>
    )
}