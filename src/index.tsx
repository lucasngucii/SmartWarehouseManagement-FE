import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Dashboard} from "./compoments/Dashboard/Dashboard";
import {Login} from "./compoments/Login/Login";
import {ManagementGroup} from "./compoments/User/ManagementGroup/ManagementGroup";
import {ManagementUser} from "./compoments/User/ManagementUser/ManagementUser";

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
                element: <ManagementUser />,
            },
            {
                path: "management-group",
                element: <ManagementGroup />,
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
