/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Container,
  CircularProgress,
  IconButton,
  InputLabel,
  FormHelperText,
  ListItem,
} from "@material-ui/core";
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  Form,
  FormGroup,
  Input,
  CardText,
} from "reactstrap";
import React, { useEffect, useState } from "react";

import { AiOutlineAudit } from "react-icons/ai";

import Leftbar from "./Leftbar";
import "./Css/Search.scss";
import "../index.css";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  Marker,
  CircleMarker,
  Tooltip,
  Popup,
} from "react-leaflet";
import markerIconPng from "../images/icon.png";
import { Icon, popup } from "leaflet";
import { withRouter } from "react-router";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import { BiInfoCircle } from "react-icons/bi";
import noImg from "../images/no-image.png";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import { HiOutlineLightBulb, HiOutlineAcademicCap } from "react-icons/hi";

import AwesomeSlider from "react-awesome-slider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import PropTypes from "prop-types";

import { AiOutlineShopping, AiOutlineFormatPainter } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { Route, BrowserRouter, Switch, Link } from "react-router-dom";
// import Product from "./InnovationPage/Product";
// import Innovat from "./InnovationPage/Innovat";
// import Createive from "./InnovationPage/creative";

import Artboard1 from "../images/Artboard1.png";
import innoimg from "../images/inno.jpg";
import pdimg from "../images/product.jpg";
import ctimg from "../images/creative.jpg";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

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

