import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getById, upadateNotes } from "../utils/api";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { DataContext } from "../App";
import Cookies from "js-cookie";

const Edit = () => {
  const { slug } = useParams();
  const dataLogin = useContext(DataContext);
  const [msg, setMsg] = useState();
  const [detail, setDetail] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { name, token } = dataLogin.auth;
  const tokenCookie = Cookies.get("access_token");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: title ? title : detail.title,
      description: desc ? desc : detail.description,
    };
    upadateNotes(slug, data, token, name)
      .then((res) => {
        setMsg(res.statusText);
        window.location.assign("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getById(slug)
      .then((res) => setDetail(res.data))
      .catch((err) => console.log(err));
  }, []);
  React.useEffect(() => {
    if (tokenCookie === undefined) {
      return navigate("/login");
    }
  }, [tokenCookie, navigate]);
  return (
    <Container>
      {msg && <Alert variant="success">{msg}!! Data Updated</Alert>}
      <Link to={"/dashboard"} className="mt-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-arrow-left"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M5 12l14 0"></path>
          <path d="M5 12l6 6"></path>
          <path d="M5 12l6 -6"></path>
        </svg>{" "}
        Back to dashboard
      </Link>
      <h3 className="text-center mt-5">
        Edit Notes : <span className="text-darker">{detail.title}</span>
      </h3>
      <Row className="justify-content-center mt-2">
        <Col md={5}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={detail.title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    defaultValue={detail.description}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Edit;
