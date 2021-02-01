import React, { useContext, useEffect, useState, useRef } from "react"
import { useHistory, useParams, Route, withRouter } from "react-router-dom"
import { Button, Col, Form, Dropdown, DropdownButton, Row } from "react-bootstrap"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Inventory.css";

const EditProfile = () => {

    const history = useHistory();

    const firstName = useRef();
    const lastName = useRef();
    const displayName = useRef();
    const email = useRef();

    const [item, setNewItem] = useState({});
    const [loading, setLoading] = useState(false)

    const { profileId } = useParams()

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
        toast.error("First Name is a required field and cannot be blank")
    };

    const showToast2 = () => {
        toast.error("Last Name is a required field and cannot be blank")
    };

    const showToast3 = () => {
        toast.error("Display Name is a required field and cannot be blank")
    };

    const showToast4 = () => {
        toast.error("Email is a required field and cannot be blank")
    };

    const constructItemObject = () => {
        // setIsLoading(true)
        if (firstName.current.value === "") {
            showToast1();
        }
        else if (lastName.current.value === "") {
            showToast2();
        }
        else if (displayName.current.value === "") {
            showToast3();
        }
        else if (email.current.value === "") {
            showToast4();
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

    return (
        <>
            <h1 className="my-5">Edit Profile</h1>
            <hr />
            <Row>
                <Col></Col>
                <Col className="ml-5" id="textInputs">
                    <Row className="justify-content-md-left my-4" style={{ marginTop: -15 }}>
                        <label
                            className="firstNameTitle text-left"
                            id="input"
                            style={{ width: 200, height: 5 }}
                        >First Name:
                        </label>
                        <input
                            className="firstNameInput mb-4 ml-4"
                            defaultValue={profileId ? item.firstName : ""}
                            name="firstName"
                            onChange={handleControlledInputChange}
                            ref={firstName}
                            style={{ width: 400, height: 35 }}
                            type="text"
                        />
                    </Row>

                    <Row className="justify-content-md-left mb-4" style={{ marginTop: -15 }}>
                        <label
                            className="lastNameTitle text-left"
                            id="input"
                            style={{ width: 200, height: 5 }}
                        >Last Name:
                        </label>
                        <input
                            className="lastNameInput mb-4 ml-4"
                            defaultValue={profileId ? item.lastName : ""}
                            name="lastName"
                            onChange={handleControlledInputChange}
                            ref={lastName}
                            style={{ width: 400, height: 35 }}
                            type="text"
                        />
                    </Row>

                    <Row className="justify-content-md-left mb-4" style={{ marginTop: -15 }}>
                        <label
                            className="displayName text-left"
                            id="input"
                            style={{ width: 200, height: 5 }}
                        >Display Name:
                        </label>
                        <input
                            className="displayName mb-4 ml-4"
                            defaultValue={profileId ? item.displayName : ""}
                            name="displayName"
                            onChange={handleControlledInputChange}
                            ref={displayName}
                            style={{ width: 400, height: 35 }}
                            type="text"
                        />
                    </Row>

                    <Row className="justify-content-md-left mb-4" style={{ marginTop: -15 }}>
                        <label
                            className="email text-left"
                            id="input"
                            style={{ width: 197, height: 5 }}
                        >Email:
                        </label>
                        <input
                            className="email mb-4 ml-4"
                            defaultValue={profileId ? item.email : ""}
                            name="email"
                            onChange={handleControlledInputChange}
                            ref={email}
                            style={{ width: 400, height: 35 }}
                            type="text"
                        />
                    </Row>

                    <Row className="justify-content-md-left mb-4" style={{ marginTop: 20 }}>
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
                        >Save Edits
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
                <Col></Col>
            </Row>
        </>
    );
}

export default EditProfile;