import React from "react";
import { OverLay } from "../../../compoments/OverLay/OverLay"
import { CloseButton } from "react-bootstrap";
import GetLocationByShelfIdt from "../../../services/Location/GetLocationByShelfIdt";
import { useDispatchMessage } from "../../../Context/ContextMessage";
import ActionTypeEnum from "../../../enum/ActionTypeEnum";
import Location from "../../../interface/Entity/Location";

interface ShelfDetailsProps {
    shelfId: string;
    close: () => void;
}

const ShelfDetails: React.FC<ShelfDetailsProps> = (props) => {

    const dispatch = useDispatchMessage();
    const [locations, setLocations] = React.useState<Location[]>([]);
    const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const [startX, setStartX] = React.useState(0);
    const [startY, setStartY] = React.useState(0);
    const [scrollLeft, setScrollLeft] = React.useState(0);
    const [scrollTop, setScrollTop] = React.useState(0);

    React.useEffect(() => {
        GetLocationByShelfIdt(props.shelfId)
            .then((response) => {
                setLocations(response)
            }).catch((error) => {
                console.error(error)
                dispatch({ type: ActionTypeEnum.ERROR, message: error.message })
            })
    }, [dispatch, props.shelfId]);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (scrollContainerRef.current) {
            setIsDragging(true);
            setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
            setStartY(e.pageY - scrollContainerRef.current.offsetTop);
            setScrollLeft(scrollContainerRef.current.scrollLeft);
            setScrollTop(scrollContainerRef.current.scrollTop);
            scrollContainerRef.current.style.cursor = 'grabbing';
        }
    };

    const handleMouseLeave = () => {
        if (scrollContainerRef.current) {
            setIsDragging(false);
            scrollContainerRef.current.style.cursor = 'grab';
        }
    };

    const handleMouseUp = () => {
        if (scrollContainerRef.current) {
            setIsDragging(false);
            scrollContainerRef.current.style.cursor = 'grab';
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const y = e.pageY - scrollContainerRef.current.offsetTop;
        const walkX = (x - startX) * 2;
        const walkY = (y - startY) * 2;
        scrollContainerRef.current.scrollLeft = scrollLeft - walkX;
        scrollContainerRef.current.scrollTop = scrollTop - walkY;
    };

    const renderLocation = locations.map((location, index) => {
        return (
            <div
                key={index}
                className="btn btn-light shadow shelf-item d-flex justify-content-center align-items-center"
            >
                <div>
                    <div className="h4">{location.locationCode}</div>
                </div>
            </div>
        )
    })

    return (
        <OverLay className="disabled-padding">
            <div
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                className="shelf-details-container bg-light rounded shadow"
            >
                <CloseButton
                    onClick={() => { props.close() }}
                    className="position-fixed bg-light"
                    style={{ top: "15px", right: "15px" }}
                />
                {renderLocation}
            </div>
        </OverLay>
    )
}

export default ShelfDetails;