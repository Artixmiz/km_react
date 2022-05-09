import React, { useState } from "react";
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

import {
  FaArrowAltCircleRight,
  FaArrowAltCircleDown,
  FaIndustry,
  FaHandsHelping,
  FaSearch,
} from "react-icons/fa";

import BarChart from "../Chart";

import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  // Container,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import D3Layer from "../D3Layer";

import { BsGraphUp } from "react-icons/bs";
import { BiNetworkChart, BiInfoCircle } from "react-icons/bi";
import { GiGiftOfKnowledge, GiImpactPoint } from "react-icons/gi";
import { GrCluster } from "react-icons/gr";
import { orange } from "@material-ui/core/colors";

import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

const customTheme = createTheme({
  palette: {
    secondary: {
      main: orange[500],
    },
  },
});

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

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

const ImpactDetail = (props) => {
  const {
    location,
    classes,
    selected,
    dataImpact,
    handleDropdownChange,
    impact,
    retrieveImpact,
    loading,
    impactData,
    messageErr,
    issue,
    chartData,
    impactName,
    valuePage2,
    handleChangePage2,
    clusterEl,
    sdgEl,
    bcgEl,
    curveEl,
    project,
    mserror,
  } = props;

  return (
    <>
      <Card
        className="card-header-border card-border"
        style={{ marginTop: 20 }}
      >
        {/* <CardBody className="card-header-border">
          <CardTitle
            tag="h6"
            style={{ padding: 5, color: "black" }}
            className={(classes.customLabel, classes.headerLabel)}
          >
            แผนที่แสดงเครือข่ายงานวิจัย
          </CardTitle>
        </CardBody>

        {location.map(({ lat, lng }) => {
          return (
            <MapContainer
              className="map-border"
              center={[lat, lng]}
              zoom={5}
              scrollWheelZoom={true}
              zoomControl={false}
              style={{ width: "100%", height: "50vh" }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LayerGroup>
                <D3Layer location={dataImpact} />
              </LayerGroup>

              <ZoomControl position="topright" />
            </MapContainer>
          );
        })} */}
        <p></p>

        <CardBody className="card-header-color">
          <CardTitle
            tag="h6"
            style={{ padding: 5, color: "black" }}
            className={(classes.customLabel, classes.headerLabel)}
          >
            รายละเอียดผลกระทบ
          </CardTitle>
          <Card>
            <CardBody>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": {
                    m: 2,
                    width: "100%",
                    marginTop: "10px",
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <Row className="align-items-center justify-content-center">
                    {/* <Row className="align-items-center justify-content-md-center"> */}
                    <Col md="7" xs="12">
                      <TextField
                        id="outlined-multiline-flexible"
                        multiline
                        select
                        InputLabelProps={{
                          style: { fontFamily: "Prompt" },
                        }}
                        InputProps={{
                          style: { fontFamily: "Prompt" },
                        }}
                        FormHelperTextProps={{
                          style: { fontFamily: "Prompt" },
                        }}
                        label="ประเภทผลกระทบ"
                        value={selected}
                        onChange={handleDropdownChange}
                        helperText="โปรดเลือก"
                      >
                        {impact.map((value, index) => {
                          return (
                            <MenuItem
                              style={{ fontFamily: "Prompt" }}
                              value={value.impact_id}
                            >
                              {value.impact_name}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                    </Col>
                    <Col md="1" xs="12">
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={retrieveImpact}
                        style={{
                          fontFamily: "Prompt",
                          width: "100%",
                        }}
                        disabled={loading}
                        startIcon={<FaSearch size={13} />}
                      >
                        {loading && <CircularProgress size={22} />}
                        {!loading && "ค้นหา"}
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Box>
            </CardBody>
          </Card>
        </CardBody>

        <CardBody style={{ fontFamily: "Prompt" }}>
          <Table bordered responsive>
            <thead>
              <tr>
                <th>ผลกระทบด้าน</th>
                <th>ปัจจัยผลกระทบ</th>
                <th>ประเด็น</th>
                <th>รายละเอียดประเด็น</th>
              </tr>
            </thead>
            <tbody>
              {impactData.map((v) => {
                const obj = {
                  1: "เศรษฐกิจ",
                  2: "สังคม",
                  3: "วัฒนธรรม",
                  4: "สิ่งแวดล้อม",
                };
                return (
                  <tr style={{ textAlign: "left" }}>
                    <td valign="middle">{obj[v.impact_id]}</td>
                    <td valign="middle">
                      <Table>
                        {v.impact.map((c, i) => (
                          <tr>
                            <td>
                              {i + 1}. {c.factor_name}
                            </td>
                          </tr>
                        ))}
                      </Table>
                    </td>
                    <td valign="middle">
                      <Table>
                        {v.impact.map((c, i) => (
                          <tr>
                            <td>
                              {i + 1}. {c.issues.map((is) => is.issues_name)}
                            </td>
                          </tr>
                        ))}
                      </Table>
                    </td>
                    <td valign="middle">
                      <Table>
                        {v.impact.map((c, i) => (
                          <tr>
                            <td>
                              {i + 1}. {c.issues.map((is) => is.impact_detail)}
                            </td>
                          </tr>
                        ))}
                      </Table>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </CardBody>

        <CardBody>
          <ui>
            {messageErr ? (
              <p>not found</p>
            ) : (
              issue.map((fa) => {
                return <li>{fa}</li>;
              })
            )}
          </ui>
        </CardBody>

        <CardBody className="card-header-color">
          <CardTitle
            tag="h6"
            style={{ padding: 5, color: "black" }}
            className={(classes.customLabel, classes.headerLabel)}
          >
            กราฟรายละเอียดผลกระทบ
          </CardTitle>
          <CardBody>
            <Row className=" justify-content-center">
              <Col md="8">
                {messageErr ? (
                  <p>not found</p>
                ) : (
                  <Card>
                    <CardBody>
                      <BarChart chartData={chartData} impact={impactName} />
                    </CardBody>
                  </Card>
                )}
              </Col>
              <Col md="4">
                <Card>
                  <CardBody>
                    {chartData.map((c) =>
                      c.datasets.map((a) => (
                        <Row className="align-items-center justify-content-center">
                          <Col md="2" xs="2">
                            <div
                              style={{
                                background: `${a.backgroundColor}`,
                                padding: "10px",
                                height: "10px",
                              }}
                            ></div>
                          </Col>
                          <Col md="5" xs="3">
                            {a.label}
                          </Col>
                        </Row>
                      ))
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </CardBody>
        </CardBody>
      </Card>

      <div style={{ marginTop: 20 }}>
        <ThemeProvider theme={customTheme}>
          <div className={classes.root}>
            <AppBar
              position="static"
              color="default"
              className={classes.appbar}
            >
              <CardBody>
                <CardTitle
                  tag="h6"
                  style={{ padding: 5, color: "black" }}
                  className={(classes.customLabel, classes.headerLabel)}
                >
                  เป้าหมายเพื่อการพัฒนา
                </CardTitle>
              </CardBody>

              <Tabs
                value={valuePage2}
                onChange={handleChangePage2}
                variant="scrollable"
                scrollButtons="on"
                TabIndicatorProps={{
                  style: {
                    background: "rgb(252, 113, 0)",
                  },
                }}
                textColor="secondary"
                aria-label="scrollable tabs menu"
              >
                <Tab
                  label="RMUTI Cluster"
                  className={classes.customLabel}
                  icon={<GrCluster size={25} />}
                  {...a11yProps(0)}
                />

                <Tab
                  label="SDG"
                  className={classes.customLabel}
                  icon={<FaHandsHelping size={25} />}
                  {...a11yProps(1)}
                />
                <Tab
                  label="BCG"
                  className={classes.customLabel}
                  icon={<BsGraphUp size={25} />}
                  {...a11yProps(2)}
                />
                <Tab
                  label="10s Curve"
                  className={classes.customLabel}
                  icon={<FaIndustry size={25} />}
                  {...a11yProps(3)}
                />
              </Tabs>
            </AppBar>
            <div>
              <TabPanel value={valuePage2} index={0}>
                <Card className="card-header-border card-border">
                  <CardBody className="card-header-border">
                    <CardTitle
                      tag="h6"
                      style={{
                        padding: 5,
                        color: "black",
                      }}
                      className={(classes.customLabel, classes.headerLabel)}
                    >
                      RMUTI CLUSTER
                    </CardTitle>
                  </CardBody>
                  <CardBody className="map-border">
                    <Row className="justify-content-center">
                      {(() => {
                        if (mserror) {
                          return <p>{mserror}</p>;
                        } else {
                          return clusterEl;
                        }
                      })()}
                    </Row>
                  </CardBody>
                </Card>
              </TabPanel>

              <TabPanel value={valuePage2} index={1}>
                <Card className="card-header-border card-border">
                  <CardBody className="card-header-border">
                    <CardTitle
                      tag="h6"
                      style={{
                        padding: 5,
                        color: "black",
                      }}
                      className={(classes.customLabel, classes.headerLabel)}
                    >
                      SDG
                    </CardTitle>
                  </CardBody>
                  <CardBody className="map-border">
                    <Row className="justify-content-center">
                      {(() => {
                        if (mserror) {
                          return <p>{mserror}</p>;
                        } else {
                          return sdgEl;
                        }
                      })()}
                    </Row>
                  </CardBody>
                </Card>
              </TabPanel>
              <TabPanel value={valuePage2} index={2}>
                <Card className="card-header-border card-border">
                  <CardBody className="card-header-border">
                    <CardTitle
                      tag="h6"
                      style={{
                        padding: 5,
                        color: "black",
                      }}
                      className={(classes.customLabel, classes.headerLabel)}
                    >
                      BCG
                    </CardTitle>
                  </CardBody>
                  <CardBody className="map-border">
                    <Row className="justify-content-center">
                      {(() => {
                        if (mserror) {
                          return <p>{mserror}</p>;
                        } else {
                          return bcgEl;
                        }
                      })()}
                    </Row>
                  </CardBody>
                </Card>
              </TabPanel>
              <TabPanel value={valuePage2} index={3}>
                <Card className="card-header-border card-border">
                  <CardBody className="card-header-border">
                    <CardTitle
                      tag="h6"
                      style={{
                        padding: 5,
                        color: "black",
                      }}
                      className={(classes.customLabel, classes.headerLabel)}
                    >
                      10S CURVE
                    </CardTitle>
                  </CardBody>
                  <CardBody className="map-border">
                    <Row className="justify-content-center">
                      {(() => {
                        if (mserror) {
                          return <p>{mserror}</p>;
                        } else {
                          return curveEl;
                        }
                      })()}
                    </Row>
                  </CardBody>
                </Card>
              </TabPanel>
            </div>
          </div>
        </ThemeProvider>
      </div>
    </>
  );
};

export default ImpactDetail;
