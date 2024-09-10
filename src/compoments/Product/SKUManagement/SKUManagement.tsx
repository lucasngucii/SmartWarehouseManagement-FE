import React from "react";
import "./SKUManagement.css";

interface SKU {
    skuCode: string;
    productType: string;
    color: string;
    size: string;
    material: string;
    brand: string;
    dimension: string;
}

export const SKUManagement: React.FC = () => {

    const [skuData, setSkuData] = React.useState<SKU[]>([
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
                    <button className="delete-button">Delete</button>
                </td>
            </tr>
        )
    })

    return (
        <div>
            <h1 className="primary-label">SKU Management</h1>
            <p className="primary-description margin-bottom-15">Manage your SKU codes here</p>
            <div className="table-container">
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
            </div>
        </div>

    );
}