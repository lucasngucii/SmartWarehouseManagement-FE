import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
interface SidebarItemProps {
    href?: string,
    icon: React.ReactNode,
    lable: string,
    subItems?: { href: string, lable: string }[]
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ href, icon, lable, subItems }) => {

    const location = useLocation();
    const [isOpen, setIsOpen] = React.useState(false);
    const [locationPath, setLocationPath] = React.useState(location.pathname);

    React.useEffect(() => {
        setLocationPath(location.pathname);
    }, [location]);

    React.useEffect(() => {
        if (subItems && isSubItemActive(subItems)) setIsOpen(true);
    }, [locationPath]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    const isSubItemActive = (subItems: { href: string, lable: string }[]) => {
        return subItems.some(subItem => locationPath.includes(subItem.href + ""));
    }

    if (!subItems && href) {
        return (
            <li className={"sidebar-item"}>
                <NavLink
                    to={href}
                    onClick={handleToggle}
                    className={({ isActive, isPending }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                >
                    <div className={"sidebar-icon"}>
                        {icon}
                    </div>
                    <span>{lable}</span>
                </NavLink>
            </li>
        )
    }

    return (
        <li className={"sidebar-item"}>
            <span
                onClick={handleToggle}
                className={`sidebar-link ${isOpen ? "focus " : ""} ${subItems && isSubItemActive(subItems) ? "active" : ""}`}
            >
                <div className={"sidebar-icon"}>
                    {icon}
                </div>
                <span>{lable}</span>
                {subItems && (
                    <div className={`sidebar-toggle-icon ${isOpen ? "rotate" : ""}`}>
                        <FontAwesomeIcon icon={faChevronUp} />
                    </div>
                )}
            </span>
            {subItems && (
                <ul className={`sidebar-submenu ${isOpen ? "show-submenu" : ""}`}>
                    {subItems.map((subItem, index) => (
                        <li key={index} className="sidebar-subitem">
                            <NavLink to={subItem.href}
                                className={({ isActive, isPending }) =>
                                    `sidebar-sublink ${isActive ? "active" : ""}`
                                }>
                                {subItem.lable}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    )
}