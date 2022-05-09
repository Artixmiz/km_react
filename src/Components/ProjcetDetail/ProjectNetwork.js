import React from "react";
import D3Layer from "../D3Layer";
import { Table, CardTitle, Card, CardBody, Container } from "reactstrap";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  LayerGroup,
} from "react-leaflet";

const ProjectNetwork = (props) => {
  const { location, dataM, classes, project } = props;

  return (
    <Card className="card-header-border card-border">
    <CardBody className="card-header-border">
      <CardTitle
        tag="h6"
        style={{ padding: 5, color: "black" }}
        className={(classes.customLabel, classes.headerLabel)}
      >
        แผนที่แสดงเครือข่ายงานวิจัย
      </CardTitle>
    </CardBody>

    {/* <CardBody style={{ marginTop: -14 }}> */}
    {location.map(({ lat, lng }) => {
      return (
        <MapContainer
          className="map-border"
          center={[lat, lng]}
          zoom={5}
          scrollWheelZoom={true}
          zoomControl={false}
          style={{ width: "100%", height: "50vh" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LayerGroup>
            <D3Layer location={dataM} />
          </LayerGroup>

          <ZoomControl position="topright" />
        </MapContainer>
      );
    })}

    <CardBody>
      <Table hover responsive>
        <thead
          style={{ borderBottom: "2px solid rgb(197, 197, 197)" }}
          className={classes.customLabel}
        >
          <tr>
            <th>ลำดับที่</th>
            <th>งานวิจัย</th>
            <th>ปี</th>
            <th>งบประมาณ</th>
          </tr>
        </thead>

        <tbody style={{ fontFamily: "Prompt" }}>
          <tr>
            <td>1</td>
            <td>{project.project_name_th}</td>
            <td>{project.project_star}</td>
            <td>
            {project.project_budget
                                        ? new Number(
                                          project.project_budget
                                          ).toLocaleString('en')
                                        : ""}</td>
          </tr>
        </tbody>
      </Table>
    </CardBody>
  </Card>
  );
};

export default ProjectNetwork;
