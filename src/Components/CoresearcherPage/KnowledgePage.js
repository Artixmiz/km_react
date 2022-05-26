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

export default function KnowledgePage(props) {
    const {knowledge, classes} = props
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
