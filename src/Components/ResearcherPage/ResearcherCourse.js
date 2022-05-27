import TableContainer from "@material-ui/core/TableContainer";
import {
  makeStyles,
  useTheme,
  ThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import { GrCertificate, GrSolaris } from "react-icons/gr";

import { orange } from "@material-ui/core/colors";
import CardContent from "@material-ui/core/CardContent";
import { Card, IconButton, Container } from "@material-ui/core";
import {
  Col,
  // Container,
  Row,
  Table,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardText,
  CardImg,
} from "reactstrap";
import { useEffect } from "react";

export default function Course(props) {
  const { classes, course } = props;
  return (
    <Grid container spacing={1}>
      <Grid item xs>
        <TableContainer className="card-header-border card-border rc-body3">
          <Card>
            <CardBody className="card-header-border">
              <CardTitle
                tag="h6"
                style={{ padding: 5, color: "black" }}
                className={(classes.customLabel, classes.headerLabel)}
              >
                หลักสูตร
              </CardTitle>
            </CardBody>

            <Grid
              className="rc-body2"
              container
              spacing={1}
              style={{
                fontFamily: "Prompt",
                padding: "20px 20px 20px 20px",
              }}
            >
              <TableContainer className=" card-border rc-body3">
                <CardText
                  style={{
                    textAlign: "left",
                    padding: "20px 20px 20px 20px",
                  }}
                >
                  {course.map((listValue, index) => {
                    return (
                      <CardText>
                        <p>หลักสูตร : {listValue.coursenameth}</p>

                        <p> หลักสูตรอังกฤษ :{listValue.coursenameen} </p>

                        <p>วิทยาเขต : {listValue.camnameth}</p>

                        <p>หลักสูตร : {listValue.yearname}</p>

                        <p>ระดับการศึกษา : {listValue.degnameth}</p>

                        <p>คณะ : {listValue.facnameth} </p>

                        <Button
                          style={{ fontFamily: "Prompt" }}
                          a
                          href=" http://203.158.192.107:8081/rmuticourse/?fbclid=IwAR0-v5E5uPktQ2aYF37zElh10n_EWFvFQP7DeX4JP8XjXjwLC3apdWWu5t0 "
                        >
                          รายละเอียดเพิ่มเติม
                        </Button>
                      </CardText>
                    );
                  })}
                </CardText>
              </TableContainer>
            </Grid>
          </Card>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
