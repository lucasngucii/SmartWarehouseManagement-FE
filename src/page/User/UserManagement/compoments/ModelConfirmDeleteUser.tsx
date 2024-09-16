import React from "react";
import { OverLay } from "../../../../compoments/OverLay/OverLay";
import { Account } from "../../../../interface/Account";
import { RePulseLoader } from "../../../../compoments/Loading/PulseLoader";
import DeleteAccountAPI from "../../../../services/authen-api/DeleteAccountAPI";
import GetAccountsAPI from "../../../../services/authen-api/GetAccountsAPI";

interface ModelConfirmDeleteUserProps {
    userId: string;
    closeModelConfirmDelete: () => void;
    updateUsers: (response: Account[]) => void;
}

export const ModelConfirmDeleteUser: React.FC<ModelConfirmDeleteUserProps> = ({ userId, closeModelConfirmDelete, updateUsers }) => {

    const [isLoading, setIsLoading] = React.useState(false);
    const [globalError, setGlobalError] = React.useState<string>("");

    const handleDeleteAccount = (userId: string) => {
        setIsLoading(true);
        DeleteAccountAPI(userId)
            .then(() => {
                return GetAccountsAPI();
            }).then((response) => {
                updateUsers(response);
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
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to delete this user?</p>
                <span className="primary-message-error text-center">{globalError}</span>
                {
                    isLoading ?
                        <RePulseLoader loading={isLoading} />
                        :
                        <div className="model-buttons">
                            <button className="cancel-button" onClick={closeModelConfirmDelete}>Cancel</button>
                            <button className="delete-button" onClick={() => { handleDeleteAccount(userId) }}>Delete</button>
                        </div>
                }
            </div>
        </OverLay>
    )
}