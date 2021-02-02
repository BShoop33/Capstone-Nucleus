import React, { useContext, useEffect, useState, useRef } from "react"
import { useHistory, useParams, Route, withRouter } from "react-router-dom"
import { Button, Col, Form, Dropdown, DropdownButton, Row } from "react-bootstrap"
import { ToastContainer, toast } from 'react-toastify';
import { UserProfileContext } from "../providers/UserProfileProvider";
import 'react-toastify/dist/ReactToastify.css';
import "./Inventory.css";

const ItemForm = () => {

    const history = useHistory();

    const { getToken, getCurrentUser } = useContext(UserProfileContext);

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

    const { itemId } = useParams()

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

    const addItem = () => {
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
                history.push(`/`);
            })
        }
        );
    };

    const editItem = () => {
        const item = {
            ItemPicture,
            DepartmentId,
            vendorName,
            itemName,
            itemSKU,
            UnitPrice,
            Quantity
        };
        getToken().then((token) =>
            fetch("/api/item/additem", {
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
        console.log(e)
        setValue(e)
    }

    console.log(DepartmentId)

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
                                            <img src="\Images\NucleusLogo.png" style={{ width: 400, height: 300 }} />
                                            :
                                            <img
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
                                    title={value ? value : "Select Location"}
                                    onSelect={handleSelect}
                                    defaultValue={0}
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
                                {/* <RoomFilter key={item.id} item={item} /> */}
                                {/* <ItemSearch type="text" /> */}
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
                                    defaultValue={""}
                                    id="input"
                                    name="vendorName"
                                    onChange={(e) => setvendorName(e.target.value)}
                                    style={{ width: 400, height: 35 }}
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
                                    defaultValue={""}
                                    id="input"
                                    name="itemName"
                                    onChange={(e) => setItemName(e.target.value)}
                                    style={{ width: 400, height: 35 }}
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
                                defaultValue={""}
                                id="input"
                                name="itemSKU"
                                onChange={(e) => setItemSKU(e.target.value)}
                                style={{ width: 400, height: 35 }}
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
                            />
                        </Row>

                        <Row className="justify-content-md-left" style={{ marginTop: 20 }}>
                            <Button
                                id="input"
                                onClick={item => {
                                    item.preventDefault()
                                    addItem()
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
                                            <img src="\Images\NucleusLogo.png" style={{ width: 400, height: 300 }} />
                                            :
                                            <img
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
                                    title={value ? value : "Select Location"}
                                    onSelect={handleSelect}
                                    defaultValue={0}
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
                                {/* <RoomFilter key={item.id} item={item} /> */}
                                {/* <ItemSearch type="text" /> */}
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
                                    defaultValue={""}
                                    id="input"
                                    name="vendorName"
                                    onChange={(e) => setvendorName(e.target.value)}
                                    style={{ width: 400, height: 35 }}
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
                                    defaultValue={""}
                                    id="input"
                                    name="itemName"
                                    onChange={(e) => setItemName(e.target.value)}
                                    style={{ width: 400, height: 35 }}
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
                                defaultValue={""}
                                id="input"
                                name="itemSKU"
                                onChange={(e) => setItemSKU(e.target.value)}
                                style={{ width: 400, height: 35 }}
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
                            />
                        </Row>

                        <Row className="justify-content-md-left" style={{ marginTop: 20 }}>
                            <Button
                                id="input"
                                onClick={item => {
                                    item.preventDefault()
                                    addItem()
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
    }
}

export default ItemForm;