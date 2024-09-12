import React from "react";
import { OverLay } from "../../../OverLay/OverLay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface FormSupplierProps {
    handleClose: () => void;
    supplierId: number | null;
}

interface FormDataTypes {
    supplierName: string;
    description: string;
    phone: string;
    sublierCode: string;
    address: string;
    email: string;
}

export const FormSublier: React.FC<FormSupplierProps> = ({ supplierId, handleClose }) => {

    const [formData, setFormData] = React.useState<FormDataTypes>({
        supplierName: '',
        description: '',
        phone: '',
        sublierCode: '',
        address: '',
        email: '',
    });

    const handleChageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleAdd = () => {
        console.log('Add supplier');
    }

    const handleUpdate = () => {
        console.log('Update supplier');
    }

    return (
        <OverLay>
            <div className="supplier-management-overlay">
                <button onClick={handleClose} className="button-close">
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <p className="primary-label form-lable">{supplierId ? "UPDATE SUPLIER" : "NEW SUBLIER"}</p>
                <form className={"form"}>
                    <div className={"form-input-container"}>
                        <label htmlFor={"supplier-name"} className="form-label">Supplier Name</label>
                        <input
                            id={"supplier-name"}
                            type="text"
                            placeholder="Enter supplier name"
                            className="form-input"
                            required
                            value={formData.supplierName}
                            name='supplierName'
                            onChange={handleChageInput}
                        />
                    </div>
                    <div className={"form-input-container"}>
                        <label htmlFor={"description"} className="form-label">Description</label>
                        <input
                            id={"description"}
                            type="text"
                            placeholder="Enter your description"
                            className="form-input"
                            required
                            name='description'
                            value={formData.description}
                            onChange={handleChageInput}
                        />
                    </div>
                    <div className={"form-input-container"}>
                        <label htmlFor={"phone"} className="form-label">Phone</label>
                        <input
                            id={"phone"}
                            type="phone"
                            placeholder="Enter your supplier phone"
                            className="form-input"
                            required
                            name='phone'
                            value={formData.phone}
                            onChange={handleChageInput}
                        />
                    </div>
                    <div className={"form-input-container"}>
                        <label htmlFor={"address"} className="form-label">Address</label>
                        <input
                            id={"address"}
                            type="address"
                            placeholder="Enter your supplier address"
                            className="form-input"
                            required
                            name='address'
                            value={formData.address}
                            onChange={handleChageInput}
                        />
                    </div>
                    <div className={"form-input-container"}>
                        <label htmlFor={"email"} className="form-label">Email</label>
                        <input
                            id={"email"}
                            type="email"
                            placeholder="Enter your supplier email"
                            className="form-input"
                            required
                            name='email'
                            value={formData.email}
                            onChange={handleChageInput}
                        />
                    </div>
                    <button
                        onClick={supplierId ? handleUpdate : handleAdd}
                        className="form-input-submit"
                    >
                        {supplierId ? "Update Suplier" : "Add Supplier"}
                    </button>
                </form>
            </div>
        </OverLay>
    )
}