/* eslint-disable no-new-wrappers */
/* eslint-disable no-sequences */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { Suspense } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  useTheme,
  ThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  MapContainer,
  TileLayer,
  ZoomControl,
  Marker,
  CircleMarker,
  Popup,
} from "react-leaflet";
import markerIconPng from "../images/icon.png";
import { Icon } from "leaflet";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import GetAppIcon from "@material-ui/icons/GetApp";
import AwesomeSlider from "react-awesome-slider";
import AutoplaySlider from "react-awesome-slider/dist/autoplay";
import AwesomeSliderStyles from "react-awesome-slider/src/styled/fold-out-animation";
import "react-awesome-slider/dist/styles.css";
import Grid from "@material-ui/core/Grid";
import { FaInfo, FaCheck, FaCompressArrowsAlt } from "react-icons/fa";

import SwipeableViews from "react-swipeable-views";
import red from "@material-ui/core/colors/red";
import {
  Col,
  // Container,
  Row,
  Table,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardText,
  CardImg,
} from "reactstrap";
import "../index.css";
import { GiMoneyStack, GiCalendar } from "react-icons/gi";
import { BsGraphUp } from "react-icons/bs";
import {
  BiMapPin,
  BiBookOpen,
  BiMedal,
  BiNews,
  BiGroup,
  BiCertification,
  BiInfoCircle,
  BiWorld,
} from "react-icons/bi";
import { FaRegIdCard, FaCertificate } from "react-icons/fa";
import { GrCertificate, GrSolaris } from "react-icons/gr";
import { HiOutlineLightBulb, HiOutlineAcademicCap } from "react-icons/hi";

import { orange } from "@material-ui/core/colors";
import { Card, IconButton, Container } from "@material-ui/core";

import { withRouter } from "react-router-dom";

import noImg from "../images/no-image.png";

import Map from "./D3Layer";
import parse from "html-react-parser";

import { useTranslation } from "react-i18next";

import Accordion from "react-bootstrap/Accordion";

import "./Css/researcher.scss";

import { Route, BrowserRouter, Switch, Link } from "react-router-dom";

import ResearcherLocationDetail from "../Components/ResearcherPage/ResearcherLocationDetail";
import ResearcherExpertise from "../Components/ResearcherPage/ResearcherExpertise";
import ResearcherProperty from "../Components/ResearcherPage/ResearcherProperty";
import ResearcherPublication from "../Components/ResearcherPage/ResearcherPublication";
import ResearcherInnovation from "../Components/ResearcherPage/ResearcherInnovation";
import ResearcherGroup from "../Components/ResearcherPage/ResearcherGroup";
import ResearcherDetail from "../Components/ResearcherPage/ResearcherDetail";
import ResearcherCourse from "../Components/ResearcherPage/ResearcherCourse";

// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";

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
      aria-controls={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography style={{ fontFamily: "Prompt" }}>{children}</Typography>
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
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
    whitespace: "pre-wrap",
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

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.paper,
//     width: "100%",
//     paddingTop: 20,
//     // margin: "2px 2px 2px 15%",
//     fontFamily: "Prompt",
//   },
// }));

const useTimeline = makeStyles((theme) => ({
  paper: {
    padding: "3px ",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

function getId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}

const YoutubeEmbed = ({ embedId }) => {
  // console.log(embedId);
  const vdo_id = getId(embedId);
  // console.log(vdo_id);
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

function RCbutton(props) {
  const { t } = useTranslation();

  const [scholar, setscholar] = useState([]);
  const [user, setuser] = useState([]);
  const [uslink, setuslink] = useState([]);
 
  const [course, setcourse] = useState([]);
  const [university, setuniversity] = useState([]);
  const [organization, setorganization] = useState([]);
  const [organization1, setorganization1] = useState([]);

  //console.log("usersuseruseruseruseruser", user);

  // const { locationRe } = props;
  const primary = red[500]; // #f44336

  const classTimeline = useTimeline();

  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [valuePage1, setValuePage1] = useState(0);

  const handleChangePage1 = (event, newValue) => {
    setValuePage1(newValue);
  };

  var myParam = document.location.search.split("page")[1];

  var param = 0;
  if (myParam) {
    param = parseInt(myParam);
    console.log("testParam : ", param);
  }

  const [value, setValue] = React.useState(param);
  // const markermap = locationRe.map((location, i) => {
  //   const { project_name_th, project_latitude, project_longitude } = location;
  //   let title = project_name_th;

  //   if (project_latitude && project_longitude) {
  //     return (
  //       <Marker
  //         key={`${i}`}
  //         position={[project_latitude, project_longitude]}
  //         icon={
  //           new Icon({
  //             iconUrl: markerIconPng,
  //             iconSize: [40, 41],
  //             iconAnchor: [19, 0],
  //           })
  //         }
  //       >
  //         <Popup>{title}</Popup>
  //       </Marker>
  //     );
  //   }
  // });

  const getParamsId = () => {
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    return params.get("user_idcard");
  };
  const idencrypt = getParamsId();

  let id = "";

  const localUrl = "http://localhost:4000";
  const apiUrl = "https://kmapi.kims-rmuti.com";

  const courseDetail = async (fname, lname) => {
    const response = await axios.get(
      `${apiUrl}/api/get/course_detail?firstname=${fname}&lastname=${lname}`
    );
    return response.data;
  };

  const scholarlink = async (id) => {
    const response = await axios.get(`${apiUrl}/api/get/gg_scholar_pf/${id}`);
    return response.data;
  };

  const uslinklink = async (id) => {
    const response = await axios.get(`${apiUrl}/api/get/us-link/${id}`);
    return response.data;
  };
  // useEffect(() => {
  //   if (user.group_id === null) {
  //     console.log(user.group_id === 1);
  //   } else {
  //     console.log(user.group_id === 3);
  //   }
  // });

  const universityDetail = async (id) => {
    const response = await axios.get(
      `${apiUrl}/api/get/bb-user/university/${id}`
    );
    return response.data;
  };

  const organizationDetail = async (id) => {
    const response = await axios.get(
      `${apiUrl}/api/get/bb-user/organization/${id}`
    );
    return response.data;
  };
  useEffect(async () => {
    if (idencrypt == null || idencrypt == "") {
      props.history.push({
        pathname: "/SearchResearcher",
      });
    } else {
      id = atob(idencrypt);
    }

    

    // axios
    //   .get(`${apiUrl}/api/get/us-project/type?id_user=${id}&id_project_type=2`)
    //   .then((result) => {
    //     console.log(result.data);
    //     setprojecttype2(result.data);
    //   });
    axios.get(`${apiUrl}/api/get/bb-user/${id}`).then(async (result) => {
      // console.log("test", result.data[0]);
      const data = result.data[0];

      if (data.user_section != "") {
        if (!isNaN(data.user_section) === true) {
          const section = await universityDetail(data.user_section);
          // console.log(section);
          setuniversity(section[0].name);
        } else {
          setuniversity(data.user_section);
        }
      } else {
        setuniversity(data.user_section);
      }

      // console.log(!isNaN(data.user_major));
      if (data.user_major != "") {
        if (!isNaN(data.user_major) === true) {
          const major = await organizationDetail(data.user_major);
          console.log(major);
          setorganization(major[0].organization_name_th);
        } else {
          setorganization(data.user_major);
        }
      } else {
        setorganization(data.user_major);
      }

      if (data.user_organization != "") {
        if (!isNaN(data.user_organization) === true) {
          const organization = await organizationDetail(data.user_organization);
          // console.log("asdss", organization);
          setorganization1(organization[0].organization_name_th);
        } else {
          setorganization1(data.user_organization);
        }
      } else {
        setorganization1(data.user_organization);
      }

      setuser(result.data);

      const response = await courseDetail(
        data.user_first_name_th,
        data.user_last_name_th
      );

      setcourse(response);

      const scholar = await scholarlink(data.user_idcard);
      setscholar(scholar);

      const uslink = await uslinklink(data.user_idcard);
      setuslink(uslink);
      // console.log("asdss", scholar);
    });
  
  }, []);

  const classes = useStyles();
  // educational.sort((a, b) =>
  //   a.educational_graduation > b.educational_graduation ? 1 : -1
  // );
  // working.sort((a, b) =>
  //   a.working_experience_star > b.working_experience_star ? 1 : -1
  // );
  // projecttype1.sort((a, b) => (a.project_star < b.project_star ? 1 : -1));

  // PubliTHA1.sort((a, b) => (a.publication_date < b.publication_date ? 1 : -1));
  // PubliTHA2.sort((a, b) => (a.publication_date < b.publication_date ? 1 : -1));
  // PubliTHA3.sort((a, b) => (a.publication_date < b.publication_date ? 1 : -1));
  // PubliTHA4.sort((a, b) => (a.publication_date < b.publication_date ? 1 : -1));

  // PubliINTER1.sort((a, b) =>
  //   a.publication_date < b.publication_date ? 1 : -1
  // );
  // PubliINTER2.sort((a, b) =>
  //   a.publication_date < b.publication_date ? 1 : -1
  // );
  // PubliINTER3.sort((a, b) =>
  //   a.publication_date < b.publication_date ? 1 : -1
  // );
  // PubliINTER4.sort((a, b) =>
  //   a.publication_date < b.publication_date ? 1 : -1
  // );

  // CoPubliTHA1.sort((a, b) =>
  //   a.co_researcher_publication_date < b.co_researcher_publication_date ? 1 : -1
  // );
  // CoPubliTHA2.sort((a, b) =>
  //   a.co_researcher_publication_date < b.co_researcher_publication_date ? 1 : -1
  // );
  // CoPubliTHA3.sort((a, b) =>
  //   a.co_researcher_publication_date < b.co_researcher_publication_date ? 1 : -1
  // );
  // CoPubliTHA4.sort((a, b) =>
  //   a.co_researcher_publication_date < b.co_researcher_publication_date ? 1 : -1
  // );

  // CoPubliINTER1.sort((a, b) =>
  //   a.co_researcher_publication_date < b.co_researcher_publication_date ? 1 : -1
  // );
  // CoPubliINTER2.sort((a, b) =>
  //   a.co_researcher_publication_date < b.co_researcher_publication_date ? 1 : -1
  // );
  // CoPubliINTER3.sort((a, b) =>
  //   a.co_researcher_publication_date < b.co_researcher_publication_date ? 1 : -1
  // );
  // CoPubliINTER4.sort((a, b) =>
  //   a.co_researcher_publication_date < b.co_researcher_publication_date ? 1 : -1
  // );

  const prefix = {
    1: "นาย",
    2: "นางสาว",
    3: "นาง",
    4: "ดร.",
    5: "ผศ.",
    6: "รศ.",
    7: "ศ.",
    8: "ผศ.ดร.",
    9: "รศ.ดร.",
    10: "ศ.ดร.",
  };

  const publication_type = {
    1: "ผลงานตีพิมพ์อื่นๆ",
    2: "บทความวิชาการ",
    3: "บทความวิจัย",
    4: "วารสาร",
  };

  const region = new Intl.DisplayNames(["en"], { type: "region" });

  // const smallItemStyles: React.CSSProperties = {
  //       cursor: 'pointer',
  //       objectFit: 'cover',
  //       width: '100%',
  //       maxHeight: '100%',
  //     }
  // const TableContainer = React.lazy(() =>
  //   import("@material-ui/core/TableContainer")
  // );

  // const Grid = React.lazy(() => import("@material-ui/core/Grid"));
  // const Paper = React.lazy(() => import("@material-ui/core/Paper"));

  return (
    <div className="body-detail" style={{ padding: "2rem" }}>
      <div
        style={{
          backgroundColor: "#fff",
          width: "100%",
          marginTop: "7rem",
          borderRadius: "15px 15px 15px 15px",
        }}
      >
        <Row>
          <Col sm={4} style={{ textAlign: "right" }}>
            <img
              className="profile-image"
              src="https://researcher.kims-rmuti.com/file-upload/images-profile-upload/a58c03e74fa3338d073aa07fa8aa92d1.jpg"
            />
          </Col>
          {user.map((listValue) => {
            return (
              <Col sm={8}>
                <section className="profile-info" style={{ marginTop: "20px" }}>
                  <h4>
                    <strong>
                      {" "}
                      {listValue.prefix_id
                        ? prefix[listValue.prefix_id]
                        : ""}{" "}
                      {listValue.user_first_name_th}{" "}
                      {listValue.user_last_name_th}
                    </strong>
                  </h4>
                  {/* <h1 className="first-name">Angela</h1>
                  <h1 className="second-name">Yun He</h1> */}
                  <p>
                    {t("researcher.carddetail.text1")}:{" "}
                    {listValue.user_academic}
                  </p>
                  <p>
                    {t("researcher.carddetail.text2")}:{" "}
                    {
                      university
                      // != university.map((v) => v.organization_code)
                      //         ?   university.map((v) => v.name)
                      //         : " "
                    }
                  </p>
                  <p>
                    {t("researcher.carddetail.text3")}:{" "}
                    {
                      organization
                      // != university.map((v) => v.organization_code)
                      //   ?  organization.map((v) => v.organization_name_th)
                      //   :  " "
                    }
                  </p>
                  <p>
                    {t("researcher.carddetail.text4")}:{" "}
                    {
                      organization1
                      // != university.map((v) => v.organization_code)
                      //   ? organization1.map((v) => v.organization_name_th)
                      //   :   "   "
                    }
                  </p>
                  {listValue.active_phone == 1 ? (
                    <p>เบอร์โทรศัพท์: {listValue.user_phone}</p>
                  ) : (
                    " "
                  )}{" "}
                  {listValue.active_mobile == 1 ? (
                    <p>เบอร์โทรศัพท์: {listValue.user_mobile}</p>
                  ) : (
                    " "
                  )}{" "}
                  {listValue.active_mail == 1 ? (
                    <p>Email: {listValue.user_mail}</p>
                  ) : (
                    " "
                  )}{" "}
                  {listValue.user_idcard == scholar.map((v) => v.CID) ? (
                    <p>
                      {" "}
                      GoogleScholar:
                      <Button>
                        <a
                          target="_blank"
                          href={scholar.map((v) => v.GG_URL)}
                          rel="noreferrer"
                        >
                          https://scholar.google.com/
                          {/* {scholar.map((v) => v.GG_URL).slice(-15)}{" "} */}
                        </a>
                      </Button>
                    </p>
                  ) : (
                    "  "
                  )}
                </section>
              </Col>
            );
          })}
          <Col sm={12}>
            <div className="line-bottom" style={{ margin: "1rem 3rem" }} />
          </Col>
        </Row>

        <BrowserRouter basename={"/monitoring"}>
          <Row style={{ width: "100%" }}>
            <Col sm={12}>
              <section className="statistics">
                <Route
                  path={"/"}
                  render={(history) => (
                    <AppBar
                      position="center"
                      color="default"
                      className={classes.appbar}
                    >
                      <Tabs
                        // value={value}
                        // onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="on"
                        TabIndicatorProps={{
                          style: { background: "rgb(252, 113, 0)" },
                        }}
                        aria-label="scrollable tabs menu"
                        value={
                          history.location.pathname !== "/"
                            ? history.location.pathname
                            : false
                        }
                      >
                        <Tab
                          value={`/Researcher/locations`}
                          label={t("researcher.tabmenu.menu1")}
                          className={classes.customLabel}
                          icon={<BiMapPin size={25} />}
                          component={Link}
                          to={`/Researcher/locations?user_idcard=${idencrypt}`}
                          // {...a11yProps(0)}
                        />

                        <Tab
                          value={`/Researcher/expertise`}
                          label={t("researcher.tabmenu.menu2")}
                          className={classes.customLabel}
                          icon={<BiMedal size={25} />}
                          component={Link}
                          to={`/Researcher/expertise?user_idcard=${idencrypt}`}
                          // {...a11yProps(1)}
                        />
                        <Tab
                          value={`/Researcher/intellectual-property`}
                          label={t("researcher.tabmenu.menu3")}
                          className={classes.customLabel}
                          component={Link}
                          icon={<BiCertification size={25} />}
                          to={`/Researcher/intellectual-property?user_idcard=${idencrypt}`}
                          // {...a11yProps(2)}
                        />

                        <Tab
                          value={`/Researcher/publication`}
                          label={t("researcher.tabmenu.menu4")}
                          className={classes.customLabel}
                          icon={<BiNews size={25} />}
                          component={Link}
                          to={`/Researcher/publication?user_idcard=${idencrypt}`}
                          // {...a11yProps(3)}
                        />

                        <Tab
                          value={`/Researcher/innovation`}
                          label={t("researcher.tabmenu.menu5")}
                          className={classes.customLabel}
                          component={Link}
                          icon={<HiOutlineLightBulb size={25} />}
                          // {...a11yProps(4)}
                          to={`/Researcher/innovation?user_idcard=${idencrypt}`}
                        />

                        <Tab
                          value={`/Researcher/group`}
                          label={t("researcher.tabmenu.menu6")}
                          className={classes.customLabel}
                          icon={<BiGroup size={25} />}
                          component={Link}
                          to={`/Researcher/group?user_idcard=${idencrypt}`}
                          // {...a11yProps(5)}
                        />

                        <Tab
                          value={`/Researcher/detail`}
                          label={t("researcher.tabmenu.menu7")}
                          className={classes.customLabel}
                          icon={<FaRegIdCard size={25} />}
                          component={Link}
                          to={`/Researcher/detail?user_idcard=${idencrypt}`}
                          // {...a11yProps(6)}
                        />

                        {user && user.length > 0 && user[0].group_id === 1 && (
                          <Tab
                            value={`/Researcher/course`}
                            label={t("researcher.tabmenu.menu8")}
                            className={classes.customLabel}
                            icon={<HiOutlineAcademicCap size={25} />}
                            component={Link}
                            to={`/Researcher/course?user_idcard=${idencrypt}`}
                            // {...a11yProps(7)}
                          />
                        )}
                      </Tabs>
                    </AppBar>
                  )}
                />
              </section>
            </Col>
          </Row>
          <div
            className="p-4"
            style={{
              backgroundColor: "rgb(246, 168, 52)",
              width: "100%",
              marginTop: "0rem",
              borderRadius: "0 0 15px 15px",
            }}
          >
            <Switch>
              <Route path="/Researcher/locations">
                <ResearcherLocationDetail
                  concept_proposal_id={idencrypt}
                  classes={classes}
                  user={user}
                />
              </Route>

              <Route path="/Researcher/expertise">
                <ResearcherExpertise
                  concept_proposal_id={idencrypt}
                  classes={classes}
                  valuePage1={valuePage1}
                  handleChangePage1={handleChangePage1}
                />
              </Route>

              <Route path="/Researcher/intellectual-property">
                <ResearcherProperty
                  concept_proposal_id={idencrypt}
                  classes={classes}
                  valuePage1={valuePage1}
                  handleChangePage1={handleChangePage1}
                  classTimeline={classTimeline}
                />
              </Route>

              <Route path="/Researcher/publication">
                <ResearcherPublication
                  concept_proposal_id={idencrypt}
                  classes={classes}
                  valuePage1={valuePage1}
                  handleChangePage1={handleChangePage1}
                  Accordion={Accordion}
                  classTimeline={classTimeline}
                  publication_type={publication_type}
                />
              </Route>

              <Route path="/Researcher/innovation">
                <ResearcherInnovation
                  concept_proposal_id={idencrypt}
                  classes={classes}
                  valuePage1={valuePage1}
                  handleChangePage1={handleChangePage1}
                />
              </Route>

              <Route path="/Researcher/group">
                <ResearcherGroup
                  concept_proposal_id={idencrypt}
                  classes={classes}
                />
              </Route>

              <Route path="/Researcher/detail">
                <ResearcherDetail
                  concept_proposal_id={idencrypt}
                  classes={classes}
                  Accordion={Accordion}
                  classTimeline={classTimeline}
                />
              </Route>

              <Route path="/Researcher/course">
                <ResearcherCourse
                  concept_proposal_id={idencrypt}
                  classes={classes}
                  course={course}
                />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    
    </div>
  );
}

export default withRouter(RCbutton);
