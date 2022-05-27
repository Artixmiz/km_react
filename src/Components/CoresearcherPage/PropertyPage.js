import React, { useEffect, useState } from "react";

import { CardTitle, CardBody } from "reactstrap";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Typography from "@material-ui/core/Typography";
import "../Css/mapView.scss";
import { Card } from "react-bootstrap";

import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import Button from "@material-ui/core/Button";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";

import GetAppIcon from "@material-ui/icons/GetApp";

import { AiOutlineReconciliation } from "react-icons/ai";

import PropTypes from "prop-types";
import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import axios from "axios";

const customTheme = createTheme({
  palette: {
    secondary: {
      main: orange[500],
    },
  },
});

const useCard = makeStyles({
  root: {
    minWidth: 2,
    elevation: 15,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 140,
  },
});

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

export default function ProjectPage(props) {
  const { co_researcher_id, classes, valuePage1, handleChangePage1 } = props;
  const apiUrl = "https://kmapi.kims-rmuti.com";
  const [publication, setpublication] = useState([]);
  const [patent, setpatent] = useState([]);
  let id = atob(co_researcher_id);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/get/co-researcher/patent/${id}`)
      .then((result) => {
        setpatent(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        // setmserrorkn(err.response.data.message);
      });

    axios
      .get(`${apiUrl}/api/get/co-researcher/publication-group/${id}`)
      .then((result) => {
        setpublication(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

  return (
    <ThemeProvider theme={customTheme}>
      <div className={classes.root}>
        <AppBar position="static" color="default" className={classes.appbar}>
          <Tabs
            value={valuePage1}
            onChange={handleChangePage1}
            variant="scrollable"
            scrollButtons="on"
            TabIndicatorProps={{
              style: { background: "rgb(252, 113, 0)" },
            }}
            classes={{
              root: classes.abRoot,
              positionStatic: classes.abStatic,
            }}
            textColor="secondary"
            aria-label="scrollable tabs menu"
          >
            <Tab
              label="ทรัพย์สินทางปัญญา"
              className={classes.customLabel}
              {...a11yProps(0)}
            />
            <Tab
              label="เอกสารเผยแพร่"
              className={classes.customLabel}
              {...a11yProps(1)}
            />
          </Tabs>
        </AppBar>
      </div>

      <TabPanel value={valuePage1} index={0}>
        <Card className="card-header-border card-border">
          <CardBody className="card-header-border">
            <CardTitle
              tag="h6"
              style={{ padding: 5, color: "black" }}
              className={(classes.customLabel, classes.headerLabel)}
            >
              ทรัพย์สินทางปัญญา
            </CardTitle>
          </CardBody>
          <TableContainer component={Paper} style={{ fontFamily: "Prompt" }}>
            <Timeline align="alternate">
              {patent.map((listValue, index) => {
                return (
                  <Grid item xs={4} container justify="center">
                    <Card
                      style={{
                        width: "30",
                        margin: "30px 30px 30px 30px",
                        fontFamily: "Prompt",
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src={`https://researcher.kims-rmuti.com/file-upload/co_patent-upload/${listValue.co_patent_image}`}
                        height="auto"
                        width="150"
                      />
                      <Card.Body>
                        <Card.Title> {listValue.co_patent_name_th}</Card.Title>
                        <Card.Text>
                          {listValue.co_patent_name_EN}

                          <p>
                            {listValue.co_patent_registered_name}
                            <p></p>
                            วันที่ :&nbsp;
                            {listValue.co_patent_date
                              ? new Date(
                                  listValue.co_patent_date
                                ).toLocaleDateString("th-TH", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  weekday: "long",
                                })
                              : ""}
                            <p></p>
                            <Typography
                              className={useCard.pos}
                              color="textSecondary"
                              style={{ fontFamily: "Prompt" }}
                            >
                              ประเภทสิทธิบัตร :&nbsp;
                              {listValue.patent_type_name}
                            </Typography>
                          </p>
                          {/* <Typography
                                      style={{ fontFamily: "Prompt" }}
                                    >
                                      ถึง :&nbsp;{" "}
                                      {listValue.co_certificate_end
                                        ? new Date(
                                            listValue.co_certificate_start
                                          ).toLocaleDateString("th-TH", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            weekday: "long",
                                          })
                                        : ""}
                                    </Typography>
                                    <Typography
                                      align="center"
                                      className={useCard.pos}
                                      color="textSecondary"
                                      style={{ fontFamily: "Prompt" }}
                                    >
                                      สถานที่ :&nbsp;
                                      {listValue.co_certificate_venue}
                                    </Typography>
                                    <Typography
                                      align="center"
                                      className={useCard.pos}
                                      color="textSecondary"
                                      style={{ fontFamily: "Prompt" }}
                                    >
                                      ประเทศ :{" "}
                                      {listValue.co_certificate_country}
                                    </Typography> */}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Grid>
                );
              })}
            </Timeline>
          </TableContainer>
        </Card>
      </TabPanel>

      <TabPanel value={valuePage1} index={1}>
        <Card className="card-header-border card-border">
          <CardBody className="card-header-border">
            <CardTitle
              tag="h6"
              style={{ padding: 5, color: "black" }}
              className={(classes.customLabel, classes.headerLabel)}
            >
              เอกสารเผยแพร่
            </CardTitle>
          </CardBody>
          <TableContainer component={Paper} style={{ fontFamily: "Prompt" }}>
            <Timeline align="alternate">
              {publication.map((listValue, index) => {
                return (
                  <TimelineItem>
                    <TimelineOppositeContent align="left">
                      <Typography variant="body2" padding="1px 1px 1px 1px">
                        {listValue.patent_date}
                      </Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot
                        color="secondary"
                        variant="outlined"
                        className="card-header-border"
                      >
                        <AiOutlineReconciliation />
                      </TimelineDot>

                      <TimelineConnector />
                    </TimelineSeparator>

                    <TimelineContent align="left">
                      <Paper elevation={5}>
                        <Typography align="left" variant="h6" component="h6">
                          {listValue.educational_degree}
                        </Typography>

                        <Typography
                          align="left"
                          style={{
                            color: "blue",
                            fontFamily: "Prompt",
                          }}
                        >
                          &nbsp;{" "}
                          <h
                            style={{
                              color: "black",
                              fontFamily: "Prompt",
                            }}
                          >
                            ชื่อ
                          </h>
                          : &nbsp;
                          {listValue.co_researcher_publication_name_th}
                          &nbsp; ({listValue.co_researcher_publication_name_en})
                        </Typography>
                        <Typography
                          align="left"
                          style={{
                            color: "blue",
                            fontFamily: "Prompt",
                          }}
                        >
                          &nbsp;{" "}
                          <h
                            style={{
                              color: "black",
                              fontFamily: "Prompt",
                            }}
                          >
                            ประเภท
                          </h>
                          : &nbsp;
                          {listValue.co_researcher_publication_publish}
                        </Typography>
                        <Typography
                          align="left"
                          style={{
                            color: "blue",
                            fontFamily: "Prompt",
                          }}
                        >
                          &nbsp;{" "}
                          <h
                            style={{
                              color: "black",
                              fontFamily: "Prompt",
                            }}
                          >
                            {" "}
                            ประเทศ{" "}
                          </h>
                          : &nbsp;
                          {listValue.co_researcher_publication_country}
                        </Typography>
                        <Typography
                          align="left"
                          style={{
                            color: "blue",
                            fontFamily: "Prompt",
                          }}
                        >
                          &nbsp;{" "}
                          <h
                            style={{
                              color: "black",
                              fontFamily: "Prompt",
                            }}
                          >
                            {" "}
                            วันที่{" "}
                          </h>
                          : &nbsp;
                          {listValue.co_researcher_publication_date
                            ? new Date(
                                listValue.co_researcher_publication_date
                              ).toLocaleDateString("th-TH", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                weekday: "long",
                              })
                            : " "}
                        </Typography>
                        <Typography
                          align="left"
                          style={{
                            color: "blue",
                            fontFamily: "Prompt",
                          }}
                        >
                          &nbsp; {listValue.co_researcher_publication_type_name}
                        </Typography>
                        <Button>
                          <a
                            target="_blank"
                            href={`https://researcher.kims-rmuti.com/file-upload/publication-upload/${listValue.patent_attachment}`}
                            rel="noreferrer"
                          >
                            {listValue.co_researcher_publication_attachment}
                            <GetAppIcon />
                          </a>
                        </Button>
                      </Paper>
                    </TimelineContent>
                  </TimelineItem>
                );
              })}
            </Timeline>
          </TableContainer>
        </Card>
      </TabPanel>
    </ThemeProvider>
  );
}
