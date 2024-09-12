import { faCogs, faSignOutAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DropDownMenuProps {
    openModelLogout: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const DropDownMenu: React.FC<DropDownMenuProps> = ({ openModelLogout }) => {

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
            <a href="/" onClick={openModelLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} className="dropdown-icon" />
                Logout
            </a>
        </div>

    );
}