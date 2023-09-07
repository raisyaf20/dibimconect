import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { login } from "../utils/api";
import Cookies from "js-cookie";
import { DataContext } from "../App";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dataLogin = useContext(DataContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(name, password)
      .then((res) => {
        const kuki = {
          name: name,
          token: res.data.access_token,
        };
        Cookies.set("access_token", JSON.stringify(kuki));
        dataLogin.setIsLogin(true);
        window.location.assign("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    if (dataLogin.auth.token) {
      return navigate("/dashboard");
    }
  }, [dataLogin.auth, navigate]);

  return (
    <Container>
      <h2 className="text-center mt-2 fw-bold  text-darker">Welcome Back</h2>
      <Row className="d-grid min-h-50  place-center">
        <Col xs={10} sm={7} lg={4} className="p-4 rounded-4 shadow border">
          <h4 className="fw-bolder  text-darker">Login</h4>
          <Form onSubmit={handleSubmit} className="mt-3">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </Form.Group>
            <Button
              style={{ background: "#0c1b4d" }}
              className="form-control"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
