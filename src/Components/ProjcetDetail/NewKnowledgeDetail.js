import React from "react";
import {
  Table,
  CardTitle,
  Card,
  CardSubtitle,
  CardBody,
  Container,
  CardImg,
  Row,
  Col,
} from "reactstrap";
import parse from "html-react-parser";

const NewKnowledgeDetail = (props) => {
  const { YoutubeEmbed, outcomeKnowledge, classes } = props;

  return (
    <div>
      {outcomeKnowledge.map((ock) => {
        return (ock.outcome_knowledge_name && ock.outcome_knowledge_image) ||
          ock.outcome_knowledge_video ? (
          <Row style={{ paddingBottom: "20px" }}>
            <Col md="12">
              <Card className="card-header-border card-border">
                <CardBody className="card-header-border">
                  <CardTitle
                    tag="h6"
                    style={{ padding: 5, color: "black" }}
                    className={(classes.customLabel, classes.headerLabel)}
                  >
                    องค์ความรู้ใหม่
                  </CardTitle>
                  <CardSubtitle
                    tag="p"
                    className="text-muted"
                    style={{ fontSize: 26 }}
                  ></CardSubtitle>
                </CardBody>

                <CardTitle
                  style={{
                    padding: "25px",
                    fontFamily: "Prompt",
                    fontSize: 18,
                  }}
                >
                  {parse(ock.outcome_knowledge_detail)}
                </CardTitle>

                <CardBody className="card-header-color">
                  <Row>
                    <Col md="5">
                      <CardTitle
                        tag="h6"
                        style={{ padding: 5, color: "black" }}
                        className={(classes.customLabel, classes.headerLabel)}
                      >
                        รูปภาพ
                      </CardTitle>
                      <CardImg
                        top
                        style={{ backgroundSize: "cover" }}
                        width="853"
                        height="420"
                        src={`https://researcher.kims-rmuti.com/file-upload/outcome-upload/${ock.outcome_knowledge_image}`}
                        alt="Card image cap"
                      />
                    </Col>
                    <Col md="7">
                      <CardTitle
                        tag="h6"
                        style={{ padding: 5, color: "black" }}
                        className={(classes.customLabel, classes.headerLabel)}
                      >
                        วิดีโอ
                      </CardTitle>

                      <div>
                        {ock.outcome_knowledge_video ? (
                          <YoutubeEmbed embedId={ock.outcome_knowledge_video} />
                        ) : (
                          <div>
                            <p
                              className={classes.customLabel}
                              align="center"
                              style={{
                                padding: "160px",
                                fontFamily: "Prompt",
                              }}
                            >
                              not video
                            </p>
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        ) : (
          " "
        );
      })}
    </div>
  );
};

export default NewKnowledgeDetail;
