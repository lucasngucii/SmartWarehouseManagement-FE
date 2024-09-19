import React from "react";
import { RePulseLoader } from "../../../../compoments/Loading/PulseLoader";
import { OverLay } from "../../../../compoments/OverLay/OverLay";
import AttributeDetailType from "../../../../interface/AttributeDetail";
import DeleteAttributeValue from "../../../../services/attribute/DeleteAttributeValue";
import GetAttributeDetail from "../../../../services/attribute/GetAttributeDetail";
import PaginationType from "../../../../interface/Pagination";

interface ModelConfirmDeleteAttributeValueProps {
    attributeId: number;
    attributeValueId: string;
    closeModelConfirmDelete: () => void;
    updateAttributeValues: (data: AttributeDetailType[]) => void;
    updatePagination: (response: PaginationType) => void;
}

const ModelConfirmDeleteAttributeValue: React.FC<ModelConfirmDeleteAttributeValueProps> = ({ attributeId, attributeValueId, closeModelConfirmDelete, updateAttributeValues, updatePagination }) => {

    const [isLoading, setIsLoading] = React.useState(false);
    const [globalError, setGlobalError] = React.useState<string>("");

    const handelDeleteAttributeValue = () => {
        setIsLoading(true);
        DeleteAttributeValue(attributeId, attributeValueId)
            .then(() => {
                return GetAttributeDetail({ id: attributeId });
            }).then((response) => {
                updateAttributeValues(response.data);
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
                <p>Are you sure you want to delete this attribute value?</p>
                <span className="primary-message-error text-center">{globalError}</span>
                {
                    isLoading ?
                        <RePulseLoader loading={isLoading} />
                        :
                        <div className="model-buttons">
                            <button className="btn btn-secondary" onClick={closeModelConfirmDelete}>Cancel</button>
                            <button className="btn btn-danger" onClick={handelDeleteAttributeValue}>Delete</button>
                        </div>
                }
            </div>
        </OverLay>
    );
}

export default ModelConfirmDeleteAttributeValue;