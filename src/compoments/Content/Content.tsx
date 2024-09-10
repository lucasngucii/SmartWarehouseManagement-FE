import { Outlet } from "react-router-dom";
import './Content.css';
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell, faChevronDown, faUserCircle, faCogs, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const DropDownMenu: React.FC = () => {
    return (
        <div className='dropdown-menu'>
            <a href="/profile">
                <FontAwesomeIcon icon={faUserCircle} className="dropdown-icon" />
                Profile
            </a>
            <a href="/settings">
                <FontAwesomeIcon icon={faCogs} className="dropdown-icon" />
                Settings
            </a>
            <a href="/logout">
                <FontAwesomeIcon icon={faSignOutAlt} className="dropdown-icon" />
                Logout
            </a>
        </div>

    );
}

const ContentHeader: React.FC = () => {
    const [currentDate, setCurrentDate] = React.useState<string>("");
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const today = new Date();
        const dateString = today.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        setCurrentDate(dateString);
    }, []);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className='content-header'>
            <div className='header-date'>{currentDate}</div>
            <div className='header-icons'>
                <FontAwesomeIcon icon={faBell} className="header-icon" title="Notifications" />
                <div className="account-container" onClick={toggleDropdown} ref={dropdownRef}>
                    <div className='user-info'>
                        <FontAwesomeIcon icon={faUser} className="header-icon" title="User" />
                        <span className='account-username'>John Doe</span>
                        <FontAwesomeIcon icon={faChevronDown} title="Options" />
                    </div>
                    {dropdownOpen && <DropDownMenu />}
                </div>
            </div>
        </div>
    );
}

export const Content: React.FC = () => {
    return (
        <div className='main-content'>
            <ContentHeader />
            <Outlet />
        </div>
    );
}