/* eslint-disable no-new-wrappers */
/* eslint-disable no-sequences */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { Suspense } from "react";
import PropTypes from "prop-types";
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
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  MapContainer,
  TileLayer,
  ZoomControl,
  Marker,
  CircleMarker,
  Popup,
} from "react-leaflet";
import markerIconPng from "../images/icon.png";
import { Icon } from "leaflet";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import GetAppIcon from "@material-ui/icons/GetApp";
import AwesomeSlider from "react-awesome-slider";
import AutoplaySlider from "react-awesome-slider/dist/autoplay";
import AwesomeSliderStyles from "react-awesome-slider/src/styled/fold-out-animation";
import "react-awesome-slider/dist/styles.css";
import Grid from "@material-ui/core/Grid";
import { FaInfo, FaCheck, FaCompressArrowsAlt } from "react-icons/fa";

import SwipeableViews from "react-swipeable-views";
import red from "@material-ui/core/colors/red";
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
import "../index.css";
import { GiMoneyStack, GiCalendar } from "react-icons/gi";
import { BsGraphUp } from "react-icons/bs";
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
import { FaRegIdCard, FaCertificate } from "react-icons/fa";
import { GrCertificate, GrSolaris } from "react-icons/gr";
import { HiOutlineLightBulb, HiOutlineAcademicCap } from "react-icons/hi";

import { orange } from "@material-ui/core/colors";
import { Card, IconButton, Container } from "@material-ui/core";

import { withRouter } from "react-router-dom";

import noImg from "../images/no-image.png";

import Map from "./D3Layer";
import parse from "html-react-parser";

import { useTranslation } from "react-i18next";

import Accordion from "react-bootstrap/Accordion";

import "./Css/researcher.scss";

// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";

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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  appbar: {
    alignItems: "center",
    backgroundColor: "rgba(219, 219, 219, 0.459)",
  },
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },

  customLabel: {
    fontFamily: "Prompt",
    fontWeight: "bold",
    color: "black",
    whitespace: "pre-wrap",
  },

  round: {
    borderRadius: "50%",
    border: "4px solid rgb(223, 223, 223)",
    width: "100%",
    boxShadow:
      "rgba(0, 0, 0, 0.293) 0px 19px 38px, rgba(0, 0, 0, 0.129) 0px 15px 12px",
    [theme.breakpoints.up("sm")]: {
      width: "65%",
    },
  },

  underlineCol: {
    borderBottom: "2px solid rgb(211, 211, 211)",
    paddingTop: 12,
  },

  tabpanel: {
    marginLeft: "auto",
    marginRight: "auto",
  },

  headerLabel: {
    position: "relative",
    fontFamily: "Prompt",
    fontWeight: "bold",
    color: "black",
    zIndex: 1,

    textAlign: "center",

    "&::after": {
      position: "absolute",
      content: '""',
      top: 10,
      borderBottom: "3px solid black",
      width: 120,
      left: "50%",
      marginTop: 10,
      marginLeft: "-60px",
      bottom: 0,
    },
  },

  cardlayout: {
    marginTop: 20,
    boxShadow:
      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
    [theme.breakpoints.up("sm")]: {
      marginTop: 0,
    },
  },

  tabsBg: {
    background:
      "linear-gradient(90deg,rgba(240, 99, 0, 1) 0%,rgba(255, 115, 0, 1) 38%,rgba(254, 148, 0, 1) 100%)",
  },
}));

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.paper,
//     width: "100%",
//     paddingTop: 20,
//     // margin: "2px 2px 2px 15%",
//     fontFamily: "Prompt",
//   },
// }));

