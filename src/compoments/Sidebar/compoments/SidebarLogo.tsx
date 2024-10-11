import { Link } from "react-router-dom"

interface SidebarLogoProps {
    logo: string
}

export const SidebarLogo: React.FC<SidebarLogoProps> = ({ logo }) => {
    return (
        <Link to={"/"} className="sidebar-logo" style={{ cursor: "pointer", textDecoration: "none" }}>
            <img src={logo} alt="Logo" />
            <h1>Leon Warehouse</h1>
        </Link>
    )
}