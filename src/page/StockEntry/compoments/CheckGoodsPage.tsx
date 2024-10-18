import React from "react";
import { FormControl, FormSelect, Table } from "react-bootstrap";
import GetStockEntryById from "../../../services/StockEntry/GetStockEntryById";
import GetProfile from "../../../util/GetProfile";
import { Profile } from "../../../interface/Profile";
import { ReceiveItem } from "../../../interface/Entity/StockEntry";
import { useDispatchMessage } from "../../../Context/ContextMessage";
import ActionTypeEnum from "../../../enum/ActionTypeEnum";
import CreateReceiveCheck from "../../../services/StockEntry/CreateReceiveCheck";
import GetReceiveCheckByStockEntryId from "../../../services/StockEntry/GetReceiveCheckByStockEntryId";
import UpdateReceiveCheck from "../../../services/StockEntry/UpdateReceiveCheck";

interface CheckGoodsPageProps {
    stockEntryId: string;
    currentStep: number;
    nextCurrentStep: () => void;
    backCurrentStep: () => void;
}

interface ReceiveItemCheckGoods {
    receiveItemId: string;
    productName: string;
    orderQuantity: number;
    receiveQuantity: number;
    missingQuantity: number;
    damagedQuantity: number;
    status: string;
    serverity: string;
}

