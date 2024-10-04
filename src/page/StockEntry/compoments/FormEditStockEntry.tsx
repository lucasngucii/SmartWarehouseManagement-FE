import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Col, Container, Form, FormGroup, Row, Table} from "react-bootstrap";
import {OverLay} from "../../../compoments/OverLay/OverLay";
import Select from "react-select";
import GetProfile from "../../../util/GetProfile";
import OptionType from "../../../interface/OptionType";
import GetSuppliersByName from "../../../services/Supplier/GetSuppliersByName";
import {useDispatchMessage} from "../../../Context/ContextMessage";
import ActionTypeEnum from "../../../enum/ActionTypeEnum";
import GetSupplierById from "../../../services/Supplier/GetSupplierById";

interface FormEditStockEntryProps {
    handleClose: () => void;
}

const FormEditStockEntry: React.FC<FormEditStockEntryProps> = ({handleClose}) => {

    const profile = GetProfile();
    const dispatch = useDispatchMessage();

    const [supplierName, setSupplierName] = React.useState("");
    const [suppliers, setSuppliers] = React.useState<OptionType[]>([]);
    const [supplierSelected, setSupplierSelected] = React.useState<OptionType | null>(null);
    const [loadingSuppliers, setLoadingSuppliers] = React.useState(false);

    const [address, setAddress] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");

    React.useEffect(() => {
        const id = setTimeout(() => {
            setLoadingSuppliers(true);
            GetSuppliersByName(supplierName)
                .then((res) => {
                    setSuppliers(res.map((supplier) => ({
                        value: supplier.id,
                        label: supplier.name,
                    })));
                }).catch((err) => {
                dispatch({type: ActionTypeEnum.ERROR, message: err.message});
            }).finally(() => {
                setLoadingSuppliers(false);
            })
        }, 500)

        return () => clearTimeout(id);
    }, [supplierName, dispatch])

    React.useEffect(() => {
        if (supplierSelected) {
            GetSupplierById(supplierSelected.value)
                .then((res) => {
                    setAddress(res.address);
                    setPhoneNumber(res.phone);
                }).catch((err) => {
                dispatch({type: ActionTypeEnum.ERROR, message: err.message});
            })
        }
    })

    return (
        <OverLay className="disabled-padding bg-light p-4">
            <Container fluid className="h-100 w-100 position-relative shadow p-3 rounded">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex flex-row align-items-center gap-2">
                        <button
                            onClick={() => {
                                handleClose()
                            }}
                            className="btn fs-3 px-3 text-primary"
                        >
                            <FontAwesomeIcon icon={faChevronLeft}/>
                        </button>
                        <h2 className="fw-bold mb-0">New Stock Entry</h2>
                    </div>
                </div>
                <Row className={"p-3"}>
                    <Col>
                        <FormGroup>
                            <Form.Label>Employee Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter employee name"
                                value={profile?.fullName || ""}
                                className={"form-control py-3"}
                                disabled={true}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Form.Label>Create Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={new Date().toISOString().split("T")[0]}
                                className={"form-control py-3"}
                                disabled
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className={"p-3"}>
                    <Col>
                        <FormGroup>
                            <Form.Label>Supplier Name</Form.Label>
                            <Select
                                placeholder="Enter name supplier"
                                isClearable
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        padding: "0.5rem 0px",
                                    }),
                                }}
                                onInputChange={setSupplierName}
                                value={supplierSelected}
                                onChange={(value) => setSupplierSelected(value as OptionType)}
                                options={suppliers}
                                required
                                isLoading={loadingSuppliers}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="phone"
                                placeholder="Phone number supplier"
                                className={"form-control py-3"}
                                disabled
                                value={phoneNumber}
                            />
                        </FormGroup>
                    </Col>
                    <FormGroup className={"mt-3"}>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="phone"
                            placeholder="Phone number supplier"
                            className={"form-control py-3"}
                            disabled
                            value={address}
                        />
                    </FormGroup>
                    <FormGroup className={"mt-3"}>
                        <Form.Label>Description</Form.Label>
                        <textarea
                            className={"form-control py-3"}
                            placeholder="Enter description..."
                            rows={4}
                        />
                    </FormGroup>
                </Row>
                <Row className={"p-3"}>
                    <div className={"d-flex flex-row justify-content-between gap-2"}>
                    <div className={"border p-2"} style={{flex: 1}}>
                            <h5 className={"fw-bold p-3"}>Stock Entry Items</h5>
                            <Table striped bordered hover responsive>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className={"text-center"}>
                                    <td>1</td>
                                    <td>Product 1</td>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            value={1}
                                            className={"form-control"}
                                            style={{width: "100px"}}
                                        />
                                    </td>
                                    <td>$10</td>
                                    <td>$100</td>
                                    <td>
                                        <button className={"btn btn-danger"}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                                <tr className={"text-center"}>
                                    <td>1</td>
                                    <td>Product 1</td>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            value={1}
                                            className={"form-control"}
                                            style={{width: "100px"}}
                                        />
                                    </td>
                                    <td>$10</td>
                                    <td>$100</td>
                                    <td>
                                        <button className={"btn btn-danger"}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                                <tr className={"text-center"} style={{verticalAlign: "middle"}}>
                                    <td>1</td>
                                    <td>Product 1</td>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            value={1}
                                            className={"form-control"}
                                            style={{width: "100px"}}
                                        />
                                    </td>
                                    <td>$10</td>
                                    <td>$100</td>
                                    <td>
                                        <button className={"btn btn-danger"}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                                <tr className={"text-center"} style={{verticalAlign: "middle"}}>
                                    <td>1</td>
                                    <td>Product 1</td>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            value={1}
                                            className={"form-control"}
                                            style={{width: "100px"}}
                                        />
                                    </td>
                                    <td>$10</td>
                                    <td>$100</td>
                                    <td>
                                        <button className={"btn btn-danger"}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                                <tr className={"text-center"} style={{verticalAlign: "middle"}}>
                                    <td>1</td>
                                    <td>Product 1</td>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            value={1}
                                            className={"form-control"}
                                            style={{width: "100px"}}
                                        />
                                    </td>
                                    <td>$10</td>
                                    <td>$100</td>
                                    <td>
                                        <button className={"btn btn-danger"}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div className={"border p-2"} style={{flex: 1}}>
                            <div className={"mb-3"}>
                                <h5 className={"fw-bold p-3"}>Supplier Product List</h5>
                                <div>
                                    <Form.Control
                                        type="text"
                                        placeholder="Search product name"
                                        className={"form-control p-3"}
                                    />
                                </div>
                            </div>
                            <Table striped bordered hover responsive>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className={"text-center"} style={{verticalAlign: "middle"}}>
                                    <td>1</td>
                                    <td>
                                        <img src="https://via.placeholder.com/50" alt="product" className={"img-fluid"}
                                             width={80} height={80}/>
                                    </td>
                                    <td>OMO</td>
                                    <td>$10</td>
                                    <td>
                                        <button className={"btn btn-success"}>
                                            <FontAwesomeIcon icon={faPlus}/>
                                        </button>
                                    </td>
                                </tr>
                                <tr className={"text-center"} style={{verticalAlign: "middle"}}>
                                    <td>1</td>
                                    <td>
                                        <img src="https://via.placeholder.com/50" alt="product" className={"img-fluid"}
                                             width={80} height={80}/>
                                    </td>
                                    <td>OMO</td>
                                    <td>$10</td>
                                    <td>
                                        <button className={"btn btn-success"}>
                                            <FontAwesomeIcon icon={faPlus}/>
                                        </button>
                                    </td>
                                </tr>
                                <tr className={"text-center"} style={{verticalAlign: "middle"}}>
                                    <td>1</td>
                                    <td>
                                        <img src="https://via.placeholder.com/50" alt="product" className={"img-fluid"}
                                             width={80} height={80}/>
                                    </td>
                                    <td>OMO</td>
                                    <td>$10</td>
                                    <td>
                                        <button className={"btn btn-success"}>
                                            <FontAwesomeIcon icon={faPlus}/>
                                        </button>
                                    </td>
                                </tr>
                                <tr className={"text-center"} style={{verticalAlign: "middle"}}>
                                    <td>1</td>
                                    <td>
                                        <img src="https://via.placeholder.com/50" alt="product" className={"img-fluid"}
                                             width={80} height={80}/>
                                    </td>
                                    <td>OMO</td>
                                    <td>$10</td>
                                    <td>
                                        <button className={"btn btn-success"}>
                                            <FontAwesomeIcon icon={faPlus}/>
                                        </button>
                                    </td>
                                </tr>
                                <tr className={"text-center"} style={{verticalAlign: "middle"}}>
                                    <td>1</td>
                                    <td>
                                        <img src="https://via.placeholder.com/50" alt="product" className={"img-fluid"}
                                             width={80} height={80}/>
                                    </td>
                                    <td>OMO</td>
                                    <td>$10</td>
                                    <td>
                                        <button className={"btn btn-success"}>
                                            <FontAwesomeIcon icon={faPlus}/>
                                        </button>
                                    </td>
                                </tr>
                                <tr className={"text-center"} style={{verticalAlign: "middle"}}>
                                    <td>1</td>
                                    <td>
                                        <img src="https://via.placeholder.com/50" alt="product" className={"img-fluid"}
                                             width={80} height={80}/>
                                    </td>
                                    <td>OMO</td>
                                    <td>$10</td>
                                    <td>
                                        <button className={"btn btn-success"}>
                                            <FontAwesomeIcon icon={faPlus}/>
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Row>
            </Container>
        </OverLay>
    );
};

export default FormEditStockEntry;