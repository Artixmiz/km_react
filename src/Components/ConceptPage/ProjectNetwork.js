import React from "react";
import D3Layer from "../D3Layer";
import { Table, CardTitle, Card, CardBody, Container } from "reactstrap";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  LayerGroup,
} from "react-leaflet";

import { useTranslation } from "react-i18next";

const ProjectNetwork = (props) => {
  const { location, dataM, classes, project } = props;
  const { t } = useTranslation();

  return (
    <Card className="">
      <CardBody className="">
        <CardTitle
          tag="h6"
          style={{ padding: 5, color: "black" }}
          className={(classes.customLabel, classes.headerLabel)}
        >
          {t("concept_proposal_page.network.header")}
        </CardTitle>

        {/* <CardBody style={{ marginTop: -14 }}> */}
        {location.map(({ lat, lng }) => {
          return (
            <MapContainer
              className=""
              center={[lat, lng]}
              zoom={6}
              scrollWheelZoom={true}
              zoomControl={false}
              style={{ width: "100%", height: "600px" }}
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
      </CardBody>

      <CardBody>
        <Table hover responsive>
          <thead
            style={{ borderBottom: "2px solid rgb(197, 197, 197)" }}
            className={classes.customLabel}
          >
            <tr>
              <th>{t("concept_proposal_page.network.table.menu1")}</th>
              <th>{t("concept_proposal_page.network.table.menu2")}</th>
              <th>{t("concept_proposal_page.network.table.menu3")}</th>
              <th>{t("concept_proposal_page.network.table.menu4")}</th>
            </tr>
          </thead>

          <tbody style={{ fontFamily: "Prompt" }}>
            <tr>
              <td>1</td>
              <td>{project.map((v) => v.concept_proposal_name_th)}</td>
              <td>{project.map((v) => v.concept_year)}</td>
              <td>
                {project.map((v) =>
                  v.concept_budget
                    ? new Number(v.concept_budget).toLocaleString("en")
                    : ""
                )}{" "}
              </td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default ProjectNetwork;
