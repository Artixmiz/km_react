/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from '@material-ui/core/Typography';
import{ useState, useEffect } from "react";
import axios from "axios";


const useStyles = makeStyles((theme) => ({

  drawerPaper: {
    width: '15%',
    background: '#d26625',
    color: 'white',
  },

  typography: {
    font12: {
      fontSize: 30,
      margin: 20
    },
    body1: {
      fontWeight: 500,
    },
    style: 
    { margin: "100px"  }
            
  },

  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}));

export default function PermanentDrawerRight() {

  const [result, setresult] = useState([]);

  const localUrl = "http://localhost:4000";
  const apiUrl = "https://api.rmuti.ac.th/km_api";

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/get/bb-user/3309901756539`)
      .then((result) => {
        console.log(result.data[0]);
        setresult(result.data[0]);
      });
  },[]);

  const classes = useStyles();

  return (
    
    <div className={classes.root}>
      
     <CssBaseline />
      <Drawer
        className={classes.drawer}
        padding="5px 5px 5px 5px"
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="right"
        style={{ fontFamily: "Prompt" }}
        
        
      >
      
      <img src={`https://km-innovations.rmuti.ac.th/researcher/images-profile-upload/${result.user_image_user}`}
              height={230}
              width={200}
              style={{ margin: "20px auto 20px auto"  }}
            />
    
    <Typography  align="left" style={{ margin: "5px 20px 5px 20px ", fontFamily: "Prompt"  }} > ชื่อนักวิจัย : {result.user_first_name_th} {result.user_last_name_th} </Typography>
   
   <Typography variant="font12" align="left" style={{ margin: "5px 20px 5px 20px "  }}> ตำแหน่งปัจจุบัน : {result.user_academic} </Typography>

    <Typography variant="font12" align="left" style={{ margin: "5px 20px 5px 20px "  }}> สังกัด : {result.user_section} </Typography>

    <Typography variant="font12" align="left" style={{ margin: "5px 20px 5px 20px "  }}> สาขา : {result.user_major}  </Typography>

    <Typography variant="font12" align="left" style={{ margin: "5px 20px 5px 20px "  }}> คณะ  : {result.user_organization} </Typography>

    <Typography variant="font12" align="left" style={{ margin: "5px 20px 5px 20px "  }}> เบอร์โทรศัพท์ : {result.user_phone}</Typography>
    
    <Typography variant="font12" align="left" style={{ margin: "5px 20px 5px 20px "  }}> E -mail : {result.user_mail} </Typography>

      </Drawer>
    </div>
  );
}

