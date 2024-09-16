import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Select, { MultiValue, SingleValue } from "react-select";
import {OverLay} from "../../../../compoments/OverLay/OverLay";

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

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (openEdit) {
            setOpenEdit(false)
            return;
        }
        alert("Product is saved")
        setOpenEdit(true)
    }

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
                <h2 className="primary-label form-lable">Product Details</h2>
                <form className="form">
                    <div className="form-input-container">
                        <label className="form-input-lable">Product Name</label>
                        <input onChange={handleChangeInput} name="productName" className="form-input" type="text" placeholder="Enter Product Name" disabled={openEdit} />
                    </div>
                    <div className="form-input-container">
                        <label className="form-input-lable">SKU Code</label>
                        <input onChange={handleChangeInput} name="sku" className="form-input" type="text" placeholder="Your SKU" disabled />
                    </div>
                    <div className="form-input-container">
                        <label className="form-input-lable">Batch Number</label>
                        <input onChange={handleChangeInput} name="batchNumber" className="form-input" type="text" placeholder="Your Batch Number" disabled />
                    </div>
                    <div className="form-input-container">
                        <label className="form-input-lable">Category</label>
                        <Select
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    width: "100%",
                                    height: "45px",
                                    borderRadius: "4px",
                                    border: "1px solid #d1d1d1",
                                    fontSize: "14px",
                                }),
                            }}
                            value={formData.category}
                            onChange={(newValue) => handleChangeSelect("category", newValue)}
                            options={options.Category}
                            isDisabled={openEdit}
                        />
                    </div>
                    <div className="form-input-container">
                        <label className="form-input-lable">Unit</label>
                        <input onChange={handleChangeInput} name="unit" className="form-input" type="text" placeholder="Enter your product unit" disabled={openEdit} />
                    </div>
                    <div className="form-input-container">
                        <label className="form-input-lable">Weight</label>
                        <input onChange={handleChangeInput} name="weight" className="form-input" type="number" placeholder="Enter your product weight" disabled={openEdit} />
                    </div>
                    <div className="form-input-container">
                        <label className="form-input-lable">Quantity</label>
                        <input onChange={handleChangeInput} name="quantity" className="form-input" type="number" placeholder="Your quantity" disabled />
                    </div>
                    <div className="form-input-container">
                        <label className="form-input-lable">Deminsion ( L - W - H )</label>
                        <div className="group-deminsion-attribute">
                            <input onChange={handleChangeInput} name="length" className="form-input" type="number" placeholder="Length" disabled={openEdit} />
                            <span className="deminsion-separator">x</span>
                            <input onChange={handleChangeInput} name="width" className="form-input" type="number" placeholder="Width" disabled={openEdit} />
                            <span className="deminsion-separator">x</span>
                            <input onChange={handleChangeInput} name="height" className="form-input" type="number" placeholder="Height" disabled={openEdit} />
                        </div>
                    </div>
                    <div className="form-input-container">
                        <label className="form-input-lable">Pulisher</label>
                        <Select
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    width: "100%",
                                    height: "45px",
                                    borderRadius: "4px",
                                    border: "1px solid #d1d1d1",
                                    fontSize: "14px",
                                }),
                            }}
                            value={formData.publisher}
                            onChange={(newValue) => handleChangeSelect("publisher", newValue)}
                            options={options.Supplier}
                            isDisabled={openEdit}
                        />
                    </div>
                    <div className="form-input-container">
                        <label className="form-input-lable">Color</label>
                        <Select
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    width: "100%",
                                    height: "45px",
                                    borderRadius: "4px",
                                    border: "1px solid #d1d1d1",
                                    fontSize: "14px",
                                }),
                            }}
                            value={formData.color}
                            onChange={(newValue) => handleChangeSelect("color", newValue)}
                            options={options.Color}
                            isDisabled={openEdit}
                        />
                    </div>
                    <div className="form-input-container">
                        <label className="form-input-lable">Size</label>
                        <Select
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    width: "100%",
                                    height: "45px",
                                    borderRadius: "4px",
                                    border: "1px solid #d1d1d1",
                                    fontSize: "14px",
                                }),
                            }}
                            value={formData.size}
                            onChange={(newValue) => handleChangeSelect("size", newValue)}
                            options={options.Size}
                            isDisabled={openEdit}
                        />
                    </div>
                    <div className="form-input-container">
                        <label className="form-input-lable">Material</label>
                        <Select
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    width: "100%",
                                    height: "45px",
                                    borderRadius: "4px",
                                    border: "1px solid #d1d1d1",
                                    fontSize: "14px",
                                }),
                            }}
                            value={formData.material}
                            onChange={(newValue) => handleChangeSelect("material", newValue)}
                            options={options.Material}
                            isDisabled={openEdit}
                        />
                    </div>
                    <div className="form-input-container">
                        <label className="form-input-lable">Brand</label>
                        <Select
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    width: "100%",
                                    height: "45px",
                                    borderRadius: "4px",
                                    border: "1px solid #d1d1d1",
                                    fontSize: "14px",
                                }),
                            }}
                            value={formData.brand}
                            onChange={(newValue) => handleChangeSelect("brand", newValue)}
                            options={options.Brand}
                            isDisabled={openEdit}
                        />
                    </div>
                    <button onClick={handleSubmit} type="submit" className="form-input-submit">{openEdit ? "Edit" : "Save"}</button>
                </form>
            </div>
        </OverLay>
    )
}