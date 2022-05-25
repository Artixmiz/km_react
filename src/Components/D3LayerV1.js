/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { MapContainer, TileLayer, useMap, ZoomControl } from "react-leaflet";
import React from "react";
import L from "leaflet";
import * as d3 from "d3";
import "../Css/d3.css";

export default  function D3Layer(props) {
    const map = useMap();
    const { location } = props;
    // console.log("prop", await location);

    // let data = await location;

    let radius = 13;
    let valueline = d3
      .line()
      .x(function (d) {
        return d[0];
      })
      .y(function (d) {
        return d[1];
      })
      .curve(d3.curveCatmullRomClosed);

    React.useEffect(async () => {
      const svgLayer = L.svg({ clickable: true });
      svgLayer.addTo(map);

      // get map data from api
      const data = await location;

      console.log(data);

      let researherList = [],
        projectList = [],
        projectService = [],
        community = [],
        company = [],
        goverment = [],
        child = [],
        parentList = [],
        u2tList = [];

      let researcherNodes = [],
        parentNodes = [],
        projectNodes = [],
        projectServiceNodes = [],
        u2tNodes = [];

      data.nodes.forEach((d) => {
        if (d.label == "นักวิจัย") {
          researcherNodes.push(d);
          researherList.push(d.id);
        }

        if (d.type == "parent") {
          parentNodes.push(d);
          parentList.push(d.id);
        }
        if (d.label == "งานวิจัย") {
          projectList.push(d.id);
          projectNodes.push(d);
        }
        if (d.label == "บริการวิชาการ") {
          projectService.push(d.id);
          projectServiceNodes.push(d);
        }
        if (d.label == "U2T") {
          u2tList.push(d.id);
          u2tNodes.push(d);
        }
        if (d.label == "ชุมชน") community.push(d.id);
        if (d.label == "หน่วยงานภาคธุรกิจ") company.push(d.id);
        if (d.label == "หน่วยงานภาครัฐ") goverment.push(d.id);
        if (d.type == "child") child.push(d.id);
        d.latLong = new L.LatLng(d.lat, d.lon);
        d.layerPoint = map.latLngToLayerPoint(d.latLong);
        d.radius = radius;
      });

      const lookup = researcherNodes.reduce((a, e) => {
        a[e.user_idcard] = ++a[e.user_idcard] || 0;
        return a;
      }, {});

      const researcherDuplicate = researcherNodes.filter(
        (e) => lookup[e.user_idcard]
      );

      console.log(researcherDuplicate);

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
          projectService.includes(d.target) &&
          projectService.includes(d.source);

        d.isChild = child.includes(d.target) && child.includes(d.source);

        d.isParent =
          parentList.includes(d.target) && parentList.includes(d.source);

        d.stroke = d.isResearcherToResearcher
          ? "#c900f1"
          : d.isProjectToProject
          ? "rgb(65, 215, 55)"
          : d.isProjectSerToProjectSer
          ? "rgb(0, 132, 255)"
          : d.isCommunityToCommunity
          ? "rgb(0, 38, 255)"
          : d.isCompanyToCompany
          ? "rgb(212, 0, 255)"
          : d.isGovermentToGoverment
          ? " "
          : d.isChild
          ? "rgb(0, 201, 10) "
          : d.isParent
          ? "red"
          : "#ff1100 ";
      });

      data.nodes.forEach((d) => {
        d.isResearcherToResearcher = researcherDuplicate.includes(d);
        d.isProject = projectNodes.includes(d);
        d.isProjectService = projectServiceNodes.includes(d);
        d.isU2t = u2tNodes.includes(d);
      });

      // setnodes(data.nodes);
      // setlinks(data.links);

      // set d3 to use svg layer in leaflet and config it to enable interaction with svg element.
      const svg = d3
        .select(map.getPanes().overlayPane)
        .select("svg")
        .attr("pointer-events", "auto");

      const g = svg.select("g").attr("class", "leaflet-zoom-hide");
      const defs = svg.append("svg:defs");
      const groups = g.append("g").attr("class", "groups");

      let tooltipEl = function (d) {
        // const converted_project_id = toBinary(d.project_id);
        // const converted_coresearcher_id = toBinary(d.coresearcher_id);
        // const converted_user_idcard = toBinary(d.user_idcard);

        const project_url = `/monitoring/ProjectDetail/ProjectNetwork?project_id=${btoa(
          d.project_id
        )}`;
        const concept_url = `/monitoring/ProjectDetailConcep/ProjectNetwork?concep_id=${btoa(
          d.concept_proposal_id
        )} `;
        const user_url = `/monitoring/Researcher?user_idcard=${btoa(
          d.user_idcard
        )}`;

        if (d.project_id) {
          return `
            <div class="tip__container">
              <div class="val"><h6>${d.label}</h6></div>
              <div class="close">
                <button>&times</button>
              </div>
              <hr/>
              <div class="val">${d.project_name_th}</div>
              <hr/>
              <a href="${project_url}" class="btn">รายละเอียดเพิ่มเติม</a>
            </div>`;
        }

        if (d.concept_proposal_id) {
          return `
            <div class="tip__container">
              <div class="val"><h6>${d.label}</h6></div>
              <div class="close">
                <button>&times</button>
              </div>
              <hr/>
              <div class="val">${d.project_name_th}</div>
              <hr/>
              <a href="${concept_url}" class="btn">รายละเอียดเพิ่มเติม</a>

            </div>`;
        }

        if (d.user_idcard) {
          return `
            <div class="tip__container">
              <div class="val"><h6>${d.label}</h6></div>
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
                class="rounded-circle img-ps"
                width="110px"
                height="110px"
                src="${d.img}"/>
                </div>
              <div class="val"><p class="blocktext">${d.fullname}</p></div>
              <hr/>
              <a href="${user_url}" class="btn">รายละเอียดเพิ่มเติม</a>
            </div>`;
        }

        // if ((d.label = "งานวิจัยในพื้นที่")) {
        //   return `<div class="tip__container">
        //             <div class="val">งานวิจัยในพื้นที่</div>
        //           </div>`;
        // }

        return `
            <div class="tip__container">
              <div class="val">${d.label}</div>
          

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

      const box = d3
        .selectAll(".leaflet-top.leaflet-right")
        .append("div")
        .attr("id", "box")
        .style("width", "300px")
        .style("margin-right", "10px")
        .data(data.nodes)
        .append("div")
        .attr("class", "wrap-collabsible");

      box
        .append("input")
        .attr("id", "collapsible")
        .attr("class", "toggle ")
        .attr("type", "checkbox")
        .style("pointer-events", "auto")
        .style("display", "none")
        .property("checked", true);

      box
        .append("label")
        .attr("for", "collapsible")
        .attr("class", "lbl-toggle")
        .style("pointer-events", "auto")
        .text("รายละเอียดความสัมพันธ์")
        .style("fontFamily", "Prompt");

      const content = box
        .append("div")
        .attr("class", "collapsible-content")
        .append("div")
        .attr("class", "content-inner");

      const grid = content
        .append("div")
        .attr("class", "row justify-content-md-center align-items-center ");

      // grid
      //   .append("div")
      //   .attr("class", "col-md-1 mt-2")
      //   .append("input")
      //   .attr("type", "checkbox")
      //   .attr("id", "reseachCheck")
      //   .style("pointer-events", "auto")
      //   .style("cursor", "pointer")
      //   .on("click", () => {
      //     let checkBox = document.getElementById("reseachCheck");
      //     if (checkBox.checked == true) {
      //       nodes.style("opacity", (n) => {
      //         // console.log(n);
      //         return n.isProject == true ? 1 : 0;
      //       });
      //       links.style("opacity", (n) => {
      //         // console.log(n);
      //         return n.isProject == true ? 1 : 0;
      //       });
      //     } else {
      //       nodes.style("opacity", 1);
      //       links.style("opacity", 1);
      //     }
      //   });
      // document.getElementById("reseachCheck").checked = true;

      grid
        .append("div")
        .attr("class", "col-md-5 mt-2")
        .append("img")
        .attr("class", "rounded-circle")
        .attr("src", "https://researcher.kims-rmuti.com/icon/วิจัย.png")
        .attr("width", "27")
        .attr("height", "27");

      grid.append("div").attr("class", "col-md-6").text("งานวิจัย");

      // grid
      //   .append("div")
      //   .attr("class", "col-md-1 mt-2")
      //   .append("input")
      //   .attr("type", "checkbox")
      //   .attr("id", "serviceCheck")
      //   .style("pointer-events", "auto")
      //   .style("cursor", "pointer")
      //   .on("click", () => {
      //     let checkBox = document.getElementById("serviceCheck");
      //     if (checkBox.checked == true) {
      //       nodes.style("opacity", (n) => {
      //         // console.log(n);
      //         return n.isProjectService == true ? 1 : 0;
      //       });
      //       links.style("opacity", (n) => {
      //         // console.log(n);
      //         return n.isProjectService == true ? 1 : 0;
      //       });
      //     } else {
      //       nodes.style("opacity", 1);
      //       links.style("opacity", 1);
      //     }
      //   });
      // document.getElementById("serviceCheck").checked = true;

      grid
        .append("div")
        .attr("class", "col-md-5 mt-2")
        .append("img")
        .attr("class", "rounded-circle")
        .attr("src", "https://researcher.kims-rmuti.com/icon/บริการ.png")
        .attr("width", "27")
        .attr("height", "27");

      grid.append("div").attr("class", "col-md-6").text("งานบริการวิชาการ");

      // grid
      //   .append("div")
      //   .attr("class", "col-md-1 mt-2")
      //   .append("input")
      //   .attr("type", "checkbox")
      //   .attr("id", "u2tCheck")
      //   .style("pointer-events", "auto")
      //   .style("cursor", "pointer")
      //   .on("click", () => {
      //     let checkBox = document.getElementById("u2tCheck");
      //     if (checkBox.checked == true) {
      //       nodes.style("opacity", (n) => {
      //         // console.log(n);
      //         return n.isU2t == true ? 1 : 0;
      //       });
      //       links.style("opacity", (n) => {
      //         // console.log(n);
      //         return n.isU2t == true ? 1 : 0;
      //       });
      //     } else {
      //       nodes.style("opacity", 1);
      //       links.style("opacity", 1);
      //     }
      //   });
      // document.getElementById("u2tCheck").checked = true;

      grid
        .append("div")
        .attr("class", "col-md-5 mt-2")
        .append("img")
        .attr("class", "rounded-circle")
        .attr("src", "https://researcher.kims-rmuti.com/icon/u2t.jpg")
        .attr("width", "27")
        .attr("height", "27");

      grid
        .append("div")
        .attr("class", "col-md-6 mt-2")
        .text("งานบริการวิชาการ (U2T)");

      // grid
      //   .append("div")
      //   .attr("class", "col-md-1 mt-2")
      //   .append("input")
      //   .attr("type", "checkbox")
      //   .attr("id", "researcherCheck")
      //   .style("pointer-events", "auto")
      //   .style("cursor", "pointer")
      //   .on("click", () => {
      //     let checkBox = document.getElementById("researcherCheck");
      //     if (checkBox.checked == true) {
      //       nodes.style("opacity", (n) => {
      //         // console.log(n);
      //         return n.isResearcherToResearcher == true ? 1 : 0;
      //       });
      //       links.style("opacity", (n) => {
      //         // console.log(n);
      //         return n.isResearcherToResearcher == true ? 1 : 0;
      //       });
      //     } else {
      //       nodes.style("opacity", 1);
      //       links.style("opacity", 1);
      //     }
      //   });
      // document.getElementById("researcherCheck").checked = true;

      grid
        .append("div")
        .attr("class", "col-md-5 mt-2")
        .append("div")
        .style("background", "#c900f1")
        .style("padding", "2px");

      grid.append("div").attr("class", "col-md-6").text("เครือข่ายนักวิจัย");

      // grid
      //   .append("div")
      //   .attr("class", "col-md-1 mt-2")
      //   .append("input")
      //   .attr("type", "checkbox")
      //   .attr("id", "projectCheck")
      //   .style("pointer-events", "auto")
      //   .style("cursor", "pointer")
      //   .on("click", () => {
      //     let checkBox = document.getElementById("projectCheck");
      //     // if (checkBox.checked == true) {
      //     //   nodes.style("opacity", 1);
      //     //   links.style("opacity", 1);
      //     // } else {
      //     //   nodes.style("opacity", (n) => {
      //     //     // console.log(n);
      //     //     return n.isResearcherToResearcher == true ? 1 : 0.1;
      //     //   });
      //     //   links.style("opacity", (n) => {
      //     //     // console.log(n);
      //     //     return n.isResearcherToResearcher == true ? 1 : 0.1;
      //     //   });
      //     // }
      //   });
      // document.getElementById("projectCheck").checked = true;

      grid
        .append("div")
        .attr("class", "col-md-5 mt-2")
        .append("div")
        .style("background", "#ff1100")
        .style("padding", "2px");

      grid.append("div").attr("class", "col-md-6").text("เครือข่ายงานวิจัย");

      //or indeed: querySelector('.combo') which returns a single DOM ref
      let original = document.querySelectorAll("#box")[0]; //reference to the original
      //clone and add
      function removeClones() {
        var i,
          all = document.querySelectorAll("#box");
        for (i = 0; i < all.length; i++) {
          if (all[i] !== original) {
            //this is a clone
            all[i].parentNode.removeChild(all[i]);
          }
        }
      }

      removeClones();

      // .html(`<button onClick="${()=>{console.log("test")}}">test</button>`)
      // .on("click", (d) => {
      //   console.log("test");
      // });

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
        .attr("stroke", "#ff1100 ")
        .attr("stroke-opacity", 0.8)
        .attr("stroke-width", 1)
        // .attr("fill", (d) =>
        //   d.label == "งานวิจัย"
        //     ? "red"
        //     : d.label == "บริการวิชาการ"
        //     ? "blue"
        //     : d.label == "นักวิจัย"
        //     ? "black"
        //     : "red"
        // )
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

      nodes.on("mouseover", function () {
        d3.select(this)
          .transition()
          .duration("150")
          // .attr("stroke", "blue")
          .attr("r", radius * 1.5);
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
      });

      let groupIds = d3
        .sort(
          new Set(
            data.nodes.map(function (n) {
              return +n.group;
            })
          )
        )
        .map(function (groupId) {
          return {
            groupId: groupId,
            count: data.nodes.filter(function (n) {
              return +n.group == groupId;
            }).length,
          };
        })
        .filter(function (group) {
          return group.count > 2;
        })
        .map(function (group) {
          return group.groupId;
        });

      function getRandomColor() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

      let paths = groups
        .selectAll(".path_placeholder")
        .data(groupIds, function (d) {
          return +d;
        })
        .enter()
        .append("g")
        .attr("class", "path_placeholder")
        .append("path")
        .attr("stroke", function (d) {
          return getRandomColor();
        })
        .attr("stroke-width", 2)
        .attr("stroke-opacity", 1.4)
        .attr("fill", function (d) {
          return getRandomColor();
        })
        .attr("opacity", 0);

      paths.transition().duration(2000).attr("opacity", 0.3);

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

      // console.log(neighbours);

      function deHighlight() {
        nodes.style("opacity", 1);
        links.style("opacity", 1);
        label.style("opacity", 0).style("visibility", "hidden");
        links.attr("stroke", (d) => d.stroke);
        // {
        //   return `node-${d.source.id}` == d.id || `node-${d.target.id}` == d.id
        //     ? "red"
        //     : "lime";
        // };
      }

      function highlightNeighbours(d) {
        deHighlight();
        // console.log(d);
        // nodes.style("opacity", (n) => {
        //   console.log(n);
        //   return n.isResearcherToResearcher == true ? 1 : 0.1;
        // });

        // links.style("opacity", (n) => {
        //   // console.log(n);
        //   return n.isResearcherToResearcher == true ? 1 : 0.1;
        // });

        nodes.style("opacity", (n) => {
          console.log(neighbours[d.id].indexOf(n.id));
          return neighbours[d.id].indexOf(n.id) != -1 ? 1 : 0.4;
        });

        links.style("opacity", (n) => {
          return d.id == n.source.id || d.id == n.target.id ? 1 : 0.4;
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

          // links.attr("stroke", (d) => {
          //   // console.log(d.source.id);
          //   return `node-${d.source.id}` == this.id ||
          //     `node-${d.target.id}` == this.id
          //     ? "red"
          //     : "lime";
          // });
        })
        .on("dblclick", () => {
          deHighlight();
        });

      map.on("click", function (e) {
        div.style("opacity", 0);
        div.style("visibility", "hidden");
      });

      // box.on("click", () => {
      //   nodes.style("opacity", (n) => {
      //     // console.log(n);
      //     return n.isResearcherToResearcher == true ? 1 : 0.1;
      //   });

      //   links.style("opacity", (n) => {
      //     // console.log(n);
      //     return n.isResearcherToResearcher == true ? 1 : 0.1;
      //   });
      // });

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

        updateGroups();

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
        .force(
          "link",
          d3
            .forceLink()
            .links(data.links)
            .id((d) => d.id)
            .distance(30)
        )
        // .force('charge', d3.forceManyBody())
        .force("charge", d3.forceManyBody().strength(-130))
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

      var polygonGenerator = function (groupId) {
        var node_coords = nodes

          .filter(function (d) {
            return d.group == groupId;
          })
          .data()
          .map(function (d) {
            return [d.x, d.y];
          });

        return d3.polygonHull(node_coords);
      };

      let polygon, centroid;

      function updateGroups() {
        groupIds.forEach(function (groupId) {
          var path = paths
            .filter(function (d) {
              return d == groupId;
            })
            .attr("transform", "scale(1) translate(0,0)")
            .attr("d", function (d) {
              polygon = polygonGenerator(d);
              centroid = d3.polygonCentroid(polygon);

              // to scale the shape properly around its points:
              // move the 'g' element to the centroid point, translate
              // all the path around the center of the 'g' and then
              // we can scale the 'g' element properly
              return valueline(
                polygon.map(function (point) {
                  return [point[0] - centroid[0], point[1] - centroid[1]];
                })
              );
            });

          d3.select(path.node().parentNode).attr(
            "transform",
            "translate(" +
              centroid[0] +
              "," +
              centroid[1] +
              ") scale(" +
              1.2 +
              ")"
          );
        });
      }
    }, []);
    return null;
  }
