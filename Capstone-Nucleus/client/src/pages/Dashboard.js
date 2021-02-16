import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import { Button, Container, Nav, Navbar, Row } from 'react-bootstrap'
import { toast } from "react-toastify";
import { UserProfileContext } from "../providers/UserProfileProvider";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Inventory.css";

const Dashboard = () => {
    const { logout } = useContext(UserProfileContext);
    const history = useHistory();
    const [count, setCount] = useState([])
    const [month, setMonth] = useState([])

    const logoutAndReturn = () => {
        return logout().then(() => {
            toast.dark("You are now logged out");
            history.push("/login");
        });
    };

    useEffect(() => {
        fetch("/api/item/count")
            .then((res) => res.json())
            .then((count) => {
                setCount(count);
            });
    }, []);

    useEffect(() => {
        fetch("/api/item/month")
            .then((res) => res.json())
            .then((month) => {
                setMonth(month);
            });
    }, []);

    // Total # of Items by Department YTD
    const getTotalQuantity = () => {
        return count.map(count => count.totalQuantity)
    };
    const totalQuantityYTD = getTotalQuantity();

    //Total Expenditure by Department YTD
    const getTotalExpenditure = () => {
        return count.map(count => count.totalPrice.toFixed(2))
    };
    const totalExpenditureYTD = getTotalExpenditure();

    //Monthly Expenditure YTD
    const getMonthlyExpenditure = () => {
        return month.map(month => month.monthlyTotalPrice.toFixed(2))
    };
    const monthlyExpenditureYTD = getMonthlyExpenditure()

    //Monthly Quantity YTD
    const getMonthlyQuantity = () => {
        return month.map(month => month.monthlyTotalQuantity)
    };
    const monthlyQuantityYTD = getMonthlyQuantity()

    let convertedDepartments = count.map(count => {
        if (count.departmentId === 1) {
            return "Administrative Services"
        }
        if (count.departmentId === 2) {
            return "Anesthetics"
        }
        if (count.departmentId === 3) {
            return "Billing"
        }
        if (count.departmentId === 4) {
            return "Cardiology"
        }
        if (count.departmentId === 5) {
            return "Dermatology"
        }
        if (count.departmentId === 6) {
            return "Ear, Nose, and Throat (ENT)"
        }
        if (count.departmentId === 7) {
            return "Emergency Department (ED)"
        }
        if (count.departmentId === 8) {
            return "Environmental Services"
        }
        if (count.departmentId === 9) {
            return "Gastroenterology"
        }
        if (count.departmentId === 10) {
            return "Hematology"
        }
        if (count.departmentId === 11) {
            return "Human Resources (HR)"
        }
        if (count.departmentId === 12) {
            return "Imaging and Radiology"
        }
        if (count.departmentId === 13) {
            return "Information Technology (IT)"
        }
        if (count.departmentId === 14) {
            return "Intensive Care Unit (ICU)"
        }
        if (count.departmentId === 15) {
            return "Materials Management"
        }
        if (count.departmentId === 16) {
            return "Neonatal"
        }
        if (count.departmentId === 17) {
            return "Neurology"
        }
        if (count.departmentId === 18) {
            return "Nutrition and Dietics"
        }
        if (count.departmentId === 19) {
            return "Oncology"
        }
        if (count.departmentId === 20) {
            return "Orthopedics"
        }
        if (count.departmentId === 21) {
            return "Pharmacy"
        }
        if (count.departmentId === 22) {
            return "Physiotherapy"
        }
        if (count.departmentId === 23) {
            return "Records and Reception"
        }
        if (count.departmentId === 24) {
            return "Surgery"
        }
        else { return "" }
    })

    let convertedMonths = month.map(month => {
        if (month.dateReceived === 1) {
            return "January"
        }
        else if (month.dateReceived === 2) {
            return "February"
        }
        else if (month.dateReceived === 3) {
            return "March"
        }
        else if (month.dateReceived === 4) {
            return "April"
        }
        else if (month.dateReceived === 5) {
            return "May"
        }
        else if (month.dateReceived === 6) {
            return "June"
        }
        else if (month.dateReceived === 7) {
            return "July"
        }
        else if (month.dateReceived === 8) {
            return "August"
        }
        else if (month.dateReceived === 9) {
            return "September"
        }
        else if (month.dateReceived === 10) {
            return "October"
        }
        else if (month.dateReceived === 11) {
            return "November"
        }
        else if (month.dateReceived === 12) {
            return "December"
        }
        else { return "" }
    })

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
                <div id="chartStyling" style={{ height: 600, width: 900, marginLeft: 30, marginRight: 70 }}>
                    <Doughnut
                        data={{
                            labels: convertedDepartments,
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
                            }
                        }}
                    ></Doughnut>
                </div>

                <div id="chartStyling" style={{ height: 600, width: 900 }}>
                    <Pie
                        data={{
                            labels: convertedDepartments,
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
                            }
                        }}
                    ></Pie>
                </div>
            </Row>

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