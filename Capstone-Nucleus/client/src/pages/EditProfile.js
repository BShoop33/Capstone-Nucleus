import React, { useContext, useEffect, useRef, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { Button, Col, Row } from "react-bootstrap"
import { ToastContainer } from 'react-toastify';
import { UserProfileContext } from "../providers/UserProfileProvider";
import 'react-toastify/dist/ReactToastify.css';
import "./Inventory.css";

const EditProfile = () => {

    const firstName = useRef();
    const lastName = useRef();
    const displayName = useRef();
    const email = useRef();

    const history = useHistory();

    const { getToken } = useContext(UserProfileContext);

    const [user, setUser] = useState({});

    const { id } = useParams();

    useEffect(() => {
        fetch(`/api/userprofile/editprofile/${id}`)
            .then((res) => res.json())
            .then((user) => {
                setUser(user);
            });
    }, [id]);

    const editProfile = () => {
        const newUserProfile = {
            id: user.id,
            FirebaseUserId: user.firebaseUserId,
            department: user.department,
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            displayName: displayName.current.value,
            email: email.current.value,
            dateRegistered: user.dateRegistered,
            userTypeId: user.userTypeId,
            IsActive: true
        };
        getToken().then((token) =>
            fetch(`/api/userprofile/editprofile/${user.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUserProfile),
            }).then(() => {
                history.push(`/`);
            })
        );
    };

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
                            style={{ height: 5, width: 200 }}
                        >First Name:
                        </label>
                        <input
                            className="firstNameInput mb-4 ml-4"
                            defaultValue={user.firstName}
                            id="input"
                            name="firstName"
                            ref={firstName}
                            style={{ height: 35, width: 400 }}
                            type="text"
                        />
                    </Row>

                    <Row className="justify-content-md-left mb-4" style={{ marginTop: -15 }}>
                        <label
                            className="lastNameTitle text-left"
                            id="input"
                            style={{ height: 5, width: 200 }}
                        >Last Name:
                        </label>
                        <input
                            className="lastNameInput mb-4 ml-4"
                            defaultValue={user.lastName}
                            id="input"
                            name="lastName"
                            ref={lastName}
                            style={{ height: 35, width: 400 }}
                            type="text"
                        />
                    </Row>

                    <Row className="justify-content-md-left mb-4" style={{ marginTop: -15 }}>
                        <label
                            className="displayName text-left"
                            id="input"
                            style={{ height: 5, width: 200 }}
                        >Display Name:
                        </label>
                        <input
                            className="displayName mb-4 ml-4"
                            defaultValue={user.displayName}
                            id="input"
                            name="displayName"
                            ref={displayName}
                            style={{ height: 35, width: 400 }}
                            type="text"
                        />
                    </Row>

                    <Row className="justify-content-md-left mb-4" style={{ marginTop: -15 }}>
                        <label
                            className="email text-left"
                            id="input"
                            style={{ height: 5, width: 197 }}
                        >Email:
                        </label>
                        <input
                            className="email mb-4 ml-4"
                            defaultValue={user.email}
                            id="input"
                            name="email"
                            ref={email}
                            style={{ height: 35, width: 400 }}
                            type="text"
                        />
                    </Row>

                    <Row className="justify-content-md-left mb-4" style={{ marginTop: 20 }}>
                        <Button
                            id="input"
                            onClick={item => {
                                item.preventDefault()
                                editProfile();
                                history.push(`/`)
                            }}
                            style={{ marginLeft: 75, width: 150 }}
                            type="button"
                            variant="success"
                        >Save Edits
                        </Button>

                        <Button
                            id="input"
                            onClick={() => {
                                history.push(`/`)
                            }}
                            style={{ marginLeft: 150, width: 150 }}
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