import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { OverLay } from "../../../../compoments/OverLay/OverLay";

interface EditAttributeValueProps {
    hideOverlay: (e: React.MouseEvent<HTMLButtonElement>) => void;
    attributeDetailId: string;
}

export const EditAttributeValue: React.FC<EditAttributeValueProps> = ({ hideOverlay, attributeDetailId }) => {
    return (
        <OverLay>
            <div className="edit-attribute-value">
                <button onClick={hideOverlay} className="button-close">
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <h1 className={"primary-label form-lable"}>{`${attributeDetailId ? "Edit" : "Add"} Value`}</h1>
                <form className={"form"}>
                    <div className={"form-input-container"}>
                        <label className={"form-lable"}>Value Name</label>
                        <input
                            type={"text"}
                            className={"form-input"}
                            placeholder={"Enter Value name"}
                        />
                    </div>
                    <div className={"form-input-container"}>
                        <label className={"form-lable"}>Description</label>
                        <input
                            type={"text"}
                            className={"form-input"}
                            placeholder={"Enter your description"}
                        />
                    </div>
                    <div className={"form-input-container"}>
                        <label className={"form-lable"}>Code</label>
                        <input
                            type={"text"}
                            className={"form-input"}
                            placeholder={"Enter your code"}
                        />
                    </div>
                    <button className="form-input-submit">Save</button>
                </form>
            </div>
        </OverLay>
    );
}