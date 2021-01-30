import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Button, Col, Input, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import "./Login.css";

const Login = () => {
    const { login } = useContext(UserProfileContext);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        login(email, password)
            .then((user) => {
                setLoading(false);
                toast.info(`Welcome back ${user.displayName}`);
                history.push("/");
            })
            .catch((err) => {
                setLoading(false);
                toast.error("Invalid email or password");
            });
    };

    return (
        <>
            <Row style={{ height: 15 }}>""</Row>
            <Col className="d-flex justify-content-center" align="center" >
                <div className="login-form ">
                    <form style={{ width: 400 }} onSubmit={handleSubmit}>
                        <div >
                            <img className="NucleusLoginLogo" src="\Images\NucleusLogo.png" alt="Nucleus Logo" />
                        </div>
                        <h2 className="my-3">Login</h2>
                        <div className="form-group">
                            <Input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                className="form-control border border-dark font-weight-bold"
                                name="email"
                                placeholder="Email"
                                required="required"
                            />
                        </div>
                        <div className="form-group">
                            <Input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="form-control border border-dark font-weight-bold"
                                name="password"
                                placeholder="Password"
                                required="required"
                            />
                        </div>
                        <div className="form-group">
                            <Button type="submit"
                                block
                                color="success"
                                disabled={loading}
                                className="SignButton"
                            >Sign in
                            </Button>
                        </div>
                        <div className="text-center RedirectMessage">
                            Don't have an account?
                            <div>
                                <Link className="RedirectLink" to="/register">Sign up here</Link>
                            </div>
                        </div>
                    </form>
                </div >
            </Col>
        </>
    );
};

export default Login;
