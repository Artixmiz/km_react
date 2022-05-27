import {
  Col,
  // Container,
  Row,
  Table,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardText,
  CardImg,
} from "reactstrap";

import {
  BiMapPin,
  BiBookOpen,
  BiMedal,
  BiNews,
  BiGroup,
  BiCertification,
  BiInfoCircle,
  BiWorld,
} from "react-icons/bi";

import { Card, IconButton, Container } from "@material-ui/core";

import { Icon } from "leaflet";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  Marker,
  CircleMarker,
  Popup,
} from "react-leaflet";

import { FaInfo, FaCheck, FaCompressArrowsAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ResearcherLocation(props) {
  const { t } = useTranslation();
  const { concept_proposal_id, classes, user } = props;
  const [projecttype1, setprojecttype1] = useState([]);
  const [map, setmap] = useState([]);

  const apiUrl = "https://kmapi.kims-rmuti.com";

  let id = atob(concept_proposal_id);

  useEffect(async () => {
    const project = await mapData();
    setmap(project);
    axios
      .get(`${apiUrl}/api/get/us-project/type?id_user=${id}`)
      .then((result) => {
        // console.log(result.data);
        setprojecttype1(result.data);
      });
  });

  const mapData = async () => {
    const response = await axios.get(
      `${apiUrl}/api/get/us-projects-user/${id}`
    );
    return response.data;
  };

  return (
    <>
      <Card className=" ">
        <CardBody className="">
          <CardTitle
            tag="h6"
            style={{ padding: 5, color: "black" }}
            className={(classes.customLabel, classes.headerLabel)}
          >
            {t("researcher.areapage.carddetail.header")}
          </CardTitle>

          <MapContainer
            // className="minimap2"
            style={{ width: "100%", height: "50vh" }}
            center={[15, 103]}
            zoom={5}
            scrollWheelZoom={true}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ZoomControl position="topright" />

            {/* <D3Layer data={locationRe}/>
        {markermap} */}
            {/* <Map location={dataM} /> */}
            {map.map((p, index) => {
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
                            ? "https://researcher.kims-rmuti.com/icon/วิจัย.png"
                            : p.project_type_id == 2
                            ? "https://researcher.kims-rmuti.com/icon/บริการ.png"
                            : p.project_type_id == 5
                            ? "https://researcher.kims-rmuti.com/icon/u2t.jpg"
                            : "https://cdn1.iconfinder.com/data/icons/social-media-set/24/Reverbnation-128.png",
                        iconSize: [40, 41],
                        // iconAnchor: [19, 0],
                        className: "image-icon",
                      })
                    }
                  >
                    <Popup>
                      <CardTitle class="  ">
                        <text
                          style={{
                            marginTop: "10px",
                            fontFamily: "Prompt",
                            fontSize: "20px",
                          }}
                        >
                          {p.project_type}
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
                                  pathname: "/ProjectDetail/ProjectNetwork",
                                  search: `?project_id=${btoa(p.project_id)}`,
                                })
                              : props.history.push({
                                  pathname:
                                    "/ProjectDetailConcep/ProjectNetwork",
                                  search: `?concep_id=${btoa(p.concept_id)}`,
                                });
                          }}
                          style={{
                            marginTop: "10px",
                            fontFamily: "Prompt",
                            fontSize: "15px",
                          }}
                        >
                          รายละเอียดเพิ่มเติม <BiInfoCircle size={18} />
                        </IconButton>
                      </CardTitle>
                    </Popup>
                  </Marker>
                </CircleMarker>
              );
            })}
          </MapContainer>
        </CardBody>
      </Card>
      <br />
      <Card>
        <Table bordered responsive striped className="card-border">
          <thead>
            <tr>
              <th>{t("researcher.areapage.table.header1")}</th>
              <th>{t("researcher.areapage.table.header2")}</th>
              <th>{t("researcher.areapage.table.header3")}</th>
              <th>{t("researcher.areapage.table.header4")}</th>
              <th>{t("researcher.areapage.table.header5")}</th>
              <th>{t("researcher.areapage.table.header6")}</th>
              <th>{t("researcher.areapage.table.header7")}</th>
            </tr>
          </thead>
          <tbody>
            {projecttype1.map((l, i) => {
              // const url = `/monitoring/ProjcetDetail?project_id=${

              // }`;
              return (
                <tr>
                  <td>
                    {l.project_id ? (
                      <a
                        href={`/monitoring/ProjectDetail/projectNetwork?project_id=${btoa(
                          l.project_id
                        )}`}
                      >
                        <FaInfo />
                      </a>
                    ) : (
                      <a
                        href={`/monitoring/ProjectDetailConcep/projectNetwork?concep_id=${btoa(
                          l.concept_id
                        )}`}
                      >
                        <FaInfo />
                      </a>
                    )}
                  </td>
                  <td valign="middle">{l.project_name_th}</td>
                  <td valign="middle">{l.project_star}</td>
                  <td valign="middle">
                    {user.map(
                      (u) => `${u.user_first_name_th} ${u.user_last_name_th}`
                    )}
                  </td>
                  <td valign="middle">
                    {l.project_type_id == 1 ? <FaCheck /> : ""}
                  </td>
                  <td>{l.project_type_id == 2 ? <FaCheck /> : ""}</td>
                  <td>{l.project_type_id == 5 ? <FaCheck /> : ""}</td>
                </tr>
              );
            })}
            <tr>
              <td colSpan="4">{t("researcher.areapage.table.header8")}</td>
              <td valign="middle">
                {
                  projecttype1.filter((item) => item.project_type_id === 1)
                    .length
                }
              </td>
              <td valign="middle">
                {
                  projecttype1.filter((item) => item.project_type_id === 2)
                    .length
                }
              </td>
              <td valign="middle">
                {
                  projecttype1.filter((item) => item.project_type_id === 5)
                    .length
                }
              </td>
            </tr>
          </tbody>
        </Table>
      </Card>
    </>
  );
}
