import React from "react";
import "./SKU.css";
import {OverLay} from "../../OverLay/OverLay";
import Select, {ActionMeta, MultiValue, SingleValue} from "react-select";

interface OptionType {
    value: string;
    label: string;
}

interface SKUFormProps {
    closeShowOverlay: () => void;
    SKUId: number | null;
}

interface SKUFormData {
    productType?: OptionType | null;
    color?: OptionType | null;
    size?: OptionType | null;
    material?: OptionType | null;
    brand?: OptionType | null;
    dimension?: Dimension;
}

interface ListSKu {
    skuCode: string;
    productType: string;
    color: string;
    size: string;
    material: string;
    brand: string;
    dimension: string;
}

interface Dimension {
    length: number;
    width: number;
    height: number;
}

const SKUForm: React.FC<SKUFormProps> = ({closeShowOverlay, SKUId}) => {

    const listOptions = {
        productType: [
            {value: "Electronics", label: "Electronics"},
            {value: "Clothing", label: "Clothing"},
            {value: "Furniture", label: "Furniture"},
        ],
        color: [
            {value: "Black", label: "Black"},
            {value: "Red", label: "Red"},
            {value: "Blue", label: "Blue"},
        ],
        size: [
            {value: "Large", label: "Large"},
            {value: "Medium", label: "Medium"},
            {value: "Small", label: "Small"},
        ],
        material: [
            {value: "Plastic", label: "Plastic"},
            {value: "Cotton", label: "Cotton"},
            {value: "Wood", label: "Wood"},
        ],
        brand: [
            {value: "BrandA", label: "BrandA"},
            {value: "BrandB", label: "BrandB"},
            {value: "BrandC", label: "BrandC"},
        ],
    }
    const [formData, setFormData] = React.useState<SKUFormData>();
    const handleSelectChangeGroup = (newValue: SingleValue<OptionType> | MultiValue<OptionType>, actionMeta: ActionMeta<OptionType>) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [actionMeta.name as string]: newValue
        }));
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("SKU Data Submitted:", formData);
    }

    return (
        <OverLay>
            <div className={"container-sku-form"}>
                <button onClick={closeShowOverlay} className="button-close">
                    <i className="fas fa-times"></i>
                </button>
                <h1 className={"primary-label form-lable"}>{SKUId ? "Update SKU" : "New SKU"}</h1>
                <form onSubmit={handleSubmit} className="form">
                    <div className={"form-input-container"}>
                        <label htmlFor={"productType"}>Product Type:</label>
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
                            value={formData?.productType}
                            onChange={(valueSelect, actionMeta) => handleSelectChangeGroup(valueSelect, {
                                ...actionMeta,
                                name: "productType"
                            })}
                            options={listOptions.productType}
                        />
                    </div>
                    <div className={"form-input-container"}>
                        <label htmlFor={"color"}>Color:</label>
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
                            value={formData?.color}
                            onChange={(valueSelect, actionMeta) => handleSelectChangeGroup(valueSelect, {
                                ...actionMeta,
                                name: "color"
                            })}
                            options={listOptions.color}
                        />
                    </div>
                    <div className={"form-input-container"}>
                        <label htmlFor={"color"}>Size:</label>
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
                            value={formData?.size}
                            onChange={(valueSelect, actionMeta) => handleSelectChangeGroup(valueSelect, {
                                ...actionMeta,
                                name: "size"
                            })}
                            options={listOptions.size}
                        />
                    </div>
                    <div className={"form-input-container"}>
                        <label htmlFor={"color"}>Material:</label>
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
                            value={formData?.material}
                            onChange={(valueSelect, actionMeta) => handleSelectChangeGroup(valueSelect, {
                                ...actionMeta,
                                name: "material"
                            })}
                            options={listOptions.material}
                        />
                    </div>
                    <div className={"form-input-container"}>
                        <label htmlFor={"color"}>Brand:</label>
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
                            value={formData?.brand}
                            onChange={(valueSelect, actionMeta) => handleSelectChangeGroup(valueSelect, {
                                ...actionMeta,
                                name: "brand"
                            })}
                            options={listOptions.brand}
                        />
                    </div>
                    <div className={"form-input-container"}>
                        <label htmlFor={"color"}>Dimension:</label>
                        <div className={"dimension-container"}>
                            <input type="number" placeholder="Length" className="dimension-input"/>
                            <span>x</span>
                            <input type="number" placeholder="Width" className="dimension-input"/>
                            <span>x</span>
                            <input type="number" placeholder="Height" className="dimension-input"/>
                        </div>
                    </div>
                    <button type="submit" className="form-input-submit">{SKUId ? "Update SKU" : "Add SKU"}</button>
                </form>
            </div>
        </OverLay>
    )
}

export const SKU: React.FC = () => {

    const [skuData, setSkuData] = React.useState<ListSKu[]>([
        {
            skuCode: "SKU1234",
            productType: "Electronics",
            color: "Black",
            size: "Large",
            material: "Plastic",
            brand: "BrandA",
            dimension: "10x5x3 cm",
        },
        {
            skuCode: "SKU5678",
            productType: "Clothing",
            color: "Red",
            size: "Medium",
            material: "Cotton",
            brand: "BrandB",
            dimension: "20x15x5 cm",
        }
    ]);
    const [showOverlay, setShowOverlay] = React.useState(false);
    const [skuId, setSkuId] = React.useState<number | null>(null);
    const openShowOverlay = () => {
        setShowOverlay(true);
    }
    const closeShowOverlay = () => {
        setShowOverlay(false);
        setSkuId(null);
    }
    const listSku = skuData.map((sku) => {
        return (
            <tr key={sku.skuCode}>
                <td>{sku.skuCode}</td>
                <td>{sku.productType}</td>
                <td>{sku.color}</td>
                <td>{sku.size}</td>
                <td>{sku.material}</td>
                <td>{sku.brand}</td>
                <td>{sku.dimension}</td>
                <td>
                    <button onClick={() => {
                        setSkuId(1);
                        openShowOverlay();
                    }} className="edit-button">Edit</button>
                    <button className="delete-button">Delete</button>
                </td>
            </tr>
        )
    })

    return (
        <div className="container-right">
            <h1 className="primary-label">SKU Management</h1>
            <p className="primary-description">Manage your SKU codes here</p>
            <button onClick={openShowOverlay} className="add-button">Add SKU</button>
            <table className="table">
                <thead>
                <tr>
                    <th>SKU Code</th>
                    <th>Product Type</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Material</th>
                    <th>Brand</th>
                    <th>Dimension</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {listSku}
                </tbody>
            </table>
            {
                showOverlay &&
                <SKUForm closeShowOverlay={closeShowOverlay} SKUId={skuId}/>
            }
        </div>

    );
}