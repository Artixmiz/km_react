import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Container,
  IconButton,
  CircularProgress,
  InputLabel,
} from "@material-ui/core";
import { Dropdown, DropdownButton } from "react-bootstrap";
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  Label,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import React, { useCallback, useState, useMemo, useRef } from "react";
import { useEventHandlers } from "@react-leaflet/core";
import Leftbar from "./Leftbar";
import "./Css/Search.scss";
import "../index.css";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  Marker,
  CircleMarker,
  Popup,
  useMap,
  useMapEvent,
  Rectangle,
} from "react-leaflet";
import L from "leaflet";
import * as d3 from "d3";
import noImg from "../images/no-image.png";
import markerIconPng from "../images/icon.png";
import { Icon } from "leaflet";
import { withRouter } from "react-router";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import { BiInfoCircle } from "react-icons/bi";

import { useTranslation } from "react-i18next";
import D3Layer from "./D3LayerV1";

// import D3Layer from "./D3Layer";

function SearchPageProject(props) {
  const windowUrl = window.location.search;

  console.log(windowUrl);
  const parameter = new URLSearchParams(windowUrl);
  const checkproject = parameter.get("checkproject");
  const checkservice = parameter.get("checkservice");
  const checku2t = parameter.get("checku2t");

  const checkyear = parameter.get("year");

  const { locationSearch } = props;

  const { t } = useTranslation();

  const [projects, setProjects] = React.useState([]);
  const [searchTitle, setSearchTitle] = React.useState("");

  const [year, setYear] = React.useState(checkyear);

  const [message, setMessage] = React.useState("");
  const [selected1, setSelected1] = React.useState(1);
  const [selected2, setSelected2] = React.useState(2);
  const [selected5, setSelected5] = React.useState(5);
  const [loading, setLoading] = React.useState(false);

  const [check1, setcheck1] = React.useState(true);
  const [check2, setcheck2] = React.useState(true);
  const [check5, setcheck5] = React.useState(true);

  const [map1, setmap1] = React.useState([]);

  const handleChange = (event) => {
    setYear(event.target.value);
  };

  // const [previousValue] = React.useState([]);

  const apiUrl = "https://kmapi.kims-rmuti.com";
  const localUrl = "http://localhost:4000";

  const mapData = async () => {
    const response = await axios.get(
      `${localUrl}/api/get/visualize/map?academic=1&academic_service=2&academic_service_u2t=5&year=2565`
    );
    console.log(response.data);
    return response.data;
  };

  const mapDataCondition = async (
    type_project,
    type_service,
    type_u2t,
    year
  ) => {
    const response = await axios.get(
      `${apiUrl}/api/get/visualize/map?academic=${type_project}&academic_service=${type_service}&academic_service_u2t=${type_u2t}&year=${year}`
    );
    console.log(response.data);
    return response.data;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(check1, check2, check5);
    window.location.href = `/monitoring/map?checkproject=${check1}&checkservice=${check2}&checku2t=${check5}&year=${year}`;
  };

  const retrieveProjects = () => {
    setLoading(true);

    console.log(checkproject);
    console.log(checkservice);
    console.log(checku2t);

    const conboolean = (string) => JSON.parse(string);

    setcheck1(conboolean(checkproject));
    setcheck2(conboolean(checkservice));
    setcheck5(conboolean(checku2t));

    // if (
    //   conboolean(checkproject) == true &&
    //   conboolean(checkservice) == true &&
    //   conboolean(checku2t) == true
    // ) {
    //   let mapdata = mapData();
    //   setmap1(mapdata);
    //   setLoading(false);
    // } else {
    const mapdataCon = mapDataCondition(
      conboolean(checkproject) == true ? 1 : "",
      conboolean(checkservice) == true ? 2 : "",
      conboolean(checku2t) == true ? 5 : "",
      checkyear
    );
    setmap1(mapdataCon);
    setLoading(false);
    // }

    // if (check1 == true) {
    //   setmap1({ nodes: [], links: [] });
    // }
    // const params = getRequestParams(searchTitle, selected2, selected5);

    // axios
    //   .get(`${apiUrl}/api/get/map`)
    //   .then((res) => {
    //     setProjects(res.data);
    //   })
    //   .finally(() => {
    //     setMessage("");
    //     setLoading(false);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     setMessage(e.response.data.message);
    //   });
  };

  const mapRef = useRef();

  

  React.useEffect(() => {
    // window.location.href = `/monitoring?checkproject=${check1}&checkservice=${check2}&checku2t=${check5}`;
    retrieveProjects();
  }, []);

  const onChangeTitle = (e) => {
    setSearchTitle(e.target.value);
  };

  const handleChange1 = (event) => {
    // console.log(event.target.value);
    // console.log(check1);
    setcheck1(!check1);

    if (check1 == false) {
      setSelected1(1);
    }

    if (check1 == true) {
      setSelected1("");
      console.log(selected1);
    }
  };

  const handleChange2 = (event) => {
    // console.log(event.target.value);
    setcheck2(!check2);

    if (check2 == false) {
      setSelected2(2);
    }

    if (check2 == true) {
      setSelected2("");
      console.log(selected2);
    }
  };

  const handleChange5 = (event) => {
    // console.log(event.target.value);
    setcheck5(!check5);

    if (check5 == false) {
      setSelected5(5);
    }

    if (check5 == true) {
      setSelected5("");
      console.log(selected5);
    }
  };

  const prefix = {
    1: "งานวิจัย",
    2: "งานบริการวิชาการ",
  };

  return (
    <body className="bg">
      {/* <Box style={{ margin: "0px 0px 10px 200px" }}>
        <text
                style={{  fontFamily: "Prompt", fontSize: 50 ,fontWeight: "bold" ,color: "#FF9F45"}}
              >
                Knowledge & Innovation Management System
              </text>
      </Box> */}
      <div className="body-detail ">
        {/* <Box>
          <text
            style={{
              fontFamily: "Prompt",
              fontSize: 50,
              fontWeight: "bold",
              color: "white",
            }}
          >
            {t("title")}
          </text>
        </Box> */}
        <div className="">
          <Container maxWidth={false}>
            <Card
              className="box-shadow-right"
              style={{ backgroundColor: "#f6a834" }}
            >
              {/* <CardBody className="card-header-border">
                  <CardTitle
                    tag="h6"
                    style={{
                      marginBottom: -3,
                      fontFamily: "Prompt",
                      fontWeight: "bold",
                      color: "rgb(58, 58, 58)",
                    }}
                  >
                    ค้นหางานบริการวิชาการ
                  </CardTitle>
                </CardBody> */}
              <>
                <div className="" style={{ padding: 6 }}>
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": {
                        m: 0,
                        width: "100%",
                        // marginTop: "-10px",
                      },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div>
                      <Row className="align-items-center justify-content-md-center">
                        <Col md="6" xs="12">
                          {/* <TextField
                            id="standard-helperText"
                            label="ชื่องานวิจัย"
                            defaultValue="Default Value"
                            helperText="โปรดกรอกชื่องานวิจัย"
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
                          /> */}

                          <Form
                            id="outlined-multiline-flexible"
                            multiline
                            Input
                            type="checkbox"
                            InputLabelProps={{
                              style: { fontFamily: "Prompt" },
                            }}
                            InputProps={{ style: { fontFamily: "Prompt" } }}
                            FormHelperTextProps={{
                              style: { fontFamily: "Prompt" },
                            }}
                            label="ประเภทงานวิจัย"
                            // value={selected1}
                            // onChange={handleChange}
                            helperText="โปรดเลือก"
                          >
                            <FormGroup
                              check
                              inline
                              style={{ fontFamily: "Prompt", color: "white" }}
                            >
                              <div>
                                <img
                                  width="45"
                                  height="45"
                                  className="rounded-circle"
                                  aria-label="Placeholder: Image"
                                  preserveAspectRatio="xMidYMid slice"
                                  src={`https://researcher.kims-rmuti.com/icon/R.jpg`}
                                  style={{ padding: "11px" }}
                                />
                                <Input
                                  type="checkbox"
                                  onChange={handleChange1}
                                  value={selected1}
                                  checked={check1}
                                  style={{
                                    marginTop: "15px",
                                    // backgroundColor: "white",
                                  }}
                                />
                                {t("research.menu0")}
                              </div>
                            </FormGroup>
                            <FormGroup
                              check
                              inline
                              style={{ fontFamily: "Prompt", color: "white" }}
                            >
                              <div>
                                <img
                                  width="45"
                                  height="45"
                                  className="rounded-circle"
                                  aria-label="Placeholder: Image"
                                  preserveAspectRatio="xMidYMid slice"
                                  src={`https://researcher.kims-rmuti.com/icon/AS.jpg`}
                                  style={{ padding: "11px" }}
                                />
                                <Input
                                  type="checkbox"
                                  onChange={handleChange2}
                                  value={selected2}
                                  checked={check2}
                                  style={{
                                    marginTop: "15px",
                                  }}
                                />
                                {t("research.menu1")}
                              </div>
                            </FormGroup>

                            <FormGroup
                              check
                              inline
                              style={{ fontFamily: "Prompt", color: "white" }}
                            >
                              <div>
                                <Input
                                  type="checkbox"
                                  onChange={handleChange5}
                                  value={selected5}
                                  checked={check5}
                                  style={{
                                    marginTop: "15px",
                                  }}
                                />
                                <img
                                  width="45"
                                  height="45"
                                  className="rounded-circle"
                                  aria-label="Placeholder: Image"
                                  preserveAspectRatio="xMidYMid slice"
                                  src={`https://researcher.kims-rmuti.com/icon/U2T.jpg`}
                                  style={{ padding: "11px" }}
                                />
                                {t("research.menu2")}
                              </div>
                            </FormGroup>
                          </Form>
                        </Col>

                        <Col md="2" xs="6">
                          <select
                            className="form-select card-border"
                            aria-label="Default select example"
                            style={{
                              backgroundColor: "#ef7d05",
                              color: "white",
                              border: "0px solid black",
                            }}
                            onChange={handleChange}
                            value={year}
                          >
                            <option value="2565">ปี 2565</option>
                            <option value="2564">ปี 2564</option>
                            <option value="2563">ปี 2563</option>
                            <option value="2562">ปี 2562</option>
                            <option value="2561">ปี 2561</option>
                            <option value="2560">ปี 2560</option>
                            <option value="2559">ปี 2559</option>
                            <option value="2558">ปี 2558</option>
                          </select>
                        </Col>

                        <Col md="1" xs="6">
                          <Button
                            className="card-border"
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={onSubmit}
                            style={{
                              fontFamily: "Prompt",
                              width: "100%",
                              backgroundColor: "#ef7d05",
                            }}
                            size="medium"
                            disabled={loading}
                            startIcon={<FaSearch size={13} />}
                          >
                            {loading && <CircularProgress size={22} />}
                            {!loading && t("search")}
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </Box>
                </div>
              </>
            </Card>

            <Card
              className="map-border-frontpage"
              style={{ marginTop: "15px", fontFamily: "Prompt" }}
            >
              {/* <CardBody className="card-header-border">
                  <CardTitle tag="h6" style={{ fontWeight: "bold" }}>
                    แผนที่แสดงงานบริการวิชาการ / (U2T)
                  </CardTitle>
                </CardBody> */}

              <MapContainer
                center={[13, 105]}
                zoom={5}
                minZoom={3}
                maxZoom={21}
                ref={mapRef}
                // bounceAtZoomLimits={true}
                // maxBoundsViscosity={0.95}
                // maxBounds={[
                //   [-180, -90],
                //   [180, 90]
                // ]}
                // scrollWheelZoom={true}
                zoomControl={false}
                style={{
                  width: "100%",
                  height: "88vh",
                  margin: "0 auto",
                  borderRadius: "5px",
                }}
              >
                <TileLayer
                  // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <D3Layer location={map1}/>
              </MapContainer>
            </Card>
          </Container>
        </div>
      </div>
    </body>
  );
}

export default withRouter(SearchPageProject);
