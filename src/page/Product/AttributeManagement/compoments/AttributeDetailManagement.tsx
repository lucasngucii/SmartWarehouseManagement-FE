import React from "react";
import { EditAttributeValue } from "./EditAttributeValue";
import { OverLay } from "../../../../compoments/OverLay/OverLay";
import AttributeDetailType from "../../../../interface/AttributeDetail";
import GetAttributeDetail from "../../../../services/attribute/GetAttributeDetail";
import PaginationType from "../../../../interface/Pagination";
import Pagination from "../../../../compoments/Pagination/Pagination";
import { NoData } from "../../../../compoments/NoData/NoData";
import { RePulseLoader } from "../../../../compoments/Loading/PulseLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import ModelConfirmDeleteAttributeValue from "./ModelConfirmDeleteAttributeValue";

interface AttributeDetailManagementProps {
    handleCancelEditAttribute: () => void;
    attributeId: number;
}

export const AttributeDetailManagement: React.FC<AttributeDetailManagementProps> = ({ handleCancelEditAttribute, attributeId }) => {

    const [attributeValues, setAttributeValues] = React.useState<AttributeDetailType[]>([]);
    const [globalError, setGlobalError] = React.useState("");
    const [attributeValueId, setAttributeValueId] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [showEditAttributeValue, setShowEditAttributeValue] = React.useState(false);
    const [showModelConfirmDelete, setShowModelConfirmDelete] = React.useState(false);
    const [pagination, setPagination] = React.useState<PaginationType>({
        total: 0,
        limit: 0,
        offset: 0,
        totalElementOfPage: 0
    });

    React.useEffect(() => {
        setIsLoading(true);
        GetAttributeDetail(attributeId)
            .then((response) => {
                console.log(response.data);
                setAttributeValues(response.data);
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
            })
    }, [attributeId]);

    const handleCancelEditAttributeValue = () => {
        setAttributeValueId("")
        setShowEditAttributeValue(false);
    }

    const handleEditAttributeValue = (attributeId: string) => {
        setAttributeValueId(attributeId);
        setShowEditAttributeValue(true);
    }

    const handleAddAttributeValue = () => {
        setShowEditAttributeValue(true);
    }

    const handleDeleteAttributeValue = (attributeId: string) => {
        setAttributeValueId(attributeId);
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
                return "Color";
            case 2:
                return "Material";
            case 3:
                return "Brand";
            case 4:
                return "Size";
            case 5:
                return "Category";
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
                <td>{attributeValue.sizeCode}</td>
                <td>
                    <button onClick={() => { handleEditAttributeValue(attributeValue.id) }} className="edit-button">Edit</button>
                    <button onClick={() => { handleDeleteAttributeValue(attributeValue.id) }} className="delete-button">Delete</button>
                </td>
            </tr>
        );
    });

    return (
        <OverLay className="disabled-padding">
            <div className="attribute-detail-management">
                <button onClick={handleCancelEditAttribute} className="back-button">
                    <FontAwesomeIcon icon={faArrowLeft} />
                    Back
                </button>
                <div className="content-header-container">
                    <div className="content-header-left">
                        <h1 className={"primary-label"}>Attribute Detail Management</h1>
                        <p className={"primary-description"}>Add, edit, or delete attribute values</p>
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
                        <button onClick={handleAddAttributeValue} className="add-button">Add values</button>
                    </div>
                </div>
                <form className={"form"}>
                    <div className={"form-input-container"}>
                        <label className={"form-input-lable lable-attribute-name attribute-name-lable"}>Attribute Name</label>
                        <div className={"group-input-attribute-name"}>
                            <input
                                type={"text"}
                                disabled={true}
                                className={"form-input"}
                                placeholder={"Enter your attribute name"}
                                value={getAttributeName(attributeId)}
                            />
                        </div>
                    </div>
                </form>
                <div className="table-container">
                    <table className="table id-column">
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
                    </table>
                </div>
                {
                    attributeValues.length > 0 && <Pagination currentPage={pagination?.offset} totalPages={pagination?.total} onPageChange={handleChangePage} />
                }
                {
                    (attributeValues.length === 0 || globalError) && !isLoading && <NoData message={globalError} />
                }
                <RePulseLoader loading={isLoading} />
                {
                    showEditAttributeValue &&
                    <EditAttributeValue
                        attributeDetailId={attributeValueId}
                        hideOverlay={handleCancelEditAttributeValue}
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
            </div>
        </OverLay>
    );
};