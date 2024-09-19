import React from 'react'
import { Product } from '../../../interface/Product'
import './ProductManagement.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { OverLayProductManagement } from './compoments/OverLayProductManagement';
import { OverLayProductDetails } from './compoments/OverLayProductDetails';
import { Button, Form, Table } from 'react-bootstrap';


export const ProductManagement: React.FC = () => {

    const [showOverLay, setShowOverLay] = React.useState<boolean>(false)
    const [showOverLayDetails, setShowOverLayDetails] = React.useState<boolean>(false)
    const [productId, setProductId] = React.useState<number>(0)
    const [products, setProducts] = React.useState<Product[]>([
        {
            name: 'Product 1',
            sku: 'SKU 1',
            price: 1000,
            category: 'Category 1',
            quantity: 10,
            supplier: 'Supplier 1'
        },
        {
            name: 'Product 2',
            sku: 'SKU 2',
            price: 2000,
            category: 'Category 2',
            quantity: 20,
            supplier: 'Supplier 2'
        },
        {
            name: 'Product 3',
            sku: 'SKU 3',
            price: 3000,
            category: 'Category 3',
            quantity: 30,
            supplier: 'Supplier 3'
        }
    ])

    const handleAddProduct = () => {
        setShowOverLay(true)
    }

    const handleCloseAddProduct = () => {
        setShowOverLay(false)
    }

    const handleDetailProduct = () => {
        setShowOverLayDetails(true)
    }

    const handleColseDetailProduct = () => {
        setShowOverLayDetails(false)
    }

    const renderProducts = products.map((product, index) => {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.sku}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.supplier}</td>
                <td>
                    <div className='d-flex gap-2'>
                        <Button
                            onClick={() => {
                                handleDetailProduct()
                            }}
                            variant="primary"
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />
                        </Button>
                        <Button
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
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h2 className={"h2 fw-bold"}>Product Management</h2>
                    <p className={"h6"}>Manage your products here</p>
                </div>
                <div className="d-flex flex-row gap-5">
                    <div className="d-flex flex-row gap-2">
                        <Form.Control className="p-2" type="text" placeholder="Search" />
                        <Button variant="secondary">
                            <FontAwesomeIcon icon={faSearch} />
                        </Button>
                    </div>
                    <Button onClick={handleAddProduct} variant="success fw-bold">NEW +</Button>
                </div>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>SKU</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Supplier</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {renderProducts}
                </tbody>
            </Table>
            {showOverLay && <OverLayProductManagement handleClose={handleCloseAddProduct} />}
            {showOverLayDetails && <OverLayProductDetails handleClose={handleColseDetailProduct} productId={productId} />}
        </div>
    )
}
