/* eslint-disable array-callback-return */
/* eslint-disable no-sequences */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  Marker,
  useMap,
} from "react-leaflet";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

import D3Layer from "./D3Layer";

import {
  Col,
  Container,
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
import "./Css/Detail.scss";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import "./Css/mapView.scss";
import markerIconPng from "../images/icon.png";
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

import noImg from "../images/no-image.png";

import { useTranslation } from "react-i18next";

const customTheme = createTheme({
  palette: {
    secondary: {
      main: orange[500],
    },
  },
});

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

const useTimeline = makeStyles((theme) => ({
  paper: {
    padding: "3px ",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

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

const useStyles = makeStyles((theme) => ({
  abRoot: {
    backgroundColor: "bule",
  },
  abStatic: {
    border: "solid blue 2px",
  },
  appbar: {
    alignItems: "center",
    backgroundColor: "rgba(219, 219, 219, 0.459)",
  },

  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },

  customLabel: {
    fontFamily: "Prompt",
    fontWeight: "bold",
    color: "black",
  },

  round: {
    borderRadius: "50%",
    border: "4px solid rgb(223, 223, 223)",
    width: "100%",
    boxShadow:
      "rgba(0, 0, 0, 0.293) 0px 19px 38px, rgba(0, 0, 0, 0.129) 0px 15px 12px",
    [theme.breakpoints.up("sm")]: {
      width: "65%",
    },
  },

  underlineCol: {
    borderBottom: "2px solid rgb(211, 211, 211)",
    paddingTop: 12,
  },

  tabpanel: {
    marginLeft: "auto",
    marginRight: "auto",
  },

  headerLabel: {
    position: "relative",
    fontFamily: "Prompt",
    fontWeight: "bold",
    color: "black",
    zIndex: 1,

    textAlign: "center",

    "&::after": {
      position: "absolute",
      content: '""',
      top: 10,
      borderBottom: "3px solid black",
      width: 120,
      left: "50%",
      marginTop: 10,
      marginLeft: "-60px",
      bottom: 0,
    },
  },

  cardlayout: {
    marginTop: 20,
    boxShadow:
      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
    [theme.breakpoints.up("sm")]: {
      marginTop: 0,
    },
  },

  tabsBg: {
    background:
      "linear-gradient(90deg,rgba(240, 99, 0, 1) 0%,rgba(255, 115, 0, 1) 38%,rgba(254, 148, 0, 1) 100%)",
  },
}));

const useSnap = makeStyles((theme) => ({
  root: {
    width: "90%",
    maxWidth: "90%",
    backgroundColor: theme.palette.background.paper,

    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  inline: {
    display: "inline",
  },
  size: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}));

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function CoResearcher(props) {
  const { t } = useTranslation();

  const [result, setresult] = useState([]);
  const [expertise, setexpertise] = useState([]);
  const [award, setaward] = useState([]);
  const [knowledge, setknowledge] = useState([]);
  const [project, setproject] = useState([]);
  const { locationCo } = props;
  const [location, setlocation] = useState([]);
  const [table, settable] = useState(false);
  const [dataTable, setDatatable] = useState([]);
  const [certificate, setcertificate] = useState([]);
  const [publication, setpublication] = useState([]);
  const [patent, setpatent] = useState([]);
  const [modalKn, setModalKnow] = useState(false);
  const [modalOu, setModalOut] = useState(false);
  const [innovationgroup, setinnovationgroup] = useState([]);
  const [projects, setprojects] = useState([]);
  const [innovationimg1, setinnovationimg1] = useState([]);
  const [innovationimg2, setinnovationimg2] = useState([]);
  const [selected, setSelected] = useState(0);

  const toggle_know = () => setModalKnow(!modalKn);
  const toggle_output = () => setModalOut(!modalOu);

  const [mserror, setmserror] = useState(null);
  const [mserrorkn, setmserrorkn] = useState(null);

  const [messageErr, setMessageErr] = useState(null);

  const classes = useStyles();

  var myParam = document.location.search.split("page")[1];

  var param = 0;
  if (myParam) {
    param = parseInt(myParam);
    console.log("testParam : ", param);
  }
  const [value, setValue] = useState(param);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [valuePage1, setValuePage1] = useState(0);

  const handleChangePage1 = (event, newValue) => {
    setValuePage1(newValue);
  };

  const markermap = location.map((d, i, p, listValue) => {
    if (d.lat && d.lng) {
      return (
        <Marker
          key={`${i}`}
          position={[d.lat, d.lng]}
          icon={
            new Icon({
              iconUrl:
                p.co_researcher_group_id == 1
                  ? `https://www.km-innovations.rmuti.ac.th/researcher/file-upload/co_researcher-upload/${p.co_researcher_image}`
                  : // "https://cdn-icons-png.flaticon.com/512/1458/1458500.png"
                  p.co_researcher_group_id == 2
                  ? `https://www.km-innovations.rmuti.ac.th/researcher/file-upload/co_researcher-upload/${p.co_researcher_image}`
                  : p.co_researcher_group_id == 3
                  ? `https://www.km-innovations.rmuti.ac.th/researcher/file-upload/co_researcher-upload/${p.co_researcher_image}`
                  : "https://images.vexels.com/media/users/3/140527/isolated/preview/449b95d58f554656b159dd3ca21ab123-home-round-icon.png",
              iconSize: [40, 41],
              className: "image-icon",
            })
          }
        ></Marker>
      );
    }
  });

  const handleClick = (event, location) => {
    settable(true);
    const { lat, lng } = event.latlng;
    console.log(`Clicked at ${lat}, ${lng} `);
    console.log(location);
    setDatatable([location]);
  };

  const ModalDataDetail = (props) => {
    console.log(props);
    const { modal, toggle, title, detail } = props;

    return (
      <div>
        <Modal isOpen={modal} toggle={toggle} style={{ marginTop: 60 }}>
          <ModalHeader toggle={toggle}>{title}</ModalHeader>
          <ModalBody>
            <p style={{ whiteSpace: "pre-wrap" }}>{detail}</p>
          </ModalBody>
          <ModalFooter>
            <Button class="button button3" onClick={toggle}>
              ปิด
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  const customMarker = (co_id) =>
    new L.DivIcon({
      html: `
        <div class="relative">
          <img class="image-icon" src="https://image.flaticon.com/icons/png/512/1087/1087815.png"/>
          <div class="researcher">
          <a href="/Researcher"><img class="image-icon" src="https://image.flaticon.com/icons/png/512/219/219983.png"/></a>
          </div>
          <div class="co-reseacher-group">
           <a href="/CoResearcher1"><img class="image-icon" src="https://med.mahidol.ac.th/learningresources/sites/default/files/public/Corporate-Events.png"/></a> 
          </div>
        </div>
        `,
      shadowUrl: null,
      shadowSize: null,
      iconAnchor: new L.Point(23, 23),
      className: "my-div-icon",
    });
  const localUrl = "http://localhost:4000";
  const apiUrl = "https://kmapi.kims-rmuti.com";

  const getParamsId = () => {
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    const co_id = params.get("co_researcher_id");
    return co_id;
  };

  const idencrypt = getParamsId();
  let id;
  useEffect(() => {
    if (idencrypt == null || idencrypt == undefined) {
      props.history.push({
        pathname: "/SearchPageCo",
      });
      console.log(null);
    } else {
      id = atob(idencrypt);
    }

    axios
      .get(`${apiUrl}/api/get/co-researcher-expertise/image/${id}`)
      .then((result) => {
        setexpertise(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setMessageErr(err.response.data.message);
      });

    axios
      .get(`${apiUrl}/api/get/co-researcher/award/${id}`)
      .then((result) => {
        setaward(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        // setmserrorkn(err.response.data.message);
      });

    axios
      .get(`${apiUrl}/api/get/co-researcher-knowledge/image/${id}`)
      .then((result) => {
        setknowledge(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setmserrorkn(err.response.data.message);
      });

    axios
      .get(`${apiUrl}/api/get/co-researcher/project/${id}`)
      .then((result) => {
        setproject(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        // setmserrorkn(err.response.data.message);
      });

    axios
      .get(`${apiUrl}/api/get/co-researcher/projects/${id}`)
      .then((result) => {
        setprojects(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        // setmserrorkn(err.response.data.message);
      });

    axios
      .get(`${apiUrl}/api/get/co-researcher/patent/${id}`)
      .then((result) => {
        setpatent(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        // setmserrorkn(err.response.data.message);
      });

    axios
      .get(`${apiUrl}/api/get/co-researcher/${id}`)
      .then((result) => {
        console.log(result.data);
        setresult(result.data);
        setlocation([
          {
            lat: result.data[0].co_researcher_latitude,
            lng: result.data[0].co_researcher_longitude,
          },
        ]);
      })
      .catch((err) => {
        // console.log(err.response.data.message);
        // setmserror(err.response.data.message);
      });

    // axios
    //   .get(`${localUrl}/api/get/researcher/map/${id}`)
    //   .then((result) => {
    //     setMapdata(result.data);
    //   })
    //   .catch((err) => {
    //     console.log(err.response.data.message);
    //     // setmserrorkn(err.response.data.message);
    //   });

    axios
      .get(`${apiUrl}/api/get/co-researcher/certificate/${id}`)
      .then((result) => {
        setcertificate(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setmserrorkn(err.response.data.message);
      });

    axios
      .get(`${apiUrl}/api/get/co-researcher/publication-group/${id}`)
      .then((result) => {
        setpublication(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setmserrorkn(err.response.data.message);
      });

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

    axios
      .get(
        `${apiUrl}/api/get/co-researcher/innovation/images/type?co_id=${id}&pi_type_id=2`
      )
      .then((result) => {
        setinnovationimg2(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        // setmserrorkn(err.response.data.message);
      });

    axios
      .get(`${apiUrl}/api/get/co-researcher/innovation-group/${id}`)
      .then((result) => {
        setinnovationgroup(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        // setmserrorkn(err.response.data.message);
      });

    // axios
    //   .get(`${apiUrl}/api/get/us-project/${id}`)
    //   .then((result) => {
    //     setproject(result.data);
    //     setlocation([
    //       {
    //         lat: result.data.project_latitude,
    //         lng: result.data.project_longitude,
    //       },
    //     ]);
    //   })
    //   .catch((err) => {
    //     console.log(err.response.data.message);
    //     setmserror(err.response.data.message);
    //   });
  }, []);

  function getId(url) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  }

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

  const showTable = dataTable.map((location, id) => {
    const { name, year, budget } = location;
    console.log(typeof location);

    return (
      <tbody style={{ fontFamily: "Prompt" }}>
        <tr>
          <td>{id + 1}</td>
          <td>{name}</td>
          <td>{year}</td>
          <td>{budget}</td>
        </tr>
      </tbody>
    );
  });

  const mapData = async () => {
    const response = await axios.get(
      `${apiUrl}/api/get/co-researcher/map/${atob(idencrypt)}`
    );
    return response.data;
  };

  const dataM = mapData();

  const mapDataTeam = async () => {
    const response = await axios.get(
      `${apiUrl}/api/get/us-project-map/team/${atob(idencrypt)}`
    );
    return response.data;
  };

  const dataTeam = mapDataTeam();

  return (
    <body className="tab-body">
      <div className="body-detail">
        <Container
          className="themed-container card-header-border img-bg"
          fluid={true}
        >
          <Row
            style={{ fontFamily: "Prompt" }}
            className="align-items-center justify-content-md-center"
          >
            <Col xs={12} md="auto" className="picposi">
              {result.map((d, i) => {
                return d.co_researcher_image ? (
                  <img
                    src={`https://researcher.kims-rmuti.com/file-upload/co_researcher-upload/${d.co_researcher_image}`}
                    width={350}
                    className="img-shadow"
                    style={{ borderRadius: 4 }}
                  />
                ) : (
                  <img
                    width="300px"
                    src={noImg}
                    className="img-shadow"
                    style={{ borderRadius: 4 }}
                  />
                );
              })}
            </Col>

            <Grid xs="12" md={6}>
              <Card style={{ marginTop: 5 }} className="img-shadow">
                <CardBody className="card-header">
                  {result.map((d, i) => {
                    return (
                      <CardTitle
                        tag="h6"
                        style={{ padding: 5, color: "white" }}
                      >
                        <h3>{result[0].co_researcher_name_th} </h3>
                        <CardText style={{ textAlign: "left" }}>
                          <p>{result[0].co_researcher_history}</p>
                          {/* <p>มีความร่วมมือกับ : </p> */}
                        </CardText>
                      </CardTitle>
                    );
                  })}
                </CardBody>
              </Card>
            </Grid>
          </Row>
        </Container>

        <ThemeProvider theme={customTheme}>
          <div className={classes.root}>
            <AppBar
              position="static"
              color="default"
              className={classes.appbar}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="on"
                TabIndicatorProps={{
                  style: { background: "rgb(252, 113, 0)" },
                }}
                textColor="secondary"
                aria-label="scrollable tabs menu"
                messageErr={messageErr}
              >
                <Tab
                  label={t("agency.tabmenu.menu1")}
                  className={classes.customLabel}
                  icon={<AiOutlineApartment size={25} />}
                  {...a11yProps(0)}
                />
                <Tab
                  label={t("agency.tabmenu.menu2")}
                  className={classes.customLabel}
                  icon={<GiGiftOfKnowledge size={25} />}
                  {...a11yProps(1)}
                />
                <Tab
                  label={t("agency.tabmenu.menu3")}
                  className={classes.customLabel}
                  icon={<AiOutlineCoffee size={25} />}
                  {...a11yProps(2)}
                />

                <Tab
                  label={t("agency.tabmenu.menu4")}
                  className={classes.customLabel}
                  icon={<HiOutlineLightBulb size={25} />}
                  {...a11yProps(3)}
                />
                <Tab
                  label={t("agency.tabmenu.menu5")}
                  className={classes.customLabel}
                  icon={<HiOutlineLightBulb size={25} />}
                  {...a11yProps(4)}
                />
                <Tab
                  label={t("agency.tabmenu.menu6")}
                  className={classes.customLabel}
                  icon={<FaHandsHelping size={25} />}
                  {...a11yProps(5)}
                />
                <Tab
                  label={t("agency.tabmenu.menu7")}
                  className={classes.customLabel}
                  icon={<AiOutlineReconciliation size={25} />}
                  {...a11yProps(6)}
                />
                <Tab
                  label={t("agency.tabmenu.menu8")}
                  className={classes.customLabel}
                  icon={<AiOutlineUser size={25} />}
                  {...a11yProps(7)}
                />
              </Tabs>
            </AppBar>

            <TabPanel value={value} index={0} className="tab-body">
              <ThemeProvider theme={customTheme}>
                <div className={classes.root}>
                  <AppBar
                    position="static"
                    color="default"
                    className={classes.appbar}
                  >
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
                                          (classes.customLabel,
                                          classes.headerLabel)
                                        }
                                      >
                                        รูปภาพ
                                      </CardTitle>
                                      <p></p>
                                      <AwesomeSlider bullets={false}>
                                        {listValue.images.map(
                                          (listitem, index) => {
                                            return (
                                              <Col md="5">
                                                <img
                                                  className="card-border"
                                                  style={{
                                                    objectPosition:
                                                      "center center",
                                                    padding: 1,
                                                    color: "black",
                                                  }}
                                                  width="100%"
                                                  height="auto"
                                                  src={`https://researcher.kims-rmuti.com/file-upload/co_expertise-upload/${listitem.co_ex_image}`}
                                                />
                                              </Col>
                                            );
                                          }
                                        )}
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
                                          (classes.customLabel,
                                          classes.headerLabel)
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
                                    <p>
                                      {listValue.co_researcher_award_name_en}
                                    </p>
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
                                      <Typography
                                        style={{ fontFamily: "Prompt" }}
                                      >
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
                                        ประเทศ :{" "}
                                        {listValue.co_certificate_country}
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
            </TabPanel>

            <TabPanel value={value} index={1} className="tab-body">
              {/* <Card className="card-header-border card-border"> */}
              {/* <CardBody className="card-header-border">
                  <CardTitle
                    tag="h6"
                    style={{ padding: 5, color: "black" }}
                    className={(classes.customLabel, classes.headerLabel)}
                  >
                    ความรู้
                  </CardTitle>
                </CardBody> */}
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
                        <CardTitle
                          tag="h6"
                          style={{ padding: 5, color: "black" }}
                        >
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
                                className={
                                  (classes.customLabel, classes.headerLabel)
                                }
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
                                className={
                                  (classes.customLabel, classes.headerLabel)
                                }
                              >
                                วิดีโอ
                              </CardTitle>

                              <div>
                                {listValue.co_researcher_knowledge_videolink ? (
                                  <YoutubeEmbed
                                    embedId={
                                      listValue.co_researcher_knowledge_videolink
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
                      </CardContent>
                    </Card>
                  );
                })}
              </TableContainer>
              {/* </Card> */}
            </TabPanel>

            <TabPanel value={value} index={2} className="tab-body">
              <Card>
                {/* <CardBody className="card-header-border">
                  <CardTitle
                    tag="h6"
                    style={{ padding: 5, color: "black" }}
                    className={(classes.customLabel, classes.headerLabel)}
                  >
                    ผลิตภัณฑ์
                  </CardTitle>
                </CardBody> */}
                <Card>
                  <CardBody>
                    <Grid container spacing={2} columns={16}>
                      {innovationimg2.map(
                        (listValue, index, innovation_type) => {
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
                                      <h className={classes.customLabel}>
                                        ชื่อผลิตภัณฑ์ :{" "}
                                      </h>
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
                                      {listValue.images.map(
                                        (listitem, index) => {
                                          return (
                                            <Col md="5">
                                              <img
                                                className="card-border"
                                                style={{
                                                  objectPosition:
                                                    "center center",
                                                  padding: 1,
                                                  color: "black",
                                                }}
                                                width="100%"
                                                height="auto"
                                                src={`https://researcher.kims-rmuti.com/file-upload/co_innovationproduct_upload/${listitem.co_innovation_image}`}
                                              />
                                            </Col>
                                          );
                                        }
                                      )}
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
                                      <h className={classes.customLabel}>
                                        จำนวนการผลิต :{" "}
                                      </h>
                                      {listValue.co_researcher_pi_amount} ชิ้น
                                    </p>
                                    <p>
                                      <h className={classes.customLabel}>
                                        ราคา :{" "}
                                      </h>
                                      {listValue.co_researcher_pi_price} บาท
                                    </p>
                                    <p>
                                      <h className={classes.customLabel}>
                                        ผู้ประสานงาน :{" "}
                                      </h>
                                      {listValue.co_researcher_pi_coordinator}
                                    </p>
                                    <p>
                                      <h className={classes.customLabel}>
                                        โทรศัพท์ :{" "}
                                      </h>
                                      {listValue.co_researcher_pi_phone}
                                    </p>
                                    <p>
                                      <h className={classes.customLabel}>
                                        Facebook :{" "}
                                      </h>
                                      <Button
                                        a
                                        href={
                                          listValue.co_researcher_pi_facebook
                                        }
                                        style={{ fontSize: "smaller" }}
                                      >
                                        {listValue.co_researcher_pi_facebook.slice(
                                          8,
                                          25
                                        )}
                                      </Button>
                                    </p>

                                    <p>
                                      <h className={classes.customLabel}>
                                        Line :{" "}
                                      </h>
                                      {listValue.co_researcher_pi_line}
                                    </p>
                                    <p>
                                      <h className={classes.customLabel}>
                                        Email :{" "}
                                      </h>
                                      {listValue.co_researcher_pi_mail}
                                    </p>
                                    <p></p>
                                  </Typography>
                                </CardBody>
                              </Card>
                            </Grid>
                          );
                        }
                      )}
                    </Grid>
                  </CardBody>
                </Card>
              </Card>
            </TabPanel>

            <TabPanel value={value} index={3} className="tab-body">
              <Card className="card-header-border card-border">
                {/* <CardBody className="card-header-border">
                  <CardTitle
                    tag="h6"
                    style={{ padding: 5, color: "black" }}
                    className={(classes.customLabel, classes.headerLabel)}
                  >
                    นวัตกรรม
                  </CardTitle>
                </CardBody> */}
                <Card>
                  <CardBody>
                    <Grid container spacing={2} columns={16}>
                      {innovationimg1.map(
                        (listValue, index, innovation_type) => {
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
                                      <h className={classes.customLabel}>
                                        ชื่อนวัตกรรม :{" "}
                                      </h>
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
                                      {listValue.images.map(
                                        (listitem, index) => {
                                          return (
                                            <Col md="5">
                                              <img
                                                className="card-border"
                                                style={{
                                                  objectPosition:
                                                    "center center",
                                                  padding: 1,
                                                  color: "black",
                                                }}
                                                width="100%"
                                                height="auto"
                                                src={`https://researcher.kims-rmuti.com/file-upload/co_innovationproduct_upload/${listitem.co_innovation_image}`}
                                              />
                                            </Col>
                                          );
                                        }
                                      )}
                                    </AwesomeSlider>
                                  </p>

                                  <Typography
                                    className={useCard.pos}
                                    style={{ textAlign: "left" }}
                                  >
                                    <p>
                                      <h className={classes.customLabel}>
                                        จำนวนการผลิต :{" "}
                                      </h>
                                      {listValue.co_researcher_pi_amount} ชิ้น
                                    </p>
                                    <p>
                                      <h className={classes.customLabel}>
                                        ราคา :{" "}
                                      </h>
                                      {listValue.co_researcher_pi_price} บาท
                                    </p>
                                    <p>
                                      <h className={classes.customLabel}>
                                        ผู้ประสานงาน :{" "}
                                      </h>
                                      {listValue.co_researcher_pi_coordinator}
                                    </p>
                                    <p>
                                      <h className={classes.customLabel}>
                                        โทรศัพท์ :{" "}
                                      </h>
                                      {listValue.co_researcher_pi_phone}
                                    </p>
                                    <p>
                                      <h className={classes.customLabel}>
                                        Facebook :{" "}
                                      </h>

                                      <Button
                                        a
                                        href={
                                          listValue.co_researcher_pi_facebook
                                        }
                                      >
                                        {listValue.co_researcher_pi_facebook.slice(
                                          8,
                                          25
                                        )}
                                      </Button>
                                    </p>

                                    <p>
                                      <h className={classes.customLabel}>
                                        Line :{" "}
                                      </h>
                                      {listValue.co_researcher_pi_line}
                                    </p>
                                    <p>
                                      <h className={classes.customLabel}>
                                        Email :{" "}
                                      </h>
                                      {listValue.co_researcher_pi_mail}
                                    </p>
                                    <p></p>
                                  </Typography>
                                </CardBody>
                              </Card>
                            </Grid>
                          );
                        }
                      )}
                    </Grid>
                  </CardBody>
                </Card>
              </Card>
            </TabPanel>

            <TabPanel value={value} index={4} className="tab-body">
              {/* <Card className="card-header-border card-border"> */}
              {/* <CardBody className="card-header-border">
                  <CardTitle
                    tag="h6"
                    style={{ padding: 5, color: "black" }}
                    className={(classes.customLabel, classes.headerLabel)}
                  >
                    นวัตกรรม
                  </CardTitle>
                </CardBody> */}

              {/* </Card> */}
            </TabPanel>

            <div>
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
                                          {listValue.user_first_name_th}&nbsp;
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
                                          console.log(
                                            "test" + listValue.project_id
                                          );
                                          props.history.push({
                                            pathname:
                                              "/ProjectDetail/projectNetwork",
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
            </div>

            <TabPanel value={value} index={6} className="tab-body">
              <ThemeProvider theme={customTheme}>
                <div className={classes.root}>
                  <AppBar
                    position="static"
                    color="default"
                    className={classes.appbar}
                  >
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
                        label="ทรัพย์สินทางปัญญา"
                        className={classes.customLabel}
                        {...a11yProps(0)}
                      />
                      <Tab
                        label="เอกสารเผยแพร่"
                        className={classes.customLabel}
                        {...a11yProps(1)}
                      />
                    </Tabs>
                  </AppBar>
                </div>

                <TabPanel value={valuePage1} index={0}>
                  <Card className="card-header-border card-border">
                    <CardBody className="card-header-border">
                      <CardTitle
                        tag="h6"
                        style={{ padding: 5, color: "black" }}
                        className={(classes.customLabel, classes.headerLabel)}
                      >
                        ทรัพย์สินทางปัญญา
                      </CardTitle>
                    </CardBody>
                    <TableContainer
                      component={Paper}
                      style={{ fontFamily: "Prompt" }}
                    >
                      <Timeline align="alternate">
                        {patent.map((listValue, index) => {
                          return (
                            <Grid item xs={4} container justify="center">
                              <Card
                                style={{
                                  width: "30",
                                  margin: "30px 30px 30px 30px",
                                  fontFamily: "Prompt",
                                }}
                              >
                                <Card.Img
                                  variant="top"
                                  src={`https://researcher.kims-rmuti.com/file-upload/co_patent-upload/${listValue.co_patent_image}`}
                                  height="auto"
                                  width="150"
                                />
                                <Card.Body>
                                  <Card.Title>
                                    {" "}
                                    {listValue.co_patent_name_th}
                                  </Card.Title>
                                  <Card.Text>
                                    {listValue.co_patent_name_EN}

                                    <p>
                                      {listValue.co_patent_registered_name}
                                      <p></p>
                                      วันที่ :&nbsp;
                                      {listValue.co_patent_date
                                        ? new Date(
                                            listValue.co_patent_date
                                          ).toLocaleDateString("th-TH", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            weekday: "long",
                                          })
                                        : ""}
                                      <p></p>
                                      <Typography
                                        className={useCard.pos}
                                        color="textSecondary"
                                        style={{ fontFamily: "Prompt" }}
                                      >
                                        ประเภทสิทธิบัตร :&nbsp;
                                        {listValue.patent_type_name}
                                      </Typography>
                                    </p>
                                    {/* <Typography
                                      style={{ fontFamily: "Prompt" }}
                                    >
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
                                      ประเทศ :{" "}
                                      {listValue.co_certificate_country}
                                    </Typography> */}
                                  </Card.Text>
                                </Card.Body>
                              </Card>
                            </Grid>
                          );
                        })}
                      </Timeline>
                    </TableContainer>
                  </Card>
                </TabPanel>

                <TabPanel value={valuePage1} index={1}>
                  <Card className="card-header-border card-border">
                    <CardBody className="card-header-border">
                      <CardTitle
                        tag="h6"
                        style={{ padding: 5, color: "black" }}
                        className={(classes.customLabel, classes.headerLabel)}
                      >
                        เอกสารเผยแพร่
                      </CardTitle>
                    </CardBody>
                    <TableContainer
                      component={Paper}
                      style={{ fontFamily: "Prompt" }}
                    >
                      <Timeline align="alternate">
                        {publication.map((listValue, index) => {
                          return (
                            <TimelineItem>
                              <TimelineOppositeContent align="left">
                                <Typography
                                  variant="body2"
                                  padding="1px 1px 1px 1px"
                                >
                                  {listValue.patent_date}
                                </Typography>
                              </TimelineOppositeContent>
                              <TimelineSeparator>
                                <TimelineDot
                                  color="secondary"
                                  variant="outlined"
                                  className="card-header-border"
                                >
                                  <AiOutlineReconciliation />
                                </TimelineDot>

                                <TimelineConnector />
                              </TimelineSeparator>

                              <TimelineContent align="left">
                                <Paper elevation={5}>
                                  <Typography
                                    align="left"
                                    variant="h6"
                                    component="h6"
                                  >
                                    {listValue.educational_degree}
                                  </Typography>

                                  <Typography
                                    align="left"
                                    style={{
                                      color: "blue",
                                      fontFamily: "Prompt",
                                    }}
                                  >
                                    &nbsp;{" "}
                                    <h
                                      style={{
                                        color: "black",
                                        fontFamily: "Prompt",
                                      }}
                                    >
                                      ชื่อ
                                    </h>
                                    : &nbsp;
                                    {
                                      listValue.co_researcher_publication_name_th
                                    }
                                    &nbsp; (
                                    {
                                      listValue.co_researcher_publication_name_en
                                    }
                                    )
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{
                                      color: "blue",
                                      fontFamily: "Prompt",
                                    }}
                                  >
                                    &nbsp;{" "}
                                    <h
                                      style={{
                                        color: "black",
                                        fontFamily: "Prompt",
                                      }}
                                    >
                                      ประเภท
                                    </h>
                                    : &nbsp;
                                    {
                                      listValue.co_researcher_publication_publish
                                    }
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{
                                      color: "blue",
                                      fontFamily: "Prompt",
                                    }}
                                  >
                                    &nbsp;{" "}
                                    <h
                                      style={{
                                        color: "black",
                                        fontFamily: "Prompt",
                                      }}
                                    >
                                      {" "}
                                      ประเทศ{" "}
                                    </h>
                                    : &nbsp;
                                    {
                                      listValue.co_researcher_publication_country
                                    }
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{
                                      color: "blue",
                                      fontFamily: "Prompt",
                                    }}
                                  >
                                    &nbsp;{" "}
                                    <h
                                      style={{
                                        color: "black",
                                        fontFamily: "Prompt",
                                      }}
                                    >
                                      {" "}
                                      วันที่{" "}
                                    </h>
                                    : &nbsp;
                                    {listValue.co_researcher_publication_date
                                      ? new Date(
                                          listValue.co_researcher_publication_date
                                        ).toLocaleDateString("th-TH", {
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                          weekday: "long",
                                        })
                                      : " "}
                                  </Typography>
                                  <Typography
                                    align="left"
                                    style={{
                                      color: "blue",
                                      fontFamily: "Prompt",
                                    }}
                                  >
                                    &nbsp;{" "}
                                    {
                                      listValue.co_researcher_publication_type_name
                                    }
                                  </Typography>
                                  <Button>
                                    <a
                                      target="_blank"
                                      href={`https://researcher.kims-rmuti.com/file-upload/publication-upload/${listValue.patent_attachment}`}
                                      rel="noreferrer"
                                    >
                                      {
                                        listValue.co_researcher_publication_attachment
                                      }
                                      <GetAppIcon />
                                    </a>
                                  </Button>
                                </Paper>
                              </TimelineContent>
                            </TimelineItem>
                          );
                        })}
                      </Timeline>
                    </TableContainer>
                  </Card>
                </TabPanel>
              </ThemeProvider>
            </TabPanel>

            {result.map((listValue, index) => {
              return (
                // listValue.co_researcher_vdo ? (

                // <TabPanel value={value} index={6}>
                //   <Row>
                //     <Col md={6}>
                //       <Card className="card-header-border card-border">
                //         <CardBody className="card-header-border">
                //           <CardTitle
                //             tag="h6"
                //             style={{ padding: 5, color: "black" }}
                //             className={(classes.customLabel, classes.headerLabel)}
                //           >
                //             ข้อมูลติดต่อ
                //           </CardTitle>
                //         </CardBody>

                //         <div className="row no-gutters">
                //           <div className="col-md-4">
                //             {result.map((d, listValue) => {
                //               return (
                //                 <img
                //                   width="200"
                //                   height="auto"
                //                   aria-label="Placeholder: Image"
                //                   preserveAspectRatio="xMidYMid slice"
                //                   src={`https://researcher.kims-rmuti.com/file-upload/co_researcher-upload/${d.co_researcher_image}`}
                //                   style={{ padding: "10px" }}
                //                 />
                //               );
                //             })}
                //           </div>

                //           <div className="col-md-8">
                //             <div
                //               className="card-body"
                //               style={{ fontFamily: "Prompt" }}
                //             >
                //               {result.map((d) => {
                //                 return (
                //                   <div>
                //                     <p className="card-title" align="left">
                //                       <PersonIcon />
                //                       &nbsp;Name : {d.coordinator_name_th}{" "}
                //                       {d.coordinator_lastname_th}
                //                     </p>

                //                     <p
                //                       className="card-text"
                //                       align="left"
                //                       style={{ color: "green" }}
                //                     >
                //                       <CallIcon />
                //                       &nbsp; โทรศัพท์ : &nbsp;
                //                       {d.co_researcher_phone}
                //                     </p>
                //                     <p
                //                       className="card-text"
                //                       align="left"
                //                       style={{ color: "red" }}
                //                     >
                //                       <EmailIcon />
                //                       &nbsp; Email : &nbsp;{d.co_researcher_mail}
                //                     </p>
                //                     <p
                //                       className="card-text"
                //                       align="left"
                //                       style={{ color: "blue" }}
                //                     >
                //                       <FacebookIcon />
                //                       &nbsp; Facebook :{" "}
                //                       {d.co_researcher_facebook ? (
                //                         <Button
                //                           a
                //                           href={d.co_researcher_facebook}
                //                           style={{
                //                             fontSize: "smaller",
                //                             color: "blue",
                //                             fontFamily: "Prompt",
                //                           }}
                //                         >
                //                           {d.co_researcher_name_th}{" "}
                //                         </Button>
                //                       ) : (
                //                         " "
                //                       )}
                //                     </p>

                //                     <p
                //                       className="card-text"
                //                       align="left"
                //                       style={{ color: "blue" }}
                //                     >
                //                       <TwitterIcon />
                //                       &nbsp; Twitter : {d.co_researcher_twitter}
                //                     </p>
                //                     <p
                //                       className="card-text"
                //                       align="left"
                //                       style={{ color: "green" }}
                //                     >
                //                       <ChatBubbleIcon />
                //                       &nbsp; Line : {d.co_researcher_line}
                //                     </p>

                //                     <p
                //                       className="card-text"
                //                       align="left"
                //                       style={{ color: "black" }}
                //                     >
                //                       <InstagramIcon />
                //                       &nbsp; Instagram : {d.co_researcher_ig}
                //                     </p>
                //                     <p className="card-text" align="left">
                //                       <LanguageIcon />
                //                       &nbsp; Website :{" "}
                //                       <Button
                //                         a
                //                         href={d.co_researcher_website}
                //                         style={{
                //                           fontSize: "small",
                //                           color: "blue",
                //                           fontFamily: "Prompt",
                //                         }}
                //                       >
                //                         {d.co_researcher_website}
                //                       </Button>
                //                     </p>
                //                   </div>
                //                 );
                //               })}
                //             </div>
                //           </div>
                //         </div>
                //       </Card>
                //     </Col>

                //     <Col xs={6}>
                //       <div>
                //         {result.map((d, listValue) => {
                //           return (
                //             <div>
                //               {d.co_researcher_vdo ? (
                //                 <YoutubeEmbed embedId={d.co_researcher_vdo} />
                //               ) : (
                //                 <div>
                //                   <p
                //                     className={classes.customLabel}
                //                     align="center"
                //                     style={{
                //                       padding: "160px",
                //                       fontFamily: "Prompt",
                //                     }}
                //                   >
                //                     {" "}
                //                     not video{" "}
                //                   </p>{" "}
                //                 </div>
                //               )}
                //             </div>
                //           );
                //         })}
                //       </div>
                //     </Col>
                //   </Row>
                //   <p></p>

                //   <Row>
                //     <div>
                //       <Card className="card-header-border card-border">
                //         <CardBody className="card-header-border">
                //           <CardTitle
                //             tag="h6"
                //             style={{ padding: 5, color: "black" }}
                //             className={(classes.customLabel, classes.headerLabel)}
                //           >
                //             พื้นที่ติดต่อ
                //           </CardTitle>
                //         </CardBody>

                //         <MapContainer
                //           className="map-border"
                //           center={[13, 100]}
                //           zoom={6}
                //           scrollWheelZoom={true}
                //           zoomControl={false}
                //           style={{ width: "100%", height: "50vh" }}
                //         >
                //           <TileLayer
                //             attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                //             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                //           />
                //           <ZoomControl position="topright" />
                //           {markermap}
                //         </MapContainer>

                //         {/* </CardBody> */}
                //       </Card>
                //     </div>
                //   </Row>
                // </TabPanel>

                // ) : (
                //   <TabPanel value={value} index={6}>
                //   <Row>
                //     <Col xs={6}>
                //       <div>
                //         <Card className="card-header-border card-border">
                //           <CardBody className="card-header-border">
                //             <CardTitle
                //               tag="h6"
                //               style={{ padding: 5, color: "black" }}
                //               className={(classes.customLabel, classes.headerLabel)}
                //             >
                //               พื้นที่ติดต่อ
                //             </CardTitle>
                //           </CardBody>

                //           <MapContainer
                //             className="map-border"
                //             center={[13, 100]}
                //             zoom={6}
                //             scrollWheelZoom={true}
                //             zoomControl={false}
                //             style={{ width: "100%", height: "50vh" }}
                //           >
                //             <TileLayer
                //               attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                //               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                //             />
                //             <ZoomControl position="topright" />
                //             {markermap}
                //           </MapContainer>

                //           {/* </CardBody> */}
                //         </Card>
                //       </div>
                //     </Col>

                //     <Col md={6}>
                //       <Card className="card-header-border card-border">
                //         <CardBody className="card-header-border">
                //           <CardTitle
                //             tag="h6"
                //             style={{ padding: 5, color: "black" }}
                //             className={(classes.customLabel, classes.headerLabel)}
                //           >
                //             ข้อมูลติดต่อ
                //           </CardTitle>
                //         </CardBody>

                //         <div className="row no-gutters">
                //           <div className="col-md-4">
                //             {result.map((d) => {
                //               return (
                //                 <img
                //                   width="200"
                //                   height="auto"
                //                   aria-label="Placeholder: Image"
                //                   preserveAspectRatio="xMidYMid slice"
                //                   src={`https://researcher.kims-rmuti.com/file-upload/co_researcher-upload/${d.co_researcher_image}`}
                //                   style={{ padding: "10px" }}
                //                 />
                //               );
                //             })}
                //           </div>

                //           <div className="col-md-8">
                //             <div
                //               className="card-body"
                //               style={{ fontFamily: "Prompt" }}
                //             >
                //               {result.map((d) => {
                //                 return (
                //                   <div>
                //                     <p className="card-title" align="left">
                //                       <PersonIcon />
                //                       &nbsp;Name : {d.coordinator_name_th}{" "}
                //                       {d.coordinator_lastname_th}
                //                     </p>

                //                     <p
                //                       className="card-text"
                //                       align="left"
                //                       style={{ color: "green" }}
                //                     >
                //                       <CallIcon />
                //                       &nbsp; โทรศัพท์ :{d.co_researcher_phone}
                //                     </p>
                //                     <p
                //                       className="card-text"
                //                       align="left"
                //                       style={{ color: "red" }}
                //                     >
                //                       <EmailIcon />
                //                       &nbsp; Email : {d.co_researcher_mail}
                //                     </p>
                //                     <p
                //                       className="card-text"
                //                       align="left"
                //                       style={{ color: "blue" }}
                //                     >
                //                       <FacebookIcon />
                //                       &nbsp; Facebook :{" "}
                //                       {d.co_researcher_facebook ? (
                //                         <Button a href={d.co_researcher_facebook} style={{ fontSize: "smaller", color: "blue",
                //                         fontFamily: "Prompt",}} >
                //                         {d.co_researcher_name_th} </Button>

                //                       ) : (" ")}

                //                     </p>

                //                     <p
                //                       className="card-text"
                //                       align="left"
                //                       style={{ color: "blue" }}
                //                     >
                //                       <TwitterIcon />
                //                       &nbsp; Twitter : {d.co_researcher_twitter}
                //                     </p>
                //                     <p
                //                       className="card-text"
                //                       align="left"
                //                       style={{ color: "green" }}
                //                     >
                //                       <ChatBubbleIcon />
                //                       &nbsp; Line : {d.co_researcher_line}
                //                     </p>

                //                     <p
                //                       className="card-text"
                //                       align="left"
                //                       style={{ color: "black" }}
                //                     >
                //                       <InstagramIcon />
                //                       &nbsp; Instagram : {d.co_researcher_ig}
                //                     </p>
                //                     <p className="card-text" align="left">
                //                       <LanguageIcon />
                //                       &nbsp; Website :{" "}
                //                       <Button a href={d.co_researcher_website} style={{ fontSize:"small" , color: "blue",
                //                       fontFamily: "Prompt",}}>

                //                         {d.co_researcher_website}
                //                       </Button>
                //                     </p>
                //                   </div>
                //                 );
                //               })}
                //             </div>
                //           </div>
                //         </div>
                //       </Card>
                //     </Col>
                //   </Row>
                // </TabPanel>

                // )

                <TabPanel value={value} index={7} className="tab-body">
                  <Row>
                    <Col xs={6}>
                      <div>
                        <Card className="card-header-border card-border">
                          <Card>
                            <CardBody className="card-header-border">
                              <CardTitle
                                tag="h6"
                                style={{ padding: 5, color: "black" }}
                                className={
                                  (classes.customLabel, classes.headerLabel)
                                }
                              >
                                ตำแหน่งที่ตั้ง
                              </CardTitle>
                            </CardBody>

                            <MapContainer
                              className="map-border"
                              center={[13, 100]}
                              zoom={6}
                              scrollWheelZoom={true}
                              zoomControl={false}
                              style={{ width: "100%", height: "50vh" }}
                            >
                              <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                              />
                              <ZoomControl position="topright" />
                              {markermap}
                            </MapContainer>

                            {/* </CardBody> */}
                          </Card>
                        </Card>
                      </div>
                    </Col>

                    <Col md={6}>
                      <Card>
                        <Card className="card-header-border card-border">
                          <CardBody className="card-header-border">
                            <CardTitle
                              tag="h6"
                              style={{ padding: 5, color: "black" }}
                              className={
                                (classes.customLabel, classes.headerLabel)
                              }
                            >
                              ข้อมูลติดต่อ
                            </CardTitle>
                          </CardBody>

                          <div className="row no-gutters">
                            <div className="col-md-4">
                              {result.map((d) => {
                                return (
                                  <img
                                    width="200"
                                    height="auto"
                                    aria-label="Placeholder: Image"
                                    preserveAspectRatio="xMidYMid slice"
                                    src={`https://researcher.kims-rmuti.com/file-upload/co_researcher-upload/${d.co_researcher_image}`}
                                    style={{ padding: "10px" }}
                                  />
                                );
                              })}
                            </div>

                            <div className="col-md-8">
                              <div
                                className="card-body"
                                style={{ fontFamily: "Prompt" }}
                              >
                                {result.map((d) => {
                                  return (
                                    <div>
                                      <p className="card-title" align="left">
                                        <PersonIcon /> {""}
                                        {d.active_coordinator_name_th == 1
                                          ? "ชื่อ :" +
                                            " " +
                                            [d.coordinator_name_th]
                                          : " "}{" "}
                                        {d.active_coordinator_lastname_th == 1
                                          ? [d.coordinator_lastname_th]
                                          : " "}{" "}
                                      </p>

                                      <p
                                        className="card-text"
                                        align="left"
                                        style={{ color: "green" }}
                                      >
                                        <CallIcon />
                                        โทรศัพท์ :
                                        {d.active_co_researcher_phone == 1
                                          ? d.co_researcher_phone
                                          : " "}{" "}
                                      </p>
                                      <p
                                        className="card-text"
                                        align="left"
                                        style={{ color: "red" }}
                                      >
                                        <EmailIcon />
                                        Email :
                                        {d.active_co_researcher_mail == 1
                                          ? d.co_researcher_mail
                                          : " "}{" "}
                                      </p>
                                      <p
                                        className="card-text"
                                        align="left"
                                        style={{ color: "blue" }}
                                      >
                                        <FacebookIcon />
                                        &nbsp; Facebook :{" "}
                                        {d.co_researcher_facebook ? (
                                          <Button
                                            a
                                            href={d.co_researcher_facebook}
                                            style={{
                                              fontSize: "smaller",
                                              color: "blue",
                                              fontFamily: "Prompt",
                                            }}
                                          >
                                            {d.co_researcher_name_th}{" "}
                                          </Button>
                                        ) : (
                                          " "
                                        )}
                                      </p>

                                      <p
                                        className="card-text"
                                        align="left"
                                        style={{ color: "blue" }}
                                      >
                                        <TwitterIcon />
                                        &nbsp; Twitter :{" "}
                                        {d.co_researcher_twitter}
                                      </p>
                                      <p
                                        className="card-text"
                                        align="left"
                                        style={{ color: "green" }}
                                      >
                                        <ChatBubbleIcon />
                                        &nbsp; Line : {d.co_researcher_line}
                                      </p>

                                      <p
                                        className="card-text"
                                        align="left"
                                        style={{ color: "black" }}
                                      >
                                        <InstagramIcon />
                                        &nbsp; Instagram : {d.co_researcher_ig}
                                      </p>
                                      <p className="card-text" align="left">
                                        <LanguageIcon />
                                        &nbsp; Website :
                                        {d.co_researcher_website ? (
                                          <Button
                                            a
                                            href={d.co_researcher_website}
                                            style={{ fontSize: 16 }}
                                          >
                                            {d.co_researcher_website.slice(
                                              8,
                                              35
                                            )}
                                          </Button>
                                        ) : (
                                          " "
                                        )}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Card>
                    </Col>
                  </Row>
                </TabPanel>
              );
            })}
          </div>
        </ThemeProvider>
      </div>
    </body>
  );
}

export default withRouter(CoResearcher);
