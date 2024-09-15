import "./UserManagement.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { AddUserComponent } from "./compoments/AddUserComponent";
import { GetAccountsAPI } from "../../../services/authen-api/GetAccountsAPI";
import { Account } from "../../../interface/Account";
import React from "react";
import { RePulseLoader } from "../../Loading/PulseLoader";
import { NoData } from "../../NoData/NoData";
import { ModelConfirmDeleteUser } from "./compoments/ModelConfirmDeleteUser";

export const UserManagement: React.FC = () => {

    const [users, setUsers] = React.useState<Account[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [showOverlayModelUser, setShowOverlayModelUser] = React.useState(false);
    const [showOverlayModelDelete, setShowOverlayModelDelete] = React.useState(false);
    const [userId, setUserId] = React.useState<string>("");
    const [globalError, setGlobalError] = React.useState<string>("");

    React.useEffect(() => {
        setIsLoading(true);
        GetAccountsAPI()
            .then((response) => {
                // console.log(response);
                setUsers(response);
            }).catch((error) => {
                console.error(error);
                setGlobalError(error.message);
            }).finally(() => {
                setIsLoading(false);
            });
    }, []);

    const handleShowOverlayModelUser = () => {
        setShowOverlayModelUser(true);
    }

    const handleHideOverlayModelUser = () => {
        setShowOverlayModelUser(false);
        setUserId("");
    }

    const handleShowOverlayModelDelete = (userId: string) => {
        setShowOverlayModelDelete(true);
        setUserId(userId);
    }

    const handleHideOverlayModelDelete = () => {
        setShowOverlayModelDelete(false);
        setUserId("");
    }

    const updateUsers = (response: Account[]) => {
        setUsers(response);
    }

    const listUser = users.map((user, index) => {
        return (
            <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.role.name}</td>
                <td>
                    <button
                        onClick={() => {
                            setUserId(user.id)
                            handleShowOverlayModelUser()
                        }}
                        className="edit-button"
                    >
                        Edit
                    </button>
                    <button onClick={() => handleShowOverlayModelDelete(user.id)} className="delete-button">Delete</button>
                </td>
            </tr>
        )
    }
    );

    return (
        <div>
            <div className="content-header-container">
                <div className="content-header-left">
                    <h2 className={"primary-label"}>User Account Management</h2>
                    <p className={"primary-description"}>Manage user accounts and their status</p>
                </div>
                <div className="content-header-right">
                    <form className="form-search">
                        <input
                            type="search"
                            className="form-input"
                            placeholder={"Search user"}
                        />
                        <button className="form-input-submit">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </form>
                    <button onClick={handleShowOverlayModelUser} className="add-button">Add User</button>
                </div>
            </div>
            <div className="table-container">
                <table className="table id-column">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>FullName</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 && listUser}
                    </tbody>
                </table>
                {
                    (users.length === 0 || globalError) && !isLoading && <NoData message={globalError} />
                }
                <RePulseLoader loading={isLoading} />
            </div>
            {showOverlayModelUser && <AddUserComponent hideOverlay={handleHideOverlayModelUser} userId={userId} updateUsers={updateUsers} />}
            {showOverlayModelDelete && <ModelConfirmDeleteUser userId={userId} closeModelConfirmDelete={handleHideOverlayModelDelete} updateUsers={updateUsers} />}
        </div>
    );
}
