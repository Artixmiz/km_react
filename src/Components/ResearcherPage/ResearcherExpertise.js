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
import { useEffect, useState } from "react";
import axios from "axios";

const customTheme = createTheme({
  palette: {
    secondary: {
      main: orange[500],
    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-controls={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography style={{ fontFamily: "Prompt" }}>{children}</Typography>
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

export default function ExpertisePage(props) {
  const {
    concept_proposal_id,
    classes,
    valuePage1,
    handleChangePage1,
    user,
    classTimeline,
  } = props;

  const [award, setaward] = useState([]);
  const [coaward, setcoaward] = useState([]);
  const [certificate, setcertificate] = useState([]);
  const [cocertificate, setcocertificate] = useState([]);
  const [professional, setprofessional] = useState([]);
  const [expertise, setexpertise] = useState([]);
  const [consulting, setconsulting] = useState([]);

  const apiUrl = "https://kmapi.kims-rmuti.com";
  let id = atob(concept_proposal_id);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/get/consulting_experience/${id}`)
      .then((result) => {
        // console.log(result.data);
        setconsulting(result.data);
      });

    axios.get(`${apiUrl}/api/get/professional_license/${id}`).then((result) => {
      // console.log(result.data);
      setprofessional(result.data);
    });

    axios.get(`${apiUrl}/api/get/us-award/${id}`).then((result) => {
      // console.log(result.data);
      setaward(result.data);
    });

    axios.get(`${apiUrl}/api/get/us-expertise/${id}`).then((result) => {
      // console.log(result.data);
      setexpertise(result.data);
    });

    axios.get(`${apiUrl}/api/get/bb-user/award/${id}`).then((result) => {
      // console.log(result.data);
      setcoaward(result.data);
    });

    axios.get(`${apiUrl}/api/get/us-certificate/${id}`).then((result) => {
      // console.log(result.data);
      setcertificate(result.data);
    });

    axios.get(`${apiUrl}/api/get/bb-user/certificate/${id}`).then((result) => {
      // console.log(result.data);
      setcocertificate(result.data);
    });
  }, []);

  return (
    <TableContainer className="card-header-border card-border">
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
              textColor="secondary"
              aria-label="scrollable tabs menu"
            >
              <Tab
                label="ความเชี่ยวชาญ"
                className={classes.customLabel}
                {...a11yProps(0)}
              />
              <Tab
                label="รางวัล"
                className={classes.customLabel}
                {...a11yProps(1)}
              />
              <Tab
                label="ใบประกาศ"
                className={classes.customLabel}
                {...a11yProps(2)}
              />
              {user && user.length > 0 && user[0].group_id === 1 && (
                <Tab
                  label="ใบประกอบวิชาชีพ"
                  className={classes.customLabel}
                  {...a11yProps(3)}
                />
              )}
              {user && user.length > 0 && user[0].group_id === 1 && (
                <Tab
                  label="ประสบการณ์การเป็นที่ปรึกษา"
                  className={classes.customLabel}
                  {...a11yProps(4)}
                />
              )}
            </Tabs>
          </AppBar>

          <div>
            <TabPanel value={valuePage1} index={0} className="rc-body2">
              <TableContainer
                style={{
                  fontFamily: "Prompt",
                  padding: "20px 20px 20px 20px",
                }}
              >
                {expertise.map((listValue, index) => {
                  return (
                    <Card
                      className="card-header-border card-border"
                      style={{
                        width: "100%",
                        margin: "0px 0px 10px 0px",
                      }}
                      variant="outlined"
                    >
                      <CardContent
                        elevation={5}
                        style={{
                          width: "100%",
                          height: "30%",
                          padding: "center",
                          backgroundcollor: "red",
                        }}
                      >
                        <Typography
                          style={{ fontFamily: "Prompt" }}
                          color="textSecondary"
                          gutterBottom
                        >
                          {listValue.certificate_agency}
                        </Typography>
                        <Typography style={{ fontFamily: "Prompt" }}>
                          {listValue.expertise_name}
                        </Typography>
                        <Typography
                          style={{ fontFamily: "Prompt" }}
                          color="textSecondary"
                        >
                          {listValue.expertise_type_name}
                        </Typography>
                        {user && user.length > 0 && user[0].group_id === 1 && (
                          <Typography
                            style={{ fontFamily: "Prompt" }}
                            color="textSecondary"
                          >
                            {" "}
                            ISCED {listValue.expertise_isced1}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </TableContainer>
            </TabPanel>
            <TabPanel value={valuePage1} index={1} className="rc-body2">
              <TableContainer
                style={{
                  fontFamily: "Prompt",
                  padding: "30px 20px 20px 20px",
                }}
              >
                {award.map((listValue, index) => {
                  return (
                    <Card
                      className="card-header-border card-border"
                      style={{
                        width: "100%",
                        margin: "0px 0px 5px 0px",
                      }}
                      variant="outlined"
                    >
                      {listValue.award_images ? (
                        <img
                          src={`https://researcher.kims-rmuti.com/file-upload/award-upload/${listValue.award_images}`}
                          height="500px"
                          width="auto"
                          style={{
                            padding: "0px 0px 35px 0px",
                          }}
                        />
                      ) : (
                        <div>
                          <p></p>
                        </div>
                      )}
                      <CardContent
                        style={{
                          width: "100%",
                          height: "30%",
                          padding: "10px auto",
                        }}
                      >
                        <Typography
                          style={{ fontFamily: "Prompt" }}
                          gutterBottom
                        >
                          {listValue.award_giver}
                        </Typography>
                        <Typography style={{ fontFamily: "Prompt" }}>
                          {listValue.award_name_th}
                          {listValue.award_name_en}
                        </Typography>
                        <Typography style={{ fontFamily: "Prompt" }}>
                          {listValue.award_Portfolio_th}
                          {listValue.award_Portfolio_en}
                        </Typography>
                        <Typography style={{ fontFamily: "Prompt" }}>
                          {listValue.award_date
                            ? new Date(listValue.award_date).toLocaleDateString(
                                "th-TH",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )
                            : ""}
                        </Typography>
                      </CardContent>
                    </Card>
                  );
                })}
              </TableContainer>

              <TableContainer
                style={{
                  fontFamily: "Prompt",
                  padding: "30px 20px 20px 20px",
                }}
              >
                {coaward.map((listValue, index) => {
                  return (
                    <Card
                      className="card-header-border card-border"
                      style={{
                        width: "100%",
                        margin: "0px 0px 5px 0px",
                      }}
                      variant="outlined"
                    >
                      {listValue.co_researcher_award_images ? (
                        <img
                          src={`https://researcher.kims-rmuti.com/file-upload/co-award-upload/${listValue.co_researcher_award_images}`}
                          height="500px"
                          width="auto"
                          style={{
                            padding: "0px 0px 35px 0px",
                          }}
                        />
                      ) : (
                        <div>
                          <p></p>
                        </div>
                      )}
                      <CardContent
                        style={{
                          width: "100%",
                          height: "30%",
                          padding: "10px auto",
                        }}
                      >
                        <Typography
                          style={{ fontFamily: "Prompt" }}
                          gutterBottom
                        >
                          {" "}
                          ผู้มอบ : &nbsp;
                          {listValue.co_researcher_award_giver}
                        </Typography>
                        <Typography style={{ fontFamily: "Prompt" }}>
                          {" "}
                          รางวัล : &nbsp;
                          {listValue.co_researcher_award_name_th
                            ? listValue.co_researcher_award_name_th
                            : listValue.co_researcher_award_name_en}
                        </Typography>
                        <Typography style={{ fontFamily: "Prompt" }}>
                          {listValue.co_researcher_award_Portfolio_th
                            ? listValue.co_researcher_award_Portfolio_th
                            : listValue.co_researcher_award_Portfolio_en}
                        </Typography>
                        <Typography style={{ fontFamily: "Prompt" }}>
                          {listValue.co_researcher_award_date
                            ? new Date(
                                listValue.co_researcher_award_date
                              ).toLocaleDateString("th-TH", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : ""}
                        </Typography>
                      </CardContent>
                    </Card>
                  );
                })}
              </TableContainer>
            </TabPanel>
            <TabPanel value={valuePage1} index={2} className="rc-body2">
              <TableContainer
                style={{
                  fontFamily: "Prompt",
                  padding: "20px 20px 20px 20px",
                }}
              >
                {certificate.map((listValue, index) => {
                  return (
                    <Card
                      elevation={15}
                      className="card-header-border card-border"
                      style={{
                        width: "100%",
                        margin: "0px 0px 5px 0px",
                      }}
                      variant="outlined"
                    >
                      <CardContent
                        style={{
                          width: "100%",
                          height: "30%",
                          padding: "center",
                        }}
                      >
                        <div>
                          {listValue.certificate_images ? (
                            <img
                              src={`https://researcher.kims-rmuti.com/file-upload/certificate-upload/${listValue.certificate_images}`}
                              height="500px"
                              width="auto"
                              style={{
                                padding: "0px 0px 35px 0px",
                              }}
                            />
                          ) : (
                            <div>
                              <p></p>
                            </div>
                          )}
                        </div>
                        <Typography
                          style={{ fontFamily: "Prompt" }}
                          color="textSecondary"
                          gutterBottom
                        >
                          {listValue.certificate_agency}
                        </Typography>
                        <Typography style={{ fontFamily: "Prompt" }}>
                          {listValue.certificate_name}
                        </Typography>
                        <Typography
                          style={{ fontFamily: "Prompt" }}
                          color="textSecondary"
                        >
                          อบรม วันที่
                          {
                            listValue.certificate_start
                            // ? new Date(
                            //     listValue.co_certificate_start
                            //   ).toLocaleDateString("th-TH", {
                            //     year: "numeric",
                            //     month: "long",
                            //     day: "numeric",
                            //   })
                            // : ""
                          }
                          ถึง
                          {
                            listValue.certificate_end
                            // ? new Date(
                            //     listValue.co_certificate_start
                            //   ).toLocaleDateString("th-TH", {
                            //     year: "numeric",
                            //     month: "long",
                            //     day: "numeric",
                            //     weekday: "long",
                            //   })
                            // : ""
                          }
                        </Typography>
                        <Typography
                          style={{ fontFamily: "Prompt" }}
                          color="textSecondary"
                        >
                          ที่ {listValue.certificate_venue}
                        </Typography>
                        <Typography
                          style={{ fontFamily: "Prompt" }}
                          color="textSecondary"
                        >
                          ประเทศ {listValue.certificate_country}
                        </Typography>
                      </CardContent>
                    </Card>
                  );
                })}

                {cocertificate.map((listValue, index) => {
                  return (
                    <Card
                      elevation={15}
                      className="card-header-border card-border"
                      style={{
                        width: "100%",
                        margin: "0px 0px 5px 0px",
                      }}
                      variant="outlined"
                    >
                      <CardContent
                        style={{
                          width: "100%",
                          height: "30%",
                          padding: "center",
                        }}
                      >
                        <div>
                          {listValue.co_certificate_image ? (
                            <img
                              src={`https://researcher.kims-rmuti.com/file-upload/co_certificate-upload/${listValue.co_certificate_image}`}
                              height="500px"
                              width="auto"
                              style={{
                                padding: "0px 0px 35px 0px",
                              }}
                            />
                          ) : (
                            <div>
                              <p></p>
                            </div>
                          )}
                        </div>
                        <Typography
                          style={{ fontFamily: "Prompt" }}
                          color="textSecondary"
                          gutterBottom
                        >
                          {listValue.co_certificate_agency}
                        </Typography>
                        <Typography style={{ fontFamily: "Prompt" }}>
                          {listValue.co_certificate_name_th}
                        </Typography>
                        <Typography
                          style={{ fontFamily: "Prompt" }}
                          color="textSecondary"
                        >
                          อบรม วันที่
                          {listValue.co_certificate_start
                            ? new Date(
                                listValue.co_certificate_start
                              ).toLocaleDateString("th-TH", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : ""}
                          ถึง
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
                          style={{ fontFamily: "Prompt" }}
                          color="textSecondary"
                        >
                          ที่ {listValue.co_certificate_venue}
                        </Typography>
                        <Typography
                          style={{ fontFamily: "Prompt" }}
                          color="textSecondary"
                        >
                          ประเทศ {listValue.co_certificate_country}
                        </Typography>
                      </CardContent>
                    </Card>
                  );
                })}
              </TableContainer>
            </TabPanel>
            <TabPanel value={valuePage1} index={3} className="rc-body2">
              <Grid container spacing={1}>
                <Grid item xs>
                  <TableContainer
                    style={{ fontFamily: "Prompt" }}
                    className="card-header-border card-border "
                  >
                    <Card>
                      <CardBody className="card-header-border">
                        <CardTitle
                          tag="h6"
                          style={{ padding: 5, color: "black" }}
                          className={(classes.customLabel, classes.headerLabel)}
                        >
                          ใบประกอบวิชาชีพ
                        </CardTitle>
                      </CardBody>
                      <Timeline align="alternate" className="rc-body3">
                        {professional.map((listValue, index) => {
                          return (
                            <TimelineItem>
                              <TimelineSeparator>
                                <TimelineDot
                                  color="secondary"
                                  variant="outlined"
                                >
                                  <GrSolaris />
                                </TimelineDot>
                                <TimelineConnector />
                              </TimelineSeparator>
                              <TimelineContent align="left">
                                <Paper
                                  elevation={5}
                                  className={classTimeline.paper}
                                >
                                  <Typography
                                    style={{
                                      fontFamily: "Prompt",
                                    }}
                                    align="left"
                                  >
                                    ชื่อใบประกอบวิชาชีพ :{" "}
                                    {listValue.license_name}
                                  </Typography>
                                  <Typography
                                    style={{
                                      fontFamily: "Prompt",
                                    }}
                                    align="left"
                                  >
                                    เลขที่ใบประกอบวิชาชีพ :{" "}
                                    {listValue.license_number}
                                  </Typography>
                                  <Typography
                                    style={{
                                      fontFamily: "Prompt",
                                    }}
                                    align="left"
                                  >
                                    วันหมดอายุใบประกอบวิชาชีพ :
                                    {listValue.license_expiration}
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
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={valuePage1} index={4} className="rc-body2">
              <Grid container spacing={1}>
                <Grid item xs>
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
                          ประสบการณ์การเป็นที่ปรึกษา
                        </CardTitle>
                      </CardBody>
                      <Timeline align="alternate" className="rc-body3">
                        {consulting.map((listValue, index) => {
                          return (
                            <TimelineItem>
                              <TimelineOppositeContent align="left">
                                <Typography
                                  style={{ fontFamily: "Prompt" }}
                                  variant="body2"
                                  padding="1px 1px 1px 1px"
                                >
                                  {listValue.consulting_experience_start
                                    ? new Date(
                                        listValue.consulting_experience_start
                                      ).toLocaleDateString("th-TH", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      })
                                    : ""}
                                  -
                                  {listValue.consulting_experience_end
                                    ? new Date(
                                        listValue.consulting_experience_end
                                      ).toLocaleDateString("th-TH", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      })
                                    : ""}
                                </Typography>
                              </TimelineOppositeContent>
                              <TimelineSeparator>
                                <TimelineDot
                                  color="secondary"
                                  variant="outlined"
                                >
                                  <GrSolaris />
                                </TimelineDot>
                                <TimelineConnector />
                              </TimelineSeparator>
                              <TimelineContent align="left">
                                <Paper
                                  elevation={5}
                                  className={classTimeline.paper}
                                >
                                  <Typography
                                    style={{
                                      fontFamily: "Prompt",
                                    }}
                                    align="left"
                                  >
                                    ชื่อชื่อโครงการ/ผลงาน :{" "}
                                    {listValue.consulting_experience_name}
                                  </Typography>
                                  <Typography
                                    style={{
                                      fontFamily: "Prompt",
                                    }}
                                    align="left"
                                  >
                                    ตำแหน่งในโครงการ :{" "}
                                    {listValue.consulting_experience_position}
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
                </Grid>
              </Grid>
            </TabPanel>
          </div>
        </div>
      </ThemeProvider>
    </TableContainer>
  );
}
