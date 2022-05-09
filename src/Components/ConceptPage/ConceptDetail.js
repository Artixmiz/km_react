/* eslint-disable no-new-wrappers */
import React, { useEffect } from "react";
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

import { useTranslation } from "react-i18next";

const ProjectDetail = (props) => {
  const { sourcefunding, classes, project } = props;
  const { t } = useTranslation();
  return (
    <Row>
      <Col md="12">
        <Card
          className="card-header-border card-border"
          // className={classes.cardlayout}
        >
          <CardBody className="card-header-border">
            <CardTitle
              tag="h6"
              style={{ padding: 5, color: "black" }}
              className={(classes.customLabel, classes.headerLabel)}
            >
              {t("concept_proposal_page.project_detail.header")}
            </CardTitle>
          </CardBody>

          <Table className="map-border" hover responsive bordered>
            <thead
              style={{
                borderBottom: "2px solid rgb(197, 197, 197)",
              }}
              className={classes.customLabel}
            >
              <tr>
                <th>{t("concept_proposal_page.project_detail.table.menu1")}</th>
                <th>{t("concept_proposal_page.project_detail.table.menu2")}</th>
                <th>{t("concept_proposal_page.project_detail.table.menu3")}</th>
                <th>{t("concept_proposal_page.project_detail.table.menu4")}</th>
                <th>{t("concept_proposal_page.project_detail.table.menu5")}</th>
                <th>{t("concept_proposal_page.project_detail.table.menu6")}</th>
              </tr>
            </thead>

            <tbody style={{ fontFamily: "Prompt" }}>
              {project.map((p) => (
                <tr>
                  <td>{p.concept_proposal_type}</td>
                  <td>{p.concept_proposal_name_th}</td>
                  <td>
                    <MapContainer
                      center={[
                        p.concept_proposal_latitude,
                        p.concept_proposal_longitude,
                      ]}
                      zoom={4}
                      // scrollWheelZoom={true}
                      zoomControl={false}
                      style={{
                        width: "150px",
                        height: "100px",
                      }}
                    >
                      <TileLayer
                        // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <CircleMarker
                        // key={index}
                        center={[
                          p.concept_proposal_latitude,
                          p.concept_proposal_longitude,
                        ]}
                        // radius={10}
                        opacity={0}
                      >
                        <Marker
                          position={[
                            p.concept_proposal_latitude,
                            p.concept_proposal_longitude,
                          ]}
                          icon={
                            new L.Icon({
                              iconUrl:
                                p.project_type_id == 1
                                  ? "https://researcher.kims-rmuti.com/icon/งานวิจัย.png"
                                  : p.project_type_id == 2
                                  ? "https://researcher.kims-rmuti.com/icon/บริการวิชาการ.png"
                                  : p.project_type_id == 5
                                  ? "https://researcher.kims-rmuti.com/icon/u2t.jpg"
                                  : "https://cdn1.iconfinder.com/data/icons/social-media-set/24/Reverbnation-128.png",
                              iconSize: [40, 41],
                              // iconAnchor: [19, 0],
                              className: "image-icon",
                            })
                          }
                        ></Marker>
                      </CircleMarker>
                    </MapContainer>
                  </td>
                  <td>{sourcefunding.source_funds_name}</td>
                  <td>{p.concept_year}</td>
                  <td>
                    {p.concept_budget
                      ? new Number(p.concept_budget).toLocaleString("en")
                      : ""}{" "}
                    บาท
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Col>
    </Row>
  );
};

export default ProjectDetail;
