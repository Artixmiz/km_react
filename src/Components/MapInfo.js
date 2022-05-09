import React, { Component } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { Row, Col } from "reactstrap";

class MapInfo extends Component {
  helpDiv;
  imgDiv;

  // imgDi() {
  //   return (

  //   );
  // }

  createLeafletElement() {
    const MapHelp = L.Control.extend({
      onAdd: (map) => {
      

        let helpDiv = L.DomUtil.create("div", " my-control");
        this.helpDiv = helpDiv;
        helpDiv.innerHTML = ReactDOMServer.renderToString(
          <div style={{ fontFamily: "Prompt" }}>
            <div class="wrap-collabsible">
              <input
                id="collapsible"
                class="toggle"
                type="checkbox"
                style={{ display: "none" }}
              />
              <label
                for="collapsible"
                class="lbl-toggle"
                style={{ fontFamily: "Prompt" }}
              >
                รายละเอียดความสัมพันธ์
              </label>
              <div class="collapsible-content">
                <div class="content-inner">
                  <Row className="justify-content-md-center align-items-center ">
                    <Col>
                      <div>
                        <img
                          className="rounded-circle"
                          width={27}
                          height={27}
                          src="https://researcher.kims-rmuti.com/icon/วิจัย.png"
                        ></img>
                      </div>
                    </Col>
                    <Col  style={{ fontFamily: "Prompt" }}>งานวิจัย</Col>
                  </Row>
                  <Row className="justify-content-md-center align-items-center mt-1">
                    <Col>
                      <div>
                        <img
                          className="rounded-circle"
                          width={27}
                          height={27}
                          src="https://researcher.kims-rmuti.com/icon/บริการ.png"
                        ></img>
                      </div>
                    </Col>
                    <Col  style={{ fontFamily: "Prompt" }}>งานบริการวิชาการ</Col>
                  </Row>
                  <Row className="justify-content-md-center align-items-center mt-1">
                    <Col>
                      <div>
                        <img
                          className="rounded-circle"
                          width={27}
                          height={27}
                          src="https://researcher.kims-rmuti.com/icon/u2t.jpg"
                        ></img>
                      </div>
                    </Col>
                    <Col  style={{ fontFamily: "Prompt" }}>งานบริการวิชาการ (U2T)</Col>
                  </Row>
                  {/* <Row className="justify-content-md-center align-items-center mt-1">
                    <Col>
                      <div>
                        <img
                          className="rounded-circle"
                          width={27}
                          height={27}
                          src="https://www.km-innovations.rmuti.ac.th/researcher/icon/student.png"
                        ></img>
                      </div>
                    </Col>
                    <Col>นักวิจัยร่วม</Col>
                  </Row> */}
                  {/* <Row className="justify-content-md-center align-items-center mt-1">
                    <Col>
                      <div>
                        <img
                          onClick={() => console.log("test")}
                          style={{ cursor: "pointer" }}
                          className="rounded-circle"
                          width={27}
                          height={27}
                          src="https://www.km-innovations.rmuti.ac.th/researcher/icon/researcher.png"
                        ></img>
                      </div>
                    </Col>
                    <Col>นักวิจัย</Col>
                  </Row> */}
                  {/* <Row className="justify-content-md-center align-items-center mt-1">
                    <Col>
                      <div
                        style={{
                          background: "rgb(65, 215, 55)",
                          padding: "2px",
                        }}
                      ></div>
                    </Col>
                    <Col>เครือข่ายความร่วมมือ</Col>
                  </Row> */}
                  <Row className="justify-content-md-center align-items-center mt-2">
                    <Col>
                      <div
                        style={{
                          background: `#ff1100 `,
                          padding: "2px",
                        }}
                      ></div>
                    </Col>
                    <Col>เครือข่ายงานวิจัย</Col>
                  </Row>
                  <Row className="justify-content-md-center align-items-center mt-2">
                    <Col>
                      <div
                        style={{
                          background: "#c900f1",
                          padding: "2px",
                        }}
                      ></div>
                    </Col>
                    <Col>เครือข่ายนักวิจัย</Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        );

        // addEventListener("click", () => {
        //   console.log("test");
        // });

        return helpDiv;
      },
    });
    return new MapHelp({ position: "topright" });
  }

  componentDidMount() {
    const { map } = this.props;
    const control = this.createLeafletElement();
    control.addTo(map);
  }

  componentWillUnmount() {
    this.helpDiv.remove();
  }

  render() {
    return null;
  }
}

function withMap(Component) {
  return function WrappedComponent(props) {
    const map = useMap();
    return <Component {...props} map={map} />;
  };
}

export default withMap(MapInfo);
