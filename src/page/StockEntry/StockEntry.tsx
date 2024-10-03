import {Button, Table} from "react-bootstrap";
import React from "react";
import Pagination from "../../compoments/Pagination/Pagination";
import {NoData} from "../../compoments/NoData/NoData";
import SpinnerLoading from "../../compoments/Loading/SpinnerLoading";
import PaginationType from "../../interface/Pagination";
import ReceiveHeader from "../../interface/Entity/ReceiveHeader";
import GetStockEntries from "../../services/StockEntry/GetStockEntries";
import {useDispatchMessage} from "../../Context/ContextMessage";
import ActionTypeEnum from "../../enum/ActionTypeEnum";

const StockEntry: React.FC = () => {

    const dispatch = useDispatchMessage();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [stockEntry, setStockEntry] = React.useState<ReceiveHeader[]>([]);
    const [pagination, setPagination] = React.useState<PaginationType>({
        totalPage: 0,
        limit: 0,
        offset: 0,
        totalElementOfPage: 0
    });

    React.useEffect(() => {
        setIsLoading(true);
        GetStockEntries()
            .then((res) => {
                setStockEntry(res.data);
                setPagination({
                    totalPage: res.totalPage,
                    limit: res.limit,
                    offset: res.offset,
                    totalElementOfPage: res.totalElementOfPage
                });
            }).catch((err) => {
                dispatch({type: ActionTypeEnum.ERROR, message: err.message});
            }).finally(() => {
                setIsLoading(false);
        })
    }, [dispatch]);

    React.useEffect(() => {

    }, [pagination.offset])

    const handleChangePage = (page: number) => {
        setPagination({...pagination, offset: page});
    }

    return (
        <div className={"w-100 h-100"}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h2 className={"h2 fw-bold"}>Stock Entry Management</h2>
                    <p className={"h6"}>Manage stock entry and their status</p>
                </div>
                <div className="d-flex flex-row gap-3">
                    <Button onClick={() => {

                    }} variant="info text-light fw-bold">+ NEW</Button>
                </div>
            </div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Receive Code</th>
                    <th>Receive Date</th>
                    <th>Receive By</th>
                    <th>Status</th>
                    <th>Description</th>
                    <th>Total Amount</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
            </Table>
            {
                stockEntry.length > 0 && <Pagination currentPage={pagination?.offset} totalPages={pagination?.totalPage}
                                                     onPageChange={handleChangePage}/>
            }
            {
                (stockEntry.length === 0) && !isLoading && <NoData/>
            }
            {
                isLoading && <SpinnerLoading/>
            }
        </div>
    );
}

export default StockEntry;