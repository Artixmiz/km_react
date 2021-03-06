import React, { useEffect, useState } from "react";
import { Col, CardBody } from "reactstrap";
import Typography from "@material-ui/core/Typography";
import "../Css/mapView.scss";
import { Card } from "react-bootstrap";

import AwesomeSlider from "react-awesome-slider";
import axios from "axios";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { makeStyles, createTheme } from "@material-ui/core/styles";

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

export default function InnovationPage(props) {
  const { co_researcher_id, classes } = props;
  const apiUrl = "https://kmapi.kims-rmuti.com";
  const [innovationimg1, setinnovationimg1] = useState([]);
  let id = atob(co_researcher_id);

  useEffect(() => {
    axios
      .get(
        `${apiUrl}/api/get/co-researcher/innovation/images/type?co_id=${id}&pi_type_id=1`
      )
      .then((result) => {
        setinnovationimg1(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        // setmserrorkn(err.response.data.message);
      });
  }, []);
  return (
    <Card className="card-header-border card-border">
      {/* <CardBody className="card-header-border">
        <CardTitle
          tag="h6"
          style={{ padding: 5, color: "black" }}
          className={(classes.customLabel, classes.headerLabel)}
        >
          ????????????????????????
        </CardTitle>
      </CardBody> */}
      <Card>
        <CardBody>
          <Grid container spacing={2} columns={16}>
            {innovationimg1.map((listValue, index, innovation_type) => {
              return (
                <Grid item xs={3}>
                  <Card
                    className="card-header-border card-border"
                    style={{
                      margin: "20px 20px 20px 20px",
                      width: "40",
                      fontFamily: "Prompt",
                      height: 750,
                    }}
                  >
                    <CardBody
                      className="card-border"
                      key={innovation_type}
                      style={{
                        fontFamily: "Prompt",
                        height: 100,
                      }}
                    >
                      <Typography
                        style={{
                          color: "blue",
                          fontFamily: "Prompt",
                        }}
                      >
                        <p>
                          <h className={classes.customLabel}>???????????????????????????????????? : </h>
                          {listValue.co_researcher_pi_name}
                        </p>
                        {/* <Typography className={useCard.pos}>
                      <p>
                        <h className={classes.customLabel}>
                          ?????????????????????????????? :{" "}
                        </h>
                        {listValue.co_researcher_pi_details}
                      </p>
                        </Typography> */}
                      </Typography>
                      <p></p>
                      <p>
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
                                  src={`https://researcher.kims-rmuti.com/file-upload/co_innovationproduct_upload/${listitem.co_innovation_image}`}
                                />
                              </Col>
                            );
                          })}
                        </AwesomeSlider>
                      </p>

                      <Typography
                        className={useCard.pos}
                        style={{ textAlign: "left" }}
                      >
                        <p>
                          <h className={classes.customLabel}>???????????????????????????????????? : </h>
                          {listValue.co_researcher_pi_amount} ????????????
                        </p>
                        <p>
                          <h className={classes.customLabel}>???????????? : </h>
                          {listValue.co_researcher_pi_price} ?????????
                        </p>
                        <p>
                          <h className={classes.customLabel}>???????????????????????????????????? : </h>
                          {listValue.co_researcher_pi_coordinator}
                        </p>
                        <p>
                          <h className={classes.customLabel}>???????????????????????? : </h>
                          {listValue.co_researcher_pi_phone}
                        </p>
                        <p>
                          <h className={classes.customLabel}>Facebook : </h>

                          <Button a href={listValue.co_researcher_pi_facebook}>
                            {listValue.co_researcher_pi_facebook.slice(8, 25)}
                          </Button>
                        </p>

                        <p>
                          <h className={classes.customLabel}>Line : </h>
                          {listValue.co_researcher_pi_line}
                        </p>
                        <p>
                          <h className={classes.customLabel}>Email : </h>
                          {listValue.co_researcher_pi_mail}
                        </p>
                        <p></p>
                      </Typography>
                    </CardBody>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </CardBody>
      </Card>
    </Card>
  );
}
