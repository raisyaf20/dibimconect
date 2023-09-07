import React from "react";
import { Col, Row } from "react-bootstrap";

const BanerHomepage = () => {
  return (
    <div>
      <Row>
        <Col md={7} className="mt-lg-5">
          <h1 className="text-darker w-100 max-w-xs fw-bolder">
            NoteMe - Organize, Edit, and Share Notes
          </h1>
          <p className="w-100 max-w-sm l-space-1 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            ratione animi doloremque magnam rem, porro aspernatur culpa velit
            qui minus! Assumenda itaque ex error corrupti nam possimus pariatur
            similique repellendus!
          </p>
          <a
            href="#note"
            style={{ background: "#0c1b4d" }}
            className="btn text-white p-2 shadow"
          >
            See Notes
          </a>
        </Col>
        <Col xs={10} sm={12} md={5} className="mt-5 mt-lg-0">
          <div className="device border shadow position-relative mx-auto">
            {/* <div className="shapes-bg position-absolute"></div> */}

            <div className="notes-left shadow">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Blanditiis, deserunt?
            </div>
            <div
              className="notes-right shadow placeholder-glow"
              aria-hidden="true"
            >
              <span className="placeholder col-7"></span>
              <span className="placeholder col-5"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-8"></span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BanerHomepage;
