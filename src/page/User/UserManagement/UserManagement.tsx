import "./UserManagement.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { AddUserComponent } from "./compoments/AddUserComponent";
import { Account } from "../../../interface/Account";
import React from "react";
import { RePulseLoader } from "../../../compoments/Loading/PulseLoader";
import { NoData } from "../../../compoments/NoData/NoData";
import { ModelConfirmDeleteUser } from "./compoments/ModelConfirmDeleteUser";
import GetAccountsAPI from "../../../services/authen-api/GetAccountsAPI";
import Pagination from "../../../compoments/Pagination/Pagination";
import PaginationType from "../../../interface/Pagination";

export const UserManagement: React.FC = () => {

    const [users, setUsers] = React.useState<Account[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [showOverlayModelUser, setShowOverlayModelUser] = React.useState(false);
    const [showOverlayModelDelete, setShowOverlayModelDelete] = React.useState(false);
    const [userId, setUserId] = React.useState<string>("");
    const [globalError, setGlobalError] = React.useState<string>("");
    const [pagination, setPagination] = React.useState<PaginationType>({
        total: 0,
        limit: 0,
        offset: 0,
        totalElementOfPage: 0
    });

    React.useEffect(() => {
        setIsLoading(true);
        GetAccountsAPI()
            .then((response) => {
                setUsers(response.data);
                setPagination({
                    total: response.total,
                    limit: response.limit,
                    offset: response.offset,
                    totalElementOfPage: response.totalElementOfPage
                });
            }).catch((error) => {
                console.error(error);
                setGlobalError(error.message);
            }).finally(() => {
                setIsLoading(false);
            });
    }, []);

    React.useEffect(() => {
        setIsLoading(true);
        GetAccountsAPI({ offset: pagination.offset })
            .then((response) => {
                console.log(response);
                setUsers(response.data);
                setPagination({
                    total: response.total,
                    limit: response.limit,
                    offset: response.offset,
                    totalElementOfPage: response.totalElementOfPage
                });
            }).catch((error) => {
                console.error(error);
                setGlobalError(error.message);
            }).finally(() => {
                setIsLoading(false);
            });
    }, [pagination.offset]);

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

    const updatePagination = (response: PaginationType) => {
        setPagination(response);
    }

    const handleChangePage = (page: number) => {
        setPagination({
            ...pagination,
            offset: page
        });
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
                    users.length > 0 && <Pagination currentPage={pagination?.offset} totalPages={pagination?.total} onPageChange={handleChangePage} />
                }
                {
                    (users.length === 0 || globalError) && !isLoading && <NoData message={globalError} />
                }
                <RePulseLoader loading={isLoading} />
            </div>
            {showOverlayModelUser && <AddUserComponent hideOverlay={handleHideOverlayModelUser} userId={userId} updateUsers={updateUsers} updatePagination={updatePagination} />}
            {showOverlayModelDelete && <ModelConfirmDeleteUser userId={userId} closeModelConfirmDelete={handleHideOverlayModelDelete} updateUsers={updateUsers} updatePagination={updatePagination} />}
        </div>
    );
}
