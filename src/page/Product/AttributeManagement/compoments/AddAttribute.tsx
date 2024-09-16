import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {OverLay} from "../../../../compoments/OverLay/OverLay";

interface AddAttributeProps {
    hideOverlay: () => void;
}

export const AddAttribute: React.FC<AddAttributeProps> = ({ hideOverlay }) => {
    return (
        <OverLay>
            <div className="add-attribute-container">
                <button onClick={hideOverlay} className="button-close">
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <h1 className={"primary-label form-lable"}>NEW ATTRIBUTE</h1>
                <form className={"form"}>
                    <div className={"form-input-container"}>
                        <input
                            type={"text"}
                            className={"form-input"}
                            placeholder={"Enter your attribute name"}
                        />
                    </div>
                    <button className="form-input-submit">Add Attribute</button>
                </form>
            </div>
        </OverLay>
    );
}