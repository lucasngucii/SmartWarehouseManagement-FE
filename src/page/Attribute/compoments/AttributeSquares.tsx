import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette, faTag, faRuler, faList, faCubes } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";

interface Attribute {
    id: number;
    name: string;
    icon: any;
}

interface AttributeSquaresProps {
    editAttribute: (attributeId: number) => void;
}

const AttributeSquares: React.FC<AttributeSquaresProps> = ({ editAttribute }) => {
    const attributes: Attribute[] = [
        { id: 1, name: 'Color', icon: faPalette },
        { id: 2, name: 'Model', icon: faCubes },
        { id: 3, name: 'Brand', icon: faTag },
        { id: 4, name: 'Size', icon: faRuler },
        { id: 5, name: 'Category', icon: faList },
    ];

    return (
        <div className={"d-flex flex-row flex-wrap justify-content-center align-items-center gap-5 py-5"}>
            {attributes.map((attribute) => (
                <Button
                    key={attribute.id}
                    onClick={() => editAttribute(attribute.id)}
                    className="square d-flex flex-column align-items-center justify-content-center gap-3 shadow"
                    style={{
                        width: "200px",
                        height: "200px",
                        cursor: "pointer",
                    }}
                    variant={"light"}
                >
                    <FontAwesomeIcon icon={attribute.icon} size={"2x"} />
                    <span>{attribute.name}</span>
                </Button>
            ))}
        </div>
    );
};

export default AttributeSquares;
