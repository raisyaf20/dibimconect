import React, { useContext, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { register } from "../utils/api";
import { DataContext } from "../App";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [msg, setMsg] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    address: "",
    phone_number: "",
  });
  const navigate = useNavigate();
  const dataLogin = useContext(DataContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData)
      .then((res) => {
        setMsg(res.data.message);
        window.location.assign("/login");
      })
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    if (dataLogin.auth.token) {
      return navigate("/dashboard");
    }
  }, [dataLogin.auth, navigate]);

  return (
    <section className="bg-register">
      {msg && <Alert variant={"success"}>{msg}</Alert>}
      <Container>
        <Row className="justify-content-center ">
          <Col sm={6} lg={6} className="mt-5 text-white blur-register p-lg-4">
            <h4 className="fw-bold">Register</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Password"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formAddres">
                <Form.Label>Addres</Form.Label>
                <Form.Control
                  type="input"
                  onChange={(e) =>
                    setFormData({ ...formData, addres: e.target.value })
                  }
                  placeholder="Addres"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="input"
                  onChange={(e) =>
                    setFormData({ ...formData, phone_number: e.target.value })
                  }
                  placeholder="example: 08121"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
