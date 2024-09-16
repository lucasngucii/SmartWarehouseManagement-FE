import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {OverLay} from "../../../../compoments/OverLay/OverLay";

interface EditAttributeValueProps {
    hideOverlay: (e: React.MouseEvent<HTMLButtonElement>) => void;
    attributeDetailId: number;
}

export const EditAttributeValue: React.FC<EditAttributeValueProps> = ({ hideOverlay, attributeDetailId }) => {
    return (
        <OverLay>
            <div className="edit-attribute-value">
                <button onClick={hideOverlay} className="button-close">
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <h1 className={"primary-label form-lable"}>{`${attributeDetailId ? "Edit" : "Add"} Attribute Value`}</h1>
                <form className={"form"}>
                    <div className={"form-input-container"}>
                        <input
                            type={"text"}
                            className={"form-input"}
                            placeholder={"Enter your attribute value"}
                        />
                    </div>
                    <button className="form-input-submit">Save</button>
                </form>
            </div>
        </OverLay>
    );
}