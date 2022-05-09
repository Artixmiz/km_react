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
import { useTranslation } from "react-i18next";

const NewKnowledgeDetail = (props) => {
  const { YoutubeEmbed, outcomeKnowledge, classes } = props;
  const { t } = useTranslation();
  function scrollView() {
    const windowUrl = window.location.search;

    // console.log(windowUrl);
    const params = new URLSearchParams(windowUrl);
    const new_knowledge_name = params.get("new_knowledge");
    // console.log(typeof knowledge_name);

    if (new_knowledge_name) {
      setTimeout(() => {
        const mainRoot = document.getElementById(new_knowledge_name);
        if (mainRoot) {
          mainRoot.scrollIntoView({ behavior: "smooth" });
        }
      }, 5000);
    }
  }

  React.useEffect(() => {
    scrollView();
  }, []);

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
                    id={ock.outcome_knowledge_name}
                    tag="h6"
                    style={{ padding: 5, color: "black" }}
                    className={(classes.customLabel, classes.headerLabel)}
                  >
                    {t("concept_proposal_page.new_knowledge.header")}
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
                  {parse(ock.outcome_knowledge_name)}
                </CardTitle>

                <CardBody className="card-header-color">
                  <Row>
                    <Col md="5">
                      <CardTitle
                        tag="h6"
                        style={{ padding: 5, color: "black" }}
                        className={(classes.customLabel, classes.headerLabel)}
                      >
                        {t("concept_proposal_page.new_knowledge.detail.menu1")}
                      </CardTitle>
                      <CardImg
                        top
                        style={{ backgroundSize: "cover" }}
                        width="auto"
                        height="350"
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
                        {t("concept_proposal_page.new_knowledge.detail.menu2")}
                      </CardTitle>

                      <div>
                        {ock.outcome_knowledge_video ? (
                          <YoutubeEmbed embedId={ock.outcome_knowledge_video} />
                        ) : (
                          <div>
                            <p
                              className="block-example border border-0 border-dark"
                              align="center"
                              style={{
                                padding: "160px",
                                fontFamily: "Prompt",
                                fontSize: 18,
                              }}
                            >
                              No_video
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
