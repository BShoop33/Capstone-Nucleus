import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import "./Login.css";
import {
    Button
} from "reactstrap";
import { toast } from "react-toastify";


const InventoryList = () => {
    const history = useHistory();
    const { logout } = useContext(UserProfileContext);

    const logoutAndReturn = () => {
        return logout().then(() => {
            toast.dark("You are now logged out");
            history.push("/login");
        });
    };



    return (
        <>
            <h1>Future Inventory List Page</h1>
            <Button onClick={logoutAndReturn}>Logout</Button>
        </>
    );
};

export default InventoryList;
