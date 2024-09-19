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
import { faArrowLeft, faPencilAlt, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import ModelConfirmDeleteAttributeValue from "./ModelConfirmDeleteAttributeValue";
import { Button, Form, Table } from "react-bootstrap";

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
            <div className="attribute-detail-management">
                <button onClick={handleCancelEditAttribute} className="back-button">
                    <FontAwesomeIcon icon={faArrowLeft} />
                    Back
                </button>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h2 className={"h2 fw-bold"}>Attribute Detail Management</h2>
                        <p className={"h6"}>Add, edit, or delete attribute values</p>
                    </div>
                    <div className="d-flex flex-row gap-5">
                        <div className="d-flex flex-row gap-2">
                            <Form.Control className="p-2" type="search" placeholder="Search" />
                            <Button variant="secondary">
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                        </div>
                        <Button onClick={handleAddAttributeValue} variant="success fw-bold">NEW +</Button>
                    </div>
                </div>
                <div className="mb-3">
                    <Form.Group>
                        <Form.Label>Attribute Name</Form.Label>
                        <Form.Control
                            className="p-2"
                            type="search"
                            disabled={true}
                            placeholder={"Enter your attribute name"}
                            value={getAttributeName(attributeId)}
                        />
                    </Form.Group>
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
                    (attributeValues.length === 0 || globalError) && !isLoading && <NoData message={globalError} />
                }
                <RePulseLoader loading={isLoading} />
                {
                    showEditAttributeValue &&
                    <EditAttributeValue
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
            </div>
        </OverLay>
    );
};