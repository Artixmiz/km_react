/* eslint-disable no-new-wrappers */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/style-prop-object */
/* eslint-disable no-sequences */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import {
  FaArrowAltCircleRight,
  FaArrowAltCircleDown,
  FaIndustry,
  FaHandsHelping,
  FaSearch,
} from "react-icons/fa";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  Marker,
  LayerGroup,
  useMap,
  CircleMarker,
} from "react-leaflet";

import * as d3 from "d3";
import "./Css/d3.css";
import { FaRegUser } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { Route, BrowserRouter, Switch, Link } from "react-router-dom";
import { RiUser2Line } from "react-icons/ri";
import {
  Col,
  Container,
  Row,
  Table,
  CardTitle,
  CardSubtitle,
  Card,
  CardBody,
  CardText,
  CardImg,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Form,
  Input,
  // Button,
} from "reactstrap";

import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  // Container,
  IconButton,
  CircularProgress,
} from "@material-ui/core";

import L from "leaflet";
import "./Components/Css/Detail.scss";
import axios from "axios";
import "./Components/Css/mapView.scss";
import { GiMoneyStack, GiCalendar } from "react-icons/gi";
import "./index.css";

import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";
import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

import { BsGraphUp } from "react-icons/bs";
import { BiNetworkChart, BiInfoCircle } from "react-icons/bi";
import { GiGiftOfKnowledge, GiImpactPoint } from "react-icons/gi";
import { GrCluster } from "react-icons/gr";
import { orange } from "@material-ui/core/colors";

import parse from "html-react-parser";
import D3Layer from "./Components/D3Layer";
import { withRouter } from "react-router";

import BarChart from "./Components/Chart";

