import React, { useEffect, useState, useContext } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import NavigationDrawer from "../components/NavigationDrawer";


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

function CreateRequest() {
  //   const [userLat, setUserLat] = useState(0);
  //   const [userLng, setUserLng] = useState(0);

  useEffect(() => {
    // getUserLocation();
  }, []);

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

        <Typography>
          Create a request. If after 24 hrs, your request has not been fulfilled
          you can republish it, thanks alot.{" "}
          <strong>PS: You have to fill in your location</strong>
        </Typography>

        <div class="row">
          <div class="col-lg-4  col-10"></div>
          <div class="col-lg-4 col-10    m-auto">
            <form onSubmit={handleSubmit}>
              {/* <br /> */}

              <Button
                variant="contained"
                color="primary"
                // className={classes.button}
                type="submit"
              >
                Submit
              </Button>
            </form>
          </div>
          <div class="col-lg-4  col-10"></div>
        </div>
      </main>
    </div>
  );
}

export default CreateRequest;
