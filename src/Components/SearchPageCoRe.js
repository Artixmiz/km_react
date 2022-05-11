/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-undef */
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
import React, { useCallback, useState, useMemo } from "react";
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
import { useEventHandlers } from "@react-leaflet/core";
import markerIconPng from "../images/icon.png";
import { Icon, popup } from "leaflet";
import { withRouter } from "react-router";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import { BiInfoCircle, BiLinkExternal } from "react-icons/bi";
import noImg from "../images/no-image.png";
import { useTranslation } from "react-i18next";

// Classes used by Leaflet to position controls
const POSITION_CLASSES = {
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right",
};

const BOUNDS_STYLE = { weight: 1 };

function MinimapBounds({ parentMap, zoom }) {
  const minimap = useMap();

  // Clicking a point on the minimap sets the parent's map center
  const onClick = useCallback(
    (e) => {
      parentMap.setView(e.latlng, parentMap.getZoom());
    },
    [parentMap]
  );
  useMapEvent("click", onClick);

  // Keep track of bounds in state to trigger renders
  const [bounds, setBounds] = useState(parentMap.getBounds());
  const onChange = useCallback(() => {
    setBounds(parentMap.getBounds());
    // Update the minimap's view to match the parent map's center and zoom
    minimap.setView(parentMap.getCenter(), zoom);
  }, [minimap, parentMap, zoom]);

  // Listen to events on the parent map
  const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), []);
  useEventHandlers({ instance: parentMap }, handlers);

  return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />;
}

