import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button, Table } from 'react-bootstrap';
import GetSuppliers from '../../services/Supplier/GetSuppliers';
import Supplier from '../../interface/Entity/Supplier';
import PaginationType from '../../interface/Pagination';
import { NoData } from '../../compoments/NoData/NoData';
import Pagination from '../../compoments/Pagination/Pagination';
import ModelConfirmDeleteSupplier from './compoments/ModelConfirmDeleteSupplier';
import FormEditSupplier from './compoments/FormEditSupplier';
import SpinnerLoading from "../../compoments/Loading/SpinnerLoading";
import {useDispatchMessage} from "../../Context/ContextMessage";
import ActionTypeEnum from "../../enum/ActionTypeEnum";

export const SupplierManagement: React.FC = () => {

    const dispatch = useDispatchMessage();
    const [suppliers, setSuppliers] = React.useState<Supplier[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [showDetail, setShowDetail] = React.useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);
    const [supplierId, setSupplierId] = React.useState<string>("");
    const [pagination, setPagination] = React.useState<PaginationType>({
        limit: 0,
        offset: 0,
        totalPage: 0,
        totalElementOfPage: 0
    });

    React.useEffect(() => {
        setIsLoading(true);
        GetSuppliers()
            .then((response) => {
                setSuppliers(response.data);
                setPagination({
                    limit: response.limit,
                    offset: response.offset,
                    totalPage: response.totalPage,
                    totalElementOfPage: response.totalElementOfPage
                });
            }).catch((error) => {
                console.error(error);
                dispatch({type: ActionTypeEnum.ERROR, message: error.message});
            }).finally(() => {
                setIsLoading(false);
            });
    }, [dispatch]);

    React.useEffect(() => {
        const id = setTimeout(() => {
            setIsLoading(true);
            GetSuppliers({ offset: pagination.offset })
                .then((response) => {
                    setSuppliers(response.data);
                    setPagination({
                        limit: response.limit,
                        offset: response.offset,
                        totalPage: response.totalPage,
                        totalElementOfPage: response.totalElementOfPage
                    });
                }).catch((error) => {
                console.error(error);
                dispatch({type: ActionTypeEnum.ERROR, message: error.message});
            }).finally(() => {
                setIsLoading(false);
            });
        }, 1000);
        return () => clearTimeout(id);
    }, [pagination.offset, dispatch]);

    const handleDelete = (id: string) => {
        setSupplierId(id);
        setShowConfirmDelete(true);
    };

    const handleChangePage = (page: number) => {
        setPagination({
            ...pagination,
            offset: page
        });
    }

    const updateSuppliers = (suppliers: Supplier[]) => {
        setSuppliers(suppliers);
    }

    const updateSPagination = (pagination: PaginationType) => {
        setPagination(pagination);
    }

    const supplierList = suppliers.map((supplier, index) => {
        return (
            <tr key={supplier.id}>
                <td>{index + 1}</td>
                <td>{supplier.name}</td>
                <td>{supplier.description}</td>
                <td>{supplier.phone}</td>
                <td>{supplier.supplierCode}</td>
                <td>{supplier.address}</td>
                <td>{supplier.email}</td>
                <td>
                    <div className="d-flex flex-row gap-2">
                        <Button
                            onClick={() => {
                                setSupplierId(supplier.id);
                                setShowDetail(true);
                            }}
                            variant="primary"
                        >
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </Button>
                        <Button
                            onClick={() => handleDelete(supplier!.id)}
                            variant="danger"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </div>
                </td>
            </tr>
        );
    }
    );

    return (
        <div className={"position-relative w-100 h-100"}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h2 className={"h2 fw-bold"}>Supplier Management</h2>
                    <p className={"h6"}>Manage your suppliers here</p>
                </div>
                <div className="d-flex flex-row gap-5">
                    <Button onClick={() => { setShowDetail(true) }} variant="info fw-bold text-light">+ NEW</Button>
                </div>
            </div>
            <Table striped hover bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Phone</th>
                        <th>Supplier Code</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {supplierList}
                </tbody>
            </Table>
            {
                suppliers.length > 0 && <Pagination currentPage={pagination?.offset} totalPages={pagination?.totalPage} onPageChange={handleChangePage} />
            }
            {
                (suppliers.length === 0) && !isLoading && <NoData />
            }
            {
                showConfirmDelete &&
                <ModelConfirmDeleteSupplier
                    supplierId={supplierId}
                    closeModelConfirmDelete={() => {
                        setShowConfirmDelete(false)
                    }}
                    updateSuppliers={updateSuppliers}
                    updatePagination={updateSPagination}
                />
            }
            {
                showDetail &&
                <FormEditSupplier
                    updatePagination={updateSPagination}
                    updateSuppliers={updateSuppliers}
                    supplierId={supplierId}
                    hideOverlay={() => {
                        setShowDetail(false);
                        setSupplierId("");
                    }} />
            }
            {
                isLoading && <SpinnerLoading />
            }
        </div>
    );
};
