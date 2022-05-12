import { Row, Col } from "reactstrap";
import React, { useState } from "react";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/dist/css/splide.min.css";

// import "./Css/Search.scss";
// import "../index.css";

import { withRouter } from "react-router";
import axios from "axios";

import background_innovation from "../images/bg_innovation.png";

import no_img_innovation from "../images/no_img_innovation.png";
import no_img_product from "../images/no_img_product.png";
import no_img_creative from "../images/no_img_creative.png";

import "./Css/innovation.scss";
// import $ from "jquery";

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

function SearchPageCoRe(props) {
  // const { locationCo } = props;
  const [creativelist, setcreativelist] = useState([]);
  const [productlist, setproductlist] = useState([]);
  const [innovationlist, setinnovationlist] = useState([]);

  const apiUrl = "https://kmapi.kims-rmuti.com";

  const getinnovationlist = () => {
    axios
      .get(
        `${apiUrl}/api/get/co_researcher_productionnovation/innovation/list?innovation_group_id=&title=`
      )
      .then((res) => {
        setinnovationlist(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getproductlist = () => {
    axios
      .get(
        `${apiUrl}/api/get/co_researcher_productionnovation/product/list?title=`
      )
      .then((res) => {
        setproductlist(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getcreativelist = () => {
    axios
      .get(
        `${apiUrl}/api/get/co_researcher_productionnovation/cretive/list?title=`
      )
      .then((res) => {
        setcreativelist(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    getinnovationlist();
    getproductlist();
    getcreativelist();
  }, []);

  function getMultipleRandom(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, num);
  }

  console.log("innovationlist:", innovationlist);
  console.log("productlist:", productlist);
  console.log("creativelist:", creativelist);

  const imageExists = async (url, callback) => {
    var img = new Image();
    img.onload = function () {
      callback(true);
    };
    img.onerror = function () {
      callback(false);
    };
    img.src = url;
  };

  let innovationdata = getMultipleRandom(innovationlist, 15).map(function (
    listValue,
    i
  ) {
    var url_image = "";
    if (listValue.innovation_image) {
      url_image = listValue.innovation_image;
    } else {
      url_image = no_img_innovation;
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
                (e.target.onerror = null), (e.target.src = no_img_innovation)
              )}
              alt="co_innovation_image"
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
            <h5>
              {listValue.co_researcher_pi_name
                ? listValue.co_researcher_pi_name
                : listValue.innovation_name}
            </h5>
            <p>
              รายละเอียด :{" "}
              {listValue.innovation_detail
                ? listValue.innovation_detail.replace(/<[^>]+>|&nbsp;/g, "")
                : "-"}
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

  let productdata = getMultipleRandom(productlist, 15).map(function (
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
            <h5>
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

  let creativedata = getMultipleRandom(creativelist, 15).map(function (
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
            <h5>
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
                  <Col sm={8} md={8} lg={9}>
                    {innovationlist.length > 0 ? (
                      <Splide
                        options={options_top}
                        aria-labelledby="autoplay-example-heading"
                      >
                        {innovationdata}
                      </Splide>
                    ) : null}
                  </Col>
                  <Col md={12}>
                    {innovationlist.length > 0 ? (
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
                              ผลิตภัณฑ์
                            </h1>
                          </Col>
                          <Col md={12}>
                            <h1
                              className="hit-the-floor"
                              style={{ color: "white", fontFamily: "Prompt" }}
                            >
                              Product
                            </h1>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                  <Col sm={8} md={8} lg={9}>
                    {productlist.length > 0 ? (
                      <Splide
                        options={options_top}
                        aria-labelledby="autoplay-example-heading"
                      >
                        {productdata}
                      </Splide>
                    ) : null}
                  </Col>
                  <Col md={12}>
                    {productlist.length > 0 ? (
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
                              สือสร้างสรรค์
                            </h1>
                          </Col>
                          <Col md={12}>
                            <h1
                              className="hit-the-floor"
                              style={{ color: "white", fontFamily: "Prompt" }}
                            >
                              Digital media
                            </h1>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                  <Col sm={8} md={8} lg={9}>
                    {creativelist.length > 0 ? (
                      <Splide
                        options={options_top}
                        aria-labelledby="autoplay-example-heading"
                      >
                        {creativedata}
                      </Splide>
                    ) : null}
                  </Col>
                  <Col md={12}>
                    {creativelist.length > 0 ? (
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

export default withRouter(SearchPageCoRe);
