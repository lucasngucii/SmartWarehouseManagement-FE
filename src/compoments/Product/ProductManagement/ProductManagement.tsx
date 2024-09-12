import React from 'react'
import { Product } from '../../../interface/Product'
import './ProductManagement.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { OverLayProductManagement } from './compoments/OverLayProductManagement';
import { OverLayProductDetails } from './compoments/OverLayProductDetails';


export const ProductManagement: React.FC = () => {

    const [showOverLay, setShowOverLay] = React.useState<boolean>(false)
    const [showOverLayDetails, setShowOverLayDetails] = React.useState<boolean>(true)
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
                    <button onClick={handleDetailProduct} className='view-button'>Details</button>
                    <button className='delete-button'>Delete</button>
                </td>
            </tr>
        )
    })

    return (
        <div>
            <div className="content-header-container">
                <div className="content-header-left">
                    <h2 className='primary-label'>Product Management</h2>
                    <p className='primary-description'>Manage your products here</p>
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
                    <button onClick={handleAddProduct} className='add-button margin-top-button'>Add Product</button>
                </div>
            </div>
            <div className="table-container">
                <table className='table id-column'>
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
                </table>
            </div>
            {showOverLay && <OverLayProductManagement handleClose={handleCloseAddProduct} />}
            {showOverLayDetails && <OverLayProductDetails handleClose={handleColseDetailProduct} productId={productId} />}
        </div>
    )
}
