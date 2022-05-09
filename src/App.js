import "leaflet/dist/leaflet.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import Researcher from "./Researcher";
import CoResearcher from "./Components/CoResearcher";
import Leftbar from "./Components/Leftbar";
import Footer from "./Components/Footer";
import { Col } from "reactstrap";
import ProjectDetail from "./ProjcetDetail";
import MapD3 from "./Components/MapD3";
import ProjcetDetailConcept from "./ProjcetDetailConcept";
import SearchPageProject from "./Components/SearchPageProject";
import SearchPageCoRe from "./Components/SearchPageCoRe";
import SearchPageResearch from "./Components/SearchPageResearch";
import SearchPageProjectSevice from "./Components/SearchPageProjectSevice";
import SearchMap from "./Components/SearchMap";
import Innovation from "./Components/Innovation.js";
import { ListView } from "./Components";
import Patent from "./Components/Patent.js";
import Innovat from "./Components/InnovationPage/Innovat";
import Product from "./Components/InnovationPage/Product";
import Creative from "./Components/InnovationPage/Creative";
import Research from "./Components/PatentPage/Research";
import CoRe from "./Components/PatentPage/CoRe";
import Chumchon from "./Components/PatentPage/Chumchon";
import i18n from "./i18n";

import token from "./config/token.json";
import knowledgePage from "./Components/ConceptPage/Knowledge";

const apiUrl = "https://kmapi.kims-rmuti.com";
const localUrl = "http://localhost:4000";

const baseRouteUrl = "/:locale(th|en)?";
export const baseUrl = i18n.language === "en" ? "" : "/" + i18n.language;

function App(props) {
  const [locationCo, Setdatamap] = useState([]);
  const [locationSearch, SetdataMapSe] = useState([]);

  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    console.log(res.data);
    postip(res.data);
  };

  const postip = async (params) => {
    const res = await axios.post(`${apiUrl}/api/post/create_visitors`, params, {
      headers: {
        "content-type": "application/json",
        "x-access-token": token.accesstoken,
      },
    });
    console.log(res);
  };

  
  useEffect(() => {
    getData();
    // const params = new URLSearchParams(document.location.search);
    // const ns = params.get("language");

    localStorage.getItem("language") === "th"
      ? i18n.changeLanguage("th")
      : i18n.changeLanguage("en");

    // const url = new URL(document.location.href);
    // url.searchParams.append("language", "th");

    // document.location = url.href;

    // axios.get(`${apiUrl}/api/get/co-researcher`).then((locationCo) => {
    //   Setdatamap(locationCo.data);
    // });

    // axios.get(`${apiUrl}/api/get/us-project`).then((loc) => {
    //   // console.log(loc.data);
    //   SetdataMapSe(loc.data);
    // });
  }, []);

  return (
    <div className="">
      <Switch>
        <Route exact path="/">
          <Col xs="auto">
              <Leftbar />
          </Col>
          <Col xs="0">
            <SearchMap />
            {/* <Footer /> */}
          </Col>
        </Route>

        <Route path="/Researcher">
          <Researcher />
          <Footer />
        </Route>

        {/* <Route path="/ProjectDetailConcep/knowledege">
          <knowledgePage />
        </Route> */}

        <Route path="/CoResearcher">
          <Col xs="auto">
            <Leftbar />
          </Col>
          <Col xs="0">
            <CoResearcher />
            <Footer />
          </Col>
        </Route>

        <Route path="/ProjectDetailConcep">
          <Col xs="auto">
            <Leftbar />
          </Col>
          <Col xs="0">
            <ProjcetDetailConcept />
            <Footer />
          </Col>
        </Route>

        <Route path="/ProjectDetail">
          <Col xs="auto">
            <Leftbar />
          </Col>
          <Col xs="0">
            <ProjectDetail />
            <Footer />
          </Col>
        </Route>

        <Route path="/SearchProject">
          <Col xs="auto">
            <Leftbar />
          </Col>
          <Col xs="0">
            <SearchPageProject locationSearch={locationSearch} />
            <Footer />
          </Col>
        </Route>

        <Route path="/SearchProjectService">
          <Col xs="auto">
            <Leftbar />
          </Col>
          <Col xs="0">
            <SearchPageProjectSevice />
            <Footer />
          </Col>
        </Route>

        <Route path="/SearchResearcher">
          <Col xs="auto">
            <Leftbar />
          </Col>
          <Col xs="0">
            <SearchPageResearch locationSearch={locationSearch} />
            <Footer />
          </Col>
        </Route>

        <Route path="/SearchPageCo">
          <Col xs="auto">
            <Leftbar />
          </Col>
          <Col xs="0">
            <SearchPageCoRe locationCo={locationCo} />
            <Footer />
          </Col>
        </Route>

        <Route path="/Innovation">
          <Col xs="auto">
            <Leftbar />
          </Col>
          <Col xs="0">
            <Innovation />
            <Footer />
          </Col>
        </Route>

        <Route path="/Innovat">
          <Col xs="auto">
            <Leftbar />
          </Col>
          <Col xs="0">
            <Innovat />
            <Footer />
          </Col>
        </Route>

        <Route path="/Product">
          <Col xs="auto">
            <Leftbar />
          </Col>
          <Col xs="0">
            <Product />
            <Footer />
          </Col>
        </Route>

        <Route path="/Creative">
          <Col xs="auto">
            <Leftbar />
          </Col>
          <Col xs="0">
            <Creative />
            <Footer />
          </Col>
        </Route>

        <Route path="/Patent">
          <Col xs="auto">
            <Leftbar />
          </Col>
          <Col xs="0">
            <Patent />
            <Footer />
          </Col>
        </Route>

        <Route path="/Research">
          <Col xs="auto">
            <Leftbar />
          </Col>
          <Col xs="0">
            <Research />
            <Footer />
          </Col>
        </Route>

        <Route path="/CoRe">
          <Col xs="auto">
            <Leftbar />
          </Col>
          <Col xs="0">
            <CoRe />
            <Footer />
          </Col>
        </Route>

        <Route path="/Chumchon">
          <Col xs="auto">
            <Leftbar />
          </Col>
          <Col xs="0">
            <Chumchon />
            <Footer />
          </Col>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
