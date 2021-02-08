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
        return count.map(count => count.totalPrice)
    };
    const totalExpenditureYTD = getTotalExpenditure();

    const getTotalExpenditureDepartments = () => {
        return count.map(count => count.departmentId)
    };
    const totalExpenditureDepartments = getTotalExpenditureDepartments();

    //Monthly Expenditure YTD
    const getMonthlyExpenditure = () => {
        return month.map(month => month.monthlyTotalPrice)
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
            return "Records and Billing"
        }
        if (count.departmentId === 24) {
            return "Surgery"
        }
        else { return "" }
    })

    console.log(convertedDepartments)

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






    // let allDepartmentIds = itemGroupOne.map(item => item.departmentId)
    // let allUnitPrices = itemGroupOne.map(item => item.unitPrice)

    // const uniqueDepartmentIds = allDepartmentIds.filter(unique)
    // console.log(uniqueDepartmentIds)

    // const itemPrice = () => {
    //     if (itemGroupOne.map(item => item.departmentId) === uniqueDepartmentIds) {
    //         return itemGroupOne.map(item => item.unitPrice)
    //     }
    // }
    // let price = itemPrice()
    // console.log(price)

    // let check = departmentNameCheck = () => {
    //     if (item.departmentId === )
    // }
    // console.log(priceOne)

    // let priceTesting = 0

    // const SettingVendor = () => {
    //     if (itemGroupOne.map(item => item.id) === itemGroupTwo.map(item => item.id)) {
    //         priceTesting = itemGroupOne.id
    //     }
    //     return priceTesting
    // }
    // console.log(SettingVendor())

    // let priceTesting = userId.map(item => {
    //     // item.forEach(item => {
    //     if (item.id === item.id) {
    //         return item.unitPrice += item.unitPrice
    //     } else { return item.unitPrice }
    //     // })
    // })
    // console.log(priceTesting)

    // var quantities = userId.map(item => item.quantity);
    // console.log(quantities)
    // var departmentNames = userId.map(item => item.department.name)


    // const filteredDepartmentNames = departmentNameFilter();
    // console.log(departmentNames)

    // var receiveDate = userId.map(item => item.dateReceived);
    // console.log(receiveDate)

    // var price = userId.map(item => item.unitPrice);
    // console.log(price)


    return (
        <>
            <Container fluid>
                <Navbar bg="dark" variant="tabs">
                    <img className="NucleusInventoryLogo" src="\Images\NucleusLogo.png" alt="Nucleus Logo" />
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
                                label: '',
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
                                    'rgba(54, 162, 235, 1)',
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














// import React, { useContext, useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
// import { Button, Container, Nav, Navbar, Row } from 'react-bootstrap'
// import { toast } from "react-toastify";
// import { UserProfileContext } from "../providers/UserProfileProvider";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "./Inventory.css";

// const Dashboard = () => {

//     const { logout } = useContext(UserProfileContext);
//     const history = useHistory();
//     const [items, setItems] = useState([])

//     const logoutAndReturn = () => {
//         return logout().then(() => {
//             toast.dark("You are now logged out");
//             history.push("/login");
//         });
//     };

//     useEffect(() => {
//         fetch("/api/item")
//             .then((res) => res.json())
//             .then((items) => {
//                 setItems(items);
//             });
//     }, []);

//     const userId = items;

//     let priceTesting = userId.map(item => {
//         // item.forEach(item => {
//         if (item.id === item.id) {
//             return item.unitPrice += item.unitPrice
//         } else { return item.unitPrice }
//         // })
//     })
//     console.log(priceTesting)

//     var quantities = userId.map(item => item.quantity);
//     // console.log(quantities)
//     var departmentNames = userId.map(item => item.department.name)


//     // const filteredDepartmentNames = departmentNameFilter();
//     // console.log(departmentNames)

//     var receiveDate = userId.map(item => item.dateReceived);
//     // console.log(receiveDate)

//     // var price = userId.map(item => item.unitPrice);
//     // console.log(price)

//     let test = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

//     return (
//         <>
//             <Container fluid>
//                 <Navbar bg="dark" variant="tabs">
//                     <img className="NucleusInventoryLogo" src="\Images\NucleusLogo.png" alt="Nucleus Logo" />
//                     <Button
//                         id="navLinks"
//                         className="mt-1 ml-5"
//                         onClick={() => {
//                             history.push(`/`)
//                         }}
//                         variant="outline"
//                     >Inventory</Button>
//                     <Nav fixed="top" className="mr-auto"></Nav>
//                     <Button
//                         id="navLinks"
//                         className="mt-1 mr-5"
//                         variant="outline"
//                         onClick={logoutAndReturn}
//                     >Logout
//                     </Button>
//                 </Navbar>
//             </Container>
//             <Row>
//                 <div id="chartStyling" style={{ height: 700, width: 700, marginLeft: 300, marginRight: 300 }}>
//                     <Pie
//                         data={{
//                             labels: departmentNames,
//                             datasets: [{
//                                 label: ["Total Inventory Expenditure by Department YTD"],
//                                 data: quantities,
//                                 backgroundColor: [
//                                     'rgba(0, 255, 0, 1)',
//                                     'rgba(255, 0, 0, 1)',
//                                     'rgba(0, 0, 255, 1)',
//                                     'rgba(0, 0, 255, .5)',
//                                     'rgba(253, 150, 64, 1)',
//                                     'rgba(250, 8, 126, .9)',
//                                     'rgba(54, 162, 235, 1)',
//                                     'rgba(255, 99, 132, 1)',
//                                     'rgba(75, 192, 192, 1)',
//                                     'rgba(136, 8, 255, 1)',
//                                     'rgba(123, 224, 0, 1)',
//                                     'rgba(80, 150, 75, .5)',
//                                     'rgba(40, 75, 150, 1)',
//                                     'rgba(200, 150, 150, .6)',
//                                     'rgba(80, 100, 50, 1)',
//                                     'rgba(248, 255, 8, 1)',

//                                     'rgba(153, 102, 6, 1)',
//                                     'rgba(138, 177, 150, 1)',
//                                     'rgba(255, 206, 86, 1)',
//                                     'rgba(160, 166, 5, .6)',
//                                     'rgba(20, 75, 5, .6)',
//                                     'rgba(160, 5, 5, 1)',
//                                     'rgba(90, 90, 90, .6)',
//                                     'rgba(200, 125, 150, 1)',

//                                 ]
//                             }],
//                         }}
//                         options={{
//                             responsive: true,
//                             maintainAspectRatio: false,
//                             title: {
//                                 display: true,
//                                 text: 'Total Inventory Expenditure by Department YTD',
//                                 fontColor: 'black',
//                                 fontSize: '18',
//                                 padding: '5'
//                             },
//                             legend: {
//                                 display: true,
//                             }
//                         }}
//                     ></Pie>
//                 </div>

//                 {/* <div id="chartStyling" style={{ height: 400, width: 500 }}>
//                     <Doughnut
//                         data={{
//                             labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
//                             datasets: [{
//                                 label: '# of Items',
//                                 data: [5, 26, 3, 5, 2, 3, 5, 26, 3, 5, 2, 3],
//                                 backgroundColor: [
//                                     'rgba(255, 99, 132, 1)',
//                                     'rgba(54, 162, 235, 1)',
//                                     'rgba(255, 206, 86, 1)',
//                                     'rgba(75, 192, 192, 1)',
//                                     'rgba(153, 102, 255, 1)',
//                                     'rgba(255, 159, 64, 1)',
//                                     'rgba(255, 99, 132, 1)',
//                                     'rgba(54, 162, 235, 1)',
//                                     'rgba(255, 206, 86, 1)',
//                                     'rgba(75, 192, 192, 1)',
//                                     'rgba(153, 102, 255, 1)',
//                                     'rgba(255, 159, 64, 1)'
//                                 ]
//                             }]
//                         }}
//                         options={{
//                             responsive: true,
//                             maintainAspectRatio: false,
//                             title: {
//                                 display: true,
//                                 text: 'Custom Chart Title',
//                                 fontColor: 'black',
//                                 fontSize: '18'
//                             }
//                         }}
//                     ></Doughnut>
//                 </div> */}
//             </Row>

//             {/* <Row style={{ marginTop: 25 }}>
//                 <div id="chartStyling" style={{ height: 400, width: 500, marginLeft: 300, marginRight: 300 }}>
//                     <Line
//                         data={{
//                             labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
//                             datasets: [{
//                                 label: '# of Items',
//                                 data: [5, 26, 3, 5, 2, 3, 5, 26, 3, 5, 2, 3],
//                                 backgroundColor: [
//                                     'rgba(255, 99, 132, 0.2)',
//                                     'rgba(54, 162, 235, 0.2)',
//                                     'rgba(255, 206, 86, 0.2)',
//                                     'rgba(75, 192, 192, 0.2)',
//                                     'rgba(153, 102, 255, 0.2)',
//                                     'rgba(255, 159, 64, 0.2)',
//                                     'rgba(255, 99, 132, 0.2)',
//                                     'rgba(54, 162, 235, 0.2)',
//                                     'rgba(255, 206, 86, 0.2)',
//                                     'rgba(75, 192, 192, 0.2)',
//                                     'rgba(153, 102, 255, 0.2)',
//                                     'rgba(255, 159, 64, 0.2)'
//                                 ]
//                             }]
//                         }}
//                         options={{
//                             responsive: true,
//                             maintainAspectRatio: false,
//                             title: {
//                                 display: true,
//                                 text: 'Custom Chart Title',
//                                 fontColor: 'black',
//                                 fontSize: '18'
//                             },
//                             legend: {
//                                 display: false
//                             }
//                         }}
//                     ></Line>
//                 </div>

//                 <div id="chartStyling" style={{ height: 400, width: 500 }}>
//                     <Pie
//                         data={{
//                             labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
//                             datasets: [{
//                                 label: '# of Items',
//                                 data: [5, 26, 3, 5, 2, 3, 5, 26, 3, 5, 2, 3],
//                                 backgroundColor: [
//                                     'rgba(255, 99, 132, 1)',
//                                     'rgba(54, 162, 235, 1)',
//                                     'rgba(255, 206, 86, 1)',
//                                     'rgba(75, 192, 192, 1)',
//                                     'rgba(153, 102, 255, 1)',
//                                     'rgba(255, 159, 64, 1)',
//                                     'rgba(255, 99, 132, 1)',
//                                     'rgba(54, 162, 235, 1)',
//                                     'rgba(255, 206, 86, 1)',
//                                     'rgba(75, 192, 192, 1)',
//                                     'rgba(153, 102, 255, 1)',
//                                     'rgba(255, 159, 64, 1)'
//                                 ]
//                             }]
//                         }}
//                         options={{
//                             responsive: true,
//                             maintainAspectRatio: false,
//                             title: {
//                                 display: true,
//                                 text: 'Custom Chart Title',
//                                 fontColor: 'black',
//                                 fontSize: '18'
//                             }
//                         }}
//                     ></Pie>
//                 </div>
//             </Row> */}
//         </>
//     );
// };

// export default Dashboard;