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

export default function Property(props) {
  const {
    concept_proposal_id,
    classes,
    valuePage1,
    handleChangePage1,

    classTimeline,
  } = props;
  const [patent1, setpatent1] = useState([]);
  const [patent2, setpatent2] = useState([]);
  const [patent3, setpatent3] = useState([]);
  const [patent4, setpatent4] = useState([]);
  const [patent5, setpatent5] = useState([]);
  const [patent6, setpatent6] = useState([]);
  const [patent7, setpatent7] = useState([]);
  const [patent8, setpatent8] = useState([]);
  const [patent9, setpatent9] = useState([]);

  const apiUrl = "https://kmapi.kims-rmuti.com";
  let id = atob(concept_proposal_id);

  useEffect(() => {
    axios.get(`${apiUrl}/api/get/us-patent/${id}`).then((result) => {
      const pd1 = result.data.filter(
        (obj) => obj.patent_type_name === "สิทธิบัตรการประดิษฐ์"
      );
      const pd2 = result.data.filter(
        (obj) => obj.patent_type_name === "สิทธิบัตรการออกแบบผลิตภัณฑ์"
      );
      const pd3 = result.data.filter(
        (obj) => obj.patent_type_name === "อนุสิทธิบัตร"
      );
      const pd4 = result.data.filter(
        (obj) => obj.patent_type_name === "ลิขสิทธิ์"
      );
      const pd5 = result.data.filter(
        (obj) => obj.patent_type_name === "เครื่องหมายการค้า"
      );
      const pd6 = result.data.filter(
        (obj) => obj.patent_type_name === "เครื่องหมายบริการ"
      );
      const pd7 = result.data.filter(
        (obj) => obj.patent_type_name === "เครื่องหมายรับรอง"
      );
      const pd8 = result.data.filter(
        (obj) => obj.patent_type_name === "เครื่องหมายร่วม"
      );
      const pd9 = result.data.filter(
        (obj) => obj.patent_type_name === "ทรัพย์สินทางอุตสาหกรรม"
      );
      // console.log(result.data);
      setpatent1(pd1);
      setpatent2(pd2);
      setpatent3(pd3);
      setpatent4(pd4);
      setpatent5(pd5);
      setpatent6(pd6);
      setpatent7(pd7);
      setpatent8(pd8);
      setpatent9(pd9);
    });
  }, []);

  return (
    <TableContainer className="card-header-border card-border">
      <ThemeProvider theme={customTheme}>
        <div className={classes.root}>
          <AppBar position="center" color="default" className={classes.appbar}>
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
              {patent1 && patent1.length > 0 && patent1[0] && (
                <Tab
                  label="สิทธิบัตรการประดิษฐ์"
                  className={classes.customLabel}
                  value={1}
                />
              )}
              {patent2 && patent2.length > 0 && patent2[0] && (
                <Tab
                  label="สิทธิบัตรการออกแบบผลิตภัณฑ์"
                  className={classes.customLabel}
                  value={2}
                />
              )}
              {patent3 && patent3.length > 0 && patent3[0] && (
                <Tab
                  label="อนุสิทธิบัตร"
                  className={classes.customLabel}
                  value={3}
                />
              )}
              {patent4 && patent4.length > 0 && patent4[0] && (
                <Tab
                  label="ลิขสิทธิ์"
                  className={classes.customLabel}
                  value={4}
                />
              )}
              {patent5 && patent5.length > 0 && patent5[0] && (
                <Tab
                  label="เครื่องหมายการค้า"
                  className={classes.customLabel}
                  value={5}
                />
              )}
              {patent6 && patent6.length > 0 && patent6[0] && (
                <Tab
                  label="เครื่องหมายบริการ"
                  className={classes.customLabel}
                  value={6}
                />
              )}
              {patent7 && patent7.length > 0 && patent7[0] && (
                <Tab
                  label="เครื่องหมายรับรอง"
                  className={classes.customLabel}
                  value={7}
                />
              )}
              {patent8 && patent8.length > 0 && patent8[0] && (
                <Tab
                  label="เครื่องหมายร่วม"
                  className={classes.customLabel}
                  value={8}
                />
              )}
              {patent9 && patent9.length > 0 && patent9[0] && (
                <Tab
                  label="ทรัพย์สินทางอุตสาหกรรม"
                  className={classes.customLabel}
                  value={9}
                />
              )}
            </Tabs>
          </AppBar>
        </div>
        <TabPanel value={valuePage1} index={1} className="rc-body2">
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
                      สิทธิบัตรการประดิษฐ์
                    </CardTitle>
                  </CardBody>
                  <Timeline align="alternate" className="rc-body3">
                    {patent1.map((listValue, index) => {
                      return (
                        <TimelineItem>
                          <TimelineOppositeContent align="left">
                            <Typography
                              style={{ fontFamily: "Prompt" }}
                              variant="body2"
                              padding="1px 1px 1px 1px"
                            >
                              {listValue.patent_date
                                ? new Date(
                                    listValue.patent_date
                                  ).toLocaleDateString("th-TH", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })
                                : ""}
                            </Typography>
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <TimelineDot color="secondary" variant="outlined">
                              <GrSolaris />
                            </TimelineDot>
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent align="left">
                            <Paper
                              elevation={5}
                              className={classTimeline.paper}
                            >
                              <div>
                                {listValue.patent_images ? (
                                  <img
                                    src={`https://researcher.kims-rmuti.com/file-upload/patent-upload/${listValue.patent_images}`}
                                    height="200px"
                                    width="auto"
                                    style={{}}
                                  />
                                ) : (
                                  <div>
                                    <p></p>
                                  </div>
                                )}
                              </div>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                ชื่อสิทธิบัตร : {listValue.patent_name_th}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                หมายเลขสิทธิบัตร : {listValue.patent_number}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                เลขที่คำขอ : {listValue.patent_request}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                หมายเลขสิทธิบัตร : {listValue.patent_number}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                เลขที่คำขอ : {listValue.patent_request}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                ประเภทสิทธิบัตร : {listValue.patent_type_name}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                ประเทศ :{listValue.publication_country}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                เอกสาร :
                                {listValue.patent_attachment ? (
                                  <Button>
                                    <a
                                      target="_blank"
                                      href={`https://researcher.kims-rmuti.com/file-upload/patent-upload/${listValue.patent_attachment}`}
                                      rel="noreferrer"
                                    >
                                      {listValue.patent_attachment.slice(0, 60)}{" "}
                                    </a>
                                  </Button>
                                ) : (
                                  <p></p>
                                )}
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
        <TabPanel value={valuePage1} index={2} className="rc-body2">
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
                      สิทธิบัตรการออกแบบผลิตภัณฑ์
                    </CardTitle>
                  </CardBody>
                  <Timeline align="alternate" className="rc-body3">
                    {patent2.map((listValue, index) => {
                      return (
                        <TimelineItem>
                          <TimelineOppositeContent align="left">
                            <Typography
                              style={{ fontFamily: "Prompt" }}
                              variant="body2"
                              padding="1px 1px 1px 1px"
                            >
                              {listValue.patent_date
                                ? new Date(
                                    listValue.patent_date
                                  ).toLocaleDateString("th-TH", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })
                                : ""}
                            </Typography>
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <TimelineDot color="secondary" variant="outlined">
                              <GrSolaris />
                            </TimelineDot>
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent align="left">
                            <Paper
                              elevation={5}
                              className={classTimeline.paper}
                            >
                              <div>
                                {listValue.patent_images ? (
                                  <img
                                    src={`https://researcher.kims-rmuti.com/file-upload/patent-upload/${listValue.patent_images}`}
                                    height="200px"
                                    width="auto"
                                    style={{}}
                                  />
                                ) : (
                                  <div>
                                    <p></p>
                                  </div>
                                )}
                              </div>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                ชื่อสิทธิบัตร : {listValue.patent_name_th}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                หมายเลขสิทธิบัตร : {listValue.patent_number}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                เลขที่คำขอ : {listValue.patent_request}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                ประเภทสิทธิบัตร : {listValue.patent_type_name}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                ประเทศ :{listValue.publication_country}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                เอกสาร :
                                {listValue.patent_attachment ? (
                                  <Button>
                                    <a
                                      target="_blank"
                                      href={`https://researcher.kims-rmuti.com/file-upload/patent-upload/${listValue.patent_attachment}`}
                                      rel="noreferrer"
                                    >
                                      {listValue.patent_attachment.slice(0, 60)}{" "}
                                    </a>
                                  </Button>
                                ) : (
                                  <p></p>
                                )}
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
        <TabPanel value={valuePage1} index={3} className="rc-body2">
          <Grid container spacing={1}>
            <Grid item xs>
              <TableContainer
                style={{ fontFamily: "Prompt" }}
                className="card-header-border card-border"
              >
                <Card>
                  <CardBody className="card-header-border card-border">
                    <CardTitle
                      tag="h6"
                      style={{ padding: 5, color: "black" }}
                      className={(classes.customLabel, classes.headerLabel)}
                    >
                      อนุสิทธิบัตร
                    </CardTitle>
                  </CardBody>
                  <Timeline align="alternate" className="rc-body3">
                    {patent3.map((listValue, index) => {
                      return (
                        <TimelineItem>
                          <TimelineOppositeContent align="left">
                            <Typography
                              style={{ fontFamily: "Prompt" }}
                              variant="body2"
                              padding="1px 1px 1px 1px"
                            >
                              {listValue.patent_date
                                ? new Date(
                                    listValue.patent_date
                                  ).toLocaleDateString("th-TH", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })
                                : ""}
                            </Typography>
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <TimelineDot color="secondary" variant="outlined">
                              <GrSolaris />
                            </TimelineDot>
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent align="left">
                            <Paper
                              elevation={5}
                              className={classTimeline.paper}
                              align="center"
                            >
                              <div>
                                {listValue.patent_images ? (
                                  <img
                                    src={`https://researcher.kims-rmuti.com/file-upload/patent-upload/${listValue.patent_images}`}
                                    height="200px"
                                    width="auto"
                                    style={{}}
                                  />
                                ) : (
                                  <div>
                                    <p></p>
                                  </div>
                                )}
                              </div>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                ชื่อสิทธิบัตร : {listValue.patent_name_th}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                หมายเลขสิทธิบัตร : {listValue.patent_number}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                เลขที่คำขอ : {listValue.patent_request}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                ประเภทสิทธิบัตร : {listValue.patent_type_name}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                ประเทศ :{listValue.publication_country}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                เอกสาร :
                                {listValue.patent_attachment ? (
                                  <Button>
                                    <a
                                      target="_blank"
                                      href={`https://researcher.kims-rmuti.com/file-upload/patent-upload/${listValue.patent_attachment}`}
                                      rel="noreferrer"
                                    >
                                      {listValue.patent_attachment.slice(0, 60)}{" "}
                                    </a>
                                  </Button>
                                ) : (
                                  <p></p>
                                )}
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
                      ลิขสิทธิ์
                    </CardTitle>
                  </CardBody>
                  <Timeline align="alternate" className="rc-body3">
                    {patent4.map((listValue, index) => {
                      return (
                        <TimelineItem>
                          <TimelineOppositeContent align="left">
                            <Typography
                              style={{ fontFamily: "Prompt" }}
                              variant="body2"
                              padding="1px 1px 1px 1px"
                            >
                              {listValue.patent_date
                                ? new Date(
                                    listValue.patent_date
                                  ).toLocaleDateString("th-TH", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })
                                : ""}
                            </Typography>
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <TimelineDot color="secondary" variant="outlined">
                              <GrSolaris />
                            </TimelineDot>
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent align="left">
                            <Paper
                              elevation={5}
                              className={classTimeline.paper}
                            >
                              <div>
                                {listValue.patent_images ? (
                                  <img
                                    src={`https://researcher.kims-rmuti.com/file-upload/patent-upload/${listValue.patent_images}`}
                                    height="200px"
                                    width="auto"
                                    style={{}}
                                  />
                                ) : (
                                  <div>
                                    <p></p>
                                  </div>
                                )}
                              </div>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                ชื่อสิทธิบัตร : {listValue.patent_name_th}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                หมายเลขสิทธิบัตร : {listValue.patent_number}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                เลขที่คำขอ : {listValue.patent_request}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                ประเภทสิทธิบัตร : {listValue.patent_type_name}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                ประเทศ :{listValue.publication_country}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                เอกสาร :
                                {listValue.patent_attachment ? (
                                  <Button>
                                    <a
                                      target="_blank"
                                      href={`https://researcher.kims-rmuti.com/file-upload/patent-upload/${listValue.patent_attachment}`}
                                      rel="noreferrer"
                                    >
                                      {listValue.patent_attachment.slice(0, 60)}{" "}
                                    </a>
                                  </Button>
                                ) : (
                                  <p></p>
                                )}
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
        <TabPanel value={valuePage1} index={5} className="rc-body2">
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
                      เครื่องหมายการค้า
                    </CardTitle>
                  </CardBody>
                  <Timeline align="alternate" className="rc-body3">
                    {patent5.map((listValue, index) => {
                      return (
                        <TimelineItem>
                          <TimelineOppositeContent align="left">
                            <Typography
                              style={{ fontFamily: "Prompt" }}
                              variant="body2"
                              padding="1px 1px 1px 1px"
                            >
                              {listValue.patent_date
                                ? new Date(
                                    listValue.patent_date
                                  ).toLocaleDateString("th-TH", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })
                                : ""}
                            </Typography>
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <TimelineDot color="secondary" variant="outlined">
                              <GrSolaris />
                            </TimelineDot>
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent align="left">
                            <Paper
                              elevation={5}
                              className={classTimeline.paper}
                            >
                              <div>
                                {listValue.patent_images ? (
                                  <img
                                    src={`https://researcher.kims-rmuti.com/file-upload/patent-upload/${listValue.patent_images}`}
                                    height="200px"
                                    width="auto"
                                    style={{}}
                                  />
                                ) : (
                                  <div>
                                    <p></p>
                                  </div>
                                )}
                              </div>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                ชื่อสิทธิบัตร : {listValue.patent_name_th}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                หมายเลขสิทธิบัตร : {listValue.patent_number}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                เลขที่คำขอ : {listValue.patent_request}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                ประเภทสิทธิบัตร : {listValue.patent_type_name}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                ประเทศ :{listValue.publication_country}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                เอกสาร :
                                {listValue.patent_attachment ? (
                                  <Button>
                                    <a
                                      target="_blank"
                                      href={`https://researcher.kims-rmuti.com/file-upload/patent-upload/${listValue.patent_attachment}`}
                                      rel="noreferrer"
                                    >
                                      {listValue.patent_attachment.slice(0, 60)}{" "}
                                    </a>
                                  </Button>
                                ) : (
                                  <p></p>
                                )}
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
        <TabPanel value={valuePage1} index={6} className="rc-body2">
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
                      เครื่องหมายบริการ
                    </CardTitle>
                  </CardBody>
                  <Timeline align="alternate" className="rc-body3">
                    {patent6.map((listValue, index) => {
                      return (
                        <TimelineItem>
                          <TimelineOppositeContent align="left">
                            <Typography
                              style={{ fontFamily: "Prompt" }}
                              variant="body2"
                              padding="1px 1px 1px 1px"
                            >
                              {listValue.patent_date
                                ? new Date(
                                    listValue.patent_date
                                  ).toLocaleDateString("th-TH", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })
                                : ""}
                            </Typography>
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <TimelineDot color="secondary" variant="outlined">
                              <GrSolaris />
                            </TimelineDot>
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent align="left">
                            <Paper
                              elevation={5}
                              className={classTimeline.paper}
                            >
                              <div>
                                {listValue.patent_images ? (
                                  <img
                                    src={`https://researcher.kims-rmuti.com/file-upload/patent-upload/${listValue.patent_images}`}
                                    height="200px"
                                    width="auto"
                                    style={{}}
                                  />
                                ) : (
                                  <div>
                                    <p></p>
                                  </div>
                                )}
                              </div>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                ชื่อสิทธิบัตร : {listValue.patent_name_th}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                หมายเลขสิทธิบัตร : {listValue.patent_number}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                เลขที่คำขอ : {listValue.patent_request}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                ประเภทสิทธิบัตร : {listValue.patent_type_name}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                ประเทศ :{listValue.publication_country}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                เอกสาร :
                                {listValue.patent_attachment ? (
                                  <Button>
                                    <a
                                      target="_blank"
                                      href={`https://researcher.kims-rmuti.com/file-upload/patent-upload/${listValue.patent_attachment}`}
                                      rel="noreferrer"
                                    >
                                      {listValue.patent_attachment.slice(0, 60)}{" "}
                                    </a>
                                  </Button>
                                ) : (
                                  <p></p>
                                )}
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
        <TabPanel value={valuePage1} index={7} className="rc-body2">
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
                      เครื่องหมายรับรอง
                    </CardTitle>
                  </CardBody>
                  <Timeline align="alternate" className="rc-body3">
                    {patent7.map((listValue, index) => {
                      return (
                        <TimelineItem>
                          <TimelineOppositeContent align="left">
                            <Typography
                              style={{ fontFamily: "Prompt" }}
                              variant="body2"
                              padding="1px 1px 1px 1px"
                            >
                              {listValue.patent_date
                                ? new Date(
                                    listValue.patent_date
                                  ).toLocaleDateString("th-TH", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })
                                : ""}
                            </Typography>
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <TimelineDot color="secondary" variant="outlined">
                              <GrSolaris />
                            </TimelineDot>
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent align="left">
                            <Paper
                              elevation={5}
                              className={classTimeline.paper}
                            >
                              <div>
                                {listValue.patent_images ? (
                                  <img
                                    src={`https://researcher.kims-rmuti.com/file-upload/patent-upload/${listValue.patent_images}`}
                                    height="200px"
                                    width="auto"
                                    style={{}}
                                  />
                                ) : (
                                  <div>
                                    <p></p>
                                  </div>
                                )}
                              </div>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                ชื่อสิทธิบัตร : {listValue.patent_name_th}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                หมายเลขสิทธิบัตร : {listValue.patent_number}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                เลขที่คำขอ : {listValue.patent_request}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                ประเภทสิทธิบัตร : {listValue.patent_type_name}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                ประเทศ :{listValue.publication_country}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                เอกสาร :
                                {listValue.patent_attachment ? (
                                  <Button>
                                    <a
                                      target="_blank"
                                      href={`https://researcher.kims-rmuti.com/file-upload/patent-upload/${listValue.patent_attachment}`}
                                      rel="noreferrer"
                                    >
                                      {listValue.patent_attachment.slice(0, 60)}{" "}
                                    </a>
                                  </Button>
                                ) : (
                                  <p></p>
                                )}
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
        <TabPanel value={valuePage1} index={8} className="rc-body2">
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
                      เครื่องหมายร่วม
                    </CardTitle>
                  </CardBody>
                  <Timeline align="alternate" className="rc-body3">
                    {patent8.map((listValue, index) => {
                      return (
                        <TimelineItem>
                          <TimelineOppositeContent align="left">
                            <Typography
                              style={{ fontFamily: "Prompt" }}
                              variant="body2"
                              padding="1px 1px 1px 1px"
                            >
                              {listValue.patent_date
                                ? new Date(
                                    listValue.patent_date
                                  ).toLocaleDateString("th-TH", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })
                                : ""}
                            </Typography>
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <TimelineDot color="secondary" variant="outlined">
                              <GrSolaris />
                            </TimelineDot>
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent align="left">
                            <Paper
                              elevation={5}
                              className={classTimeline.paper}
                            >
                              <div>
                                {listValue.patent_images ? (
                                  <img
                                    src={`https://researcher.kims-rmuti.com/file-upload/patent-upload/${listValue.patent_images}`}
                                    height="200px"
                                    width="auto"
                                    style={{}}
                                  />
                                ) : (
                                  <div>
                                    <p></p>
                                  </div>
                                )}
                              </div>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                ชื่อสิทธิบัตร : {listValue.patent_name_th}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                หมายเลขสิทธิบัตร : {listValue.patent_number}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                เลขที่คำขอ : {listValue.patent_request}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                ประเภทสิทธิบัตร : {listValue.patent_type_name}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                ประเทศ :{listValue.publication_country}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                เอกสาร :
                                {listValue.patent_attachment ? (
                                  <Button>
                                    <a
                                      target="_blank"
                                      href={`https://researcher.kims-rmuti.com/file-upload/patent-upload/${listValue.patent_attachment}`}
                                      rel="noreferrer"
                                    >
                                      {listValue.patent_attachment.slice(0, 60)}{" "}
                                    </a>
                                  </Button>
                                ) : (
                                  <p></p>
                                )}
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
        <TabPanel value={valuePage1} index={9} className="rc-body2">
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
                      ทรัพย์สินทางอุตสาหกรรม
                    </CardTitle>
                  </CardBody>
                  <Timeline align="alternate" className="rc-body3">
                    {patent9.map((listValue, index) => {
                      return (
                        <TimelineItem>
                          <TimelineOppositeContent align="left">
                            <Typography
                              style={{ fontFamily: "Prompt" }}
                              variant="body2"
                              padding="1px 1px 1px 1px"
                            >
                              {listValue.patent_date
                                ? new Date(
                                    listValue.patent_date
                                  ).toLocaleDateString("th-TH", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })
                                : ""}
                            </Typography>
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <TimelineDot color="secondary" variant="outlined">
                              <GrSolaris />
                            </TimelineDot>
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent align="left">
                            <Paper
                              elevation={5}
                              className={classTimeline.paper}
                            >
                              <div>
                                {listValue.patent_images ? (
                                  <img
                                    src={`https://researcher.kims-rmuti.com/file-upload/patent-upload/${listValue.patent_images}`}
                                    height="200px"
                                    width="auto"
                                    style={{}}
                                  />
                                ) : (
                                  <div>
                                    <p></p>
                                  </div>
                                )}
                              </div>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                ชื่อสิทธิบัตร : {listValue.patent_name_th}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                หมายเลขสิทธิบัตร : {listValue.patent_number}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                เลขที่คำขอ : {listValue.patent_request}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                ประเภทสิทธิบัตร : {listValue.patent_type_name}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                ประเทศ :{listValue.publication_country}
                              </Typography>
                              <Typography
                                style={{ fontFamily: "Prompt" }}
                                align="left"
                              >
                                เอกสาร :
                                {listValue.patent_attachment ? (
                                  <Button>
                                    <a
                                      target="_blank"
                                      href={`https://researcher.kims-rmuti.com/file-upload/patent-upload/${listValue.patent_attachment}`}
                                      rel="noreferrer"
                                    >
                                      {listValue.patent_attachment.slice(0, 60)}{" "}
                                    </a>
                                  </Button>
                                ) : (
                                  <p></p>
                                )}
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
      </ThemeProvider>
    </TableContainer>
  );
}
