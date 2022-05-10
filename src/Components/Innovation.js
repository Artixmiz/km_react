import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  Form,
  FormGroup,
  Input,
  CardText,
} from "reactstrap";
import React, { useEffect, useState } from "react";

import OwlCarousel from 'react-owl-carousel2';
// import 'react-owl-carousel2/style.css';

import "./Css/Search.scss";
import "../index.css";

import { withRouter } from "react-router";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

import background_innovation from "../images/bg_innovation.png";

import "./Css/innovation.scss";
import $ from "jquery";

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  abRoot: {
    backgroundColor: "bule",
  },
  abStatic: {
    border: "solid blue 2px",
  },
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
$(document).ready(function () {
  var zindex = 10;

  $("div.card").click(function (e) {
    e.preventDefault();

    var isShowing = false;

    if ($(this).hasClass("show")) {
      isShowing = true;
    }

    if ($("div.cards").hasClass("showing")) {
      // a card is already in view
      $("div.card.show").removeClass("show");

      if (isShowing) {
        // this card was showing - reset the grid
        $("div.cards").removeClass("showing");
      } else {
        // this card isn't showing - get in with it
        $(this).css({ zIndex: zindex }).addClass("show");
      }

      zindex++;
    } else {
      // no cards in view
      $("div.cards").addClass("showing");
      $(this).css({ zIndex: zindex }).addClass("show");

      zindex++;
    }
  });
});

