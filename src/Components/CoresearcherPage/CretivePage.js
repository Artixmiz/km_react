import {
  MapContainer,
  TileLayer,
  ZoomControl,
  Marker,
  useMap,
} from "react-leaflet";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

import D3Layer from "../D3Layer";
import { Container } from "@material-ui/core";
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
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import "../Css/mapView.scss";
import { Card } from "react-bootstrap";
import * as d3 from "d3";

import AwesomeSlider from "react-awesome-slider";

import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import Button from "@material-ui/core/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import PersonIcon from "@material-ui/icons/Person";
import CallIcon from "@material-ui/icons/Call";
import EmailIcon from "@material-ui/icons/Email";
import TwitterIcon from "@material-ui/icons/Twitter";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import LanguageIcon from "@material-ui/icons/Language";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import TableContainer from "@material-ui/core/TableContainer";
import CardContent from "@material-ui/core/CardContent";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import GetAppIcon from "@material-ui/icons/GetApp";
import L from "leaflet";
import { HiOutlineLightBulb, HiOutlineAcademicCap } from "react-icons/hi";
import { BsGraphUp, BsFillFileMedicalFill } from "react-icons/bs";
import {
  BiNetworkChart,
  BiInfoCircle,
  BiMedal,
  BiNews,
  BiGroup,
} from "react-icons/bi";
import { GiGiftOfKnowledge, GiImpactPoint } from "react-icons/gi";
import {
  AiOutlineUser,
  AiOutlineReconciliation,
  AiOutlineCoffee,
  AiOutlineApartment,
  AiTwotoneTool,
  AiFillSnippets,
} from "react-icons/ai";
import { GrCluster } from "react-icons/gr";
import SwipeableViews from "react-swipeable-views";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import {
  FaArrowAltCircleRight,
  FaArrowAltCircleDown,
  FaIndustry,
  FaHandsHelping,
  FaArrowAltCircleUp,
} from "react-icons/fa";

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

export default function CretivePage(props) {
  const { value, dataM, classes, projects } = props;
  return (
    <Row>
      <TabPanel value={value} index={5} className="tab-body">
        <Card style={{ marginTop: "15px", fontFamily: "Prompt" }}>
          {/* <CardBody className="card-header-border">
                        <CardTitle
                          tag="h6"
                          style={{
                            padding: 5,
                            color: "black",
                            fontFamily: "Prompt",
                          }}
                          className={(classes.customLabel, classes.headerLabel)}
                        >
                          แผนที่แสดงโครงการดำเนินงาน
                        </CardTitle>
                      </CardBody> */}

          <MapContainer
            className="map-border"
            center={[13, 100]}
            zoom={3}
            scrollWheelZoom={true}
            zoomControl={false}
            style={{ width: "100%", height: "600px" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <ZoomControl position="topright" />
            <D3Layer location={dataM} />
          </MapContainer>
        </Card>

        <p></p>

        <Card className="card-header-border card-border">
          <Card>
            <CardBody className="card-header-border card-border">
              <CardTitle
                tag="h6"
                style={{ padding: 5, color: "black" }}
                className={(classes.customLabel, classes.headerLabel)}
              >
                โครงการดำเนินงาน
              </CardTitle>
            </CardBody>

            <TableContainer
              className="card-header-border card-border"
              style={{
                fontFamily: "Prompt",
                padding: "20px 20px 20px 20px",
              }}
            >
              <Grid container spacing={2} columns={16}>
                {projects.map((listValue, index, project_type, l) => {
                  return (
                    <Grid item xs={6}>
                      <Card
                        className=" card-border"
                        variant="outlined"
                        key={project_type}
                        style={{
                          margin: "0px 0px 10px 0px",
                          fontFamily: "Prompt",
                        }}
                      >
                        <CardBody>
                          <CardContent>
                            {/* <img
                                      width="auto"
                                      height="170"
                                      aria-label="Placeholder: Image"
                                      preserveAspectRatio="xMidYMid slice"
                                      src={`https://www.km-innovations.rmuti.ac.th/researcher/file-upload/co_researcher-upload/${listValue.co_researcher_image}`}
                                      style={{ padding: "10px" }}
                                    /> */}
                            <p>
                              <Typography
                                align="left"
                                style={{ fontFamily: "Prompt" }}
                                gutterBottom
                              >
                                <h className={classes.customLabel}>
                                  {listValue.concept_proposal_name_th}
                                  <br></br>{" "}
                                </h>
                                {listValue.concept_proposal_name_en}
                              </Typography>
                            </p>
                            <p>
                              <Typography
                                align="left"
                                style={{ fontFamily: "Prompt" }}
                              >
                                <h className={classes.customLabel}>
                                  งบประมาณ : &nbsp;{" "}
                                </h>
                                {listValue.concept_budget
                                  ? new Number(
                                      listValue.concept_budget
                                    ).toLocaleString("en")
                                  : ""}{" "}
                                บาท
                              </Typography>
                            </p>
                            <p>
                              <Typography
                                align="left"
                                style={{ fontFamily: "Prompt" }}
                              >
                                <h className={classes.customLabel}>
                                  ปี : &nbsp;{" "}
                                </h>{" "}
                                {listValue.concept_year}
                              </Typography>
                            </p>
                            <p>
                              <Typography
                                align="left"
                                style={{ fontFamily: "Prompt" }}
                              >
                                <h className={classes.customLabel}>
                                  ชื่อนักวิจัย : &nbsp;
                                </h>
                                {listValue.prefix_name_th}
                                {listValue.user_first_name_th}
                                &nbsp;
                                {listValue.user_last_name_th}
                              </Typography>
                            </p>
                            <p>
                              <Typography
                                align="left"
                                style={{ fontFamily: "Prompt" }}
                              >
                                <h className={classes.customLabel}>
                                  หน่วยงาน : &nbsp;
                                </h>
                                {listValue.name}
                              </Typography>
                            </p>
                            {/* <Button>
                                      <a
                                        target="_blank"
                                        href={`https://researcher.kims-rmuti.com/file-upload/project-upload/${listValue.project_upload}`}
                                        rel="noreferrer"
                                      >
                                        <GetAppIcon />
                                      </a>
                                    </Button> */}

                            <Button
                              color="primary"
                              style={{ fontFamily: "Prompt" }}
                              aria-label="view info project"
                              onClick={() => {
                                console.log("test" + listValue.project_id);
                                props.history.push({
                                  pathname: "/ProjectDetail/projectNetwork",
                                  search: `?project_id=${btoa(
                                    listValue.project_id
                                  )}`,
                                  pathname:
                                    "/ProjectDetailConcep/projectNetwork",

                                  search: `?concep_id=${btoa(
                                    listValue.concept_proposal_id
                                  )}`,
                                });
                              }}
                            >
                              รายละเอียดเพิ่มเติม
                            </Button>
                          </CardContent>
                        </CardBody>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </TableContainer>
          </Card>
        </Card>
      </TabPanel>
    </Row>
  );
}
