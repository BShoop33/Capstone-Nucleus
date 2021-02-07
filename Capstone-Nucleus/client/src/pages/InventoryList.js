import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { toast } from "react-toastify";
import ItemCard from "./ItemCard";
import { Button, Col, Container, Dropdown, DropdownButton, FormControl, Nav, Navbar, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Inventory.css";

const InventoryList = () => {

    const history = useHistory();

    const [filteredItems, setFiltered] = useState([])
    const [items, setItems] = useState([])
    const [locationFilterValue, setItemLocation] = useState(0)
    const [searchTerms, setSearchTerms] = useState('')
    const [value, setValue] = useState('');

    const { getToken, getCurrentUser } = useContext(UserProfileContext);
    const { logout } = useContext(UserProfileContext);

    const currentUser = getCurrentUser();

    const handleSelect = (e) => {
        setValue(e)
    }

    const logoutAndReturn = () => {
        return logout().then(() => {
            toast.dark("You are now logged out");
            history.push("/login");
        });
    };

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
        if (searchTerms !== "") {
            const subset = items.filter(items => items.itemName.toLowerCase().includes(searchTerms.toLowerCase().trim()))
            setFiltered(subset)
        } else if (value !== "") {
            const subset2 = items.filter(items => items.departmentId === locationFilterValue)
            setFiltered(subset2)
        } else {
            setFiltered(items)
        }
    }, [items, locationFilterValue, searchTerms, value])

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
                            <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(23)} eventKey="Records and Reception">Records and Billing</Dropdown.Item>
                            <Dropdown.Item id="dropdownOptions" onSelect={() => setItemLocation(24)} eventKey="Surgery">Surgery</Dropdown.Item>
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
                <Col id="columnHeaders" md="1">Vendor Name</Col>
                <Col id="columnHeaders" md="2">Item Name</Col>
                <Col id="columnHeaders" md="1">Item SKU</Col>
                <Col id="columnHeaders" md="1">Unit Price</Col>
                <Col id="columnHeaders" md="1">Total Price of All Units</Col>
                <Col id="columnHeaders" md="1">Quantity by Department</Col>
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