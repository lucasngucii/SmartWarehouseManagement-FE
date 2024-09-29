import React from "react";
import { FormEditAttributes } from "./FormEditAttributes";
import { OverLay } from "../../../compoments/OverLay/OverLay";
import AttributeDetailType from "../../../interface/AttributeDetail";
import GetAttributeDetail from "../../../services/Attribute/GetAttributeDetail";
import PaginationType from "../../../interface/Pagination";
import Pagination from "../../../compoments/Pagination/Pagination";
import { NoData } from "../../../compoments/NoData/NoData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faCubes, faList,
    faPalette,
    faPencilAlt, faRuler,
    faTag,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import ModelConfirmDeleteAttributeValue from "./ModelConfirmDeleteAttributeValue";
import { Button, Table } from "react-bootstrap";
import SpinnerLoading from "../../../compoments/Loading/SpinnerLoading";
import ToastMessage from "../../../compoments/Toast/ToastMessage";
import ToastContainerMessage from "../../../compoments/Toast/ToastContainerMessage";

interface AttributeValueManagementProps {
    handleCancelEditAttribute: () => void;
    attributeId: number;
}

export const AttributeValueManagement: React.FC<AttributeValueManagementProps> = ({ handleCancelEditAttribute, attributeId }) => {

    const [attributeValues, setAttributeValues] = React.useState<AttributeDetailType[]>([]);
    const [globalError, setGlobalError] = React.useState("");
    const [attributeValueId, setAttributeValueId] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [showEditAttributeValue, setShowEditAttributeValue] = React.useState(false);
    const [showModelConfirmDelete, setShowModelConfirmDelete] = React.useState(false);
    const [pagination, setPagination] = React.useState<PaginationType>({
        totalPage: 0,
        limit: 0,
        offset: 0,
        totalElementOfPage: 0
    });

    React.useEffect(() => {
        setIsLoading(true);
        GetAttributeDetail({ id: attributeId, offset: pagination.offset })
            .then((response) => {
                setAttributeValues(response.data);
                setPagination({
                    totalPage: response.totalPage,
                    limit: response.limit,
                    offset: response.offset,
                    totalElementOfPage: response.totalElementOfPage
                });
            }).catch((error) => {
                console.error(error);
                setGlobalError(error.message);
            }).finally(() => {
                setIsLoading(false);
            })
    }, [attributeId, pagination.offset]);

    const handleCancelEditAttributeValue = () => {
        setAttributeValueId("")
        setShowEditAttributeValue(false);
    }

    const handleEditAttributeValue = (attributeValueId: string) => {
        setAttributeValueId(attributeValueId);
        setShowEditAttributeValue(true);
    }

    const handleAddAttributeValue = () => {
        setShowEditAttributeValue(true);
    }

    const handleDeleteAttributeValue = (attributeValueId: string) => {
        setAttributeValueId(attributeValueId);
        setShowModelConfirmDelete(true);
    }

    const handleCancelModelConfirmDelete = () => {
        setAttributeValueId("");
        setShowModelConfirmDelete(false);
    }

    const handleChangePage = (page: number) => {
        setPagination({
            ...pagination,
            offset: page
        });
    }

    const updatePagination = (response: PaginationType) => {
        setPagination(response);
    }

    const updateAttributeValues = (response: AttributeDetailType[]) => {
        setAttributeValues(response);
    }

    const getAttributeName = (attributeId: number) => {
        switch (attributeId) {
            case 1:
                return (
                    <div className={"d-flex flex-row align-items-center gap-3"}>
                        <FontAwesomeIcon icon={faPalette}/>
                        <span className="d-block">Color</span>
                    </div>
                )
            case 2:
                return (
                    <div className={"d-flex flex-row align-items-center gap-3"}>
                        <FontAwesomeIcon icon={faCubes}/>
                        <span className="d-block">Model</span>
                    </div>
                )
            case 3:
                return (
                    <div className={"d-flex flex-row align-items-center gap-3"}>
                        <FontAwesomeIcon icon={faTag}/>
                        <span className="d-block">Brand</span>
                    </div>
                )
            case 4:
                return (
                    <div className={"d-flex flex-row align-items-center gap-3"}>
                        <FontAwesomeIcon icon={faRuler}/>
                        <span className="d-block">Size</span>
                    </div>
                )
            case 5:
                return (
                    <div className={"d-flex flex-row align-items-center gap-3"}>
                        <FontAwesomeIcon icon={faList}/>
                        <span className="d-block">Category</span>
                    </div>
                )
            default:
                return "";
        }
    }

    const renderAttributeValues = attributeValues.map((attributeValue, index) => {
        return (
            <tr key={attributeValue.id}>
                <td>{index + 1}</td>
                <td>{attributeValue.name}</td>
                <td>{attributeValue.description}</td>
                <td>{attributeValue.sizeCode || attributeValue.brandCode || attributeValue.categoryCode || attributeValue.colorCode || attributeValue.materialCode}</td>
                <td>
                    <div className="d-flex flex-row gap-2">
                        <Button
                            onClick={() => {
                                handleEditAttributeValue(attributeValue.id)
                            }}
                            variant="primary"
                        >
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </Button>
                        <Button
                            onClick={() => handleDeleteAttributeValue(attributeValue.id)}
                            variant="danger"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </div>
                </td>
            </tr>
        );
    });

    return (
        <OverLay className="disabled-padding">
            <div className="attribute-detail-management w-100 h-100 p-4 bg-light position-relative">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex flex-row align-items-center gap-2">
                        <button
                            onClick={handleCancelEditAttribute}
                            className="btn fs-3 px-3 text-primary"
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <h2 className="mb-0 fw-bold">{getAttributeName(attributeId)}</h2>
                    </div>
                    <div className="d-flex flex-row gap-3">
                        <Button onClick={handleAddAttributeValue} variant="info text-light fw-bold">NEW +</Button>
                    </div>
                </div>
                <Table hover striped bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Size Code</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderAttributeValues}
                    </tbody>
                </Table>
                {
                    attributeValues.length > 0 && <Pagination currentPage={pagination?.offset} totalPages={pagination?.totalPage} onPageChange={handleChangePage} />
                }
                {
                    (attributeValues.length === 0 || globalError) && !isLoading && <NoData />
                }
                {
                    isLoading && <SpinnerLoading />
                }
                {
                    showEditAttributeValue &&
                    <FormEditAttributes
                        attributeId={attributeId}
                        attributeDetailId={attributeValueId}
                        hideOverlay={handleCancelEditAttributeValue}
                        updatePagination={updatePagination}
                        updateAttributeValues={updateAttributeValues}
                    />
                }
                {
                    showModelConfirmDelete &&
                    <ModelConfirmDeleteAttributeValue
                        attributeId={attributeId}
                        attributeValueId={attributeValueId}
                        closeModelConfirmDelete={handleCancelModelConfirmDelete}
                        updateAttributeValues={updateAttributeValues}
                        updatePagination={updatePagination}
                    />
                }
                <ToastContainerMessage>
                    <ToastMessage message={globalError} type={"danger"} setMessage={() => {setGlobalError("")}} />
                </ToastContainerMessage>
            </div>
        </OverLay>
    );
};