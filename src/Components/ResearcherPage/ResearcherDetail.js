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
import MenuBookIcon from "@material-ui/icons/MenuBook";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DetailPage(props) {
  const { concept_proposal_id, Accordion, classes, classTimeline } = props;

  const [educational, seteducational] = useState([]);
  const [working, setworking] = useState([]);
  const [purchasing, setpurchasing] = useState([]);

  const apiUrl = "https://kmapi.kims-rmuti.com";
  let id = atob(concept_proposal_id);

  useEffect(() => {
    axios.get(`${apiUrl}/api/get/us-educational/${id}`).then((result) => {
      // console.log(result.data);
      seteducational(result.data);
    });

    axios.get(`${apiUrl}/api/get/working-experience/${id}`).then((result) => {
      // console.log(result.data);
      setworking(result.data);
    });

    axios
      .get(`${apiUrl}/api/get/progress-report/report-purchasing/${id}`)
      .then((result) => {
        // console.log(result.data);
        setpurchasing(result.data);
      });
  }, []);
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>?????????????????????????????????????????????</Accordion.Header>
              <Accordion.Body>
                <TableContainer className="card-header-border card-border">
                  <Card>
                    <CardBody className="card-header-border">
                      <CardTitle
                        tag="h6"
                        style={{ padding: 5, color: "black" }}
                        className={(classes.customLabel, classes.headerLabel)}
                      >
                        ?????????????????????????????????????????????
                      </CardTitle>
                    </CardBody>
                    <Timeline className="rc-body3">
                      {educational.map((listValue, index) => {
                        return (
                          <TimelineItem>
                            <TimelineOppositeContent align="left">
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                variant="body2"
                                padding="1px 1px 1px 1px"
                              >
                                {listValue.educational_status}??????{" "}
                                {listValue.educational_graduation}
                              </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                              <TimelineDot color="secondary" variant="outlined">
                                <MenuBookIcon />
                              </TimelineDot>
                              <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent align="left">
                              <Paper
                                elevation={5}
                                className={classTimeline.paper}
                              >
                                {/* <Typography style={{ fontFamily: "Prompt" }}
                                      align="left"
                                      variant="h6"
                                      component="h6"
                                    >
                                      {listValue.educational_degree}
                                    </Typography> */}
                                <Typography
                                  align="left"
                                  style={{
                                    fontFamily: "Prompt",
                                    fontSize: 14,
                                  }}
                                >
                                  ???????????? : {listValue.educational_major}
                                </Typography>
                                <Typography
                                  align="left"
                                  style={{
                                    fontFamily: "Prompt",
                                    fontSize: 14,
                                  }}
                                >
                                  ????????? : {listValue.educational_faculty}
                                </Typography>
                                <Typography
                                  align="left"
                                  style={{
                                    fontFamily: "Prompt",
                                    fontSize: 14,
                                  }}
                                >
                                  ?????????????????? : {listValue.educational_Institute}
                                </Typography>
                              </Paper>
                            </TimelineContent>
                          </TimelineItem>
                        );
                      })}
                      <TimelineItem>
                        <TimelineDot variant="outlined" />
                        <TimelineContent></TimelineContent>
                      </TimelineItem>
                    </Timeline>
                  </Card>
                </TableContainer>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Grid>

        <Grid item xs>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>?????????????????????????????????????????????</Accordion.Header>
              <Accordion.Body>
                <TableContainer
                  style={{ fontFamily: "Prompt" }}
                  className="card-header-border card-border"
                >
                  <Card>
                    <CardBody className="card-header-border">
                      <CardTitle
                        tag="h6"
                        style={{ padding: 5, color: "black" }}
                        className={(classes.customLabel, classes.headerLabel)}
                      >
                        ?????????????????????????????????????????????
                      </CardTitle>
                    </CardBody>
                    <Timeline align="alternate" className="rc-body3">
                      {working.map((listValue, index) => {
                        return (
                          <TimelineItem align="left">
                            <TimelineOppositeContent align="left">
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                variant="body2"
                                color="textSecondary"
                              >
                                {listValue.working_experience_star}-
                                {listValue.working_experience_stop}
                              </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator align="left">
                              <TimelineDot color="secondary" variant="outlined">
                                <LaptopMacIcon />
                              </TimelineDot>
                              <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent align="left">
                              <Paper
                                elevation={5}
                                className={classTimeline.paper}
                              >
                                <Typography
                                  align="left"
                                  style={{
                                    fontFamily: "Prompt",
                                    fontSize: 13,
                                  }}
                                >
                                  {" "}
                                  ????????????????????? :{" "}
                                  {listValue.working_experience_position}
                                </Typography>
                                <Typography
                                  align="left"
                                  style={{
                                    fontFamily: "Prompt",
                                    fontSize: 13,
                                  }}
                                >
                                  ???????????????????????? : {listValue.working_section}
                                </Typography>
                              </Paper>
                            </TimelineContent>
                          </TimelineItem>
                        );
                      })}
                      <TimelineItem>
                        <TimelineDot variant="outlined" />
                        <TimelineContent></TimelineContent>
                      </TimelineItem>
                    </Timeline>
                  </Card>
                </TableContainer>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Grid>

        <Grid item xs>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>????????????????????????</Accordion.Header>
              <Accordion.Body>
                <TableContainer style={{ fontFamily: "Prompt" }}>
                  <Card>
                    <CardBody className="card-header-border rc-body3">
                      <CardTitle
                        tag="h6"
                        style={{ padding: 5, color: "black" }}
                        className={(classes.customLabel, classes.headerLabel)}
                      >
                        ????????????????????????
                      </CardTitle>
                    </CardBody>
                    {purchasing.map((listValue, index) => {
                      return (
                        <Card
                          className="card-header-border card-border"
                          style={{
                            width: "90%",
                            margin: " 10px 5% 10px 5%",
                            position: "center",
                          }}
                          variant="outlined"
                        >
                          <Typography
                            style={{ fontFamily: "Prompt" }}
                            gutterBottom
                          >
                            ????????????: {listValue.purchasing_equipment_name_th}
                          </Typography>
                          <Typography style={{ fontFamily: "Prompt" }}>
                            ??????????????????????????????: {listValue.purchasing_equipment_detail}
                          </Typography>
                          <Typography style={{ fontFamily: "Prompt" }}>
                            ?????????????????????: {listValue.purchasing_equipment_location}
                          </Typography>
                          <Typography style={{ fontFamily: "Prompt" }}>
                            {" "}
                            ????????????????????????: {listValue.report_reson}
                          </Typography>
                        </Card>
                      );
                    })}
                  </Card>
                  <p></p>
                </TableContainer>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Grid>
      </Grid>
    </div>
  );
}
