import React from "react";
import { Account } from "../../../interface/Account";
import PaginationType from "../../../interface/Pagination";
import DeleteAccountAPI from "../../../services/authen-api/DeleteAccountAPI";
import GetAccountsAPI from "../../../services/authen-api/GetAccountsAPI";
import { OverLay } from "../../../compoments/OverLay/OverLay";
import { RePulseLoader } from "../../../compoments/Loading/PulseLoader";

interface ModelConfirmDeleteUserProps {
    userId: string;
    closeModelConfirmDelete: () => void;
    updateUsers: (response: Account[]) => void;
    updatePagination: (response: PaginationType) => void;
}

export const ModelConfirmDeleteUser: React.FC<ModelConfirmDeleteUserProps> = ({ userId, closeModelConfirmDelete, updateUsers, updatePagination }) => {

    const [isLoading, setIsLoading] = React.useState(false);
    const [globalError, setGlobalError] = React.useState<string>("");

    const handleDeleteAccount = (userId: string) => {
        setIsLoading(true);
        DeleteAccountAPI(userId)
            .then(() => {
                return GetAccountsAPI();
            }).then((response) => {
                updateUsers(response.data);
                updatePagination({
                    totalPage: response.totalPage,
                    limit: response.limit,
                    offset: response.offset,
                    totalElementOfPage: response.totalElementOfPage
                });
                closeModelConfirmDelete();
            }).catch((error) => {
                console.error(error);
                setGlobalError(error.message);
            }).finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <OverLay className="fullscreen">
            <div className="global-model">
                <h2 className="fw-bold text-center h2">Confirm Delete</h2>
                <p>Are you sure you want to delete this user?</p>
                <span className="primary-message-error text-center">{globalError}</span>
                {
                    isLoading ?
                        <RePulseLoader loading={isLoading} />
                        :
                        <div className="model-buttons">
                            <button className="btn btn-secondary" onClick={closeModelConfirmDelete}>Cancel</button>
                            <button className="btn btn-danger" onClick={() => { handleDeleteAccount(userId) }}>Delete</button>
                        </div>
                }
            </div>
        </OverLay>
    )
}