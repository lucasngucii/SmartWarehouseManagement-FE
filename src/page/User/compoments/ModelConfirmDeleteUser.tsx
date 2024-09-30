import React from "react";
import {Account} from "../../../interface/Account";
import PaginationType from "../../../interface/Pagination";
import DeleteAccountAPI from "../../../services/Authen/DeleteAccountAPI";
import GetAccountsAPI from "../../../services/Authen/GetAccountsAPI";
import {OverLay} from "../../../compoments/OverLay/OverLay";
import SpinnerLoading from "../../../compoments/Loading/SpinnerLoading";
import {useDispatchMessage} from "../../../Context/ContextMessage";
import ActionTypeEnum from "../../../enum/ActionTypeEnum";

interface ModelConfirmDeleteUserProps {
    userId: string;
    closeModelConfirmDelete: () => void;
    updateUsers: (response: Account[]) => void;
    updatePagination: (response: PaginationType) => void;
}

export const ModelConfirmDeleteUser: React.FC<ModelConfirmDeleteUserProps> = ({ userId, closeModelConfirmDelete, updateUsers, updatePagination }) => {

    const dispatch = useDispatchMessage();
    const [isLoading, setIsLoading] = React.useState(false);

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
                dispatch({type: ActionTypeEnum.SUCCESS, message: "Delete user successfully"});
            }).catch((error) => {
                console.error(error);
                dispatch({type: ActionTypeEnum.ERROR, message: error.message});
            }).finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <OverLay className="fullscreen">
            <div className="global-model">
                <h2 className="fw-bold text-center h2">Confirm Delete</h2>
                <p>Are you sure you want to delete this user?</p>
                {
                    isLoading ?
                        <SpinnerLoading />
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