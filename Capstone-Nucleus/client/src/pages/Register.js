import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { toast } from "react-toastify";
import { Button, Col, Form, Dropdown, DropdownButton, Row } from "react-bootstrap";
import "./Login.css";

const Register = () => {

    const history = useHistory();

    const { register } = useContext(UserProfileContext);

    const [value, setValue] = useState('');
    const [valuePosition, setValuePosition] = useState('')
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [department, setDepartment] = useState('');
    const [userTypeId, setPosition] = useState(0);
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
            userTypeId,
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

    const handleSelect = (e) => {
        setValue(e)
    }

    const handleSelectPosition = (e) => {
        setValuePosition(e)
    }

    return (
        <>
            <Row style={{ height: 15 }}></Row>
            <Col align="center" className="d-flex justify-content-center">
                <div className="login-form ">
                    <form onSubmit={handleSubmit} style={{ width: 500 }}>
                        <div>
                            <img
                                alt="Nucleus Logo"
                                className="NucleusLoginLogo"
                                src="\Images\NucleusLogo.png"
                            />
                        </div>
                        <h1 className="my-3 font-weight-bold">Register</h1>
                        <div className="form-group" >
                            <input
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
                            <input
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
                            <input
                                className="form-control border border-dark font-weight-bold"
                                id="input"
                                name="displayName"
                                onChange={(e) => setDisplayName(e.target.value)}
                                placeholder="Display Name"
                                required="required"
                                type="text"
                            />
                        </div>

                        <Row className="justify-content-md-left mb-4 text-left">
                            <DropdownButton
                                id="itemFormDropdown"
                                title={value ? value : "Select Your Department"}
                                onSelect={handleSelect}
                                defaultValue={0}
                            >
                                <Dropdown.Item id="dropdownOptions" onSelect={() => setDepartment("Administrative Services")} eventKey="Administrative Services">Administrative Services</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" onSelect={() => setDepartment("Anesthetics")} eventKey="Anesthetics">Anesthetics</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" onSelect={() => setDepartment("Billing")} eventKey="Billing">Billing</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" onSelect={() => setDepartment("Cardiology")} eventKey="Cardiology">Cardiology</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" onSelect={() => setDepartment("Dermatology")} eventKey="Dermatology">Dermatology</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" onSelect={() => setDepartment("Ear, Nose, and Throat (ENT)")} eventKey="Ear, Nose, and Throat (ENT)">Ear, Nose, and Throat (ENT)</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" onSelect={() => setDepartment("Emergency Department (ED)")} eventKey="Emergency Department (ED)">Emergency Department (ED)</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" onSelect={() => setDepartment("Environmental Services")} eventKey="Environmental Services">Environmental Services</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" onSelect={() => setDepartment("Gastroenterology")} eventKey="Gastroenterology">Gastroenterology</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" onSelect={() => setDepartment("Hematology")} eventKey="Hematology">Hematology</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" onSelect={() => setDepartment("Human Resources (HR)")} eventKey="Human Resources (HR)">Human Resources (HR)</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" onSelect={() => setDepartment("Imaging and Radiology")} eventKey="Imaging and Radiology">Imaging and Radiology</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" onSelect={() => setDepartment("Information Technology (IT)")} eventKey="Information Technology (IT)">Information Technology (IT)</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" onSelect={() => setDepartment("Intensive Care Unit (ICU)")} eventKey="Intensive Care Unit (ICU)">Intensive Care Unit (ICU)</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" onSelect={() => setDepartment("Materials Management")} eventKey="Materials Management">Materials Management</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" onSelect={() => setDepartment("Neonatal")} eventKey="Neonatal">Neonatal</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" onSelect={() => setDepartment("Neurology")} eventKey="Neurology">Neurology</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" onSelect={() => setDepartment("Nutrition and Dietics")} eventKey="Nutrition and Dietics">Nutrition and Dietics</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" onSelect={() => setDepartment("Oncology")} eventKey="Oncology">Oncology</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" onSelect={() => setDepartment("Orthopedics")} eventKey="Orthopedics">Orthopedics</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" onSelect={() => setDepartment("Pharmacy")} eventKey="Pharmacy">Pharmacy</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" onSelect={() => setDepartment("Physiotherapy")} eventKey="Physiotherapy">Physiotherapy</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" onSelect={() => setDepartment("Records and Billing")} eventKey="Records and Billing">Records and Billing</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" onSelect={() => setDepartment("Surgery")} eventKey="Surgery">Surgery</Dropdown.Item>
                            </DropdownButton>
                        </Row>

                        <Row className="justify-content-md-left mb-4 text-left">
                            <DropdownButton
                                id="itemFormDropdown"
                                title={valuePosition ? valuePosition : "Select Your Job Title"}
                                onSelect={handleSelectPosition}
                                defaultValue={0}
                            >
                                <Dropdown.Item id="dropdownOptions" onSelect={() => setPosition(1)} eventKey="Clerk">Clerk</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" onSelect={() => setPosition(2)} eventKey="Manager">Manager</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" onSelect={() => setPosition(3)} eventKey="Director">Director</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" onSelect={() => setPosition(4)} eventKey="Vice President">Vice President</Dropdown.Item>
                                <Dropdown.Item id="dropdownOptions" onSelect={() => setPosition(5)} eventKey="Materials Manager">Materials Manager</Dropdown.Item>
                            </DropdownButton>
                        </Row>
                        <div className="form-group">
                            <input
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
                            <input
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
                            <input
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
            <Row style={{ height: 400 }}></Row>
        </>
    );
};

export default Register;