function SearchPageCoRe(props) {
  // const onLanguageChanged = (event) => {
  //   let language = event.currentTarget.value;
  //   props.i18n.changeLanguage(language);
  // };

  const { t } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  // const { locationCo } = props;
  const [coResearchers, setCoResearchers] = React.useState([]);
  const [international, setInternational] = React.useState([]);
  const [national, setNational] = React.useState([]);

  const [searchTitle, setSearchTitle] = React.useState("");
  // const [groups, setGroups] = React.useState([
  //   { id: 1, name: "ชุมชน" },
  //   { id: 2, name: "หน่วยงานภาคธุรกิจ" },
  //   { id: 3, name: "หน่วยงานภาครัฐ" },
  // ]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const [selected, setSelected] = React.useState(1);
  const [selected1, setSelected1] = React.useState(2);
  const [selected2, setSelected2] = React.useState(3);
  const [selected7, setSelected7] = React.useState(7);
  const [selected8, setSelected8] = React.useState(8);

  const [check, setCheck] = React.useState(true);
  const [check1, setCheck1] = React.useState(true);
  const [check2, setCheck2] = React.useState(true);
  const [check7, setCheck7] = React.useState(true);
  const [check8, setCheck8] = React.useState(true);

  const [loading, setLoading] = React.useState(false);

  const [previousValue] = React.useState([]);

  const apiUrl = "https://kmapi.kims-rmuti.com";
  const localUrl = "http://localhost:4000";

  const getRequestParams = (
    title,
    group1,
    group2,
    group3,
    group7,
    group8,
    page
  ) => {
    let params = {};

    if (page) {
      params["page"] = page - 1;
    }

    if (group1) {
      params["groupOne"] = group1;
    } else {
      params["groupOne"] = "";
    }

    if (group2) {
      params["groupTwo"] = group2;
    } else {
      params["groupTwo"] = "";
    }

    if (group3) {
      params["groupThree"] = group3;
    } else {
      params["groupThree"] = "";
    }

    if (group7) {
      params["groupSeven"] = group7;
    } else {
      params["groupSeven"] = "";
    }

    if (group8) {
      params["group8"] = group8;
    } else {
      params["group8"] = "";
    }

    if (title != undefined) {
      params["title"] = title;
    }

    return params;
  };

  const retrieveCoResearchers = () => {
    setLoading(true);
    // previousValue.push(selected);

    // if (previousValue.length > 2) {
    //   previousValue.shift();
    // }
    // console.log(previousValue);

    const params = getRequestParams(
      searchTitle,
      selected,
      selected1,
      selected2,
      selected7,
      selected8,
      page
    );
    console.log(params);
    axios
      .get(`${apiUrl}/api/get/co-researchers`, { params })
      .then((res) => {
        // console.log(res.data);
        const { co_researchers } = res.data;

        // console.log(users);
        setCoResearchers(co_researchers);

        const inter = co_researchers.filter(
          (x) => x.co_researcher_group_id === selected8
        );

        const newInternation = inter.sort((x, y) => {
          return x.co_researcher_name_th.localeCompare(
            y.co_researcher_name_th,
            "en"
          );
        });

        setInternational(newInternation);

        const nation = co_researchers.filter(
          (x) => x.co_researcher_group_id !== selected8
        );

        const newNation = nation.sort((x, y) => {
          return x.co_researcher_name_th.localeCompare(
            y.co_researcher_name_th,
            "th"
          );
        });

        setNational(newNation);
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
        setPage(1);
        setCount(0);
        // setTimeout(() => {
        //   setMessage(e.response.data.message);
        // }, 500);
        setMessage(e.response.data.message);
      });
  };

  React.useEffect(() => {
    retrieveCoResearchers();
  }, []);

  const onChangeTitle = (e) => {
    setSearchTitle(e.target.value);
  };

  const handleChange = (event) => {
    setCheck(!check);

    if (check == false) {
      setSelected(1);
    }

    if (check == true) {
      setSelected("");
      console.log(null);
    }
  };

  const handleChange1 = (event) => {
    setCheck1(!check1);

    if (check1 == false) {
      setSelected1(2);
    }

    if (check1 == true) {
      setSelected1("");
      console.log(null);
    }
  };

  const handleChange2 = (event) => {
    setCheck2(!check2);

    if (check2 == false) {
      setSelected2(3);
    }

    if (check2 == true) {
      setSelected2("");
      console.log(null);
    }
  };

  const handleChange7 = (event) => {
    setCheck7(!check7);

    if (check7 == false) {
      setSelected7(7);
    }

    if (check7 == true) {
      setSelected7("");
      console.log(null);
    }
  };

  const handleChange8 = (event) => {
    setCheck8(!check8);

    if (check8 == false) {
      setSelected8(8);
    }

    if (check8 == true) {
      setSelected8("");
      console.log(null);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // React.useEffect(() => {
  //   retrieveCoResearchers();
  // }, [page]);

  const prefix = {
    1: "ชุมชน",
    2: "หน่วยงานภาคธุรกิจ",
    3: "หน่วยงานภาครัฐ",
  };

  function MinimapControl({ position, zoom }) {
    const parentMap = useMap();
    const mapZoom = zoom || 0;

    // Memoize the minimap so it's not affected by position changes
    const minimap = useMemo(
      () => (
        <MapContainer
          style={{ height: 120, width: 200 }}
          center={parentMap.getCenter()}
          zoom={mapZoom}
          dragging={false}
          doubleClickZoom={false}
          scrollWheelZoom={false}
          attributionControl={false}
          zoomControl={false}
        >
          {coResearchers.map((p) => (
            <CircleMarker
              // key={index}
              center={[
                p.co_researcher_latitude ? p.co_researcher_latitude : 15,
                p.co_researcher_longitude ? p.co_researcher_longitude : 102,
              ]}
              // radius={10}
              opacity={0}
            >
              <Marker
                position={[
                  p.co_researcher_latitude ? p.co_researcher_latitude : 15,
                  p.co_researcher_longitude ? p.co_researcher_longitude : 102,
                ]}
                icon={
                  new Icon({
                    iconUrl:
                      p.co_researcher_group_id == 1
                        ? `https://researcher.kims-rmuti.com/file-upload/co_researcher-upload/${p.co_researcher_image}`
                        : // "https://cdn-icons-png.flaticon.com/512/1458/1458500.png"
                        p.co_researcher_group_id == 2
                        ? `https://researcher.kims-rmuti.com/file-upload/co_researcher-upload/${p.co_researcher_image}`
                        : p.co_researcher_group_id == 3
                        ? `https://researcher.kims-rmuti.com/file-upload/co_researcher-upload/${p.co_researcher_image}`
                        : p.co_researcher_group_id == 7
                        ? `https://researcher.kims-rmuti.com/file-upload/co_researcher-upload/${p.co_researcher_image}`
                        : p.co_researcher_group_id == 8
                        ? `https://researcher.kims-rmuti.com/file-upload/co_researcher-upload/${p.co_researcher_image}`
                        : "https://images.vexels.com/media/users/3/140527/isolated/preview/449b95d58f554656b159dd3ca21ab123-home-round-icon.png",
                    iconSize: [10, 11],
                    // iconAnchor: [19, 0],
                    className: "minimap-image-icon",
                  })
                }
              >
                <IconButton
                  color="primary"
                  aria-label="view info co"
                  style={{
                    marginTop: "10px",
                    fontFamily: "Prompt",
                    fontSize: "15px",
                  }}
                ></IconButton>
              </Marker>
            </CircleMarker>
          ))}

          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
        </MapContainer>
      ),
      []
    );

    const positionClass =
      (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;
    return (
      <div className={positionClass}>
        <div className="leaflet-control leaflet-bar">{minimap}</div>
      </div>
    );
  }

  return (
    <body className="bg">
      <div className="body-detail ">
        {/* <Box>
          <text
            style={{
              fontFamily: "Prompt",
              fontSize: 50,
              fontWeight: "bold",
              color: "#FF9F45",
              textSizeAdjust: "initial",
            }}
          >
            {t("title")}
          </text>
        </Box> */}

        <div className="">
          <div style={{ padding: "0px 10px 0px 10px" }}>
            <Card className="card-border">
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
                  <div align="right">
                    <button
                      className=""
                      style={{
                        marginRight: "5px",
                        cursor: "pointer",
                        marginBottom: "0",
                      }}
                      onClick={() => changeLanguage("th")}
                    >
                      TH
                    </button>
                    <button
                      className=""
                      style={{
                        marginRight: "5px",
                        cursor: "pointer",
                        marginBottom: "0",
                      }}
                      onClick={() => changeLanguage("en")}
                    >
                      EN
                    </button>
                  </div>
                  ศักยภาพความร่วมมือกับเครือข่าย มทร.อีสาน
                </CardTitle>
              </CardBody> */}
              <CardBody>
                <div className="">
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": {
                        m: 2,
                        width: "100%",
                        marginTop: "-20px",
                      },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div>
                      <Row className="align-items-center justify-content-md-center">
                        <Col md="7" xs="12">
                          <TextField
                            id="standard-helperText"
                            label={t('community.menu7')}
                            defaultValue="Default Value"
                            helperText={t('community.menu6')}
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
                          <Form
                            id="outlined-multiline-flexible"
                            multiline
                            Input
                            type="checkbox"
                            select
                            InputLabelProps={{
                              style: { fontFamily: "Prompt" },
                            }}
                            InputProps={{ style: { fontFamily: "Prompt" } }}
                            FormHelperTextProps={{
                              style: { fontFamily: "Prompt" },
                            }}
                            label="ประเภทหน่วยงาน"
                            // value={selected}
                            // onChange={handleChange}
                            helperText="โปรดเลือก"
                          >
                            {/* {groups.map((value, index) => {
                            return ( */}
                            <FormGroup
                              check
                              inline
                              style={{ fontFamily: "Prompt" }}
                            >
                              <div>
                                <Input
                                  type="checkbox"
                                  onChange={handleChange}
                                  value={selected}
                                  checked={check}
                                />

                                {t("community.menu1")}
                              </div>
                            </FormGroup>

                            <FormGroup
                              check
                              inline
                              style={{ fontFamily: "Prompt" }}
                            >
                              <div>
                                <Input
                                  type="checkbox"
                                  onChange={handleChange1}
                                  value={selected1}
                                  checked={check1}
                                />
                                {t("community.menu2")}
                              </div>
                            </FormGroup>

                            <FormGroup
                              check
                              inline
                              style={{ fontFamily: "Prompt" }}
                            >
                              <div>
                                <Input
                                  type="checkbox"
                                  onChange={handleChange2}
                                  value={selected2}
                                  checked={check2}
                                />
                              </div>
                              {t("community.menu3")}
                            </FormGroup>

                            <FormGroup
                              check
                              inline
                              style={{ fontFamily: "Prompt" }}
                            >
                              <div>
                                <Input
                                  type="checkbox"
                                  onChange={handleChange7}
                                  value={selected7}
                                  checked={selected7}
                                />
                                {t("community.menu4")}
                              </div>
                            </FormGroup>
                            {/* );
                          })} */}

                            <FormGroup
                              check
                              inline
                              style={{ fontFamily: "Prompt" }}
                            >
                              <div>
                                <Input
                                  type="checkbox"
                                  onChange={handleChange8}
                                  value={selected8}
                                  checked={selected8}
                                />
                                {t("community.menu5")}
                              </div>
                            </FormGroup>
                          </Form>
                        </Col>

                        <Col md="1" xs="12">
                          <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={retrieveCoResearchers}
                            style={{ fontFamily: "Prompt", width: "100%" }}
                            disabled={loading}
                            type="submit"
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
              </CardBody>
            </Card>

            <Card
              className="card-border"
              style={{ marginTop: "15px", fontFamily: "Prompt" }}
            >
              {/* <CardBody className="card-header-border">
                <CardTitle tag="h6" style={{ fontWeight: "bold" }}>
                  แผนที่แสดงที่ตั้งหน่วยงาน
                </CardTitle>
              </CardBody> */}

              <Row noGutters={true}>
                <Col md={8}>
                  <MapContainer
                    center={[13, 102]}
                    zoom={6}
                    // scrollWheelZoom={true}
                    zoomControl={false}
                    minZoom={3}
                    maxZoom={21}
                    style={{
                      width: "100%",
                      height: "100%",
                      margin: "0 auto",
                      // borderRadius: "5px",
                    }}
                  >
                    <TileLayer
                      // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {!message
                      ? coResearchers.map((p, index) => {
                          return (
                            <CircleMarker
                              key={index}
                              center={[
                                p.co_researcher_latitude
                                  ? p.co_researcher_latitude
                                  : 15,
                                p.co_researcher_longitude
                                  ? p.co_researcher_longitude
                                  : 102,
                              ]}
                              // radius={10}
                              opacity={0}
                            >
                              <Marker
                                position={[
                                  p.co_researcher_latitude
                                    ? p.co_researcher_latitude
                                    : 15,
                                  p.co_researcher_longitude
                                    ? p.co_researcher_longitude
                                    : 102,
                                ]}
                                icon={
                                  new Icon({
                                    iconUrl:
                                      p.co_researcher_group_id == 1
                                        ? `https://researcher.kims-rmuti.com/file-upload/co_researcher-upload/${p.co_researcher_image}`
                                        : // "https://cdn-icons-png.flaticon.com/512/1458/1458500.png"
                                        p.co_researcher_group_id == 2
                                        ? `https://researcher.kims-rmuti.com/file-upload/co_researcher-upload/${p.co_researcher_image}`
                                        : p.co_researcher_group_id == 3
                                        ? `https://researcher.kims-rmuti.com/file-upload/co_researcher-upload/${p.co_researcher_image}`
                                        : p.co_researcher_group_id == 7
                                        ? `https://researcher.kims-rmuti.com/file-upload/co_researcher-upload/${p.co_researcher_image}`
                                        : p.co_researcher_group_id == 8
                                        ? `https://researcher.kims-rmuti.com/file-upload/co_researcher-upload/${p.co_researcher_image}`
                                        : "https://images.vexels.com/media/users/3/140527/isolated/preview/449b95d58f554656b159dd3ca21ab123-home-round-icon.png",
                                    iconSize: [26, 26],
                                    // iconAnchor: [19, 0],
                                    className: "image-icon",
                                  })
                                }
                              >
                                <Popup>
                                  <CardTitle class="tip__container">
                                    <text
                                      style={{
                                        marginTop: "10px",
                                        fontFamily: "Prompt",
                                        fontSize: "15px",
                                      }}
                                    >
                                      {p.co_researcher_name_th}
                                    </text>
                                    <hr />

                                    <img
                                      style={{
                                        objectPosition: "center ",
                                      }}
                                      width="150px"
                                      height="100px"
                                      src={
                                        p.co_researcher_image
                                          ? `https://researcher.kims-rmuti.com/file-upload/co_researcher-upload/${p.co_researcher_image}`
                                          : noImg
                                      }
                                    />
                                    <hr />
                                    <IconButton
                                      color="primary"
                                      aria-label="view info co"
                                      onClick={() => {
                                        console.log(
                                          "test" + p.co_researcher_id
                                        );
                                        props.history.push({
                                          pathname: "/CoResearcher",
                                          search: `?co_researcher_id=${btoa(
                                            p.co_researcher_id
                                          )}`,
                                        });
                                      }}
                                      style={{
                                        marginTop: "10px",
                                        fontFamily: "Prompt",
                                        fontSize: "15px",
                                      }}
                                    >
                                      รายละเอียดเพิ่มเติม{" "}
                                      <BiInfoCircle size={18} />
                                    </IconButton>
                                  </CardTitle>
                                </Popup>
                              </Marker>
                            </CircleMarker>
                          );
                        })
                      : null}
                    <MinimapControl position="topright" />
                  </MapContainer>
                </Col>
                <Col md={4}>
                  <div className="main-list">
                    <Card className="pt-2 mt-3 me-2">
                      <Row
                        style={{ width: "100%" }}
                        className=" align-items-center justify-content-md-center"
                      >
                        <Col md="6">
                          <h6>เครือข่ายระดับชาติ</h6>
                        </Col>
                        <Col md="4">
                          <p>จำนวน {national.length} รายการ</p>
                        </Col>
                      </Row>
                    </Card>

                    {national.length ? (
                      <div className="list">
                        {national.map((v) => (
                          <div className="link_feature">
                            <a
                              href={`CoResearcher?co_researcher_id=${btoa(
                                v.co_researcher_id
                              )}`}
                              className="linkexternal"
                            >
                              <Row
                                className="p-2 align-items-center justify-content-md-center"
                                style={{ width: "100%" }}
                              >
                                <Col md="2">
                                  <img
                                    className="rounded-circle mx-auto d-block"
                                    width={40}
                                    height={40}
                                    src={
                                      v.co_researcher_image
                                        ? `https://researcher.kims-rmuti.com/file-upload/co_researcher-upload/${v.co_researcher_image}`
                                        : noImg
                                    }
                                  />
                                </Col>
                                <Col md="9">{v.co_researcher_name_th}</Col>
                                <Col md="1">
                                  <BiLinkExternal size={20} />
                                </Col>
                              </Row>
                            </a>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="list pt-4">ไม่พบข้อมูล</div>
                    )}

                    <hr />
                    <Card className="pt-2 mt-3 me-2">
                      <Row
                        style={{ width: "100%" }}
                        className="p-1 align-items-center justify-content-md-center"
                      >
                        <Col md="6">
                          <h6>เครือข่ายระดับนานาชาติ</h6>
                        </Col>
                        <Col md="4">
                          <p>จำนวน {international.length} รายการ</p>
                        </Col>
                      </Row>
                    </Card>

                    {international.length ? (
                      <div className="list">
                        {international.map((v) => (
                          <div className="link_feature">
                            <a
                              href={`CoResearcher?co_researcher_id=${btoa(
                                v.co_researcher_id
                              )}`}
                              className="linkexternal"
                            >
                              <Row
                                className="p-2 align-items-center justify-content-md-center"
                                style={{ width: "100%" }}
                              >
                                <Col md="2">
                                  <img
                                    className="rounded-circle mx-auto d-block"
                                    width={40}
                                    height={40}
                                    src={
                                      v.co_researcher_image
                                        ? `https://researcher.kims-rmuti.com/file-upload/co_researcher-upload/${v.co_researcher_image}`
                                        : noImg
                                    }
                                  />
                                </Col>
                                <Col md="9">{v.co_researcher_name_th}</Col>
                                <Col md="1">
                                  <BiLinkExternal size={20} />
                                </Col>
                              </Row>
                            </a>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="list pt-4">ไม่พบข้อมูล</div>
                    )}
                  </div>
                </Col>
              </Row>
            </Card>

            {/*<Card
              style={{ marginTop: "15px", fontFamily: "Prompt" }}
              className="card-border"
            > 
              <CardBody>
                {(() => {
                  if (message) {
                    return (
                      <Table hover responsive>
                        <thead>
                          <tr>
                            <th>รูปหน่วยงาน</th>
                            <th>ประเภทหน่วยงาน</th>
                            <th>ชื่อหน่วยงาน</th>
                            <th>ตำแหน่งที่ตั้ง</th>
                            <th>ดูข้อมูล</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan="5" style={{ padding: "20px" }}>
                              No Data Available
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    );
                  } else {
                    return (
                      <Table hover responsive>
                        <thead>
                          <tr>
                            <th>รูปหน่วยงาน</th>
                            <th>ประเภทหน่วยงาน</th>
                            <th>ชื่อหน่วยงาน</th>
                            <th>ตำแหน่งที่ตั้ง</th>
                            <th>ดูข้อมูล</th>
                          </tr>
                        </thead>
                        <tbody>
                          {coResearchers &&
                            coResearchers.map((co, index) => {
                              return (
                                <tr>
                                  <td valign="middle">
                                    <img
                                      style={{
                                        objectFit: "cover",
                                        objectPosition: "center top",
                                      }}
                                      className="rounded-circle"
                                      width="90px"
                                      height="90px"
                                      src={
                                        co.co_researcher_image
                                          ? `https://www.km-innovations.rmuti.ac.th/researcher/file-upload/co_researcher-upload/${co.co_researcher_image}`
                                          : noImg
                                      }
                                    />
                                  </td>

                                  <td valign="middle">
                                    {prefix[co.co_researcher_group_id]}
                                  </td>
                                  <td
                                    valign="middle"
                                    style={{ fontFamily: "Prompt" }}
                                  >
                                    {co.co_researcher_name_th}
                                  </td>
                                  <td valign="middle">
                                    <MapContainer
                                      center={[
                                        co.co_researcher_latitude
                                          ? co.co_researcher_latitude
                                          : 15,
                                        co.co_researcher_longitude
                                          ? co.co_researcher_longitude
                                          : 102,
                                      ]}
                                      zoom={4}
                                      // scrollWheelZoom={true}
                                      zoomControl={false}
                                      style={{
                                        width: "220px",
                                        margin: "0 auto",
                                        height: "90px",
                                        borderRadius: "5px",
                                      }}
                                    >
                                      <TileLayer
                                        // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                      />
                                      {co.co_researcher_latitude &&
                                      co.co_researcher_longitude ? (
                                        <CircleMarker
                                          key={index}
                                          center={[
                                            co.co_researcher_latitude
                                              ? co.co_researcher_latitude
                                              : 15,
                                            co.co_researcher_longitude
                                              ? co.co_researcher_longitude
                                              : 102,
                                          ]}
                                          // radius={10}
                                          opacity={0}
                                        >
                                          <Marker
                                            position={[
                                              co.co_researcher_latitude
                                                ? co.co_researcher_latitude
                                                : 15,
                                              co.co_researcher_longitude
                                                ? co.co_researcher_longitude
                                                : 102,
                                            ]}
                                            icon={
                                              new Icon({
                                                iconUrl:
                                                  co.co_researcher_group_id == 1
                                                    ? "data:image/png;base64,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"
                                                    : // "https://cdn-icons-png.flaticon.com/512/1458/1458500.png"
                                                    co.co_researcher_group_id ==
                                                      2
                                                    ? "https://jobspola.lk/src/company/default.png"
                                                    : co.co_researcher_group_id ==
                                                      3
                                                    ? "https://cdn2.iconfinder.com/data/icons/gradient-circle/36/2206-512.png"
                                                    : "https://images.vexels.com/media/users/3/140527/isolated/preview/449b95d58f554656b159dd3ca21ab123-home-round-icon.png",
                                                iconSize: [40, 41],
                                                // iconAnchor: [19, 0],
                                                className: "image-icon",
                                              })
                                            }
                                          ></Marker>
                                        </CircleMarker>
                                      ) : null}
                                    </MapContainer>
                                  </td>
                                  <td valign="middle">
                                    <IconButton
                                      color="primary"
                                      aria-label="view info co"
                                      onClick={() => {
                                        console.log(
                                          "test" + co.co_researcher_id
                                        );
                                        props.history.push({
                                          pathname: "/CoResearcher",
                                          search: `?co_researcher_id=${co.co_researcher_id}`,
                                        });
                                      }}
                                    >
                                      <BiInfoCircle size={40} />
                                    </IconButton>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </Table>
                    );
                  }
                })()}
                <Row className="align-items-center justify-content-md-center">
                  <Col md="5" xs="5">
                    <div
                      style={{
                        textAlign: "left",
                        paddingRight: "8px",
                        fontSize: "0.9rem",
                      }}
                    >
                      Page :<strong> {page} </strong> of{" "}
                      <strong>{count} </strong>
                    </div>
                  </Col>
                  <Col md="7" xs="7">
                    <div style={{ marginLeft: "auto", marginRight: "0" }}>
                      <Pagination
                        // className="my-3 "
                        style={{
                          display: "flex",
                          justifyContent: "right",
                        }}
                        count={count}
                        page={page}
                        color="primary"
                        siblingCount={1}
                        boundaryCount={2}
                        variant="outlined"
                        shape="rounded"
                        onChange={handlePageChange}
                      />
                    </div>
                  </Col>
                </Row>
              </CardBody>
                      </Card> */}
          </div>
        </div>
      </div>
    </body>
  );
}

export default withRouter(SearchPageCoRe);