import ProjectNetwork from "./Components/ProjcetDetail/ProjectNetwork";
import KnowledgeDetail from "./Components/ProjcetDetail/KnowledgeDetail";
import NewknowledgeDetail from "./Components/ProjcetDetail/NewKnowledgeDetail";
import ImpactDetail from "./Components/ProjcetDetail/ImpactDetail";
import DetailProject from "./Components/ProjcetDetail/DetailProject";
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function ProjectDetail(props) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const [project, setproject] = useState([]);
  const [location, setlocation] = useState([]);
  const [table, settable] = useState(false);
  const [dataTable, setDatatable] = useState([]);
  const [knowledge, setknowledge] = useState([]);
  const [output, setoutput] = useState([]);
  const [outcome, setoutcome] = useState([]);
  const [outcomeKnowledge, setoutcomeKnowledge] = useState([]);
  const [impact, setimpact] = useState([
    {
      impact_id: 0,
      impact_name: "ทั้งหมด",
    },
    {
      impact_id: 1,
      impact_name: "เศรษฐกิจ",
    },
    {
      impact_id: 2,
      impact_name: "สังคม",
    },
    {
      impact_id: 3,
      impact_name: "วัฒนธรรม",
    },
    {
      impact_id: 4,
      impact_name: "สิ่งแวดล้อม",
    },
  ]);
  const [impactDetail, setimpactDetail] = useState([]);
  const [sdg, setsdg] = useState([]);
  const [bcg, setbcg] = useState([]);
  const [issue, setissue] = useState([]);
  const [factor, setfactor] = useState([]);
  const [curve, setcurve] = useState([]);
  const [cluster, setcluster] = useState([]);
  const [user, setuser] = useState([]);
  const [sourcefunding, setsourcefund] = useState([]);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleDropdownChange = (event) => {
    setSelected(event.target.value);
  };

  const [mserror, setmserror] = useState(null);
  const [mserrorkn, setmserrorkn] = useState(null);

  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [valuePage1, setValuePage1] = useState(0);

  const handleChangePage1 = (event, newValue) => {
    setValuePage1(newValue);
  };

  const [valuePage2, setValuePage2] = useState(0);

  const handleChangePage2 = (event, newValue) => {
    setValuePage2(newValue);
  };

  const getParamsId = () => {
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    const project_id = params.get("project_id");
    if (!project_id) {
      const project_id = params.get("concep_id");
      return project_id;
    }
    return project_id;
  };

  const idencrypt = getParamsId();

  const localUrl = "http://localhost:4000";
  const apiUrl = "https://kmapi.kims-rmuti.com";

  const mapData = async () => {
    const response = await axios.get(
      `${apiUrl}/api/get/us-project-map/${atob(idencrypt)}`
    );
    return response.data;
  };

  const dataM = mapData();

  const mapDataImpact = async () => {
    const response = await axios.get(
      `${apiUrl}/api/get/us-projects-map-impact/${atob(idencrypt)}`
    );
    return response.data;
  };

  const dataImpact = mapDataImpact();

  const userDetail = async (user_idcard) => {
    const response = await axios.get(
      `${apiUrl}/api/get/bb-user/${user_idcard}`
    );
    return response.data;
  };

  const sourcefund = async (id) => {
    const response = await axios.get(`${apiUrl}/api/get/source_funds/${id}`);
    return response.data;
  };

  let id = "";
  useEffect(() => {
    console.log(id);
    if (idencrypt == null || idencrypt == "") {
      props.history.push({
        pathname: "/SearchProject",
      });
    } else {
      id = atob(idencrypt);
    }

    axios
      .get(`${apiUrl}/api/get/us-project/${id}`)
      .then((result) => {
        // setproject(result.data);
        console.log(result.data);
        setlocation([
          {
            lat: result.data.project_latitude,
            lng: result.data.project_longitude,
          },
        ]);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setmserror(err.response.data.message);
      });

    axios
      .get(`${apiUrl}/api/get/us-project/knowledge/${id}`)
      .then((res) => {
        setknowledge(res.data[0].knowledge);
        setoutput(res.data[0].output);
        setoutcome(res.data[0].outcome);
        setoutcomeKnowledge(res.data[0].outcomeKnowledge);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setmserrorkn(err.response.data.message);
      });

    axios
      .get(`${apiUrl}/api/get/us-project/impact/${id}`)
      .then((res) => {
        // setimpact(res.data[0].impact);
        // setissue(res.data[0].issue);
        // setfactor(res.data[0].factor);
        setsdg(res.data[0].sdg);
        setbcg(res.data[0].bcg);
        setcurve(res.data[0].curve);
        setcluster(res.data[0].cluster);
        // setimpactDetail(res.data[0].impact_detail);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setmserror(err.response.data.message);
      });

    retrieveImpact();

    axios.get(`${apiUrl}/api/get/us-project/${id}`).then(async (result) => {
      console.log(result.data);
      const response = await axios.get(
        `${apiUrl}/api/get/bb-user/${result.data.user_idcard}`
      );
      setuser(response.data);

      setproject(result.data);
    });
  }, []);

  const [chartData, setChartData] = useState([]);
  const [messageErr, setMessageErr] = useState(null);
  const [impactName, setImpactName] = useState("");
  const [impactData, setImpactData] = useState([]);

  const getGraphaAll = () => {
    setLoading(true);
    axios
      .get(`${apiUrl}/api/get/us-projects-graph-all/${atob(idencrypt)}`)
      .then((res) => {
        setChartData([res.data.chartData]);
        setImpactData(res.data.impactData);
        setImpactName("ทั้งหมด");
      })
      .finally(() => {
        setLoading(false);
      });

    // return response.data;
  };

  const retrieveImpact = () => {
    if (selected == 0) {
      getGraphaAll();
    } else {
      setLoading(true);
      axios
        .get(
          `${apiUrl}/api/get/us-projects-graph?id=${atob(
            idencrypt
          )}&impact_id=${selected}`
        )
        .then((res) => {
          console.log(res.data);
          let detail = [];
          res.data.impactData.impact.map((im) => {
            im.issues.map((is) => {
              detail.push(is.impact_detail);
            });
          });
          setImpactName(
            selected == 1
              ? "เศรษฐกิจ"
              : selected == 2
              ? "สังคม"
              : selected == 3
              ? "วัฒนธรรม"
              : selected == 4
              ? "สิ่งแวดล้อม"
              : "not found"
          );
          // setimpact(res.data.impactName.impact);
          setChartData([res.data.chartData]);
          // setimpactDetail(detail);
          setImpactData([res.data.impactData]);
          // setissue(res.data.impactData.issues_id);
          // setfactor(res.data.impactData.impact);
        })
        .finally(() => {
          setMessageErr("");
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.response.data.message);
          setMessageErr(err.response.data.message);
        });
    }
  };

  const handleClick = (event, location) => {
    settable(true);
    const { lat, lng } = event.latlng;
    console.log(`Clicked at ${lat}, ${lng} `);
    console.log(location);
    setDatatable([location]);
  };

  const showIssues = (e, data) => {
    setissue(data);
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

  const sdgEl = sdg.map((ListItem) => {
    return (
      <Col md="3" xs="4" className={classes.underlineCol}>
        <img
          src={`https://www.km-innovations.rmuti.ac.th/researcher/icon/${ListItem.sdgs_image}`}
          alt="Card image cap"
          className={classes.round}
        />
        <CardTitle
          className={classes.customLabel}
          style={{
            fontFamily: "Prompt",
            paddingTop: 15,
            paddingBottom: 10,
          }}
        >
          {ListItem.sdgs_name}
          <br></br>
          <p>รายละเอียดความสอดคล้อง: {ListItem.sdgs_detail}</p>
        </CardTitle>
      </Col>
    );
  });

  const bcgEl = bcg.map((ListItem) => {
    return (
      <Col md="3" xs="4" className={classes.underlineCol}>
        <img
          src={`https://www.km-innovations.rmuti.ac.th/researcher/icon/${ListItem.bcg_image}`}
          alt="Card image cap"
          className={classes.round}
        />
        <CardTitle
          className={classes.customLabel}
          style={{
            fontFamily: "Prompt",
            paddingTop: 15,
            paddingBottom: 10,
          }}
        >
          {ListItem.bcg_name}
          <br></br>
          รายละเอียดความสอดคล้อง: {ListItem.bcg_detail}
        </CardTitle>
      </Col>
    );
  });

  const curveEl = curve.map((ListItem) => {
    return (
      <Col md="3" xs="4" className={classes.underlineCol}>
        <img
          src={`https://www.km-innovations.rmuti.ac.th/researcher/icon/${ListItem.curve_image}`}
          alt="Card image cap"
          className={classes.round}
        />
        <CardTitle
          className={classes.customLabel}
          style={{
            fontFamily: "Prompt",
            paddingTop: 15,
            paddingBottom: 10,
          }}
        >
          {ListItem.curve_name}
          <br></br>
          รายละเอียดความสอดคล้อง:{ListItem.curve_detail}
        </CardTitle>
      </Col>
    );
  });

  const clusterEl = cluster.map((ListItem) => {
    return (
      <Col md="3" xs="4" className={classes.underlineCol}>
        <img
          src={`https://www.km-innovations.rmuti.ac.th/researcher/icon/${ListItem.cluster_image}`}
          alt="Card image cap"
          className={classes.round}
        />
        <CardTitle
          className={classes.customLabel}
          style={{
            fontFamily: "Prompt",
            paddingTop: 15,
            paddingBottom: 10,
          }}
        >
          {ListItem.cluster_name}
          <br></br>
          รายละเอียดความสอดคล้อง: {ListItem.cluster_detail}
        </CardTitle>
      </Col>
    );
  });

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

  // const impactEl = () => {
  //   return (

  //   );
  // };

  function getId(url) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  }

  const YoutubeEmbed = ({ embedId }) => {
    console.log(embedId);
    const vdo_id = getId(embedId);
    console.log(vdo_id);
    return (
      <div className="video-responsive">
        <iframe
          width="853"
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

  const knowledgeEl = knowledge.map((ListItem) => {
    return (
      <Row>
        <Col>
          <CardBody className="map-border">
            <CardTitle
              tag="h6"
              style={{ padding: 5, color: "black" }}
              className={(classes.customLabel, classes.headerLabel)}
            >
              {t("concept_proposal_page.knowledge.detail.menu1")}
            </CardTitle>
            {/* <CardSubtitle
              tag="p"
              className="text-muted"
              style={{ fontSize: 18 }}
            >
              knowledge
            </CardSubtitle> */}
            <img
              width="250px"
              height="250px"
              src={`https://www.km-innovations.rmuti.ac.th/researcher/file-upload/knowledge-upload/${ListItem.knowledge_image}`}
              alt="Card image cap"
              className="img-shadow"
              style={{ borderRadius: 4 }}
            />
            <p></p>
            <CardBody
              style={{
                backgroundColor: "rgba(223, 223, 223, 0.37)",
                borderTop: " 6px solid rgb(255, 123, 0)",
                borderBottom: " 4px solid rgb(255, 123, 0)",
                // height: "110px",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <CardText style={{ fontFamily: "Prompt" }}>
                <strong>{ListItem.knowledge_name}</strong>
                {/* <p>no data available</p> */}
              </CardText>
            </CardBody>
          </CardBody>
        </Col>

        <Col>
          <CardBody className="map-border">
            <CardTitle
              tag="h6"
              style={{ padding: 5, color: "black" }}
              className={(classes.customLabel, classes.headerLabel)}
            >
              {t("concept_proposal_page.knowledge.detail.menu2")}
            </CardTitle>
            {/* <CardSubtitle
              tag="p"
              className="text-muted"
              style={{ fontSize: 18 }}
            >
              output
            </CardSubtitle> */}
            <img
              width="250px"
              height="250px"
              src={`https://www.km-innovations.rmuti.ac.th/researcher/file-upload/output-upload/${ListItem.output_image}`}
              alt="Card image cap"
              className="img-shadow"
              style={{ borderRadius: 4 }}
            />
            <p></p>
            <CardBody
              style={{
                backgroundColor: "rgba(223, 223, 223, 0.37)",
                borderTop: " 6px solid rgb(255, 123, 0)",
                borderBottom: " 4px solid rgb(255, 123, 0)",
                // height: "110px",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <CardText style={{ fontFamily: "Prompt" }}>
                {ListItem.output_name
                  ? parse(ListItem.output_name)
                  : t("notfound")}
              </CardText>
            </CardBody>
          </CardBody>
        </Col>
        <Col>
          <CardBody className="map-border">
            <CardTitle
              tag="h6"
              style={{ padding: 5, color: "black" }}
              className={(classes.customLabel, classes.headerLabel)}
            >
              {t("concept_proposal_page.knowledge.detail.menu3")}
            </CardTitle>
            {/* <CardSubtitle
              tag="p"
              className="text-muted"
              style={{ fontSize: 18 }}
            >
              outcome
            </CardSubtitle> */}
            <img
              width="250px"
              height="250px"
              src={`https://www.km-innovations.rmuti.ac.th/researcher/file-upload/outcome-upload/${ListItem.outcome_image}`}
              alt="Card image cap"
              className="img-shadow"
              style={{ borderRadius: 4 }}
            />
            <p></p>
            <CardBody
              style={{
                backgroundColor: "rgba(223, 223, 223, 0.37)",
                borderTop: " 6px solid rgb(255, 123, 0)",
                borderBottom: " 4px solid rgb(255, 123, 0)",
                // height: "110px",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <CardText style={{ fontFamily: "Prompt" }}>
                {ListItem.outcome_detail
                  ? parse(ListItem.outcome_detail)
                  : t("notfound")}
              </CardText>
            </CardBody>
          </CardBody>
        </Col>
      </Row>
    );
  });

  // const outputEl = output.map((ListItem) => {
  //   return (
  //     <CardBody className="map-border">
  //       <img
  //         width="100%"
  //         src={`https://www.km-innovations.rmuti.ac.th/researcher/file-upload/output-upload/${ListItem.output_image}`}
  //         alt="Card image cap"
  //         className="img-shadow"
  //         style={{ borderRadius: 4 }}
  //       />

  //       <CardBody
  //         style={{
  //           backgroundColor: "rgba(223, 223, 223, 0.37)",
  //           borderTop: " 6px solid rgb(255, 123, 0)",
  //           borderBottom: " 4px solid rgb(255, 123, 0)",
  //           // height: "110px",
  //           justifyContent: "center",
  //           display: "flex",
  //         }}
  //       >
  //         <CardText style={{ fontFamily: "Prompt" }}>
  //           {ListItem.output_name}
  //         </CardText>
  //       </CardBody>
  //     </CardBody>
  //   );
  // });

  // const outcomeEl = outcome.map((ListItem, i) => {
  //   return (
  //     <CardBody className="map-border">
  //       <CardText
  //         style={{
  //           fontFamily: "Prompt",
  //         }}
  //       >
  //         {parse(ListItem.outcome_detail)}
  //       </CardText>
  //     </CardBody>
  //   );
  // });

  return (
    <body>
      <div className="body-detail">
        <Container
          className="themed-container card-header-border img-bg"
          fluid={true}
        >
          <Row
            className="align-items-center justify-content-md-center"
            style={{
              fontFamily: "Prompt",
            }}
          >
            {/* <Col xs="12" md="auto">
          <img
            src={`https://www.km-innovations.rmuti.ac.th/researcher/file-upload/co_researcher-upload/community.jpg`}
            width={350}
            className="img-shadow"
            style={{ borderRadius: 4 }}
          />
        </Col> */}

            <Col xs="12" md="9">
              <Card style={{ marginTop: 5 }} className="img-shadow">
                <CardBody className="card-header">
                  <CardTitle tag="h6" style={{ padding: 5, color: "white" }}>
                    {project.project_name_th}
                  </CardTitle>
                  {/* <hr /> */}
                </CardBody>

                <CardBody>
                  <CardText style={{ textAlign: "left" }}>
                    {user.map((listValue, index) => {
                      return (
                        <CardText>
                          <FaRegUser size={35} /> ชื่อนักวิจัย:{" "}
                          <Button
                            a
                            href={`/monitoring/Researcher?user_idcard=${btoa(
                              listValue.user_idcard
                            )}`}
                            style={{ fontFamily: "Prompt" }}
                          >
                            {listValue.prefix_id
                              ? prefix[listValue.prefix_id]
                              : " "}{" "}
                            {listValue.user_first_name_th}{" "}
                            {listValue.user_last_name_th}
                          </Button>
                        </CardText>
                      );
                    })}

                    <p>
                      <GiMoneyStack size={35} /> งบประมาณ:{" "}
                      {project.project_budget
                        ? new Number(project.project_budget).toLocaleString(
                            "en"
                          )
                        : ""}
                      บาท
                    </p>

                    <p>
                      <GiMoneyStack size={35} /> แหล่งเงินทุน:{" "}
                      {project.project_funding}
                    </p>
                    <p>
                      <GiCalendar size={35} /> ปีที่รับ: พ.ศ.{" "}
                      {project.project_star}
                    </p>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        <BrowserRouter basename={"/monitoring"}>
          <ThemeProvider theme={customTheme}>
            <div className={classes.root}>
              <Route
                path={"/"}
                render={(history) => (
                  <AppBar
                    position="static"
                    color="default"
                    className={classes.appbar}
                  >
                    <Tabs
                      variant="scrollable"
                      scrollButtons="on"
                      TabIndicatorProps={{
                        style: { background: "rgb(252, 113, 0)" },
                      }}
                      textColor="secondary"
                      value={
                        history.location.pathname !== "/"
                          ? history.location.pathname
                          : false
                      }
                    >
                      {console.log(history.location.pathname)}
                      <Tab
                        value={`/ProjectDetail/projectNetwork`}
                        label="เครือข่ายงานวิจัย"
                        className={classes.customLabel}
                        icon={<BiNetworkChart size={25} />}
                        component={Link}
                        to={`/ProjectDetail/projectNetwork?project_id=${idencrypt}`}
                      />
                      <Tab
                        value={`/ProjectDetail/projectDetail`}
                        label="ข้อมูลงานวิจัย"
                        className={classes.customLabel}
                        icon={<BiInfoCircle size={25} />}
                        component={Link}
                        to={`/ProjectDetail/projectDetail?project_id=${idencrypt}`}
                      />
                      <Tab
                        value={`/ProjectDetail/knowledgeDetail`}
                        label="องค์ความรู้"
                        className={classes.customLabel}
                        icon={<GiGiftOfKnowledge size={25} />}
                        component={Link}
                        to={`/ProjectDetail/knowledgeDetail?project_id=${idencrypt}`}
                      />
                      <Tab
                        value={`/ProjectDetail/NewknowledgeDetail`}
                        label="องค์ความรู้ใหม่"
                        className={classes.customLabel}
                        icon={<GiGiftOfKnowledge size={25} />}
                        component={Link}
                        to={`/ProjectDetail/NewknowledgeDetail?project_id=${idencrypt}`}
                      />
                      <Tab
                        value={`/ProjectDetail/ImpactDetail`}
                        label="ผลกระทบ"
                        className={classes.customLabel}
                        icon={<GiImpactPoint size={25} />}
                        component={Link}
                        to={`/ProjectDetail/ImpactDetail?project_id=${idencrypt}`}
                      />
                    </Tabs>
                  </AppBar>
                )}
              />

              <Container style={{ paddingTop: "25px", paddingBottom: "25px" }}>
                <Switch>
                  <Route path={`/ProjectDetail/projectNetwork`}>
                    <ProjectNetwork
                      location={location}
                      dataM={dataM}
                      classes={classes}
                      project={project}
                    />
                  </Route>
                  <Route path={`/ProjectDetail/projectDetail`}>
                    <DetailProject classes={classes} project={project} />
                  </Route>

                  <Route path="/ProjectDetail/knowledgeDetail">
                    <KnowledgeDetail
                      mserrorkn={mserrorkn}
                      classes={classes}
                      knowledgeEl={knowledgeEl}
                      // outputEl={outputEl}
                      // outcomeEl={outcomeEl}
                    />
                  </Route>
                  <Route path="/ProjectDetail/NewknowledgeDetail">
                    <NewknowledgeDetail
                      outcomeKnowledge={outcomeKnowledge}
                      classes={classes}
                      YoutubeEmbed={YoutubeEmbed}
                    />
                  </Route>
                  <Route path="/ProjectDetail/ImpactDetail">
                    <ImpactDetail
                      location={location}
                      classes={classes}
                      selected={selected}
                      dataImpact={dataImpact}
                      handleDropdownChange={handleDropdownChange}
                      impact={impact}
                      retrieveImpact={retrieveImpact}
                      loading={loading}
                      impactData={impactData}
                      messageErr={messageErr}
                      issue={issue}
                      chartData={chartData}
                      impactName={impactName}
                      valuePage2={valuePage2}
                      handleChangePage2={handleChangePage2}
                      clusterEl={clusterEl}
                      sdgEl={sdgEl}
                      bcgEl={bcgEl}
                      curveEl={curveEl}
                      project={project}
                      mserror={mserror}
                    />
                  </Route>
                </Switch>
              </Container>
            </div>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </body>
  );
}

export default withRouter(ProjectDetail);
