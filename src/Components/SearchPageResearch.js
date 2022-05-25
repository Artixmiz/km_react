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

import { Card, CardTitle, CardBody, Table, Row, Col } from "reactstrap";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import noImg from "../images/no-image.png";
import { BiInfoCircle, BiLinkExternal } from "react-icons/bi";
import { withRouter } from "react-router";

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

const SearchPageResearch = (props) => {
  const { locationSearch } = props;
  const { t } = useTranslation();

  const [users, setUsers] = React.useState([]);
  const [universitys, setUniversitys] = React.useState([]);
  const [locationUniversity, setLocationUniversity] = useState([]);
  const [searchFname, setSearchFname] = React.useState("");
  const [searchLname, setSearchLname] = React.useState("");
  const [group, setGroup] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const [selected, setSelected] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const [map, setMap] = React.useState([]);

  const [previousValue] = React.useState([]);

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
        // console.log(res.data);
        // const { users, totalPages } = res.data;
        // console.log(users);
        setUniversitys(res.data.universitys);
        setLocationUniversity(res.data.university_location);
        // setUsers(res.data.user_data);
        // setCount(totalPages);
        // setMap(mapData())
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
    <body className="bg">
      <div className="body-detail">
        <div style={{ padding: "0px 10px 0px 10px" }}>
          <Card className="card-border">
            {/* <CardBody className="card-header-border ">
              <CardTitle
                tag="h6"
                style={{
                  marginBottom: -4,
                  fontFamily: "Prompt",
                  fontWeight: "bold",
                  color: "rgb(58, 58, 58)",
                }}
              >
                ค้นหานักวิจัย
              </CardTitle>
            </CardBody> */}
            <CardBody>
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
                    {/* <Col md="3" xs="12">
                      <TextField
                        id="outlined-multiline-flexible"
                        multiline
                        select
                        InputProps={{ style: { fontFamily: "Prompt" } }}
                        FormHelperTextProps={{
                          style: { fontFamily: "Prompt" },
                        }}
                        label="Select"
                        value={selected}
                        onChange={handleGroupChange}
                        helperText="โปรดเลือก"
                      >
                        {group.map((value, index) => {
                          return (
                            <MenuItem
                              style={{ fontFamily: "Prompt" }}
                              value={value.group_id}
                            >
                              {value.group_name}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                    </Col> */}
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
            </CardBody>
          </Card>

          <Card
            className="card-border"
            style={{ marginTop: "15px", fontFamily: "Prompt" }}
          >
            {/* <CardBody className="card-header-border">
              <CardTitle tag="h6" style={{ fontWeight: "bold" }}>
                แผนที่แสดงที่ตั้งนักวิจัย
              </CardTitle>
            </CardBody> */}

            <Row>
              <Col>
                <MapContainer
                  center={[13, 105]}
                  zoom={5}
                  // scrollWheelZoom={true}
                  zoomControl={false}
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
                  <D3Layer location={map} />
                  <MinimapControl position="topright" />
                </MapContainer>
              </Col>
              <Col md="4">
                {universitys.length ? (
                  <div className="main-list">
                    {universitys
                      .sort((x, y) => x.name.localeCompare(y.name, "th"))
                      .map((list) => (
                        <>
                          <Card className="pt-2 mt-3 me-2">
                            <Row
                              className=" align-items-center justify-content-md-center"
                              style={{ width: "100%" }}
                            >
                              <Col md="6">
                                <h6>{list.name}</h6>
                              </Col>
                              <Col md="4">
                                <p>จำนวน {list.data.length} รายการ</p>
                              </Col>
                            </Row>
                          </Card>
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
                                        <Col md="9">
                                          {listdata.prefix_id}{" "}
                                          {listdata.user_first_name_th}{" "}
                                          {listdata.user_last_name_th}
                                        </Col>
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
                        </>
                      ))}
                  </div>
                ) : (
                  <div className="main-list pt-4">ไม่พบข้อมูล</div>
                )}
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </body>
  );
};

export default withRouter(SearchPageResearch);
