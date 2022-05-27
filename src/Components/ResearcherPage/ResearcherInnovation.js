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
import parse from "html-react-parser";
import PropTypes from "prop-types";
import AwesomeSlider from "react-awesome-slider";
import { useEffect, useState } from "react";
import axios from "axios";

function getId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}

const YoutubeEmbed = ({ embedId }) => {
  // console.log(embedId);
  const vdo_id = getId(embedId);
  // console.log(vdo_id);
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

export default function InnovationsPage(props) {
  const { classes, valuePage1, handleChangePage1, concept_proposal_id } = props;

  const [innovation, setinnovation] = useState([]);
  const [coinnovation1, setcoinnovation1] = useState([]);
  const [coinnovation2, setcoinnovation2] = useState([]);

  const apiUrl = "https://kmapi.kims-rmuti.com";
  let id = atob(concept_proposal_id);

  useEffect(() => {
    axios.get(`${apiUrl}/api/get/us_innovation/${id}`).then((result) => {
      // console.log(result.data);
      setinnovation([result.data]);
    });
    axios
      .get(`${apiUrl}/api/get/bb-user/innovations/images?id=${id}&pi_type_id=1`)
      .then((result) => {
        // console.log(result.data);
        setcoinnovation1(result.data);
      });

    axios
      .get(`${apiUrl}/api/get/bb-user/innovations/images?id=${id}&pi_type_id=2`)
      .then((result) => {
        console.log("ssss", result.data);
        setcoinnovation2(result.data);
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
            textColor="secondary"
            aria-label="scrollable tabs menu"
          >
            <Tab
              label="นวัตกรรม"
              className={classes.customLabel}
              {...a11yProps(0)}
            />

            <Tab
              label="ผลิตภัณฑ์"
              className={classes.customLabel}
              {...a11yProps(1)}
            />
            <Tab
              label="สร้างสรรค์"
              className={classes.customLabel}
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        <div>
          <TabPanel value={valuePage1} index={0} className="rc-body2">
            <Grid
              className="rc-body2"
              container
              spacing={1}
              style={{
                fontFamily: "Prompt",
                padding: "20px 20px 20px 20px",
              }}
            >
              <p></p>
              {innovation.map((listValue, index) => {
                return (
                  <Container className=" card-border rc-body3">
                    <Row
                      style={{
                        fontFamily: "Prompt",
                        padding: "20px 5px 5px 5px",
                        margin: "10px 10px 10px 10px",
                      }}
                    >
                      <Col md="5">
                        <CardText style={{ textAlign: "left" }}>
                          <p>ชื่อนวัตกรรม : {listValue.innovation_name}</p>
                          <p>
                            รายละเอียด : {parse(listValue.innovation_detail)}
                          </p>
                          <p>
                            จำนวนการผลิต : {listValue.innovation_amount} ชิ้น
                          </p>
                          <p>
                            ราคา :{" "}
                            {listValue.innovation_price
                              ? new Number(
                                  listValue.innovation_price
                                ).toLocaleString("en")
                              : ""}{" "}
                            บาท
                          </p>
                          <p>ปี : {listValue.innovation_year}</p>
                          <p>
                            ลิงค์เว็บไซต์ :
                            {listValue.innovation_link ? (
                              <Button>
                                <a
                                  target="_blank"
                                  href={listValue.innovation_link}
                                  rel="noreferrer"
                                >
                                  {listValue.innovation_link.slice(8, 50)}{" "}
                                </a>
                              </Button>
                            ) : (
                              <p></p>
                            )}
                          </p>
                          <p>
                            เอกสาร :
                            <Button>
                              <a
                                target="_blank"
                                href={`https://researcher.kims-rmuti.com/file-upload/innovation-upload/${listValue.innovation_file}`}
                                rel="noreferrer"
                              >
                                {listValue.innovation_file.slice(0, 40)}{" "}
                              </a>
                            </Button>
                          </p>
                        </CardText>
                        {/*                               
                              <div><YoutubeEmbed embedId={listValue.innovation_vdo}/></div>
                            <div><YoutubeEmbed embedId="https://www.youtube.com/watch?v=7c8aoXNj-fY"/></div>
                             */}
                      </Col>
                      <Col md="7">
                        <CardBody
                          className="card-border"
                          style={{
                            margin: "10px 0px 10px 0px",
                            padding: 0,
                            color: "black",
                          }}
                        >
                          <AwesomeSlider bullets={false}>
                            {listValue.innovation_image_name.map(
                              (listValue, index) => {
                                return (
                                  <div>
                                    <img
                                      className="card-border"
                                      style={{
                                        objectPosition: "center center",
                                        padding: 5,
                                        color: "black",
                                      }}
                                      width="100%"
                                      height="auto"
                                      src={`https://researcher.kims-rmuti.com/file-upload/us_innovation-upload/${listValue.innovation_image_name}`}
                                    />
                                  </div>
                                );
                              }
                            )}
                          </AwesomeSlider>
                        </CardBody>
                        {/* <div>
                              <AutoplaySlider
                                play={true}
                                cancelOnInteraction={false}
                                interval={6000}
                                cssModule={AwesomeSliderStyles}
                              >
                                <div>
                                 {listValue.innovation_image_name.map(
                                  (listValue, index) => {
                                    return (
                                      <div>
                                        <img
                                          src={`https://www.km-innovations.rmuti.ac.th/researcher/file-upload/us_innovation-upload/${listValue.innovation_image_name}`}
                                        />
                                      </div>
                                    );
                                  }
                                )}</div>
                              </AutoplaySlider></div> */}
                        <div>
                          <CardBody>
                            <div>
                              {listValue.innovation_vdo ? (
                                <YoutubeEmbed
                                  embedId={listValue.innovation_vdo}
                                />
                              ) : (
                                <div>
                                  <p></p>
                                </div>
                              )}
                            </div>
                            {/* <YoutubeEmbed embedId={listValue.innovation_vdo}/>  */}
                          </CardBody>{" "}
                        </div>
                      </Col>
                    </Row>
                  </Container>
                );
              })}
              <div>
                {coinnovation1.map((listValue, index, innovation_type) => {
                  return (
                    <Container className=" card-border" key={innovation_type}>
                      <Row
                        style={{
                          fontFamily: "Prompt",
                          padding: "20px 5px 5px 5px",
                          margin: "10px 10px 10px 10px",
                        }}
                      >
                        <Col md="5">
                          <CardText style={{ textAlign: "left" }}>
                            <p>
                              ชื่อนวัตกรรม : {listValue.co_researcher_pi_name}
                            </p>
                            <p>
                              รายละเอียด : {listValue.co_researcher_pi_details}
                            </p>
                            <p>
                              จำนวนการผลิต : {listValue.co_researcher_pi_amount}{" "}
                              ชิ้น
                            </p>
                            <p>ราคา : {listValue.co_researcher_pi_price} บาท</p>
                            <p></p>
                          </CardText>
                        </Col>
                        <Col md="7">
                          <CardBody
                            className="card-border"
                            style={{
                              margin: "10px 0px 10px 0px",
                              padding: 0,
                              color: "black",
                            }}
                          >
                            <div></div>
                            <AwesomeSlider bullets={false}>
                              {listValue.images.map((listitem, index) => {
                                return (
                                  <div>
                                    <img
                                      className="card-border"
                                      style={{
                                        objectPosition: "center center",
                                        padding: 5,
                                        color: "black",
                                      }}
                                      width="100%"
                                      height="auto"
                                      src={`https://researcher.kims-rmuti.com/file-upload/co_innovationproduct_upload/${listitem.co_innovation_image}`}
                                    />
                                  </div>
                                );
                              })}
                            </AwesomeSlider>
                          </CardBody>
                          <div>
                            <CardBody>
                              <div>
                                {listValue.co_researcher_pi_vdo ? (
                                  <YoutubeEmbed
                                    embedId={listValue.co_researcher_pi_vdo}
                                  />
                                ) : (
                                  <div>
                                    <p></p>
                                  </div>
                                )}
                              </div>
                            </CardBody>{" "}
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  );
                })}
              </div>
              <div>
                {coinnovation2.map((listValue, index, innovation_type) => {
                  return (
                    <Container className=" card-border" key={innovation_type}>
                      <Row
                        style={{
                          fontFamily: "Prompt",
                          padding: "20px 5px 5px 5px",
                          margin: "10px 10px 10px 10px",
                        }}
                      >
                        <Col md="5">
                          <CardText style={{ textAlign: "left" }}>
                            <p>
                              ชื่อนวัตกรรม : {listValue.co_researcher_pi_name}
                            </p>
                            <p>
                              รายละเอียด : {listValue.co_researcher_pi_details}
                            </p>
                            <p>
                              จำนวนการผลิต : {listValue.co_researcher_pi_amount}{" "}
                              ชิ้น
                            </p>
                            <p>ราคา : {listValue.co_researcher_pi_price} บาท</p>
                            <p></p>
                          </CardText>
                        </Col>
                        <Col md="7">
                          <CardBody
                            className="card-border"
                            style={{
                              margin: "10px 0px 10px 0px",
                              padding: 0,
                              color: "black",
                            }}
                          >
                            <AwesomeSlider bullets={false}>
                              {listValue.images.map((listitem, index) => {
                                return (
                                  <div>
                                    <img
                                      className="card-border"
                                      style={{
                                        objectPosition: "center center",
                                        padding: 5,
                                        color: "black",
                                      }}
                                      width="100%"
                                      height="auto"
                                      src={`https://researcher.kims-rmuti.com/file-upload/co_innovationproduct_upload/${listitem.co_innovation_image}`}
                                    />
                                  </div>
                                );
                              })}
                            </AwesomeSlider>
                          </CardBody>
                          <div>
                            <CardBody>
                              <div>
                                {listValue.co_researcher_pi_vdo ? (
                                  <YoutubeEmbed
                                    embedId={listValue.co_researcher_pi_vdo}
                                  />
                                ) : (
                                  <div>
                                    <p></p>
                                  </div>
                                )}
                              </div>
                            </CardBody>{" "}
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  );
                })}
              </div>
              <p></p>
            </Grid>
          </TabPanel>
          <TabPanel
            value={valuePage1}
            index={1}
            className="rc-body2"
          ></TabPanel>
          <TabPanel
            value={valuePage1}
            index={2}
            className="rc-body2"
          ></TabPanel>
        </div>
      </div>
    </ThemeProvider>
  );
}