const useTimeline = makeStyles((theme) => ({
  paper: {
    padding: "3px ",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

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

function RCbutton(props) {
  const { t } = useTranslation();

  const [award, setaward] = useState([]);
  const [expertise, setexpertise] = useState([]);
  const [educational, seteducational] = useState([]);
  const [working, setworking] = useState([]);
  const [project, setproject] = useState([]);

  const [map, setmap] = useState([]);
  const [projecttype1, setprojecttype1] = useState([]);
  const [projecttype2, setprojecttype2] = useState([]);
  const [patent, setpatent] = useState([]);
  const [certificate, setcertificate] = useState([]);
  const [publication, setpublication] = useState([]);
  const [publicationco, setpublicationco] = useState([]);
  const [scholar, setscholar] = useState([]);
  const [uslink, setuslink] = useState([]);
  const [purchasing, setpurchasing] = useState([]);
  const [user, setuser] = useState([]);
  const [user1, setuser1] = useState({});
  const [locationRe, Setdatamap] = useState([]);
  const [innovation, setinnovation] = useState([]);
  const [selected, setSelected] = React.useState(1);
  const [course, setcourse] = useState([]);
  const [coaward, setcoaward] = useState([]);
  const [university, setuniversity] = useState([]);
  const [organization, setorganization] = useState([]);
  const [organization1, setorganization1] = useState([]);
  const [professional, setprofessional] = useState([]);
  const [consulting, setconsulting] = useState([]);
  const [messageErr, setMessageErr] = useState(null);
  const [innoimg, setinnoimg] = useState([]);
  const [cocertificate, setcocertificate] = useState([]);
  const [coinnovation1, setcoinnovation1] = useState([]);
  const [coinnovation2, setcoinnovation2] = useState([]);

  //ตีพิมพ์นักวิจัย-ระดับชาติ
  const [PubliTHA1, setPubliTHA1] = useState([]); //คู่มือ
  const [PubliTHA2, setPubliTHA2] = useState([]); //บทความวิชาการ
  const [PubliTHA3, setPubliTHA3] = useState([]); //บทความวิจัย
  const [PubliTHA4, setPubliTHA4] = useState([]); //วารสาร

  //ตีพิมพ์นักวิจัย-นานาชาติ
  const [PubliINTER1, setPubliINTER1] = useState([]);
  const [PubliINTER2, setPubliINTER2] = useState([]);
  const [PubliINTER3, setPubliINTER3] = useState([]);
  const [PubliINTER4, setPubliINTER4] = useState([]);

  //ตีพิมพ์-ผู้ช่วย-ระดับชาติ
  const [CoPubliTHA1, setCoPubliTHA1] = useState([]); //คู่มือผู้ช่วย
  const [CoPubliTHA2, setCoPubliTHA2] = useState([]); //บทความวิชาการผู้ช่วย
  const [CoPubliTHA3, setCoPubliTHA3] = useState([]); //บทความวิจัยผู้ช่วย
  const [CoPubliTHA4, setCoPubliTHA4] = useState([]); //วารสารผู้ช่วย

  //ตีพิมพ์-ผู้ช่วย-นานาชาติ
  const [CoPubliINTER1, setCoPubliINTER1] = useState([]);
  const [CoPubliINTER2, setCoPubliINTER2] = useState([]);
  const [CoPubliINTER3, setCoPubliINTER3] = useState([]);
  const [CoPubliINTER4, setCoPubliINTER4] = useState([]);

  const [patent1, setpatent1] = useState([]);
  const [patent2, setpatent2] = useState([]);
  const [patent3, setpatent3] = useState([]);
  const [patent4, setpatent4] = useState([]);
  const [patent5, setpatent5] = useState([]);
  const [patent6, setpatent6] = useState([]);
  const [patent7, setpatent7] = useState([]);
  const [patent8, setpatent8] = useState([]);
  const [patent9, setpatent9] = useState([]);

  //console.log("usersuseruseruseruseruser", user);

  // const { locationRe } = props;
  const primary = red[500]; // #f44336

  const classTimeline = useTimeline();

  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [valuePage1, setValuePage1] = useState(0);

  const handleChangePage1 = (event, newValue) => {
    setValuePage1(newValue);
  };

  var myParam = document.location.search.split("page")[1];

  var param = 0;
  if (myParam) {
    param = parseInt(myParam);
    console.log("testParam : ", param);
  }

  const [value, setValue] = React.useState(param);
  // const markermap = locationRe.map((location, i) => {
  //   const { project_name_th, project_latitude, project_longitude } = location;
  //   let title = project_name_th;

  //   if (project_latitude && project_longitude) {
  //     return (
  //       <Marker
  //         key={`${i}`}
  //         position={[project_latitude, project_longitude]}
  //         icon={
  //           new Icon({
  //             iconUrl: markerIconPng,
  //             iconSize: [40, 41],
  //             iconAnchor: [19, 0],
  //           })
  //         }
  //       >
  //         <Popup>{title}</Popup>
  //       </Marker>
  //     );
  //   }
  // });

  const getParamsId = () => {
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    return params.get("user_idcard");
  };
  const idencrypt = getParamsId();

  let id = "";

  const localUrl = "http://localhost:4000";
  const apiUrl = "https://kmapi.kims-rmuti.com";

  const mapData = async () => {
    const response = await axios.get(
      `${apiUrl}/api/get/us-projects-user/${atob(idencrypt)}`
    );
    return response.data;
  };

  // const dataM = mapData();

  const mapDataTeam = async () => {
    const response = await axios.get(
      `${apiUrl}/api/get/us-project-map/team/${atob(idencrypt)}`
    );
    return response.data;
  };

  const dataTeam = mapDataTeam();

  const courseDetail = async (fname, lname) => {
    const response = await axios.get(
      `${apiUrl}/api/get/course_detail?firstname=${fname}&lastname=${lname}`
    );
    return response.data;
  };

  const scholarlink = async (id) => {
    const response = await axios.get(`${apiUrl}/api/get/gg_scholar_pf/${id}`);
    return response.data;
  };

  const uslinklink = async (id) => {
    const response = await axios.get(`${apiUrl}/api/get/us-link/${id}`);
    return response.data;
  };
  // useEffect(() => {
  //   if (user.group_id === null) {
  //     console.log(user.group_id === 1);
  //   } else {
  //     console.log(user.group_id === 3);
  //   }
  // });

  const universityDetail = async (id) => {
    const response = await axios.get(
      `${apiUrl}/api/get/bb-user/university/${id}`
    );
    return response.data;
  };

  const organizationDetail = async (id) => {
    const response = await axios.get(
      `${apiUrl}/api/get/bb-user/organization/${id}`
    );
    return response.data;
  };
  useEffect(async () => {
    if (idencrypt == null || idencrypt == "") {
      props.history.push({
        pathname: "/SearchResearcher",
      });
    } else {
      id = atob(idencrypt);
    }

    const project = await mapData();
    setmap(project);

    // axios
    //   .get(`${localUrl}/api/get/us-project/locations/${id}`)
    //   .then((locationRe) => {
    // Setdatamap(locationRe.data);
    //   });

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

    axios.get(`${apiUrl}/api/get/us-educational/${id}`).then((result) => {
      // console.log(result.data);
      seteducational(result.data);
    });

    axios.get(`${apiUrl}/api/get/working-experience/${id}`).then((result) => {
      // console.log(result.data);
      setworking(result.data);
    });

    axios.get(`${apiUrl}/api/get/us-project/locations/${id}`).then((result) => {
      // console.log(result.data);
      setproject(result.data);
    });

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
      setpatent(result.data);
    });

    axios.get(`${apiUrl}/api/get/us-certificate/${id}`).then((result) => {
      // console.log(result.data);
      setcertificate(result.data);
    });

    axios.get(`${apiUrl}/api/get/bb-user/certificate/${id}`).then((result) => {
      // console.log(result.data);
      setcocertificate(result.data);
    });

    axios.get(`${apiUrl}/api/get/us-publication/${id}`).then((result) => {
      // console.log(result.data);
      setpublication(result.data);
    });

    axios
      //คู่มือ
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
      //บทความวิชาการ
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
      //วิจัย
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
      //วิจัย
      .get(`${apiUrl}/api/get/us-publication?type=4&user_idcard=${id}`)
      .then((result) => {
        setPubliINTER3(result.data);
      });

    axios
      //วารสาร
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
      //วารสาร
      .get(`${apiUrl}/api/get/us-publication?type=6&user_idcard=${id}`)
      .then((result) => {
        setPubliINTER4(result.data);
      });

    axios
      .get(`${apiUrl}/api/get/co-researcher/publication/${id}`)
      .then((result) => {
        console.log(result.data);
        setpublicationco(result.data);
      });

    axios
      //คู่มือผู้ช่วย
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
      //บทความวิชาการผู้ช่วย
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
      //บทความวิชาการผู้ช่วย
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
      //วารสารผู้ช่วย
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

    axios
      .get(`${apiUrl}/api/get/progress-report/report-purchasing/${id}`)
      .then((result) => {
        // console.log(result.data);
        setpurchasing(result.data);
      });

    axios
      .get(`${apiUrl}/api/get/us-project/type?id_user=${id}`)
      .then((result) => {
        // console.log(result.data);
        setprojecttype1(result.data);
      });

    // axios
    //   .get(`${apiUrl}/api/get/us-project/type?id_user=${id}&id_project_type=2`)
    //   .then((result) => {
    //     console.log(result.data);
    //     setprojecttype2(result.data);
    //   });
    axios.get(`${apiUrl}/api/get/bb-user/${id}`).then(async (result) => {
      // console.log("test", result.data[0]);
      const data = result.data[0];

      if (data.user_section != "") {
        if (!isNaN(data.user_section) === true) {
          const section = await universityDetail(data.user_section);
          // console.log(section);
          setuniversity(section[0].name);
        } else {
          setuniversity(data.user_section);
        }
      } else {
        setuniversity(data.user_section);
      }

      // console.log(!isNaN(data.user_major));
      if (data.user_major != "") {
        if (!isNaN(data.user_major) === true) {
          const major = await organizationDetail(data.user_major);
          console.log(major);
          setorganization(major[0].organization_name_th);
        } else {
          setorganization(data.user_major);
        }
      } else {
        setorganization(data.user_major);
      }

      if (data.user_organization != "") {
        if (!isNaN(data.user_organization) === true) {
          const organization = await organizationDetail(data.user_organization);
          // console.log("asdss", organization);
          setorganization1(organization[0].organization_name_th);
        } else {
          setorganization1(data.user_organization);
        }
      } else {
        setorganization1(data.user_organization);
      }

      setuser(result.data);

      const response = await courseDetail(
        data.user_first_name_th,
        data.user_last_name_th
      );

      setcourse(response);

      const scholar = await scholarlink(data.user_idcard);
      setscholar(scholar);

      const uslink = await uslinklink(data.user_idcard);
      setuslink(uslink);
      // console.log("asdss", scholar);
    });
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

  const classes = useStyles();
  educational.sort((a, b) =>
    a.educational_graduation > b.educational_graduation ? 1 : -1
  );
  working.sort((a, b) =>
    a.working_experience_star > b.working_experience_star ? 1 : -1
  );
  projecttype1.sort((a, b) => (a.project_star < b.project_star ? 1 : -1));

  PubliTHA1.sort((a, b) => (a.publication_date < b.publication_date ? 1 : -1));
  PubliTHA2.sort((a, b) => (a.publication_date < b.publication_date ? 1 : -1));
  PubliTHA3.sort((a, b) => (a.publication_date < b.publication_date ? 1 : -1));
  PubliTHA4.sort((a, b) => (a.publication_date < b.publication_date ? 1 : -1));

  PubliINTER1.sort((a, b) =>
    a.publication_date < b.publication_date ? 1 : -1
  );
  PubliINTER2.sort((a, b) =>
    a.publication_date < b.publication_date ? 1 : -1
  );
  PubliINTER3.sort((a, b) =>
    a.publication_date < b.publication_date ? 1 : -1
  );
  PubliINTER4.sort((a, b) =>
    a.publication_date < b.publication_date ? 1 : -1
  );

  CoPubliTHA1.sort((a, b) =>
    a.co_researcher_publication_date < b.co_researcher_publication_date ? 1 : -1
  );
  CoPubliTHA2.sort((a, b) =>
    a.co_researcher_publication_date < b.co_researcher_publication_date ? 1 : -1
  );
  CoPubliTHA3.sort((a, b) =>
    a.co_researcher_publication_date < b.co_researcher_publication_date ? 1 : -1
  );
  CoPubliTHA4.sort((a, b) =>
    a.co_researcher_publication_date < b.co_researcher_publication_date ? 1 : -1
  );

  CoPubliINTER1.sort((a, b) =>
    a.co_researcher_publication_date < b.co_researcher_publication_date ? 1 : -1
  );
  CoPubliINTER2.sort((a, b) =>
    a.co_researcher_publication_date < b.co_researcher_publication_date ? 1 : -1
  );
  CoPubliINTER3.sort((a, b) =>
    a.co_researcher_publication_date < b.co_researcher_publication_date ? 1 : -1
  );
  CoPubliINTER4.sort((a, b) =>
    a.co_researcher_publication_date < b.co_researcher_publication_date ? 1 : -1
  );

  const prefix = {
    1: "นาย",
    2: "นางสาว",
    3: "นาง",
    4: "ดร.",
    5: "ผศ.",
    6: "รศ.",
    7: "ศ.",
    8: "ผศ.ดร.",
    9: "รศ.ดร.",
    10: "ศ.ดร.",
  };

  const publication_type = {
    1: "ผลงานตีพิมพ์อื่นๆ",
    2: "บทความวิชาการ",
    3: "บทความวิจัย",
    4: "วารสาร",
  };

  const region = new Intl.DisplayNames(["en"], { type: "region" });

  // const smallItemStyles: React.CSSProperties = {
  //       cursor: 'pointer',
  //       objectFit: 'cover',
  //       width: '100%',
  //       maxHeight: '100%',
  //     }
  // const TableContainer = React.lazy(() =>
  //   import("@material-ui/core/TableContainer")
  // );

  // const Grid = React.lazy(() => import("@material-ui/core/Grid"));
  // const Paper = React.lazy(() => import("@material-ui/core/Paper"));

  return (
    <div className="body-detail" style={{ padding: "2rem" }}>
      {user.map((listValue) => {
        return (
          <div
            style={{
              backgroundColor: "#fff",
              width: "100%",
              marginTop: "7rem",
              borderRadius: "15px 15px 0 0",
            }}
          >
            <Row>
              <Col sm={4} style={{ textAlign: "right" }}>
                <img
                  className="profile-image"
                  src={`https://researcher.kims-rmuti.com/file-upload/images-profile-upload/${listValue.user_image_user}`}
                />
              </Col>

              <Col sm={8}>
                <section className="profile-info" style={{ marginTop: "20px" }}>
                  <h4>
                    <strong>
                      {" "}
                      {listValue.prefix_id
                        ? prefix[listValue.prefix_id]
                        : ""}{" "}
                      {listValue.user_first_name_th}{" "}
                      {listValue.user_last_name_th}
                    </strong>
                  </h4>
                  {/* <h1 className="first-name">Angela</h1>
                  <h1 className="second-name">Yun He</h1> */}
                  <p>
                    {t("researcher.carddetail.text1")}:{" "}
                    {listValue.user_academic}
                  </p>
                  <p>
                    {t("researcher.carddetail.text2")}:{" "}
                    {
                      university
                      // != university.map((v) => v.organization_code)
                      //         ?   university.map((v) => v.name)
                      //         : " "
                    }
                  </p>
                  <p>
                    {t("researcher.carddetail.text3")}:{" "}
                    {
                      organization
                      // != university.map((v) => v.organization_code)
                      //   ?  organization.map((v) => v.organization_name_th)
                      //   :  " "
                    }
                  </p>
                  <p>
                    {t("researcher.carddetail.text4")}:{" "}
                    {
                      organization1
                      // != university.map((v) => v.organization_code)
                      //   ? organization1.map((v) => v.organization_name_th)
                      //   :   "   "
                    }
                  </p>
                  {listValue.active_phone == 1 ? (
                    <p>เบอร์โทรศัพท์: {listValue.user_phone}</p>
                  ) : (
                    " "
                  )}{" "}
                  {listValue.active_mobile == 1 ? (
                    <p>เบอร์โทรศัพท์: {listValue.user_mobile}</p>
                  ) : (
                    " "
                  )}{" "}
                  {listValue.active_mail == 1 ? (
                    <p>Email: {listValue.user_mail}</p>
                  ) : (
                    " "
                  )}{" "}
                  {listValue.user_idcard == scholar.map((v) => v.CID) ? (
                    <p>
                      {" "}
                      GoogleScholar:
                      <Button>
                        <a
                          target="_blank"
                          href={scholar.map((v) => v.GG_URL)}
                          rel="noreferrer"
                        >
                          https://scholar.google.com/
                          {/* {scholar.map((v) => v.GG_URL).slice(-15)}{" "} */}
                        </a>
                      </Button>
                    </p>
                  ) : (
                    "  "
                  )}
                </section>
              </Col>

              <Col sm={12}>
                <div className="line-bottom" style={{ margin: "1rem 3rem" }} />
              </Col>
            </Row>
            <Row style={{ width: "100%" }}>
              <Col sm={12}>
                <section className="statistics">
                  <AppBar
                    position="center"
                    color="default"
                    className={classes.appbar}
                  >
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      indicatorColor="secondary"
                      textColor="secondary"
                      variant="scrollable"
                      scrollButtons="on"
                      TabIndicatorProps={{
                        style: { background: "rgb(252, 113, 0)" },
                      }}
                      aria-label="scrollable tabs menu"
                    >
                      <Tab
                        label={t("researcher.tabmenu.menu1")}
                        className={classes.customLabel}
                        icon={<BiMapPin size={25} />}
                        {...a11yProps(0)}
                      />

                      <Tab
                        label={t("researcher.tabmenu.menu2")}
                        className={classes.customLabel}
                        icon={<BiMedal size={25} />}
                        {...a11yProps(1)}
                      />
                      <Tab
                        label={t("researcher.tabmenu.menu3")}
                        className={classes.customLabel}
                        icon={<BiCertification size={25} />}
                        {...a11yProps(2)}
                      />

                      <Tab
                        label={t("researcher.tabmenu.menu4")}
                        className={classes.customLabel}
                        icon={<BiNews size={25} />}
                        {...a11yProps(3)}
                      />
                      <Tab
                        label={t("researcher.tabmenu.menu5")}
                        className={classes.customLabel}
                        icon={<HiOutlineLightBulb size={25} />}
                        {...a11yProps(4)}
                      />
                      <Tab
                        label={t("researcher.tabmenu.menu6")}
                        className={classes.customLabel}
                        icon={<BiGroup size={25} />}
                        {...a11yProps(5)}
                      />
                      <Tab
                        label={t("researcher.tabmenu.menu7")}
                        className={classes.customLabel}
                        icon={<FaRegIdCard size={25} />}
                        {...a11yProps(6)}
                      />
                      {user && user.length > 0 && user[0].group_id === 1 && (
                        <Tab
                          label={t("researcher.tabmenu.menu8")}
                          className={classes.customLabel}
                          icon={<HiOutlineAcademicCap size={25} />}
                          {...a11yProps(7)}
                        />
                      )}
                    </Tabs>
                  </AppBar>
                </section>
              </Col>
            </Row>
          </div>
        );
      })}
      <div
        style={{
          backgroundColor: "rgb(246, 168, 52)",
          width: "100%",
          marginTop: "0rem",
          borderRadius: "0 0 15px 15px",
        }}
      >
        <Suspense fallback={<div>loading...</div>}>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} className="bg">
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
                                          pathname:
                                            "/ProjectDetail/ProjectNetwork",
                                          search: `?project_id=${btoa(
                                            p.project_id
                                          )}`,
                                        })
                                      : props.history.push({
                                          pathname:
                                            "/ProjectDetailConcep/ProjectNetwork",
                                          search: `?concep_id=${btoa(
                                            p.concept_id
                                          )}`,
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
                              (u) =>
                                `${u.user_first_name_th} ${u.user_last_name_th}`
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
                      <td colSpan="4">
                        {t("researcher.areapage.table.header8")}
                      </td>
                      <td valign="middle">
                        {
                          projecttype1.filter(
                            (item) => item.project_type_id === 1
                          ).length
                        }
                      </td>
                      <td valign="middle">
                        {
                          projecttype1.filter(
                            (item) => item.project_type_id === 2
                          ).length
                        }
                      </td>
                      <td valign="middle">
                        {
                          projecttype1.filter(
                            (item) => item.project_type_id === 5
                          ).length
                        }
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
              <p></p>
            </TabPanel>

            <TabPanel value={value} index={1} className="rc-body">
              <TableContainer className="card-header-border card-border">
                <ThemeProvider theme={customTheme}>
                  <div className={classes.root}>
                    <AppBar
                      position="static"
                      color="default"
                      className={classes.appbar}
                    >
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
                      <TabPanel
                        value={valuePage1}
                        index={0}
                        className="rc-body2"
                      >
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
                                  {user &&
                                    user.length > 0 &&
                                    user[0].group_id === 1 && (
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
                      <TabPanel
                        value={valuePage1}
                        index={1}
                        className="rc-body2"
                      >
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
                                      ? new Date(
                                          listValue.award_date
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
                      <TabPanel
                        value={valuePage1}
                        index={2}
                        className="rc-body2"
                      >
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
                      <TabPanel
                        value={valuePage1}
                        index={3}
                        className="rc-body2"
                      >
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
                                    className={
                                      (classes.customLabel, classes.headerLabel)
                                    }
                                  >
                                    ใบประกอบวิชาชีพ
                                  </CardTitle>
                                </CardBody>
                                <Timeline
                                  align="alternate"
                                  className="rc-body3"
                                >
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
                      <TabPanel
                        value={valuePage1}
                        index={4}
                        className="rc-body2"
                      >
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
                                    className={
                                      (classes.customLabel, classes.headerLabel)
                                    }
                                  >
                                    ประสบการณ์การเป็นที่ปรึกษา
                                  </CardTitle>
                                </CardBody>
                                <Timeline
                                  align="alternate"
                                  className="rc-body3"
                                >
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
                                              {
                                                listValue.consulting_experience_name
                                              }
                                            </Typography>
                                            <Typography
                                              style={{
                                                fontFamily: "Prompt",
                                              }}
                                              align="left"
                                            >
                                              ตำแหน่งในโครงการ :{" "}
                                              {
                                                listValue.consulting_experience_position
                                              }
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
            </TabPanel>

            <TabPanel value={value} index={2} className="rc-body">
              <TableContainer className="card-header-border card-border">
                <ThemeProvider theme={customTheme}>
                  <div className={classes.root}>
                    <AppBar
                      position="center"
                      color="default"
                      className={classes.appbar}
                    >
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
                                className={
                                  (classes.customLabel, classes.headerLabel)
                                }
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
                                          ชื่อสิทธิบัตร :{" "}
                                          {listValue.patent_name_th}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          หมายเลขสิทธิบัตร :{" "}
                                          {listValue.patent_number}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          เลขที่คำขอ :{" "}
                                          {listValue.patent_request}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          หมายเลขสิทธิบัตร :{" "}
                                          {listValue.patent_number}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          เลขที่คำขอ :{" "}
                                          {listValue.patent_request}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          ประเภทสิทธิบัตร :{" "}
                                          {listValue.patent_type_name}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          ประเทศ :
                                          {listValue.publication_country}
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
                                                {listValue.patent_attachment.slice(
                                                  0,
                                                  60
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
                                className={
                                  (classes.customLabel, classes.headerLabel)
                                }
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
                                          ชื่อสิทธิบัตร :{" "}
                                          {listValue.patent_name_th}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          หมายเลขสิทธิบัตร :{" "}
                                          {listValue.patent_number}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          เลขที่คำขอ :{" "}
                                          {listValue.patent_request}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          ประเภทสิทธิบัตร :{" "}
                                          {listValue.patent_type_name}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          ประเทศ :
                                          {listValue.publication_country}
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
                                                {listValue.patent_attachment.slice(
                                                  0,
                                                  60
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
                                className={
                                  (classes.customLabel, classes.headerLabel)
                                }
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
                                          ชื่อสิทธิบัตร :{" "}
                                          {listValue.patent_name_th}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          หมายเลขสิทธิบัตร :{" "}
                                          {listValue.patent_number}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          เลขที่คำขอ :{" "}
                                          {listValue.patent_request}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          ประเภทสิทธิบัตร :{" "}
                                          {listValue.patent_type_name}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          ประเทศ :
                                          {listValue.publication_country}
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
                                                {listValue.patent_attachment.slice(
                                                  0,
                                                  60
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
                                className={
                                  (classes.customLabel, classes.headerLabel)
                                }
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
                                          ชื่อสิทธิบัตร :{" "}
                                          {listValue.patent_name_th}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          หมายเลขสิทธิบัตร :{" "}
                                          {listValue.patent_number}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          เลขที่คำขอ :{" "}
                                          {listValue.patent_request}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          ประเภทสิทธิบัตร :{" "}
                                          {listValue.patent_type_name}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          ประเทศ :
                                          {listValue.publication_country}
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
                                                {listValue.patent_attachment.slice(
                                                  0,
                                                  60
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
                                className={
                                  (classes.customLabel, classes.headerLabel)
                                }
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
                                          ชื่อสิทธิบัตร :{" "}
                                          {listValue.patent_name_th}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          หมายเลขสิทธิบัตร :{" "}
                                          {listValue.patent_number}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          เลขที่คำขอ :{" "}
                                          {listValue.patent_request}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          ประเภทสิทธิบัตร :{" "}
                                          {listValue.patent_type_name}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          ประเทศ :
                                          {listValue.publication_country}
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
                                                {listValue.patent_attachment.slice(
                                                  0,
                                                  60
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
                                className={
                                  (classes.customLabel, classes.headerLabel)
                                }
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
                                          ชื่อสิทธิบัตร :{" "}
                                          {listValue.patent_name_th}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          หมายเลขสิทธิบัตร :{" "}
                                          {listValue.patent_number}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          เลขที่คำขอ :{" "}
                                          {listValue.patent_request}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          ประเภทสิทธิบัตร :{" "}
                                          {listValue.patent_type_name}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          ประเทศ :
                                          {listValue.publication_country}
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
                                                {listValue.patent_attachment.slice(
                                                  0,
                                                  60
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
                                className={
                                  (classes.customLabel, classes.headerLabel)
                                }
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
                                          ชื่อสิทธิบัตร :{" "}
                                          {listValue.patent_name_th}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          หมายเลขสิทธิบัตร :{" "}
                                          {listValue.patent_number}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          เลขที่คำขอ :{" "}
                                          {listValue.patent_request}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          ประเภทสิทธิบัตร :{" "}
                                          {listValue.patent_type_name}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          ประเทศ :
                                          {listValue.publication_country}
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
                                                {listValue.patent_attachment.slice(
                                                  0,
                                                  60
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
                                className={
                                  (classes.customLabel, classes.headerLabel)
                                }
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
                                          ชื่อสิทธิบัตร :{" "}
                                          {listValue.patent_name_th}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          หมายเลขสิทธิบัตร :{" "}
                                          {listValue.patent_number}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          เลขที่คำขอ :{" "}
                                          {listValue.patent_request}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          ประเภทสิทธิบัตร :{" "}
                                          {listValue.patent_type_name}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          ประเทศ :
                                          {listValue.publication_country}
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
                                                {listValue.patent_attachment.slice(
                                                  0,
                                                  60
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
                                className={
                                  (classes.customLabel, classes.headerLabel)
                                }
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
                                          ชื่อสิทธิบัตร :{" "}
                                          {listValue.patent_name_th}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          หมายเลขสิทธิบัตร :{" "}
                                          {listValue.patent_number}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          เลขที่คำขอ :{" "}
                                          {listValue.patent_request}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          ประเภทสิทธิบัตร :{" "}
                                          {listValue.patent_type_name}
                                        </Typography>
                                        <Typography
                                          style={{ fontFamily: "Prompt" }}
                                          align="left"
                                        >
                                          ประเทศ :
                                          {listValue.publication_country}
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
                                                {listValue.patent_attachment.slice(
                                                  0,
                                                  60
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
            </TabPanel>

            <TabPanel value={value} index={3} className="rc-body">
              <ThemeProvider theme={customTheme}>
                <div className={classes.root}>
                  <AppBar
                    position="static"
                    color="default"
                    className={classes.appbar}
                  >
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
                        label="หนังสือ/คู่มือ"
                        className={classes.customLabel}
                        {...a11yProps(0)}
                      />

                      <Tab
                        label="ประชุมวิชาการ"
                        className={classes.customLabel}
                        {...a11yProps(1)}
                      />
                      <Tab
                        label="วารสาร"
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
                              <Accordion.Header> หนังสือ</Accordion.Header>
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
                                          (classes.customLabel,
                                          classes.headerLabel)
                                        }
                                      >
                                        หนังสือ
                                      </CardTitle>
                                    </CardBody>
                                    <Timeline
                                      align="alternate"
                                      className="rc-body3"
                                    >
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
                                                      ).toLocaleDateString(
                                                        "th-TH",
                                                        {
                                                          year: "numeric",
                                                          month: "long",
                                                          day: "numeric",
                                                        }
                                                      )
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
                                                  className={
                                                    classTimeline.paper
                                                  }
                                                >
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ชื่องานตีพิมพ์ :{" "}
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
                                                    ประเภท :{" "}
                                                    {listValue.publication_type
                                                      ? publication_type[
                                                          listValue
                                                            .publication_type
                                                        ]
                                                      : " "}
                                                  </Typography>
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ตีพิมพ์ :{" "}
                                                    {
                                                      listValue.publication_publish
                                                    }
                                                  </Typography>
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ฉบับที่ตีพิมพ์:{" "}
                                                    {
                                                      listValue.publication_issue
                                                    }
                                                  </Typography>
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ระดับคุณภาพ :{" "}
                                                    {listValue.quality_level}
                                                  </Typography>
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ประเทศ :{" "}
                                                    {
                                                      listValue.publication_country
                                                    }
                                                  </Typography>
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ลิงค์เว็บไซต์ :
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
                                                    เอกสาร :
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
                                                      ).toLocaleDateString(
                                                        "th-TH",
                                                        {
                                                          year: "numeric",
                                                          month: "long",
                                                          day: "numeric",
                                                        }
                                                      )
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
                                                  className={
                                                    classTimeline.paper
                                                  }
                                                >
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ชื่องานตีพิมพ์ :{" "}
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
                                                    ประเภท :{" "}
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
                                                    ระดับคุณภาพ :{" "}
                                                    {listValue.co_quality_level}
                                                  </Typography>
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ตีพิมพ์ :{" "}
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
                                                    ฉบับที่ตีพิมพ์:{" "}
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
                                                    ประเทศ :{" "}
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
                                                    เอกสาร :
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
                              <Accordion.Header>คู่มือ</Accordion.Header>
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
                                          (classes.customLabel,
                                          classes.headerLabel)
                                        }
                                      >
                                        คู่มือ
                                      </CardTitle>
                                    </CardBody>

                                    <Timeline
                                      align="alternate"
                                      className="rc-body3"
                                    >
                                      <div>
                                        {PubliTHA2.map(
                                          (
                                            listValue,
                                            index,
                                            publication_type_id
                                          ) => {
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
                                                        ).toLocaleDateString(
                                                          "th-TH",
                                                          {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                          }
                                                        )
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
                                                    className={
                                                      classTimeline.paper
                                                    }
                                                  >
                                                    <Typography
                                                      style={{
                                                        fontFamily: "Prompt",
                                                      }}
                                                      align="left"
                                                    >
                                                      ชื่องานตีพิมพ์ :{" "}
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
                                                      ประเภท :{" "}
                                                      {listValue.publication_type
                                                        ? publication_type[
                                                            listValue
                                                              .publication_type
                                                          ]
                                                        : " "}
                                                    </Typography>
                                                    <Typography
                                                      style={{
                                                        fontFamily: "Prompt",
                                                      }}
                                                      align="left"
                                                    >
                                                      ตีพิมพ์ :{" "}
                                                      {
                                                        listValue.publication_publish
                                                      }
                                                    </Typography>
                                                    <Typography
                                                      style={{
                                                        fontFamily: "Prompt",
                                                      }}
                                                      align="left"
                                                    >
                                                      ฉบับที่ตีพิมพ์:{" "}
                                                      {
                                                        listValue.publication_issue
                                                      }
                                                    </Typography>
                                                    <Typography
                                                      style={{
                                                        fontFamily: "Prompt",
                                                      }}
                                                      align="left"
                                                    >
                                                      ระดับคุณภาพ :{" "}
                                                      {listValue.quality_level}
                                                    </Typography>
                                                    <Typography
                                                      style={{
                                                        fontFamily: "Prompt",
                                                      }}
                                                      align="left"
                                                    >
                                                      ประเทศ :{" "}
                                                      {
                                                        listValue.publication_country
                                                      }
                                                    </Typography>
                                                    <Typography
                                                      style={{
                                                        fontFamily: "Prompt",
                                                      }}
                                                      align="left"
                                                    >
                                                      ลิงค์เว็บไซต์ :
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
                                                      เอกสาร :
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
                                                      ).toLocaleDateString(
                                                        "th-TH",
                                                        {
                                                          year: "numeric",
                                                          month: "long",
                                                          day: "numeric",
                                                        }
                                                      )
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
                                                  className={
                                                    classTimeline.paper
                                                  }
                                                >
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ชื่องานตีพิมพ์ :{" "}
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
                                                    ประเภท :{" "}
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
                                                    ตีพิมพ์ :{" "}
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
                                                    ฉบับที่ตีพิมพ์:{" "}
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
                                                    ระดับคุณภาพ :{" "}
                                                    {listValue.co_quality_level}
                                                  </Typography>
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ประเทศ :{" "}
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
                                                    เอกสาร :
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
                              <Accordion.Header>ระดับชาติ</Accordion.Header>
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
                                          (classes.customLabel,
                                          classes.headerLabel)
                                        }
                                      >
                                        ระดับชาติ
                                      </CardTitle>
                                    </CardBody>
                                    <Timeline
                                      align="alternate"
                                      className="rc-body3"
                                    >
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
                                                      ).toLocaleDateString(
                                                        "th-TH",
                                                        {
                                                          year: "numeric",
                                                          month: "long",
                                                          day: "numeric",
                                                        }
                                                      )
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
                                                  className={
                                                    classTimeline.paper
                                                  }
                                                >
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ชื่องานตีพิมพ์ :{" "}
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
                                                    ประเภท :{" "}
                                                    {listValue.publication_type
                                                      ? publication_type[
                                                          listValue
                                                            .publication_type
                                                        ]
                                                      : " "}
                                                  </Typography>
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ตีพิมพ์ :{" "}
                                                    {
                                                      listValue.publication_publish
                                                    }
                                                  </Typography>
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ฉบับที่ตีพิมพ์:{" "}
                                                    {
                                                      listValue.publication_issue
                                                    }
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
                                                      ระดับคุณภาพ :{" "}
                                                      {listValue.quality_level}
                                                    </Typography>
                                                    ประเทศ :{" "}
                                                    {
                                                      listValue.publication_country
                                                    }
                                                  </Typography>
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ลิงค์เว็บไซต์ :
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
                                                    เอกสาร :
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
                                                      ).toLocaleDateString(
                                                        "th-TH",
                                                        {
                                                          year: "numeric",
                                                          month: "long",
                                                          day: "numeric",
                                                        }
                                                      )
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
                                                  className={
                                                    classTimeline.paper
                                                  }
                                                >
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ชื่องานตีพิมพ์ :{" "}
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
                                                    ประเภท :{" "}
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
                                                    ตีพิมพ์ :{" "}
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
                                                    ฉบับที่ตีพิมพ์:{" "}
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
                                                    ระดับคุณภาพ :{" "}
                                                    {listValue.co_quality_level}
                                                  </Typography>
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ประเทศ :{" "}
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
                                                    เอกสาร :
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
                              <Accordion.Header>ระดับนานาชาติ</Accordion.Header>
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
                                          (classes.customLabel,
                                          classes.headerLabel)
                                        }
                                      >
                                        ระดับนานาชาติ
                                      </CardTitle>
                                    </CardBody>
                                    <Timeline
                                      align="alternate"
                                      className="rc-body3"
                                    >
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
                                                      ).toLocaleDateString(
                                                        "th-TH",
                                                        {
                                                          year: "numeric",
                                                          month: "long",
                                                          day: "numeric",
                                                        }
                                                      )
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
                                                  className={
                                                    classTimeline.paper
                                                  }
                                                >
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ชื่องานตีพิมพ์ :{" "}
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
                                                    ประเภท :{" "}
                                                    {listValue.publication_type
                                                      ? publication_type[
                                                          listValue
                                                            .publication_type
                                                        ]
                                                      : " "}
                                                  </Typography>
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ตีพิมพ์ :{" "}
                                                    {
                                                      listValue.publication_publish
                                                    }
                                                  </Typography>
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ฉบับที่ตีพิมพ์:{" "}
                                                    {
                                                      listValue.publication_issue
                                                    }
                                                  </Typography>
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ระดับคุณภาพ :{" "}
                                                    {listValue.quality_level}
                                                  </Typography>
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ประเทศ :{" "}
                                                    {
                                                      listValue.publication_country
                                                    }
                                                  </Typography>
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ลิงค์เว็บไซต์ :
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
                                                    เอกสาร :
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
                                        {CoPubliINTER3.map(
                                          (listValue, index) => {
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
                                                        ).toLocaleDateString(
                                                          "th-TH",
                                                          {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                          }
                                                        )
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
                                                    className={
                                                      classTimeline.paper
                                                    }
                                                  >
                                                    <Typography
                                                      style={{
                                                        fontFamily: "Prompt",
                                                      }}
                                                      align="left"
                                                    >
                                                      ชื่องานตีพิมพ์ :{" "}
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
                                                      ประเภท :{" "}
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
                                                      ตีพิมพ์ :{" "}
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
                                                      ฉบับที่ตีพิมพ์:{" "}
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
                                                      ระดับคุณภาพ :{" "}
                                                      {
                                                        listValue.co_quality_level
                                                      }
                                                    </Typography>
                                                    <Typography
                                                      style={{
                                                        fontFamily: "Prompt",
                                                      }}
                                                      align="left"
                                                    >
                                                      ประเทศ :{" "}
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
                                                      เอกสาร :
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
                                          }
                                        )}
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
                              <Accordion.Header>ระดับชาติ</Accordion.Header>
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
                                          (classes.customLabel,
                                          classes.headerLabel)
                                        }
                                      >
                                        ระดับชาติ
                                      </CardTitle>
                                    </CardBody>
                                    <Timeline
                                      align="alternate"
                                      className="rc-body3"
                                    >
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
                                                      ).toLocaleDateString(
                                                        "th-TH",
                                                        {
                                                          year: "numeric",
                                                          month: "long",
                                                          day: "numeric",
                                                        }
                                                      )
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
                                                  className={
                                                    classTimeline.paper
                                                  }
                                                >
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ชื่องานตีพิมพ์ :{" "}
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
                                                    ประเภท :{" "}
                                                    {listValue.publication_type
                                                      ? publication_type[
                                                          listValue
                                                            .publication_type
                                                        ]
                                                      : " "}
                                                  </Typography>
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ตีพิมพ์ :{" "}
                                                    {
                                                      listValue.publication_publish
                                                    }
                                                  </Typography>
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ฉบับที่ตีพิมพ์:{" "}
                                                    {
                                                      listValue.publication_issue
                                                    }
                                                  </Typography>
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ระดับคุณภาพ :{" "}
                                                    {listValue.quality_level}
                                                  </Typography>
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ประเทศ :{" "}
                                                    {
                                                      listValue.publication_country
                                                    }
                                                  </Typography>
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ลิงค์เว็บไซต์ :
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
                                                    เอกสาร :
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
                                                      ).toLocaleDateString(
                                                        "th-TH",
                                                        {
                                                          year: "numeric",
                                                          month: "long",
                                                          day: "numeric",
                                                        }
                                                      )
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
                                                  className={
                                                    classTimeline.paper
                                                  }
                                                >
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ชื่องานตีพิมพ์ :{" "}
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
                                                    ประเภท :{" "}
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
                                                    ตีพิมพ์ :{" "}
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
                                                    ฉบับที่ตีพิมพ์:{" "}
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
                                                    ระดับคุณภาพ :{" "}
                                                    {listValue.co_quality_level}
                                                  </Typography>
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ประเทศ :{" "}
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
                                                    เอกสาร :
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
                              <Accordion.Header>ระดับนานาชาติ</Accordion.Header>
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
                                          (classes.customLabel,
                                          classes.headerLabel)
                                        }
                                      >
                                        ระดับนานาชาติ
                                      </CardTitle>
                                    </CardBody>
                                    <Timeline
                                      align="alternate"
                                      className="rc-body3"
                                    >
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
                                                      ).toLocaleDateString(
                                                        "th-TH",
                                                        {
                                                          year: "numeric",
                                                          month: "long",
                                                          day: "numeric",
                                                        }
                                                      )
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
                                                  className={
                                                    classTimeline.paper
                                                  }
                                                >
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ชื่องานตีพิมพ์ :{" "}
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
                                                    ประเภท :{" "}
                                                    {listValue.publication_type
                                                      ? publication_type[
                                                          listValue
                                                            .publication_type
                                                        ]
                                                      : " "}
                                                  </Typography>
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ตีพิมพ์ :{" "}
                                                    {
                                                      listValue.publication_publish
                                                    }
                                                  </Typography>
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ฉบับที่ตีพิมพ์:{" "}
                                                    {
                                                      listValue.publication_issue
                                                    }
                                                  </Typography>
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ระดับคุณภาพ :{" "}
                                                    {listValue.quality_level}
                                                  </Typography>
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ประเทศ :{" "}
                                                    {
                                                      listValue.publication_country
                                                    }
                                                  </Typography>
                                                  <Typography
                                                    style={{
                                                      fontFamily: "Prompt",
                                                    }}
                                                    align="left"
                                                  >
                                                    ลิงค์เว็บไซต์ :
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
                                                    เอกสาร :
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
                                        {CoPubliINTER4.map(
                                          (listValue, index) => {
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
                                                        ).toLocaleDateString(
                                                          "th-TH",
                                                          {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                          }
                                                        )
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
                                                    className={
                                                      classTimeline.paper
                                                    }
                                                  >
                                                    <Typography
                                                      style={{
                                                        fontFamily: "Prompt",
                                                      }}
                                                      align="left"
                                                    >
                                                      ชื่องานตีพิมพ์ :{" "}
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
                                                      ประเภท :{" "}
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
                                                      ตีพิมพ์ :{" "}
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
                                                      ฉบับที่ตีพิมพ์:{" "}
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
                                                      ระดับคุณภาพ :{" "}
                                                      {
                                                        listValue.co_quality_level
                                                      }
                                                    </Typography>
                                                    <Typography
                                                      style={{
                                                        fontFamily: "Prompt",
                                                      }}
                                                      align="left"
                                                    >
                                                      ประเทศ :{" "}
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
                                                      เอกสาร :
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
                                          }
                                        )}
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
            </TabPanel>
            <TabPanel value={value} index={4} className="rc-body">
              <ThemeProvider theme={customTheme}>
                <div className={classes.root}>
                  <AppBar
                    position="static"
                    color="default"
                    className={classes.appbar}
                  >
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
                                    <p>
                                      ชื่อนวัตกรรม : {listValue.innovation_name}
                                    </p>
                                    <p>
                                      รายละเอียด :{" "}
                                      {parse(listValue.innovation_detail)}
                                    </p>
                                    <p>
                                      จำนวนการผลิต :{" "}
                                      {listValue.innovation_amount} ชิ้น
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
                                            {listValue.innovation_link.slice(
                                              8,
                                              50
                                            )}{" "}
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
                                          {listValue.innovation_file.slice(
                                            0,
                                            40
                                          )}{" "}
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
                                                  objectPosition:
                                                    "center center",
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
                          {coinnovation1.map(
                            (listValue, index, innovation_type) => {
                              return (
                                <Container
                                  className=" card-border"
                                  key={innovation_type}
                                >
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
                                          ชื่อนวัตกรรม :{" "}
                                          {listValue.co_researcher_pi_name}
                                        </p>
                                        <p>
                                          รายละเอียด :{" "}
                                          {listValue.co_researcher_pi_details}
                                        </p>
                                        <p>
                                          จำนวนการผลิต :{" "}
                                          {listValue.co_researcher_pi_amount}{" "}
                                          ชิ้น
                                        </p>
                                        <p>
                                          ราคา :{" "}
                                          {listValue.co_researcher_pi_price} บาท
                                        </p>
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
                                          {listValue.images.map(
                                            (listitem, index) => {
                                              return (
                                                <div>
                                                  <img
                                                    className="card-border"
                                                    style={{
                                                      objectPosition:
                                                        "center center",
                                                      padding: 5,
                                                      color: "black",
                                                    }}
                                                    width="100%"
                                                    height="auto"
                                                    src={`https://researcher.kims-rmuti.com/file-upload/co_innovationproduct_upload/${listitem.co_innovation_image}`}
                                                  />
                                                </div>
                                              );
                                            }
                                          )}
                                        </AwesomeSlider>
                                      </CardBody>
                                      <div>
                                        <CardBody>
                                          <div>
                                            {listValue.co_researcher_pi_vdo ? (
                                              <YoutubeEmbed
                                                embedId={
                                                  listValue.co_researcher_pi_vdo
                                                }
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
                            }
                          )}
                        </div>
                        <div>
                          {coinnovation2.map(
                            (listValue, index, innovation_type) => {
                              return (
                                <Container
                                  className=" card-border"
                                  key={innovation_type}
                                >
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
                                          ชื่อนวัตกรรม :{" "}
                                          {listValue.co_researcher_pi_name}
                                        </p>
                                        <p>
                                          รายละเอียด :{" "}
                                          {listValue.co_researcher_pi_details}
                                        </p>
                                        <p>
                                          จำนวนการผลิต :{" "}
                                          {listValue.co_researcher_pi_amount}{" "}
                                          ชิ้น
                                        </p>
                                        <p>
                                          ราคา :{" "}
                                          {listValue.co_researcher_pi_price} บาท
                                        </p>
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
                                          {listValue.images.map(
                                            (listitem, index) => {
                                              return (
                                                <div>
                                                  <img
                                                    className="card-border"
                                                    style={{
                                                      objectPosition:
                                                        "center center",
                                                      padding: 5,
                                                      color: "black",
                                                    }}
                                                    width="100%"
                                                    height="auto"
                                                    src={`https://researcher.kims-rmuti.com/file-upload/co_innovationproduct_upload/${listitem.co_innovation_image}`}
                                                  />
                                                </div>
                                              );
                                            }
                                          )}
                                        </AwesomeSlider>
                                      </CardBody>
                                      <div>
                                        <CardBody>
                                          <div>
                                            {listValue.co_researcher_pi_vdo ? (
                                              <YoutubeEmbed
                                                embedId={
                                                  listValue.co_researcher_pi_vdo
                                                }
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
                            }
                          )}
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
            </TabPanel>
            <TabPanel value={value} index={5} className="rc-body">
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
            </TabPanel>

            <TabPanel value={value} index={6} className="rc-body">
              <div>
                <Grid container spacing={1}>
                  <Grid item xs>
                    <Accordion>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>ประวัติการศึกษา</Accordion.Header>
                        <Accordion.Body>
                          <TableContainer className="card-header-border card-border">
                            <Card>
                              <CardBody className="card-header-border">
                                <CardTitle
                                  tag="h6"
                                  style={{ padding: 5, color: "black" }}
                                  className={
                                    (classes.customLabel, classes.headerLabel)
                                  }
                                >
                                  ประวัติการศึกษา
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
                                          {listValue.educational_status}ปี{" "}
                                          {listValue.educational_graduation}
                                        </Typography>
                                      </TimelineOppositeContent>
                                      <TimelineSeparator>
                                        <TimelineDot
                                          color="secondary"
                                          variant="outlined"
                                        >
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
                                            สาขา : {listValue.educational_major}
                                          </Typography>
                                          <Typography
                                            align="left"
                                            style={{
                                              fontFamily: "Prompt",
                                              fontSize: 14,
                                            }}
                                          >
                                            คณะ :{" "}
                                            {listValue.educational_faculty}
                                          </Typography>
                                          <Typography
                                            align="left"
                                            style={{
                                              fontFamily: "Prompt",
                                              fontSize: 14,
                                            }}
                                          >
                                            สถาบัน :{" "}
                                            {listValue.educational_Institute}
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
                        <Accordion.Header>ประสบการณ์ทำงาน</Accordion.Header>
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
                                  className={
                                    (classes.customLabel, classes.headerLabel)
                                  }
                                >
                                  ประสบการณ์ทำงาน
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
                                        <TimelineDot
                                          color="secondary"
                                          variant="outlined"
                                        >
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
                                            ตำแหน่ง :{" "}
                                            {
                                              listValue.working_experience_position
                                            }
                                          </Typography>
                                          <Typography
                                            align="left"
                                            style={{
                                              fontFamily: "Prompt",
                                              fontSize: 13,
                                            }}
                                          >
                                            หน่วยงาน :{" "}
                                            {listValue.working_section}
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
                        <Accordion.Header>ครุภัณฑ์</Accordion.Header>
                        <Accordion.Body>
                          <TableContainer style={{ fontFamily: "Prompt" }}>
                            <Card>
                              <CardBody className="card-header-border rc-body3">
                                <CardTitle
                                  tag="h6"
                                  style={{ padding: 5, color: "black" }}
                                  className={
                                    (classes.customLabel, classes.headerLabel)
                                  }
                                >
                                  ครุภัณฑ์
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
                                      ชื่อ:{" "}
                                      {listValue.purchasing_equipment_name_th}
                                    </Typography>
                                    <Typography
                                      style={{ fontFamily: "Prompt" }}
                                    >
                                      รายละเอียด:{" "}
                                      {listValue.purchasing_equipment_detail}
                                    </Typography>
                                    <Typography
                                      style={{ fontFamily: "Prompt" }}
                                    >
                                      ที่ตั้ง:{" "}
                                      {listValue.purchasing_equipment_location}
                                    </Typography>
                                    <Typography
                                      style={{ fontFamily: "Prompt" }}
                                    >
                                      {" "}
                                      เป้าหมาย: {listValue.report_reson}
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
            </TabPanel>

            <TabPanel value={value} index={7} className="rc-body">
              <Grid container spacing={1}>
                <Grid item xs>
                  <TableContainer className="card-header-border card-border rc-body3">
                    <Card>
                      <CardBody className="card-header-border">
                        <CardTitle
                          tag="h6"
                          style={{ padding: 5, color: "black" }}
                          className={(classes.customLabel, classes.headerLabel)}
                        >
                          หลักสูตร
                        </CardTitle>
                      </CardBody>

                      <Grid
                        className="rc-body2"
                        container
                        spacing={1}
                        style={{
                          fontFamily: "Prompt",
                          padding: "20px 20px 20px 20px",
                        }}
                      >
                        <TableContainer className=" card-border rc-body3">
                          <CardText
                            style={{
                              textAlign: "left",
                              padding: "20px 20px 20px 20px",
                            }}
                          >
                            {course.map((listValue, index) => {
                              return (
                                <CardText>
                                  <p>หลักสูตร : {listValue.coursenameth}</p>

                                  <p>
                                    {" "}
                                    หลักสูตรอังกฤษ :{
                                      listValue.coursenameen
                                    }{" "}
                                  </p>

                                  <p>วิทยาเขต : {listValue.camnameth}</p>

                                  <p>หลักสูตร : {listValue.yearname}</p>

                                  <p>ระดับการศึกษา : {listValue.degnameth}</p>

                                  <p>คณะ : {listValue.facnameth} </p>

                                  <Button
                                    style={{ fontFamily: "Prompt" }}
                                    a
                                    href=" http://203.158.192.107:8081/rmuticourse/?fbclid=IwAR0-v5E5uPktQ2aYF37zElh10n_EWFvFQP7DeX4JP8XjXjwLC3apdWWu5t0 "
                                  >
                                    รายละเอียดเพิ่มเติม
                                  </Button>
                                </CardText>
                              );
                            })}
                          </CardText>
                        </TableContainer>
                      </Grid>
                    </Card>
                  </TableContainer>
                </Grid>
              </Grid>
            </TabPanel>
          </SwipeableViews>
        </Suspense>
      </div>
    </div>
  );
}

export default withRouter(RCbutton);
