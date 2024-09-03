import React from "react";
import "./SKU.css";

export const SKU: React.FC = () => {
    return (
        <div className="sku-management-container">
            <h1 className="sku-management-title">SKU Management</h1>
            <p className="sku-management-description">Manage your SKU codes here</p>
            <button className="add-sku-button">Add SKU</button>
            <table className="sku-management-table">
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
        </div>

    );
}