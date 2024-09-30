import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt, faTrash} from "@fortawesome/free-solid-svg-icons";
import {EditUserComponent} from "./compoments/EditUserComponent";
import React from "react";
import {NoData} from "../../compoments/NoData/NoData";
import {ModelConfirmDeleteUser} from "./compoments/ModelConfirmDeleteUser";
import GetAccountsAPI from "../../services/Authen/GetAccountsAPI";
import Pagination from "../../compoments/Pagination/Pagination";
import PaginationType from "../../interface/Pagination";
import {Button, Table} from "react-bootstrap";
import {Account} from "../../interface/Account";
import SpinnerLoading from "../../compoments/Loading/SpinnerLoading";
import {useDispatchMessage} from "../../Context/ContextMessage";
import ActionTypeEnum from "../../enum/ActionTypeEnum";

export const UserManagement: React.FC = () => {

    const dispatch = useDispatchMessage();
    const [users, setUsers] = React.useState<Account[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [showOverlayModelUser, setShowOverlayModelUser] = React.useState(false);
    const [showOverlayModelDelete, setShowOverlayModelDelete] = React.useState(false);
    const [userId, setUserId] = React.useState<string>("");
    const [pagination, setPagination] = React.useState<PaginationType>({
        totalPage: 0,
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
                    totalPage: response.totalPage,
                    limit: response.limit,
                    offset: response.offset,
                    totalElementOfPage: response.totalElementOfPage
                });
            }).catch((error) => {
            console.error(error);
            dispatch({type: ActionTypeEnum.ERROR, message: error.message});
        }).finally(() => {
            setIsLoading(false);
        });
    }, [dispatch]);

    React.useEffect(() => {
        const id = setTimeout(() => {
            setIsLoading(true);
            GetAccountsAPI({offset: pagination.offset})
                .then((response) => {
                    setUsers(response.data);
                    setPagination({
                        totalPage: response.totalPage,
                        limit: response.limit,
                        offset: response.offset,
                        totalElementOfPage: response.totalElementOfPage
                    });
                }).catch((error) => {
                console.error(error);
                dispatch({type: ActionTypeEnum.ERROR, message: error.message});
            }).finally(() => {
                setIsLoading(false);
            });
        }, 1000);
        return () => clearTimeout(id);
    }, [pagination.offset, dispatch]);

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
                        <div className="d-flex flex-row gap-2">
                            <Button
                                onClick={() => {
                                    setUserId(user.id)
                                    setShowOverlayModelUser(true);
                                }}
                                variant="primary"
                            >
                                <FontAwesomeIcon icon={faPencilAlt}/>
                            </Button>
                            <Button
                                onClick={() => handleShowOverlayModelDelete(user.id)}
                                variant="danger"
                            >
                                <FontAwesomeIcon icon={faTrash}/>
                            </Button>
                        </div>
                    </td>
                </tr>
            )
        }
    );

    return (
        <div className={"w-100 h-100"}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h2 className={"h2 fw-bold"}>User Account Management</h2>
                    <p className={"h6"}>Manage user accounts and their status</p>
                </div>
                <div className="d-flex flex-row gap-3">
                    <Button onClick={() => {
                        setShowOverlayModelUser(true);
                    }} variant="info text-light fw-bold">+ NEW</Button>
                </div>
            </div>
            <Table striped bordered hover>
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
            </Table>
            {
                users.length > 0 && <Pagination currentPage={pagination?.offset} totalPages={pagination?.totalPage}
                                                onPageChange={handleChangePage}/>
            }
            {
                (users.length === 0) && !isLoading && <NoData/>
            }
            {
                isLoading && <SpinnerLoading/>
            }
            {
                showOverlayModelUser &&
                <EditUserComponent
                    hideOverlay={handleHideOverlayModelUser}
                    userId={userId}
                    updateUsers={updateUsers}
                    updatePagination={updatePagination}
                />
            }
            {
                showOverlayModelDelete &&
                <ModelConfirmDeleteUser
                    userId={userId}
                    closeModelConfirmDelete={handleHideOverlayModelDelete}
                    updateUsers={updateUsers}
                    updatePagination={updatePagination}
                />
            }
        </div>
    );
}
