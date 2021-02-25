import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import { Button, Container, FormControl, Nav, Navbar, Row } from 'react-bootstrap'
import { toast } from "react-toastify";
import { UserProfileContext } from "../providers/UserProfileProvider";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Inventory.css";

const Dashboard = () => {

    const { logout } = useContext(UserProfileContext);

    const history = useHistory();

    const [quantity, setQuantity] = useState([])
    const [price, setPrice] = useState([])
    const [month, setMonth] = useState([])
    const [quantityYTD, setTotalQuantityYTD] = useState(0)
    const [priceYTD, setTotalPriceYTD] = useState(0)

    /*When invoked, invokes the logout function, which logs the user out of Nucleus. Then initiates a toast to let the user
    know they are logged out and navigates the user to the login page*/
    const logoutAndReturn = () => {
        return logout().then(() => {
            toast.dark("You are now logged out");
            history.push("/login");
        });
    };

    /*(Total # of Items by Department YTD) When invoked, returns the totalQuantity value of each item. Then saves those values in the
    totalQuantityYTD variable.*/
    const getTotalQuantity = () => {
        return quantity.map(quantity => quantity.totalQuantity)
    };
    const totalQuantityYTD = getTotalQuantity();

    /*(Total Expenditure by Department YTD) When invoked, returns the totalPrice value of each item. Then saves those values in the
    totalExpenditureYTD variable.*/
    const getTotalExpenditure = () => {
        return price.map(price => price.totalPrice.toFixed(2))
    };
    const totalExpenditureYTD = getTotalExpenditure();

    /*(Monthly Quantity YTD) When invoked, returns the monthly sum of total item quantities. Then saves those values in the
    monthlyQuantityYTD variable.*/
    const getMonthlyQuantity = () => {
        return month.map(month => month.monthlyTotalQuantity)
    };
    const monthlyQuantityYTD = getMonthlyQuantity()

    /*(Monthly Expenditure YTD) When invoked, returns the monthly sum of total item expenditures. Then saves those values in the
    monthlyQuantityYTD variable.*/
    const getMonthlyExpenditure = () => {
        return month.map(month => month.monthlyTotalPrice.toFixed(2))
    };
    const monthlyExpenditureYTD = getMonthlyExpenditure()

    //For total quantity, converts the numerical values for departments to department names
    let convertedQuantityDepartments = quantity.map(quantity => {
        switch (quantity.departmentId) {
            case 1:
                return "Administrative Services";
            case 2:
                return "Anesthetics";
            case 3:
                return "Billing";
            case 4:
                return "Cardiology";
            case 5:
                return "Dermatology";
            case 6:
                return "Ear, Nose, and Throat (ENT)";
            case 7:
                return "Emergency Department (ED)";
            case 8:
                return "Environmental Services";
            case 9:
                return "Gastroenterology";
            case 10:
                return "Hematology";
            case 11:
                return "Human Resources (HR)";
            case 12:
                return "Imaging and Radiology";
            case 13:
                return "Information Technology (IT)";
            case 14:
                return "Intensive Care Unit (ICU)";
            case 15:
                return "Materials Management";
            case 16:
                return "Neonatal";
            case 17:
                return "Neurology";
            case 18:
                return "Nutrition and Dietics";
            case 19:
                return "Oncology";
            case 20:
                return "Orthopedics";
            case 21:
                return "Pharmacy";
            case 22:
                return "Physiotherapy";
            case 23:
                return "Records and Reception";
            case 24:
                return "Surgery";
            default:
                return "";
        }
    })

    //For total price, converts the numerical values for departments to department names
    let convertedPriceDepartments = price.map(price => {
        switch (price.departmentId) {
            case 1:
                return "Administrative Services";
            case 2:
                return "Anesthetics";
            case 3:
                return "Billing";
            case 4:
                return "Cardiology";
            case 5:
                return "Dermatology";
            case 6:
                return "Ear, Nose, and Throat (ENT)";
            case 7:
                return "Emergency Department (ED)";
            case 8:
                return "Environmental Services";
            case 9:
                return "Gastroenterology";
            case 10:
                return "Hematology";
            case 11:
                return "Human Resources (HR)";
            case 12:
                return "Imaging and Radiology";
            case 13:
                return "Information Technology (IT)";
            case 14:
                return "Intensive Care Unit (ICU)";
            case 15:
                return "Materials Management";
            case 16:
                return "Neonatal";
            case 17:
                return "Neurology";
            case 18:
                return "Nutrition and Dietics";
            case 19:
                return "Oncology";
            case 20:
                return "Orthopedics";
            case 21:
                return "Pharmacy";
            case 22:
                return "Physiotherapy";
            case 23:
                return "Records and Reception";
            case 24:
                return "Surgery";
            default:
                return "";
        }
    })

    //Converts the numerical values for month of date received to named months
    let convertedMonths = month.map(month => {
        switch (month.dateReceived) {
            case 1:
                return "January";
            case 2:
                return "February";
            case 3:
                return "March";
            case 4:
                return "April";
            case 5:
                return "May";
            case 6:
                return "June";
            case 7:
                return "July";
            case 8:
                return "August";
            case 9:
                return "September";
            case 10:
                return "October";
            case 11:
                return "November";
            case 12:
                return "December";
            default:
                return "";
        }
    })

    /*On page load, the total quantities grouped by department and declares them in json format as the value for the quantity variable. This 
    useEffect hook only loads once.*/
    useEffect(() => {
        fetch("/api/item/quantity")
            .then((res) => res.json())
            .then((quantity) => {
                setQuantity(quantity)
            });
    }, []);

    /*On page load, fetches the total prices grouped by department and declares them in json format as the value for the price variable. This 
    useEffect hook only loads once.*/
    useEffect(() => {
        fetch("/api/item/price")
            .then((res) => res.json())
            .then((price) => {
                setPrice(price);
            });
    }, []);

    /*On page load, fetches all item monthly total quantities and monthly total prices grouped by the month of the date received within 
    the past 12 months and declares them in json format as the value for the month variable. This useEffect hook only loads once.*/
    useEffect(() => {
        fetch("/api/item/month")
            .then((res) => res.json())
            .then((month) => {
                setMonth(month);
            });
    }, []);

    /*(Quantity Floor Filter). On page load, fetches all item quantities and converts them into json format. Then performs an evaluation to 
    determine whether the value the user entered (quantityYTD) is 0. If it is, then this filter is not applied so all quantities within the 
    past 12 months are declared as the value for the quantity variable. If it is not, then the quantityFloor variable is initialized with 
    the value of the filtered item quantities, which are all item quantities greater than or equal to the value the user entered. This 
    useEffect hook loads any time the quantity or quantityYTD variables change state using the useState hook.*/
    useEffect(() => {
        fetch("/api/item/quantity")
            .then((res) => res.json())
            .then((quantity) => {
                if (quantityYTD === 0) {
                    setQuantity(quantity);
                } else {
                    const quantityFloor = quantity.filter(quantity => quantity.totalQuantity >= quantityYTD)
                    setQuantity(quantityFloor);
                }
            });
    }, [quantity, quantityYTD]);

    /*(Price Floor Filter). On page load, fetches all item prices and converts them into json format. Then performs an evaluation to 
    determine whether the value the user entered (priceYTD) is 0. If it is, then this filter is not applied so all prices within the 
    past 12 months are declared as the value for the price variable. If it is not, then the priceFloor variable is initialized with 
    the value of the filtered item prices, which are all item prices greater than or equal to the value the user entered. This 
    useEffect hook loads any time the price or priceYTD variables change state using the useState hook.*/
    useEffect(() => {
        fetch("/api/item/price")
            .then((res) => res.json())
            .then((price) => {
                if (priceYTD === 0) {
                    setPrice(price);
                } else {
                    const priceFloor = price.filter(price => price.totalPrice >= priceYTD)
                    setPrice(priceFloor);
                }
            });
    }, [quantity, quantityYTD]);

    return (
        <>
            <Container fluid>
                <Navbar bg="dark" variant="tabs">
                    <img id="nucleusLogo" src="\Images\NucleusLogo.png" alt="Nucleus Logo" />
                    <Button
                        id="navLinks"
                        className="mt-1 ml-5"
                        onClick={() => {
                            history.push(`/`)
                        }}
                        variant="outline"
                    >Inventory</Button>
                    <Nav fixed="top" className="mr-auto"></Nav>
                    <Button
                        id="navLinks"
                        className="mt-1 mr-5"
                        variant="outline"
                        onClick={logoutAndReturn}
                    >Logout
                    </Button>
                </Navbar>
            </Container>
            <Row>
                {/* Total Quantity by Department YTD Doughnut Chart */}
                <div id="chartStyling" style={{ height: 750, width: 900, marginLeft: 30, marginRight: 70 }}>
                    <Row className="justify-content-md-left" style={{ marginTop: -12, marginLeft: 15 }}>
                        <label
                            className="quantityFloor text-left mr-n1"
                            id="input"
                            style={{ width: 700, height: 5, marginTop: 2, fontSize: 18 }}
                        >Quantity Floor <span style={{ fontSize: 17 }}>(enter a number to hide departments with fewer items)</span>:
                        </label>
                        <FormControl
                            type="text"
                            className="quantityFloorInput mb-4 ml-n5"
                            id="input"
                            name="quantityFloorValue"
                            onKeyUp={
                                (keyEvent) => {
                                    setTotalQuantityYTD(keyEvent.target.value)
                                }
                            }
                            defaultValue={0}
                            style={{ width: 75, height: 35, fontSize: 18 }}
                        />
                    </Row>

                    <Doughnut
                        data={{
                            labels: convertedQuantityDepartments,
                            datasets: [{
                                label: ["Total # of Items by Department YTD"],
                                data: totalQuantityYTD,
                                backgroundColor: [
                                    'rgba(255, 0, 0, 1)',
                                    'rgba(0, 0, 255, .5)',
                                    'rgba(253, 150, 64, 1)',
                                    'rgba(250, 8, 126, .9)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(136, 8, 255, 1)',
                                    'rgba(123, 224, 0, 1)',
                                    'rgba(80, 150, 75, .5)',
                                    'rgba(40, 75, 150, 1)',
                                    'rgba(200, 150, 150, .6)',
                                    'rgba(80, 100, 50, 1)',
                                    'rgba(248, 255, 8, 1)',
                                    'rgba(153, 102, 6, 1)',
                                    'rgba(138, 177, 150, 1)',
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(0, 255, 0, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(0, 0, 255, 1)',
                                    'rgba(160, 166, 5, .6)',
                                    'rgba(20, 75, 5, .6)',
                                    'rgba(160, 5, 5, 1)',
                                    'rgba(90, 90, 90, .6)',
                                    'rgba(200, 125, 150, 1)',
                                ]
                            }],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            title: {
                                display: true,
                                text: "Total # of Items by Department YTD",
                                fontColor: 'black',
                                fontSize: '18',
                                padding: '5'
                            },
                            legend: {
                                display: true,
                                position: 'left',
                            }
                        }}
                    ></Doughnut>
                </div>

                {/* Total Price by Department YTD Chart */}
                <div id="chartStyling" style={{ height: 750, width: 900 }}>
                    <Row className="justify-content-md-left" style={{ marginTop: -12, marginLeft: 15 }}>
                        <label
                            className="priceFloor text-left mr-n1"
                            id="input"
                            style={{ width: 725, height: 5, marginTop: 2, fontSize: 18 }}
                        >Price Floor <span style={{ fontSize: 17 }}>(enter a number to hide departments with lower expenditures)</span>:
                        </label>
                        <FormControl
                            type="text"
                            className="priceFloorInput mb-4 ml-n5"
                            id="input"
                            name="quantityFloorValue"
                            onKeyUp={
                                (keyEvent) => {
                                    setTotalPriceYTD(keyEvent.target.value)
                                }
                            }
                            defaultValue={0}
                            style={{ width: 75, height: 35, fontSize: 18 }}
                        />
                    </Row>

                    <Pie
                        data={{
                            labels: convertedPriceDepartments,
                            datasets: [{
                                label: 'Expenditure $',
                                data: totalExpenditureYTD,
                                backgroundColor: [
                                    'rgba(255, 0, 0, 1)',
                                    'rgba(0, 0, 255, .5)',
                                    'rgba(253, 150, 64, 1)',
                                    'rgba(250, 8, 126, .9)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(136, 8, 255, 1)',
                                    'rgba(123, 224, 0, 1)',
                                    'rgba(80, 150, 75, .5)',
                                    'rgba(40, 75, 150, 1)',
                                    'rgba(200, 150, 150, .6)',
                                    'rgba(80, 100, 50, 1)',
                                    'rgba(248, 255, 8, 1)',
                                    'rgba(153, 102, 6, 1)',
                                    'rgba(138, 177, 150, 1)',
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(0, 255, 0, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(0, 0, 255, 1)',
                                    'rgba(160, 166, 5, .6)',
                                    'rgba(20, 75, 5, .6)',
                                    'rgba(160, 5, 5, 1)',
                                    'rgba(90, 90, 90, .6)',
                                    'rgba(200, 125, 150, 1)',
                                ]
                            }]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            title: {
                                display: true,
                                text: "Total Expenditure by Department YTD",
                                fontColor: 'black',
                                fontSize: '18'
                            },
                            legend: {
                                display: true,
                                position: 'left',
                            }
                        }}
                    ></Pie>
                </div>
            </Row>

            {/* Total Quantity for Hospital by Month Chart */}
            <Row style={{ marginTop: 25, marginBottom: 75 }}>
                <div id="chartStyling" style={{ height: 600, width: 900, marginLeft: 30, marginRight: 70 }}>
                    <Bar
                        data={{
                            labels: convertedMonths,
                            datasets: [{
                                label: '# of Items',
                                data: monthlyQuantityYTD,
                                backgroundColor: [
                                    'rgba(255, 0, 0, 1)',
                                    'rgba(0, 0, 255, .5)',
                                    'rgba(253, 150, 64, 1)',
                                    'rgba(250, 8, 126, .9)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(136, 8, 255, 1)',
                                    'rgba(123, 224, 0, 1)',
                                    'rgba(80, 150, 75, .5)',
                                    'rgba(40, 75, 150, 1)',
                                    'rgba(200, 150, 150, .6)',
                                    'rgba(80, 100, 50, 1)',
                                    'rgba(248, 255, 8, 1)',
                                    'rgba(153, 102, 6, 1)',
                                    'rgba(138, 177, 150, 1)',
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(0, 255, 0, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(0, 0, 255, 1)',
                                    'rgba(160, 166, 5, .6)',
                                    'rgba(20, 75, 5, .6)',
                                    'rgba(160, 5, 5, 1)',
                                    'rgba(90, 90, 90, .6)',
                                    'rgba(200, 125, 150, 1)',
                                ]
                            }]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            title: {
                                display: true,
                                text: 'Total Hospital Inventory by Month',
                                fontColor: 'black',
                                fontSize: '18',
                                padding: '5'
                            },
                            legend: {
                                display: false
                            }
                        }}
                    ></Bar>
                </div>

                {/* Total Expenditure for Hospital by Month Chart */}
                <div id="chartStyling" style={{ height: 600, width: 900 }}>
                    <Line
                        data={{
                            labels: convertedMonths,
                            datasets: [{
                                label: 'Expenditure $',
                                data: monthlyExpenditureYTD,
                                backgroundColor: [
                                    'rgba(54, 162, 235, .7)',
                                ]
                            }]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            title: {
                                display: true,
                                text: 'Total Hospital Expenditure by Month',
                                fontColor: 'black',
                                fontSize: '18',
                                padding: '5'
                            },
                            legend: {
                                display: false
                            }
                        }}
                    ></Line>
                </div>
            </Row>
            <Row></Row>
        </>
    );
};

export default Dashboard;