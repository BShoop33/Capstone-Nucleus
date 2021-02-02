import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { Button, Col, Row } from "react-bootstrap"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Inventory.css";

const EditProfile = () => {

    const history = useHistory();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');

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
                            // defaultValue={ }
                            id="input"
                            name="firstName"
                            // onChange={(e) => setFirstName(e.target.value)}
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
                            // defaultValue={ }
                            id="input"
                            name="lastName"
                            // onChange={(e) => setLastName(e.target.value)}
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
                            // defaultValue={ }
                            id="input"
                            name="displayName"
                            // onChange={(e) => setDisplayName(e.target.value)}
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
                            // defaultValue={ }
                            id="input"
                            name="email"
                            // onChange={(e) => setEmail(e.target.value)}
                            style={{ width: 400, height: 35 }}
                            type="text"
                        />
                    </Row>

                    <Row className="justify-content-md-left mb-4" style={{ marginTop: 20 }}>
                        <Button
                            id="input"
                            onClick={item => {
                                item.preventDefault()
                                history.push(`/`)
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