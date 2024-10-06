import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Container, Form, FormGroup, Nav, Row, Table } from "react-bootstrap";
import { OverLay } from "../../../compoments/OverLay/OverLay";
import Select from "react-select";
import GetProfile from "../../../util/GetProfile";
import OptionType from "../../../interface/OptionType";
import GetSuppliersByName from "../../../services/Supplier/GetSuppliersByName";
import { useDispatchMessage } from "../../../Context/ContextMessage";
import ActionTypeEnum from "../../../enum/ActionTypeEnum";
import GetSupplierById from "../../../services/Supplier/GetSupplierById";
import ProductHeader from "../../../interface/Entity/ProductHeader";
import GetProductsBySupplier from "../../../services/Product/GetProductsBySupplier";
import { NoData } from "../../../compoments/NoData/NoData";
import SpinnerLoading from "../../../compoments/Loading/SpinnerLoading";
import CreateStockEntry from "../../../services/StockEntry/CreateStockEntry";
import SpinnerLoadingOverLayer from "../../../compoments/Loading/SpinnerLoadingOverLay";

interface FormEditStockEntryProps {
    handleClose: () => void;
}

interface ProductItem {
    productId: string;
    name: string;
    quantity: number;
    price: number;
}

const FormEditStockEntry: React.FC<FormEditStockEntryProps> = ({ handleClose }) => {

    const profile = GetProfile();
    const dispatch = useDispatchMessage();

    const [supplierName, setSupplierName] = React.useState("");
    const [suppliers, setSuppliers] = React.useState<OptionType[]>([]);
    const [supplierSelected, setSupplierSelected] = React.useState<OptionType | null>(null);
    const [loadingSuppliers, setLoadingSuppliers] = React.useState(false);

    const [address, setAddress] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [description, setDescription] = React.useState("");

    const [products, setProducts] = React.useState<ProductHeader[]>([]);
    const [productItems, setProductItems] = React.useState<ProductItem[]>([]);
    const [loadingProducts, setLoadingProducts] = React.useState(false);
    const [showProductList, setShowProductList] = React.useState(true);

    const [loadingSubmit, setLoadingSubmit] = React.useState(false);


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
                    dispatch({ type: ActionTypeEnum.ERROR, message: err.message });
                }).finally(() => {
                    setLoadingSuppliers(false);
                })
        }, 500)

        return () => clearTimeout(id);
    }, [supplierName, dispatch])

    React.useEffect(() => {
        if (supplierSelected) {
            setLoadingProducts(true);
            GetProductsBySupplier(supplierSelected.value)
                .then((res) => {
                    console.log(res);
                    setProducts(res.data);
                }).catch((err) => {
                    dispatch({ type: ActionTypeEnum.ERROR, message: err.message });
                }).finally(() => {
                    setLoadingProducts(false);
                })
        }
    }, [supplierSelected, dispatch])

    React.useEffect(() => {
        if (supplierSelected) {
            GetSupplierById(supplierSelected.value)
                .then((res) => {
                    setAddress(res.address);
                    setPhoneNumber(res.phone);
                    setProductItems([]);
                }).catch((err) => {
                    dispatch({ type: ActionTypeEnum.ERROR, message: err.message });
                })
        }
    }, [supplierSelected, dispatch])

    const handleAddItem = (productId: string) => {
        const product = products.find((product) => product.id === productId);
        if (product) {
            setProductItems((preValue) => {
                const isExist = preValue.find((item) => item.productId === productId);
                if (isExist) {
                    return preValue.map((item) => {
                        if (item.productId === productId) {
                            return {
                                ...item,
                                quantity: item.quantity + 1
                            }
                        }
                        return item;
                    })
                }
                return [...preValue, {
                    productId: productId,
                    name: product.name,
                    quantity: 1,
                    price: 1
                }]
            })
        }
    }

    const handleDeleteItem = (productId: string) => {
        setProductItems(productItems.filter((product) => product.productId !== productId));
    }

    const listProductItems = () => {
        return productItems.map((product, index) => (
            <tr className={"text-center"}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td style={{ verticalAlign: "middle" }}>
                    <Form.Control
                        type="number"
                        value={product.quantity}
                        step={0.01}
                        min={0}
                        defaultValue={0}
                        style={{ width: "150px", margin: "0 auto" }}
                        onChange={(e) => {
                            let value = parseFloat(e.target.value);
                            if (e.target.value === "" || isNaN(value)) {
                                value = 0;
                            }
                            setProductItems(productItems.map((item) => {
                                if (item.productId === product.productId) {
                                    return {
                                        ...item,
                                        quantity: value
                                    };
                                }
                                return item;
                            }));
                        }}
                    />
                </td>
                <td style={{ verticalAlign: "middle" }}>
                    <Form.Control
                        type="number"
                        value={product.price}
                        style={{ width: "150px", margin: "0 auto" }}
                        step={0.01}
                        min={0}
                        defaultValue={0}
                        onChange={(e) => {
                            let value = parseFloat(e.target.value);
                            if (e.target.value === "" || isNaN(value)) {
                                value = 0;
                            }
                            setProductItems(productItems.map((item) => {
                                if (item.productId === product.productId) {
                                    return {
                                        ...item,
                                        price: value
                                    };
                                }
                                return item;
                            }));
                        }}
                    />
                </td>
                <td style={{ minWidth: "150px" }}>
                    ${(product.price * product.quantity).toFixed(2) || 0}
                </td>
                <td>
                    <button onClick={() => { handleDeleteItem(product.productId) }} className={"btn btn-danger"}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </td>
            </tr>

        ))
    }

    const listProducts = () => {
        return products.map((product, index) => (
            <tr key={product.id} className={"text-center"} style={{ verticalAlign: "middle" }}>
                <td>{index + 1}</td>
                <td>
                    <img src="https://via.placeholder.com/50" alt="product" className={"img-fluid"}
                        width={80} height={80} />
                </td>
                <td>{product.name}</td>
                <td>
                    {
                        productItems.find((item) => item.productId === product.id) ? (
                            <span className={"badge bg-success py-2"}>Added</span>
                        ) : (
                            <button onClick={() => { handleAddItem(product.id) }} className={"btn btn-primary"}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        )
                    }
                </td>
            </tr>
        ))
    }

    const handleSubmit = () => {

        if (supplierSelected === null) {
            dispatch({ type: ActionTypeEnum.ERROR, message: "Please select a supplier." });
            return;
        }

        if (productItems.length === 0) {
            dispatch({ type: ActionTypeEnum.ERROR, message: "Please select a product." });
            return;
        }

        if (productItems.some((item) => item.quantity === 0 || item.price === 0)) {
            dispatch({ type: ActionTypeEnum.ERROR, message: "Quantity and price must be greater than 0." });
            return;
        }

        setLoadingSubmit(true);
        CreateStockEntry({
            receiveDate: new Date().toISOString().split("T")[0],
            receiveBy: profile?.fullName || "",
            description: description,
            supplierId: supplierSelected.value,
            receiveItems: productItems.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price
            }))
        }).then(() => {
            dispatch({ type: ActionTypeEnum.SUCCESS, message: "Create stock entry successfully." });
            handleClose();
        }).catch((err) => {
            dispatch({ type: ActionTypeEnum.ERROR, message: err.message });
        }).finally(() => {
            setLoadingSubmit(false);
        })

    }

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
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <h2 className="fw-bold mb-0">New Stock Entry</h2>
                    </div>
                    <div>
                        <Button
                            onClick={() => {
                                handleSubmit();
                            }}
                            variant="primary"
                            className="px-4"
                        >
                            Create
                        </Button>
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
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormGroup>
                </Row>
                <Row className={"p-3"}>
                    <div>
                        <div className="d-flex justify-content-around w-100 gap-2">

                        </div>
                        <div className={"border p-2"} style={{ flex: 1 }}>
                            <div className={"mb-3"}>
                                <div className="d-flex justify-content-around gap-2">
                                    <Button
                                        onClick={() => setShowProductList(true)}
                                        variant={`${showProductList ? "primary" : "outline-primary"}`}
                                        className={"w-100 p-2"}
                                    >
                                        Supplier Product List
                                    </Button>
                                    <Button
                                        onClick={() => setShowProductList(false)}
                                        variant={`${!showProductList ? "primary" : "outline-primary"}`}
                                        className={"w-100 p-2"}
                                    >
                                        Stock Entry Items
                                    </Button>
                                </div>
                            </div>
                            {
                                showProductList ? (
                                    <>
                                        <Table striped bordered hover responsive>
                                            <thead>
                                                <tr style={{ textAlign: "center" }}>
                                                    <th>#</th>
                                                    <th>Image</th>
                                                    <th>Product Name</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {listProducts()}
                                            </tbody>
                                        </Table>
                                        {
                                            products.length === 0 && !loadingProducts && (
                                                <NoData />
                                            )
                                        }
                                        {
                                            loadingProducts && (
                                                <SpinnerLoading />
                                            )
                                        }
                                    </>
                                ) : (
                                    <>
                                        <Table striped bordered hover responsive>
                                            <thead>
                                                <tr style={{ textAlign: "center" }}>
                                                    <th>#</th>
                                                    <th>Product Name</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                    <th>Total</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {listProductItems()}
                                            </tbody>
                                        </Table>
                                        {
                                            productItems.length === 0 && !loadingProducts && (
                                                <NoData />
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                    </div>
                </Row>
                {
                    loadingSubmit &&
                    <SpinnerLoadingOverLayer />
                }
            </Container>
        </OverLay>
    );
};

export default FormEditStockEntry;