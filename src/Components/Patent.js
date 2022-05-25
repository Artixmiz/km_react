import { Row, Col } from "reactstrap";
import React, { useState } from "react";
import { FcManager } from "react-icons/fc";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/dist/css/splide.min.css";

// import "./Css/Search.scss";
// import "../index.css";

import { withRouter } from "react-router";
import axios from "axios";

import background_product from "../images/bg_product.png";

import no_img_research from "../images/no_img_research.png";
import no_img_product from "../images/no_img_product.png";
import no_img_creative from "../images/no_img_creative.png";

import { useTranslation } from "react-i18next";

import "./Css/innovation.scss";
// import $ from "jquery";

function Patent(props) {
  // const { locationCo } = props;

  const [researcher, setresearcher] = useState([]);
  const [community, setcommunity] = useState([]);
  const [co_operation, setco_operation] = useState([]);
  const { t } = useTranslation();

  const apiUrl = "https://kmapi.kims-rmuti.com";

  const getresearcher = () => {
    axios
      .get(`${apiUrl}/api/get/patent?title=`)
      .then((res) => {
        setresearcher(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getcommunity = () => {
    axios
      .get(`${apiUrl}api/get/co-researcher/commupatent/list?title=`)
      .then((res) => {
        setcommunity(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getco_operation = () => {
    axios
      .get(`${apiUrl}/api/get/co-researcher/cooppatent/list?title=`)
      .then((res) => {
        setco_operation(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    getresearcher();
    getcommunity();
    getco_operation();
  }, []);

  function getMultipleRandom(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, num);
  }

  console.log("researcher:", researcher);
  console.log("community:", community);
  console.log("co_operation:", co_operation);

  // const imageExists = async (url, callback) => {
  //   var img = new Image();
  //   img.onload = function () {
  //     callback(true);
  //   };
  //   img.onerror = function () {
  //     callback(false);
  //   };
  //   img.src = url;
  // };

  let innovationdata = getMultipleRandom(researcher, 15).map(function (
    listValue,
    i
  ) {
    var url_image = "";
    if (listValue.patent_images) {
      url_image = `https://researcher.kims-rmuti.com/file-upload/patent-upload/${listValue.patent_images}`;
    } else {
      url_image = no_img_research;
    }

    // console.log(url_image);
    return (
      <SplideSlide key={i}>
        <div className="card card-bg-innovation card-innovation">
          <div className="card__image-holder">
            <img
              className="card__image img-innovation"
              src={url_image}
              onError={(e) => (
                (e.target.onerror = null), (e.target.src = no_img_research)
              )}
              alt="co_innovation_image"
            />
          </div>
          <div className="card-innovation-title">
            <h2 className="innovation-title" style={{ paddingTop: "0.5rem" }}>
              {listValue.patent_name_th}
            </h2>
            <small className="innovation">
              <FcManager size={15} /> : {listValue.patent_application}
            </small>
          </div>
          <div className="descriptions">
            <h5 className="title-hover">{listValue.patent_name_th}</h5>
            <p>
              {t("innovation.details")} :{" "}
              {listValue.innovation_detail
                ? listValue.innovation_detail.replace(
                    /<[^>]+>|&nbsp;|&quot;/g,
                    ""
                  )
                : "-"}
            </p>
            <p>
              {t("innovation.productionamount")} :
              {listValue.co_researcher_pi_amount
                ? listValue.co_researcher_pi_amount
                : listValue.innovation_amount}{" "}
              {t("innovation.item")}
            </p>
            <p>
              {t("innovation.coordinator")} :{" "}
              {listValue.co_researcher_pi_coordinator
                ? listValue.co_researcher_pi_coordinator
                : "-"}
            </p>
            <p>
              {t("innovation.tel")} :{" "}
              {listValue.co_researcher_pi_phone
                ? listValue.co_researcher_pi_phone
                : "-"}
            </p>
            <a href="#" className="btn-innovation">
              {t("innovation.seemore")}
            </a>
          </div>
        </div>
      </SplideSlide>
    );
  });

  let productdata = getMultipleRandom(community, 15).map(function (
    listValue,
    i
  ) {
    return (
      <SplideSlide key={i}>
        <div className="card card-bg-innovation card-innovation">
          <div className="card__image-holder">
            <img
              className="card__image img-innovation"
              src={
                listValue.co_researcher_pi_image
                  ? `https://researcher.kims-rmuti.com/file-upload/co_innovationproduct_upload/${listValue.co_researcher_pi_image}`
                  : `https://researcher.kims-rmuti.com/file-upload/us_innovation-upload/${listValue.co_researcher_pi_image}`
              }
              alt="co_researcher_pi_image"
            />
          </div>
          <div className="card-innovation-title">
            <h2 className="innovation-title" style={{ paddingTop: "0.5rem" }}>
              {listValue.co_researcher_pi_name
                ? listValue.co_researcher_pi_name
                : listValue.innovation_name}
            </h2>
            <small className="innovation">
              ราคา:{" "}
              {listValue.co_researcher_pi_price
                ? listValue.co_researcher_pi_price
                : listValue.innovation_price}{" "}
              บาท
            </small>
          </div>
          <div className="descriptions">
            <h5 className="title-hover">
              {" "}
              {listValue.co_researcher_pi_name
                ? listValue.co_researcher_pi_name
                : listValue.innovation_name}
            </h5>
            <p>
              รายละเอียด :{" "}
              {listValue.co_researcher_pi_details
                ? listValue.co_researcher_pi_details
                : listValue.co_researcher_pi_details}{" "}
            </p>
            <p>
              จำนวนการผลิต :
              {listValue.co_researcher_pi_amount
                ? listValue.co_researcher_pi_amount
                : listValue.innovation_amount}{" "}
              ชิ้น
            </p>
            <p>
              ผู้ประสานงาน :{" "}
              {listValue.co_researcher_pi_coordinator
                ? listValue.co_researcher_pi_coordinator
                : "-"}
            </p>
            <p>
              โทรศัพท์ :{" "}
              {listValue.co_researcher_pi_phone
                ? listValue.co_researcher_pi_phone
                : "-"}
            </p>
            <a href="#" className="btn-innovation">
              ดูเพิ่มเติม
            </a>
          </div>
        </div>
      </SplideSlide>
    );
  });

  let creativedata = getMultipleRandom(co_operation, 15).map(function (
    listValue,
    i
  ) {
    return (
      <SplideSlide key={i}>
        <div className="card card-bg-innovation card-innovation">
          <div className="card__image-holder">
            <img
              className="card__image img-innovation"
              src={
                listValue.co_researcher_pi_image
                  ? `https://researcher.kims-rmuti.com/file-upload/co_innovationproduct_upload/${listValue.co_researcher_pi_image}`
                  : `https://researcher.kims-rmuti.com/file-upload/us_innovation-upload/${listValue.co_researcher_pi_image}`
              }
              alt="co_researcher_pi_image"
            />
          </div>
          <div className="card-innovation-title">
            <h2 className="innovation-title" style={{ paddingTop: "0.5rem" }}>
              {listValue.co_researcher_pi_name
                ? listValue.co_researcher_pi_name
                : listValue.innovation_name}
            </h2>
            <small className="innovation">
              ราคา:{" "}
              {listValue.co_researcher_pi_price
                ? listValue.co_researcher_pi_price
                : listValue.innovation_price}{" "}
              บาท
            </small>
          </div>
          <div className="descriptions">
            <h5 className="title-hover">
              {" "}
              {listValue.co_researcher_pi_name
                ? listValue.co_researcher_pi_name
                : listValue.innovation_name}
            </h5>
            <p>
              รายละเอียด :{" "}
              {listValue.co_researcher_pi_details
                ? listValue.co_researcher_pi_details
                : listValue.co_researcher_pi_details}{" "}
            </p>
            <p>
              จำนวนการผลิต :
              {listValue.co_researcher_pi_amount
                ? listValue.co_researcher_pi_amount
                : listValue.innovation_amount}{" "}
              ชิ้น
            </p>
            <p>
              ผู้ประสานงาน :{" "}
              {listValue.co_researcher_pi_coordinator
                ? listValue.co_researcher_pi_coordinator
                : "-"}
            </p>
            <p>
              โทรศัพท์ :{" "}
              {listValue.co_researcher_pi_phone
                ? listValue.co_researcher_pi_phone
                : "-"}
            </p>
            <a href="#" className="btn-innovation">
              ดูเพิ่มเติม
            </a>
          </div>
        </div>
      </SplideSlide>
    );
  });

  const options_top = {
    type: "loop",
    gap: "1rem",
    perPage: 4,
    perMove: 1,
    interval: 3000,
    pagination: false,
    speed: 2000,
    start: 10,
    breakpoints: {
      2560: {
        perPage: 4,
      },
      1440: {
        perPage: 3,
      },
      1024: {
        perPage: 3,
      },
      768: {
        perPage: 2,
      },
      640: {
        perPage: 1,
      },
    },
    autoplay: true,
    pauseOnHover: true,
    resetProgress: false,
  };

  const options = {
    type: "loop",
    gap: "1rem",
    perPage: 5,
    perMove: 1,
    interval: 2500,
    pagination: false,
    speed: 2000,
    breakpoints: {
      2560: {
        perPage: 5,
      },
      1440: {
        perPage: 4,
      },
      1024: {
        perPage: 4,
      },
      768: {
        perPage: 3,
      },
      640: {
        perPage: 2,
      },
    },
    autoplay: true,
    pauseOnHover: true,
    resetProgress: false,
  };

  return (
    <div className="body-detail" >
      <div style={{ padding: "15px", margin: "0px 20px 0px 20px" }}>
        <Row>
          <Col md={12}>
            <div
              style={{
                backgroundImage: `url(${background_product})`,
                backgroundSize: "cover",
                borderRadius: "20px",
                padding: "0.5rem 0.5rem 0.5rem 2rem",
                boxShadow: "2px 4px 8px 4px #e56f2d78",
              }}
            >
              <div className="cards">
                <Row style={{ width: "100%" }}>
                  <Col md={12} style={{ textAlign: "right" }}>
                    <h6 style={{ color: "white", fontFamily: "Prompt" }}>
                      {t("innovation.viewall")}
                    </h6>
                  </Col>
                  <Col sm={4} md={4} lg={3}>
                    <div className="title-center">
                      <div className="bg-title">
                        <Row>
                          <Col md={12}>
                            <h1
                              className="hit-the-floor"
                              style={{ color: "white", fontFamily: "Prompt" }}
                            >
                              {t("patent.researcher")}
                            </h1>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                  <Col sm={8} md={8} lg={9}>
                    {researcher.length > 0 ? (
                      <Splide
                        options={options_top}
                        aria-labelledby="autoplay-example-heading"
                      >
                        {innovationdata}
                      </Splide>
                    ) : null}
                  </Col>
                  <Col md={12}>
                    {researcher.length > 0 ? (
                      <Splide
                        options={options}
                        aria-labelledby="autoplay-example-heading"
                      >
                        {innovationdata}
                      </Splide>
                    ) : null}
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col md={12} style={{ marginTop: "2rem" }}>
            <div
              style={{
                backgroundImage: `url(${background_product})`,
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
                              {t("patent.community")}
                            </h1>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                  <Col sm={8} md={8} lg={9}>
                    {community.length > 0 ? (
                      <Splide
                        options={options_top}
                        aria-labelledby="autoplay-example-heading"
                      >
                        {productdata}
                      </Splide>
                    ) : null}
                  </Col>
                  <Col md={12}>
                    {community.length > 0 ? (
                      <Splide
                        options={options}
                        aria-labelledby="autoplay-example-heading"
                      >
                        {productdata}
                      </Splide>
                    ) : null}
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col md={12} style={{ marginTop: "2rem" }}>
            <div
              style={{
                backgroundImage: `url(${background_product})`,
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
                              {t("patent.co_operation")}
                            </h1>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                  <Col sm={8} md={8} lg={9}>
                    {co_operation.length > 0 ? (
                      <Splide
                        options={options_top}
                        aria-labelledby="autoplay-example-heading"
                      >
                        {creativedata}
                      </Splide>
                    ) : null}
                  </Col>
                  <Col md={12}>
                    {co_operation.length > 0 ? (
                      <Splide
                        options={options}
                        aria-labelledby="autoplay-example-heading"
                      >
                        {creativedata}
                      </Splide>
                    ) : null}
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default withRouter(Patent);
