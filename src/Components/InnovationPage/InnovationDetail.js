import { Row, Col, Button } from "reactstrap";
import React, { useState } from "react";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/dist/css/splide.min.css";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

// import "./Css/Search.scss";
// import "../index.css";
import { FcOnlineSupport, FcPhone, FcViewDetails } from "react-icons/fc";

import { withRouter } from "react-router";
import axios from "axios";

import { useTranslation } from "react-i18next";

import background_innovation from "../../images/bg_innovation.png";

import no_img_innovat from "../../images/no_img_innovation.png";
import no_img_product from "../../images/no_img_product.png";
import no_img_creative from "../../images/no_img_creative.png";

import "../Css/innovation.scss";
import { data } from "jquery";
// import $ from "jquery";

function InnovationDetail(props) {
  const [innovationlist, setinnovationlist] = useState([]);
  const [innovation, setinnovation] = useState({});
  const [innovation_image, setinnovation_image] = useState([]);
  const [innovation_video, setinnovation_video] = useState("");
  const { t } = useTranslation();
  const apiUrl = "https://kmapi.kims-rmuti.com";

  //https://kmapi.kims-rmuti.com/api/get/co_researcher_productionnovation/innovation/list?innovation_group_id=&title=&innovation_id=&typetable=

  const getParamsId = () => {
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    return params.get("innovationid");
  };

  const getParamsType = () => {
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    return params.get("type");
  };

  const getParamsTypeTable = () => {
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    return params.get("typetable");
  };

  const innovation_id = getParamsId();
  const type = getParamsType();
  const typetable = getParamsTypeTable();

  console.log(innovation_id, ":", type, ": ", typetable);

  var url_all;
  var url_find;
  var title_more;
  var no_img_innovation;

  if (type === "innovation") {
    url_all = `${apiUrl}/api/get/co_researcher_productionnovation/innovation/list?innovation_group_id=&title=`;
    url_find = `${apiUrl}/api/get/co_researcher_productionnovation/innovation/list?innovation_group_id=&title=&innovation_id=${innovation_id}&typetable=${typetable}`;
    title_more = "innovation.title_more_innovation";
    no_img_innovation = no_img_innovat;
  } else if (type === "product") {
    url_all = `${apiUrl}/api/get/co_researcher_productionnovation/product/list?title=`;
    url_find = `https://kmapi.kims-rmuti.com/api/get/co_researcher_productionnovation/product/list?product_group_id=&title=&innovation_id=${innovation_id}`;
    title_more = "innovation.title_more_product";
    no_img_innovation = no_img_product;
  }
  const getinnovationlist = () => {
    axios
      .get(url_all)
      .then((res) => {
        setinnovationlist(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getinnovation = () => {
    axios
      .get(url_find)
      .then((res) => {
        setinnovation(res.data[0]);
        setinnovation_image(res.data[0].images);
        setinnovation_video(res.data[0].innovation_vdo);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    getinnovationlist();
    getinnovation();
    // getParamsId();
    // getParamsType();
    // getParamsTypeTable();
  }, []);

  console.log(innovationlist);
  console.log(innovation);

  // console.log(innovationlist[0].innovation_vdo);
  let innovationdata = innovationlist.map(function (listValue, i) {
    var url_image = "";
    if (listValue.innovation_image) {
      url_image = listValue.innovation_image;
    } else if (listValue.images.length > 0) {
      if (listValue.images[0].innovation_image_name) {
        url_image = listValue.images[0].innovation_image_name;
      }
    } else {
      url_image = no_img_product;
    }

    var url_detail;

    if (type === "innovation") {
      url_detail = `/monitoring/InnovationDetail?type=innovation&innovationid=${listValue.innovation_id}&typetable=${listValue.type}`;
    } else if (type === "product") {
      url_detail = `/monitoring/InnovationDetail?type=product&innovationid=${listValue.innovation_id}&typetable=`;
    } else if (type === "creative") {
      url_detail = `/monitoring/InnovationDetail?type=creative&innovationid=${listValue.innovation_id}&typetable=`;
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
              {listValue.innovation_name ? listValue.innovation_name : "-"}
            </h2>
            <small className="innovation">
              {t("innovation.price")}:{" "}
              {listValue.innovation_price ? listValue.innovation_price : 0}{" "}
              {t("innovation.baht")}
            </small>
          </div>
          <div className="descriptions">
            <h5 className="title-hover">
              {listValue.innovation_name ? listValue.innovation_name : "-"}
            </h5>
            <p>
              <FcViewDetails size={15} /> :{" "}
              {listValue.innovation_detail
                ? listValue.innovation_detail.replace(
                    /<[^>]+>|&nbsp;|&quot;/g,
                    ""
                  )
                : "-"}
            </p>
            <p>
              {t("innovation.productionamount")} :{" "}
              {listValue.innovation_amount ? listValue.innovation_amount : "-"}{" "}
              {t("innovation.item")}
            </p>
            <p>
              <FcOnlineSupport size={15} /> :{" "}
              {listValue.co_researcher_pi_coordinator
                ? listValue.co_researcher_pi_coordinator
                : "-"}
            </p>
            <p>
              <FcPhone size={15} /> :{" "}
              {listValue.co_researcher_pi_phone
                ? listValue.co_researcher_pi_phone
                : "-"}
            </p>
            <a href={url_detail} className="btn-innovation">
              {t("innovation.seemore")}
            </a>
          </div>
        </div>
      </SplideSlide>
    );
  });

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

  const images = [];

  if (innovation.innovation_image) {
    images.push({
      original: innovation.innovation_image,
      thumbnail: innovation.innovation_image,
    });
  }

  innovation_image.forEach(function (data) {
    if (data.innovation_image_name) {
      images.push({
        original: data.innovation_image_name,
        thumbnail: data.innovation_image_name,
      });
    }
  });

  return (
    <div className="body-detail">
      <div style={{ padding: "15px", margin: "10px 20px 0px 20px" }}>
        <div
          style={{
            backgroundImage: `url(${background_innovation})`,
            backgroundSize: "cover",
            borderRadius: "20px",

            boxShadow: "2px 4px 8px 4px #e56f2d78",
          }}
        >
          <div className="bg-filter">
            <Row>
              <Col sm={12}>
                <div className="bg-title" style={{ padding: "10px 25px" }}>
                  <h3
                    className="hit-the-floor"
                    style={{ color: "white", fontFamily: "Prompt" }}
                  >
                    {innovation.innovation_name}
                  </h3>
                </div>
              </Col>
              <Col sm={12} md={6} style={{ padding: "15px 10px 10px 30px" }}>
                <div
                  className="bg-title"
                  style={{
                    width: "100%",
                    height: "100%",
                    padding: "20px 25px",
                    textAlign: "left",
                  }}
                >
                  <ImageGallery showThumbnails={true} items={images} />
                </div>
              </Col>
              <Col sm={12} md={6}>
                <div
                  className="bg-title"
                  style={{
                    width: "97%",
                    height: "95%",
                    marginTop: "1rem",
                    textAlign: "left",
                    color: "#fff",
                  }}
                >
                  <h4>วิดีโอ</h4>
                  {innovation_video ? (
                    <iframe
                      style={{ width: "100%", height: "90%" }}
                      src={innovation_video.replace("watch?v=", "embed/")}
                      title="YouTube video player"
                      frameBorder={0}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="title-center">
                      <div className="bg-title">
                        <Row>
                          <Col md={12}>
                            <h3
                              className="hit-the-floor"
                              style={{ color: "white", fontFamily: "Prompt" }}
                            >
                              ไม่มีวิดีโอ
                              {/* นวัตกรรม */}
                            </h3>
                          </Col>
                          {/* <Col md={12}>
                            <h1
                              className="hit-the-floor"
                              style={{ color: "white", fontFamily: "Prompt" }}
                            >
                              Innovation
                            </h1>
                          </Col> */}
                        </Row>
                      </div>
                    </div>
                  )}
                </div>
              </Col>
              <Col sm={12}>
                <div
                  className="bg-title"
                  style={{
                    width: "100%",
                    height: "95%",
                    marginTop: "1rem",
                    textAlign: "left",
                    color: "#fff",
                  }}
                >
                  <h6>
                    รายละเอียด :{" "}
                    {innovation.innovation_detail
                      ? innovation.innovation_detail.replace(
                          /<[^>]+>|&nbsp;|&quot;/g,
                          ""
                        )
                      : "-"}
                  </h6>
                  <h6>
                    ลิงค์ที่เกี่ยวข้อง :
                    {innovation.innovation_link ? (
                      <Button
                        href={innovation.innovation_link}
                        target="_blank"
                        style={{
                          fontSize: "smaller",
                          backgroundColor: "rgb(234 93 11)",
                        }}
                      >
                        {innovation.innovation_link
                          ? innovation.innovation_link.slice(8, 35)
                          : " -"}
                      </Button>
                    ) : (
                      " -"
                    )}
                  </h6>
                  <h6>
                    เลขที่สิทธิบัตร :
                    {innovation.patent_number ? innovation.patent_number : " -"}
                  </h6>
                  <h6>
                    จำนวนการผลิต :
                    {innovation.innovation_amount
                      ? innovation.innovation_amount + "  ชิ้น"
                      : " -"}
                  </h6>
                  <h6>
                    ราคา :
                    {innovation.innovation_price
                      ? innovation.innovation_price + " บาท"
                      : " -"}
                  </h6>
                  <h6>
                    ผู้ประสานงาน :
                    {innovation.co_researcher_pi_coordinator
                      ? innovation.co_researcher_pi_coordinator
                      : " -"}
                  </h6>
                  <h6>
                    โทรศัพท์ :
                    {innovation.co_researcher_pi_phone
                      ? innovation.co_researcher_pi_phone
                      : " -"}
                  </h6>
                  <h6>
                    Facebook :
                    {innovation.co_researcher_pi_facebook ? (
                      <Button
                        href={innovation.co_researcher_pi_facebook}
                        target="_blank"
                        style={{
                          fontSize: "smaller",
                          backgroundColor: "rgb(234 93 11)",
                        }}
                      >
                        {innovation.co_researcher_pi_facebook
                          ? innovation.co_researcher_pi_facebook.slice(8, 35)
                          : " -"}
                      </Button>
                    ) : (
                      " -"
                    )}
                  </h6>

                  <h6>
                    Line :
                    {innovation.co_researcher_pi_line
                      ? innovation.co_researcher_pi_line
                      : "-"}
                  </h6>
                  <h6>
                    Email :
                    {innovation.co_researcher_pi_mail
                      ? innovation.co_researcher_pi_mail
                      : "-"}
                  </h6>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        <div
          style={{
            backgroundImage: `url(${background_innovation})`,
            backgroundSize: "cover",
            borderRadius: "20px",
            boxShadow: "2px 4px 8px 4px #e56f2d78",
            marginTop: "2rem",
          }}
        >
          <div className="bg-filter" style={{ paddingRight: "2rem" }}>
            <Row>
              <Col sm={12}>
                <div
                  className="bg-title"
                  style={{ width: "300px", padding: "10px 25px" }}
                >
                  <h3
                    className="hit-the-floor"
                    style={{ color: "white", fontFamily: "Prompt" }}
                  >
                    {t(title_more)}
                    {/* นวัตกรรม */}
                  </h3>
                </div>
              </Col>
              <Col md={12} style={{ textAlign: "right" }}>
                <a
                  class="custom-btn btn-14"
                  style={{
                    color: "white",
                    fontFamily: "Prompt",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                  href={`/monitoring/InnovationAll?type=${type}`}
                >
                  <span style={{ fontSize: "18px" }}>
                    {t("innovation.viewall")}
                  </span>
                </a>
              </Col>
              <Col sm={12} style={{ marginRight: "1rem" }}>
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
      </div>
    </div>
  );
}
export default withRouter(InnovationDetail);
