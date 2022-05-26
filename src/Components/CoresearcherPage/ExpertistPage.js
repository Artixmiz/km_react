import React, { useEffect, useState } from "react";

import {
  Col,
  // Container,
  Row,
  CardTitle,
  CardBody,
  CardText,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal,
  CardImg,
  CardSubtitle,
} from "reactstrap";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "../Css/Detail.scss";

import Typography from "@material-ui/core/Typography";
import "../Css/mapView.scss";

import { Card } from "react-bootstrap";
import { orange } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";

import AwesomeSlider from "react-awesome-slider";

import "bootstrap/dist/css/bootstrap.min.css";

import Grid from "@material-ui/core/Grid";

import TableContainer from "@material-ui/core/TableContainer";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "prop-types";

import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";

const customTheme = createTheme({
  palette: {
    secondary: {
      main: orange[500],
    },
  },
});

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

function getId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}

export default function ExpertisePage(props) {
  const {
    classes,
    valuePage1,
    handleChangePage1,
    expertise,
    award,
    certificate,
  } = props;
  return (
    <ThemeProvider theme={customTheme}>
      <div className={classes.root}>
        <AppBar position="static" color="default" className={classes.appbar}>
          <Tabs
            value={valuePage1}
            onChange={handleChangePage1}
            variant="scrollable"
            scrollButtons="on"
            TabIndicatorProps={{
              style: { background: "rgb(252, 113, 0)" },
            }}
            classes={{
              root: classes.abRoot,
              positionStatic: classes.abStatic,
            }}
            textColor="secondary"
            aria-label="scrollable tabs menu"
          >
            <Tab
              label="ความเชี่ยวชาญ"
              className={classes.customLabel}
              {...a11yProps(0)}
            />
            <Tab
              label="รางวัล"
              className={classes.customLabel}
              {...a11yProps(1)}
            />
            <Tab
              label="ใบประกาศ"
              className={classes.customLabel}
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        <div>
          <TabPanel value={valuePage1} index={0}>
            {/* <Card className="card-header-border card-border "> */}
            {/* <CardBody className="card-header-border tab-body ">
                          <CardTitle
                            tag="h6"
                            style={{ padding: 5, color: "white" }}
                            className={classes.customLabel}
                          >
                            ความเชี่ยวชาญ
                          </CardTitle>
                        </CardBody> */}

            <TableContainer
              style={{
                fontFamily: "Prompt",
                padding: "20px 20px 20px 20px",
              }}
              fluid={true}
            >
              {expertise.map((listValue, d) => {
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
                      <CardTitle
                        tag="h6"
                        style={{
                          padding: 5,
                          color: "black",
                        }}
                      >
                        <Typography
                          className={useCard.pos}
                          color="textSecondary"
                          style={{ fontFamily: "Prompt" }}
                        >
                          {listValue.expertise_type_name}
                        </Typography>
                        <CardTitle
                          tag="h6"
                          style={{
                            padding: 5,
                            color: "black",
                            fontSize: 18,
                          }}
                          className={classes.customLabel}
                        >
                          {listValue.co_researcher_expertise}
                        </CardTitle>

                        <h
                          style={{
                            padding: "20px",
                            fontFamily: "Prompt",
                          }}
                        >
                          {listValue.co_researcher_expertise_details}
                        </h>
                        <Typography
                          align="left"
                          style={{ fontFamily: "Prompt" }}
                        ></Typography>
                      </CardTitle>

                      <CardBody className="card-header-color">
                        <Row>
                          <Col md={5}>
                            <CardTitle
                              tag="h6"
                              style={{ padding: 5, color: "black" }}
                              className={
                                (classes.customLabel, classes.headerLabel)
                              }
                            >
                              รูปภาพ
                            </CardTitle>
                            <p></p>
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
                                      src={`https://researcher.kims-rmuti.com/file-upload/co_expertise-upload/${listitem.co_ex_image}`}
                                    />
                                  </Col>
                                );
                              })}
                            </AwesomeSlider>
                            {/* <CardImg
                                            top
                                            style={{
                                              backgroundSize: "cover",
                                            }}
                                            src={`https://researcher.kims-rmuti.com/file-upload/co_expertise-upload/${listValue.co_researcher_expertise_image}`}
                                            height="auto"
                                            width="320"
                                          /> */}
                          </Col>

                          <Col md="7">
                            <CardTitle
                              tag="h6"
                              style={{ padding: 5, color: "black" }}
                              className={
                                (classes.customLabel, classes.headerLabel)
                              }
                            >
                              วิดีโอ
                            </CardTitle>

                            <div>
                              {listValue.co_researcher_expertise_vdo ? (
                                <YoutubeEmbed
                                  embedId={
                                    listValue.co_researcher_expertise_vdo
                                  }
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
                      <p></p>
                    </CardContent>
                  </Card>
                );
              })}
            </TableContainer>
            {/* </Card> */}
          </TabPanel>
          <TabPanel value={valuePage1} index={1}>
            {/* <Card className="card-header-border card-border"> */}
            {/* <CardBody className="card-header-border">
                          <CardTitle
                            tag="h6"
                            style={{ padding: 5, color: "black" }}
                            className={
                              (classes.customLabel, classes.headerLabel)
                            }
                          >
                            รางวัล
                          </CardTitle>
                        </CardBody> */}
            <Grid container spacing={2} columns={16}>
              {award.map((listValue, index) => {
                return (
                  <Grid item xs={6}>
                    <Card
                      className="card-header-border card-border"
                      style={{
                        margin: "20px 20px 20px 20px",
                        width: "40",
                        height: "auto",
                        fontFamily: "Prompt",
                      }}
                    >
                      <CardBody className="card-header-border">
                        <Typography
                          className={classes.customLabel}
                          style={{
                            color: "blue",
                            fontFamily: "Prompt",
                          }}
                        >
                          {listValue.co_researcher_award_name_th}
                          <p>{listValue.co_researcher_award_name_en}</p>
                        </Typography>
                        <hr
                          style={{
                            marginLeft: 4,
                            marginRight: 4,
                          }}
                        />
                        <Typography style={{ fontFamily: "Prompt" }}>
                          {listValue.co_researcher_award_Portfolio_th}
                        </Typography>
                        <p></p>
                        <p>
                          <img
                            src={`https://researcher.kims-rmuti.com/file-upload/co-award-upload/${listValue.co_researcher_award_images}`}
                            height="170"
                            width="auto"
                          />
                        </p>
                        ผู้มอบรางวัล: &nbsp;
                        {listValue.co_researcher_award_giver}
                        <Typography
                          className={useCard.pos}
                          color="textSecondary"
                          style={{ fontFamily: "Prompt" }}
                        >
                          {listValue.co_researcher_award_detail}
                        </Typography>
                        <Typography
                          className={useCard.pos}
                          color="textSecondary"
                          style={{ fontFamily: "Prompt" }}
                        >
                          {listValue.co_researcher_award_date
                            ? new Date(
                                listValue.co_researcher_award_date
                              ).toLocaleDateString("th-TH", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                weekday: "long",
                              })
                            : ""}
                        </Typography>
                      </CardBody>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
            {/* </Card> */}
          </TabPanel>

          <TabPanel value={valuePage1} index={2}>
            {/* <Card className="card-header-border card-border">
                        <CardBody className="card-header-border">
                          <CardTitle
                            tag="h6"
                            style={{ padding: 5, color: "black" }}
                            className={
                              (classes.customLabel, classes.headerLabel)
                            }
                          >
                            ใบประกาศ
                          </CardTitle>
                        </CardBody> */}
            <Grid container spacing={2} columns={16}>
              {certificate.map((listValue, index) => {
                return (
                  <Grid item xs={6}>
                    <Card
                      className="card-header-border card-border"
                      style={{
                        margin: "20px 20px 20px 20px",
                        width: "40",
                        height: "auto",
                        fontFamily: "Prompt",
                      }}
                    >
                      <CardBody className="card-header-border">
                        <Typography
                          className={classes.customLabel}
                          style={{
                            color: "blue",
                            fontFamily: "Prompt",
                          }}
                        >
                          {listValue.co_certificate_name_th}
                          <p>{listValue.co_certificate_agency}</p>
                        </Typography>
                        <hr
                          style={{
                            marginLeft: 4,
                            marginRight: 4,
                          }}
                        />
                        <p>{listValue.co_certificate_agency}</p>
                        <p>
                          <img
                            src={`https://researcher.kims-rmuti.com/file-upload/co_certificate-upload/${listValue.co_certificate_image}`}
                            height="200"
                            width="auto"
                          />
                        </p>

                        <Typography style={{ fontFamily: "Prompt" }}>
                          <Card.Text>
                            <p></p>
                            อบรม วันที่ :&nbsp;
                            {listValue.co_certificate_start
                              ? new Date(
                                  listValue.co_certificate_start
                                ).toLocaleDateString("th-TH", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  weekday: "long",
                                })
                              : ""}
                            <Typography style={{ fontFamily: "Prompt" }}>
                              ถึง :&nbsp;{" "}
                              {listValue.co_certificate_end
                                ? new Date(
                                    listValue.co_certificate_start
                                  ).toLocaleDateString("th-TH", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    weekday: "long",
                                  })
                                : ""}
                            </Typography>
                            <Typography
                              align="center"
                              className={useCard.pos}
                              color="textSecondary"
                              style={{ fontFamily: "Prompt" }}
                            >
                              สถานที่ :&nbsp;
                              {listValue.co_certificate_venue}
                            </Typography>
                            <Typography
                              align="center"
                              className={useCard.pos}
                              color="textSecondary"
                              style={{ fontFamily: "Prompt" }}
                            >
                              ประเทศ : {listValue.co_certificate_country}
                            </Typography>
                          </Card.Text>
                        </Typography>
                      </CardBody>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
            {/* </Card> */}
          </TabPanel>
        </div>
      </div>
    </ThemeProvider>
  );
}
