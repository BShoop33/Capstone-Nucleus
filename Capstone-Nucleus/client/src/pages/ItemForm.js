import React, { useContext, useEffect, useState, useRef } from "react"
import { useHistory, useParams, Route, withRouter } from "react-router-dom"
import { Button, Col, Form, Dropdown, DropdownButton, Row } from "react-bootstrap"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Inventory.css";

const ItemForm = () => {

    const history = useHistory();

    const hiddenFileInput = useRef(null);
    const itemLocation = useRef();
    const vendorName = useRef();
    const itemName = useRef();
    const itemSKU = useRef();
    const itemUnitPrice = useRef();
    const itemQuantity = useRef();

    const [item, setNewItem] = useState({});
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)

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

    const handleControlledInputChange = (event) => {
        const addedItem = item
        addedItem[event.target.name] = event.target.value
        setNewItem(addedItem)
    }

    // useEffect(() => {
    //     getItems()
    // }, [])

    // useEffect(() => {
    //     if (itemId) {
    //         getItemById(itemId)
    //             .then(item => {
    //                 setNewItem(item)
    //             })
    //     } else {
    //     }
    // }, [getItemById, itemId])

    const showToast1 = () => {
        toast.error("Item Location is a required field")
    };

    const showToast2 = () => {
        toast.error("Vendor Name is a required field")
    };

    const showToast3 = () => {
        toast.error("Item Name is a required field")
    };

    const showToast4 = () => {
        toast.error("Item SKU is a required field")
    };

    const showToast5 = () => {
        toast.error("Item Unit Price is a required field")
    };

    const showToast6 = () => {
        toast.error("Item Quantity is a required field")
    };

    const constructItemObject = () => {
        // setIsLoading(true)
        if (itemLocation.current.value === "") {
            showToast1();
        }
        else if (vendorName.current.value === "") {
            showToast2();
        }
        else if (itemName.current.value === "") {
            showToast3();
        }
        else if (itemSKU.current.value === "") {
            showToast4();
        }
        else if (itemUnitPrice.current.value === "") {
            showToast5();
        }
        else if (itemQuantity.current.value === "") {
            showToast6();
        }
        // else {
        //     if (itemId) {
        //         editItems({
        //             id: item.id,
        //             itemName: item.itemName,
        //             itemLocation: itemLocation.current.value,
        //             itemDescription: item.itemDescription,
        //             itemSerialNumber: item.itemSerialNumber,
        //             itemNotes: item.itemNotes
        //         })
        //             .then(() => history.push("/"))
        //     } else {
        //         addItems({
        //             id: item.id,
        //             itemName: item.itemName,
        //             itemLocation: item.itemRoom,
        //             itemDescription: item.itemDescription,
        //             itemSerialNumber: item.itemSerialNumber,
        //             itemNotes: item.itemNotes
        //         })
        //             .then(() => history.push("/"))
        //     }
        // }
    }

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    return (
        <>
            <h1 className="AddItemHeader my-5">{itemId ? "Edit Item" : "Add Item"}</h1>
            <hr />
            <Row>
                <Col>
                    <Row style={{ height: 50 }}></Row>
                    <Row className="justify-content-md-left" style={{ marginTop: -15, marginLeft: 300 }}>
                        <div className="NewToolPicture">
                            {loading ? (
                                <h3 className="NewToolPictureLoading">Loading . . .</h3>
                            ) : (
                                    image === "" ?
                                        <img src="\Images\NucleusLogo.png" style={{ width: 400, height: 300 }} />
                                        :
                                        <img
                                            className="imageUploadBoard"
                                            src={image ? image : item.itemPicture}
                                            style={{ width: 500, height: 400 }}
                                        />
                                )
                            }
                            <h1 className="UploadTitle my-5">Upload Image</h1>
                            <Button id="imageUploadButton" onClick={handleClick}>Upload a file
                            </Button>
                            <input
                                defaultValue={image}
                                name="file"
                                onChange={uploadImage}
                                placeholder="Upload an image"
                                ref={hiddenFileInput}
                                style={{ display: 'none' }}
                                type="file"
                            />
                        </div>

                        {/* <form action="/action_page.php">
                            <input style={{ width: 400, height: 35 }} type="file" ref={itemName} className="ItemNameInput mb-4  ml-4" name="itemName" onChange={handleControlledInputChange} defaultValue={itemId ? item.itemName : ""} />
                        </form> */}
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
                                title="Select Location"
                            // onSelect={handleSelect}
                            >
                                <Dropdown.Item id="dropdownOptions" eventKey="Administrative Services">Administrative Services</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" eventKey="Anesthetics">Anesthetics</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" eventKey="Billing">Billing</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" eventKey="Cardiology">Cardiology</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" eventKey="Dermatology">Dermatology</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" eventKey="Ear, Nose, and Throat (ENT)">Ear, Nose, and Throat (ENT)</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" eventKey="Emergency Department (ED)">Emergency Department (ED)</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" eventKey="Gastroenterology">Gastroenterology</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" eventKey="Gynecology">Gynecology</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" eventKey="Hematology">Hematology</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" eventKey="Human Resources (HR)">Human Resources (HR)</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" eventKey="Imaging and Radiology">Imaging and Radiology</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" eventKey="Information Technology (IT)">Information Technology (IT)</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" eventKey="Intensive Care Unit (ICU)">Intensive Care Unit (ICU)</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" eventKey="Materials Management">Materials Management</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" eventKey="Neonatal">Neonatal</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" eventKey="Neurology">Neurology</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" eventKey="Nutrition and Dietics">Nutrition and Dietics</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" eventKey="Oncology">Oncology</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" eventKey="Orthopedics">Orthopedics</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" eventKey="Pharmacy">Pharmacy</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" eventKey="Physiotherapy">Physiotherapy</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" eventKey="Records and Billing">Records and Billing</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" eventKey="Surgery">Surgery</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" eventKey="Urology">Urology</Dropdown.Item>
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
                                defaultValue={itemId ? item.vendorName : ""}
                                name="vendorName"
                                onChange={handleControlledInputChange}
                                style={{ width: 400, height: 35 }}
                                type="text" ref={vendorName}
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
                                defaultValue={itemId ? item.vendorName : ""}
                                name="itemName"
                                onChange={handleControlledInputChange}
                                ref={itemName}
                                style={{ width: 400, height: 35 }}
                                type="text"
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
                            defaultValue={itemId ? item.itemSKU : ""}
                            name="itemSKU"
                            onChange={handleControlledInputChange}
                            ref={itemSKU}
                            style={{ width: 400, height: 35 }}
                            type="text"
                        />
                    </Row>

                    <p id="required" className="mb-4"><i>* Required</i></p>
                    <Row className="justify-content-md-left" style={{ marginTop: -15 }}>
                        <label
                            className="ItemSerialTitle text-left"
                            id="input"
                            style={{ width: 197, height: 5 }}
                        >Unit Price:
                        </label>
                        <input
                            className="itemUnitPrice mb-4 ml-4"
                            defaultValue={itemId ? item.itemSerialNumber : ""}
                            name="itemSerialNumber"
                            onChange={handleControlledInputChange}
                            style={{ width: 400, height: 35 }}
                            type="text" ref={itemUnitPrice}
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
                        <textarea
                            className="itemQuantityInput mb-4 ml-4"
                            defaultValue={itemId ? item.itemQuantity : ""}
                            name="itemQuantity"
                            onChange={handleControlledInputChange}
                            ref={itemQuantity}
                            style={{ width: 400, height: 100 }}
                            type="textarea"
                        />
                    </Row>

                    <Row className="justify-content-md-left" style={{ marginTop: 20 }}>
                        <Button
                            id="input"
                            onClick={item => {
                                item.preventDefault()
                                // constructItemObject()
                                // history.push(`/`)
                            }}
                            style={{ width: 150, marginLeft: 75 }}
                            type="button"
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

                        {/* <Button
                                className="CancelAddItem"
                                onClick={showToast}
                                style={{ width: 150, marginLeft: 30 }}
                                type="submit"
                                variant="danger"
                            >Toast
                            </Button> */}

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
    );
}

export default ItemForm;