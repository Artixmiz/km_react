import {
  MapContainer,
  TileLayer,
  ZoomControl,
  Marker,
  useMap,
} from "react-leaflet";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

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
import { Icon } from "leaflet";
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

export default function ProductPage(props) {
  const { innovationimg2, classes } = props;
  return (
    <Card>
      <CardBody>
        <Grid container spacing={2} columns={16}>
          {innovationimg2.map((listValue, index, innovation_type) => {
            return (
              <Grid item xs={3}>
                <Card
                  className="card-header-border card-border"
                  style={{
                    margin: "20px 20px 20px 20px",
                    width: "40",
                    fontFamily: "Prompt",
                    height: 700,
                  }}
                >
                  <CardBody
                    // className="card-border"
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
                        <h className={classes.customLabel}>ชื่อผลิตภัณฑ์ : </h>
                        {listValue.co_researcher_pi_name}
                      </p>
                      {/* <Typography className={useCard.pos}>
                                <p>
                                  <h className={classes.customLabel}>
                                    รายละเอียด :{" "}
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
                      style={{
                        textAlign: "left",
                        fontFamily: "Prompt",
                      }}
                    >
                      <p>
                        <h className={classes.customLabel}>จำนวนการผลิต : </h>
                        {listValue.co_researcher_pi_amount} ชิ้น
                      </p>
                      <p>
                        <h className={classes.customLabel}>ราคา : </h>
                        {listValue.co_researcher_pi_price} บาท
                      </p>
                      <p>
                        <h className={classes.customLabel}>ผู้ประสานงาน : </h>
                        {listValue.co_researcher_pi_coordinator}
                      </p>
                      <p>
                        <h className={classes.customLabel}>โทรศัพท์ : </h>
                        {listValue.co_researcher_pi_phone}
                      </p>
                      <p>
                        <h className={classes.customLabel}>Facebook : </h>
                        <Button
                          a
                          href={listValue.co_researcher_pi_facebook}
                          style={{ fontSize: "smaller" }}
                        >
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
  );
}
