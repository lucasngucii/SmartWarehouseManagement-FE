import {Button, FormControl, FormSelect, Table} from "react-bootstrap";
import React from "react";
import Pagination from "../../compoments/Pagination/Pagination";
import {NoData} from "../../compoments/NoData/NoData";
import SpinnerLoading from "../../compoments/Loading/SpinnerLoading";
import PaginationType from "../../interface/Pagination";
import ReceiveHeader from "../../interface/Entity/ReceiveHeader";
import GetStockEntries from "../../services/StockEntry/GetStockEntries";
import {useDispatchMessage} from "../../Context/ContextMessage";
import ActionTypeEnum from "../../enum/ActionTypeEnum";
import FormEditStockEntry from "./compoments/FormEditStockEntry";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUndo} from "@fortawesome/free-solid-svg-icons";

const TypeFind = ["Receive Code", "Receive By"];

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
    const [showFormEdit, setShowFormEdit] = React.useState<boolean>(false);

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
                        setShowFormEdit(true);
                    }} variant="info text-light fw-bold">+ NEW</Button>
                </div>
            </div>
            <div className={"d-flex flex-row gap-5 mb-3 justify-content-end"}>
                <div className={"d-flex flex-row gap-2"}>
                    <div style={{width: "150px"}}>
                        <FormSelect>
                            {
                                TypeFind.map((type, index) => {
                                    return <option key={index} value={type}>{type}</option>
                                })
                            }
                        </FormSelect>
                    </div>
                    <FormControl type="text" placeholder="Search name..." style={{width: "350px"}}/>
                    <Button onClick={() => {
                    }}>
                        <FontAwesomeIcon icon={faUndo}/>
                    </Button>
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
            {
                showFormEdit &&
                <FormEditStockEntry
                    handleClose={() => {
                        setShowFormEdit(false)
                    }}
                />
            }
        </div>
    );
}

export default StockEntry;