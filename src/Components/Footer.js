import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import "../Css/footer.css";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
  appBar: {
    alignItems: "center",
    //borderTop: "30px",
    //borderTop: "6px solid rgb(255, 166, 0)",
    background:
      "linear-gradient(90deg, #d26625 0%, #d26625 45%, rgba(244,90,2,1) 90%)",
    [theme.breakpoints.up("sm")]: {
      borderTop: "6px solid rgb(255, 166, 0)",
      background: "rgb(238, 238, 238)",
      // borderLeft: "240px",
      // background:
      // "linear-gradient(180deg, rgba(240,99,0,0.2) 0%, rgba(255,105,0,0.1) 45%, rgba(211,77,0,0.08) 90%)"
    },
  },
  textColor: {
    color: "rgb(240, 240, 240)",
    fontWeight: "bold",
    [theme.breakpoints.up("sm")]: {
      color: "rgb(53, 53, 53)",
      fontWeight: "bold",
      fontSize: "14px",
      textAlign: "right",
    },
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <AppBar position="bottom"  color="primary" className={classes.appBar}>
      {/* <Container maxWidth="md"> */}
      <Toolbar>
        <Grid spacing={24} container justify="space-between">
          <Grid item >
            <Typography
               align="center"
              noWrap
              variant="body1"
              className={classes.textColor}
              style={{ fontFamily: "Prompt"   }}
            >
             <p> © 2021 Powered by RMUTI  ||  Made by : <Button a href={`/monitoring/CoResearcher?co_researcher_id=OTY=`}> XOXO Studio Company Limited </Button></p>
             
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
      {/* </Container> */}
    </AppBar>
  );
}
