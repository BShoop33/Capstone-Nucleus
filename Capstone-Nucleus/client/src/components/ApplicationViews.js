import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import EditProfile from "../pages/EditProfile";
import InventoryList from "../pages/InventoryList";
import ItemForm from "../pages/ItemForm";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { UserProfileContext } from "../providers/UserProfileProvider";

const ApplicationViews = () => {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <Switch>
            <Route path="/" exact>
                {isLoggedIn ? <InventoryList /> : <Redirect to="/login" />}
            </Route>

            <Route exact path="/additem">
                <ItemForm />
            </Route>

            <Route path="/dashboard">
                <Dashboard />
            </Route>

            <Route exact path="/edititem/:itemId(\d+)">
                <ItemForm />
            </Route>

            <Route exact path="/editprofile/">
                <EditProfile />
            </Route>

            <Route path="/login">
                <Login />
            </Route>


            <Route path="/register">
                <Register />
            </Route>

            {/* <Route path="/404">
                <NotFoundForm />
            </Route> */}
        </Switch>
    );
};

export default ApplicationViews;