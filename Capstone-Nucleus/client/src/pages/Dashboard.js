import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import "./Inventory.css";
import { Button, Container, Nav, Navbar, Row } from 'react-bootstrap'

const Dashboard = () => {

    const { logout } = useContext(UserProfileContext);
    let test = [5, 26, 3, 5, 2, 3, 5, 26, 3, 5, 2, 3]



    const logoutAndReturn = () => {
        return logout().then(() => {
            toast.dark("You are now logged out");
            history.push("/login");
        });
    };

    const history = useHistory();

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
                <div style={{ height: 400, width: 500 }}>
                    <Bar
                        data={{
                            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                            datasets: [{
                                label: '# of Items',
                                data: test,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(0, 0, 0, 1)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.8)',
                                    'rgba(75, 192, 192, 0.8)',
                                    'rgba(153, 102, 255, 0.8)',
                                    'rgba(250, 25, 141, 0.8)'
                                ]
                            }]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false
                        }}
                    ></Bar>
                </div>

                <div style={{ height: 400, width: 500 }}>
                    <Line
                        data={{
                            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                            datasets: [{
                                label: '# of Items',
                                data: [5, 26, 3, 5, 2, 3, 5, 26, 3, 5, 2, 3],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ]
                            }]
                        }}
                        options={{
                            maintainAspectRatio: false
                        }}
                    ></Line>
                </div>

                <div style={{ height: 400, width: 500 }}>
                    <Doughnut
                        data={{
                            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                            datasets: [{
                                label: '# of Items',
                                data: [5, 26, 3, 5, 2, 3, 5, 26, 3, 5, 2, 3],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ]
                            }]
                        }}
                        options={{
                            maintainAspectRatio: false
                        }}
                    ></Doughnut>
                </div>









            </Row>

            <Row>
                <div style={{ height: 400, width: 500 }}>
                    <Line
                        data={{
                            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                            datasets: [{
                                label: '# of Items',
                                data: [5, 26, 3, 5, 2, 3, 5, 26, 3, 5, 2, 3],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ]
                            }]
                        }}
                        options={{
                            maintainAspectRatio: false
                        }}
                    ></Line>
                </div>

                <div style={{ height: 400, width: 500 }}>
                    <Bar
                        data={{
                            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                            datasets: [{
                                label: '# of Items',
                                data: [5, 26, 3, 5, 2, 3, 5, 26, 3, 5, 2, 3],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ]
                            }]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false
                        }}
                    ></Bar>
                </div>

                <div style={{ height: 400, width: 500 }}>
                    <Pie
                        data={{
                            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                            datasets: [{
                                label: '# of Items',
                                data: [5, 26, 3, 5, 2, 3, 5, 26, 3, 5, 2, 3],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ]
                            }]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false
                        }}
                    ></Pie>
                </div>


            </Row>



        </>
    );
};

export default Dashboard;