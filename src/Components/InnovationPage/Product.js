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
} from "reactstrap";
import React, { useEffect, useState } from "react";

import { AiOutlineAudit } from "react-icons/ai";
// import Artboard1 from "../images/Artboard1.png";

// import Leftbar from "./Leftbar";
//import "./Css/Search.scss";
//import "../index.css";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  Marker,
  CircleMarker,
  Tooltip,
  Popup,
} from "react-leaflet";
//import markerIconPng from "../images/icon.png";
import { Icon, popup } from "leaflet";
import { withRouter } from "react-router";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import { BiInfoCircle } from "react-icons/bi";
//import noImg from "../images/no-image.png";
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
  appbar: {
    alignItems: "center",
    backgroundColor: "rgba(219, 219, 219, 0.459)",
  },
}));

function SearchPageCoRe(props) {
  // const { locationCo } = props;
  const [productlist, setproductlist] = useState([]);
  const [productgroup, setproductgroup] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  // const [page, setPage] = useState(1);
  // const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [previousValue] = useState([]);
  // const classes = useStyles();

  const [product, setproduct] = useState("");

  const classes = useStyles();

  const handleChangeProduct = (event) => {
    setproduct(event.target.value);
  };

  const apiUrl = "https://kmapi.kims-rmuti.com";

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
        setproductlist(res.data);
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
    getproductGroup();
  }, []);

  const onChangeTitle = (e) => {
    setSearchTitle(e.target.value);
  };

  // React.useEffect(() => {
  //   retrieveCoResearchers();
  // }, [page]);

  return (
    <body className="img-bg">
      <div className="body-detail ">
        <div style={{ padding: "15px" }}>
          <Card>
            <p></p>
            <div style={{ padding: "15px" }}>
              <Container style={{ paddingBottom: "15px" }}>
                <div className="">
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": {
                        m: 2,
                        width: "100%",
                        marginTop: "10px",
                      },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div>
                      <Row className="align-items-center justify-content-md-center">
                        <Col md="5" xs="12">
                          <TextField
                            id="standard-helperText"
                            label="ผลิตภัณฑ์"
                            defaultValue="Default Value"
                            helperText="โปรดกรอกชื่อผลิตภัณฑ์"
                            InputProps={{ style: { fontFamily: "Prompt" } }}
                            InputLabelProps={{
                              style: { fontFamily: "Prompt" },
                            }}
                            FormHelperTextProps={{
                              style: { fontFamily: "Prompt" },
                            }}
                            variant="standard"
                            value={searchTitle}
                            onChange={onChangeTitle}
                          />
                        </Col>

                        <Col md="4" xs="12">
                          <TextField
                            id="outlined-select-currency-native"
                            select
                            label=" "
                            value={product}
                            onChange={handleChangeProduct}
                            InputLabelProps={{
                              style: { fontFamily: "Prompt" },
                            }}
                            FormHelperTextProps={{
                              style: { fontFamily: "Prompt" },
                            }}
                            SelectProps={{
                              native: true,
                              style: { fontFamily: "Prompt" },
                            }}
                            helperText="โปรดเลือกกลุ่มของผลิตภัณฑ์"
                          >
                            <option value={""} style={{ fontFamily: "Prompt" }}>
                              แสดงทั้งหมด
                            </option>
                            {productgroup.map((option) => (
                              <option
                                key={option.co_researcher_pg_id}
                                value={option.co_researcher_pg_id}
                                style={{ fontFamily: "Prompt" }}
                              >
                                {option.co_researcher_pg_name}
                              </option>
                            ))}
                          </TextField>
                        </Col>

                        <Col md="1" xs="12">
                          <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={retrieveProduct}
                            style={{ fontFamily: "Prompt", width: "100%" }}
                            disabled={loading}
                            type="submit"
                            startIcon={<FaSearch size={13} />}
                          >
                            {loading && <CircularProgress size={22} />}
                            {!loading && "ค้นหา"}
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </Box>
                </div>
              </Container>
              <div style={{ padding: "17px" }}>
                {message ? (
                  <p className="p-4" style={{ fontFamily: "Prompt" }}>
                    ไม่พบข้อมูล
                  </p>
                ) : (
                  <Row>
                    {productlist.map((listValue) => (
                      <Col md="3">
                        <Card
                          className="card-header-border "
                          style={{
                            marginTop: "20px",
                            width: "40",
                            fontFamily: "Prompt",
                            height: 660,
                          }}
                        >
                          <CardBody className="card-border">
                            {listValue.co_researcher_pi_copyright == 1 ? (
                              <img
                                position="relative"
                                align="right"
                                // src={Artboard1}
                                width={55}
                                height="auto"
                                onClick={() => {
                                  props.history.push({
                                    pathname: "/CoResearcher",
                                    search: `?co_researcher_id=${btoa(
                                      listValue.co_researcher_id
                                    )}&page2`,
                                  });
                                }}
                              />
                            ) : (
                              " "
                            )}
                            <Typography
                              style={{
                                color: "blue",
                                fontFamily: "Prompt",
                                height: 80,
                              }}
                            >
                              <p>
                                ชื่อผลิตภัณฑ์ :&nbsp;
                                {listValue.co_researcher_pi_name
                                  ? listValue.co_researcher_pi_name
                                  : listValue.innovation_name}
                              </p>
                            </Typography>
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
                )}
                {/* </Card> */}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </body>
  );
}

export default withRouter(SearchPageCoRe);
