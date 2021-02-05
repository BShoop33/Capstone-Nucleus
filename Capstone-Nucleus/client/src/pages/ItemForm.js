import React, { useContext, useEffect, useRef, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { Button, Col, Form, Dropdown, DropdownButton, Row } from "react-bootstrap"
import { ToastContainer, toast } from 'react-toastify';
import { UserProfileContext } from "../providers/UserProfileProvider";
import 'react-toastify/dist/ReactToastify.css';
import "./Inventory.css";

const ItemForm = () => {

    const history = useHistory();

    const { getToken } = useContext(UserProfileContext);

    const hiddenFileInput = useRef(null);

    const [value, setValue] = useState('');
    const [item, setNewItem] = useState({});
    const [ItemPicture, setImage] = useState('')
    const [loading, setLoading] = useState(false)

    const [DepartmentId, setItemLocation] = useState(0);
    const [vendorName, setvendorName] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemSKU, setItemSKU] = useState('');
    const [UnitPrice, setItemUnitPrice] = useState(0);
    const [Quantity, setItemQuantity] = useState(0);
    const [editCheck, setEditCheck] = useState(0)
    const [currentItem, setCurrentItem] = useState({});

    const { itemId } = useParams();

    const vendorNameEdit = useRef();
    const itemNameEdit = useRef();
    const itemSKUEdit = useRef();
    const unitPriceEdit = useRef();
    const quantityEdit = useRef();

    // const pictureAdd = useRef();
    // const departmentAdd = useRef();
    // const vendorNameAdd = useRef();
    // const itemNameAdd = useRef();
    // const itemSKUAdd = useRef();
    // const unitPriceAdd = useRef();
    // const quantityAdd = useRef();

    // const showToast1 = () => {
    //     toast.error("Item Location is a required field")
    // };

    // const showToast2 = () => {
    //     toast.error("Vendor Name is a required field")
    // };

    // const showToast3 = () => {
    //     toast.error("Item Name is a required field")
    // };

    // const showToast4 = () => {
    //     toast.error("Item SKU is a required field")
    // };

    // const showToast5 = () => {
    //     toast.error("Unit Price is a required field")
    // };

    // const showToast6 = () => {
    //     toast.error("Quantity is a required field")
    // };

    useEffect(() => {
        if (itemId !== undefined) {
            fetch(`/api/item/${itemId}`)
                .then((res) => res.json())
                .then((item) => {
                    setCurrentItem(item);
                });
        }
    }, [itemId]);

    useEffect(() => {
        if (editCheck !== 0) {
            console.log(editCheck)
            if (editCheck !== 0 && editCheck !== -1) {
                editUniqueItem(editCheck);
            } else {

                // if (departmentAdd.current.value === "") {
                //     showToast1();
                // }
                // else if (vendorName.current.value === "") {
                //     showToast2();
                // }
                // else if (itemName.current.value === "") {
                //     showToast3();
                // }
                // else if (itemSKU.current.value === "") {
                //     showToast4();
                // }
                // else if (UnitPrice.current.value === "") {
                //     showToast5();
                // }
                // else if (Quantity.current.value === "") {
                //     showToast6();
                // }
                // else {
                //adding item with no previous entries

                const item = {
                    ItemPicture,
                    DepartmentId,
                    vendorName,
                    itemName,
                    itemSKU,
                    UnitPrice,
                    Quantity
                };
                getToken().then((token) => {
                    fetch("/api/item/additem", {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(item),
                    }).then(() => {
                        setEditCheck(0)
                        history.push(`/`);
                    })
                }
                );
            }
        }
        // }
    }, [DepartmentId, editCheck, getToken, history, itemName, ItemPicture, itemSKU, Quantity, UnitPrice, vendorName]);

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'ToolMeOnce')
        setLoading(true)
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dstfvbrwf/image/upload',
            {
                method: 'POST',
                body: data
            }
        )
        const file = await res.json()
        setImage(file.secure_url)
        setLoading(false)
    }

    const getItems = () => {
        getToken().then((token) =>
            fetch(`/api/item`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((res) => {
                    return res
                })
                .then((items) => {
                    let itemCheck = 0
                    items.map(item => {
                        if (itemSKU === item.itemSKU && DepartmentId === item.departmentId && vendorName === item.vendorName) {
                            let total = Quantity + item.quantity
                            setItemQuantity(total)
                            itemCheck = item.id
                        }
                    })
                    if (itemCheck !== 0) {
                        setEditCheck(itemCheck)
                    } else {
                        setEditCheck(-1)
                    }
                })
        );
    };


    //adding item with previous entries
    const editUniqueItem = (id) => {
        const item = {
            Id: id,
            ItemPicture,
            DepartmentId,
            vendorName,
            itemName,
            itemSKU,
            UnitPrice,
            Quantity
        };
        getToken().then((token) =>
            fetch(`/api/item/edititem/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(item),
            }).then(() => {
                history.push(`/`);
            })
        );
    };

    //actual edit item
    const editItem = () => {
        const item = {
            Id: itemId,
            ItemPicture: "",
            DepartmentId: 1,
            vendorName: vendorNameEdit.current.value,
            itemName: itemNameEdit.current.value,
            itemSKU: itemSKUEdit.current.value,
            UnitPrice: unitPriceEdit.current.value,
            Quantity: quantityEdit.current.value
        };
        getToken().then((token) =>
            fetch(`/api/item/edititem/${itemId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(item),
            }).then(() => {
                history.push(`/`);
            })
        );
    };

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const handleSelect = (e) => {
        setValue(e)
    }


    console.log(currentItem.department)



    if (itemId) {
        return (
            <>
                <h1 className="AddItemHeader my-5">Edit Item</h1>
                <hr />
                <Row>
                    <Col>
                        <Row style={{ height: 50 }}></Row>
                        <Row className="justify-content-md-left" style={{ marginTop: -15, marginLeft: 300 }}>
                            <div className="NewToolPicture">
                                {loading ? (
                                    <h3 className="NewToolPictureLoading">Loading . . .</h3>
                                ) : (
                                        ItemPicture === "" ?
                                            <img alt="Logo" src="\Images\NucleusLogo.png" style={{ width: 400, height: 300 }} />
                                            :
                                            <img
                                                alt="Preview"
                                                className="imageUploadBoard"
                                                src={itemId ? currentItem.ItemPicture : ""}
                                                style={{ width: 500, height: 400 }}
                                            />
                                    )
                                }
                                <h1 className="UploadTitle my-5">Upload Image</h1>
                                <Button id="imageUploadButton" onClick={handleClick}>Upload a file
                                </Button>
                                <input
                                    name="file"
                                    onChange={uploadImage}
                                    placeholder="Upload an image"
                                    style={{ display: 'none' }}
                                    type="file"
                                    ref={hiddenFileInput}
                                />
                            </div>
                        </Row>
                    </Col>

                    <Col id="textInputs" className="ml-5">
                        <p id="required" className="mb-4"><i>* Required</i></p>
                        <Row style={{ marginTop: -15 }} className="justify-content-md-left mb-4 text-left">
                            <label
                                className="LocationTitle"
                                id="input"
                                style={{ width: 200, height: 5 }}
                            >Item Location
                            </label>
                            <Form inline>
                                <DropdownButton
                                    id="itemFormDropdown"
                                    style={{ width: 400, height: 35 }}
                                    title={"Select Location"} //currentItem ? currentItem.departmentId : 
                                    onSelect={handleSelect}
                                    defaultValue={itemId ? currentItem.name : 0}
                                >
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(1)} eventKey="Administrative Services">Administrative Services</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(2)} eventKey="Anesthetics">Anesthetics</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(3)} eventKey="Billing">Billing</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(4)} eventKey="Cardiology">Cardiology</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(5)} eventKey="Dermatology">Dermatology</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(6)} eventKey="Ear, Nose, and Throat (ENT)">Ear, Nose, and Throat (ENT)</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(7)} eventKey="Emergency Department (ED)">Emergency Department (ED)</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(8)} eventKey="Gastroenterology">Gastroenterology</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(9)} eventKey="Gynecology">Gynecology</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(10)} eventKey="Hematology">Hematology</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(11)} eventKey="Human Resources (HR)">Human Resources (HR)</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(12)} eventKey="Imaging and Radiology">Imaging and Radiology</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(13)} eventKey="Information Technology (IT)">Information Technology (IT)</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(14)} eventKey="Intensive Care Unit (ICU)">Intensive Care Unit (ICU)</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(15)} eventKey="Materials Management">Materials Management</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(16)} eventKey="Neonatal">Neonatal</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(17)} eventKey="Neurology">Neurology</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(18)} eventKey="Nutrition and Dietics">Nutrition and Dietics</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(19)} eventKey="Oncology">Oncology</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(20)} eventKey="Orthopedics">Orthopedics</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(21)} eventKey="Pharmacy">Pharmacy</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(22)} eventKey="Physiotherapy">Physiotherapy</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(23)} eventKey="Records and Billing">Records and Billing</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(24)} eventKey="Surgery">Surgery</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(25)} eventKey="Urology">Urology</Dropdown.Item>
                                </DropdownButton>
                            </Form>
                        </Row>

                        <p className="mb-4" id="required" ><i>* Required</i></p>
                        <Row className="justify-content-md-left" style={{ marginTop: -15 }}>
                            <form action="/action_page.php">
                                <label
                                    className="vendorNameTitle text-left"
                                    id="input"
                                    style={{ width: 200, height: 5 }}
                                >Vendor Name:
                                </label>
                                <input
                                    className="vendorNameInput mb-4 ml-4"
                                    defaultValue={itemId ? currentItem.vendorName : ""}
                                    id="input"
                                    name="vendorName"
                                    // onChange={(e) => setvendorName(e.target.value)}
                                    style={{ width: 400, height: 35 }}
                                    ref={vendorNameEdit}
                                />
                            </form>
                        </Row>

                        <p className="mb-4" id="required"><i>* Required</i></p>
                        <Row className="justify-content-md-left" style={{ marginTop: -15 }}>
                            <form action="/action_page.php">
                                <label
                                    className="itemNameTitle text-left"
                                    id="input"
                                    style={{ width: 200, height: 5 }}
                                >Item Name:
                                </label>
                                <input
                                    className="itemNameInput mb-4 ml-4"
                                    defaultValue={itemId ? currentItem.itemName : ""}
                                    id="input"
                                    name="itemName"
                                    // onChange={(e) => setItemName(e.target.value)}
                                    style={{ width: 400, height: 35 }}
                                    ref={itemNameEdit}
                                />
                            </form>
                        </Row>

                        <p id="required" className="mb-4"><i>* Required</i></p>
                        <Row style={{ marginTop: -15 }} className="justify-content-md-left">
                            <label
                                className="itemSKUTitle text-left"
                                id="input"
                                style={{ width: 200, height: 5 }}
                            >Item SKU:
                            </label>
                            <input
                                className="itemSKUInput mb-4 ml-4"
                                defaultValue={itemId ? currentItem.itemSKU : ""}
                                id="input"
                                name="itemSKU"
                                // onChange={(e) => setItemSKU(e.target.value)}
                                style={{ width: 400, height: 35 }}
                                ref={itemSKUEdit}
                            />
                        </Row>

                        <p id="required" className="mb-4"><i>* Required</i></p>
                        <Row className="justify-content-md-left" style={{ marginTop: -15 }}>
                            <label
                                className="ItemUnitPrice text-left"
                                id="input"
                                style={{ width: 197, height: 5 }}
                            >Unit Price:
                            </label>

                            <input
                                className="itemUnitPrice mb-4 ml-4"
                                defaultValue={itemId ? currentItem.unitPrice : ""}
                                id="input"
                                name="itemUnitPrice"
                                // onChange={(e) => setItemUnitPrice(parseInt(e.target.value))}
                                style={{ width: 400, height: 35 }}
                                ref={unitPriceEdit}
                            />
                        </Row>

                        <p className="mb-4" id="required"><i>* Required</i></p>
                        <Row className="justify-content-md-left text-left" style={{ marginTop: -15 }}>
                            <label
                                className="itemQuantity"
                                id="input"
                                style={{ width: 197, height: 5 }}
                            >Quantity:
                            </label>
                            <input
                                className="itemQuantityInput mb-4 ml-4"
                                defaultValue={itemId ? currentItem.quantity : ""}
                                id="input"
                                name="itemQuantity"
                                // onChange={(e) => setItemQuantity(parseInt(e.target.value))}
                                style={{ width: 400 }}
                                ref={quantityEdit}
                            />
                        </Row>

                        <Row className="justify-content-md-left" style={{ marginTop: 20 }}>
                            <Button
                                id="input"
                                onClick={item => {
                                    item.preventDefault()
                                    editItem()
                                    history.push(`/`)
                                }}
                                style={{ width: 150, marginLeft: 75 }}
                                type="submit"
                                variant="success"
                            >Save Item
                            </Button>

                            <Button
                                id="input"
                                onClick={() => {
                                    history.push(`/`)
                                }}
                                style={{ width: 150, marginLeft: 150 }}
                                type="submit"
                                variant="danger"
                            >Cancel
                            </Button>

                            <ToastContainer
                                autoClose={2000}
                                closeOnClick
                                draggable
                                hideProgressBar={false}
                                newestOnTop={false}
                                pauseOnFocusLoss
                                pauseOnHover
                                position="top-center"
                                rtl={false}
                            />
                        </Row>
                    </Col>
                </Row>
            </>
        )
    } else {
        return (
            <>
                <h1 className="AddItemHeader my-5">Add Item</h1>
                <hr />
                <Row>
                    <Col>
                        <Row style={{ height: 50 }}></Row>
                        <Row className="justify-content-md-left" style={{ marginTop: -15, marginLeft: 300 }}>
                            <div className="NewToolPicture">
                                {loading ? (
                                    <h3 className="NewToolPictureLoading">Loading . . .</h3>
                                ) : (
                                        ItemPicture === "" ?
                                            <img alt="Logo" src="\Images\NucleusLogo.png" style={{ width: 400, height: 300 }} />
                                            :
                                            <img
                                                alt="Preview"
                                                className="imageUploadBoard"
                                                src={ItemPicture ? ItemPicture : item.itemPicture}
                                                style={{ width: 500, height: 400 }}
                                            />
                                    )
                                }
                                <h1 className="UploadTitle my-5">Upload Image</h1>
                                <Button id="imageUploadButton" onClick={handleClick}>Upload a file
                                </Button>
                                <input

                                    name="file"
                                    onChange={uploadImage}
                                    placeholder="Upload an image"
                                    style={{ display: 'none' }}
                                    type="file"
                                    ref={hiddenFileInput}
                                />
                            </div>
                        </Row>
                    </Col>

                    <Col id="textInputs" className="ml-5">
                        <p id="required" className="mb-4"><i>* Required</i></p>
                        <Row style={{ marginTop: -15 }} className="justify-content-md-left mb-4 text-left">
                            <label
                                className="LocationTitle"
                                id="input"
                                style={{ width: 200, height: 5 }}
                            >Item Location
                            </label>
                            <Form inline>
                                <DropdownButton
                                    id="itemFormDropdown"
                                    style={{ width: 400, height: 35 }}
                                    title={value ? value : "Select Location"} //value ? value : "Select Location"
                                    onSelect={handleSelect}
                                    defaultValue={0}
                                // ref={departmentAdd}
                                >
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(1)} eventKey="Administrative Services">Administrative Services</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(2)} eventKey="Anesthetics">Anesthetics</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(3)} eventKey="Billing">Billing</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(4)} eventKey="Cardiology">Cardiology</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(5)} eventKey="Dermatology">Dermatology</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(6)} eventKey="Ear, Nose, and Throat (ENT)">Ear, Nose, and Throat (ENT)</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(7)} eventKey="Emergency Department (ED)">Emergency Department (ED)</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(8)} eventKey="Gastroenterology">Gastroenterology</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(9)} eventKey="Gynecology">Gynecology</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(10)} eventKey="Hematology">Hematology</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(11)} eventKey="Human Resources (HR)">Human Resources (HR)</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(12)} eventKey="Imaging and Radiology">Imaging and Radiology</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(13)} eventKey="Information Technology (IT)">Information Technology (IT)</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(14)} eventKey="Intensive Care Unit (ICU)">Intensive Care Unit (ICU)</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(15)} eventKey="Materials Management">Materials Management</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(16)} eventKey="Neonatal">Neonatal</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(17)} eventKey="Neurology">Neurology</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(18)} eventKey="Nutrition and Dietics">Nutrition and Dietics</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(19)} eventKey="Oncology">Oncology</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(20)} eventKey="Orthopedics">Orthopedics</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(21)} eventKey="Pharmacy">Pharmacy</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(22)} eventKey="Physiotherapy">Physiotherapy</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(23)} eventKey="Records and Billing">Records and Billing</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(24)} eventKey="Surgery">Surgery</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(25)} eventKey="Urology">Urology</Dropdown.Item>
                                </DropdownButton>
                            </Form>
                        </Row>

                        <p className="mb-4" id="required" ><i>* Required</i></p>
                        <Row className="justify-content-md-left" style={{ marginTop: -15 }}>
                            <label
                                className="vendorNameTitle text-left"
                                id="input"
                                style={{ width: 200, height: 5 }}
                            >Vendor Name:
                            </label>
                            <input
                                className="vendorNameInput mb-4 ml-4"
                                id="input"
                                name="vendorName"
                                onChange={(e) => setvendorName(e.target.value)}
                                style={{ width: 400, height: 35 }}
                            // ref={vendorNameAdd}
                            />
                        </Row>

                        <p className="mb-4" id="required"><i>* Required</i></p>
                        <Row className="justify-content-md-left" style={{ marginTop: -15 }}>
                            <label
                                className="itemNameTitle text-left"
                                id="input"
                                style={{ width: 200, height: 5 }}
                            >Item Name:
                            </label>
                            <input
                                className="itemNameInput mb-4 ml-4"
                                id="input"
                                name="itemName"
                                onChange={(e) => setItemName(e.target.value)}
                                style={{ width: 400, height: 35 }}
                            // ref={itemNameAdd}
                            />
                        </Row>

                        <p id="required" className="mb-4"><i>* Required</i></p>
                        <Row style={{ marginTop: -15 }} className="justify-content-md-left">
                            <label
                                className="itemSKUTitle text-left"
                                id="input"
                                style={{ width: 200, height: 5 }}
                            >Item SKU:
                            </label>
                            <input
                                className="itemSKUInput mb-4 ml-4"
                                id="input"
                                name="itemSKU"
                                onChange={(e) => setItemSKU(e.target.value)}
                                style={{ width: 400, height: 35 }}
                            // ref={itemSKUAdd}
                            />
                        </Row>

                        <p id="required" className="mb-4"><i>* Required</i></p>
                        <Row className="justify-content-md-left" style={{ marginTop: -15 }}>
                            <label
                                className="ItemUnitPrice text-left"
                                id="input"
                                style={{ width: 197, height: 5 }}
                            >Unit Price:
                            </label>

                            <input
                                className="itemUnitPrice mb-4 ml-4"
                                id="input"
                                name="itemUnitPrice"
                                onChange={(e) => setItemUnitPrice(parseInt(e.target.value))}
                                style={{ width: 400, height: 35 }}
                            // ref={unitPriceAdd}
                            />
                        </Row>

                        <p className="mb-4" id="required"><i>* Required</i></p>
                        <Row className="justify-content-md-left text-left" style={{ marginTop: -15 }}>
                            <label
                                className="itemQuantity"
                                id="input"
                                style={{ width: 197, height: 5 }}
                            >Quantity:
                            </label>
                            <input
                                className="itemQuantityInput mb-4 ml-4"
                                id="input"
                                name="itemQuantity"
                                onChange={(e) => setItemQuantity(parseInt(e.target.value))}
                                style={{ width: 400 }}
                            // ref={quantityAdd}
                            />
                        </Row>

                        <Row className="justify-content-md-left" style={{ marginTop: 20 }}>
                            <Button
                                id="input"
                                onClick={item => {
                                    item.preventDefault()
                                    getItems()
                                }}
                                style={{ width: 150, marginLeft: 75 }}
                                type="submit"
                                variant="success"
                            >Save Item
                            </Button>

                            <Button
                                id="input"
                                onClick={() => {
                                    history.push(`/`)
                                }}
                                style={{ width: 150, marginLeft: 150 }}
                                type="submit"
                                variant="danger"
                            >Cancel
                            </Button>

                            <ToastContainer
                                autoClose={2000}
                                closeOnClick
                                draggable
                                hideProgressBar={false}
                                newestOnTop={false}
                                pauseOnFocusLoss
                                pauseOnHover
                                position="top-center"
                                rtl={false}
                            />
                        </Row>
                    </Col>
                </Row>
            </>
        )
    }
}

export default ItemForm;