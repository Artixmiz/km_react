import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import React, { useEffect, useState } from "react";

import D3Layer from "../D3Layer";
import { CardTitle, CardBody } from "reactstrap";

import Typography from "@material-ui/core/Typography";
import "../Css/mapView.scss";
import { Card } from "react-bootstrap";

import Button from "@material-ui/core/Button";
import "bootstrap/dist/css/bootstrap.min.css";

import Grid from "@material-ui/core/Grid";

import TableContainer from "@material-ui/core/TableContainer";
import CardContent from "@material-ui/core/CardContent";

import PropTypes from "prop-types";
import { makeStyles, createTheme } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";
import axios from "axios";

const YoutubeEmbed = ({ embedId }) => {
  console.log(embedId);
  // setYoutubeEmbed(embedId);

  const vdo_id = getId(embedId);
  console.log(vdo_id);

  return (
    <div className="video-responsive">
      <iframe
        width="600"
        height="480"
        src={`https://www.youtube.com/embed/${vdo_id}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};

function getId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}

export default function ProjectPage(props) {
  const { co_researcher_id, classes } = props;
  const apiUrl = "https://kmapi.kims-rmuti.com";
  const [projects, setprojects] = useState([]);
  let id = atob(co_researcher_id);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/get/co-researcher/projects/${id}`)
      .then((result) => {
        setprojects(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        // setmserrorkn(err.response.data.message);
      });
  }, []);

  const mapData = async () => {
    const response = await axios.get(
      `${apiUrl}/api/get/co-researcher/map/${id}`
    );
    return response.data;
  };

  const dataM = mapData();

  return (
    <>
      <Card style={{ marginTop: "15px", fontFamily: "Prompt" }}>
        {/* <CardBody className="card-header-border">
                        <CardTitle
                          tag="h6"
                          style={{
                            padding: 5,
                            color: "black",
                            fontFamily: "Prompt",
                          }}
                          className={(classes.customLabel, classes.headerLabel)}
                        >
                          แผนที่แสดงโครงการดำเนินงาน
                        </CardTitle>
                      </CardBody> */}

        <MapContainer
          className="map-border"
          center={[13, 100]}
          zoom={3}
          scrollWheelZoom={true}
          zoomControl={false}
          style={{ width: "100%", height: "600px" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <ZoomControl position="topright" />
          <D3Layer location={dataM} />
        </MapContainer>
      </Card>

      <p></p>

      <Card className="card-header-border card-border">
        <Card>
          <CardBody className="card-header-border card-border">
            <CardTitle
              tag="h6"
              style={{ padding: 5, color: "black" }}
              className={(classes.customLabel, classes.headerLabel)}
            >
              โครงการดำเนินงาน
            </CardTitle>
          </CardBody>

          <TableContainer
            className="card-header-border card-border"
            style={{
              fontFamily: "Prompt",
              padding: "20px 20px 20px 20px",
            }}
          >
            <Grid container spacing={2} columns={16}>
              {projects.map((listValue, index, project_type, l) => {
                return (
                  <Grid item xs={6}>
                    <Card
                      className=" card-border"
                      variant="outlined"
                      key={project_type}
                      style={{
                        margin: "0px 0px 10px 0px",
                        fontFamily: "Prompt",
                      }}
                    >
                      <CardBody>
                        <CardContent>
                          {/* <img
                                      width="auto"
                                      height="170"
                                      aria-label="Placeholder: Image"
                                      preserveAspectRatio="xMidYMid slice"
                                      src={`https://www.km-innovations.rmuti.ac.th/researcher/file-upload/co_researcher-upload/${listValue.co_researcher_image}`}
                                      style={{ padding: "10px" }}
                                    /> */}
                          <p>
                            <Typography
                              align="left"
                              style={{ fontFamily: "Prompt" }}
                              gutterBottom
                            >
                              <h className={classes.customLabel}>
                                {listValue.concept_proposal_name_th}
                                <br></br>{" "}
                              </h>
                              {listValue.concept_proposal_name_en}
                            </Typography>
                          </p>
                          <p>
                            <Typography
                              align="left"
                              style={{ fontFamily: "Prompt" }}
                            >
                              <h className={classes.customLabel}>
                                งบประมาณ : &nbsp;{" "}
                              </h>
                              {listValue.concept_budget
                                ? new Number(
                                    listValue.concept_budget
                                  ).toLocaleString("en")
                                : ""}{" "}
                              บาท
                            </Typography>
                          </p>
                          <p>
                            <Typography
                              align="left"
                              style={{ fontFamily: "Prompt" }}
                            >
                              <h className={classes.customLabel}>
                                ปี : &nbsp;{" "}
                              </h>{" "}
                              {listValue.concept_year}
                            </Typography>
                          </p>
                          <p>
                            <Typography
                              align="left"
                              style={{ fontFamily: "Prompt" }}
                            >
                              <h className={classes.customLabel}>
                                ชื่อนักวิจัย : &nbsp;
                              </h>
                              {listValue.prefix_name_th}
                              {listValue.user_first_name_th}
                              &nbsp;
                              {listValue.user_last_name_th}
                            </Typography>
                          </p>
                          <p>
                            <Typography
                              align="left"
                              style={{ fontFamily: "Prompt" }}
                            >
                              <h className={classes.customLabel}>
                                หน่วยงาน : &nbsp;
                              </h>
                              {listValue.name}
                            </Typography>
                          </p>
                          {/* <Button>
                                      <a
                                        target="_blank"
                                        href={`https://researcher.kims-rmuti.com/file-upload/project-upload/${listValue.project_upload}`}
                                        rel="noreferrer"
                                      >
                                        <GetAppIcon />
                                      </a>
                                    </Button> */}

                          <Button
                            color="primary"
                            style={{ fontFamily: "Prompt" }}
                            aria-label="view info project"
                            onClick={() => {
                              console.log("test" + listValue.project_id);
                              props.history.push({
                                pathname: "/ProjectDetail/projectNetwork",
                                search: `?project_id=${btoa(
                                  listValue.project_id
                                )}`,
                                pathname: "/ProjectDetailConcep/projectNetwork",

                                search: `?concep_id=${btoa(
                                  listValue.concept_proposal_id
                                )}`,
                              });
                            }}
                          >
                            รายละเอียดเพิ่มเติม
                          </Button>
                        </CardContent>
                      </CardBody>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </TableContainer>
        </Card>
      </Card>
    </>
  );
}
