/* eslint-disable no-new-wrappers */
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col,
} from "reactstrap";
import PropTypes from "prop-types";

import token from "../../config/token.json";

const localUrl = "http://localhost:4000";
const apiUrl = "https://kmapi.kims-rmuti.com";

const getParam = (name) => {
  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);
  const param = params.get(name);
  return param;
};

const getknowledgeParams = getParam("knowledge_id");

const getoutputParams = getParam("output_id");

const getgoalParams = getParam("goal_id");

const getnewKnowledgeParams = getParam("new_knowledge_id");

const getId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
};

const YoutubeEmbed = ({ embedId }) => {
  console.log(embedId);
  // setYoutubeEmbed(embedId);

  const vdo_id = getId(embedId);
  console.log(vdo_id);

  return (
    <div className="video-responsive">
      <iframe
        width="600"
        height="480"
        src={`https://www.youtube.com/embed/${vdo_id}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};

const Knowledges = (props) => {
  const { concept_proposal_id } = props;
  const [video, setVideo] = useState("");
  const [itemValue, setItemvalue] = useState({});

  const getOutput = async () => {
    const output_id = getParam("output_id");
    const response = await axios.get(
      `${apiUrl}/api/get/progress-report/output?concept_proposal_id=${atob(
        concept_proposal_id
      )}&output_id=${output_id}`,
      {
        headers: {
          "content-type": "application/json",
          "x-access-token": token.accesstoken,
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

  const getgoalDetail = async () => {
    const goal_id = getParam("goal_id");
    const goal_type = getParam("goal_type");
    const response = await axios.get(
      `${apiUrl}/api/get/bd_sum_goals?concept_proposal_id=${atob(
        concept_proposal_id
      )}&goal_id=${goal_id}&type=${goal_type}`,
      {
        headers: {
          "content-type": "application/json",
          "x-access-token": token.accesstoken,
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

  const getNewKnowledge = async () => {
    const new_knowledge_id = getParam("new_knowledge_id");
    const response = await axios.get(
      `${apiUrl}/api/get/progress-report/newknowledge?concept_proposal_id=${atob(
        concept_proposal_id
      )}&new_knowledge_id=${new_knowledge_id}`,
      {
        headers: {
          "content-type": "application/json",
          "x-access-token": token.accesstoken,
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

  const getknowledgeDetail = async () => {
    const knowledge_id = getParam("knowledge_id");
    const response = await axios.get(
      `${apiUrl}/api/get/progress-report/knowledge?concept_proposal_id=${atob(
        concept_proposal_id
      )}&knowledge_id=${knowledge_id}`,
      {
        headers: {
          "content-type": "application/json",
          "x-access-token": token.accesstoken,
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

  useEffect(async () => {
    if (getknowledgeParams) {
      const knowledgeDetail = await getknowledgeDetail();
      setItemvalue({
        id: knowledgeDetail.knowledge_id,
        name: knowledgeDetail.knowledge_name,
        detail: knowledgeDetail.knowledge_detail.replace(/<[^>]+>|&nbsp;/g, ""),
        image: `file-upload/knowledge-upload/${knowledgeDetail.knowledge_image}`,
      });
      setVideo(knowledgeDetail.knowledge_video);
    }

    if (getoutputParams) {
      const outputDetail = await getOutput();
      setItemvalue({
        id: outputDetail.output_id,
        name: outputDetail.output_name,
        detail: outputDetail.output_detail.replace(/<[^>]+>|&nbsp;/g, ""),
        image: `file-upload/innovation-upload/${outputDetail.output_image}`,
      });
      setVideo(outputDetail.output_video);
    }

    if (getnewKnowledgeParams) {
      const newKnowledge = await getNewKnowledge();
      setItemvalue({
        id: newKnowledge.outcome_knowledge_id,
        name: newKnowledge.outcome_knowledge_name,
        detail: newKnowledge.outcome_knowledge_detail.replace(
          /<[^>]+>|&nbsp;/g,
          ""
        ),
        image: `file-upload/outcome-upload/${newKnowledge.outcome_knowledge_image}`,
      });
      setVideo(newKnowledge.outcome_knowledge_video);
    }

    if (getgoalParams) {
      const goalDetail = await getgoalDetail();
      const goal_type = getParam("goal_type");
      setItemvalue({
        id: goalDetail.bd_sum_goal_id,
        name:
          goal_type == "sdg"
            ? goalDetail.sdgs_name
            : goal_type == "bcg"
            ? goalDetail.bcg_name
            : goal_type == "cluster"
            ? goalDetail.cluster_name
            : goal_type == "curve"
            ? goalDetail.curve_name
            : "",
        detail: goalDetail.detail,
        image: `icon/${
          goal_type == "sdg"
            ? goalDetail.sdgs_image
            : goal_type == "bcg"
            ? goalDetail.bcg_image
            : goal_type == "cluster"
            ? goalDetail.cluster_image
            : goal_type == "curve"
            ? goalDetail.curve_image
            : ""
        }`,
      });
      //   setVideo(goalDetail.output_video);
    }
  }, []);

  return (
    <Row>
      <Col md="12">
        <Card>
          <CardImg
            top
            width="100%"
            src={`https://researcher.kims-rmuti.com/${itemValue.image}`}
            alt="Card image cap"
          />
          <CardBody>
            {video && <YoutubeEmbed embedId={video} />}

            <CardTitle></CardTitle>
            <CardSubtitle>{itemValue.name}</CardSubtitle>
            <CardText>{itemValue.detail}</CardText>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Knowledges;
