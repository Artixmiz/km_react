import React, { useCallback, useState, useMemo } from "react";
import { useEventHandlers } from "@react-leaflet/core";
import {
  Box,
  TextField,
  Button,
  Container,
  Select,
  MenuItem,
  CircularProgress,
  TablePagination,
  IconButton,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import "./Css/Search.scss";

import { Icon } from "leaflet";

import L from "leaflet";
import D3Layer from "./D3Layer";

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

import MarkerClusterGroup from "react-leaflet-markercluster";

import { Card,Row, Col } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import noImg from "../images/no-image.png";
import { BiInfoCircle, BiLinkExternal } from "react-icons/bi";
import { withRouter } from "react-router";

import { useTranslation } from "react-i18next";

import "./Css/searchresearcher.scss";

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

const SearchPageResearch = (props) => {
  const { t } = useTranslation();
  const [universitys, setUniversitys] = React.useState([]);
  const [other_universitys, setother_universitys] = React.useState([]);

  const [count_researcher, setcount_researcher] = React.useState(0);
  const [count_in_country, setcount_in_country] = React.useState(0);
  const [count_out_country, setcount_out_country] = React.useState(0);
  const [count_rmuti_university, setcount_rmuti_university] = React.useState(0);
  const [count_other_university, setcount_other_university] = React.useState(0);

  const [locationUniversity, setLocationUniversity] = useState([]);
  const [searchFname, setSearchFname] = React.useState("");
  const [searchLname, setSearchLname] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [map, setMap] = React.useState([]);

  const apiUrl = "https://kmapi.kims-rmuti.com";
  const localUrl = "http://localhost:4000";

  const createClusterCustomIcon = (cluster) => {
    const count = cluster.getChildCount();
    let size = "LargeXL";
    let iconSize = 70;

    if (cluster && count > 2) {
      L.polygon(cluster.getConvexHull());
    }

    if (count < 10) {
      size = "Small";
      iconSize = 80;
    } else if (count >= 10 && count < 100) {
      size = "Medium";
      iconSize = 90;
    } else if (count >= 100 && count < 500) {
      size = "Large";
      iconSize = 100;
    }
    const options = {
      cluster: `markerCluster${size}`,
      isize: iconSize,
    };

    return L.divIcon({
      html: `<div>
          <span class="markerClusterLabel">${count}</span>
        </div>`,
      className: `${options.cluster}`,
      iconSize: L.point(options.isize, options.isize, true),
    });
  };

  const getRequestParams = (fname, lname) => {
    let params = {};

    // if (page) {
    //   params["page"] = page - 1;
    // }

    // if (group) {
    //   params["group"] = group;
    // }

    if (fname != undefined) {
      params["fname"] = fname;
    }

    if (lname != undefined) {
      params["lname"] = lname;
    }

    return params;
  };

  // const retrieveUserGroups = () => {
  //   axios
  //     .get(`${apiUrl}/api/get/user-group`)
  //     .then((res) => {
  //       setGroup(res.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  const mapData = async (params) => {
    const response = await axios.get(`${apiUrl}/api/get/bb-user`, { params });
    console.log(response.data.map);
    return response.data.map;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // const params = getRequestParams(searchFname, searchLname);
    window.location.href = `/monitoring/SearchResearcher?fname=${
      searchFname == null ? "" : searchFname
    }&lname=${searchLname == null ? "" : searchLname}`;
  };

  const retrieveUsers = () => {
    setLoading(true);
    const windowUrl = window.location.search;
    const parameter = new URLSearchParams(windowUrl);
    const fname = parameter.get("fname");
    const lname = parameter.get("lname");

    setSearchFname(fname);
    setSearchLname(lname);
    // console.log(fname);
    // previousValue.push(selected);

    // if (previousValue.length > 2) {
    //   previousValue.shift();
    // }
    // console.log(previousValue);

    // setMap(mapData());
    // if(map){
    //   setLoading(false);
    // }
    const params = getRequestParams(fname, lname);

    let mapdata = mapData(params);

    setMap(mapdata);

    axios
      .get(`${apiUrl}/api/get/bb-user`, { params })
      .then((res) => {
        console.log("test1:", res.data);
        // setdata_researcher(res.data);
        // console.log("test:data: ", data_researcher);
        setcount_researcher(res.data.count_researcher);
        setcount_in_country(res.data.count_in_country);
        setcount_out_country(res.data.count_out_country);
        setcount_rmuti_university(res.data.count_rmuti_university);
        setcount_other_university(res.data.count_other_university);

        setUniversitys(res.data.rmuti_universitys);
        setother_universitys(res.data.other_universitys);
        setLocationUniversity(res.data.university_location);
      })
      .finally(() => {
        setMessage("");
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setMessage(e.response.data.message);
      });
  };

  React.useEffect(() => {
    // retrieveUserGroups();
    retrieveUsers();
    // setMap(mapData());
  }, []);

  // React.useEffect(() => {
  //   retrieveUsers();
  // }, [map]);
  //

  const onChangeSearchFname = (e) => {
    setSearchFname(e.target.value);
  };

  const onChangeSearchLname = (e) => {
    setSearchLname(e.target.value);
  };

  // const handlePageChange = (event, value) => {
  //   setPage(value);
  // };

  // const handleGroupChange = (event) => {
  //   setSelected(event.target.value);
  // };

  // React.useEffect(() => {
  //   retrieveUsers();
  // }, [page]);

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
          {locationUniversity.map((p) => (
            <CircleMarker
              // key={index}
              center={[p.lat ? p.lat : 0, p.lon ? p.lon : 0]}
              // radius={10}
              opacity={0}
            >
              <Marker
                position={[p.lat ? p.lat : 0, p.lon ? p.lon : 0]}
                icon={
                  new Icon({
                    iconUrl: p.img,
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
          {/* <D3Layer location={map} /> */}

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
    <div className="body-detail" style={{ padding: "1.5rem" }}>
      <div style={{ padding: "0px 10px 0px 10px" }}>
        <Card className="card-border">
          <Card.Body>
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
                  <Col md="3" xs="12">
                    <TextField
                      id="standard-helperText"
                      label={t("searchbar.menu1")}
                      defaultValue="Default Value"
                      helperText={t("searchbar.menu3")}
                      InputProps={{ style: { fontFamily: "Prompt" } }}
                      InputLabelProps={{
                        style: { fontFamily: "Prompt" },
                      }}
                      FormHelperTextProps={{
                        style: { fontFamily: "Prompt" },
                      }}
                      variant="standard"
                      value={searchFname}
                      onChange={onChangeSearchFname}
                    />
                  </Col>
                  <Col md="3" xs="12">
                    <TextField
                      id="standard-helperText"
                      label={t("searchbar.menu2")}
                      InputProps={{ style: { fontFamily: "Prompt" } }}
                      InputLabelProps={{
                        style: { fontFamily: "Prompt" },
                      }}
                      FormHelperTextProps={{
                        style: { fontFamily: "Prompt" },
                      }}
                      defaultValue="Default Value"
                      helperText={t("searchbar.menu4")}
                      variant="standard"
                      value={searchLname}
                      onChange={onChangeSearchLname}
                    />
                  </Col>
                  <Col md="1" xs="12">
                    <Button
                      variant="contained"
                      type="submit"
                      color="primary"
                      size="large"
                      onClick={onSubmit}
                      style={{ fontFamily: "Prompt", width: "100%" }}
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
          </Card.Body>
        </Card>

        <div className="card-searcher">
          <Row>
            <Col sm={12}>
              <Card
                className="card-border"
                style={{
                  marginTop: "10px",
                  fontFamily: "Prompt",
                  borderRadius: "15px",
                  boxShadow:"none",
                  border:"none"
                }}
              >
                {/* <CardBody className="card-header-border">
                  <CardTitle tag="h6" style={{ fontWeight: "bold" }}>
                    แผนที่แสดงที่ตั้งนักวิจัย
                  </CardTitle>
                </CardBody> */}
                <MapContainer
                  center={[13, 105]}
                  zoom={5}
                  // scrollWheelZoom={true}
                  zoomControl={false}
                  style={{
                    width: "100%",
                    height: "600px",
                    margin: "0",
                    zIndex: "0",
                    borderRadius: "15px",
                  }}
                >
                  <TileLayer
                    // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <D3Layer location={map} />
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
                            นักวิจัยทั้งหมด
                          </h5>
                          <h2 className="card-text text-amount">
                            {count_researcher} คน{" "}
                          </h2>
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <div className="card">
                        <div className="card-body ">
                          <h5 className="card-title text-title">ภายในประเทศ</h5>
                          <h2 className="card-text text-amount">
                            {count_in_country} คน
                          </h2>
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <div className="card">
                        <div className="card-body ">
                          <h5 className="card-title text-title">
                            ภายนอกประเทศ
                          </h5>
                          <h2 className="card-text text-amount">
                            {count_out_country} คน
                          </h2>
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <div className="card">
                        <div className="card-body ">
                          <h5 className="card-title text-title">วิทยาเขต</h5>
                          <h2 className="card-text text-amount">
                            {count_rmuti_university} แห่ง
                          </h2>
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <div className="card">
                        <div
                          className="card-body "
                          style={{ padding: "1rem 0.5rem" }}
                        >
                          <h5 className="card-title text-title">
                            มหาวิทยาลัยเครือข่าย
                          </h5>
                          <h2 className="card-text text-amount">
                            {count_other_university} แห่ง
                          </h2>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col md={12} style={{ padding: "0 1rem 0 3rem" }}>
              <h2
                style={{
                  textAlign: "left",
                  color: "#fff",
                  fontWeight: "600",
                  marginBottom: "2rem",
                }}
              >
                รายชื่อนักวิจัย
              </h2>
              {universitys.length ? (
                <Row style={{ paddingLeft: "1rem" }}>
                  {universitys
                    .sort((x, y) => x.name.localeCompare(y.name, "th"))
                    .map((list) => (
                      <Col
                        xs
                        sm={12}
                        md
                        lg={6}
                        xl={4}
                        xxl={3}
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
                            <h5>{list.name}</h5>
                            <p
                              style={{
                                textAlign: "left",
                                marginTop: "0.5rem",
                                marginBottom: "0.5rem",
                              }}
                            >
                              จำนวน {list.data.length} คน
                            </p>
                          </div>
                          <div className="card-university-body">
                            {list.data.length ? (
                              <div className="list">
                                {list.data
                                  .sort((x, y) =>
                                    x.user_first_name_th.localeCompare(
                                      y.user_first_name_th,
                                      "th"
                                    )
                                  )
                                  .map((listdata) => (
                                    <div className="link_feature">
                                      <a
                                        href={`/monitoring/Researcher?user_idcard=${btoa(
                                          listdata.user_idcard
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
                                                listdata.user_image_user
                                                  ? `https://researcher.kims-rmuti.com/file-upload/images-profile-upload/${listdata.user_image_user}`
                                                  : "https://www.km-innovations.rmuti.ac.th/researcher/icon/researcher.png"
                                              }
                                            />
                                          </Col>
                                          <Col md="10">
                                            {listdata.prefix_id}
                                            {listdata.user_first_name_th}{" "}
                                            {listdata.user_last_name_th}
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
                    ))}
                  {/* </div> */}
                </Row>
              ) : (
                <div className="main-list pt-4">ไม่พบข้อมูล</div>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SearchPageResearch);
