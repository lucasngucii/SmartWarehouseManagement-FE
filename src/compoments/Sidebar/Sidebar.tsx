import React from "react";
import "./Sidebar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faWarehouse, faBox, faUser } from '@fortawesome/free-solid-svg-icons';
import { SidebarItem } from "./compoments/SidebarItem";
import { SidebarNav } from "./compoments/SidebarNav";
import { SidebarLogo } from "./compoments/SidebarLogo";

export const Sidebar: React.FC = () => {
    const logo = "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?t=st=1724652251~exp";

    return (
        <div className={"sidebar"}>
            <SidebarLogo logo={logo} />
            <SidebarNav>
                <SidebarItem
                    href={"/"}
                    icon={<FontAwesomeIcon icon={faTachometerAlt} />}
                    lable={"Dashboard"}
                />
                <SidebarItem
                    icon={<FontAwesomeIcon icon={faWarehouse} />}
                    lable={"Inventory"}
                    subItems={
                        [
                            { href: "/stock-entry", lable: "Stock Entry" },
                        ]
                    }
                />
                <SidebarItem
                    icon={<FontAwesomeIcon icon={faBox} />}
                    lable={"Products"}
                    subItems={
                        [
                            { href: "/product-management", lable: "Manage Product" },
                            { href: "/management-sku", lable: "Manage SKU" },
                            { href: "/management-sublier", lable: "Manage Supplier" },
                            { href: "/management-attribute", lable: "Manage Attributes" },
                        ]
                    }
                />
                <SidebarItem
                    href={"/management-user"}
                    icon={<FontAwesomeIcon icon={faUser} />}
                    lable={"Users"}
                />
            </SidebarNav>
        </div>
    )
}