function SearchPageCoRe(props) {
  // const { locationCo } = props;
  const [productinnovation, setproductinnovation] = useState([]);
  const [productlist, setproductlist] = useState([]);
  const [innovationgroup1, setinnovationgroup1] = useState([]);
  const [innovationgroup2, setinnovationgroup2] = useState([]);
  const [productgroup, setproductgroup] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchTitle1, setSearchTitle1] = useState("");

  // const [page, setPage] = useState(1);
  // const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [previousValue] = useState([]);
  // const classes = useStyles();

  const [innovation, setinnovation] = useState("");
  const [product, setproduct] = useState("");

  const classes = useStyles();

  const handleChangeInnovation = (event) => {
    setinnovation(event.target.value);
  };

  const handleChangeProduct = (event) => {
    setproduct(event.target.value);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [valuePage1, setValuePage1] = useState(0);

  const handleChangePage1 = (event, newValue) => {
    setValuePage1(newValue);
  };

  const apiUrl = "https://kmapi.kims-rmuti.com";
  const localUrl = "http://localhost:4000";

  const getRequestParams = (title, innovation_group) => {
    let params = {};

    // if (page) {
    //   params["page"] = page - 1;
    // }

    if (innovation_group) {
      params["innovation_group_id"] = innovation_group;
    }

    // if (product_group) {
    //   params["product_group_id"] = product_group;
    // }

    if (title != undefined) {
      params["title"] = title;
    }

    return params;
  };

  const getRequestParams1 = (title, product_group) => {
    let params = {};

    // if (page) {
    //   params["page"] = page - 1;
    // }

    // if (innovation_group) {
    //   params["innovation_group_id"] = innovation_group;
    // }

    if (product_group) {
      params["product_group_id"] = product_group;
    }

    if (title != undefined) {
      params["title"] = title;
    }

    return params;
  };

  const getinnovationGroup1 = () => {
    axios
      .get(`${apiUrl}/api/get/co_researcher_product_group/findinnovationgroup1`)
      .then((res) => {
        setinnovationgroup1(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getinnovationGroup2 = () => {
    axios
      .get(`${apiUrl}/api/get/co_researcher_product_group/findinnovationgroup2`)
      .then((res) => {
        setinnovationgroup2(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getproductGroup = () => {
    axios
      .get(`${apiUrl}/api/get/co_researcher_product_group`)
      .then((res) => {
        setproductgroup(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const retrieveinnovation = () => {
    setLoading(true);
    // previousValue.push(selected);

    // if (previousValue.length > 2) {
    //   previousValue.shift();
    // }
    // console.log(previousValue);

    const params = getRequestParams(searchTitle, innovation);
    console.log(params);
    axios
      .get(
        `${apiUrl}/api/get/co_researcher_productionnovation/innovation/list`,
        { params }
      )
      .then((res) => {
        console.log(res.data);

        // console.log(users);
        setproductinnovation([res.data[0]]);
        // setCount(totalPages);
      })
      .finally(() => {
        setMessage("");
        setLoading(false);
        // if (previousValue[0] != previousValue[1]) {
        //   setPage(1);
        // }
      })
      .catch((e) => {
        console.log(e);
        // setPage(1);
        // setCount(0);
        // setTimeout(() => {
        //   setMessage(e.response.data.message);
        // }, 500);
        setMessage(e.response.data.message);
      });
  };

  const retrieveProduct = () => {
    setLoading(true);
    // previousValue.push(selected);

    // if (previousValue.length > 2) {
    //   previousValue.shift();
    // }
    // console.log(previousValue);

    const params = getRequestParams1(searchTitle, product);
    console.log(params);
    axios
      .get(`${apiUrl}/api/get/co_researcher_productionnovation/product/list`, {
        params,
      })
      .then((res) => {
        console.log(res.data);

        // console.log(users);
        setproductlist([res.data[0]]);
        // setCount(totalPages);
      })
      .finally(() => {
        setMessage("");
        setLoading(false);
        // if (previousValue[0] != previousValue[1]) {
        //   setPage(1);
        // }
      })
      .catch((e) => {
        console.log(e);
        // setPage(1);
        // setCount(0);
        // setTimeout(() => {
        //   setMessage(e.response.data.message);
        // }, 500);
        setMessage(e.response.data.message);
      });
  };

  React.useEffect(() => {
    retrieveProduct();
    retrieveinnovation();
    getinnovationGroup1();
    getinnovationGroup2();
    getproductGroup();
  }, []);

  const onChangeTitle = (e) => {
    setSearchTitle(e.target.value);
  };

  const onChangeTitle1 = (e) => {
    setSearchTitle1(e.target.value);
  };

  // React.useEffect(() => {
  //   retrieveCoResearchers();
  // }, [page]);

  return (
    <body className="img-bg">
      <div className="body-detail ">
        {/* <Box style={{ margin: "-20px 0px 20px 200px" }}>
          <text
            style={{
              fontFamily: "Prompt",
              fontSize: 50,
              fontWeight: "bold",
              color: "#FF9F45",
            }}
          >
            Knowledge & Innovation Management System
          </text>
        </Box> */}
        <div style={{ padding: "15px", margin: "0px 20px 0px 20px" }}>
          <Row>
            <Col md={4}>
              <Card
                className="card-border card1"
                onClick={() => {
                  props.history.push({
                    pathname: "/Innovat",
                  });
                }}
              >
                <div>
                  <img
                    position="relative"
                    align="right"
                    width="520px"
                    height="800px"
                    src={innoimg}
                  />
                </div>
                {/* <CardBody>
                    {productinnovation.map((listValue) => {
                      return (
                        <div>
                          <div>
                            <AwesomeSlider bullets={false}>
                              {listValue.images.map((listitem, index) => {
                                return (
                                  <Col md="2">
                                    <img
                                      className="card-border"
                                      style={{
                                        objectPosition: "center center",
                                        padding: 1,
                                        color: "black",
                                        fontFamily: "Prompt",
                                      }}
                                      width="100%"
                                      height="auto"
                                      src={
                                        listitem.co_innovation_image
                                          ? `https://researcher.kims-rmuti.com/file-upload/co_innovationproduct_upload/${listitem.co_innovation_image}`
                                          : `https://researcher.kims-rmuti.com/file-upload/us_innovation-upload/${listitem.innovation_image_name}`
                                      }
                                    />
                                  </Col>
                                );
                              })}
                            </AwesomeSlider>

                            <br />
                            <Typography
                              style={{
                                textAlign: "left",
                                fontFamily: "Prompt",
                              }}
                            >
                              <p>
                                ชื่อนวัตกรรม :&nbsp;
                                {listValue.co_researcher_pi_name
                                  ? listValue.co_researcher_pi_name
                                  : listValue.innovation_name}
                              </p>
                              <p>
                                <h>จำนวนการผลิต : </h>
                                {listValue.co_researcher_pi_amount
                                  ? listValue.co_researcher_pi_amount
                                  : listValue.innovation_amount}{" "}
                                ชิ้น
                              </p>
                              <p>
                                <h>ราคา : </h>
                                {listValue.co_researcher_pi_price
                                  ? listValue.co_researcher_pi_price
                                  : listValue.innovation_price}{" "}
                                บาท
                              </p>
                              <p>
                                <h>ผู้ประสานงาน : </h>
                                {listValue.co_researcher_pi_coordinator
                                  ? listValue.co_researcher_pi_coordinator
                                  : "-"}
                              </p>
                              <p>
                                <h>โทรศัพท์ : </h>
                                {listValue.co_researcher_pi_phone
                                  ? listValue.co_researcher_pi_phone
                                  : "-"}
                              </p>
                              <p>
                                <h>Facebook : </h>
                                <Button
                                  a
                                  href={
                                    listValue.co_researcher_pi_facebook
                                      ? listValue.co_researcher_pi_facebook
                                      : ""
                                  }
                                  style={{ fontSize: "smaller" }}
                                >
                                  {listValue.co_researcher_pi_facebook
                                    ? listValue.co_researcher_pi_facebook.slice(
                                        8,
                                        35
                                      )
                                    : "-"}
                                </Button>
                              </p>

                              <p>
                                <h>Line : </h>
                                {listValue.co_researcher_pi_line
                                  ? listValue.co_researcher_pi_line
                                  : "-"}
                              </p>
                              <p>
                                <h>Email : </h>
                                {listValue.co_researcher_pi_mail
                                  ? listValue.co_researcher_pi_mail
                                  : "-"}
                              </p>

                              <p></p>
                            </Typography>
                          </div>
                        </div>
                      );
                    })}

                    <Button
                      align="center"
                      color="primary"
                      style={{ fontFamily: "Prompt", fontSize: 20 }}
                      aria-label="view info project"
                      component="a"
                      href="/monitoring/Innovat"
                      // className={(classes.link)}
                      // selected={true}
                      className={classes.link}
                      // classes={{ selected: classes.active }}
                    >
                      นวัตกรรมอื่นๆ
                    </Button>
                  </CardBody> */}
              </Card>
            </Col>

            <Col md={4}>
              <Card
                className="card-border card1"
                onClick={() => {
                  props.history.push({
                    pathname: "/Product",
                  });
                }}
              >
                <div>
                  <img
                    position="relative"
                    align="right"
                    width="520px"
                    height="800px"
                    src={pdimg}
                  />
                </div>
                {/* <CardBody>
                    {productlist.map((listValue) => {
                      return (
                        <div>
                          <div>
                            <AwesomeSlider bullets={false}>
                              {listValue.images.map((listitem, index) => {
                                return (
                                  <Col md="2">
                                    <img
                                      className="card-border"
                                      style={{
                                        objectPosition: "center center",
                                        padding: 1,
                                        color: "black",
                                        fontFamily: "Prompt",
                                      }}
                                      width="100%"
                                      height="auto"
                                      src={
                                        listitem.co_innovation_image
                                          ? `https://researcher.kims-rmuti.com/file-upload/co_innovationproduct_upload/${listitem.co_innovation_image}`
                                          : `https://researcher.kims-rmuti.com/file-upload/us_innovation-upload/${listitem.innovation_image_name}`
                                      }
                                    />
                                  </Col>
                                );
                              })}
                            </AwesomeSlider>
                            <br />
                            <Typography
                              style={{
                                textAlign: "left",
                                fontFamily: "Prompt",
                                fontSize: "22",
                              }}
                            >
                              <p>
                                ชื่อผลิตภัณฑ์ :&nbsp;
                                {listValue.co_researcher_pi_name
                                  ? listValue.co_researcher_pi_name
                                  : listValue.innovation_name}
                              </p>

                              <p>
                                <h>จำนวนการผลิต : </h>
                                {listValue.co_researcher_pi_amount
                                  ? listValue.co_researcher_pi_amount
                                  : listValue.innovation_amount}{" "}
                                ชิ้น
                              </p>
                              <p>
                                <h>ราคา : </h>
                                {listValue.co_researcher_pi_price
                                  ? listValue.co_researcher_pi_price
                                  : listValue.innovation_price}{" "}
                                บาท
                              </p>
                              <p>
                                <h>ผู้ประสานงาน : </h>
                                {listValue.co_researcher_pi_coordinator
                                  ? listValue.co_researcher_pi_coordinator
                                  : "-"}
                              </p>
                              <p>
                                <h>โทรศัพท์ : </h>
                                {listValue.co_researcher_pi_phone
                                  ? listValue.co_researcher_pi_phone
                                  : "-"}
                              </p>
                              <p>
                                <h>Facebook : </h>
                                <Button
                                  a
                                  href={
                                    listValue.co_researcher_pi_facebook
                                      ? listValue.co_researcher_pi_facebook
                                      : ""
                                  }
                                  style={{ fontSize: "smaller" }}
                                >
                                  {listValue.co_researcher_pi_facebook
                                    ? listValue.co_researcher_pi_facebook.slice(
                                        8,
                                        35
                                      )
                                    : "-"}
                                </Button>
                              </p>

                              <p>
                                <h>Line : </h>
                                {listValue.co_researcher_pi_line
                                  ? listValue.co_researcher_pi_line
                                  : "-"}
                              </p>
                              <p>
                                <h>Email : </h>
                                {listValue.co_researcher_pi_mail
                                  ? listValue.co_researcher_pi_mail
                                  : "-"}
                              </p>

                              <p></p>
                            </Typography>
                          </div>
                        </div>
                      );
                    })}

                    <Button
                      align="center"
                      color="primary"
                      style={{ fontFamily: "Prompt", fontSize: 20 }}
                      aria-label="view info project"
                      component="a"
                      href="/monitoring/Product"
                      // className={(classes.link)}
                      // selected={true}
                      className={classes.link}
                      // classes={{ selected: classes.active }}
                    >
                      ผลิตภัณฑ์อื่นๆ
                    </Button>
                  </CardBody> */}
              </Card>
            </Col>

            <Col md={4}>
              <Card
                className="card-border card1"
                onClick={() => {
                  props.history.push({
                    pathname: "/Creative",
                  });
                }}
              >
                <div>
                  <img
                    position="relative"
                    align="right"
                    width="520px"
                    height="800px"
                    src={ctimg}
                  />
                </div>

                {/* <CardBody>
                    {message ? (
                      <p className="p-4" style={{ fontFamily: "Prompt" }}>
                        ไม่พบข้อมูล
                      </p>
                    ) : (
                      <div>
                        {productinnovation.co_researcher_pi_type_id >= 12 ? (
                          <Row>
                            {productinnovation.map((listValue) => (
                              <Col md="2">
                                <Card
                                  style={{
                                    marginTop: "20px",
                                    width: "40",
                                    fontFamily: "Prompt",
                                    height: 660,
                                  }}
                                >
                                  <CardBody className="card-header-border">
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
                                                  fontFamily: "Prompt",
                                                }}
                                                width="100%"
                                                height="auto"
                                                src={
                                                  listitem.co_innovation_image
                                                    ? `https://researcher.kims-rmuti.com/file-upload/co_innovationproduct_upload/${listitem.co_innovation_image}`
                                                    : `https://researcher.kims-rmuti.com/file-upload/us_innovation-upload/${listitem.innovation_image_name}`
                                                }
                                              />
                                            </Col>
                                          );
                                        }
                                      )}
                                    </AwesomeSlider>
                                    <br />
                                    <Typography
                                      style={{
                                        textAlign: "left",
                                        fontFamily: "Prompt",
                                        fontSize: "18",
                                      }}
                                    >
                                      <p>
                                        ชื่องานสร้างสรรค์ :&nbsp;
                                        {listValue.co_researcher_pi_name
                                          ? listValue.co_researcher_pi_name
                                          : listValue.innovation_name}
                                      </p>
                                      <p>
                                        <h>จำนวนการผลิต : </h>
                                        {listValue.co_researcher_pi_amount
                                          ? listValue.co_researcher_pi_amount
                                          : listValue.innovation_amount}{" "}
                                        ชิ้น
                                      </p>
                                      <p>
                                        <h>ราคา : </h>
                                        {listValue.co_researcher_pi_price
                                          ? listValue.co_researcher_pi_price
                                          : listValue.innovation_price}{" "}
                                        บาท
                                      </p>
                                      <p>
                                        <h>ผู้ประสานงาน : </h>
                                        {listValue.co_researcher_pi_coordinator
                                          ? listValue.co_researcher_pi_coordinator
                                          : "-"}
                                      </p>
                                      <p>
                                        <h>โทรศัพท์ : </h>
                                        {listValue.co_researcher_pi_phone
                                          ? listValue.co_researcher_pi_phone
                                          : "-"}
                                      </p>
                                      <p>
                                        <h>Facebook : </h>
                                        <Button
                                          a
                                          href={
                                            listValue.co_researcher_pi_facebook
                                              ? listValue.co_researcher_pi_facebook
                                              : ""
                                          }
                                          style={{ fontSize: "smaller" }}
                                        >
                                          {listValue.co_researcher_pi_facebook
                                            ? listValue.co_researcher_pi_facebook.slice(
                                                8,
                                                35
                                              )
                                            : "-"}
                                        </Button>
                                      </p>

                                      <p>
                                        <h>Line : </h>
                                        {listValue.co_researcher_pi_line
                                          ? listValue.co_researcher_pi_line
                                          : "-"}
                                      </p>
                                      <p>
                                        <h>Email : </h>
                                        {listValue.co_researcher_pi_mail
                                          ? listValue.co_researcher_pi_mail
                                          : "-"}
                                      </p>

                                      <p></p>
                                    </Typography>
                                  </CardBody>
                                </Card>
                              </Col>
                            ))}
                          </Row>
                        ) : (
                          <p className="p-4" style={{ fontFamily: "Prompt" }}>
                            ไม่พบข้อมูล
                          </p>
                        )}
                      </div>
                    )}
                  </CardBody>

                  <Button
                    align="center"
                    color="primary"
                    style={{ fontFamily: "Prompt", fontSize: 20 }}
                    aria-label="view info project"
                    component="a"
                    href="/monitoring/Creative"
                     className={(classes.link)}
                     selected={true}
                    className={classes.link}
                     classes={{ selected: classes.active }}
                  >
                    งานสร้างสรรค์อื่นๆ
                  </Button> */}
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </body>
  );
}

export default withRouter(SearchPageCoRe);
