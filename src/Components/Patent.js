/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import { Box, Button } from "@material-ui/core";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import React, { useEffect, useState } from "react";
import "./Css/Search.scss";
import "../index.css";
import { withRouter } from "react-router";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Artboard1 from "../images/Artboard1.png";
import research from "../images/research.jpg";
import core from "../images/core.jpg";
import chumchon from "../images/chumchon.jpg";

// import Product from "./InnovationPage/Product";
// import Innovat from "./InnovationPage/Innovat";
// import Createive from "./InnovationPage/creative";

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
  const [Patentus, setPatentus] = useState([]);
  const [Patentcommu, setPatentcommu] = useState([]);
  const [Patentcoop, setPatentcoop] = useState([]);

  // const [page, setPage] = useState(1);
  // const [count, setCount] = useState(0);

  // const classes = useStyles();

  const classes = useStyles();

  const apiUrl = "https://kmapi.kims-rmuti.com";
  const localUrl = "http://localhost:4000";

  //นักวิจัย

  axios
    .get(`${apiUrl}/api/get/us-patent`)
    .then((res) => {
      setPatentus([res.data[0]]);
    })
    .catch((err) => {
      console.log(err);
    });

  //เครือข่ายความร่วมมือ

  axios
    .get(`${apiUrl}/api/get/co-researcher-patent-commu`)
    .then((res) => {
      setPatentcommu(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  //ชุมชน

  axios
    .get(`${apiUrl}/api/get/co-researcher-patent-coop`)
    .then((res) => {
      setPatentcoop([res.data[0]]);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <body className="img-bg">
      <Box style={{ margin: "-20px 0px 20px 200px" }}>
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
      </Box>
      <div className="body-detail ">
        <div style={{ padding: "15px", margin: "0px 20px 0px 20px" }}>
          <Row>
            <Col md={4}>
              <Card
                className="card-border card1"
                onClick={() => {
                  props.history.push({
                    pathname: "/Research",
                  });
                }}
              >
                <div>
                  <img
                    position="relative"
                    align="right"
                    width="512px"
                    height="750px"
                    src={research}
                  />
                </div>

                {/*  <CardBody>
                    {Patentus.co_patent_id ? (
                      <p className="p-4" style={{ fontFamily: "Prompt" }}>
                        ไม่พบข้อมูล
                      </p>
                    ) : (
                      <Row>
                        {Patentus.map((listValue) => (
                          <div>
                            <div>
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
                                src={`https://km-innovations.rmuti.ac.th/researcher/file-upload/patent-upload/${listValue.patent_images}`}
                              />

                              <Typography
                                style={{
                                  textAlign: "left",
                                  fontFamily: "Prompt",
                                }}
                              >
                                <br />
                                <p>
                                  ชื่อสิทธิบัตร : {listValue.patent_name_th}
                                </p>
                                <p>
                                  วันจดทะเบียน :
                                  {listValue.patent_date
                                    ? new Date(
                                        listValue.patent_date
                                      ).toLocaleDateString("th-TH", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      })
                                    : ""}
                                </p>
                                <p>เลขที่ประกาศ : {listValue.patent_number}</p>
                                <p>
                                  <h>ผู้ยื่นขอจดทะเบียน : </h>
                                  {listValue.patent_application}
                                </p>
                                <p>เลขที่คำขอ : {listValue.patent_request}</p>
                                <p>ประเภทสิทธิบัตร : {listValue.patent_type}</p>
                                <p>ประเทศ :{listValue.publication_country}</p>
                                เอกสาร :
                                {listValue.patent_attachment ? (
                                  <Button>
                                    <a
                                      target="_blank"
                                      href={`https://researcher.kims-rmuti.com/file-upload/patent-upload/${listValue.patent_attachment}`}
                                      rel="noreferrer"
                                    >
                                      {listValue.patent_attachment.slice(0, 50)}{" "}
                                    </a>
                                  </Button>
                                ) : (
                                  <p></p>
                                )}
                                <p></p>
                              </Typography>
                            </div>
                          </div>
                        ))}
                      </Row>
                    )}
                    </Card>    
                  </CardBody> 

                  <Button
                    align="center"
                    color="primary"
                    style={{ fontFamily: "Prompt", fontSize: 20 }}
                    aria-label="view info project"
                    component="a"
                    href="/monitoring/Research"
                    className={classes.link}
                    // selected={true}
                    // classes={{ selected: classes.active }}
                  >
                    ทรัพย์สินทางปัญญาอื่นๆ
                  </Button>*/}
              </Card>
            </Col>

            <Col md={4}>
              <Card
                className="card-border card1"
                onClick={() => {
                  props.history.push({
                    pathname: "/Chumchon",
                  });
                }}
              >
                <div>
                  <img
                    position="relative"
                    align="right"
                    width="512px"
                    height="750px"
                    src={chumchon}
                  />
                </div>
                {/*    <CardBody>
                    {Patentcommu.co_patent_id ? (
                      <Row>
                        {Patentcommu.map((listValue) => (
                          <div>
                            <div>
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
                                src={`https://researcher.kims-rmuti.com/file-upload/co_patent-upload/${listValue.co_patent_image}`}
                              />

                              <Typography
                                style={{
                                  textAlign: "left",
                                  fontFamily: "Prompt",
                                }}
                              >
                                <br />
                                <p>
                                  ชื่อสิทธิบัตร : {listValue.co_patent_name_th}
                                </p>
                                <p>
                                  วันจดทะเบียน :
                                  {listValue.co_patent_date
                                    ? new Date(
                                        listValue.co_patent_date
                                      ).toLocaleDateString("th-TH", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      })
                                    : ""}
                                </p>
                                <p>
                                  เลขที่ประกาศ : {listValue.co_patent_numeral}
                                </p>
                                <p>
                                  <h>ผู้ยื่นขอจดทะเบียน : </h>
                                  {listValue.co_patent_registered_name}
                                </p>
                                <p>เลขที่คำขอ : {listValue.patent_request}</p>
                                <p>
                                  ประเภทสิทธิบัตร : {listValue.patent_type_id}
                                </p>
                                เอกสาร :
                                {listValue.co_patent_documentation ? (
                                  <Button>
                                    <a
                                      target="_blank"
                                      href={`https://researcher.kims-rmuti.com/file-upload/patent-upload/${listValue.co_patent_documentation}`}
                                      rel="noreferrer"
                                    >
                                      {listValue.co_patent_documentation.slice(
                                        0,
                                        50
                                      )}{" "}
                                    </a>
                                  </Button>
                                ) : (
                                  <p></p>
                                )}
                                <p></p>
                              </Typography>
                            </div>
                          </div>
                        ))}
                      </Row>
                    ) : (
                      <p className="p-4" style={{ fontFamily: "Prompt" }}>
                        ไม่พบข้อมูล
                      </p>
                    )}
                    {/* </Card> 
                  </CardBody>
                           
                  <Button
                    align="center"
                    color="primary"
                    style={{ fontFamily: "Prompt", fontSize: 20 }}
                    aria-label="view info project"
                    component="a"
                    href="/monitoring/Chumchon"
                    className={classes.link}
                    // selected={true}
                    // classes={{ selected: classes.active }}
                  >
                    ทรัพย์สินทางปัญญาอื่นๆ
                  </Button> */}
              </Card>
            </Col>

            <Col md={4}>
              <Card
                className="card-border card1"
                onClick={() => {
                  props.history.push({
                    pathname: "/CoRe",
                  });
                }}
              >
                <div>
                  <img
                    position="relative"
                    align="right"
                    width="512px"
                    height="750px"
                    src={core}
                  />
                </div>
                {/*
                  <CardBody>
                    {Patentcoop.co_patent_id ? (
                      <p className="p-4" style={{ fontFamily: "Prompt" }}>
                        ไม่พบข้อมูล
                      </p>
                    ) : (
                      <Row>
                        {Patentcoop.map((listValue) => (
                          <div>
                            <div>
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
                                src={`https://researcher.kims-rmuti.com/file-upload/co_patent-upload/${listValue.co_patent_image}`}
                              />

                              <Typography
                                style={{
                                  textAlign: "left",
                                  fontFamily: "Prompt",
                                }}
                              >
                                <br />
                                <p>
                                  ชื่อสิทธิบัตร : {listValue.co_patent_name_th}
                                </p>
                                <p>
                                  วันจดทะเบียน :
                                  {listValue.co_patent_date
                                    ? new Date(
                                        listValue.co_patent_date
                                      ).toLocaleDateString("th-TH", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      })
                                    : ""}
                                </p>
                                <p>
                                  เลขที่ประกาศ : {listValue.co_patent_numeral}
                                </p>
                                <p>
                                  <h>ผู้ยื่นขอจดทะเบียน : </h>
                                  {listValue.co_patent_registered_name}
                                </p>
                                <p>เลขที่คำขอ : {listValue.patent_request}</p>
                                <p>
                                  ประเภทสิทธิบัตร : {listValue.patent_type_id}
                                </p>
                                เอกสาร :
                                {listValue.co_patent_documentation ? (
                                  <Button>
                                    <a
                                      target="_blank"
                                      href={`https://researcher.kims-rmuti.com/file-upload/patent-upload/${listValue.co_patent_documentation}`}
                                      rel="noreferrer"
                                    >
                                      {listValue.co_patent_documentation.slice(
                                        0,
                                        50
                                      )}{" "}
                                    </a>
                                  </Button>
                                ) : (
                                  <p></p>
                                )}
                                <p></p>
                              </Typography>
                            </div>
                          </div>
                        ))}
                      </Row>
                    )}
                    {/* </Card> 
                  </CardBody>

                  <Button
                    align="center"
                    color="primary"
                    style={{ fontFamily: "Prompt", fontSize: 20 }}
                    aria-label="view info project"
                    component="a"
                    href="/monitoring/CoRe"
                    className={classes.link}
                    // selected={true}
                    // classes={{ selected: classes.active }}
                  >
                    ทรัพย์สินทางปัญญาอื่นๆ
                  </Button>
                */}
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </body>
  );
}

export default withRouter(SearchPageCoRe);
