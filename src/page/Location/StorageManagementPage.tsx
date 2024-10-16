import React from "react";
import './css/ShelfDetails.css';
import Shelf from "../../interface/Entity/Shelf";
import PaginationType from "../../interface/Pagination";
import GetShelfs from "../../services/Location/GetShelfs";
import { useDispatchMessage } from "../../Context/ContextMessage";
import ActionTypeEnum from "../../enum/ActionTypeEnum";
import SpinnerLoading from "../../compoments/Loading/SpinnerLoading";
import Pagination from "../../compoments/Pagination/Pagination";
import { NoData } from "../../compoments/NoData/NoData";
import './css/StorageManagementPage.css'
import ShelfDetails from "./Compoments/ShelfDetails";

const LocationPage: React.FC = () => {

    const dispatch = useDispatchMessage();
    const [shelfId, setShelfId] = React.useState<string>('')
    const [showShelfDetails, setShowShelfDetails] = React.useState<boolean>(false)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [shelfList, setShelfList] = React.useState<Shelf[]>([]);
    const [pagination, setPagination] = React.useState<PaginationType>({
        limit: 10,
        offset: 1,
        totalPage: 0,
        totalElementOfPage: 0
    })

    React.useEffect(() => {
        setIsLoading(true)
        GetShelfs()
            .then((response) => {
                setShelfList(response.data)
                setPagination({
                    limit: Number(response.limit),
                    offset: Number(response.offset),
                    totalPage: response.totalPage,
                    totalElementOfPage: response.totalElementOfPage
                })
            }).catch((error) => {
                console.error(error)
                dispatch({ type: ActionTypeEnum.ERROR, message: error.message })
            }).finally(() => {
                setIsLoading(false)
            })
    }, [dispatch])

    React.useEffect(() => {
        const id = setTimeout(() => {
            setIsLoading(true)
            GetShelfs({ offset: pagination.offset })
                .then((response) => {
                    setShelfList(response.data)
                    setPagination({
                        limit: Number(response.limit),
                        offset: Number(response.offset),
                        totalPage: response.totalPage,
                        totalElementOfPage: response.totalElementOfPage
                    })
                }).catch((error) => {
                    console.error(error)
                    dispatch({ type: ActionTypeEnum.ERROR, message: error.message })
                }).finally(() => {
                    setIsLoading(false)
                })
        }, 500)

        return () => clearTimeout(id)

    }, [dispatch, pagination.offset])

    const handleChangePage = (page: number) => {
        setPagination({ ...pagination, offset: page })
    }

    const renderShelfs = shelfList.map((shelf: Shelf, index: number) => {
        return (
            <div
                onClick={() => {
                    setShelfId(shelf.id)
                    setShowShelfDetails(true)
                }}
                key={index}
                className="btn btn-light shadow shelf d-flex justify-content-center align-items-center"
            >
                <div className="shelf-content">
                    <div className="h4">{shelf.name}</div>
                    <div className="shelf-description">Max Column: {shelf.maxColumns}</div>
                    <div className="shelf-description">Max Level: {shelf.maxLevels}</div>
                </div>
            </div>
        )
    })

    return (
        <div className={"position-relative h-100 w-100"}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h2 className={"h2 fw-bold"}>Shelf Management</h2>
                    <p className={"h6"}>Manager your shelf here</p>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="shelf-container shadow rounded">
                    {renderShelfs}
                </div>
            </div>
            {
                isLoading && <SpinnerLoading />
            }
            {
                (shelfList.length > 0) ?
                    <Pagination
                        currentPage={pagination.offset}
                        totalPages={pagination?.totalPage}
                        onPageChange={handleChangePage}
                    />
                    :
                    (!isLoading && <NoData />) || null
            }
            {
                showShelfDetails && shelfId &&
                <ShelfDetails
                    shelfId={shelfId}
                    close={() => {
                        setShelfId('')
                        setShowShelfDetails(false)
                    }}
                />
            }
        </div>
    );
}


export default LocationPage;