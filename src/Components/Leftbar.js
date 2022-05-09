/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { BiNetworkChart, BiShoppingBag, BiCopyright } from "react-icons/bi";
import {
  AiOutlineProject,
  AiFillHome,
  AiOutlineFundProjectionScreen,
} from "react-icons/ai";
import { FaUserTie } from "react-icons/fa";
import { RiCommunityFill } from "react-icons/ri";
import rmuti from "../images/rmuti.png";

import rmutilogo from "../images/rmutilogo.png";
import rmutiAppbar from "../images/rmuti-black.png";
import kminn from "../images/kminn.png";
import rmuti2 from "../images/rmuti2.png";
import "../index.css";
import axios from "axios";
import useGaTracker from "../useGaTracker";

import sidelogo from "../images/newnrct.png";

import ip from "../images/ip.png";

import { useTranslation } from "react-i18next";

import token from "../config/token.json";

var counterContainer = document.querySelector(".website-counter");
var resetButton = document.querySelector("#reset");
var visitCount = localStorage.getItem("page_view");

// Check if page_view entry is present
if (visitCount) {
  visitCount = Number(visitCount) + 1;
  localStorage.setItem("page_view", visitCount);
} else {
  visitCount = 1;
  localStorage.setItem("page_view", 1);
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
   
  },

  shadowMenu: {
    boxShadow: "10px 0 20px -5px rgba(115,115,115,0.75)",
  },
  drawer: {

    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,

    },
  },
  icon: {
    color: "rgb(219, 219, 219)",
  },
  dividerColor: {
    backgroundColor: "white",
  },
  imgone: {
    paddingRight: 10,
    [theme.breakpoints.up("sm")]: {
      paddingTop: 10,
      paddingRight: 10,
    },
  },
  imgtwo: {
    paddingTop: 0,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      width: "230px",
      display: "inline-block",
      paddingTop: 10,
    },
  },
  imgthree: {
    paddingTop: 0,
    [theme.breakpoints.up("sm")]: {
      display: "none",
      width: "230px",
      paddingTop: 10,
    },
  },
  textUnderline: {
    "&:hover": {
      borderBottom: `2px solid #FFFFFF`,
      // width: 240,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.standard,
      }),
    },
  },
  link: {
    // color: "#FF0000",
    "&:hover": {
      color: "#FFF",
    },
  },
  // appBar: {
  //   // background:
  //   //   "linear-gradient(90deg, #d26625 0%, #d26625 45%, rgba(244,90,2,1) 90%)",
  //   // borderTop: "6px solid rgb(255, 166, 0)",
  //   [theme.breakpoints.up("sm")]: {
  //     // opacity:0,
  //     // height: "45px",
  //     marginTop: 0,
  //     background: "rgb(8,110,125,0.9)",
  //     width: `calc(100% - ${drawerWidth}px)`,
  //     marginLeft: drawerWidth,
  //   },
  // },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    boxShadow: "rgba(0, 0, 0, 0.5) 0px 14px 28px, rgba(0, 0, 0, 0.4) 0px 10px 10px",
    width: drawerWidth,
    background:
      "linear-gradient(180deg, #f9bc00 0%, #d26625 45%, rgba(244,90,2,1) 90%)",
    color: "white",
    fontFamily: "Prompt",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  active: {
    backgroundColor: theme.palette.action.selected,
    "&:hover": {
      color: "#FFF",
    },
  },
  selected: {},
}));

const apiUrl = "https://kmapi.kims-rmuti.com";
const localUrl = "http://localhost:4000";

