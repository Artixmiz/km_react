/* eslint-disable no-new-wrappers */
import React from "react";
import {
  Table,
  CardTitle,
  Card,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  LayerGroup,
  Marker,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";

const DetailProject = (props) => {
  const {  classes, project } = props;

  return (
    <Row>
    
    <Col md="12">
      <Card
        className="card-header-border card-border"
        className={classes.cardlayout}
      >
        <CardBody className="card-header-border">
          <CardTitle
            tag="h6"
            style={{ padding: 5, color: "black" }}
            className={(classes.customLabel, classes.headerLabel)}
          >
            ข้อมูลงานวิจัย
          </CardTitle>
        </CardBody>

        <Table className="map-border" hover responsive bordered>
          <thead
            style={{ borderBottom: "2px solid rgb(197, 197, 197)" }}
            className={classes.customLabel}
          >
            <tr>
              <th>ประเภท</th>
              <th>ชื่องานวิจัย</th>
              <th>พื้นที่งานวิจัย</th>
              <th>แหล่งเงินทุน</th>
              <th>ปี</th>
              <th>งบประมาณ</th>
            </tr>
          </thead>

          <tbody style={{ fontFamily: "Prompt" }}>
            <tr>
              <td>{project.project_type}</td>
              <td>{project.project_name_th}</td>
              <td>
                <MapContainer
                  center={[
                    project.project_latitude,
                    project.project_longitude,
                  ]}
                  zoom={4}
                  zoomControl={false}
                  style={{
                    width: "150px",
                    height: "100px",
                  }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <CircleMarker
                    // key={index}
                    center={[
                      project.project_latitude,
                      project.project_longitude,
                    ]}
                    opacity={0}
                  >
                    <Marker
                      position={[
                        project.project_latitude,
                        project.project_longitude,
                      ]}
                      icon={
                        new L.Icon({
                          iconUrl:
                            project.project_type_id == 1
                              ? "https://www.km-innovations.rmuti.ac.th/researcher/icon/งานวิจัย.png"
                              : project.project_type_id == 2
                              ? "https://www.km-innovations.rmuti.ac.th/researcher/icon/บริการวิชาการ.png"
                              : "https://cdn1.iconfinder.com/data/icons/social-media-set/24/Reverbnation-128.png",
                          iconSize: [40, 41],
                          className: "image-icon",
                        })
                      }
                    ></Marker>
                  </CircleMarker>
                </MapContainer>
                
              </td>
              <td>{project.project_funding}</td>
              <td>{project.project_star}</td>
              <td>{project.project_budget
                ? new Number(
                project.project_budget
                ).toLocaleString('en')
              : ""}</td>
            </tr>
          </tbody>
        </Table>
      </Card>
    </Col>
  </Row>

  );
};

export default DetailProject;
