import React, { useEffect, useState } from "react";
import {
  Col,
  // Container,
  Row,
  CardTitle,
  CardBody,
  CardSubtitle,
} from "reactstrap";

import Typography from "@material-ui/core/Typography";
import "../Css/mapView.scss";
import { Card } from "react-bootstrap";

import AwesomeSlider from "react-awesome-slider";

import TableContainer from "@material-ui/core/TableContainer";
import CardContent from "@material-ui/core/CardContent";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";
import axios from "axios";

const useCard = makeStyles({
  root: {
    minWidth: 2,
    elevation: 15,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 140,
  },
});

const YoutubeEmbed = ({ embedId }) => {
  console.log(embedId);
  // setYoutubeEmbed(embedId);

  const vdo_id = getId(embedId);
  console.log(vdo_id);

  return (
    <div className="video-responsive">
      <iframe
        width="600"
        height="480"
        src={`https://www.youtube.com/embed/${vdo_id}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};

function getId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}

export default function KnowledgePage(props) {
  const {
    co_researcher_id,
    classes,
  } = props;
  const apiUrl = "https://kmapi.kims-rmuti.com";
  const [knowledge, setknowledge] = useState([]);

  let id = atob(co_researcher_id);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/get/co-researcher-knowledge/image/${id}`)
      .then((result) => {
        setknowledge(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

  return (
    <TableContainer
      style={{
        fontFamily: "Prompt",
        padding: "20px 20px 20px 20px",
      }}
      fluid={true}
    >
      {knowledge.map((listValue, ListItem) => {
        return (
          <Card
            className={useCard.root}
            style={{
              width: "100%",
              margin: "0px 0px 10px 0px",
            }}
            variant="outlined"
          >
            <CardContent
              className="card-header-border"
              elevation={5}
              style={{
                width: "100%",
                height: "30%",
                padding: "center",
                backgroundcollor: "red",
              }}
            >
              <CardTitle tag="h6" style={{ padding: 5, color: "black" }}>
                <CardTitle
                  tag="h6"
                  style={{
                    padding: 5,
                    color: "black",
                    fontSize: 18,
                  }}
                  className={classes.customLabel}
                >
                  {listValue.co_researcher_knowledge_name}
                </CardTitle>

                <h
                  style={{
                    padding: "20px",
                    fontFamily: "Prompt",
                  }}
                >
                  {listValue.co_researcher_knowledge_detail}
                </h>
              </CardTitle>

              <CardSubtitle
                tag="p"
                className="text-muted"
                style={{ fontSize: 14 }}
              ></CardSubtitle>

              <CardBody className="card-header-color">
                <Row>
                  <Col md={5}>
                    <CardTitle
                      tag="h6"
                      style={{ padding: 5, color: "black" }}
                      className={(classes.customLabel, classes.headerLabel)}
                    >
                      รูปภาพ
                    </CardTitle>

                    <AwesomeSlider bullets={false}>
                      {listValue.images.map((listitem, index) => {
                        return (
                          <Col md="5">
                            <img
                              className="card-border"
                              style={{
                                objectPosition: "center center",
                                padding: 1,
                                color: "black",
                              }}
                              width="100%"
                              height="auto"
                              src={`https://researcher.kims-rmuti.com/file-upload/co-knowledge-upload/${listitem.co_kl_image}`}
                            />
                          </Col>
                        );
                      })}
                    </AwesomeSlider>
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
                      {listValue.co_researcher_knowledge_videolink ? (
                        <YoutubeEmbed
                          embedId={listValue.co_researcher_knowledge_videolink}
                        />
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
                            No_Video
                          </p>
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </CardContent>
          </Card>
        );
      })}
    </TableContainer>
  );
}
