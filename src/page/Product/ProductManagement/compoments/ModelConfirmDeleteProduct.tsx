import React from "react";
import { OverLay } from "../../../../compoments/OverLay/OverLay";
import { RePulseLoader } from "../../../../compoments/Loading/PulseLoader";
import DeleteAccountAPI from "../../../../services/authen-api/DeleteAccountAPI";
import PaginationType from "../../../../interface/Pagination";
import { Product } from "../../../../interface/Product";
import GetProducts from "../../../../services/product/GetProducts";
import { Alert } from "react-bootstrap";
import DeleteProductById from "../../../../services/product/DeleteProductById";

interface ModelConfirmDeleteUserProps {
    productId: string;
    closeModelConfirmDelete: () => void;
    updateProducts: (response: Product[]) => void;
    updatePagination: (response: PaginationType) => void;
}

const ModelConfirmDeleteProduct: React.FC<ModelConfirmDeleteUserProps> = ({ productId, closeModelConfirmDelete, updateProducts, updatePagination }) => {

    const [isLoading, setIsLoading] = React.useState(false);
    const [globalError, setGlobalError] = React.useState<string>("");

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
                {
                    globalError &&
                    <Alert key={"danger"} variant={"danger"} onClose={() => { setGlobalError("") }}>{globalError}</Alert>
                }
                <p>Are you sure you want to delete this product?</p>
                {
                    isLoading ?
                        <RePulseLoader loading={isLoading} />
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