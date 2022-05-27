import TableContainer from "@material-ui/core/TableContainer";
import {
  makeStyles,
  useTheme,
  ThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import { GrCertificate, GrSolaris } from "react-icons/gr";

import { orange } from "@material-ui/core/colors";
import CardContent from "@material-ui/core/CardContent";
import { Card, IconButton, Container } from "@material-ui/core";
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
  MapContainer,
  TileLayer,
  ZoomControl,
  Marker,
  CircleMarker,
  Popup,
} from "react-leaflet";

import Map from "../D3Layer";
import { useEffect } from "react";
import axios from "axios";

export default function ResearcherGroup(props) {
  const { concept_proposal_id, classes } = props;

  const apiUrl = "https://kmapi.kims-rmuti.com";
  let id = atob(concept_proposal_id);

  const mapDataTeam = async () => {
    const response = await axios.get(
      `${apiUrl}/api/get/us-project-map/team/${id}`
    );
    return response.data;
  };

  const dataTeam = mapDataTeam();

  return (
    <TableContainer className="card-header-border card-border">
      <Card>
        <CardBody className="card-header-border">
          <CardTitle
            tag="h6"
            style={{ padding: 5, color: "black" }}
            className={(classes.customLabel, classes.headerLabel)}
          >
            กลุ่มงานวิจัย
          </CardTitle>
        </CardBody>
        <MapContainer
          className="minimap2sub1"
          center={[15, 103]}
          zoom={7}
          scrollWheelZoom={true}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="topright" />
          <Map location={dataTeam} />
          {/* {markermap} */}
        </MapContainer>
      </Card>
    </TableContainer>
  );
}
