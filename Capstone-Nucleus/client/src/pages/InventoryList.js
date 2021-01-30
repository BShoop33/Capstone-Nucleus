import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import "./Login.css";
import { NavbarBrand, Button, Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, ButtonDropdown, Form, Nav, Navbar, Row } from "reactstrap";
import { toast } from "react-toastify";
// import { ItemCard } from "./ItemCard"
// import { ItemSearch } from "./SearchTerms"



const InventoryList = () => {

    const { logout } = useContext(UserProfileContext);

    const logoutAndReturn = () => {
        return logout().then(() => {
            toast.dark("You are now logged out");
            history.push("/login");
        });
    };

    // const { item, getItems, searchTerms, roomFilter } = useContext(ItemContext)
    const history = useHistory();
    const [filteredItems, setFiltered] = useState([])
    const [value, setValue] = useState('');
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
                <Navbar >
                    <img style={{ width: 175, height: 125 }} className="NucleusLoginLogo" src="\Images\NucleusLogo.png" alt="Nucleus Logo" />
                    <NavbarBrand href="#home">Inventory</NavbarBrand>
                    <Button href="#home">Dashboard</Button>
                    <Nav fixed="top" className="mr-auto">

                    </Nav>

                    <Button onClick={logoutAndReturn}>Logout</Button>
                </Navbar>
            </Container>

            <Row>
                {/* <Results /> */}
                <Form inline>
                    <Dropdown
                        isOpen={dropdownOpen}
                        toggle={toggle}
                        title="Filter By Location"
                        onSelect={handleSelect}
                    >
                        <DropdownToggle caret>
                            Dropdown
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem >AmSurg PAR 1</DropdownItem>
                            <DropdownItem >AmSurg PAR 2</DropdownItem>
                            <DropdownItem >AmSurg PAR 3</DropdownItem>
                            <DropdownItem >Emergency Room PAR 1</DropdownItem>
                            <DropdownItem >Emergency Room PAR 2</DropdownItem>
                            <DropdownItem >ICU PAR 1</DropdownItem>
                            <DropdownItem >ICU PAR 2</DropdownItem>
                            <DropdownItem >Gastroenterology PAR 1</DropdownItem>
                            <DropdownItem >Hematology PAR 1</DropdownItem>
                            <DropdownItem >Hematology PAR 2</DropdownItem>
                            <DropdownItem >Materials Management</DropdownItem>
                            <DropdownItem >Neurology PAR 1</DropdownItem>
                            <DropdownItem >Pharmacy</DropdownItem>
                            <DropdownItem >Store Room 1</DropdownItem>
                            <DropdownItem >Store Room 2</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    {/* <RoomFilter key={item.id} item={item} />
                    <ItemSearch type="text" className="mr-sm-2" key={item.id} item={item} /> */}
                </Form>
            </Row>

            {/* <Row>
                <Button
                    variant="info"
                    className="AddItemButton"
                    onClick={() => {
                        history.push(`/additem`)
                    }}
                    type="button">Add New Item
                 </Button>
            </Row> */}
            <Row className="justify-content-md-left">
                <Col md="2">Item Name</Col>
                <Col md="2">Location</Col>
                <Col md="3">Description</Col>
                <Col md="1">Serial Number</Col>
                <Col md="3">Notes</Col>
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