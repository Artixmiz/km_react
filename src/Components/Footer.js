import { Row, Col } from "reactstrap";
import React from "react";
import "../Css/footer.scss";

import logo_footer from "../images/logo_footer.png";
import footer_stiker from "../images/footer_stiker.png";
import rmutilogo from "../images/rmutilogo.png";
import sidelogo from "../images/newnrct.png";

export default function Footer() {
  return (
    <div className="body-detail">
      <div className="footer-bg">
        <Row style={{ width: "100%", padding: "2rem", paddingBottom: "1rem" }}>
          <Col xs={6} xl={2}>
            <Row>
              <Col sm={12} style={{ textAlign: "left" }}>
                <h6>Made by</h6>
              </Col>
              <Col sm={12}>
                <img
                  src={logo_footer}
                  style={{ width: "80%", maxWidth: "150px" }}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={6} xl={2}>
            <Row>
              <Col sm={12} style={{ textAlign: "left" }}>
                <h6>Sponsorship</h6>
              </Col>
              <Col xs={6} sm={6}>
                <img
                  src={rmutilogo}
                  style={{ width: "80%", maxWidth: "85px" }}
                />
              </Col>
              <Col
                xs={6}
                sm={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={sidelogo}
                  style={{ width: "100%", maxWidth: "100px" }}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={12} xl={7}>
            <Row>
              <Col sm={12} style={{ textAlign: "left" }}>
                <h6>ติดต่อ : </h6>
              </Col>
              <Col
                sm={12}
                style={{
                  textAlign: "left",
                  marginBottom: "1.2rem",
                  marginTop: "0.2rem",
                  paddingRight: "2rem",
                }}
              >
                <h6>
                  Rajamangala University of Technology Isan 744 Suranarai Road,
                  Muang, Nakhon Ratchasima 30000 Thailand
                </h6>
              </Col>
              <Col sm={12} style={{ textAlign: "left", bottom: "0" }}>
                <h6>&copy; Copyright 2021 KIL. All Rights Reserved</h6>
              </Col>
            </Row>
          </Col>
          <Col
            xs={6}
            xl={1}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={footer_stiker}
              style={{ width: "150%", maxWidth: "150px" }}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}