const CheckGoodsPage: React.FC<CheckGoodsPageProps> = (props) => {

    const dispatch = useDispatchMessage();
    const profile = GetProfile() as Profile;
    const [receiveCheckId, setReceiveCheckId] = React.useState<string>("");
    const [createDate, setCreateDate] = React.useState(new Date().toISOString().split("T")[0]);
    const [description, setDescription] = React.useState("");
    const [productItems, setProductItems] = React.useState<ReceiveItemCheckGoods[]>([]);
    const [supplier, setSupplier] = React.useState<string>("");

    React.useEffect(() => {
        GetStockEntryById(props.stockEntryId)
            .then((res) => {
                setProductItems(res.receiveItems.map((item: ReceiveItem) => {
                    return {
                        receiveItemId: item.id,
                        productName: item.product.name,
                        orderQuantity: item.quantity,
                        receiveQuantity: 0,
                        missingQuantity: 0,
                        damagedQuantity: 0,
                        status: "",
                        serverity: ""
                    }
                }));
                setSupplier(res.supplier.id);
            })
            .catch((err) => {
                dispatch({ type: ActionTypeEnum.ERROR, message: err.message })
            });
    }, [props.stockEntryId, dispatch]);

    React.useEffect(() => {
        GetReceiveCheckByStockEntryId(props.stockEntryId)
            .then((res) => {
                if (res !== null) {
                    setReceiveCheckId(res.id);
                    setCreateDate(res.receiveDate);
                    setDescription(res.description);
                    setProductItems(res.checkItems.map((item) => {
                        return {
                            receiveItemId: item.id,
                            productName: item.product.name,
                            orderQuantity: item.receiveQuantity,
                            receiveQuantity: parseInt(item.receiveQuantity + ""),
                            missingQuantity: parseInt(item.missingQuantity + ""),
                            damagedQuantity: parseInt(item.damagedQuantity + ""),
                            status: item.status,
                            serverity: item.serverity
                        };
                    }));
                } else {
                    setReceiveCheckId("");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [props.stockEntryId, dispatch]);

    const renderProductItems = productItems.map((item, index) => {
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{item.productName}</td>
                <td style={{ textAlign: "center" }}>{item.orderQuantity}</td>
                <td>
                    <FormControl
                        type="number"
                        placeholder="Receive Quantity..."
                        className="p-3"
                        value={item.receiveQuantity}
                        onChange={(e) => {
                            const newProductItems = [...productItems];
                            newProductItems[index].receiveQuantity = parseInt(e.target.value);
                            setProductItems(newProductItems);
                        }}
                    />
                </td>
                <td>
                    <FormControl
                        type="number"
                        placeholder="Missing Quantity..."
                        className="p-3"
                        value={item.missingQuantity}
                        onChange={(e) => {
                            const newProductItems = [...productItems];
                            newProductItems[index].missingQuantity = parseInt(e.target.value);
                            setProductItems(newProductItems);
                        }}
                    />
                </td>
                <td>
                    <FormControl
                        type="number"
                        placeholder="Damaged Quantity..."
                        className="p-3"
                        value={item.damagedQuantity}
                        onChange={(e) => {
                            const newProductItems = [...productItems];
                            newProductItems[index].damagedQuantity = parseInt(e.target.value);
                            setProductItems(newProductItems);
                        }}
                    />
                </td>
                <td>
                    <FormSelect
                        value={item.status}
                        onChange={(e) => {
                            const newProductItems = [...productItems];
                            newProductItems[index].status = e.target.value;
                            setProductItems(newProductItems);
                        }}
                        className="p-3"
                    >
                        <option value="">Choose...</option>
                        <option value="PENDING">PENDING</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                        <option value="PROCESS">PROCESS</option>
                    </FormSelect>
                </td>
                <td>
                    <FormSelect
                        value={item.serverity}
                        onChange={(e) => {
                            const newProductItems = [...productItems];
                            newProductItems[index].serverity = e.target.value;
                            setProductItems(newProductItems);
                        }}
                        className="p-3"
                    >
                        <option value="">Choose...</option>
                        <option value="critical">critical</option>
                        <option value="high">high</option>
                        <option value="medium">medium</option>
                        <option value="low">low</option>
                        <option value="normal">normal</option>
                    </FormSelect>
                </td>
            </tr>
        )
    });

    const validateForm = () => {
        if (productItems.some((item) => item.receiveQuantity === 0)) {
            dispatch({ type: ActionTypeEnum.ERROR, message: "Receive quantity must be greater than 0." });
            return false;
        }
        if (productItems.some((item) => item.status === "")) {
            dispatch({ type: ActionTypeEnum.ERROR, message: "Status must be choose." });
            return false;
        }
        if (productItems.some((item) => item.serverity === "")) {
            dispatch({ type: ActionTypeEnum.ERROR, message: "Serverity must be choose." });
            return false;
        }
        return true;
    }

    const handleSubmit = () => {
        if (validateForm()) {
            if (!receiveCheckId) {
                CreateReceiveCheck({
                    receiveId: props.stockEntryId,
                    receiveDate: createDate,
                    description: description,
                    receiveBy: profile.fullName,
                    supplierId: supplier,
                    receiveItems: productItems.map((item) => {
                        return {
                            receiveItemId: item.receiveItemId,
                            receiveQuantity: item.receiveQuantity.toString(),
                            missingQuantity: item.missingQuantity.toString(),
                            damagedQuantity: item.damagedQuantity.toString(),
                            status: item.status,
                            notes: "",
                            serverity: item.serverity,
                            actionTaken: ""
                        }
                    })
                })
                    .then(() => {
                        dispatch({ type: ActionTypeEnum.SUCCESS, message: "Check goods successfully." });
                        props.nextCurrentStep();
                    })
                    .catch((err) => {
                        dispatch({
                            type: ActionTypeEnum.ERROR, message: err.message
                        })
                    }
                    );
            } else {
                UpdateReceiveCheck(receiveCheckId, {
                    receiveDate: createDate,
                    description: description,
                    receiveBy: profile.fullName,
                    supplierId: supplier,
                    receiveItems: productItems.map((item) => {
                        return {
                            id: item.receiveItemId,
                            receiveQuantity: parseInt(item.receiveQuantity.toString(), 10),
                            missingQuantity: parseInt(item.missingQuantity.toString(), 10),
                            damagedQuantity: parseInt(item.damagedQuantity.toString(), 10),
                            status: item.status,
                            notes: "",
                            serverity: item.serverity,
                            actionTaken: ""
                        }
                    })
                })
                    .then(() => {
                        dispatch({ type: ActionTypeEnum.SUCCESS, message: "Check goods successfully." });
                        props.nextCurrentStep();
                    })
                    .catch((err) => {
                        dispatch({
                            type: ActionTypeEnum.ERROR, message: err.message
                        })
                    });
            }
        }
    }

    return (
        <div>
            <h3>Step 1: Check Goods</h3>
            <div className="d-flex flex-row gap-3 mb-3">
                <FormControl
                    disabled
                    type="text"
                    placeholder="Create by..."
                    className="p-3"
                    value={profile.fullName}
                />
                <FormControl
                    type="date"
                    placeholder="Create date..."
                    className="p-3"
                    value={createDate}
                    onChange={(e) => setCreateDate(e.target.value)}
                />
            </div>
            <textarea
                placeholder="Description..."
                className="form-control mt-3 mb-3"
                style={{ height: '100px' }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Item Name</th>
                        <th>Order Quantity</th>
                        <th>Receive Quantity</th>
                        <th>Missing Quantity</th>
                        <th>Damaged Quantity</th>
                        <th>Status</th>
                        <th>Serverity</th>
                    </tr>
                </thead>
                <tbody>
                    {renderProductItems}
                </tbody>
            </Table>
            <div className="d-flex justify-content-between mt-4">
                <button
                    className="btn btn-secondary"
                    onClick={() => props.backCurrentStep()}
                    disabled={props.currentStep === 1}
                >
                    Back
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() => handleSubmit()}
                    disabled={props.currentStep === 3}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default CheckGoodsPage;