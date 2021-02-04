import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { toast } from "react-toastify";
import { ItemSearch } from "./ItemSearch";
import ItemCard from "./ItemCard";
import { Button, Col, Container, Dropdown, DropdownButton, FormControl, Nav, Navbar, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Inventory.css";

const InventoryList = () => {


    const history = useHistory();

    const [ShowResults, setShowResults] = React.useState(false)
    const [searchTerms, setSearchTerms] = useState('')
    const [filteredItems, setFiltered] = useState([])

    const [items, setItems] = useState([])

    const [value, setValue] = useState('');
    const { getToken, getCurrentUser } = useContext(UserProfileContext);
    const { logout } = useContext(UserProfileContext);
    const logoutAndReturn = () => {
        return logout().then(() => {
            toast.dark("You are now logged out");
            history.push("/login");
        });
    };

    const handleSelect = (e) => {
        setValue(e)
    }

    const getItems = () => {
        getToken().then((token) =>
            fetch(`/api/item`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((items) => {
                    setItems(items);
                })
        );
    };

    useEffect(() => {
        fetch("/api/item")
            .then((res) => res.json())
            .then((items) => {
                setItems(items);
            });
    }, []);

    useEffect(() => {
        setSearchTerms("")
    }, [setSearchTerms])

    const currentUser = getCurrentUser();

    useEffect(() => {
        if (searchTerms !== "") {
            const subset = items.filter(items => items.department.name.toLowerCase().includes(searchTerms.toLowerCase().trim()))
            setFiltered(subset)
        } else if (value !== "") {
            const subset2 = items.filter(items => items.departmentId.includes(value))
            setFiltered(subset2)
            setShowResults(true)

        } else {
            setFiltered(items)
        }
    }, [searchTerms, value, items])

    const Results = () => {
        if (value !== "") {
            return <Button
                className="ClearFilterButton"
                id="removeFilterButton"
                onClick={() => { setValue("") }}
                type="button"
                variant="warning"
            >Remove Filter
                </Button>;
        }
        else {
            return <div className="ClearFilterButton" id="removeFilterButton"></div>;
        }
    }





    return (
        <>
            <Container fluid>
                <Navbar bg="dark" variant="tabs">
                    <img alt="Nucleus Logo" className="NucleusInventoryLogo" src="\Images\NucleusLogo.png" />
                    <Button
                        className="mt-1 ml-5"
                        id="navLinks"
                        onClick={() => {
                            history.push(`/dashboard`)
                        }}
                        variant="outline"
                    >Dashboard
                    </Button>
                    <Nav className="mr-auto" fixed="top"></Nav>
                    <Button
                        className="mt-1 mr-5"
                        id="navLinks"
                        onClick={() => {
                            history.push(`/editprofile/${currentUser.id}`)
                        }}
                        variant="outline"
                    >Edit Profile
                    </Button>
                    <Button
                        className="mt-1 mr-5"
                        id="navLinks"
                        onClick={logoutAndReturn}
                        variant="outline"
                    >Logout
                    </Button>
                </Navbar>
            </Container>

            <Row>
                <Button
                    className="addItemButton ml-5"
                    id="input"
                    onClick={() => {
                        history.push(`/additem`)
                    }}
                    type="button"
                    variant="success"
                >Add New Item
                </Button>
                <Col md={4} style={{ marginRight: 60 }}></Col>
                <Row>
                    <Col>
                        <Results />
                    </Col>
                    <Col>
                        <DropdownButton
                            alignRight
                            className="mx-5"
                            id="locationFilterDropdown"
                            onSelect={handleSelect}
                            title={value ? value : "Filter by Location"}
                        >
                            <Dropdown.Item eventKey="Administrative Services" id="dropdownOptions">Administrative Services</Dropdown.Item>
                            <Dropdown.Item eventKey="Anesthetics" id="dropdownOptions">Anesthetics</Dropdown.Item>
                            <Dropdown.Item eventKey="Billing" id="dropdownOptions">Billing</Dropdown.Item>
                            <Dropdown.Item eventKey="Cardiology" id="dropdownOptions">Cardiology</Dropdown.Item>
                            <Dropdown.Item eventKey="Dermatology" id="dropdownOptions">Dermatology</Dropdown.Item>
                            <Dropdown.Item eventKey="Ear, Nose, and Throat (ENT)" id="dropdownOptions">Ear, Nose, and Throat (ENT)</Dropdown.Item>
                            <Dropdown.Item eventKey="Emergency Department (ED)" id="dropdownOptions">Emergency Department (ED)</Dropdown.Item>
                            <Dropdown.Item eventKey="Gastroenterology" id="dropdownOptions">Gastroenterology</Dropdown.Item>
                            <Dropdown.Item eventKey="Gynecology" id="dropdownOptions">Gynecology</Dropdown.Item>
                            <Dropdown.Item eventKey="Hematology" id="dropdownOptions">Hematology</Dropdown.Item>
                            <Dropdown.Item eventKey="Human Resources (HR)" id="dropdownOptions">Human Resources (HR)</Dropdown.Item>
                            <Dropdown.Item eventKey="Imaging and Radiology" id="dropdownOptions">Imaging and Radiology</Dropdown.Item>
                            <Dropdown.Item eventKey="Information Technology (IT)" id="dropdownOptions">Information Technology (IT)</Dropdown.Item>
                            <Dropdown.Item eventKey="Intensive Care Unit (ICU)" id="dropdownOptions">Intensive Care Unit (ICU)</Dropdown.Item>
                            <Dropdown.Item eventKey="Materials Management" id="dropdownOptions">Materials Management</Dropdown.Item>
                            <Dropdown.Item eventKey="Neonatal" id="dropdownOptions">Neonatal</Dropdown.Item>
                            <Dropdown.Item eventKey="Neurology" id="dropdownOptions">Neurology</Dropdown.Item>
                            <Dropdown.Item eventKey="Nutrition and Dietics" id="dropdownOptions">Nutrition and Dietics</Dropdown.Item>
                            <Dropdown.Item eventKey="Oncology" id="dropdownOptions">Oncology</Dropdown.Item>
                            <Dropdown.Item eventKey="Orthopedics" id="dropdownOptions">Orthopedics</Dropdown.Item>
                            <Dropdown.Item eventKey="Pharmacy" id="dropdownOptions">Pharmacy</Dropdown.Item>
                            <Dropdown.Item eventKey="Physiotherapy" id="dropdownOptions">Physiotherapy</Dropdown.Item>
                            <Dropdown.Item eventKey="Records and Billing" id="dropdownOptions">Records and Billing</Dropdown.Item>
                            <Dropdown.Item eventKey="Surgery" id="dropdownOptions">Surgery</Dropdown.Item>
                            <Dropdown.Item eventKey="Urology" id="dropdownOptions">Urology</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                    <Col>
                        <FormControl type="text"
                            className="SearchBar"
                            id="itemSearch"
                            onKeyUp={
                                (keyEvent) => setSearchTerms(keyEvent.target.value)
                            }
                            placeholder="Search by Item Name" />
                    </Col>
                </Row>
            </Row>
            <Row>""</Row>
            <Row className="justify-content-md-left">
                <Col id="columnHeaders" md="2">Image</Col>
                <Col id="columnHeaders" md="2">Department</Col>
                <Col id="columnHeaders" md="2">Vendor Name</Col>
                <Col id="columnHeaders" md="2">Item Name</Col>
                <Col id="columnHeaders" md="1">Item SKU</Col>
                <Col id="columnHeaders" md="1">Unit Price</Col>
                <Col id="columnHeaders" md="1">Quantity</Col>
            </Row>
            <hr id="hrStyling" />
            {
                filteredItems.map(item => {
                    return <ItemCard key={item.id} item={item} getItems={getItems} />
                })
            }
        </>
    );
};

export default InventoryList;