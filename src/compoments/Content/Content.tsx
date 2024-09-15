import { Outlet, useNavigate } from "react-router-dom";
import './Content.css';
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { LogoutAPI } from "../../services/authen-api/LogoutAPI";
import { DropDownMenu } from "./compoments/DropDownMenu";
import { ModelClose } from "./compoments/ModelClose";
import { GetProfile } from "../../util/getProfile";

const ContentHeader: React.FC = () => {

    const navigate = useNavigate();
    const myProfile = GetProfile();
    const [currentDate, setCurrentDate] = React.useState<string>("");
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [modelLogout, setModelLogout] = React.useState(false);
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

    const openModelLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setModelLogout(true);
    }

    const closeModelLogout = () => {
        setModelLogout(false);
    }

    const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        LogoutAPI()
            .then(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("profile");
                navigate("/login");
            }).catch((err) => {
                console.error(err.message);
            });
    }

    return (
        <div className='content-header'>
            <div className='header-date'>{currentDate}</div>
            <div className='header-icons'>
                <FontAwesomeIcon icon={faBell} className="header-icon" title="Notifications" />
                <div className="account-container" onClick={toggleDropdown} ref={dropdownRef}>
                    <div className='user-info'>
                        <FontAwesomeIcon icon={faUser} className="header-icon" title="User" />
                        <span className='account-username'>{myProfile?.username || "John Doe"}</span>
                        <FontAwesomeIcon icon={faChevronDown} title="Options" />
                    </div>
                    {dropdownOpen && <DropDownMenu openModelLogout={openModelLogout} />}
                </div>
            </div>
            {modelLogout && <ModelClose closeModelLogout={closeModelLogout} handleLogout={handleLogout} />}
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