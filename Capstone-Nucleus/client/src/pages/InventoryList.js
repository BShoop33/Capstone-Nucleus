import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { toast } from "react-toastify";
import { ItemSearch } from "./ItemSearch";
import { Button, Col, Container, Dropdown, DropdownButton, Form, Nav, Navbar, Row } from 'react-bootstrap';
// import { ItemCard } from "./ItemCard"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Inventory.css";

const InventoryList = () => {

    const history = useHistory();

    const [filteredItems, setFiltered] = useState([])
    const [value, setValue] = useState('');

    const { logout } = useContext(UserProfileContext);
    const logoutAndReturn = () => {
        return logout().then(() => {
            toast.dark("You are now logged out");
            history.push("/login");
        });
    };

    // const { item, getItems, searchTerms, roomFilter } = useContext(ItemContext)

    // const [ShowResults, setShowResults] = React.useState(false)
    // const Results = () => {
    //     if (ShowResults == true && value != "") {
    //         return <Button
    //             className="ClearFilterButton"
    //             variant="warning"
    //             onClick={() => { setFiltered(item); setShowResults(false); setValue("") }}
    //             type="button">Remove Filter
    //                 </Button>;
    //     }
    //     else {
    //         return null;
    //     }
    // }

    const handleSelect = (e) => {
        setValue(e)
    }
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    // useEffect(() => {
    //     getItems()
    // }, [])

    // useEffect(() => {
    //     if (searchTerms !== "") {
    //         const subset = item.filter(item => item.itemName.toLowerCase().includes(searchTerms.toLowerCase().trim()))
    //         setFiltered(subset)
    //     } else if (value !== "") {
    //         const subset2 = item.filter(item => item.itemLocation.includes(value))
    //         setFiltered(subset2)
    //         setShowResults(true)
    //     } else {
    //         setFiltered(item)
    //     }
    // }, [searchTerms, value, item])

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
                            history.push(`/editprofile`)
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
                {/* <Results /> */}
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
                <Col xl={2}></Col>
                <Col xl={2}></Col>
                <Col xl={3}></Col>
                <Form inline>
                    <DropdownButton
                        alignRight
                        id="input"
                        onSelect={handleSelect}
                        style={{ marginRight: 40, marginLeft: 85 }}
                        title="Filter By Location"
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
                    {/* <RoomFilter key={item.id} item={item} /> */}
                    <ItemSearch id="itemSearch" type="text" />
                </Form>
            </Row>
            <Row>""</Row>
            <Row className="justify-content-md-left">
                <Col id="columnHeaders" md="2">Image</Col>
                <Col id="columnHeaders" md="2">Location</Col>
                <Col id="columnHeaders" md="2">Vendor Name</Col>
                <Col id="columnHeaders" md="1">Item Name</Col>
                <Col id="columnHeaders" md="1">Item SKU</Col>
                <Col id="columnHeaders" md="1">Unit Price</Col>
                <Col id="columnHeaders" md="1">Quantity</Col>
            </Row>
            <hr className="hr-text" />
            {/* {
                filteredItems.map(item => {
                    return <ItemCard key={item.id} item={item} />
                })
            } */}
        </>
    );
};

export default InventoryList;