import "leaflet/dist/leaflet.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import Researcher from "./Researcher";
import CoResearcher from "./Components/CoResearcher";
import Leftbar from "./Components/Leftbar";
// import Testbar from "./Components/Testbar";
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

// import Testbar from "./Components/Testbar";

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
    <div>
      <Leftbar />
      {/* <Testbar /> */}
      <Switch>
        <Route exact path="/">
          <SearchMap />
        </Route>

        <Route path="/Researcher">
          <Researcher />
        </Route>

        <Route path="/ProjectDetailConcep/knowledege">
          <knowledgePage />
        </Route>

        <Route path="/CoResearcher">
          <CoResearcher />
        </Route>

        <Route path="/ProjectDetailConcep">
          <ProjcetDetailConcept />
        </Route>

        <Route path="/ProjectDetail">
          <ProjectDetail />
        </Route>

        <Route path="/SearchProject">
          <SearchPageProject locationSearch={locationSearch} />
        </Route>

        <Route path="/SearchProjectService">
          <SearchPageProjectSevice />
        </Route>

        <Route path="/SearchResearcher">
          <SearchPageResearch locationSearch={locationSearch} />
        </Route>

        <Route path="/SearchPageCo">
          <SearchPageCoRe locationCo={locationCo} />
        </Route>

        <Route path="/Innovation">
          <Innovation />
        </Route>

        <Route path="/Innovat">
          <Innovat />
        </Route>

        <Route path="/Product">
          <Product />
        </Route>

        <Route path="/Creative">
          <Creative />
        </Route>

        <Route path="/Patent">
          <Patent />
        </Route>

        <Route path="/Research">
          <Research />
        </Route>

        <Route path="/CoRe">
          <CoRe />
        </Route>

        <Route path="/Chumchon">
          <Chumchon />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
