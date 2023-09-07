import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { DataContext } from "../App";
import { addNotes } from "../utils/api";

const ModalAdd = ({ show, close, setMsg, name, token }) => {
  const dataLogin = useContext(DataContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: dataLogin.auth.name,
  });
  const handleSubmit = () => {
    setFormData({ author: dataLogin.auth.name });
    addNotes(formData, token)
      .then((respon) => setMsg(respon.statusText))
      .catch((err) => console.log(err));

    setFormData({ title: "", description: "", author: dataLogin.auth.name });
    close();
  };
  useEffect(() => {});
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Add Notes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              required
              value={formData.title}
              onChange={(event) =>
                setFormData({ ...formData, title: event.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              required
              value={formData.description}
              onChange={(event) =>
                setFormData({ ...formData, description: event.target.value })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAdd;
