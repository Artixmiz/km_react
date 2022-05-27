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
import { Accordion } from "react-bootstrap";
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

  const [count_in_country, setcount_in_country] = React.useState(0);
  const [count_out_country, setcount_out_country] = React.useState(0);
  const [count_co, setcount_co] = React.useState(0);

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
        setcount_in_country(res.data.count_in_country);
        setcount_out_country(res.data.count_out_country);
        setcount_co(res.data.count_co);

        // console.log(res.data);
        // const { co_researchers } = res.data.co_nation.data;

        // // console.log(users);
        // setCoResearchers(co_researchers);

        // const inter = co_researchers.filter(
        //   (x) => x.co_researcher_group_id === selected8
        // );

        // const newInternation = inter.sort((x, y) => {
        //   return x.co_researcher_name_th.localeCompare(
        //     y.co_researcher_name_th,
        //     "en"
        //   );
        // });

        // setInternational(newInternation);

        // const nation = co_researchers.filter(
        //   (x) => x.co_researcher_group_id !== selected8
        // );

        // const newNation = nation.sort((x, y) => {
        //   return x.co_researcher_name_th.localeCompare(
        //     y.co_researcher_name_th,
        //     "th"
        //   );
        // });

        setNational(res.data.co_nation);
        setInternational(res.data.co_inter);
        console.log("test:", national);
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
        //setMessage(e.response.data.message);
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

  console.log("test:2223g ", national);
  return (
    <body className="bg">
      <div className="body-detail ">
        <div className="">
          <div>
            <Container maxWidth={false}>
              <Card
                className="card-border"
                style={{ backgroundColor: "#f6a834", borderRadius: "15px" }}
              >
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
                              label={t("community.menu7")}
                              defaultValue="Default Value"
                              helperText={t("community.menu6")}
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
                              style={{
                                fontFamily: "Prompt",
                                width: "100%",
                                backgroundColor: "rgb(239, 125, 5)",
                              }}
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
              <div className="card-searcher">
                <Row noGutters={true}>
                  <Col sm={12}>
                    <Card
                      className="card-border"
                      style={{
                        marginTop: "10px",
                        fontFamily: "Prompt",
                        borderRadius: "15px",
                        boxShadow: "none",
                        border: "none",
                      }}
                    >
                      <MapContainer
                        center={[13, 102]}
                        zoom={6}
                        // scrollWheelZoom={true}
                        minZoom={3}
                        maxZoom={21}
                        zoomControl={false}
                        style={{
                          width: "100%",
                          minHeight: "450px",
                          height: "65vh",
                          margin: "0",
                          zIndex: "0",
                          borderRadius: "15px",
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
                    </Card>
                  </Col>
                  <Col sm={12}>
                    <div
                      className="dashboard"
                      style={{ marginTop: "-4.5rem", marginBottom: "-1rem" }}
                    >
                      <div className="all-card">
                        <Row>
                          <Col>
                            <div className="card">
                              <div className="card-body ">
                                <h5 className="card-title text-title">
                                  เครือข่ายทั้งหมด
                                </h5>
                                <h2 className="card-text text-amount">
                                  {count_co} เครือข่าย
                                </h2>
                              </div>
                            </div>
                          </Col>
                          <Col>
                            <div className="card">
                              <div className="card-body ">
                                <h5 className="card-title text-title">
                                  เครือข่ายระดับชาติ
                                </h5>
                                <h2 className="card-text text-amount">
                                  {count_in_country} เครือข่าย
                                </h2>
                              </div>
                            </div>
                          </Col>
                          <Col>
                            <div className="card">
                              <div className="card-body ">
                                <h5 className="card-title text-title">
                                  เครือข่ายระดับนานาชาติ
                                </h5>
                                <h2 className="card-text text-amount">
                                  {count_out_country} เครือข่าย{" "}
                                </h2>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                  <Col md={12} style={{ padding: "0 1rem 0 3rem" }}>
                    <Accordion
                      style={{ padding: "10px 25px 0 25px" }}
                      className="bg-title"
                      defaultActiveKey="0"
                    >
                      <Accordion.Item
                        eventKey="0"
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                      >
                        <Accordion.Header>
                          <h2
                            style={{
                              textAlign: "left",
                              color: "#fff",
                              fontWeight: "600",
                              marginBottom: "2rem",
                            }}
                          >
                            งานวิจัยมหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน
                          </h2>
                        </Accordion.Header>
                        <Accordion.Body>
                          <Row style={{ paddingLeft: "1rem" }}>
                            <Col
                              xs
                              sm={12}
                              md
                              lg={6}
                              xl={6}
                              xxl={4}
                              style={{ paddingBottom: "1.5rem" }}
                            >
                              <div
                                className="card-university"
                                style={{
                                  backgroundColor: "#fff",
                                  borderRadius: "15px",
                                }}
                              >
                                <div
                                  className="card-header"
                                  style={{
                                    padding: "1.5rem 1.5rem 0px",
                                    borderRadius: "15px  15px 0 0",
                                  }}
                                >
                                  <h5>เครือข่ายระดับชาติ</h5>
                                  <p
                                    style={{
                                      textAlign: "left",
                                      marginTop: "0.5rem",
                                      marginBottom: "0.5rem",
                                    }}
                                  >
                                    จำนวน {national.length} โครงการ
                                  </p>
                                </div>
                                <div className="card-university-body">
                                  {national.length ? (
                                    <div className="list">
                                      {national
                                        .sort((x, y) =>
                                          x.co_researcher_name_th.localeCompare(
                                            y.co_researcher_name_th,
                                            "th"
                                          )
                                        )
                                        .map((listdata) => (
                                          <div className="link_feature">
                                            <a
                                              href={`CoResearcher?co_researcher_id=${btoa(
                                                listdata.co_researcher_id
                                              )}`}
                                              className="linkexternal"
                                            >
                                              <Row
                                                className="p-2 align-items-center justify-content-md-center "
                                                style={{
                                                  width: "100%",
                                                }}
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="bottom"
                                                title={
                                                  listdata.co_researcher_name_th
                                                }
                                              >
                                                <Col md="2">
                                                  <img
                                                    className="rounded-circle mx-auto d-block"
                                                    width={40}
                                                    height={40}
                                                    src={
                                                      listdata.co_researcher_image
                                                        ? `https://researcher.kims-rmuti.com/file-upload/co_researcher-upload/${listdata.co_researcher_image}`
                                                        : noImg
                                                    }
                                                  />
                                                </Col>
                                                <Col md="10">
                                                  <text>
                                                    {
                                                      listdata.co_researcher_name_th
                                                    }
                                                  </text>
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
                              </div>
                            </Col>
                            <Col
                              xs
                              sm={12}
                              md
                              lg={6}
                              xl={6}
                              xxl={4}
                              style={{ paddingBottom: "1.5rem" }}
                            >
                              <div
                                className="card-university"
                                style={{
                                  backgroundColor: "#fff",
                                  borderRadius: "15px",
                                }}
                              >
                                <div
                                  className="card-header"
                                  style={{
                                    padding: "1.5rem 1.5rem 0px",
                                    borderRadius: "15px  15px 0 0",
                                  }}
                                >
                                  <h5>เครือข่ายระดับนานาชาติ</h5>
                                  <p
                                    style={{
                                      textAlign: "left",
                                      marginTop: "0.5rem",
                                      marginBottom: "0.5rem",
                                    }}
                                  >
                                    จำนวน {international.length} โครงการ
                                  </p>
                                </div>
                                <div className="card-university-body">
                                  {international.length ? (
                                    <div className="list">
                                      {international
                                        .sort((x, y) =>
                                          x.co_researcher_name_th.localeCompare(
                                            y.co_researcher_name_th,
                                            "th"
                                          )
                                        )
                                        .map((listdata) => (
                                          <div className="link_feature">
                                            <a
                                              href={`CoResearcher?co_researcher_id=${btoa(
                                                listdata.co_researcher_id
                                              )}`}
                                              className="linkexternal"
                                            >
                                              <Row
                                                className="p-2 align-items-center justify-content-md-center "
                                                style={{
                                                  width: "100%",
                                                }}
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="bottom"
                                                title={
                                                  listdata.co_researcher_name_th
                                                }
                                              >
                                                <Col md="2">
                                                  <img
                                                    className="rounded-circle mx-auto d-block"
                                                    width={40}
                                                    height={40}
                                                    src={
                                                      listdata.co_researcher_image
                                                        ? `https://researcher.kims-rmuti.com/file-upload/co_researcher-upload/${listdata.co_researcher_image}`
                                                        : noImg
                                                    }
                                                  />
                                                </Col>
                                                <Col md="10">
                                                  <text>
                                                    {
                                                      listdata.co_researcher_name_th
                                                    }
                                                  </text>
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
                              </div>
                            </Col>

                            {/* {national.length ? (
                              <>
                                {national
                                  .sort((x, y) =>
                                    x.co_researcher_name_th.localeCompare(
                                      y.co_researcher_name_th,
                                      "th"
                                    )
                                  )
                                  .map((list) => (
                                   
                                  ))}
                              </>
                            ) : (
                              <div className="pt-4">ไม่พบข้อมูล34</div>
                            )} */}
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Col>
                </Row>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </body>
  );
}

export default withRouter(SearchPageCoRe);