function ResponsiveDrawer({ window }) {
  // const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { t } = useTranslation();
  const [language, setlanguage] = React.useState("");
  const [count, setcount] = React.useState("");

  useGaTracker();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getLanguage = () => {
    // const params = new URLSearchParams(document.location.search);
    // const ns = params.get("language");
    const language = localStorage.getItem("language");
    setlanguage(language);
  };

  const locationsLanguage = (language) => {
    const url = new URL(document.location.href);
    url.searchParams.set("language", language);

    const params = new URLSearchParams(url.search);
    localStorage.setItem("language", params.get("language"));
    document.location = url.href;
  };

  React.useEffect(() => {
    getLanguage();
    axios
      .get(`${apiUrl}/api/get/counts`, {
        headers: {
          "content-type": "application/json",
          "x-access-token": token.accesstoken,
        },
      })
      .then((res) => {
        setcount(res.data.count_ipaddress);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const drawer = (
    <div >
      {/* <div className={classes.toolbar} /> */}

      <List>
        <ListItem>
          <img
            src={rmutilogo}
            width={90}
            // margin={"30px 10px 10px 10px"}
          />
          <img
            src={sidelogo}
            // height={110}
            style={{
              marginTop: 10,
              objectFit: "cover",
              objectPosition: "center center",
            }}
            width={115}
            height={150}
            // margin={"30px 10px 10px 10px"}
          />
        </ListItem>

        <ListItem>
          <img
            src={rmuti}
            // height={110}
            width="100%"
            style={{ marginTop: -15 }}
            // margin={"30px 10px 10px 10px"}
          />
        </ListItem>

        <Divider className={classes.dividerColor} />

        <ListItem
          button
          component="a"
          href="/monitoring?checkproject=true&checkservice=true&checku2t=true"
          className={classes.link}
        >
          <ListItemIcon className={classes.icon}>
            <AiFillHome size={25} />
          </ListItemIcon>
          <ListItemText>
            <text
              className={classes.textUnderline}
              style={{ fontFamily: "Prompt", fontSize: 15 }}
            >
              {t("menu1")}
              {/* หน้าแรก */}
            </text>
          </ListItemText>
        </ListItem>

        {/* <ListItem
          button
          component="a"
          href="/monitoring"
          className={classes.link}
        >
          <ListItemIcon className={classes.icon}>
            <AiFillHome size={25} />
          </ListItemIcon>
          <ListItemText>
            <text
              className={classes.textUnderline}
              style={{ fontFamily: "Prompt", fontSize: 15 }}
            >
              หน้าแรก
            </text>
          </ListItemText>
        </ListItem> */}

        <ListItem
          button
          component="a"
          href="/monitoring/ProjectDetail"
          // selected={true}
          className={classes.link}
          // classes={{ selected: classes.active }}
        >
          <ListItemIcon className={classes.icon}>
            <AiOutlineProject size={25} />
          </ListItemIcon>
          <ListItemText>
            <text
              className={classes.textUnderline}
              style={{ fontFamily: "Prompt", fontSize: 15 }}
            >
              {t("menu2")}
            </text>
          </ListItemText>
        </ListItem>

        <ListItem
          button
          component="a"
          href="/monitoring/SearchProjectService"
          // selected={true}
          className={classes.link}
          // classes={{ selected: classes.active }}
        >
          <ListItemIcon className={classes.icon}>
            <AiOutlineFundProjectionScreen size={25} />
          </ListItemIcon>
          <ListItemText>
            <text
              className={classes.textUnderline}
              style={{ fontFamily: "Prompt", fontSize: 15 }}
            >
              {t("menu3")}
            </text>
          </ListItemText>
        </ListItem>

        <ListItem
          button
          component="a"
          href="/monitoring/SearchResearcher?fname=&lname="
          // className={(classes.link)}
          // selected={true}
          className={classes.link}
          // classes={{ selected: classes.active }}
        >
          <ListItemIcon className={classes.icon}>
            <FaUserTie size={25} />
          </ListItemIcon>
          <ListItemText>
            <text
              className={classes.textUnderline}
              style={{ fontFamily: "Prompt", fontSize: 15 }}
            >
              {t("menu4")}
            </text>
          </ListItemText>
        </ListItem>

        <ListItem
          className={classes.link}
          button
          component="a"
          href="/monitoring/CoResearcher"
        >
          <ListItemIcon className={classes.icon}>
            <BiNetworkChart size={25} />
          </ListItemIcon>
          <ListItemText>
            <text
              className={classes.textUnderline}
              style={{ fontFamily: "Prompt", fontSize: 15 }}
            >
              {t("menu5")}
            </text>
          </ListItemText>
        </ListItem>

        <ListItem
          className={classes.link}
          button
          component="a"
          href="/monitoring/Innovation"
        >
          <ListItemIcon className={classes.icon}>
            <BiShoppingBag size={25} />
          </ListItemIcon>
          <ListItemText>
            <text
              className={classes.textUnderline}
              style={{ fontFamily: "Prompt", fontSize: 15 }}
            >
              {t("menu6")}
            </text>
          </ListItemText>
        </ListItem>

        <ListItem
          className={classes.link}
          button
          component="a"
          href="/monitoring/Patent"
        >
          <ListItemIcon className={classes.icon}>
            <img
              src={ip}
              width={28}
              // margin={"30px 10px 10px 10px"}
            />
          </ListItemIcon>
          <ListItemText>
            <text
              className={classes.textUnderline}
              style={{ fontFamily: "Prompt", fontSize: 15 }}
            >
              {t("menu7")}
            </text>
          </ListItemText>
        </ListItem>
      </List>
      <Divider className={classes.dividerColor} />
      <div style={{ position: "absolute", bottom: 0, marginBottom: 10 }}>
        <button
          // className="button"
          onClick={() => {
            locationsLanguage("th");
          }}
        >
          {t("lang_th")}
        </button>
        <button
          // className="button"
          onClick={() => {
            locationsLanguage("en");
          }}
        >
          {t("lang_en")}
        </button>
        <ListItem>
          <img
            src={kminn}
            // height={110}

            width="100%"
            // margin={"30px 10px 10px 10px"}
          />
        </ListItem>

        <div>{t("countuser", { count })}</div>
        <div class="website-counter"></div>
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div >
      <div className={classes.root}>
        <CssBaseline />
        {/* <div className="app-bar">
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
          <text
              style={{  fontFamily: "Prompt", fontSize: 50 ,fontWeight: "bold" ,color: "#FF9F45" ,margin:"5px 0px 5px 200px"}}
            >
              Knowledge & Innovation Management System
            </text>
            <Grid
              justify="space-between" // Add it here :)
              container
              spacing={24}
            >
              <Grid item>
                <IconButton
                color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>

              <Grid item>
                <div>
                  <Typography variant="p" noWrap align="center">
                     <img
                      src={rmuti2}
                      width="230px"
                     className={classes.imgtwo}
                     /> 

                    <img
                      src={rmuti2}
                      width="230px"
                      className={classes.imgthree}
                    />
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div> */}
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css" >
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      </div>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
