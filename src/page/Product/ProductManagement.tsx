import React from 'react'
import { Product } from '../../interface/Entity/Product'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPencilAlt, faTrash} from '@fortawesome/free-solid-svg-icons';
import { Button, Table } from 'react-bootstrap';
import GetProducts from '../../services/Product/GetProducts';
import PaginationType from '../../interface/Pagination';
import Pagination from '../../compoments/Pagination/Pagination';
import ModelConfirmDeleteProduct from './compoments/ModelConfirmDeleteProduct';
import FormEditProduct from './compoments/FormEditProduct';
import {NoData} from "../../compoments/NoData/NoData";
import {useDispatchMessage} from "../../Context/ContextMessage";
import ActionTypeEnum from "../../enum/ActionTypeEnum";


export const ProductManagement: React.FC = () => {

    const dispatch = useDispatchMessage();
    const [showFormEdit, setShowFormEdit] = React.useState<boolean>(false)
    const [showModelConfirmDelete, setShowModelConfirmDelete] = React.useState<boolean>(false)
    const [productId, setProductId] = React.useState<string>("")
    const [products, setProducts] = React.useState<Product[]>([])
    const [pagination, setPagination] = React.useState<PaginationType>({
        limit: 10,
        offset: 1,
        totalPage: 0,
        totalElementOfPage: 0
    })

    const updateProducts = (response: Product[]) => {
        setProducts(response)
    }

    const updatePagination = (response: PaginationType) => {
        setPagination(response)
    }

    const handleChangePage = (page: number) => {
        GetProducts({ offset: page })
            .then((response) => {
                setProducts(response.data)
                setPagination({
                    limit: response.limit,
                    offset: response.offset,
                    totalPage: response.totalPage,
                    totalElementOfPage: response.totalElementOfPage
                })
            }).catch((error) => {
                console.error(error)
                dispatch({type: ActionTypeEnum.ERROR, message: error.message})
            })
    }

    React.useEffect(() => {
        GetProducts()
            .then((response) => {
                setProducts(response.data)
                setPagination({
                    limit: response.limit,
                    offset: response.offset,
                    totalPage: response.totalPage,
                    totalElementOfPage: response.totalElementOfPage
                })
            }).catch((error) => {
                console.error(error)
                dispatch({type: ActionTypeEnum.ERROR, message: error.message})
            })
    }, [dispatch])

    const renderProducts = products.map((product, index) => {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.productCode}</td>
                <td>{product.unit}</td>
                <td>
                    <div className='d-flex gap-2'>
                        <Button
                            onClick={() => {
                                setProductId(product.id)
                                setShowFormEdit(true)
                            }}
                            variant="primary"
                        >
                            <FontAwesomeIcon icon={faPencilAlt}/>
                        </Button>
                        <Button
                            onClick={() => {
                                setProductId(product.id)
                                setShowModelConfirmDelete(true)
                            }}
                            variant="danger"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </div>
                </td>
            </tr>
        )
    })

    return (
        <div className={"position-relative h-100 w-100"}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h2 className={"h2 fw-bold"}>Product Management</h2>
                    <p className={"h6"}>Manage your products here</p>
                </div>
                <div className="d-flex flex-row gap-3">
                    <Button onClick={() => setShowFormEdit(true)} variant="info text-light fw-bold">+ NEW</Button>
                </div>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Code</th>
                        <th>Unit</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {renderProducts}
                </tbody>
            </Table>
            {
                products.length > 0 ?
                    <Pagination
                        currentPage={pagination.offset}
                        totalPages={pagination?.totalPage}
                        onPageChange={handleChangePage}
                    />
                    :
                    <NoData />
            }
            {
                showFormEdit &&
                <FormEditProduct
                    handleClose={() => {
                        setShowFormEdit(false)
                        setProductId("")
                    }}
                    productId={productId}
                />
            }
            {
                showModelConfirmDelete &&
                <ModelConfirmDeleteProduct
                    productId={productId}
                    closeModelConfirmDelete={() => setShowModelConfirmDelete(false)}
                    updateProducts={updateProducts}
                    updatePagination={updatePagination}
                />
            }
        </div>
    )
}
