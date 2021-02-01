import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Col, Input, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import "./Login.css";

const Login = () => {

    const history = useHistory();

    const { login } = useContext(UserProfileContext);

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");

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
            <Col align="center" className="d-flex justify-content-center">
                <div className="login-form" style={{ height: 500 }}>
                    <form onSubmit={handleSubmit} style={{ width: 400 }}>
                        <div >
                            <img
                                alt="Nucleus Logo"
                                className="NucleusLoginLogo"
                                src="\Images\NucleusLogo.png"
                            />
                        </div>
                        <h1 className="my-3 font-weight-bold">Login</h1>
                        <div className="form-group">
                            <Input
                                className="form-control border border-dark font-weight-bold"
                                id="input"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required="required"
                                style={{ height: 40 }}
                                type="email"
                            />
                        </div>
                        <div className="form-group">
                            <Input
                                className="form-control border border-dark font-weight-bold"
                                id="input"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required="required"
                                style={{ height: 40 }}
                                type="password"
                            />
                        </div>
                        <div className="form-group">
                            <Button type="submit"
                                block
                                className="SignButton"
                                color="success"
                                disabled={loading}
                                id="input"
                                style={{ height: 40 }}
                            >Sign in
                            </Button>
                        </div>
                        <div className="text-center RedirectMessage">Don't have an account?
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