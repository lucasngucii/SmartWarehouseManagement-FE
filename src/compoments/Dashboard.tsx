import React from "react";

export const Dashboard: React.FC = () => {
    return (
        <div className={"container"}>
            <h2>Dashboard</h2>
            <div className="dashboard-widgets">
                <div className="widget">
                    <h3>Total Orders</h3>
                    <p>1234</p>
                </div>
                <div className="widget">
                    <h3>Total Inventory</h3>
                    <p>5678</p>
                </div>
            </div>
            <h2>Inventory</h2>
            <table className="inventory-table">
                <thead>
                <tr>
                    <th>Product Name</th>
                    <th>SKU</th>
                    <th>Quantity</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Product 1</td>
                    <td>SKU12345</td>
                    <td>100</td>
                    <td>In Stock</td>
                </tr>
                <tr>
                    <td>Product 2</td>
                    <td>SKU67890</td>
                    <td>50</td>
                    <td>Low Stock</td>
                </tr>
                </tbody>
            </table>
            <h2>Orders</h2>
            <table className="orders-table">
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Order Date</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>001</td>
                    <td>Jane Doe</td>
                    <td>2024-08-25</td>
                    <td>Shipped</td>
                </tr>
                <tr>
                    <td>002</td>
                    <td>John Smith</td>
                    <td>2024-08-26</td>
                    <td>Processing</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}