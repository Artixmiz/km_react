/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { MapContainer, TileLayer, useMap, ZoomControl } from "react-leaflet";
import React from "react";
import L from "leaflet";
import * as d3 from "d3";
import "../Css/d3.css";

export default function D3Layer(props) {
  const map = useMap();
  let radius = 13;

  React.useEffect(async () => {
    const { location } = props;
    console.log("prop", await location);

    let data = await location;

    const svgLayer = L.svg({ clickable: true });
    svgLayer.addTo(map);

    let researherList = [],
      projectList = [],
      projectService = [],
      community = [],
      company = [],
      goverment = [];

    data.nodes.forEach((d) => {
      if (d.label == "นักวิจัย") researherList.push(d.id);
      if (d.label == "งานวิจัย") projectList.push(d.id);
      if (d.label == "งานบริการวิชาการ") projectService.push(d.id);
      if (d.label == "ชุมชน") community.push(d.id);
      if (d.label == "หน่วยงานภาคธุรกิจ") company.push(d.id);
      if (d.label == "หน่วยงานภาครัฐ") goverment.push(d.id);
      d.latLong = new L.LatLng(d.lat, d.lon);
      d.layerPoint = map.latLngToLayerPoint(d.latLong);
      d.radius = radius;
    });

    data.links.forEach((d) => {
      d.source = d.from;
      d.target = d.to;
      d.isResearcherToResearcher =
        researherList.includes(d.target) && researherList.includes(d.source);
      d.isProjectToProject =
        projectList.includes(d.target) && projectList.includes(d.source);
      d.isCommunityToCommunity =
        community.includes(d.target) && community.includes(d.source);
      d.isCompanyToCompany =
        company.includes(d.target) && company.includes(d.source);
      d.isGovermentToGoverment =
        goverment.includes(d.target) && goverment.includes(d.source);
      d.isProjectSerToProjectSer =
        projectService.includes(d.target) && projectService.includes(d.source);
      d.stroke = d.isResearcherToResearcher
        ? "rgb(255, 115, 0)"
        : // : d.isProjectToProject
          // ? "lime"
          // : d.isProjectSerToProjectSer
          // ? "rgb(0, 132, 255)"
          // : d.isCommunityToCommunity
          // ? "rgb(0, 38, 255)"
          // : d.isCompanyToCompany
          // ? "rgb(212, 0, 255)"
          // : d.isGovermentToGoverment
          // ? "rgb(255, 0, 170)"
          "#ff1100 ";
    });

    // set d3 to use svg layer in leaflet and config it to enable interaction with svg element.
    const svg = d3
      .select(map.getPanes().overlayPane)
      .select("svg")
      .attr("pointer-events", "auto");

    const g = svg.select("g").attr("class", "leaflet-zoom-hide");
    const defs = svg.append("svg:defs");

    let tooltipEl = function (d) {
      const project_url =
        "/monitoring/ProjectDetail?project_id=" + btoa(d.project_id);
      const concep_url =
        "/monitoring/ProjectDetailConcep?concep_id=" +
        btoa(d.concept_proposal_id);
      const co_url =
        "/monitoring/CoResearcher?co_researcher_id=" + btoa(d.co_id);
      const user_url =
        "/monitoring/Researcher?user_idcard=" + btoa(d.user_idcard);

      if (d.co_researcher_name_th) {
        // console.log(d.co_researcher_name_th);
        return `
                  <div class="tip__container">  
                    <div class="val"><h6> ${d.label}</h6></div>
                    <div class="close">
                      <button>&times</button>
                    </div>
                    <hr/>
                    <div class="val">${d.co_researcher_name_th} </div>
                    <hr/>
                    <a href="${co_url}" class="btn">รายละเอียดเพิ่มเติม</a>
                    
                  </div>`;
      }

      if (d.position) {
        return `
        <div class="tip__container">  
          <div class="val"><h6>${d.position}</h6></div>
          <div class="close">
            <button>&times</button>
          </div>
          <hr/>
          <div class="val">${d.fullname} </div>
          <hr/>
          <a href="${user_url}" class="btn">รายละเอียดเพิ่มเติม</a>         
        </div>`;
      }

      if (d.project_id)
        return `
                <div class="tip__container">  
                  <div class="val"><h6>${d.label}</h6></div>
                  <div class="close">
                    <button>&times</button>
                  </div>
                  <hr/>
                  <div class="val">${d.project_name} </div>                 
                  <hr/>
                  <a href="${project_url}" class="btn">รายละเอียดเพิ่มเติม</a> 
                </div>`;

      if (d.concept_proposal_id)
        return `
                        <div class="tip__container">  
                          <div class="val"><h6>${d.label}</h6></div>
                          <div class="close">
                            <button>&times</button>
                          </div>
                          <hr/>
                          <div class="val">${
                            d.project_name
                              ? d.project_name
                              : d.concept_proposal_name_th
                          } </div>
                          <div>พื้นที่วิจัย: <strong>${
                            d.concept_proposal_name
                              ? d.concept_proposal_name
                              : d.project_area
                          }</strong></div>                 
                          <hr/>
                          <a href="${concep_url}" class="btn">รายละเอียดเพิ่มเติม</a> 
                        </div>`;

      // if (d.co_id || d.project_name)
      //   return `
      //           <div class="tip__container">
      //             <div class="val"><h6> ${d.label}</h6></div>
      //             <div class="close">
      //               <button>&times</button>
      //             </div>
      //             <hr/>
      //             <div class="val">${
      //               d.project_name ? d.project_name : d.co_researcher_name_th
      //             } </div>
      //             <hr/>
      //             <a href="${co_url}" class="btn">รายละเอียดเพิ่มเติม</a>

      //           </div>`;

      if (d.group_name) {
        // console.log(d.group_name);
        return `
                                     <div class="tip__container">  
                                       <div class="val"><h6>${d.group_name}</h6></div>
                                       <div class="close">
                                         <button>&times</button>
                                       </div>
                                       <hr/>
                                       <div class="val">
                                      <img
                                        style={
                                          object-fit: cover,
                                          object-position: center top,
                                        }
                                        class=" img-ps"
                                        width="90px"
                                        height="90px"
                                        src="${d.img}"/>
                                        </div>
                                        <div class="val"><p class="blocktext">${d.fullname}</p></div>
                                        <hr/>
                                       <a href="${user_url}" class="btn">รายละเอียดเพิ่มเติม</a>         
                                     </div>`;
      }

      if (d.user_idcard || d.coresearcher_id)
        return `
                <div class="tip__container">  
                  <div class="val"><h6>${d.label}</h6></div>
                  <div class="close">
                    <button>&times</button>
                  </div>
                  <hr/>
                  <div class="val">${d.fullname} </div>
                  <hr/>
                  <a href="${user_url}" class="btn">รายละเอียดเพิ่มเติม</a>         
                </div>`;

      return `
                <div class="tip__container">  
                 <div>${d.label}</div>
              </div>`;
    };
    // Tool Tip
    const div = d3
      .select(map.getPanes().overlayPane)
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("margin-top", "-80px")
      .style("margin-left", "50px");
    const links = g
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke", (d) => d.stroke)
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 4);

    const nodes = g
      .selectAll("circle")
      .data(data.nodes)
      .join("circle")
      .attr("id", (d) => `node-${d.id}`)
      .attr("r", radius)
      .attr("stroke", "orange")
      .attr("stroke-width", 1)
      .attr("fill", "#555")
      .attr("fill", (d) => {
        let imgSize = d.radius * 2;
        defs
          .append("svg:pattern")
          .attr("id", `node-img-id${d.id}`)
          .attr("width", imgSize)
          .attr("height", imgSize)
          .append("svg:image")
          .attr("xlink:href", d.img)
          .attr("width", imgSize)
          .attr("height", imgSize)
          .attr("x", 1)
          .attr("y", 1);
        return `url(#node-img-id${d.id})`;
      });

    nodes.on("mouseover", function (event, d) {
      // console.log(d);
      d3.select(this)
        .transition()
        .duration("150")
        // .attr("stroke", "blue")
        .attr("r", radius * 1.5);

      label
        .filter((n) => d.id === n.id)
        // neighbours[d.id].indexOf(n.id) == 0)
        // we can't use display:none with labels because we need to load them in the DOM in order to calculate the background rectangle dimensions with the getBBox function.
        // So we used visibility:hidden instead.
        .style("opacity", 1)
        .style("visibility", "visible");
    });

    // nodes.on("mousemove", (event) => {
    //   const [x, y] = d3.pointer(event);
    //   div.style("top", y - 10 + "px").style("left", x + 10 + "px");
    // });

    nodes.on("mouseout", function () {
      d3.select(this)
        .transition()
        .duration("150")
        // .attr("stroke", "red")
        .attr("r", radius);

      label
        .style("opacity", 0)
        .style("visibility", "hidden")
        .style("translate3d", "(25732.5px, 14881px, 0px) scale(64)");
    });

    const neighbours = {};

    data.nodes.forEach((node) => {
      neighbours[node.id] = neighbours[node.id] || [];
    });
    // console.log(neighbours);
    data.links.forEach((link) => {
      neighbours[link.source].push(link.source);
      neighbours[link.source].push(link.target);
      neighbours[link.target].push(link.target);
      neighbours[link.target].push(link.source);
    });

    function deHighlight() {
      nodes.style("opacity", 1);
      links.style("opacity", 1);
      // label.style("opacity", 0).style("visibility", "hidden");
      links.attr("stroke", (d) => d.stroke);
      // {
      //   return `node-${d.source.id}` == d.id || `node-${d.target.id}` == d.id
      //     ? "red"
      //     : "lime";
      // };
    }

    function highlightNeighbours(d) {
      deHighlight();

      nodes.style("opacity", (n) => {
        return neighbours[d.id].indexOf(n.id) != -1 ? 1 : 0.2;
      });

      links.style("opacity", (n) => {
        return d.id == n.source.id || d.id == n.target.id ? 1 : 0.2;
      });

      // label
      //   .filter((n) => neighbours[d.id].indexOf(n.id) != -1)
      //   // we can't use display:none with labels because we need to load them in the DOM in order to calculate the background rectangle dimensions with the getBBox function.
      //   // So we used visibility:hidden instead.
      //   .style("opacity", 1)
      //   .style("visibility", "visible");
    }

    nodes
      .on("click", function (event, d) {
        const [x, y] = d3.pointer(event);

        div.html(tooltipEl(d));

        div.select("button").on("click", function () {
          div.style("opacity", 0);
          div.style("visibility", "hidden");
          // deHighlight();
        });

        div
          .transition()
          .duration(200)
          .style("display", "block")
          .style("visibility", "visible")
          .style("opacity", 1);

        div.style("top", y + 30 + "px").style("left", x - 30 + "px");

        // connectedNodes(d);
        highlightNeighbours(d);

        links.attr("stroke", (d) => {
          // console.log(d.source.id);
          return `node-${d.source.id}` == this.id ||
            `node-${d.target.id}` == this.id
            ? "red"
            : "lime";
        });
      })
      .on("dblclick", () => {
        deHighlight();
      });

    map.on("click", function (e) {
      div.style("opacity", 0);
      div.style("visibility", "hidden");
    });

    const label = g
      .selectAll(".mytext")
      .data(data.nodes)
      .enter()
      .append("text")
      .text(function (d) {
        return `${d.label}`;
      })
      .attr("class", "label");

    const drawAndUpdate = () => {
      links
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      label
        .attr("x", function (d) {
          return d.x;
        })
        .attr("y", function (d) {
          return d.y + 29;
        });

      nodes
        .each((d) => {
          d.layerPoint = map.latLngToLayerPoint(d.latLong);
          // fix parent node position by set fx and fy, unfix by set it to null
          if (d.type === "parent") {
            d.fx = d.layerPoint.x;
            d.fy = d.layerPoint.y;
          }
        })
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y);

      // simulation.force('x').initialize(nodes.data())
      // simulation.force('y').initialize(nodes.data())
      // simulation.alpha(1).restart();
    };

    // because child link follow parent link we must separate them.
    const simulation = d3
      .forceSimulation(data.nodes)
      .force(
        "link",
        d3
          .forceLink()
          .links(data.links.filter((d) => d.isResearcherToResearcher))
          .id((d) => d.id)
      )
      .force(
        "link",
        d3
          .forceLink()
          .links(data.links.filter((d) => !d.isResearcherToResearcher))
          .id((d) => d.id)
      )
      // .force('link', d3.forceLink().links(data.links).id(d => d.id))
      // .force('link', d3.forceLink().links(data.links).id(d => d.id).distance(50))
      // .force('charge', d3.forceManyBody())
      .force("charge", d3.forceManyBody().strength(-200))
      .force(
        "collision",
        d3.forceCollide().radius((d) => d.radius * 1.5)
      )
      .force(
        "x",
        d3.forceX().x((d) => d.layerPoint.x)
      )
      .force(
        "y",
        d3.forceY().y((d) => d.layerPoint.y)
      )
      // .force('x', d3.forceX().x(d => d.layerPoint.x).strength(0.06))
      // .force('y', d3.forceY().y(d => d.layerPoint.y).strength(0.04))
      .on("tick", () => {
        drawAndUpdate();
      });

    map.on("zoomstart", () => {
      nodes.each((d) => {
        d.prevLatLong = map.layerPointToLatLng(d.layerPoint);
      });
    });

    // update child to change latLng position to follow parent position for smooth redraw
    const updateChild = () => {
      nodes.each((d) => {
        d.layerPoint = map.latLngToLayerPoint(d.prevLatLong);
        if (d.type === "child") {
          d.x = d.layerPoint.x;
          d.y = d.layerPoint.y;
        }
      });
    };

    // update force center position of all child nodes when the zooming end
    map.on("zoomend", () => {
      simulation.force("x").initialize(nodes.data());
      simulation.force("y").initialize(nodes.data());
      simulation.alpha(0.3).restart();
      updateChild();
    });
  }, []);
  return null;
}
