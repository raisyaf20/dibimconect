import React, { useEffect, useState } from "react";
import { getAllNotes } from "../utils/api";
import { Card, Col, Container, Row } from "react-bootstrap";
import BanerHomepage from "../components/BanerHomepage";
import { sliceDesc } from "../services/notesService";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const clickDetail = (id) => {
    navigate(`/dashboard/show/${id}`);
  };

  useEffect(() => {
    getAllNotes().then((res) => setData(res.data));
  }, [data]);

  return (
    <section>
      <Container>
        <BanerHomepage />
        <h3 className="text-darker fw-bold mt-5">All Notes</h3>
        <p className="text-body-seconday">
          Do you want to create notes? let's register
        </p>
        <Row className="gap-3 justify-content-evenly p-3" id="note">
          {data && data.length ? (
            data.map((e, i) => (
              <Col md={3} key={i}>
                <Card
                  onClick={() => clickDetail(e.id)}
                  className="hover-card-home"
                >
                  <Card.Header>{e.title}</Card.Header>
                  <Card.Body>
                    <blockquote className="blockquote mb-0">
                      <p>{sliceDesc(e.description)}</p>
                      <footer className="blockquote-footer">
                        Author : <cite title="Source Title">{e.author}</cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <h1 className="text-center">Nothing Notes ):</h1>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default HomePage;
