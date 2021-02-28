import React, { useContext, useEffect, useRef, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { Button, Col, Dropdown, DropdownButton, Form, Jumbotron, Row } from "react-bootstrap"
import { UserProfileContext } from "../providers/UserProfileProvider";
import "./Inventory.css";

const ItemForm = () => {

    const history = useHistory();

    const { getToken } = useContext(UserProfileContext);

    const hiddenFileInput = useRef(null);

    const [value, setValue] = useState('');
    const [ItemPicture, setImage] = useState('')
    const [loading, setLoading] = useState(false)
    const [DepartmentId, setItemLocation] = useState(0);
    const [vendorName, setvendorName] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemSKU, setItemSKU] = useState('');
    const [UnitPrice, setItemUnitPrice] = useState(0);
    const [Quantity, setItemQuantity] = useState(0);
    const [editCheck, setEditCheck] = useState(0)
    const [oldUnitPrice, setOldUnitPrice] = useState(0)
    const [currentItem, setCurrentItem] = useState({ department: { name: "" } });
    const [imageURL, setImageURL] = useState('');

    const { itemId } = useParams();

    const vendorNameEdit = useRef();
    const itemNameEdit = useRef();
    const itemSKUEdit = useRef();
    const unitPriceEdit = useRef();
    const quantityEdit = useRef();
    const unitPriceAdd = useRef();
    // const imageURL = useRef();

    /*This async function first initializes the files variable with the value of the image upload. Then initializes the data variable
    with an instance of the FormData built-in function. Then attaches the first uploaded file (you could configure the upload to attach
    multiple files but that's not used in this application) and sets the data's settings use the existing Cloudinary upload preset and 
    to save the image in the ToolMeOnce folder on Cloudinary. Then defines the fetch function as a POST operation and saves as its body
    the data object. Then initializes the file variable with the json formated response from Cloudinary. Then uses the useState to set
    the value of the ItemPicture variable with the secure usl property from the file object that Cloudinary returned)*/
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

    /*Evaluates whether the itemId (declared from the route parameter) is undefined. If it is undefined, then fetches the item
    matching that itemId parameter. Then saves that item return in json format. Then uses the useState hook to declare the currentItem
    variable with the returned item object.*/
    useEffect(() => {
        if (itemId !== undefined) {
            fetch(`/api/item/${itemId}`)
                .then((res) => res.json())
                .then((item) => {
                    setCurrentItem(item);
                });
        }
    }, []);

    const picture = () => {
        if (ItemPicture !== "") {
            console.log(ItemPicture)
            return ItemPicture
        } else if (ItemPicture === "" && imageURL !== "") {
            console.log(imageURL)
            return imageURL
        } else {
            return "https://res.cloudinary.com/dstfvbrwf/image/upload/v1612906044/ToolMeOnce/qcr8iyezvaocm9z8yj6o.gif"
        }
    }
    const returnedPicture = picture();

    // ItemPicture ? ItemPicture : "https://res.cloudinary.com/dstfvbrwf/image/upload/v1612906044/ToolMeOnce/qcr8iyezvaocm9z8yj6o.gif",

    /*Evaluates whether editCheck does not equal 0. If it does not, then evaluates whetehr editCheck does not equal 0 and -1. If it 
    does not equal those values, then invokes the editUniqueItem function passing it the editCheck value. If edit check does equal
    0 or -1, then performs a series of evaluations to ensure the DepartmentId, vendorName, itemName, itemSKU, UnitPrice, and Quantity
    variables do not have blank or otherwise in appropriate values. If those variables pass those evaluations, then the item object
    is assembled using those values. Then the fetch operation is performed using the firebase bearer token for auth. That fetch
    operation performs a POST call sending the item object in json format as the body of the call. Then the editCheck value is 
    declared as 0 and the user is naviaged back to the inventory page.*/
    useEffect(() => {
        if (editCheck !== 0) {
            if (editCheck !== 0 && editCheck !== -1) {
                editUniqueItem(editCheck);
            }
            else {
                if (DepartmentId === 0) {
                    return
                } else if (vendorName === "") {
                    return
                } else if (itemName === "") {
                    return
                } else if (itemSKU === "") {
                    return
                } else if (UnitPrice === 0 || UnitPrice === NaN) {
                    return
                } else if (Quantity === 0 || Quantity === NaN) {
                    return
                } else {
                    const item = {
                        ItemPicture: returnedPicture,
                        DepartmentId,
                        vendorName,
                        itemName,
                        itemSKU,
                        UnitPrice: UnitPrice.toFixed(2),
                        TotalPrice: (UnitPrice * Quantity).toFixed(2),
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
        }
    }, [DepartmentId, editCheck, getToken, history, itemName, ItemPicture, itemSKU, Quantity, UnitPrice]);

    /*When invoked, performs a fetch operation with a firebase bearer token for auth. That fetch operation performs a GET call
    that returns all items. Those items are then saved in the json format. initializes the itemCheck variable with the value of 
    0. Then performs a map method on the items array to evaluate whether the following user input values match the returned items'
    values:  itemSKU, DepartmentId, and vendorName. If those values do match the total variable is initialized with the value produced
    by multiplying the user's quantity input by the returned item's quantity value. The useState hook is then used to declare the 
    Quantity variable with the value of the total variable and to declare the oldUnitPrice variable with the value of the returned 
    item's unit price. Then declares the itemCheck variable with the id of the returned item. Finally, evaluates whether the 
    itemCheck variable does not equal 0. If it does not, then uses the useState hook to declare the editCheck variable with the 
    value of the itemCheck variable. If it does equal 0, then uses the useState hook to declare the editCheck variable with the 
    value of -1.*/
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
                            setOldUnitPrice(item.unitPrice)
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

    /*This function is used where the values of DepartmentId, vendorName, itemName, and itemSKU match between a newly entered
    item and an already existing item. When those values match, this function combines the newly entered item values to the 
    existing item's values. That combined item is assembled and then a fetch call is performed using the firebase bearer token
    for auth.That fetch call performs a PUT call that updates the already existing item with the item values, in json format,
    that were assembled. Then the user is navigated to the inventory page.*/
    const editUniqueItem = (id) => {
        const item = {
            Id: id,
            ItemPicture: ItemPicture ? ItemPicture : "https://res.cloudinary.com/dstfvbrwf/image/upload/v1612906044/ToolMeOnce/qcr8iyezvaocm9z8yj6o.gif",
            DepartmentId,
            vendorName,
            itemName,
            itemSKU,
            UnitPrice: (UnitPrice + oldUnitPrice) / 2,
            TotalPrice: UnitPrice * Quantity,
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

    /*When invoked, assembles an item from the values the user input. Then performs a fetch operation using the
    firebase bearer token for auth. That fetch operation performs a PUT call that carries the assembled item in 
    json format in its body to update the existing item with the values the user input. Then navigates the user
    to the inventory page.*/
    const editItem = () => {
        const item = {
            Id: itemId,
            ItemPicture: ItemPicture ? ItemPicture : currentItem.itemPicture,
            DepartmentId: DepartmentId ? DepartmentId : currentItem.departmentId,
            vendorName: vendorNameEdit.current.value,
            itemName: itemNameEdit.current.value,
            itemSKU: itemSKUEdit.current.value,
            UnitPrice: unitPriceEdit.current.value,
            TotalPrice: unitPriceEdit.current.value * quantityEdit.current.value,
            Quantity: quantityEdit.current.value,
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

    /*When invoked, activates the item picture file input. The input itself is hidden for styling purposes with its
    activating functionality moved to the imageUploadButton button.*/
    const handleClick = (e) => {
        hiddenFileInput.current.click();
    };

    /*When invoked, declares the Value variable with the value the user selected in the department dropdown. That Value
    variable is then used as the title for the dropdown to display.*/
    const handleSelect = (e) => {
        setValue(e)
    }

    /*Evaluates whether the itemId route parameter is present. If it is, then returns the edit item view for rendering on the
    DOM. If it is not, then returns the add item view for rendering on the DOM.*/
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
                                        <img alt="Logo" src={ItemPicture ? ItemPicture : currentItem.itemPicture} style={{ width: 400, height: 300 }} />
                                    )
                                }
                                <h1 className="UploadTitle my-5">Upload Image</h1>
                                <Button id="imageUploadButton" onClick={handleClick}>Upload a file
                                </Button>
                                <input
                                    defaultValue={ItemPicture}
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
                                    title={value ? value : currentItem.department.name}
                                    onSelect={handleSelect}
                                    defaultValue={currentItem.departmentId}
                                >
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(1)} eventKey="Administrative Services">Administrative Services</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(2)} eventKey="Anesthetics">Anesthetics</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(3)} eventKey="Billing">Billing</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(4)} eventKey="Cardiology">Cardiology</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(5)} eventKey="Dermatology">Dermatology</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(6)} eventKey="Ear, Nose, and Throat (ENT)">Ear, Nose, and Throat (ENT)</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(7)} eventKey="Emergency Department (ED)">Emergency Department (ED)</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(8)} eventKey="Environmental Services">Environmental Services</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(9)} eventKey="Gastroenterology">Gastroenterology</Dropdown.Item>
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
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(23)} eventKey="Records and Reception">Records and Reception</Dropdown.Item>
                                    <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(24)} eventKey="Surgery">Surgery</Dropdown.Item>
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
                                defaultValue={itemId ? currentItem.vendorName : ""}
                                id="input"
                                name="vendorName"
                                ref={vendorNameEdit}
                                style={{ width: 400, height: 35 }}
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
                                defaultValue={itemId ? currentItem.itemName : ""}
                                id="input"
                                name="itemName"
                                ref={itemNameEdit}
                                style={{ width: 400, height: 35 }}
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
                                defaultValue={itemId ? currentItem.itemSKU : ""}
                                id="input"
                                name="itemSKU"
                                ref={itemSKUEdit}
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
                                defaultValue={itemId ? currentItem.unitPrice : ""}
                                id="input"
                                name="itemUnitPrice"
                                ref={unitPriceEdit}
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
                                defaultValue={itemId ? currentItem.quantity : ""}
                                id="input"
                                name="itemQuantity"
                                ref={quantityEdit}
                                style={{ width: 400 }}
                            />
                        </Row>

                        <Row className="justify-content-md-left" style={{ marginTop: 20 }}>
                            <Button
                                id="input"
                                onClick={item => {
                                    item.preventDefault()
                                    editItem()
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
                <Jumbotron style={{ height: 660, marginLeft: 160, marginTop: 20, width: 1600 }}>

                    <Row style={{ marginTop: -20 }}>
                        <Col>
                            <Row style={{ height: 50 }}></Row>
                            <Row className="justify-content-md-left" style={{ marginTop: -15, marginLeft: 300 }}>
                                <div className="NewToolPicture" style={{ marginTop: -20 }}>
                                    {loading ? (
                                        <h3 className="NewToolPictureLoading">Loading . . .</h3>
                                    ) : (
                                            ItemPicture === "" ?
                                                <img
                                                    alt="Logo"
                                                    src="https://res.cloudinary.com/dstfvbrwf/image/upload/v1612906044/ToolMeOnce/qcr8iyezvaocm9z8yj6o.gif"
                                                    style={{ width: 400, height: 300 }}
                                                />
                                                :
                                                <img
                                                    alt="Preview"
                                                    className="imageUploadBoard"
                                                    src={ItemPicture ? ItemPicture : "https://res.cloudinary.com/dstfvbrwf/image/upload/v1612906044/ToolMeOnce/qcr8iyezvaocm9z8yj6o.gif"}
                                                    style={{ width: 500, height: 400 }}
                                                />
                                        )
                                    }
                                    <Button className="my-5" id="imageUploadButton" onClick={handleClick}>Upload Image
                                    </Button>
                                    <input
                                        name="file"
                                        onChange={uploadImage}
                                        placeholder="Upload an image"
                                        ref={hiddenFileInput}
                                        style={{ display: 'none' }}
                                        type="file"
                                    />
                                    <p style={{ fontSize: 22, fontWeight: 600 }}>or enter an image URL</p>
                                    <input
                                        className="my-4"
                                        onChange={(e) => setImageURL(e.target.value)}
                                        placeholder="Enter an image URL here"
                                        style={{ fontSize: 20, width: 400 }}
                                        type="text"
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
                                    >
                                        <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(1)} eventKey="Administrative Services">Administrative Services</Dropdown.Item>
                                        <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(2)} eventKey="Anesthetics">Anesthetics</Dropdown.Item>
                                        <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(3)} eventKey="Billing">Billing</Dropdown.Item>
                                        <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(4)} eventKey="Cardiology">Cardiology</Dropdown.Item>
                                        <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(5)} eventKey="Dermatology">Dermatology</Dropdown.Item>
                                        <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(6)} eventKey="Ear, Nose, and Throat (ENT)">Ear, Nose, and Throat (ENT)</Dropdown.Item>
                                        <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(7)} eventKey="Emergency Department (ED)">Emergency Department (ED)</Dropdown.Item>
                                        <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(8)} eventKey="Environmental Services">Environmental Services</Dropdown.Item>
                                        <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(9)} eventKey="Gastroenterology">Gastroenterology</Dropdown.Item>
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
                                        <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(23)} eventKey="Records and Reception">Records and Reception</Dropdown.Item>
                                        <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(24)} eventKey="Surgery">Surgery</Dropdown.Item>
                                    </DropdownButton>
                                </Form>
                            </Row>
                            <Form>
                                <p className="mb-4" id="required" ><i>* Required</i></p>
                                <Row className="justify-content-md-left" style={{ marginTop: -15 }}>
                                    <label
                                        className="vendorNameTitle text-left"
                                        id="input"
                                        style={{ width: 200, height: 5 }}
                                    >Vendor Name:
                            </label>
                                    <div className="form-group">
                                        <input
                                            className="vendorNameInput mb-4 ml-4"
                                            id="input"
                                            name="vendorName"
                                            onChange={(e) => setvendorName(e.target.value)}
                                            required="required"
                                            style={{ width: 400, height: 35 }}
                                            type="Vendor Name"
                                        />
                                    </div>
                                </Row>
                            </Form>
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
                                    required="required"
                                    style={{ width: 400, height: 35 }}
                                    type="Item Name"
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
                                    required="required"
                                    style={{ width: 400, height: 35 }}
                                    type="Item SKU"
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
                                    onChange={(e) => setItemUnitPrice(parseFloat(e.target.value))}
                                    required="required"
                                    style={{ width: 400, height: 35 }}
                                    type="Unit Price"
                                    ref={unitPriceAdd}
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
                                    required="required"
                                    style={{ width: 400 }}
                                    type="Quantity"
                                />
                            </Row>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-left" style={{ marginLeft: 450, marginTop: 20 }}>
                        <Button
                            id="input"
                            onClick={item => {
                                item.preventDefault()
                                getItems()
                            }}
                            style={{ height: 50, width: 200, marginLeft: 75 }}
                            type="submit"
                            variant="success"
                        >Save Item
                        </Button>

                        <Button
                            id="input"
                            onClick={() => {
                                history.push(`/`)
                            }}
                            style={{ height: 50, width: 200, marginLeft: 150 }}
                            type="submit"
                            variant="danger"
                        >Cancel
                        </Button>
                    </Row>
                </Jumbotron>

            </>
        )
    }
}

export default ItemForm;