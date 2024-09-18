import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { OverLay } from "../../../../compoments/OverLay/OverLay";
import React from "react";
import AddAttributeValue from "../../../../services/attribute/AddAttributeValue";
import Attribute from "../../../../interface/Attribute";
import GetAttributeDetail from "../../../../services/attribute/GetAttributeDetail";
import PaginationType from "../../../../interface/Pagination";
import AttributeDetailType from "../../../../interface/AttributeDetail";

interface EditAttributeValueProps {
    hideOverlay: (e: React.MouseEvent<HTMLButtonElement>) => void;
    attributeDetailId: string;
    attributeId: number;
    updateAttributeValues: (data: AttributeDetailType[]) => void;
    updatePagination: (data: PaginationType) => void;
}

export const EditAttributeValue: React.FC<EditAttributeValueProps> = ({ hideOverlay, attributeDetailId, attributeId, updateAttributeValues, updatePagination }) => {

    const [formData, setFormData] = React.useState<Attribute>({
        name: "",
        description: "",
        sizeCode: ""
    });
    const [loading, setLoading] = React.useState(false);
    const [globalError, setGlobalError] = React.useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);
        AddAttributeValue(attributeId, formData)
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
                hideOverlay(e);
            }).catch((error) => {
                console.error(error);
                setGlobalError(error.message);
            }).finally(() => {
                setLoading(false);
            })
    }

    return (
        <OverLay>
            <div className="edit-attribute-value">
                <button onClick={hideOverlay} className="button-close">
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <h1 className={"primary-label form-lable"}>{`${attributeDetailId ? "Edit" : "Add"} Value`}</h1>
                <span className="primary-message-error text-center">{globalError}</span>
                <form className={"form"}>
                    <div className={"form-input-container"}>
                        <label className={"form-lable"}>Value Name</label>
                        <input
                            type={"text"}
                            className={"form-input"}
                            placeholder={"Enter Value name"}
                            name={"name"}
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={"form-input-container"}>
                        <label className={"form-lable"}>Description</label>
                        <input
                            type={"text"}
                            className={"form-input"}
                            placeholder={"Enter your description"}
                            name={"description"}
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={"form-input-container"}>
                        <label className={"form-lable"}>Code</label>
                        <input
                            type={"text"}
                            className={"form-input"}
                            placeholder={"Enter your code"}
                            name={"sizeCode"}
                            value={formData.sizeCode}
                            onChange={handleChange}
                        />
                    </div>
                    <button disabled={loading} onClick={handleSubmit} className="form-input-submit">{loading ? "Loading..." : (attributeDetailId ? "Update" : "Save")}</button>
                </form>
            </div>
        </OverLay>
    );
}