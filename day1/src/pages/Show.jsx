import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getById } from "../utils/api";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { DataContext } from "../App";

const Show = () => {
  const { slug } = useParams();
  const [dataDetail, setDataDetail] = useState({});
  const dataLogin = useContext(DataContext);

  const handleDelete = (notes, id) => {
    if (window.confirm(`Are you sure delete ${notes}`)) {
      destroy(id, token)
        .then((res) => setMsgHps(res.statusText))
        .catch((err) => setMsgErr(err));
    }
  };

  useEffect(() => {
    getById(slug)
      .then((respon) => setDataDetail(respon.data))
      .catch((err) => console.log(err));
  }, [slug]);

  return (
    <section>
      <Container className="mt-5">
        <Link to={"/"} className="btn">
          Back Home
        </Link>
        <Row className="mt-2">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>{dataDetail.title}</Card.Title>
                <Card.Text>{dataDetail.description}</Card.Text>
                {dataLogin.auth.token && (
                  <div className="d-flex">
                    <Link
                      className="btn btn-outline-info me-2"
                      to={`/dashboard/edit/${dataDetail.id}`}
                    >
                      Edit
                    </Link>
                    <Button
                      variant="danger"
                      onClick={() =>
                        handleDelete(dataDetail.title, dataDetail.id)
                      }
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Show;
