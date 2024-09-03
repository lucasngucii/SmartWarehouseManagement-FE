import React from "react";
import "./SKU.css";
import {OverLay} from "../../OverLay/OverLay";

interface SKUFormProps {
    closeShowOverlay: () => void;
}

const SKUForm: React.FC<SKUFormProps> = ({closeShowOverlay}) => {

    const [skuData, setSkuData] = React.useState({
        skucode: "",
        productType: "",
        color: "",
        size: "",
        material: "",
        brand: "",
        dimension: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSkuData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("SKU Data Submitted:", skuData);
    }

    return (
        <OverLay>
            <div className={"container-sku-form"}>
                <button onClick={closeShowOverlay} className="modal-close">
                    <i className="fas fa-times"></i>
                </button>
                <h1 className={"sku-form-title"}>New SKU</h1>
                <form onSubmit={handleSubmit} className="sku-form">
                    <label>
                        Product Type:
                        <input
                            type="text"
                            name="productType"
                            value={skuData.productType}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Color:
                        <input
                            type="text"
                            name="color"
                            value={skuData.color}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Size:
                        <input
                            type="text"
                            name="size"
                            value={skuData.size}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Material:
                        <input
                            type="text"
                            name="material"
                            value={skuData.material}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Brand:
                        <input
                            type="text"
                            name="brand"
                            value={skuData.brand}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Dimension:
                        <input
                            type="text"
                            name="dimension"
                            value={skuData.dimension}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        </OverLay>
    )
}

export const SKU: React.FC = () => {

    const [showOverlay, setShowOverlay] = React.useState(false);

    const openShowOverlay = () => {
        setShowOverlay(true);
    }

    const closeShowOverlay = () => {
        setShowOverlay(false);
    }

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
                <tr>
                    <td>SKU1234</td>
                    <td>Electronics</td>
                    <td>Black</td>
                    <td>Large</td>
                    <td>Plastic</td>
                    <td>BrandA</td>
                    <td>10x5x3 cm</td>
                    <td>
                        <button className="edit-button">Edit</button>
                        <button className="delete-button">Delete</button>
                    </td>
                </tr>
                <tr>
                    <td>SKU5678</td>
                    <td>Clothing</td>
                    <td>Red</td>
                    <td>Medium</td>
                    <td>Cotton</td>
                    <td>BrandB</td>
                    <td>20x15x5 cm</td>
                    <td>
                        <button className="edit-button">Edit</button>
                        <button className="delete-button">Delete</button>
                    </td>
                </tr>
                </tbody>
            </table>
            {
                showOverlay &&
                <SKUForm closeShowOverlay={closeShowOverlay}/>
            }
        </div>

    );
}