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

import MenuItem from "@material-ui/core/MenuItem";

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
import "../index.css";
import axios from "axios";

import sidelogo from "../images/newnrct.png";
import ip from "../images/ip.png";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  active: {
    backgroundColor: theme.palette.action.selected,
    "&:hover": {
      color: "#FFF",
    },
  },
  root: {
    display: "flex",
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
  appBar: {
    background:
      "linear-gradient(90deg, #d26625 0%, #d26625 45%, rgba(244,90,2,1) 90%)",
    borderTop: "6px solid rgb(255, 166, 0)",
    [theme.breakpoints.up("sm")]: {
      display: "none",
      // opacity:0,
      // height: "45px",
      // maginTop:30,
      marginTop: -20,
      background: "rgb(238, 238, 238)",
      // background: "linear-gradient(0deg, rgba(240,99,0,0.2) 0%, rgba(255,105,0,0.1) 45%, rgba(211,77,0,0.08) 90%)",
      borderBottom: "6px solid rgb(255, 166, 0)",
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
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
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [countVisitor, setCountVisitor] = React.useState();

  React.useEffect(() => {
    axios
      .get("https://api.countapi.xyz/update/km-monitoring/counter?amount=1")
      .then((res) => {
        setCountVisitor(res.data.value);
      });
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
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
          href="/monitoring"
          className={(classes.link, classes.active)}
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
        </ListItem>

        <ListItem
          button
          component="a"
          href="/monitoring/SearchProject"
          className={classes.link}
        >
          <ListItemIcon className={classes.icon}>
            <AiOutlineProject size={25} />
          </ListItemIcon>
          <ListItemText>
            <text
              className={classes.textUnderline}
              style={{ fontFamily: "Prompt", fontSize: 15 }}
            >
              งานวิจัย
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
              งานบริการวิชาการ
            </text>
          </ListItemText>
        </ListItem>

        <ListItem
          button
          component="a"
          href="/monitoring/SearchResearcher?fname=&lname="
          className={classes.link}
        >
          <ListItemIcon className={classes.icon}>
            <FaUserTie size={25} />
          </ListItemIcon>
          <ListItemText>
            <text
              className={classes.textUnderline}
              style={{ fontFamily: "Prompt", fontSize: 15 }}
            >
              นักวิจัย
            </text>
          </ListItemText>
        </ListItem>

        {/* <ListItem
          button
          component="a"
          href="/monitoring/CoResearcher"
          className={classes.link}
        >
          <ListItemIcon className={classes.icon}>
            <RiCommunityFill size={25} />
          </ListItemIcon>
          <ListItemText>
            <text
              className={classes.textUnderline}
              style={{ fontFamily: "Prompt", fontSize: 15 }}
            >
              ชุมชน
            </text>
          </ListItemText>
        </ListItem> */}

        <ListItem
          className={classes.link}
          button
          component="a"
          href="/monitoring/SearchPageCo"
        >
          <ListItemIcon className={classes.icon}>
            <BiNetworkChart size={25} />
          </ListItemIcon>
          <ListItemText>
            <text
              className={classes.textUnderline}
              style={{ fontFamily: "Prompt", fontSize: 15 }}
            >
              เครือข่ายความร่วมมือ
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
              นวัตกรรม/ผลิตภัณฑ์
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
              ทรัพย์สินทางปัญญา
            </text>
          </ListItemText>
        </ListItem>
      </List>
      <Divider className={classes.dividerColor} />
      {/* {countVisitor} */}
      <ListItem>
        <img
          src={kminn}
          // height={110}
          width="100%"
          style={{ marginTop: 210 }}
          // margin={"30px 10px 10px 10px"}
        />
      </ListItem>
      <p>จำนวนผู้เข้าชม</p>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className="">
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
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
                      src={rmutiAppbar}
                      width="230px"
                      className={classes.imgtwo}
                    />
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
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
