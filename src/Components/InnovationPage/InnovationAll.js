import { Row, Col, Card } from "reactstrap";
import {
  Box,
  TextField,
  Button,
  Container,
  CircularProgress,
} from "@material-ui/core";
import React, { useState } from "react";

import "@splidejs/react-splide/dist/css/splide.min.css";

import { FcOnlineSupport, FcPhone, FcViewDetails } from "react-icons/fc";
import { FaSearch } from "react-icons/fa";
import { withRouter } from "react-router";
import axios from "axios";

import background_innovation from "../../images/bg_innovation.png";

import no_img_innovat from "../../images/no_img_innovation.png";
import no_img_product from "../../images/no_img_product.png";
import no_img_creative from "../../images/no_img_creative.png";

import { useTranslation } from "react-i18next";

import "../Css/innovation.scss";
// import $ from "jquery";

function InnovationAll(props) {
  const [innovationlist, setinnovationlist] = useState([]);
  const [innovationgroup1, setinnovationgroup1] = useState([]);
  const [message, setMessage] = useState("");
  const [innovation, setinnovation] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const { t } = useTranslation();

  const apiUrl = "https://kmapi.kims-rmuti.com";

  var url_all;
  var url_find;
  var url_group;
  var label_title;
  var label_search;
  var label_group;
  var no_img_innovation;

  const getParamsType = () => {
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    return params.get("type");
  };

  const type = getParamsType();
  if (type === "innovation") {
    url_all = `${apiUrl}/api/get/co_researcher_productionnovation/innovation/list?innovation_group_id=&title=`;
    url_find = `${apiUrl}/api/get/co_researcher_productionnovation/innovation/list`;
    url_group = `${apiUrl}/api/get/co_researcher_product_group/findinnovationgroup1`;
    label_title = "innovation.innovation";
    label_search = "innovation.label_innovation";
    label_group = "innovation.label_innovation_group";
    no_img_innovation = no_img_innovat;
  } else if (type === "product") {
    url_all = `${apiUrl}/api/get/co_researcher_productionnovation/product/list?title=`;
    url_find = `${apiUrl}/api/get/co_researcher_productionnovation/product/list`;
    url_group = `${apiUrl}/api/get/co_researcher_product_group`;
    label_title = "innovation.product";
    label_search = "innovation.label_product";
    label_group = "innovation.label_product_group";
    no_img_innovation = no_img_product;
  } else if (type === "creative") {
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

  const getinnovationGroup = () => {
    axios
      .get(url_group)
      .then((res) => {
        setinnovationgroup1(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRequestParams = (title, innovation_group) => {
    let params = {};
    if (innovation_group) {
      if (type === "innovation") {
        params["innovation_group_id"] = innovation_group;
      } else if (type === "product") {
        params["product_group_id"] = innovation_group;
      }
    }
    if (title != undefined) {
      params["title"] = title;
    }
    return params;
  };

  const retrieveinnovation = () => {
    setLoading(true);
    const params = getRequestParams(searchTitle, innovation);
    console.log("testParam", params);
    axios
      .get(url_find, { params })
      .then((res) => {
        console.log(res.data);
        setinnovationlist(res.data);
      })
      .finally(() => {
        setMessage("");
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setMessage(e.response.data.message);
      });
  };

  React.useEffect(() => {
    getinnovationlist();
    retrieveinnovation();
    getinnovationGroup();
  }, []);

  console.log("group:", innovationgroup1);

  const handleChangeInnovation = (event) => {
    setinnovation(event.target.value);
  };

  const onChangeTitle = (e) => {
    setSearchTitle(e.target.value);
  };

  console.log("innovationlist:", innovationlist);

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

  let innovationdata = innovationlist.map(function (listValue, i) {
    var url_image = "";
    if (listValue.innovation_image) {
      url_image = listValue.innovation_image;
    } else if (listValue.images.length > 0) {
      if (listValue.images[0].innovation_image_name) {
        url_image = listValue.images[0].innovation_image_name;
      }
    } else {
      url_image = no_img_innovation;
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
      <Col sm={4} md={4} lg={3} xl={3} xxl={2} key={i}>
        <div className="card card-bg-innovation card-innovation ">
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
              {t("innovation.price")}:{" "}
              {listValue.innovation_price ? listValue.innovation_price : 0}{" "}
              {t("innovation.baht")}
            </small>
          </div>
          <div className="descriptions">
            <h5 className="title-hover">
              {listValue.innovation_name
                ? listValue.innovation_name
                : listValue.innovation_name}
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
              {listValue.co_researcher_pi_amount
                ? listValue.co_researcher_pi_amount
                : listValue.innovation_amount}{" "}
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
      </Col>
    );
  });

  return (
    <div className="body-detail">
      <div style={{ padding: "15px", margin: "0px 20px 0px 20px" }}>
        <Card
          className="box-shadow-right"
          style={{ backgroundColor: "#f6a834", marginBottom: "2rem" }}
        >
          <Container style={{ paddingBottom: "15px" }}>
            <div>
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
                  <Row className="align-items-center justify-content-md-center">
                    <Col md="5" xs="12">
                      <TextField
                        id="standard-helperText"
                        label={t(label_title)}
                        defaultValue="Default Value"
                        helperText={t(label_search)}
                        InputProps={{ style: { fontFamily: "Prompt" } }}
                        InputLabelProps={{
                          style: { fontFamily: "Prompt" },
                        }}
                        FormHelperTextProps={{
                          style: { fontFamily: "Prompt" },
                        }}
                        variant="standard"
                        value={searchTitle}
                        onChange={onChangeTitle}
                      />
                    </Col>

                    <Col md="4" xs="12">
                      <TextField
                        id="outlined-select-currency-native"
                        select
                        label=" "
                        value={innovation}
                        InputLabelProps={{
                          style: { fontFamily: "Prompt" },
                        }}
                        FormHelperTextProps={{
                          style: { fontFamily: "Prompt" },
                        }}
                        onChange={handleChangeInnovation}
                        SelectProps={{
                          native: true,
                          style: { fontFamily: "Prompt" },
                        }}
                        helperText={t(label_group)}
                      >
                        <option value={""} style={{ fontFamily: "Prompt" }}>
                          แสดงทั้งหมด
                        </option>
                        {innovationgroup1.map((option, i) => {
                          if (type === "innovation") {
                            return (
                              <option
                                key={i}
                                value={option.innovation_group_id}
                                style={{ fontFamily: "Prompt" }}
                              >
                                {option.innovation_group_name}
                              </option>
                            );
                          } else if (type === "product") {
                            return (
                              <option
                                key={i}
                                value={option.co_researcher_pg_id}
                                style={{ fontFamily: "Prompt" }}
                              >
                                {option.co_researcher_pg_name}
                              </option>
                            );
                          }
                        })}
                      </TextField>
                    </Col>

                    <Col md="1" xs="12">
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={retrieveinnovation}
                        style={{
                          fontFamily: "Prompt",
                          width: "100%",
                          backgroundColor: "rgb(239, 125, 5)",
                        }}
                        disabled={loading}
                        type="submit"
                        startIcon={<FaSearch size={13} />}
                      >
                        {loading && <CircularProgress size={22} />}
                        {!loading && "ค้นหา"}
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Box>
            </div>
          </Container>
        </Card>
        <div
          style={{
            backgroundImage: `url(${background_innovation})`,
            backgroundSize: "cover",
            borderRadius: "20px",
            boxShadow: "2px 4px 8px 4px #e56f2d78",
          }}
        >
          <div className="bg-filter">
            {message ? (
              <p className="p-4" style={{ fontFamily: "Prompt" }}>
                ไม่พบข้อมูล
              </p>
            ) : (
              <div className="cards">
                <Row style={{ width: "100%" }}>{innovationdata}</Row>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(InnovationAll);
