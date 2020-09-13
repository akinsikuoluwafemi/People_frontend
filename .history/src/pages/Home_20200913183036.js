import React, { useEffect, useState, useContext } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import NavigationDrawer from "../components/NavigationDrawer";
import { Map } from "../components/Search";
import { LatitudeContext, LongitudeContext, ChatContext } from '../components/Context';
import Chat from '../components/Chat/Chat';
import { RequestContext } from '../context';



const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));


function Home() {
    
  const {showChat, userLat, userLng } = useContext(RequestContext);
  
  // const [userLat, setUserLat] = useState(0);
  //   const [userLng, setUserLng] = useState(0);
  // const [showChat, setShowChat] = useState(null);

  
    

  // useEffect(() => {
  //   getUserLocation();
  // }, []);

  //   const getUserLocation = () => {
  //     window.navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         let { latitude, longitude } = position.coords;
  //         console.log(latitude, longitude);
  //         setUserLat(latitude);
  //         setUserLng(longitude);
  //       },
  //       (error) => {
  //         if (error.code === 1) {
  //           // setLat(do something)
  //           // setLng(do something)
  //           alert(
  //             "Kindly allow location, for a more immersive experience with the app."
  //           );
  //           console.log(error);
  //         }
  //       }
  //     );
  //   };
  const classes = useStyles();
  return (
          <div className={classes.root}>
            <CssBaseline />

            <NavigationDrawer />
            <main className={classes.content}>
              <div className={classes.toolbar}></div>

              {showChat ? <Chat/> : <Map />}
            </main>
          </div>
  );
}

export default Home;
