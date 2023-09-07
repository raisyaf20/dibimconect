import React, { useContext, useEffect, useState } from "react";
import { destroy, filterNotes } from "../utils/api";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import { DataContext } from "../App";
import { sliceDesc } from "../services/notesService";
import ModalAdd from "../components/ModalAdd";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [msgHps, setMsgHps] = useState();
  const [msgAdd, setMsgAdd] = useState();
  const [msgErr, setMsgErr] = useState();
  const tokenCookie = Cookies.get("access_token");
  const dataLogin = useContext(DataContext);

  const navigate = useNavigate();
  const { name, token } = dataLogin.auth;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  setTimeout(() => {
    setMsgAdd(false);
    setMsgHps(false);
  }, 5000);

  useEffect(() => {
    filterNotes(name)
      .then((res) => setNotes(res.data))
      .catch((err) => setMsgErr(err));
  }, [notes]);

  const handleDelete = (notes, id) => {
    if (window.confirm(`Are you sure delete ${notes}`)) {
      destroy(id, token)
        .then((res) => setMsgHps(res.statusText))
        .catch((err) => setMsgErr(err));
    }
  };
  const handleLogout = () => {
    Cookies.remove("access_token");
    dataLogin.setIsLogin(false);

    navigate("/");
  };

  React.useEffect(() => {
    if (tokenCookie === undefined) {
      return navigate("/login");
    }
  }, [tokenCookie, navigate]);

  return (
    <section>
      <Link to={"/"} className="btn mt-4">
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
        Back to Homepage
      </Link>
      {msgHps && (
        <Alert className="w-50" variant="success">
          {msgHps}!! Notes Deleted
        </Alert>
      )}
      {msgAdd && (
        <Alert className="w-50" variant="success">
          Notes {msgAdd}
        </Alert>
      )}
      <Container>
        <div className="bg-darker text-white rounded-3 p-3 align-items-center mt-5 d-flex justify-content-between">
          <h3>Dashboard</h3>
          <div className="d-flex align-items-center gap-2">
            <h5>Hello, {dataLogin.auth.name}</h5>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </div>
        <Button variant="primary" onClick={handleShow} className="mt-3">
          Add Notes
        </Button>
        <Row className="mt-5 gap-3">
          {notes && notes.length ? (
            notes.map((e, i) => (
              <Col sm={12} md={4} key={i}>
                <Card>
                  <Card.Header>Your Notes</Card.Header>
                  <Card.Body>
                    <Card.Title>{e.title}</Card.Title>
                    <Card.Text>{sliceDesc(e.description)}</Card.Text>
                    <div className="d-flex justify-content-between">
                      <Link
                        className="btn btn-outline-primary"
                        to={`/dashboard/show/${e.id}`}
                      >
                        Detail
                      </Link>
                      <div>
                        <Link
                          className="btn btn-outline-info me-2"
                          to={`/dashboard/edit/${e.id}`}
                        >
                          Edit
                        </Link>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(e.title, e.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center mt3 fs-3 fw-medium">
              You haven't created notes yet
            </p>
          )}
        </Row>
      </Container>
      <ModalAdd
        show={show}
        close={handleClose}
        setMsg={setMsgAdd}
        name={dataLogin.auth.name}
        token={dataLogin.auth.token}
      />
    </section>
  );
};

export default Dashboard;
