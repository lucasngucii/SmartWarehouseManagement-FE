import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Dashboard } from "./page/Dashboard/Dashboard";
import { Login } from "./compoments/Login/Login";
import { UserManagement } from "./page/User/UserManagement";
import { SKUManagement } from "./page/SKU/SKUManagement";
import { AttributeManagement } from "./page/Attribute/AttributeManagement";
import { ProductManagement } from "./page/Product/ProductManagement";
import { SupplierManagement } from './page/Supplier/SupplierManagement';

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: "management-user",
                element: <UserManagement />,
            },
            {
                path: "management-sku",
                element: <SKUManagement />,
            },
            {
                path: "management-supplier",
                element: <SupplierManagement />,
            },
            {
                path: "management-attribute",
                element: <AttributeManagement />,
            },
            {
                path: "product-management",
                element: <ProductManagement />,
            }
        ]
    }
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
