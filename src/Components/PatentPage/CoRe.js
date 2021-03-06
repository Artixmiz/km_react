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

import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import noImg from "../../images/no-image.png";

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
  const [patentlist1, setpatentlist1] = useState([]);
  const [Patentgroup1, setPatentgroup1] = useState([]);
  const [searchTitle1, setSearchTitle1] = useState("");

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

  const getPatentgroup1 = () => {
    axios
      .get(`${apiUrl}/api/get/us-patent/patent-type`)
      .then((res) => {
        setPatentgroup1(res.data);
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

    const params = getRequestParams(searchTitle1, patent);
    console.log(params);
    axios
      .get(`${apiUrl}/api/get/co-researcher/cooppatent/list`, { params })
      .then((res) => {
        console.log(res.data);
        // console.log(users);
        setpatentlist1(res.data);
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
    getPatentgroup1();
  }, []);

  const onChangeTitle = (e) => {
    setSearchTitle1(e.target.value);
  };

  const patent_type = {
    1: "????????????????????????????????????????????????????????????",
    2: "?????????????????????????????????????????????????????????????????????????????????",
    3: "????????????????????????????????????",
    4: "???????????????????????????",
    5: "???????????????????????????????????????????????????",
    6: "???????????????????????????????????????????????????",
    7: "???????????????????????????????????????????????????",
    8: "?????????????????????????????????????????????",
    9: "??????????????????????????????????????????????????????????????????",
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
                            label="???????????????????????????"
                            defaultValue="Default Value"
                            helperText="???????????????????????????????????????????????????????????????"
                            InputProps={{ style: { fontFamily: "Prompt" } }}
                            InputLabelProps={{
                              style: { fontFamily: "Prompt" },
                            }}
                            FormHelperTextProps={{
                              style: { fontFamily: "Prompt" },
                            }}
                            variant="standard"
                            value={searchTitle1}
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
                            helperText="??????????????????????????????????????????????????????????????????????????????"
                          >
                            <option value={""} style={{ fontFamily: "Prompt" }}>
                              ?????????????????????????????????
                            </option>
                            {Patentgroup1.map((option, i) => (
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
                            {!loading && "???????????????"}
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
                    ?????????????????????????????????
                  </p>
                ) : (
                  <Row>
                    {patentlist1.map((listValue) => (
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
                              <p>??????????????????????????????????????? : {listValue.co_patent_name_th}</p>
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
                                ???????????????????????????????????? :
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
                              <p>???????????????????????????????????? : {listValue.co_patent_numeral}</p>
                              <p>
                                <h>?????????????????????????????????????????????????????? : </h>
                                {listValue.co_patent_registered_name}
                              </p>
                              <p>?????????????????????????????? : {listValue.co_patent_request}</p>
                              <p>????????????????????????????????????????????? : {listValue.patent_type? patent_type[listValue.patent_type] : " "}</p>
                              <p>?????????????????? : ?????????</p>
                              {/* <p>?????????????????? :{listValue.publication_country}</p> */}
                              ?????????????????? :
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
