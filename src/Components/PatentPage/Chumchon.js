/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import {
  Box,
  TextField,
  Button,
  Container,
  CircularProgress,
} from "@material-ui/core";
import { Card, CardBody, Row, Col } from "reactstrap";
import React, { useEffect, useState } from "react";

import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import noImg from "../../images/no-image.png";

import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import { BiUser } from "react-icons/bi";

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
  const [patentlist2, setpatentlist2] = useState([]);
  const [Patentgroup2, setPatentgroup2] = useState([]);
  const [searchTitle2, setSearchTitle] = useState("");

  // const [page, setPage] = useState(1);
  // const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [previousValue] = useState([]);
  // const classes = useStyles();

  const [patent, setPatent] = useState("");

  const classes = useStyles();

  const handleChangePatent = (event) => {
    setPatent(event.target.value);
  };

  const apiUrl = "https://kmapi.kims-rmuti.com";
  const localUrl = "http://localhost:4000";

  const getRequestParams = (title, patent_type) => {
    let params = {};

    if (patent_type) {
      params["patent_type_id"] = patent_type;
    }

    if (title != undefined) {
      params["title"] = title;
    }

    return params;
  };

  const getPatentgroup2 = () => {
    axios
      .get(`${apiUrl}/api/get/us-patent/patent-type`)
      .then((res) => {
        setPatentgroup2(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const retrievepatent = () => {
    setLoading(true);
    // previousValue.push(selected);

    // if (previousValue.length > 2) {
    //   previousValue.shift();
    // }
    // console.log(previousValue);

    const params = getRequestParams(searchTitle2, patent);
    console.log(params);
    axios
      .get(`${apiUrl}/api/get/co-researcher/commupatent/list`, { params })
      .then((res) => {
        console.log(res.data);
        // console.log(users);
        setpatentlist2(res.data);
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
    retrievepatent();
    getPatentgroup2();
  }, []);

  const onChangeTitle = (e) => {
    setSearchTitle(e.target.value);
  };
  const patent_type = {
    1: "สิทธิบัตรการประดิษฐ์",
    2: "สิทธิบัตรการออกแบบผลิตภัณฑ์",
    3: "อนุสิทธิบัตร",
    4: "ลิขสิทธิ์",
    5: "เครื่องหมายการค้า",
    6: "เครื่องหมายบริการ",
    7: "เครื่องหมายรับรอง",
    8: "เครื่องหมายร่วม",
    9: "ทรัพย์สินทางอุตสาหกรรม",
  };

  // React.useEffect(() => {
  //   retrieveCoResearchers();
  // }, [page]);

  return (
    <body className="img-bg">
      <div className="body-detail ">
        <div style={{ padding: "15px" }}>
          <Card>
            <ThemeProvider>
              <Container style={{ paddingBottom: "10px" }}>
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
                            label="สิทธิบัตร"
                            defaultValue="Default Value"
                            helperText="โปรดกรอกชื่อสิทธิบัตร"
                            InputProps={{ style: { fontFamily: "Prompt" } }}
                            InputLabelProps={{
                              style: { fontFamily: "Prompt" },
                            }}
                            FormHelperTextProps={{
                              style: { fontFamily: "Prompt" },
                            }}
                            variant="standard"
                            value={searchTitle2}
                            onChange={onChangeTitle}
                          />
                        </Col>

                        <Col md="3" xs="12">
                          <TextField
                            id="outlined-select-currency-native"
                            select
                            label=" "
                            value={patent}
                            InputLabelProps={{
                              style: { fontFamily: "Prompt" },
                            }}
                            FormHelperTextProps={{
                              style: { fontFamily: "Prompt" },
                            }}
                            onChange={handleChangePatent}
                            SelectProps={{
                              native: true,
                              style: { fontFamily: "Prompt" },
                            }}
                            helperText="โปรดเลือกกลุ่มของสิทธิบัตร"
                          >
                            <option value={""} style={{ fontFamily: "Prompt" }}>
                              แสดงทั้งหมด
                            </option>
                            {Patentgroup2.map((option, i) => (
                              <option
                                key={i}
                                value={option.patent_type_id}
                                style={{ fontFamily: "Prompt" }}
                              >
                                {option.patent_type_name}
                              </option>
                            ))}
                          </TextField>
                        </Col>

                        <Col md="1" xs="12">
                          <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={retrievepatent}
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

              <div style={{ padding: "15px" }}>
                {message ? (
                  <p className="p-4" style={{ fontFamily: "Prompt" }}>
                    ไม่พบข้อมูล
                  </p>
                ) : (
                  <Row>
                    {patentlist2.map((listValue) => (
                      <Col md="3" xs="12">
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
                            <Typography
                              style={{
                                color: "blue",
                                fontFamily: "Prompt",
                                height: 80,
                              }}
                            >
                              <p>ชื่อสิทธิบัตร : {listValue.co_patent_name_th}</p>
                            </Typography>

                            {listValue.co_patent_image ? (
                              <img
                                className="card-border"
                                style={{
                                  objectPosition: "center center",
                                  padding: 1,
                                  color: "black",
                                  fontFamily: "Prompt",
                                }}
                                height="180"
                                width="auto"
                                src={`https://researcher.kims-rmuti.com/file-upload/co_patent-upload/${listValue.co_patent_image}`}
                              />
                            ) : (
                              <img
                                className="card-border"
                                width="180px"
                                src={noImg}
                              />
                            )}

                            <Typography
                              style={{
                                textAlign: "left",
                                fontFamily: "Prompt",
                              }}
                            >
                              <br />
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
                                  : " "}
                              </p>
                              <p>เลขที่ประกาศ : {listValue.co_patent_numeral}</p>
                              <p>
                                <h>ผู้ยื่นขอจดทะเบียน : </h>
                                {listValue.co_patent_registered_name}
                              </p>
                              <p>เลขที่คำขอ : {listValue.co_patent_request}</p>
                              <p>ประเภทสิทธิบัตร : {listValue.patent_type? patent_type[listValue.patent_type] : " "}</p>
                              <p>ประเทศ : ไทย</p>
                              {/* <p>ประเทศ :{listValue.publication_country}</p> */}
                              เอกสาร :
                              {listValue.co_patent_documentation ? (
                                <Button>
                                  <a
                                    target="_blank"
                                    href={`https://researcher.kims-rmuti.com/file-upload/patent-upload/${listValue.co_patent_documentation}`}
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
                          </CardBody>
                        </Card>
                      </Col>
                    ))}
                    {/* {patentlist2.map((listValue) => (
                      <Col md="3" xs="12">
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
                            <Typography
                              style={{
                                color: "blue",
                                fontFamily: "Prompt",
                                height: 80,
                              }}
                            >
                              <p>ชื่อสิทธิบัตร : {listValue.patent_name_th}</p>
                            </Typography>

                            {listValue.patent_images ? (
                              <img
                                className="card-border"
                                style={{
                                  objectPosition: "center center",
                                  padding: 1,
                                  color: "black",
                                  fontFamily: "Prompt",
                                }}
                                height="180"
                                width="auto"
                                src={`https://researcher.kims-rmuti.com/file-upload/patent-upload/${listValue.patent_images}`}
                              />
                            ) : (
                              <img
                                className="card-border"
                                width="180px"
                                src={noImg}
                              />
                            )}

                            <Typography
                              style={{
                                textAlign: "left",
                                fontFamily: "Prompt",
                              }}
                            >
                              <br />
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
                                  : " "}
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
                          </CardBody>
                        </Card>
                      </Col>
                    ))} */}
                  </Row>
                )}
                {/* </Card> */}
              </div>
            </ThemeProvider>
          </Card>
        </div>
      </div>
    </body>
  );
}

export default withRouter(SearchPageCoRe);
