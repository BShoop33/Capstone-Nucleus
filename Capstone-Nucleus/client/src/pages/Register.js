import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { toast } from "react-toastify";
import { Button, Col, Input, Row } from "reactstrap";
import "./Login.css";

const Register = () => {

    const history = useHistory();

    const { register } = useContext(UserProfileContext);

    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [department, setDepartment] = useState("");
    const [position, setPosition] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirm) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        const profile = {
            firstName,
            lastName,
            displayName,
            department,
            position,
            email,
        };
        register(profile, password)
            .then((user) => {
                setLoading(false);
                toast.info(`Welcome ${user.displayName}`);
                history.push("/");
            })
            .catch((err) => {
                setLoading(false);
                toast.error("Invalid email");
            });
    };

    return (
        <>
            <Row style={{ height: 15 }}></Row>
            <Col align="center" className="d-flex justify-content-center">
                <div className="login-form ">
                    <form onSubmit={handleSubmit} style={{ width: 400 }}>
                        <div>
                            <img
                                alt="Nucleus Logo"
                                className="NucleusLoginLogo"
                                src="\Images\NucleusLogo.png"
                            />
                        </div>
                        <h1 className="my-3 font-weight-bold">Register</h1>
                        <div className="form-group" >
                            <Input
                                className="form-control border border-dark font-weight-bold"
                                id="input"
                                name="firstName"
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="First Name"
                                required="required"
                                type="text"
                            />
                        </div>
                        <div className="form-group">
                            <Input
                                className="form-control border border-dark font-weight-bold"
                                id="input"
                                name="lastName"
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Last Name"
                                required="required"
                                type="text"
                            />
                        </div>
                        <div className="form-group">
                            <Input
                                className="form-control border border-dark font-weight-bold"
                                id="input"
                                name="displayName"
                                onChange={(e) => setDisplayName(e.target.value)}
                                placeholder="Display Name"
                                required="required"
                                type="text"
                            />
                        </div>
                        <div className="form-group">
                            <Input
                                className="form-control border border-dark font-weight-bold"
                                id="input"
                                name="departmentName"
                                onChange={(e) => setDepartment(e.target.value)}
                                placeholder="Department"
                                required="required"
                                type="text"
                            />
                        </div>
                        <div className="form-group">
                            <Input
                                className="form-control border border-dark font-weight-bold"
                                id="input"
                                name="position"
                                onChange={(e) => setPosition(e.target.value)}
                                placeholder="Job Title"
                                required="required"
                                type="text"
                            />
                        </div>
                        <div className="form-group">
                            <Input
                                className="form-control border border-dark font-weight-bold"
                                id="input"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required="required"
                                type="email"
                            />
                        </div>
                        <div className="form-group">
                            <Input
                                className="form-control border border-dark font-weight-bold"
                                id="input"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required="required"
                                type="password"
                            />
                        </div>
                        <div className="form-group">
                            <Input
                                className="form-control border border-dark font-weight-bold"
                                id="input"
                                name="confirmPassword"
                                onChange={(e) => setConfirm(e.target.value)}
                                placeholder="Confirm Password"
                                required="required"
                                type="password"
                            />
                        </div>
                        <div className="form-group">
                            <Button type="submit"
                                block color="success"
                                className font-weight-bold="SignButton"
                                disabled={loading}
                                id="input"
                                style={{ height: 40 }}
                            >Register
                            </Button>
                        </div>
                        <div className="text-center RedirectMessage">Already have an account?
                            <div>
                                <Link className="RedirectLink" to="/login">Log in here</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </Col>
        </>
    );
};

export default Register;