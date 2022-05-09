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

  

  const retrievecretive = () => {
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
        `${apiUrl}/api/get/co_researcher_productionnovation/cretive/list`,
        { params }
      )
      .then((res) => {
        console.log(res.data);

        // console.log(users);
        setproductinnovation(res.data);
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
    retrievecretive();
    getinnovationGroup2();
  }, []);

 
  const onChangeTitle1 = (e) => {
    setSearchTitle1(e.target.value);
  };

  // React.useEffect(() => {
  //   retrieveCoResearchers();
  // }, [page]);

  return (
    <body className="img-bg">
      <div className="body-detail ">
        <div style={{ padding: " 15px" }}>
          <Card>
            <p></p>
            <div style={{ padding: " 15px" }}>
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
                        <Col md="4" xs="12">
                          <TextField
                            id="standard-helperText"
                            label="งานสร้างสรรค์"
                            defaultValue="Default Value"
                            helperText="โปรดกรอกชื่องานสร้างสรรค์"
                            InputProps={{ style: { fontFamily: "Prompt" } }}
                            InputLabelProps={{
                              style: { fontFamily: "Prompt" },
                            }}
                            FormHelperTextProps={{
                              style: { fontFamily: "Prompt" },
                            }}
                            variant="standard"
                            value={searchTitle1}
                            onChange={onChangeTitle1}
                          />
                        </Col>

                        <Col md="3" xs="12" style={{ fontFamily: "Prompt" }}>
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
                            helperText="โปรดเลือกกลุ่มของานสร้างสรรค์"
                          >
                            <option value={""} style={{ fontFamily: "Prompt" }}>
                              แสดงทั้งหมด
                            </option>
                            {innovationgroup2.map((option, i) => (
                              <option
                                key={i}
                                value={option.innovation_group_id}
                                style={{ fontFamily: "Prompt" }}
                              >
                                {option.innovation_group_name}
                              </option>
                            ))}
                          </TextField>
                        </Col>

                        <Col md="1" xs="12">
                          <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={retrievecretive}
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
              <Container>
                {message ? (
                  <p className="p-4" style={{ fontFamily: "Prompt" }}>
                    ไม่พบข้อมูล
                  </p>
                ) : (
                  <div>
                    {productinnovation.co_researcher_pi_type_id >= 12 ? (
                      <Row>
                        {productinnovation.map((listValue) => (
                          <Col md="4" xs="12">
                            <Card
                              className="card-border "
                              style={{
                                marginTop: "20px",
                                width: "40",
                                fontFamily: "Prompt",
                                height: 660,
                              }}
                            >
                              <CardBody className="card-header-border">
                                {listValue.co_researcher_pi_copyright == 1 ? (
                                  <img
                                    position="relative"
                                    align="right"
                                    // src={Artboard1}
                                    width={55}
                                    height="auto"
                                    onClick={() => {
                                      props.history.push({
                                        pathname: "/Researcher",
                                        search: `?user_idcard=${btoa(
                                          listValue.user_idcard
                                        )}&page4`,
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
                                    ชื่อสร้างสรรค์ :&nbsp;
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
                                <br/>

                                <Typography
                                  style={{
                                    textAlign: "left",
                                    fontFamily: "Prompt",
                                  }}
                                >
                                  <p> " " </p>
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
                {/* </Card> */}
              </Container>
            </div>
          </Card>
        </div>
      </div>
    </body>
  );
}

export default withRouter(SearchPageCoRe);
