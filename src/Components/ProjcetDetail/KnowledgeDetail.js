import React from "react";
import {
  Table,
  CardTitle,
  Card,
  CardSubtitle,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";
import { FaArrowAltCircleRight, FaArrowAltCircleDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const KnowledgeDetail = (props) => {
  const { t } = useTranslation();
  const { mserrorkn, classes, knowledgeEl, outputEl, outcomeEl } = props;

  return (
    // <Row className="justify-content-md-center align-items-center">
    //   <Col md="3">
    <Card className="card-header-border card-border">
      <CardBody className="card-header-border">
        <CardTitle
          tag="h6"
          style={{ padding: 5, color: "black" }}
          className={(classes.customLabel, classes.headerLabel)}
        >
          {t("concept_proposal_page.knowledge.header")}
        </CardTitle>
        {/* <CardSubtitle tag="p" className="text-muted" style={{ fontSize: 14 }}>
          knowledge
        </CardSubtitle> */}
      </CardBody>

      {/* <Row className="justify-content-md-center"> */}
      {(() => {
        if (mserrorkn) {
          return <p>{mserrorkn}</p>;
        } else {
          return knowledgeEl;
        }
      })()}
      {/* </Row> */}
      {/* </CardBody> */}
    </Card>
    // </Col>
    // <Col md="1">
    //   <div
    //     className="icon-right-response"
    //     style={{ color: "rgba(255, 115, 0, 1)" }}
    //   >
    //     <FaArrowAltCircleRight
    //       size={45}
    //       style={{
    //         border: "3px solid rgb(255, 196, 0)",
    //         borderRadius: "50%",
    //       }}
    //     />
    //   </div>
    //   <div
    //     className="icon-down-response"
    //     style={{ color: "rgba(255, 115, 0, 1)" }}
    //   >
    //     <FaArrowAltCircleDown
    //       size={45}
    //       style={{
    //         border: "3px solid rgb(255, 196, 0)",
    //         borderRadius: "50%",
    //       }}
    //     />
    //   </div>
    // </Col>
    // <Col md="3">
    //   <Card className="card-header-border card-border">
    //     <CardBody className="card-header-border">
    //       <CardTitle
    //         tag="h6"
    //         style={{ padding: 5, color: "black" }}
    //         className={(classes.customLabel, classes.headerLabel)}
    //       >
    //         นวัตกรรม
    //       </CardTitle>
    //       <CardSubtitle
    //         tag="p"
    //         className="text-muted"
    //         style={{ fontSize: 14 }}
    //       >
    //         output
    //       </CardSubtitle>
    //     </CardBody>

    //     {/* <Row className="justify-content-md-center"> */}
    //     {(() => {
    //       if (mserrorkn) {
    //         return <p>{mserrorkn}</p>;
    //       } else {
    //         return outputEl;
    //       }
    //     })()}
    //     {/* </Row> */}
    //     {/* </CardBody> */}
    //   </Card>
    // </Col>
    // <Col md="1">
    //   <div
    //     className="icon-right-response"
    //     style={{ color: "rgba(255, 115, 0, 1)" }}
    //   >
    //     <FaArrowAltCircleRight
    //       size={45}
    //       style={{
    //         border: "3px solid rgb(255, 196, 0)",
    //         borderRadius: "50%",
    //       }}
    //     />
    //   </div>
    //   <div
    //     className="icon-down-response"
    //     style={{ color: "rgba(255, 115, 0, 1)" }}
    //   >
    //     <FaArrowAltCircleDown
    //       size={45}
    //       style={{
    //         border: "3px solid rgb(255, 196, 0)",
    //         borderRadius: "50%",
    //       }}
    //     />
    //   </div>
    // </Col>
    // <Col md="4">
    //   <Card className="card-header-border card-border">
    //     <CardBody className="card-header-border">
    //       <CardTitle
    //         tag="h6"
    //         style={{ padding: 5, color: "black" }}
    //         className={(classes.customLabel, classes.headerLabel)}
    //       >
    //         ผลลัพธ์
    //       </CardTitle>
    //       <CardSubtitle
    //         tag="p"
    //         className="text-muted"
    //         style={{ fontSize: 14 }}
    //       >
    //         outcome
    //       </CardSubtitle>
    //     </CardBody>

    //     {/* <CardBody className="map-border"> */}
    //     {/* <Row className="justify-content-md-center"> */}
    //     {(() => {
    //       if (mserrorkn) {
    //         return <p>{mserrorkn}</p>;
    //       } else {
    //         return outcomeEl;
    //       }
    //     })()}
    //     {/* </Row> */}
    //     {/* </CardBody> */}
    //   </Card>
    // </Col>
    // </Row>
  );
};

export default KnowledgeDetail;