function SearchPageCoRe(props) {
  // const { locationCo } = props;
  const [productinnovation, setproductinnovation] = useState([]);
  const [productlist, setproductlist] = useState([]);
  const [innovationgroup1, setinnovationgroup1] = useState([]);
  const [innovationgroup2, setinnovationgroup2] = useState([]);
  const [productgroup, setproductgroup] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchTitle1, setSearchTitle1] = useState("");

  // const [page, setPage] = useState(1);
  // const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [previousValue] = useState([]);
  // const classes = useStyles();

  const [innovation, setinnovation] = useState("");
  const [product, setproduct] = useState("");

  const classes = useStyles();

  const handleChangeInnovation = (event) => {
    setinnovation(event.target.value);
  };

  const handleChangeProduct = (event) => {
    setproduct(event.target.value);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [valuePage1, setValuePage1] = useState(0);

  const handleChangePage1 = (event, newValue) => {
    setValuePage1(newValue);
  };

  const apiUrl = "https://kmapi.kims-rmuti.com";
  const localUrl = "http://localhost:4000";

  const getRequestParams = (title, innovation_group) => {
    let params = {};

    // if (page) {
    //   params["page"] = page - 1;
    // }

    if (innovation_group) {
      params["innovation_group_id"] = innovation_group;
    }

    // if (product_group) {
    //   params["product_group_id"] = product_group;
    // }

    if (title != undefined) {
      params["title"] = title;
    }

    return params;
  };

  const getRequestParams1 = (title, product_group) => {
    let params = {};

    // if (page) {
    //   params["page"] = page - 1;
    // }

    // if (innovation_group) {
    //   params["innovation_group_id"] = innovation_group;
    // }

    if (product_group) {
      params["product_group_id"] = product_group;
    }

    if (title != undefined) {
      params["title"] = title;
    }

    return params;
  };

  const getinnovationGroup1 = () => {
    axios
      .get(`${apiUrl}/api/get/co_researcher_product_group/findinnovationgroup1`)
      .then((res) => {
        setinnovationgroup1(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getinnovationGroup2 = () => {
    axios
      .get(`${apiUrl}/api/get/co_researcher_product_group/findinnovationgroup2`)
      .then((res) => {
        setinnovationgroup2(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getproductGroup = () => {
    axios
      .get(`${apiUrl}/api/get/co_researcher_product_group`)
      .then((res) => {
        setproductgroup(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const retrieveinnovation = () => {
    setLoading(true);
    // previousValue.push(selected);

    // if (previousValue.length > 2) {
    //   previousValue.shift();
    // }
    // console.log(previousValue);

    const params = getRequestParams(searchTitle, innovation);
    console.log(params);
    axios
      .get(
        `${apiUrl}/api/get/co_researcher_productionnovation/innovation/list`,
        { params }
      )
      .then((res) => {
        console.log(res.data);

        // console.log(users);
        setproductinnovation([res.data[0]]);
        // setCount(totalPages);
      })
      .finally(() => {
        setMessage("");
        setLoading(false);
        // if (previousValue[0] != previousValue[1]) {
        //   setPage(1);
        // }
      })
      .catch((e) => {
        console.log(e);
        // setPage(1);
        // setCount(0);
        // setTimeout(() => {
        //   setMessage(e.response.data.message);
        // }, 500);
        setMessage(e.response.data.message);
      });
  };

  const retrieveProduct = () => {
    setLoading(true);
    // previousValue.push(selected);

    // if (previousValue.length > 2) {
    //   previousValue.shift();
    // }
    // console.log(previousValue);

    const params = getRequestParams1(searchTitle, product);
    console.log(params);
    axios
      .get(`${apiUrl}/api/get/co_researcher_productionnovation/product/list`, {
        params,
      })
      .then((res) => {
        console.log(res.data);

        // console.log(users);
        setproductlist([res.data[0]]);
        // setCount(totalPages);
      })
      .finally(() => {
        setMessage("");
        setLoading(false);
        // if (previousValue[0] != previousValue[1]) {
        //   setPage(1);
        // }
      })
      .catch((e) => {
        console.log(e);
        // setPage(1);
        // setCount(0);
        // setTimeout(() => {
        //   setMessage(e.response.data.message);
        // }, 500);
        setMessage(e.response.data.message);
      });
  };

  React.useEffect(() => {
    retrieveProduct();
    retrieveinnovation();
    getinnovationGroup1();
    getinnovationGroup2();
    getproductGroup();
  }, []);

  const onChangeTitle = (e) => {
    setSearchTitle(e.target.value);
  };

  const onChangeTitle1 = (e) => {
    setSearchTitle1(e.target.value);
  };

  // React.useEffect(() => {
  //   retrieveCoResearchers();
  // }, [page]);

  const options = {
    items: 4,
    nav: true,
    rewind: true,
    autoplay: true,
    margin:10
  };

  return (
    // <body className="img-bg">
    <div className="body-detail" style={{ background: "#6cb5df85" }}>
      <div style={{ padding: "15px", margin: "0px 20px 0px 20px" }}>
        <Row>
          <Col md={12}>
            <div
              style={{
                backgroundImage: `url(${background_innovation})`,
                backgroundSize: "cover",
                borderRadius: "20px",
                padding: "0.5rem 0.5rem 0.5rem 2rem",
                boxShadow: "2px 4px 8px 4px #e56f2d78",
              }}
            >
              <div className="cards">
                <Row style={{ width: "100%" }}>
                  <Col sm={4} md={4} lg={3}>
                    <div className="title-center">
                      <div className="bg-title">
                        <Row>
                          <Col md={12}>
                            <h1
                              className="hit-the-floor"
                              style={{ color: "white", fontFamily: "Prompt" }}
                            >
                              นวัตกรรม
                            </h1>
                          </Col>
                          <Col md={12}>
                            <h1
                              className="hit-the-floor"
                              style={{ color: "white", fontFamily: "Prompt" }}
                            >
                              Innovation
                            </h1>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                  <Col sm={4} md={4} lg={3}>
                    <div className="card">
                      <div className="card__image-holder">
                        <img
                          className="card__image img-innovation"
                          src="https://researcher.kims-rmuti.com/file-upload/us_innovation-upload/3681375bba7c8bd147fe76688f753ac1.png"
                          alt="wave"
                        />
                      </div>
                      <div className="card-title">
                        <a href="#" className="toggle-info btn">
                          <span className="left" />
                          <span className="right" />
                        </a>
                        <h2 style={{ paddingTop: "0.5rem" }}>
                          STGuide
                          <small>ราคา:120,000 บาท</small>
                        </h2>
                      </div>
                      <div className="card-flap flap1">
                        <div className="card-description">
                          <p>เลขที่สิทธิบัตร :</p>
                          <p>จำนวนการผลิต : 10 ชิ้น</p>
                          <p>ผู้ประสานงาน : จงกล จันทร์เรือง</p>
                          <p>โทรศัพท์ : 0839650226</p>
                          <p>
                            Facebook : https://www.facebook.com/jongkol.janruang
                          </p>
                          <p>Line : jjsci</p>
                          <p>Email : jj@sci.rmuti.ac.th</p>
                        </div>
                        <div className="card-flap flap2">
                          <div className="card-actions">
                            <a href="#" className="btn">
                              Read more
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col sm={4} md={4} lg={3}>
                    <div className="card">
                      <div className="card__image-holder">
                        <img
                          className="card__image img-innovation"
                          src="https://source.unsplash.com/300x225/?beach"
                          alt="beach"
                        />
                      </div>
                      <div className="card-title">
                        <a href="#" className="toggle-info btn">
                          <span className="left" />
                          <span className="right" />
                        </a>
                        <h2>
                          Card title
                          <small>Image from unsplash.com</small>
                        </h2>
                      </div>
                      <div className="card-flap flap1">
                        <div className="card-description">
                          This grid is an attempt to make something nice that
                          works on touch devices. Ignoring hover states when
                          they're not available etc.
                        </div>
                        <div className="card-flap flap2">
                          <div className="card-actions">
                            <a href="#" className="btn">
                              Read more
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col sm={4} md={4} lg={3}>
                    <div className="card">
                      <div className="card__image-holder ">
                        <img
                          className="card__image img-innovation"
                          src="https://source.unsplash.com/300x225/?mountain"
                          alt="mountain"
                        />
                      </div>
                      <div className="card-title">
                        <a href="#" className="toggle-info btn">
                          <span className="left" />
                          <span className="right" />
                        </a>
                        <h2>
                          Card title
                          <small>Image from unsplash.com</small>
                        </h2>
                      </div>
                      <div className="card-flap flap1">
                        <div className="card-description">
                          This grid is an attempt to make something nice that
                          works on touch devices. Ignoring hover states when
                          they're not available etc.
                        </div>
                        <div className="card-flap flap2">
                          <div className="card-actions">
                            <a href="#" className="btn">
                              Read more
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>

                  <OwlCarousel className="owl-theme" options={options}>
                    <div className="card">
                      <div className="card__image-holder">
                        <img
                          className="card__image img-innovation"
                          src="https://researcher.kims-rmuti.com/file-upload/us_innovation-upload/3681375bba7c8bd147fe76688f753ac1.png"
                          alt="wave"
                        />
                      </div>
                      <div className="card-title">
                        <a href="#" className="toggle-info btn">
                          <span className="left" />
                          <span className="right" />
                        </a>
                        <h2 style={{ paddingTop: "0.5rem" }}>
                          STGuide
                          <small>ราคา:120,000 บาท</small>
                        </h2>
                      </div>
                      <div className="card-flap flap1">
                        <div className="card-description">
                          <p>เลขที่สิทธิบัตร :</p>
                          <p>จำนวนการผลิต : 10 ชิ้น</p>
                          <p>ผู้ประสานงาน : จงกล จันทร์เรือง</p>
                          <p>โทรศัพท์ : 0839650226</p>
                          <p>
                            Facebook : https://www.facebook.com/jongkol.janruang
                          </p>
                          <p>Line : jjsci</p>
                          <p>Email : jj@sci.rmuti.ac.th</p>
                        </div>
                        <div className="card-flap flap2">
                          <div className="card-actions">
                            <a href="#" className="btn">
                              Read more
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card__image-holder">
                        <img
                          className="card__image img-innovation"
                          src="https://researcher.kims-rmuti.com/file-upload/us_innovation-upload/3681375bba7c8bd147fe76688f753ac1.png"
                          alt="wave"
                        />
                      </div>
                      <div className="card-title">
                        <a href="#" className="toggle-info btn">
                          <span className="left" />
                          <span className="right" />
                        </a>
                        <h2 style={{ paddingTop: "0.5rem" }}>
                          STGuide
                          <small>ราคา:120,000 บาท</small>
                        </h2>
                      </div>
                      <div className="card-flap flap1">
                        <div className="card-description">
                          <p>เลขที่สิทธิบัตร :</p>
                          <p>จำนวนการผลิต : 10 ชิ้น</p>
                          <p>ผู้ประสานงาน : จงกล จันทร์เรือง</p>
                          <p>โทรศัพท์ : 0839650226</p>
                          <p>
                            Facebook : https://www.facebook.com/jongkol.janruang
                          </p>
                          <p>Line : jjsci</p>
                          <p>Email : jj@sci.rmuti.ac.th</p>
                        </div>
                        <div className="card-flap flap2">
                          <div className="card-actions">
                            <a href="#" className="btn">
                              Read more
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card__image-holder">
                        <img
                          className="card__image img-innovation"
                          src="https://researcher.kims-rmuti.com/file-upload/us_innovation-upload/3681375bba7c8bd147fe76688f753ac1.png"
                          alt="wave"
                        />
                      </div>
                      <div className="card-title">
                        <a href="#" className="toggle-info btn">
                          <span className="left" />
                          <span className="right" />
                        </a>
                        <h2 style={{ paddingTop: "0.5rem" }}>
                          STGuide
                          <small>ราคา:120,000 บาท</small>
                        </h2>
                      </div>
                      <div className="card-flap flap1">
                        <div className="card-description">
                          <p>เลขที่สิทธิบัตร :</p>
                          <p>จำนวนการผลิต : 10 ชิ้น</p>
                          <p>ผู้ประสานงาน : จงกล จันทร์เรือง</p>
                          <p>โทรศัพท์ : 0839650226</p>
                          <p>
                            Facebook : https://www.facebook.com/jongkol.janruang
                          </p>
                          <p>Line : jjsci</p>
                          <p>Email : jj@sci.rmuti.ac.th</p>
                        </div>
                        <div className="card-flap flap2">
                          <div className="card-actions">
                            <a href="#" className="btn">
                              Read more
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card__image-holder">
                        <img
                          className="card__image img-innovation"
                          src="https://researcher.kims-rmuti.com/file-upload/us_innovation-upload/3681375bba7c8bd147fe76688f753ac1.png"
                          alt="wave"
                        />
                      </div>
                      <div className="card-title">
                        <a href="#" className="toggle-info btn">
                          <span className="left" />
                          <span className="right" />
                        </a>
                        <h2 style={{ paddingTop: "0.5rem" }}>
                          STGuide
                          <small>ราคา:120,000 บาท</small>
                        </h2>
                      </div>
                      <div className="card-flap flap1">
                        <div className="card-description">
                          <p>เลขที่สิทธิบัตร :</p>
                          <p>จำนวนการผลิต : 10 ชิ้น</p>
                          <p>ผู้ประสานงาน : จงกล จันทร์เรือง</p>
                          <p>โทรศัพท์ : 0839650226</p>
                          <p>
                            Facebook : https://www.facebook.com/jongkol.janruang
                          </p>
                          <p>Line : jjsci</p>
                          <p>Email : jj@sci.rmuti.ac.th</p>
                        </div>
                        <div className="card-flap flap2">
                          <div className="card-actions">
                            <a href="#" className="btn">
                              Read more
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card__image-holder">
                        <img
                          className="card__image img-innovation"
                          src="https://source.unsplash.com/300x225/?beach"
                          alt="beach"
                        />
                      </div>
                      <div className="card-title">
                        <a href="#" className="toggle-info btn">
                          <span className="left" />
                          <span className="right" />
                        </a>
                        <h2>
                          Card title
                          <small>Image from unsplash.com</small>
                        </h2>
                      </div>
                      <div className="card-flap flap1">
                        <div className="card-description">
                          This grid is an attempt to make something nice that
                          works on touch devices. Ignoring hover states when
                          they're not available etc.
                        </div>
                        <div className="card-flap flap2">
                          <div className="card-actions">
                            <a href="#" className="btn">
                              Read more
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card__image-holder">
                        <img
                          className="card__image img-innovation"
                          src="https://source.unsplash.com/300x225/?beach"
                          alt="beach"
                        />
                      </div>
                      <div className="card-title">
                        <a href="#" className="toggle-info btn">
                          <span className="left" />
                          <span className="right" />
                        </a>
                        <h2>
                          Card title
                          <small>Image from unsplash.com</small>
                        </h2>
                      </div>
                      <div className="card-flap flap1">
                        <div className="card-description">
                          This grid is an attempt to make something nice that
                          works on touch devices. Ignoring hover states when
                          they're not available etc.
                        </div>
                        <div className="card-flap flap2">
                          <div className="card-actions">
                            <a href="#" className="btn">
                              Read more
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </OwlCarousel>
                </Row>
              </div>
            </div>
          </Col>
          <Col md={12} style={{ marginTop: "5vh" }}>
            <div
              style={{
                backgroundImage: `url(${background_innovation})`,
                height: "55vh",
                backgroundSize: "cover",
                borderRadius: "20px",
              }}
            >
              Hello World
            </div>
          </Col>
          <Col md={12} style={{ marginTop: "1rem" }}>
            <div
              style={{
                backgroundImage: `url(${background_innovation})`,
                height: "55vh",
                backgroundSize: "cover",
                borderRadius: "20px",
              }}
            >
              Hello World
            </div>
          </Col>
          <Col md={3}>
            <Card
              className="card-border card1"
              onClick={() => {
                props.history.push({
                  pathname: "/Innovat",
                });
              }}
            >
              <div>
                {/* <img
                    position="relative"
                    align="right"
                    width="520px"
                    height="800px"
                    // src={innoimg}
                  /> */}
              </div>
            </Card>
          </Col>

          <Col md={3}>
            <Card
              className="card-border card1"
              onClick={() => {
                props.history.push({
                  pathname: "/Product",
                });
              }}
            >
              <div>
                {/* <img
                    position="relative"
                    align="right"
                    width="520px"
                    height="800px"
                    src={pdimg}
                  /> */}
              </div>
            </Card>
          </Col>

          <Col md={3}>
            <Card
              className="card-border card1"
              onClick={() => {
                props.history.push({
                  pathname: "/Creative",
                });
              }}
            >
              <div>
                {/* <img
                    position="relative"
                    align="right"
                    width="520px"
                    height="800px"
                    src={ctimg}
                  /> */}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
    // </body>
  );
}

export default withRouter(SearchPageCoRe);
