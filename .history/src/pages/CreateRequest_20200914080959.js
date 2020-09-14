import React, { useEffect, useState, useContext, useCallback } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import NavigationDrawer from "../components/NavigationDrawer";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import requestData from '../data/requestData.json';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { LatitudeContext, LongitudeContext, QueriedLocationContext } from '../components/Context';

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

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

//

//

export const CreateRequest =()=> {
    const [userLat, setUserLat] = useState(0);
    const [userLng, setUserLng] = useState(0);

  useEffect(() => {
    getUserLocation();
  }, []);

    const getUserLocation = () => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          let { latitude, longitude } = position.coords;
          console.log(latitude, longitude);
          setUserLat(latitude);
          setUserLng(longitude);
        },
        (error) => {
          if (error.code === 1) {
            // setLat(do something)
            // setLng(do something)
            alert(
              "Kindly allow location, for a more immersive experience with the app."
            );
            console.log(error);
          }
        }
      );
    };
  const classes = useStyles();

  

    const [requestType, setRequestType] = useState({});
    const [statusType, setStatusType] = useState("unfufilled");
    const [description, setDescription] = useState("");
  const [requestArr, setRequestArr] = useState(requestData);
  
  const [query, setQuery] = useState(null)
  const [queryLat,setQueryLat] = useState(null)
  const [queryLng, setQueryLng] = useState(null)
  const [getQueriedLocation, setGetQueriedLocation] = useState(false)


     const {
       ready,
       value,
       suggestions: { status, data },
       setValue,
       clearSuggestions,
     } = usePlacesAutocomplete({
       requestOptions: {
         location: { lat: () => userLat, lng: () => userLng },
         radius: 200 * 1000,
       },
     });


    const handleType = (e) => {
      setRequestType(e.target.value);
    };


  const handleStatus = (e) => {
    setStatusType(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

   
    
    const handleSubmit = (e) => {
      e.preventDefault()
        console.log("submitted");
      let newRequest = {
        id: new Date(),
        description: description,
        type: requestType,
        location: {
          lat: queryLat,
          lng: queryLng,
        },
        statusType: statusType,
        responders: [],
          requester: "femi",
        query: query
        // created: new Date()
      };

      // let data = JSON.stringify(newRequest);
      // let tempRequest = [data, ...requestData]
      // console.log(tempRequest)
      // setRequestArr(tempRequest);
      // console.log(tempRequest.length)

      console.log(newRequest);
      setGetQueriedLocation(true)
    };


  

  return (
    <div className={classes.root}>
      <CssBaseline />

      <NavigationDrawer />
      <QueriedLocationContext.Provider
        value={{ getQueriedLocation, setGetQueriedLocation }}
      >



      </QueriedLocationContext.Provider>
      
    </div>
  );
}





export const Search = () => {
  const [userLat, setUserLat] = useState(0);
    const [userLng, setUserLng] = useState(0);
    const [address, setAddress] = useState({
        lat: 0,
        lng: 0
    });

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        let { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
        setUserLat(latitude);
        setUserLng(longitude);
      },
      (error) => {
        if (error.code === 1) {
          // setLat(do something)
          // setLng(do something)
          alert(
            "Kindly allow location, for a more immersive experience with the app."
          );
          console.log(error);
        }
      }
    );
  };

  // change the location later
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => userLat, lng: () => userLng },
      radius: 200 * 1000,
    },
  });

  console.log(address)

  return (
      <div className="search">
        <Combobox
          onSelect={async (address) => {
            console.log(address);

            try {
              const results = await getGeocode({ address });
              const { lat, lng } = await getLatLng(results[0]);
              setAddress({
                lat,
                lng,
              });
              console.log(lat, lng);
            } catch (error) {
              console.log("error");
            }
          }}
        >
          <ComboboxInput
            disabled={!ready}
            placeholder="Enter a location"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />

        
          <ComboboxPopover>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxPopover>
        </Combobox>
      </div>
  );
};