import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Button, Col, Input, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import "./Login.css";

const Register = () => {
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
    const history = useHistory();

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
            <Col className="d-flex justify-content-center" align="center" >
                <div className="login-form ">
                    <form style={{ width: 400 }} onSubmit={handleSubmit}>
                        <div>
                            <img className="NucleusLoginLogo" src="\Images\NucleusLogo.png" alt="Nucleus Logo" />
                        </div>
                        <h2 className="my-3">Register</h2>
                        <div className="form-group" >
                            <Input
                                onChange={(e) => setFirstName(e.target.value)}
                                type="text"
                                className="form-control border border-dark font-weight-bold"
                                name="firstName"
                                placeholder="First Name"
                                required="required"
                            />
                        </div>
                        <div className="form-group">
                            <Input
                                onChange={(e) => setLastName(e.target.value)}
                                type="text"
                                className="form-control border border-dark font-weight-bold"
                                name="lastName"
                                placeholder="Last Name"
                                required="required"
                            />
                        </div>
                        <div className="form-group">
                            <Input
                                onChange={(e) => setDisplayName(e.target.value)}
                                type="text"
                                className="form-control border border-dark font-weight-bold"
                                name="displayName"
                                placeholder="Display Name"
                                required="required"
                            />
                        </div>
                        <div className="form-group">
                            <Input
                                onChange={(e) => setDepartment(e.target.value)}
                                type="text"
                                className="form-control border border-dark font-weight-bold"
                                name="departmentName"
                                placeholder="Department"
                                required="required"
                            />
                        </div>
                        <div className="form-group">
                            <Input
                                onChange={(e) => setPosition(e.target.value)}
                                type="text"
                                className="form-control border border-dark font-weight-bold"
                                name="position"
                                placeholder="Job Title"
                                required="required"
                            />
                        </div>
                        <div className="form-group">
                            <Input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                className="form-control border border-dark font-weight-bold"
                                name="email"
                                placeholder="Email"
                                required="required"
                            />
                        </div>
                        <div className="form-group">
                            <Input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="form-control border border-dark font-weight-bold"
                                name="password"
                                placeholder="Password"
                                required="required"
                            />
                        </div>
                        <div className="form-group">
                            <Input
                                onChange={(e) => setConfirm(e.target.value)}
                                type="password"
                                className="form-control border border-dark font-weight-bold"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                required="required"
                            />
                        </div>
                        <div className="form-group">
                            <Button type="submit" block color="success" className="SignButton" disabled={loading}>
                                Sign Up
                            </Button>
                        </div>
                        <div className="text-center RedirectMessage">
                            Already have an account?
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
