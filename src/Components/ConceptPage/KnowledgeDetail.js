import React from "react";
import {
  Table,
  CardTitle,
  Card,
  CardSubtitle,
  CardBody,
  Container,
  CardText,
  Row,
  Col,
} from "reactstrap";
import { FaArrowAltCircleRight, FaArrowAltCircleDown } from "react-icons/fa";
import parse from "html-react-parser";
import { useTranslation } from "react-i18next";

const KnowledgeDetail = (props) => {
  const { t } = useTranslation();
  const { mserrorkn, classes, knowledge, outputEl, outcomeEl, idencrypt } =
    props;
  console.log(knowledge);

  function scrollView() {
    const windowUrl = window.location.search;

    // console.log(windowUrl);
    const params = new URLSearchParams(windowUrl);
    const knowledge_name = params.get("knowledge_name");
    const innovation_name = params.get("innovation_name");
    // console.log(typeof knowledge_name);

    if (knowledge_name) {
      setTimeout(() => {
        const mainRoot = document.getElementById(knowledge_name);
        if (mainRoot) {
          mainRoot.scrollIntoView({ behavior: "smooth" });
        }
      }, 3000);
    }

    if (innovation_name) {
      setTimeout(() => {
        const mainRoot = document.getElementById(innovation_name);
        if (mainRoot) {
          mainRoot.scrollIntoView({ behavior: "smooth" });
        }
      }, 2000);
    }
  }

  React.useEffect(() => {
    scrollView();
  }, []);

  return (
    // <Row className="justify-content-md-center align-items-center">
    //   <Col md="4">
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

      <Row className="justify-content-md-center">
        <Col md="3">
          <Card className="card-header-border card-border">
            <CardBody className="card-header-border">
              <CardTitle
                tag="h6"
                style={{ padding: 5, color: "black" }}
                className={(classes.customLabel, classes.headerLabel)}
              >
                องค์ความรู้
              </CardTitle>
              <CardSubtitle
                tag="p"
                className="text-muted"
                style={{ fontSize: 14 }}
              >
                knowledge
              </CardSubtitle>
            </CardBody>

            {(() => {
              if (mserrorkn) {
                return <p>{mserrorkn}</p>;
              } else {
                return knowledge.map((ListItem) => (
                  <CardBody className="map-border">
                    <img
                      width="100%"
                      src={`https://researcher.kims-rmuti.com/file-upload/knowledge-upload/${ListItem.knowledge_image}`}
                      alt="Card image cap"
                      className="img-shadow"
                      style={{ borderRadius: 4 }}
                    />

                    <CardBody
                      style={{
                        backgroundColor: "rgba(223, 223, 223, 0.37)",
                        borderTop: " 6px solid rgb(255, 123, 0)",
                        borderBottom: " 4px solid rgb(255, 123, 0)",
                        // height: "110px",
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      <CardText style={{ fontFamily: "Prompt" }}>
                        {ListItem.knowledge_name}
                      </CardText>
                    </CardBody>
                  </CardBody>
                ));
              }
            })()}
          </Card>
        </Col>
        <Col md="1">
          <div
            className="icon-right-response"
            style={{ color: "rgba(255, 115, 0, 1)" }}
          >
            <FaArrowAltCircleRight
              size={45}
              style={{
                border: "3px solid rgb(255, 196, 0)",
                borderRadius: "50%",
              }}
            />
          </div>
          <div
            className="icon-down-response"
            style={{ color: "rgba(255, 115, 0, 1)" }}
          >
            <FaArrowAltCircleDown
              size={45}
              style={{
                border: "3px solid rgb(255, 196, 0)",
                borderRadius: "50%",
              }}
            />
          </div>
        </Col>
        <Col md="3">
          <Card className="card-header-border card-border">
            <CardBody className="card-header-border">
              <CardTitle
                tag="h6"
                style={{ padding: 5, color: "black" }}
                className={(classes.customLabel, classes.headerLabel)}
              >
                นวัตกรรม
              </CardTitle>
              <CardSubtitle
                tag="p"
                className="text-muted"
                style={{ fontSize: 14 }}
              >
                output
              </CardSubtitle>
            </CardBody>

            {(() => {
              if (mserrorkn) {
                return <p>{mserrorkn}</p>;
              } else {
                return outputEl;
              }
            })()}
          </Card>
        </Col>
        <Col md="1">
          <div
            className="icon-right-response"
            style={{ color: "rgba(255, 115, 0, 1)" }}
          >
            <FaArrowAltCircleRight
              size={45}
              style={{
                border: "3px solid rgb(255, 196, 0)",
                borderRadius: "50%",
              }}
            />
          </div>
          <div
            className="icon-down-response"
            style={{ color: "rgba(255, 115, 0, 1)" }}
          >
            <FaArrowAltCircleDown
              size={45}
              style={{
                border: "3px solid rgb(255, 196, 0)",
                borderRadius: "50%",
              }}
            />
          </div>
        </Col>
        <Col md="4">
          <Card className="card-header-border card-border">
            <CardBody className="card-header-border">
              <CardTitle
                tag="h6"
                style={{ padding: 5, color: "black" }}
                className={(classes.customLabel, classes.headerLabel)}
              >
                ผลลัพธ์
              </CardTitle>
              <CardSubtitle
                tag="p"
                className="text-muted"
                style={{ fontSize: 14 }}
              >
                outcome
              </CardSubtitle>
            </CardBody>

            {(() => {
              if (mserrorkn) {
                return <p>{mserrorkn}</p>;
              } else {
                return outcomeEl;
              }
            })()}
          </Card>
        </Col>
      </Row>
      {/* </CardBody> */}
    </Card>
    // </Col>

    /* <Col md="1">
       <div
          className="icon-right-response"
          style={{ color: "rgba(255, 115, 0, 1)" }}
        >
          <FaArrowAltCircleRight
            size={45}
            style={{
              border: "3px solid rgb(255, 196, 0)",
              borderRadius: "50%",
            }}
          />
        </div>
        <div
          className="icon-down-response"
          style={{ color: "rgba(255, 115, 0, 1)" }}
        >
          <FaArrowAltCircleDown
            size={45}
            style={{
              border: "3px solid rgb(255, 196, 0)",
              borderRadius: "50%",
            }}
          />
        </div>
      </Col> */
    /* <Col md="3">
        <Card className="card-header-border card-border">
          <CardBody className="card-header-border">
            <CardTitle
              tag="h6"
              style={{ padding: 5, color: "black" }}
              className={(classes.customLabel, classes.headerLabel)}
            >
              นวัตกรรม
            </CardTitle>
            <CardSubtitle
              tag="p"
              className="text-muted"
              style={{ fontSize: 14 }}
            >
              output
            </CardSubtitle>
          </CardBody>

          {(() => {
            if (mserrorkn) {
              return <p>{mserrorkn}</p>;
            } else {
              return outputEl;
            }
          })()}
        
        </Card>
      </Col> */
    /* <Col md="1">
        <div
          className="icon-right-response"
          style={{ color: "rgba(255, 115, 0, 1)" }}
        >
          <FaArrowAltCircleRight
            size={45}
            style={{
              border: "3px solid rgb(255, 196, 0)",
              borderRadius: "50%",
            }}
          />
        </div>
        <div
          className="icon-down-response"
          style={{ color: "rgba(255, 115, 0, 1)" }}
        >
          <FaArrowAltCircleDown
            size={45}
            style={{
              border: "3px solid rgb(255, 196, 0)",
              borderRadius: "50%",
            }}
          />
        </div>
      </Col> */
    /* <Col md="4">
        <Card className="card-header-border card-border">
          <CardBody className="card-header-border">
            <CardTitle
              tag="h6"
              style={{ padding: 5, color: "black" }}
              className={(classes.customLabel, classes.headerLabel)}
            >
              ผลลัพธ์
            </CardTitle>
            <CardSubtitle
              tag="p"
              className="text-muted"
              style={{ fontSize: 14 }}
            >
              outcome
            </CardSubtitle>
          </CardBody>

      
          {(() => {
            if (mserrorkn) {
              return <p>{mserrorkn}</p>;
            } else {
              return outcomeEl;
            }
          })()}
         
        </Card>
      </Col> */
    // </Row>
  );
};

export default KnowledgeDetail;
