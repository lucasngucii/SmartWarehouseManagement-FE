import React from "react";
import { OverLay } from "../../../compoments/OverLay/OverLay";
import PaginationType from "../../../interface/Pagination";
import { Product } from "../../../interface/Entity/Product";
import GetProducts from "../../../services/Product/GetProducts";
import DeleteProductById from "../../../services/Product/DeleteProductById";
import SpinnerLoading from "../../../compoments/Loading/SpinnerLoading";
import {useDispatchMessage} from "../../../Context/ContextMessage";
import ActionTypeEnum from "../../../enum/ActionTypeEnum";

interface ModelConfirmDeleteUserProps {
    productId: string;
    closeModelConfirmDelete: () => void;
    updateProducts: (response: Product[]) => void;
    updatePagination: (response: PaginationType) => void;
}

const ModelConfirmDeleteProduct: React.FC<ModelConfirmDeleteUserProps> = ({ productId, closeModelConfirmDelete, updateProducts, updatePagination }) => {

    const dispatch = useDispatchMessage();
    const [isLoading, setIsLoading] = React.useState(false);

    const handleDeleteAccount = (productId: string) => {
        setIsLoading(true);
        DeleteProductById(productId)
            .then(() => {
                return GetProducts();
            }).then((response) => {
                updateProducts(response.data);
                updatePagination({
                    totalPage: response.totalPage,
                    limit: response.limit,
                    offset: response.offset,
                    totalElementOfPage: response.totalElementOfPage
                });
                closeModelConfirmDelete();
                dispatch({type: ActionTypeEnum.SUCCESS, message: "Delete product successfully"});
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
                <p>Are you sure you want to delete this product?</p>
                {
                    isLoading ?
                        <SpinnerLoading />
                        :
                        <div className="model-buttons">
                            <button className="btn btn-secondary" onClick={closeModelConfirmDelete}>Cancel</button>
                            <button className="btn btn-danger" onClick={() => { handleDeleteAccount(productId) }}>Delete</button>
                        </div>
                }
            </div>
        </OverLay>
    )
}

export default ModelConfirmDeleteProduct;