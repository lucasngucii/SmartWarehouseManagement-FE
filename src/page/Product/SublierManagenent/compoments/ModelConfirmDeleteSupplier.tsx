import React from "react";
import PaginationType from "../../../../interface/Pagination";
import Supplier from "../../../../interface/Supplier";
import DeleteSupplierById from "../../../../services/supplier/DeleteSupplierById";
import GetSuppliers from "../../../../services/supplier/GetSuppliers";
import { OverLay } from "../../../../compoments/OverLay/OverLay";
import { RePulseLoader } from "../../../../compoments/Loading/PulseLoader";

interface ModelConfirmDeleteSupplierProps {
    supplierId: string;
    closeModelConfirmDelete: () => void;
    updateSuppliers: (data: Supplier[]) => void;
    updatePagination: (response: PaginationType) => void;
}

const ModelConfirmDeleteSupplier: React.FC<ModelConfirmDeleteSupplierProps> = ({ closeModelConfirmDelete, supplierId, updatePagination, updateSuppliers }) => {

    const [isLoading, setIsLoading] = React.useState(false);
    const [globalError, setGlobalError] = React.useState<string>("");

    const handelDeleteSupplier = () => {
        setIsLoading(true);
        DeleteSupplierById(supplierId)
            .then(() => {
                return GetSuppliers();
            }).then((response) => {
                updateSuppliers(response.data);
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
                <h2 className="h2 fw-bold">Confirm Delete</h2>
                <p>Are you sure you want to delete this supplier?</p>
                <span className="primary-message-error text-center">{globalError}</span>
                {
                    isLoading ?
                        <RePulseLoader loading={isLoading} />
                        :
                        <div className="model-buttons">
                            <button className="btn btn-secondary" onClick={closeModelConfirmDelete}>Cancel</button>
                            <button className="btn btn-danger" onClick={handelDeleteSupplier}>Delete</button>
                        </div>
                }
            </div>
        </OverLay>
    );
}

export default ModelConfirmDeleteSupplier;