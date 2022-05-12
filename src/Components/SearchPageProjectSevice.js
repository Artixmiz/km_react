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
} from "@material-ui/core";
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
import noImg from "../images/no-image.png";
import markerIconPng from "../images/icon.png";
import { Icon } from "leaflet";
import { withRouter } from "react-router";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import { BiInfoCircle, BiLinkExternal } from "react-icons/bi";

import { useTranslation } from "react-i18next";

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

function SearchPageProject(props) {
  const { t } = useTranslation();
  const { locationSearch } = props;

  const [projects, setProjects] = React.useState([]);
  const [universitys, setUniversitys] = React.useState([]);
  const [searchTitle, setSearchTitle] = React.useState("");

  const [message, setMessage] = React.useState("");
  const [selected2, setSelected2] = React.useState(2);
  const [selected5, setSelected5] = React.useState(5);
  const [loading, setLoading] = React.useState(false);
  const [check2, setcheck2] = React.useState(true);
  const [check5, setcheck5] = React.useState(true);

  // const [previousValue] = React.useState([]);

  const apiUrl = "https://kmapi.kims-rmuti.com";
  const localUrl = "http://localhost:4000";

  const getRequestParams = (title, typetwo, typefive) => {
    let params = {};

    if (typetwo) {
      params["typeTwo"] = typetwo;
    } else {
      params["typeTwo"] = "";
    }

    if (typefive) {
      params["typeFive"] = typefive;
    } else {
      params["typeFive"] = "";
    }

    if (title != undefined) {
      params["title"] = title;
    }

    return params;
  };

  const retrieveProjects = () => {
    setLoading(true);
    // previousValue.push(selected);

    // if (previousValue.length > 2) {
    //   previousValue.shift();
    // }
    // console.log(previousValue);

    const params = getRequestParams(searchTitle, selected2, selected5);

    axios
      .get(`${apiUrl}/api/get/us-projects-service`, { params })
      .then((res) => {
        // console.log(res.data);
        // const { projects, totalPages } = res.data;

        // console.log(projects);
        setProjects(res.data.projects);
        setUniversitys(res.data.universitys);
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

  const mapRef = useRef();

  React.useEffect(() => {
    retrieveProjects();

    // let mapInst = mapRef.current.leafletElement;
    // const group = groupRef.current.leafletElement; //get native featureGroup instance
    // mapInst.fitBounds(group.getBounds());
  }, []);

  const onChangeTitle = (e) => {
    setSearchTitle(e.target.value);
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
          {projects.map((p) => (
            <CircleMarker
              // key={index}
              center={[
                p.project_latitude ? p.project_latitude : 0,
                p.project_longitude ? p.project_longitude : 0,
              ]}
              // radius={10}
              opacity={0}
            >
              <Marker
                position={[
                  p.project_latitude ? p.project_latitude : 0,
                  p.project_longitude ? p.project_longitude : 0,
                ]}
                icon={
                  new Icon({
                    iconUrl:
                      p.project_type_id == 1
                        ? "https://researcher.kims-rmuti.com/icon/R.jpg"
                        : p.project_type_id == 2
                        ? "https://researcher.kims-rmuti.com/icon/AS.jpg"
                        : p.project_type_id == 5
                        ? "https://researcher.kims-rmuti.com/icon/U2T.jpg"
                        : "https://cdn1.iconfinder.com/data/icons/social-media-set/24/Reverbnation-128.png",
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
            }}
          >
            {t("title")}
          </text>
        </Box> */}
        <div>
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
                  ค้นหางานบริการวิชาการ
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
                        marginTop: "-15px",
                      },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div>
                      <Row className="align-items-center justify-content-md-center">
                        <Col md="6" xs="12">
                          <TextField
                            id="standard-helperText"
                            label={t("research.menu4")}
                            defaultValue="Default Value"
                            helperText={t("research.menu3")}
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
                            InputLabelProps={{
                              style: { fontFamily: "Prompt" },
                            }}
                            InputProps={{ style: { fontFamily: "Prompt" } }}
                            FormHelperTextProps={{
                              style: { fontFamily: "Prompt" },
                            }}
                            label="ประเภทงานบริการวิชาการ"
                            // value={selected1}
                            // onChange={handleChange}
                            helperText="โปรดเลือก"
                          >
                            <FormGroup
                              check
                              inline
                              style={{ fontFamily: "Prompt" }}
                            >
                              <div>
                                <img
                                  width="45"
                                  height="45"
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
                                  style={{ marginTop: "15px" }}
                                />
                                {t("research.menu1")}
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
                                  onChange={handleChange5}
                                  value={selected5}
                                  checked={check5}
                                  style={{ marginTop: "15px" }}
                                />
                                <img
                                  width="45"
                                  height="45"
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

                        <Col md="1" xs="12">
                          <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            type="submit"
                            onClick={retrieveProjects}
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
                </div>
              </CardBody>
            </Card>

            <Card
              //className="card-border"
              style={{ marginTop: "15px", fontFamily: "Prompt" }}
            >
              {/* <CardBody className="card-header-border">
                <CardTitle tag="h6" style={{ fontWeight: "bold" }}>
                  แผนที่แสดงงานบริการวิชาการ / (U2T)
                </CardTitle>
              </CardBody> */}
              <Row>
                <Col>
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
                      height: "100%",
                      margin: "0",
                      // borderRadius: "5px",
                    }}
                  >
                    <TileLayer
                      // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {!message
                      ? projects.map((p, index) => {
                          return (
                            <CircleMarker
                              key={index}
                              center={[
                                p.project_latitude ? p.project_latitude : 0,
                                p.project_longitude ? p.project_longitude : 0,
                              ]}
                              // radius={10}
                              opacity={0}
                            >
                              <Marker
                                position={[
                                  p.project_latitude ? p.project_latitude : 0,
                                  p.project_longitude ? p.project_longitude : 0,
                                ]}
                                icon={
                                  new Icon({
                                    iconUrl:
                                      p.project_type_id == 1
                                        ? "https://researcher.kims-rmuti.com/icon/R.jpg"
                                        : p.project_type_id == 2
                                        ? "https://researcher.kims-rmuti.com/icon/AS.jpg"
                                        : p.project_type_id == 5
                                        ? "https://researcher.kims-rmuti.com/icon/U2T.jpg"
                                        : "https://cdn1.iconfinder.com/data/icons/social-media-set/24/Reverbnation-128.png",
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
                                        fontSize: "20px",
                                      }}
                                    >
                                      งานบริการวิชาการ
                                    </text>
                                    <hr />

                                    <text
                                      style={{
                                        marginTop: "10px",
                                        fontFamily: "Prompt",
                                        fontSize: "15px",
                                      }}
                                    >
                                      {p.project_name_th}
                                    </text>
                                    <hr />

                                    <IconButton
                                      color="primary"
                                      aria-label="view info co"
                                      onClick={() => {
                                        console.log(p.concept_id);
                                        p.project_id
                                          ? props.history.push({
                                              pathname:
                                                "/ProjectDetail/ProjectNetwork",
                                              search: `?project_id=${btoa(
                                                p.project_id
                                              )}`,
                                            })
                                          : props.history.push({
                                              pathname:
                                                "/ProjectDetailConcep/ProjectNetwork",
                                              search: `?concep_id=${btoa(
                                                p.concept_id
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
                    {/* {0 &&
                                        0 ? (
                                          
                                        ) : null} */}
                  </MapContainer>
                </Col>
                <Col md={4}>
                  {universitys.length ? (
                    <div className="main-list">
                      {universitys
                        .sort((x, y) =>
                          x.university.localeCompare(y.university, "th")
                        )
                        .map((list) => (
                          <>
                            <Card className="pt-2 mt-3 me-2">
                              <Row
                                className=" align-items-center justify-content-md-center"
                                style={{ width: "100%" }}
                              >
                                <Col md="6">
                                  <h6>{list.university}</h6>
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
                                    x.project_name_th.localeCompare(
                                      y.project_name_th,
                                      "th"
                                    )
                                  )
                                  .map((listdata) => (
                                    <div className="link_feature">
                                      <a
                                        href={
                                          listdata.project_id
                                            ? `/monitoring/ProjectDetail/ProjectNetwork?project_id=${btoa(
                                                listdata.project_id
                                              )}`
                                            : `/monitoring/ProjectDetailConcep/ProjectNetwork?concep_id=${btoa(
                                                listdata.concept_id
                                              )}`
                                        }
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
                                                listdata.project_type_id == 1
                                                  ? `https://researcher.kims-rmuti.com/icon/R.jpg`
                                                  : listdata.project_type_id ==
                                                    2
                                                  ? `https://researcher.kims-rmuti.com/icon/AS.jpg`
                                                  : listdata.project_type_id ==
                                                    5
                                                  ? `https://researcher.kims-rmuti.com/icon/U2T.jpg`
                                                  : noImg
                                              }
                                            />
                                          </Col>
                                          <Col md="9">
                                            {listdata.project_name_th}
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

                  {/* <div className="list pt-4">ไม่พบข้อมูล</div> */}
                </Col>
              </Row>
            </Card>

            {/* <Card
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
                              <th>ประเภท</th>
                              <th>ตำแหน่งที่ตั้ง</th>
                              <th>งานวิจัย</th>
                              <th>ดูข้อมูล</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td colSpan="4" style={{ padding: "20px" }}>
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
                              <th>ประเภท</th>
                              <th>งานวิจัย</th>
                              <th>ตำแหน่งที่ตั้ง</th>
                              <th>ดูข้อมูล</th>
                            </tr>
                          </thead>
                          <tbody>
                            {projects &&
                              projects.map((project, index) => {
                                return (
                                  <tr>
                                    <td valign="middle">
                                      {prefix[project.project_type_id]}
                                    </td>
  
                                    <td
                                      valign="middle"
                                      style={{
                                        fontFamily: "Prompt",
                                        width: "390px",
                                      }}
                                    >
                                      {project.project_name_th
                                        ? project.project_name_th
                                        : project.concept_proposal_name_th}
                                    </td>
                                    <td valign="middle">
                                      <MapContainer
                                        center={[
                                          project.project_latitude
                                            ? project.project_latitude
                                            : 0,
                                          project.project_longitude
                                            ? project.project_longitude
                                            : 0,
                                        ]}
                                        zoom={7}
                                        // scrollWheelZoom={true}
                                        zoomControl={false}
                                        style={{
                                          width: "220px",
                                          height: "90px",
                                          margin: "0 auto",
                                          borderRadius: "5px",
                                        }}
                                      >
                                        <TileLayer
                                          // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
  
                                        {project.project_latitude &&
                                        project.project_longitude ? (
                                          <CircleMarker
                                            key={index}
                                            center={[
                                              project.project_latitude
                                                ? project.project_latitude
                                                : 0,
                                              project.project_longitude
                                                ? project.project_longitude
                                                : 0,
                                            ]}
                                            // radius={10}
                                            opacity={0}
                                          >
                                            <Marker
                                              position={[
                                                project.project_latitude
                                                  ? project.project_latitude
                                                  : 0,
                                                project.project_longitude
                                                  ? project.project_longitude
                                                  : 0,
                                              ]}
                                              icon={
                                                new Icon({
                                                  iconUrl:
                                                    project.project_type_id == 1
                                                      ? "https://www.km-innovations.rmuti.ac.th/researcher/icon/งานวิจัย.png"
                                                      : project.project_type_id ==
                                                        2
                                                      ? "https://www.km-innovations.rmuti.ac.th/researcher/icon/บริการวิชาการ.png"
                                                      : "https://cdn1.iconfinder.com/data/icons/social-media-set/24/Reverbnation-128.png",
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
                                        aria-label="view info project"
                                        onClick={() => {
                                          console.log(
                                            "test" + project.project_id
                                          );
                                          project.project_id
                                            ? props.history.push({
                                                pathname: "/ProjectDetail",
                                                search: `?project_id=${btoa(project.project_id)}`,
                                              })
                                            : props.history.push({
                                                pathname: "/ProjectDetailConcep",
                                                search: `?concep_id=${btoa(project.concept_id)}`,
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

export default withRouter(SearchPageProject);
