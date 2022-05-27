/* eslint-disable array-callback-return */
/* eslint-disable no-sequences */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import { Marker } from "react-leaflet";
import React, { useEffect, useState } from "react";

import { Container } from "@material-ui/core";
import {
  Col,
  // Container,
  Row,
  CardTitle,
  CardBody,
  CardText,
  CardImg,
} from "reactstrap";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "./Css/Detail.scss";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import "./Css/mapView.scss";
import { Icon } from "leaflet";
import { Card } from "react-bootstrap";

import { HiOutlineLightBulb, HiOutlineAcademicCap } from "react-icons/hi";

import { GiGiftOfKnowledge, GiImpactPoint } from "react-icons/gi";
import {
  AiOutlineUser,
  AiOutlineReconciliation,
  AiOutlineCoffee,
  AiOutlineApartment,
} from "react-icons/ai";

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
import { FaHandsHelping } from "react-icons/fa";

import noImg from "../images/no-image.png";

import { useTranslation } from "react-i18next";

import { Route, BrowserRouter, Switch, Link } from "react-router-dom";

import ExpertisePage from "./CoresearcherPage/ExpertistPage";
import KnowledgePage from "./CoresearcherPage/KnowledgePage";
import ProductPage from "./CoresearcherPage/ProductPage";
import InnovationPage from "./CoresearcherPage/InnovationPage";
import ProjectPage from "./CoresearcherPage/ProjectPage";
import PropertyPage from "./CoresearcherPage/PropertyPage";
import CreativePage from "./CoresearcherPage/CreativePage";
import ContactPage from "./CoresearcherPage/ContactPage";

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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function CoResearcher(props) {
  const { t } = useTranslation();

  const [result, setresult] = useState([]);
  const [location, setlocation] = useState([]);
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
        console.log(err.response.data.message);
        // setmserror(err.response.data.message);
      });
  }, []);

  return (
    <body>
      <div className="body-detail">
        <Container className="pt-4 bg" maxWidth={false}>
          <Card style={{ backgroundColor: "#fbaa35" }}>
            <Row
              style={{ fontFamily: "Prompt" }}
              className="align-items-center justify-content-md-center p-4"
            >
              <Col xs="12" md="3" style={{ height: "100%" }}>
                {result.map((d, i) => {
                  return d.co_researcher_image ? (
                    <CardImg
                      src={`https://researcher.kims-rmuti.com/file-upload/co_researcher-upload/${d.co_researcher_image}`}
                      // width={350}
                      className="img-shadow"
                      style={{
                        objectFit: "cover",
                        objectPosition: "center center",
                        borderRadius: 4,
                        // width: "300px"
                      }}
                    />
                  ) : (
                    <CardImg
                      width="300px"
                      src={noImg}
                      className="img-shadow"
                      style={{ borderRadius: 4 }}
                    />
                  );
                })}
              </Col>

              <Col xs="12" md="9" style={{ height: "100%" }}>
                <Card
                  style={{ marginTop: 5, color: "#156c68" }}
                  className="img-shadow"
                >
                  <CardBody>
                    {result.map((d, i) => {
                      return (
                        <>
                          <CardTitle
                            tag="h6"
                            style={{ padding: 5, color: "#156c68" }}
                          >
                            <h3>{result[0].co_researcher_name_th} </h3>
                          </CardTitle>
                          <CardText
                            style={{ textAlign: "left", color: "#156c68" }}
                          >
                            <p>{result[0].co_researcher_history}</p>
                            {/* <p>มีความร่วมมือกับ : </p> */}
                          </CardText>
                        </>
                      );
                    })}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Card>
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
                        value={`/CoResearcher/expertise`}
                        label={t("agency.tabmenu.menu1")}
                        className={classes.customLabel}
                        icon={<AiOutlineApartment size={25} />}
                        component={Link}
                        to={`/CoResearcher/expertise?co_researcher_id=${idencrypt}`}
                        // {...a11yProps(0)}
                      />
                      <Tab
                        value={`/CoResearcher/knowledge`}
                        label={t("agency.tabmenu.menu2")}
                        className={classes.customLabel}
                        icon={<GiGiftOfKnowledge size={25} />}
                        component={Link}
                        to={`/CoResearcher/knowledge?co_researcher_id=${idencrypt}`}
                        // {...a11yProps(1)}
                      />
                      <Tab
                        label={t("agency.tabmenu.menu3")}
                        className={classes.customLabel}
                        icon={<AiOutlineCoffee size={25} />}
                        // {...a11yProps(2)}
                        value={`/CoResearcher/product`}
                        component={Link}
                        to={`/CoResearcher/product?co_researcher_id=${idencrypt}`}
                      />

                      <Tab
                        label={t("agency.tabmenu.menu4")}
                        className={classes.customLabel}
                        icon={<HiOutlineLightBulb size={25} />}
                        // {...a11yProps(3)}
                        value={`/CoResearcher/innovation`}
                        component={Link}
                        to={`/CoResearcher/innovation?co_researcher_id=${idencrypt}`}
                      />
                      <Tab
                        label={t("agency.tabmenu.menu5")}
                        className={classes.customLabel}
                        icon={<HiOutlineLightBulb size={25} />}
                        // {...a11yProps(4)}
                        value={`/CoResearcher/creative`}
                        component={Link}
                        to={`/CoResearcher/creative?co_researcher_id=${idencrypt}`}
                      />
                      <Tab
                        label={t("agency.tabmenu.menu6")}
                        className={classes.customLabel}
                        icon={<FaHandsHelping size={25} />}
                        // {...a11yProps(5)}
                        value={`/CoResearcher/project`}
                        component={Link}
                        to={`/CoResearcher/project?co_researcher_id=${idencrypt}`}
                      />
                      <Tab
                        label={t("agency.tabmenu.menu7")}
                        className={classes.customLabel}
                        icon={<AiOutlineReconciliation size={25} />}
                        value={`/CoResearcher/property`}
                        component={Link}
                        to={`/CoResearcher/property?co_researcher_id=${idencrypt}`}
                        // {...a11yProps(6)}
                      />
                      <Tab
                        label={t("agency.tabmenu.menu8")}
                        className={classes.customLabel}
                        icon={<AiOutlineUser size={25} />}
                        value={`/CoResearcher/contact`}
                        component={Link}
                        to={`/CoResearcher/contact?co_researcher_id=${idencrypt}`}
                        // {...a11yProps(7)}
                      />
                    </Tabs>
                  </AppBar>
                )}
              />

              <Container
                className="bg"
                style={{ paddingTop: "25px", paddingBottom: "25px" }}
              >
                <Switch>
                  <Route path="/CoResearcher/expertise">
                    <ExpertisePage
                      co_researcher_id={idencrypt}
                      classes={classes}
                      valuePage1={valuePage1}
                      handleChangePage1={handleChangePage1}
                    />
                  </Route>

                  <Route path="/CoResearcher/knowledge">
                    <KnowledgePage
                      co_researcher_id={idencrypt}
                      classes={classes}
                    />
                  </Route>

                  <Route path="/CoResearcher/product">
                    <ProductPage
                      co_researcher_id={idencrypt}
                      classes={classes}
                    />
                  </Route>

                  <Route path="/CoResearcher/innovation">
                    <InnovationPage
                      co_researcher_id={idencrypt}
                      classes={classes}
                    />
                  </Route>

                  <Route path="/CoResearcher/creative">
                    <CreativePage />
                  </Route>

                  <Route path="/CoResearcher/project">
                    <ProjectPage
                      co_researcher_id={idencrypt}
                      value={value}
                      classes={classes}
                    />
                  </Route>

                  <Route path="/CoResearcher/property">
                    <PropertyPage
                      co_researcher_id={idencrypt}
                      classes={classes}
                      valuePage1={valuePage1}
                      handleChangePage1={handleChangePage1}
                    />
                  </Route>

                  <Route path="/CoResearcher/contact">
                    <ContactPage
                      co_researcher_id={idencrypt}
                      classes={classes}
                      markermap={markermap}
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

export default withRouter(CoResearcher);
