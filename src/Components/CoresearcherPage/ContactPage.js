import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import React, { useEffect, useState } from "react";

import { Col, Row, CardTitle, CardBody } from "reactstrap";

import "../Css/mapView.scss";
import { Card } from "react-bootstrap";

import Button from "@material-ui/core/Button";
import PersonIcon from "@material-ui/icons/Person";
import CallIcon from "@material-ui/icons/Call";
import EmailIcon from "@material-ui/icons/Email";
import TwitterIcon from "@material-ui/icons/Twitter";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import LanguageIcon from "@material-ui/icons/Language";
import axios from "axios";

export default function ContactPage(props) {
  const { co_researcher_id, classes, markermap } = props;
  const apiUrl = "https://kmapi.kims-rmuti.com";
  const [result, setresult] = useState([]);

  let id = atob(co_researcher_id);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/get/co-researcher/${id}`)
      .then((result) => {
        console.log(result.data);
        setresult(result.data);
        // setlocation([
        //   {
        //     lat: result.data[0].co_researcher_latitude,
        //     lng: result.data[0].co_researcher_longitude,
        //   },
        // ]);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        // setmserror(err.response.data.message);
      });
  }, []);
  return (
    <Row>
      <Col xs={6}>
        <div>
          <Card className="card-header-border card-border">
            <Card>
              <CardBody className="card-header-border">
                <CardTitle
                  tag="h6"
                  style={{ padding: 5, color: "black" }}
                  className={(classes.customLabel, classes.headerLabel)}
                >
                  ตำแหน่งที่ตั้ง
                </CardTitle>
              </CardBody>

              <MapContainer
                className="map-border"
                center={[13, 100]}
                zoom={6}
                scrollWheelZoom={true}
                zoomControl={false}
                style={{ width: "100%", height: "50vh" }}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ZoomControl position="topright" />
                {markermap}
              </MapContainer>

              {/* </CardBody> */}
            </Card>
          </Card>
        </div>
      </Col>

      <Col md={6}>
        <Card>
          <Card className="card-header-border card-border">
            <CardBody className="card-header-border">
              <CardTitle
                tag="h6"
                style={{ padding: 5, color: "black" }}
                className={(classes.customLabel, classes.headerLabel)}
              >
                ข้อมูลติดต่อ
              </CardTitle>
            </CardBody>

            <div className="row no-gutters">
              <div className="col-md-4">
                {result.map((d) => {
                  return (
                    <img
                      width="200"
                      height="auto"
                      aria-label="Placeholder: Image"
                      preserveAspectRatio="xMidYMid slice"
                      src={`https://researcher.kims-rmuti.com/file-upload/co_researcher-upload/${d.co_researcher_image}`}
                      style={{ padding: "10px" }}
                    />
                  );
                })}
              </div>

              <div className="col-md-8">
                <div className="card-body" style={{ fontFamily: "Prompt" }}>
                  {result.map((d) => {
                    return (
                      <div>
                        <p className="card-title" align="left">
                          <PersonIcon /> {""}
                          {d.active_coordinator_name_th == 1
                            ? "ชื่อ :" + " " + [d.coordinator_name_th]
                            : " "}{" "}
                          {d.active_coordinator_lastname_th == 1
                            ? [d.coordinator_lastname_th]
                            : " "}{" "}
                        </p>

                        <p
                          className="card-text"
                          align="left"
                          style={{ color: "green" }}
                        >
                          <CallIcon />
                          โทรศัพท์ :
                          {d.active_co_researcher_phone == 1
                            ? d.co_researcher_phone
                            : " "}{" "}
                        </p>
                        <p
                          className="card-text"
                          align="left"
                          style={{ color: "red" }}
                        >
                          <EmailIcon />
                          Email :
                          {d.active_co_researcher_mail == 1
                            ? d.co_researcher_mail
                            : " "}{" "}
                        </p>
                        <p
                          className="card-text"
                          align="left"
                          style={{ color: "blue" }}
                        >
                          <FacebookIcon />
                          &nbsp; Facebook :{" "}
                          {d.co_researcher_facebook ? (
                            <Button
                              a
                              href={d.co_researcher_facebook}
                              style={{
                                fontSize: "smaller",
                                color: "blue",
                                fontFamily: "Prompt",
                              }}
                            >
                              {d.co_researcher_name_th}{" "}
                            </Button>
                          ) : (
                            " "
                          )}
                        </p>

                        <p
                          className="card-text"
                          align="left"
                          style={{ color: "blue" }}
                        >
                          <TwitterIcon />
                          &nbsp; Twitter : {d.co_researcher_twitter}
                        </p>
                        <p
                          className="card-text"
                          align="left"
                          style={{ color: "green" }}
                        >
                          <ChatBubbleIcon />
                          &nbsp; Line : {d.co_researcher_line}
                        </p>

                        <p
                          className="card-text"
                          align="left"
                          style={{ color: "black" }}
                        >
                          <InstagramIcon />
                          &nbsp; Instagram : {d.co_researcher_ig}
                        </p>
                        <p className="card-text" align="left">
                          <LanguageIcon />
                          &nbsp; Website :
                          {d.co_researcher_website ? (
                            <Button
                              a
                              href={d.co_researcher_website}
                              style={{ fontSize: 16 }}
                            >
                              {d.co_researcher_website.slice(8, 35)}
                            </Button>
                          ) : (
                            " "
                          )}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>
        </Card>
      </Col>
    </Row>
  );
}
