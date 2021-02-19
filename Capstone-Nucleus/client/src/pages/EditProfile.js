import React, { useContext, useEffect, useRef, useState } from "react"
import { Redirect, useHistory, useParams } from "react-router-dom"
import { Button, Col, Jumbotron, Row } from "react-bootstrap"
import { UserProfileContext } from "../providers/UserProfileProvider";
import 'react-toastify/dist/ReactToastify.css';
import "./Inventory.css";

const EditProfile = () => {

    const history = useHistory();

    const { id } = useParams();

    const { getToken, getCurrentUser } = useContext(UserProfileContext);

    const currentUser = getCurrentUser();

    const firstName = useRef();
    const lastName = useRef();
    const displayName = useRef();

    const [user, setUser] = useState({});




    const editProfile = () => {
        const newUserProfile = {
            id: user.id,
            FirebaseUserId: user.firebaseUserId,
            department: user.department,
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            displayName: displayName.current.value,
            email: user.email,
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

    useEffect(() => {
        getToken()
            .then((token) =>
                fetch(`/api/userprofile/editprofile/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json())
            .then((user) => {
                setUser(user);
            })
    }, [id]);

    return (
        user.id === currentUser.id ?
            <>
                <h1 className="my-5">Edit Profile</h1>
                <hr />
                <Row>
                    <Col></Col>
                    <Col className="ml-5" id="textInputs">
                        <p id="requiredProfile" className="mb-1"><i>* Required</i></p>
                        <Row className="justify-content-md-left mb-4 mt-1" >
                            <label
                                className="firstNameTitle text-left"
                                id="input"
                                style={{ height: 5, width: 200 }}
                            >First Name:
                        </label>
                            <input
                                className="firstNameInput ml-4"
                                defaultValue={user.firstName}
                                id="input"
                                name="firstName"
                                ref={firstName}
                                style={{ height: 35, width: 400 }}
                                type="text"
                            />
                        </Row>

                        <p id="requiredProfile" className="mb-1"><i>* Required</i></p>
                        <Row className="justify-content-md-left mb-4 mt-1" >
                            <label
                                className="lastNameTitle text-left"
                                id="input"
                                style={{ height: 5, width: 200 }}
                            >Last Name:
                        </label>
                            <input
                                className="lastNameInput ml-4"
                                defaultValue={user.lastName}
                                id="input"
                                name="lastName"
                                ref={lastName}
                                style={{ height: 35, width: 400 }}
                                type="text"
                            />
                        </Row>

                        <p id="requiredProfile" className="mb-1"><i>* Required</i></p>
                        <Row className="justify-content-md-left mb-4 mt-1">
                            <label
                                className="displayName text-left"
                                id="input"
                                style={{ height: 5, width: 200 }}
                            >Display Name:
                        </label>
                            <input
                                className="displayName ml-4"
                                defaultValue={user.displayName}
                                id="input"
                                name="displayName"
                                ref={displayName}
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
                        </Row>
                    </Col>
                    <Col></Col>
                </Row>
            </> :
            <>
                <Jumbotron>
                    <h1>404 Not Found</h1>
                </Jumbotron>
                <Row style={{ height: 100 }}></Row>
                <Col md={3}></Col>
                <Col md={3}>
                    <Jumbotron style={{ width: 800, height: 225, textAlign: "center" }}>

                        <h2>The page you're looking for could not be found.</h2>
                        <Button
                            className="mt-5"
                            onClick={() => history.push(`/`)}
                            style={{ height: 70, width: 300, fontSize: 18 }}
                        >
                            Return to Homepage
                    </Button>
                    </Jumbotron>
                </Col>
                <Col md={3}></Col>
            </>
    );
}

export default EditProfile;