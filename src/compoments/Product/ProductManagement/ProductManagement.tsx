import React from 'react'
import { OverLay } from '../../OverLay/OverLay'
import { Product } from '../../../interface/Product'
import './ProductManagement.css'
import Select, { ActionMeta, MultiValue, SingleValue, StylesConfig } from "react-select";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

interface OptionType {
    value: string;
    label: string;
}

interface SKUFormData {
    productType?: OptionType | null;
    color?: OptionType | null;
    size?: OptionType | null;
    material?: OptionType | null;
    brand?: OptionType | null;
    dimension?: Dimension;
}

interface Dimension {
    length: number;
    width: number;
    height: number;
}

interface OverLayProductManagementProps {
    handleClose: () => void;
}

const OverLayProductManagement: React.FC<OverLayProductManagementProps> = ({ handleClose }) => {

    const listOptions = {
        categories: [
            { value: "Category 1", label: "Category 1" },
            { value: "Category 2", label: "Category 2" },
            { value: "Category 3", label: "Category 3" },
        ],
        color: [
            { value: "Black", label: "Black" },
            { value: "Red", label: "Red" },
            { value: "Blue", label: "Blue" },
        ],
        supplier: [
            { value: "Supplier 1", label: "Supplier 1" },
            { value: "Supplier 2", label: "Supplier 2" },
            { value: "Supplier 3", label: "Supplier 3" },
        ],
        brand: [
            { value: "Brand 1", label: "Brand 1" },
            { value: "Brand 2", label: "Brand 2" },
            { value: "Brand 3", label: "Brand 3" },
        ],
        material: [
            { value: "Material 1", label: "Material 1" },
            { value: "Material 2", label: "Material 2" },
            { value: "Material 3", label: "Material 3" },
        ],
        size: [
            { value: "Size 1", label: "Size 1" },
            { value: "Size 2", label: "Size 2" },
            { value: "Size 3", label: "Size 3" },
        ],
    }
    const [formData, setFormData] = React.useState<SKUFormData>();
    const handleSelectChangeGroup = (newValue: SingleValue<OptionType> | MultiValue<OptionType>, actionMeta: ActionMeta<OptionType>) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [actionMeta.name as string]: newValue
        }));
    };
    const customSelectStyles: StylesConfig<any, false> = {
        control: (base) => ({
            ...base,
            width: "100%",
            height: "45px",
            borderRadius: "4px",
            border: "1px solid #d1d1d1",
            fontSize: "14px",
        }),
    };
    return (
        <OverLay>
            <div className='modal-product-detail'>
                <button onClick={handleClose} className="button-close">
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <p className='primary-label form-lable'>NEW PRODUCT</p>
                <form className='form'>
                    <div className='form-input-container'>
                        <label htmlFor='product-name' className='form-input-lable'>Product Name</label>
                        <input className='form-input' type='text' id='product-name' placeholder='Enter Product Name' />
                    </div>
                    <div className='form-input-container'>
                        <label className='form-input-lable'>category</label>
                        <Select
                            styles={customSelectStyles}
                            value={formData?.productType}
                            onChange={(valueSelect, actionMeta) => handleSelectChangeGroup(valueSelect, {
                                ...actionMeta,
                                name: "categories"
                            })}
                            options={listOptions.categories}
                        />
                    </div>
                    <div className={"form-input-container"}>
                        <label htmlFor={"color"}>Color:</label>
                        <Select
                            styles={customSelectStyles}
                            value={formData?.color}
                            onChange={(valueSelect, actionMeta) => handleSelectChangeGroup(valueSelect, {
                                ...actionMeta,
                                name: "color"
                            })}
                            options={listOptions.color}
                        />
                    </div>
                    <div className={"form-input-container"}>
                        <label htmlFor={"color"}>Size:</label>
                        <Select
                            styles={customSelectStyles}
                            value={formData?.size}
                            onChange={(valueSelect, actionMeta) => handleSelectChangeGroup(valueSelect, {
                                ...actionMeta,
                                name: "size"
                            })}
                            options={listOptions.size}
                        />
                    </div>
                    <div className={"form-input-container"}>
                        <label htmlFor={"material"}>Material:</label>
                        <Select
                            styles={customSelectStyles}
                            value={formData?.material}
                            onChange={(valueSelect, actionMeta) => handleSelectChangeGroup(valueSelect, {
                                ...actionMeta,
                                name: "material"
                            })}
                            options={listOptions.material}
                        />
                    </div>
                    <div className={"form-input-container"}>
                        <label htmlFor={"brand"}>Brand:</label>
                        <Select
                            styles={customSelectStyles}
                            value={formData?.brand}
                            onChange={(valueSelect, actionMeta) => handleSelectChangeGroup(valueSelect, {
                                ...actionMeta,
                                name: "brand"
                            })}
                            options={listOptions.brand}
                        />
                    </div>
                    <div className={"form-input-container"}>
                        <label htmlFor={"color"}>Suplier:</label>
                        <Select
                            styles={customSelectStyles}
                            value={formData?.color}
                            onChange={(valueSelect, actionMeta) => handleSelectChangeGroup(valueSelect, {
                                ...actionMeta,
                                name: "supblier"
                            })}
                            options={listOptions.supplier}
                        />
                    </div>
                    <div className={"form-input-container"}>
                        <label htmlFor={"color"}>Dimension:</label>
                        <div className={"dimension-container"}>
                            <input type="number" placeholder="Length" className="dimension-input" />
                            <span>x</span>
                            <input type="number" placeholder="Width" className="dimension-input" />
                            <span>x</span>
                            <input type="number" placeholder="Height" className="dimension-input" />
                        </div>
                    </div>
                    <button className='form-input-submit'>Add Product</button>
                </form>
            </div>
        </OverLay>
    )
}

export const ProductManagement: React.FC = () => {

    const [showOverLay, setShowOverLay] = React.useState<boolean>(false)
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

    const handleClose = () => {
        setShowOverLay(false)
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
                    <button className='view-button'>Details</button>
                    <button className='edit-button'>Edit</button>
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
            {showOverLay && <OverLayProductManagement handleClose={handleClose} />}
        </div>
    )
}
