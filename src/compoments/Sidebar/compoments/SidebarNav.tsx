interface SidebarNavProps {
    children: React.ReactNode
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ children }) => {
    return (
        <ul className={"sidebar-menu"}>
            {children}
        </ul>
    )
}