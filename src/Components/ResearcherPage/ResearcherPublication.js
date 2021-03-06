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
  BiMapPin,
  BiBookOpen,
  BiMedal,
  BiNews,
  BiGroup,
  BiCertification,
  BiInfoCircle,
  BiWorld,
} from "react-icons/bi";
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

export default function Publication(props) {
  const {
    concept_proposal_id,
    classes,
    valuePage1,
    handleChangePage1,
    Accordion,
    classTimeline,
    publication_type,
 
  } = props;

  //?????????????????????????????????????????????-???????????????????????????
  const [PubliTHA1, setPubliTHA1] = useState([]); //??????????????????
  const [PubliTHA2, setPubliTHA2] = useState([]); //???????????????????????????????????????
  const [PubliTHA3, setPubliTHA3] = useState([]); //?????????????????????????????????
  const [PubliTHA4, setPubliTHA4] = useState([]); //??????????????????

  //?????????????????????????????????????????????-????????????????????????
  const [PubliINTER1, setPubliINTER1] = useState([]);
  const [PubliINTER2, setPubliINTER2] = useState([]);
  const [PubliINTER3, setPubliINTER3] = useState([]);
  const [PubliINTER4, setPubliINTER4] = useState([]);

  //?????????????????????-?????????????????????-???????????????????????????
  const [CoPubliTHA1, setCoPubliTHA1] = useState([]); //???????????????????????????????????????
  const [CoPubliTHA2, setCoPubliTHA2] = useState([]); //????????????????????????????????????????????????????????????
  const [CoPubliTHA3, setCoPubliTHA3] = useState([]); //??????????????????????????????????????????????????????
  const [CoPubliTHA4, setCoPubliTHA4] = useState([]); //???????????????????????????????????????

  //?????????????????????-?????????????????????-????????????????????????
  const [CoPubliINTER1, setCoPubliINTER1] = useState([]);
  const [CoPubliINTER2, setCoPubliINTER2] = useState([]);
  const [CoPubliINTER3, setCoPubliINTER3] = useState([]);
  const [CoPubliINTER4, setCoPubliINTER4] = useState([]);

  const apiUrl = "https://kmapi.kims-rmuti.com";
  let id = atob(concept_proposal_id);

  useEffect(() => {
    axios
      //??????????????????
      .get(`${apiUrl}/api/get/us-publication?type=1&user_idcard=${id}`)
      .then((result) => {
        // const newDataTHA = result.data.filter(
        //   (obj) => obj.publication_country === "THA"
        // );

        // const newDataINTER = result.data.filter(
        //   (item) => item.publication_country !== "THA"
        // );
        // // console.log(result.data);
        // setPubliTHA1(newDataTHA);
        // setPubliINTER1(newDataINTER);
        setPubliTHA1(result.data);
      });

    axios
      //???????????????????????????????????????
      .get(`${apiUrl}/api/get/us-publication?type=2&user_idcard=${id}`)
      .then((result) => {
        // const newDataTHA = result.data.filter(
        //   (obj) => obj.publication_country === "THA"
        // );

        // const newDataINTER = result.data.filter(
        //   (item) => item.publication_country !== "THA"
        // );
        // // console.log(result.data);
        // setPubliTHA2(newDataTHA);
        // setPubliINTER2(newDataINTER);
        setPubliTHA2(result.data);
      });

    axios
      //???????????????
      .get(`${apiUrl}/api/get/us-publication?type=3&user_idcard=${id}`)
      .then((result) => {
        // const newDataTHA = result.data.filter(
        //   (obj) => obj.publication_country === "THA"
        // );

        // const newDataINTER = result.data.filter(
        //   (item) => item.publication_country !== "THA"
        // );
        // // console.log(result.data);
        // setPubliINTER3(newDataINTER);
        // setPubliTHA3(newDataTHA);
        setPubliTHA3(result.data);
      });

    axios
      //???????????????
      .get(`${apiUrl}/api/get/us-publication?type=4&user_idcard=${id}`)
      .then((result) => {
        setPubliINTER3(result.data);
      });

    axios
      //??????????????????
      .get(`${apiUrl}/api/get/us-publication?type=5&user_idcard=${id}`)
      .then((result) => {
        // const newDataTHA = result.data.filter(
        //   (obj) => obj.publication_country === "THA"
        // );

        // const newDataINTER = result.data.filter(
        //   (item) => item.publication_country !== "THA"
        // );
        // // console.log(result.data);
        // setPubliTHA4(newDataTHA);
        // setPubliINTER4(newDataINTER);
        setPubliTHA4(result.data);
      });

    axios
      //??????????????????
      .get(`${apiUrl}/api/get/us-publication?type=6&user_idcard=${id}`)
      .then((result) => {
        setPubliINTER4(result.data);
      });

   
    axios
      //???????????????????????????????????????
      .get(`${apiUrl}/api/get/bb-user/publication/type?co_pi_type=10&id=${id}`)
      .then((result) => {
        const newDataTHA = result.data.filter(
          (obj) => obj.co_researcher_publication_country === "THA"
        );

        const newDataINTER = result.data.filter(
          (item) => item.co_researcher_publication_country !== "THA"
        );
        console.log("newDataTHA", newDataTHA);
        console.log("newDataINTER", newDataINTER);

        setCoPubliTHA1(newDataTHA);
        setCoPubliINTER1(newDataINTER);
      });

    axios
      //????????????????????????????????????????????????????????????
      .get(`${apiUrl}/api/get/bb-user/publication/type?co_pi_type=5&id=${id}`)
      .then((result) => {
        const newDataTHA = result.data.filter(
          (obj) => obj.co_researcher_publication_country === "THA"
        );

        const newDataINTER = result.data.filter(
          (item) => item.co_researcher_publication_country !== "THA"
        );

        setCoPubliTHA2(newDataTHA);
        setCoPubliINTER2(newDataINTER);
      });

    axios
      //????????????????????????????????????????????????????????????
      .get(`${apiUrl}/api/get/bb-user/publication/type?co_pi_type=1&id=${id}`)
      .then((result) => {
        const newDataTHA = result.data.filter(
          (obj) => obj.co_researcher_publication_country === "THA"
        );

        const newDataINTER = result.data.filter(
          (item) => item.co_researcher_publication_country !== "THA"
        );

        setCoPubliTHA3(newDataTHA);
        setCoPubliINTER3(newDataINTER);
      });

    axios
      //???????????????????????????????????????
      .get(`${apiUrl}/api/get/bb-user/publication/type?co_pi_type=2&id=${id}`)
      .then((result) => {
        const newDataTHA = result.data.filter(
          (obj) => obj.co_researcher_publication_country === "THA"
        );

        const newDataINTER = result.data.filter(
          (item) => item.co_researcher_publication_country !== "THA"
        );

        setCoPubliTHA4(newDataTHA);
        setCoPubliINTER4(newDataINTER);
      });
  });
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
            textColor="secondary"
            aria-label="scrollable tabs menu"
          >
            <Tab
              label="?????????????????????/??????????????????"
              className={classes.customLabel}
              {...a11yProps(0)}
            />

            <Tab
              label="???????????????????????????????????????"
              className={classes.customLabel}
              {...a11yProps(1)}
            />
            <Tab
              label="??????????????????"
              className={classes.customLabel}
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        <div>
          <TabPanel value={valuePage1} index={0} className="rc-body2">
            <Grid container spacing={1}>
              <Grid item xs>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header> ?????????????????????</Accordion.Header>
                    <Accordion.Body>
                      <TableContainer
                        style={{ fontFamily: "Prompt" }}
                        className="card-header-border card-border"
                      >
                        <Card>
                          <CardBody className="card-header-border">
                            <CardTitle
                              tag="h6"
                              style={{
                                padding: 5,
                                color: "black",
                              }}
                              className={
                                (classes.customLabel, classes.headerLabel)
                              }
                            >
                              ?????????????????????
                            </CardTitle>
                          </CardBody>
                          <Timeline align="alternate" className="rc-body3">
                            <div>
                              {PubliTHA1.map((listValue, index) => {
                                return (
                                  <TimelineItem>
                                    <TimelineOppositeContent align="left">
                                      <Typography
                                        style={{
                                          fontFamily: "Prompt",
                                        }}
                                        variant="body2"
                                        padding="1px 1px 1px 1px"
                                      >
                                        {listValue.publication_date
                                          ? new Date(
                                              listValue.publication_date
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
                                        <BiNews />
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
                                          ?????????????????????????????????????????? :{" "}
                                          {listValue.publication_name_th
                                            ? listValue.publication_name_th
                                            : listValue.publication_name_en}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                          // variant="body2"
                                          // padding="1px 1px 1px 1px"
                                        >
                                          {/* {listValue.publication_type_name} */}
                                          ?????????????????? :{" "}
                                          {listValue.publication_type
                                            ? publication_type[
                                                listValue.publication_type
                                              ]
                                            : " "}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ????????????????????? :{" "}
                                          {listValue.publication_publish}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ??????????????????????????????????????????:{" "}
                                          {listValue.publication_issue}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ????????????????????????????????? :{" "}
                                          {listValue.quality_level}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ?????????????????? :{" "}
                                          {listValue.publication_country}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ??????????????????????????????????????? :
                                          {listValue.publication_link ? (
                                            <Button>
                                              <a
                                                target="_blank"
                                                href={
                                                  listValue.publication_link
                                                }
                                                rel="noreferrer"
                                              >
                                                {listValue.publication_link.slice(
                                                  8,
                                                  45
                                                )}{" "}
                                              </a>
                                            </Button>
                                          ) : (
                                            <p></p>
                                          )}
                                        </Typography>

                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ?????????????????? :
                                          {listValue.publication_attachment ? (
                                            <Button>
                                              <a
                                                target="_blank"
                                                href={`https://researcher.kims-rmuti.com/file-upload/publication-upload/${listValue.publication_attachment}`}
                                                rel="noreferrer"
                                              >
                                                {listValue.publication_attachment.slice(
                                                  0,
                                                  40
                                                )}{" "}
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
                            </div>
                            <div>
                              {CoPubliTHA1.map((listValue, index) => {
                                return (
                                  <TimelineItem>
                                    <TimelineOppositeContent align="left">
                                      <Typography
                                        style={{
                                          fontFamily: "Prompt",
                                        }}
                                        variant="body2"
                                        padding="1px 1px 1px 1px"
                                      >
                                        {listValue.co_researcher_publication_date
                                          ? new Date(
                                              listValue.co_researcher_publication_date
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
                                        <BiNews />
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
                                          ?????????????????????????????????????????? :{" "}
                                          {listValue.co_researcher_publication_name_th
                                            ? listValue.co_researcher_publication_name_th
                                            : listValue.co_researcher_publication_name_en}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                          // variant="body2"
                                          // padding="1px 1px 1px 1px"
                                        >
                                          {/* {listValue.publication_type_name} */}
                                          ?????????????????? :{" "}
                                          {listValue.co_researcher_publication_type_id
                                            ? publication_type[
                                                listValue
                                                  .co_researcher_publication_type_id
                                              ]
                                            : " "}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ????????????????????????????????? :{" "}
                                          {listValue.co_quality_level}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ????????????????????? :{" "}
                                          {
                                            listValue.co_researcher_publication_publish
                                          }
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ??????????????????????????????????????????:{" "}
                                          {
                                            listValue.co_researcher_publication_issue
                                          }
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ?????????????????? :{" "}
                                          {
                                            listValue.co_researcher_publication_country
                                          }
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ?????????????????? :
                                          {listValue.co_researcher_publication_attachment ? (
                                            <Button>
                                              <a
                                                target="_blank"
                                                href={`https://researcher.kims-rmuti.com/file-upload/co_publication-upload/${listValue.co_researcher_publication_attachment}`}
                                                rel="noreferrer"
                                              >
                                                {listValue.co_researcher_publication_attachment.slice(
                                                  0,
                                                  40
                                                )}{" "}
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
                            </div>
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
                    <Accordion.Header>??????????????????</Accordion.Header>
                    <Accordion.Body>
                      <TableContainer
                        style={{ fontFamily: "Prompt" }}
                        className="card-header-border card-border"
                      >
                        <Card>
                          <CardBody className="card-header-border">
                            <CardTitle
                              tag="h6"
                              style={{
                                padding: 5,
                                color: "black",
                              }}
                              className={
                                (classes.customLabel, classes.headerLabel)
                              }
                            >
                              ??????????????????
                            </CardTitle>
                          </CardBody>

                          <Timeline align="alternate" className="rc-body3">
                            <div>
                              {PubliTHA2.map(
                                (listValue, index, publication_type_id) => {
                                  return (
                                    <TimelineItem>
                                      <TimelineOppositeContent align="left">
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          variant="body2"
                                          padding="1px 1px 1px 1px"
                                        >
                                          {listValue.publication_date
                                            ? new Date(
                                                listValue.publication_date
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
                                          <BiNews />
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
                                            ?????????????????????????????????????????? :{" "}
                                            {listValue.publication_name_th
                                              ? listValue.publication_name_th
                                              : listValue.publication_name_en}
                                          </Typography>
                                          <Typography
                                            style={{
                                              fontFamily: "Prompt",
                                            }}
                                            align="left"
                                            // variant="body2"
                                            // padding="1px 1px 1px 1px"
                                          >
                                            {/* {listValue.publication_type_name} */}
                                            ?????????????????? :{" "}
                                            {listValue.publication_type
                                              ? publication_type[
                                                  listValue.publication_type
                                                ]
                                              : " "}
                                          </Typography>
                                          <Typography
                                            style={{
                                              fontFamily: "Prompt",
                                            }}
                                            align="left"
                                          >
                                            ????????????????????? :{" "}
                                            {listValue.publication_publish}
                                          </Typography>
                                          <Typography
                                            style={{
                                              fontFamily: "Prompt",
                                            }}
                                            align="left"
                                          >
                                            ??????????????????????????????????????????:{" "}
                                            {listValue.publication_issue}
                                          </Typography>
                                          <Typography
                                            style={{
                                              fontFamily: "Prompt",
                                            }}
                                            align="left"
                                          >
                                            ????????????????????????????????? :{" "}
                                            {listValue.quality_level}
                                          </Typography>
                                          <Typography
                                            style={{
                                              fontFamily: "Prompt",
                                            }}
                                            align="left"
                                          >
                                            ?????????????????? :{" "}
                                            {listValue.publication_country}
                                          </Typography>
                                          <Typography
                                            style={{
                                              fontFamily: "Prompt",
                                            }}
                                            align="left"
                                          >
                                            ??????????????????????????????????????? :
                                            {listValue.publication_link ? (
                                              <Button>
                                                <a
                                                  target="_blank"
                                                  href={
                                                    listValue.publication_link
                                                  }
                                                  rel="noreferrer"
                                                >
                                                  {listValue.publication_link.slice(
                                                    8,
                                                    45
                                                  )}{" "}
                                                </a>
                                              </Button>
                                            ) : (
                                              <p></p>
                                            )}
                                          </Typography>

                                          <Typography
                                            style={{
                                              fontFamily: "Prompt",
                                            }}
                                            align="left"
                                          >
                                            ?????????????????? :
                                            {listValue.publication_attachment ? (
                                              <Button>
                                                <a
                                                  target="_blank"
                                                  href={`https://researcher.kims-rmuti.com/file-upload/publication-upload/${listValue.publication_attachment}`}
                                                  rel="noreferrer"
                                                >
                                                  {listValue.publication_attachment.slice(
                                                    0,
                                                    40
                                                  )}{" "}
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
                                }
                              )}
                            </div>
                            <div>
                              {CoPubliTHA2.map((listValue, index) => {
                                return (
                                  <TimelineItem>
                                    <TimelineOppositeContent align="left">
                                      <Typography
                                        style={{
                                          fontFamily: "Prompt",
                                        }}
                                        variant="body2"
                                        padding="1px 1px 1px 1px"
                                      >
                                        {listValue.co_researcher_publication_date
                                          ? new Date(
                                              listValue.co_researcher_publication_date
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
                                        <BiNews />
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
                                          ?????????????????????????????????????????? :{" "}
                                          {listValue.co_researcher_publication_name_th
                                            ? listValue.co_researcher_publication_name_th
                                            : listValue.co_researcher_publication_name_en}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                          // variant="body2"
                                          // padding="1px 1px 1px 1px"
                                        >
                                          {/* {listValue.publication_type_name} */}
                                          ?????????????????? :{" "}
                                          {listValue.co_researcher_publication_type_id
                                            ? publication_type[
                                                listValue
                                                  .co_researcher_publication_type_id
                                              ]
                                            : " "}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ????????????????????? :{" "}
                                          {
                                            listValue.co_researcher_publication_publish
                                          }
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ??????????????????????????????????????????:{" "}
                                          {
                                            listValue.co_researcher_publication_issue
                                          }
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ????????????????????????????????? :{" "}
                                          {listValue.co_quality_level}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ?????????????????? :{" "}
                                          {
                                            listValue.co_researcher_publication_country
                                          }
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ?????????????????? :
                                          {listValue.co_researcher_publication_attachment ? (
                                            <Button>
                                              <a
                                                target="_blank"
                                                href={`https://researcher.kims-rmuti.com/file-upload/co_publication-upload/${listValue.co_researcher_publication_attachment}`}
                                                rel="noreferrer"
                                              >
                                                {listValue.co_researcher_publication_attachment.slice(
                                                  0,
                                                  40
                                                )}{" "}
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
                            </div>

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
            </Grid>
          </TabPanel>
          <TabPanel value={valuePage1} index={1} className="rc-body2">
            <Grid container spacing={1}>
              <Grid item xs>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>???????????????????????????</Accordion.Header>
                    <Accordion.Body>
                      <TableContainer
                        style={{ fontFamily: "Prompt" }}
                        className="card-header-border card-border"
                      >
                        <Card>
                          <CardBody className="card-header-border">
                            <CardTitle
                              tag="h6"
                              style={{
                                padding: 5,
                                color: "black",
                              }}
                              className={
                                (classes.customLabel, classes.headerLabel)
                              }
                            >
                              ???????????????????????????
                            </CardTitle>
                          </CardBody>
                          <Timeline align="alternate" className="rc-body3">
                            <div>
                              {PubliTHA3.map((listValue, index) => {
                                return (
                                  <TimelineItem>
                                    <TimelineOppositeContent align="left">
                                      <Typography
                                        style={{
                                          fontFamily: "Prompt",
                                        }}
                                        variant="body2"
                                        padding="1px 1px 1px 1px"
                                      >
                                        {listValue.publication_date
                                          ? new Date(
                                              listValue.publication_date
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
                                        <BiNews />
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
                                          ?????????????????????????????????????????? :{" "}
                                          {listValue.publication_name_th
                                            ? listValue.publication_name_th
                                            : listValue.publication_name_en}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                          // variant="body2"
                                          // padding="1px 1px 1px 1px"
                                        >
                                          {/* {listValue.publication_type_name} */}
                                          ?????????????????? :{" "}
                                          {listValue.publication_type
                                            ? publication_type[
                                                listValue.publication_type
                                              ]
                                            : " "}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ????????????????????? :{" "}
                                          {listValue.publication_publish}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ??????????????????????????????????????????:{" "}
                                          {listValue.publication_issue}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          <Typography
                                            style={{
                                              fontFamily: "Prompt",
                                            }}
                                            align="left"
                                          >
                                            ????????????????????????????????? :{" "}
                                            {listValue.quality_level}
                                          </Typography>
                                          ?????????????????? :{" "}
                                          {listValue.publication_country}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ??????????????????????????????????????? :
                                          {listValue.publication_link ? (
                                            <Button>
                                              <a
                                                target="_blank"
                                                href={
                                                  listValue.publication_link
                                                }
                                                rel="noreferrer"
                                              >
                                                {listValue.publication_link.slice(
                                                  8,
                                                  45
                                                )}{" "}
                                              </a>
                                            </Button>
                                          ) : (
                                            <p></p>
                                          )}
                                        </Typography>

                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ?????????????????? :
                                          {listValue.publication_attachment ? (
                                            <Button>
                                              <a
                                                target="_blank"
                                                href={`https://researcher.kims-rmuti.com/file-upload/publication-upload/${listValue.publication_attachment}`}
                                                rel="noreferrer"
                                              >
                                                {listValue.publication_attachment.slice(
                                                  0,
                                                  40
                                                )}{" "}
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
                            </div>
                            <div>
                              {CoPubliTHA3.map((listValue, index) => {
                                return (
                                  <TimelineItem>
                                    <TimelineOppositeContent align="left">
                                      <Typography
                                        style={{
                                          fontFamily: "Prompt",
                                        }}
                                        variant="body2"
                                        padding="1px 1px 1px 1px"
                                      >
                                        {listValue.co_researcher_publication_date
                                          ? new Date(
                                              listValue.co_researcher_publication_date
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
                                        <BiNews />
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
                                          ?????????????????????????????????????????? :{" "}
                                          {listValue.co_researcher_publication_name_th
                                            ? listValue.co_researcher_publication_name_th
                                            : listValue.co_researcher_publication_name_en}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                          // variant="body2"
                                          // padding="1px 1px 1px 1px"
                                        >
                                          {/* {listValue.publication_type_name} */}
                                          ?????????????????? :{" "}
                                          {listValue.co_researcher_publication_type_id
                                            ? publication_type[
                                                listValue
                                                  .co_researcher_publication_type_id
                                              ]
                                            : " "}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ????????????????????? :{" "}
                                          {
                                            listValue.co_researcher_publication_publish
                                          }
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ??????????????????????????????????????????:{" "}
                                          {
                                            listValue.co_researcher_publication_issue
                                          }
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ????????????????????????????????? :{" "}
                                          {listValue.co_quality_level}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ?????????????????? :{" "}
                                          {
                                            listValue.co_researcher_publication_country
                                          }
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ?????????????????? :
                                          {listValue.co_researcher_publication_attachment ? (
                                            <Button>
                                              <a
                                                target="_blank"
                                                href={`https://researcher.kims-rmuti.com/file-upload/co_publication-upload/${listValue.co_researcher_publication_attachment}`}
                                                rel="noreferrer"
                                              >
                                                {listValue.co_researcher_publication_attachment.slice(
                                                  0,
                                                  40
                                                )}{" "}
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
                            </div>

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
                    <Accordion.Header>???????????????????????????????????????</Accordion.Header>
                    <Accordion.Body>
                      <TableContainer
                        style={{ fontFamily: "Prompt" }}
                        className="card-header-border card-border"
                      >
                        <Card>
                          <CardBody className="card-header-border">
                            <CardTitle
                              tag="h6"
                              style={{
                                padding: 5,
                                color: "black",
                              }}
                              className={
                                (classes.customLabel, classes.headerLabel)
                              }
                            >
                              ???????????????????????????????????????
                            </CardTitle>
                          </CardBody>
                          <Timeline align="alternate" className="rc-body3">
                            <div>
                              {PubliINTER3.map((listValue, index) => {
                                return (
                                  <TimelineItem>
                                    <TimelineOppositeContent align="left">
                                      <Typography
                                        style={{
                                          fontFamily: "Prompt",
                                        }}
                                        variant="body2"
                                        padding="1px 1px 1px 1px"
                                      >
                                        {listValue.publication_date
                                          ? new Date(
                                              listValue.publication_date
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
                                        <BiNews />
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
                                          ?????????????????????????????????????????? :{" "}
                                          {listValue.publication_name_th
                                            ? listValue.publication_name_th
                                            : listValue.publication_name_en}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                          // variant="body2"
                                          // padding="1px 1px 1px 1px"
                                        >
                                          {/* {listValue.publication_type_name} */}
                                          ?????????????????? :{" "}
                                          {listValue.publication_type
                                            ? publication_type[
                                                listValue.publication_type
                                              ]
                                            : " "}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ????????????????????? :{" "}
                                          {listValue.publication_publish}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ??????????????????????????????????????????:{" "}
                                          {listValue.publication_issue}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ????????????????????????????????? :{" "}
                                          {listValue.quality_level}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ?????????????????? :{" "}
                                          {listValue.publication_country}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ??????????????????????????????????????? :
                                          {listValue.publication_link ? (
                                            <Button>
                                              <a
                                                target="_blank"
                                                href={
                                                  listValue.publication_link
                                                }
                                                rel="noreferrer"
                                              >
                                                {listValue.publication_link.slice(
                                                  8,
                                                  45
                                                )}{" "}
                                              </a>
                                            </Button>
                                          ) : (
                                            <p></p>
                                          )}
                                        </Typography>

                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ?????????????????? :
                                          {listValue.publication_attachment ? (
                                            <Button>
                                              <a
                                                target="_blank"
                                                href={`https://researcher.kims-rmuti.com/file-upload/publication-upload/${listValue.publication_attachment}`}
                                                rel="noreferrer"
                                              >
                                                {listValue.publication_attachment.slice(
                                                  0,
                                                  40
                                                )}{" "}
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
                            </div>
                            <div>
                              {CoPubliINTER3.map((listValue, index) => {
                                return (
                                  <TimelineItem>
                                    <TimelineOppositeContent align="left">
                                      <Typography
                                        style={{
                                          fontFamily: "Prompt",
                                        }}
                                        variant="body2"
                                        padding="1px 1px 1px 1px"
                                      >
                                        {listValue.co_researcher_publication_date
                                          ? new Date(
                                              listValue.co_researcher_publication_date
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
                                        <BiNews />
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
                                          ?????????????????????????????????????????? :{" "}
                                          {listValue.co_researcher_publication_name_th
                                            ? listValue.co_researcher_publication_name_th
                                            : listValue.co_researcher_publication_name_en}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                          // variant="body2"
                                          // padding="1px 1px 1px 1px"
                                        >
                                          {/* {listValue.publication_type_name} */}
                                          ?????????????????? :{" "}
                                          {listValue.co_researcher_publication_type_id
                                            ? publication_type[
                                                listValue
                                                  .co_researcher_publication_type_id
                                              ]
                                            : " "}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ????????????????????? :{" "}
                                          {
                                            listValue.co_researcher_publication_publish
                                          }
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ??????????????????????????????????????????:{" "}
                                          {
                                            listValue.co_researcher_publication_issue
                                          }
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ????????????????????????????????? :{" "}
                                          {listValue.co_quality_level}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ?????????????????? :{" "}
                                          {
                                            listValue.co_researcher_publication_country
                                          }
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ?????????????????? :
                                          {listValue.co_researcher_publication_attachment ? (
                                            <Button>
                                              <a
                                                target="_blank"
                                                href={`https://researcher.kims-rmuti.com/file-upload/co_publication-upload/${listValue.co_researcher_publication_attachment}`}
                                                rel="noreferrer"
                                              >
                                                {listValue.co_researcher_publication_attachment.slice(
                                                  0,
                                                  40
                                                )}{" "}
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
                            </div>

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
            </Grid>
          </TabPanel>
          <TabPanel value={valuePage1} index={2} className="rc-body2">
            <Grid container spacing={1}>
              <Grid item xs>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>???????????????????????????</Accordion.Header>
                    <Accordion.Body>
                      <TableContainer
                        style={{ fontFamily: "Prompt" }}
                        className="card-header-border card-border"
                      >
                        <Card>
                          <CardBody className="card-header-border">
                            <CardTitle
                              tag="h6"
                              style={{
                                padding: 5,
                                color: "black",
                              }}
                              className={
                                (classes.customLabel, classes.headerLabel)
                              }
                            >
                              ???????????????????????????
                            </CardTitle>
                          </CardBody>
                          <Timeline align="alternate" className="rc-body3">
                            <div>
                              {PubliTHA4.map((listValue, index) => {
                                return (
                                  <TimelineItem>
                                    <TimelineOppositeContent align="left">
                                      <Typography
                                        style={{
                                          fontFamily: "Prompt",
                                        }}
                                        variant="body2"
                                        padding="1px 1px 1px 1px"
                                      >
                                        {listValue.publication_date
                                          ? new Date(
                                              listValue.publication_date
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
                                        <BiNews />
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
                                          ?????????????????????????????????????????? :{" "}
                                          {listValue.publication_name_th
                                            ? listValue.publication_name_th
                                            : listValue.publication_name_en}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                          // variant="body2"
                                          // padding="1px 1px 1px 1px"
                                        >
                                          {/* {listValue.publication_type_name} */}
                                          ?????????????????? :{" "}
                                          {listValue.publication_type
                                            ? publication_type[
                                                listValue.publication_type
                                              ]
                                            : " "}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ????????????????????? :{" "}
                                          {listValue.publication_publish}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ??????????????????????????????????????????:{" "}
                                          {listValue.publication_issue}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ????????????????????????????????? :{" "}
                                          {listValue.quality_level}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ?????????????????? :{" "}
                                          {listValue.publication_country}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ??????????????????????????????????????? :
                                          {listValue.publication_link ? (
                                            <Button>
                                              <a
                                                target="_blank"
                                                href={
                                                  listValue.publication_link
                                                }
                                                rel="noreferrer"
                                              >
                                                {listValue.publication_link.slice(
                                                  8,
                                                  45
                                                )}{" "}
                                              </a>
                                            </Button>
                                          ) : (
                                            <p></p>
                                          )}
                                        </Typography>

                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ?????????????????? :
                                          {listValue.publication_attachment ? (
                                            <Button>
                                              <a
                                                target="_blank"
                                                href={`https://researcher.kims-rmuti.com/file-upload/publication-upload/${listValue.publication_attachment}`}
                                                rel="noreferrer"
                                              >
                                                {listValue.publication_attachment.slice(
                                                  0,
                                                  40
                                                )}{" "}
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
                            </div>
                            <div>
                              {CoPubliTHA4.map((listValue, index) => {
                                return (
                                  <TimelineItem>
                                    <TimelineOppositeContent align="left">
                                      <Typography
                                        style={{
                                          fontFamily: "Prompt",
                                        }}
                                        variant="body2"
                                        padding="1px 1px 1px 1px"
                                      >
                                        {listValue.co_researcher_publication_date
                                          ? new Date(
                                              listValue.co_researcher_publication_date
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
                                        <BiNews />
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
                                          ?????????????????????????????????????????? :{" "}
                                          {listValue.co_researcher_publication_name_th
                                            ? listValue.co_researcher_publication_name_th
                                            : listValue.co_researcher_publication_name_en}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                          // variant="body2"
                                          // padding="1px 1px 1px 1px"
                                        >
                                          {/* {listValue.publication_type_name} */}
                                          ?????????????????? :{" "}
                                          {listValue.co_researcher_publication_type_id
                                            ? publication_type[
                                                listValue
                                                  .co_researcher_publication_type_id
                                              ]
                                            : " "}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ????????????????????? :{" "}
                                          {
                                            listValue.co_researcher_publication_publish
                                          }
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ??????????????????????????????????????????:{" "}
                                          {
                                            listValue.co_researcher_publication_issue
                                          }
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ????????????????????????????????? :{" "}
                                          {listValue.co_quality_level}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ?????????????????? :{" "}
                                          {
                                            listValue.co_researcher_publication_country
                                          }
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ?????????????????? :
                                          {listValue.co_researcher_publication_attachment ? (
                                            <Button>
                                              <a
                                                target="_blank"
                                                href={`https://researcher.kims-rmuti.com/file-upload/co_publication-upload/${listValue.co_researcher_publication_attachment}`}
                                                rel="noreferrer"
                                              >
                                                {listValue.co_researcher_publication_attachment.slice(
                                                  0,
                                                  40
                                                )}{" "}
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
                            </div>
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
                    <Accordion.Header>???????????????????????????????????????</Accordion.Header>
                    <Accordion.Body>
                      <TableContainer
                        style={{ fontFamily: "Prompt" }}
                        className="card-header-border card-border"
                      >
                        <Card>
                          <CardBody className="card-header-border">
                            <CardTitle
                              tag="h6"
                              style={{
                                padding: 5,
                                color: "black",
                              }}
                              className={
                                (classes.customLabel, classes.headerLabel)
                              }
                            >
                              ???????????????????????????????????????
                            </CardTitle>
                          </CardBody>
                          <Timeline align="alternate" className="rc-body3">
                            <div>
                              {PubliINTER4.map((listValue, index) => {
                                return (
                                  <TimelineItem>
                                    <TimelineOppositeContent align="left">
                                      <Typography
                                        style={{
                                          fontFamily: "Prompt",
                                        }}
                                        variant="body2"
                                        padding="1px 1px 1px 1px"
                                      >
                                        {listValue.publication_date
                                          ? new Date(
                                              listValue.publication_date
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
                                        <BiNews />
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
                                          ?????????????????????????????????????????? :{" "}
                                          {listValue.publication_name_th
                                            ? listValue.publication_name_th
                                            : listValue.publication_name_en}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                          // variant="body2"
                                          // padding="1px 1px 1px 1px"
                                        >
                                          {/* {listValue.publication_type_name} */}
                                          ?????????????????? :{" "}
                                          {listValue.publication_type
                                            ? publication_type[
                                                listValue.publication_type
                                              ]
                                            : " "}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ????????????????????? :{" "}
                                          {listValue.publication_publish}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ??????????????????????????????????????????:{" "}
                                          {listValue.publication_issue}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ????????????????????????????????? :{" "}
                                          {listValue.quality_level}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ?????????????????? :{" "}
                                          {listValue.publication_country}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ??????????????????????????????????????? :
                                          {listValue.publication_link ? (
                                            <Button>
                                              <a
                                                target="_blank"
                                                href={
                                                  listValue.publication_link
                                                }
                                                rel="noreferrer"
                                              >
                                                {listValue.publication_link.slice(
                                                  8,
                                                  45
                                                )}{" "}
                                              </a>
                                            </Button>
                                          ) : (
                                            <p></p>
                                          )}
                                        </Typography>

                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ?????????????????? :
                                          {listValue.publication_attachment ? (
                                            <Button>
                                              <a
                                                target="_blank"
                                                href={`https://researcher.kims-rmuti.com/file-upload/publication-upload/${listValue.publication_attachment}`}
                                                rel="noreferrer"
                                              >
                                                {listValue.publication_attachment.slice(
                                                  0,
                                                  40
                                                )}{" "}
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
                            </div>
                            <div>
                              {CoPubliINTER4.map((listValue, index) => {
                                return (
                                  <TimelineItem>
                                    <TimelineOppositeContent align="left">
                                      <Typography
                                        style={{
                                          fontFamily: "Prompt",
                                        }}
                                        variant="body2"
                                        padding="1px 1px 1px 1px"
                                      >
                                        {listValue.co_researcher_publication_date
                                          ? new Date(
                                              listValue.co_researcher_publication_date
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
                                        <BiNews />
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
                                          ?????????????????????????????????????????? :{" "}
                                          {listValue.co_researcher_publication_name_th
                                            ? listValue.co_researcher_publication_name_th
                                            : listValue.co_researcher_publication_name_en}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                          // variant="body2"
                                          // padding="1px 1px 1px 1px"
                                        >
                                          {/* {listValue.publication_type_name} */}
                                          ?????????????????? :{" "}
                                          {listValue.co_researcher_publication_type_id
                                            ? publication_type[
                                                listValue
                                                  .co_researcher_publication_type_id
                                              ]
                                            : " "}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ????????????????????? :{" "}
                                          {
                                            listValue.co_researcher_publication_publish
                                          }
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ??????????????????????????????????????????:{" "}
                                          {
                                            listValue.co_researcher_publication_issue
                                          }
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ????????????????????????????????? :{" "}
                                          {listValue.co_quality_level}
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ?????????????????? :{" "}
                                          {
                                            listValue.co_researcher_publication_country
                                          }
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Prompt",
                                          }}
                                          align="left"
                                        >
                                          ?????????????????? :
                                          {listValue.co_researcher_publication_attachment ? (
                                            <Button>
                                              <a
                                                target="_blank"
                                                href={`https://researcher.kims-rmuti.com/file-upload/co_publication-upload/${listValue.co_researcher_publication_attachment}`}
                                                rel="noreferrer"
                                              >
                                                {listValue.co_researcher_publication_attachment.slice(
                                                  0,
                                                  40
                                                )}{" "}
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
                            </div>
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
            </Grid>
          </TabPanel>
        </div>
      </div>
    </ThemeProvider>
  );
}
