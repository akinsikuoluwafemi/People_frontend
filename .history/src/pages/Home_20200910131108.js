import React, {useEffect, useState, useContext} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import "../pages/Home.scss";
import NavigationDrawer from "../components/NavigationDrawer";
import { requestData } from "../data";
import { LatitudeContext, LongitudeContext } from "../LocationContext";

import { Gmaps } from '../components/Gmaps';


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


// 





// 


function Home() {
  
  const [userLat, setUserLat] = useState(0)
  const [userLng, setUserLng] = useState(0)
  
  useEffect(() => {
    
    getUserLocation()

  }, []);

  const getUserLocation = () => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        let { latitude, longitude } = position.coords;
        console.log(latitude, longitude)
        setUserLat(latitude)
        setUserLng(longitude)

      },
      (error) => {
        if (error.code === 1) {
          // setLat(do something)
          // setLng(do something)
          alert('Kindly allow location, for a more immersive experience with the app.')
          console.log(error);
        }
      }
    );
  }
  console.log(userLat,userLng)
  const classes = useStyles();

  return (
    <LongitudeContext.Provider value={{userLng, setUserLng}}>
      <LatitudeContext.Provider value={{ userLat, setUserLat }}>
        <div className={classes.root}>
          <CssBaseline />

          <NavigationDrawer lat={userLat} lng={userLng} />
          <main className={classes.content}>
            <div className={classes.toolbar}></div>

            <Gmaps lat={userLat} lng={userLng} />
          </main>
        </div>
      </LatitudeContext.Provider>
    </LongitudeContext.Provider>
  );
}

export default Home;
