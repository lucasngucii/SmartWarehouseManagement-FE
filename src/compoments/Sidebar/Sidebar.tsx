import React from "react";
import "./Sidebar.css";
import {NavLink, useLocation} from "react-router-dom";

interface SidebarLogoProps {
    logo: string
}

const SidebarLogo: React.FC<SidebarLogoProps> = ({logo}) => {
    return (
        <div className="sidebar-logo">
            <img src={logo} alt="Logo"/>
            <h1>My Website</h1>
        </div>
    )
}

interface SidebarNavProps {
    children: React.ReactNode
}

const SidebarNav: React.FC<SidebarNavProps> = ({children}) => {
    return (
        <ul className={"sidebar-menu"}>
            {children}
        </ul>
    )
}

interface SidebarItemProps {
    href?: string,
    icon: React.ReactNode,
    lable: string,
    subItems?: { href: string, lable: string }[]
}

const SidebarItem: React.FC<SidebarItemProps> = ({href, icon, lable, subItems}) => {

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
        return subItems.some(subItem => locationPath.includes(subItem.href+""));
    }

    if (!subItems && href) {
        return (
            <li className={"sidebar-item"}>
                <NavLink
                    to={href}
                    onClick={handleToggle}
                    className={({isActive, isPending}) =>
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
                className={`sidebar-link ${isOpen ? "focus" : ""}`}
            >
                <div className={"sidebar-icon"}>
                    {icon}
                </div>
                <span>{lable}</span>
                {subItems && (
                    <div className={`sidebar-toggle-icon ${isOpen ? "rotate" : ""}`}>
                        <i className="fa-solid fa-chevron-up"></i>
                    </div>
                )}
            </span>
            {subItems && (
                <ul className={`sidebar-submenu ${isOpen ? "show-submenu" : ""}`}>
                    {subItems.map((subItem, index) => (
                        <li key={index} className="sidebar-subitem">
                            <NavLink to={subItem.href}
                                     className={({isActive, isPending}) =>
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

interface SidebarUserProps {
    avatar: string
    name: string
}

const SidebarUser: React.FC<SidebarUserProps> = ({avatar, name}) => {
    return (
        <div className="sidebar-user">
            <img src={avatar} alt="ManagementUser Avatar"/>
            <div className="user-info">
                <p>{name}</p>
                <a href="#logout">Logout</a>
            </div>
        </div>
    )
}

export const Sidebar: React.FC = () => {
    const logo = "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?t=st=1724652251~exp";

    return (
        <div className={"sidebar"}>
            <SidebarLogo logo={logo}/>
            <SidebarNav>
                <SidebarItem
                    href={"/"}
                    icon={<i className="fas fa-tachometer-alt"></i>}
                    lable={"Dashboard"}
                />
                <SidebarItem
                    href={"/a"}
                    icon={<i className="fas fa-warehouse"></i>}
                    lable={"Inventory"}
                />
                <SidebarItem
                    href={"/b"}
                    icon={<i className="fas fa-shopping-cart"></i>}
                    lable={"Orders"}
                />
                <SidebarItem
                    icon={<i className="fas fa-user"></i>}
                    lable={"Users"}
                    subItems={
                        [
                            {href: "/management-user", lable: "Manage Users"},
                            {href: "/management-group", lable: "Manage Groups"},
                        ]
                    }
                />
                <SidebarItem
                    href={"/c"}
                    icon={<i className="fas fa-cog"></i>}
                    lable={"Settings"}
                />
            </SidebarNav>
            <SidebarUser avatar={logo} name={"Thiên Phú"}/>
        </div>
    )
}