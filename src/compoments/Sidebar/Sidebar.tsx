import React from "react";
import "./Sidebar.css";
import {NavLink} from "react-router-dom";

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
        <nav className="sidebar-nav">
            <ul>
                {children}
            </ul>
        </nav>
    )
}

interface SidebarItemProps {
    href: string
    icon: React.ReactNode
    title: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({href, icon, title}) => {

    return (
        <li>
            <NavLink
                to={href}
                className={({isActive, isPending}) =>
                    isActive ? "active" : isPending ? "pending" : ""
                }
            >
                {icon}
                <span>{title}</span>
            </NavLink>
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
            <img src={avatar} alt="User Avatar"/>
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
                <SidebarItem href={"/dashboard"} icon={<i className="fas fa-tachometer-alt"></i>} title={"Dashboard"}/>
                <SidebarItem href={"/a"} icon={<i className="fas fa-warehouse"></i>} title={"inventory"}/>
                <SidebarItem href={"/b"} icon={<i className="fas fa-shopping-cart"></i>} title={"orders"}/>
                <SidebarItem href={"/c"} icon={<i className="fas fa-cog"></i>} title={"Settings"}/>
            </SidebarNav>
            <SidebarUser avatar={logo} name={"Thiên Phú"}/>
        </div>
    )
}