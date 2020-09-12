import React, {useState, useEffect, useContext, useRef, useCallback} from 'react';
import './Search.scss';
import TextField from "@material-ui/core/TextField";
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

import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { LatitudeContext, LongitudeContext } from "./LocationContext";
import requestData from "../data/requestData.json";
import mapStyles from '../mapStyles';
import { ChatContext } from './LocationContext';


export const Map = () => {
  const [userLat, setUserLat] = useState(0);
    const [userLng, setUserLng] = useState(0);
    

  const [requestArr, setRequestArr] = useState(requestData);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showChat, setShowChat] = useState(false);

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

    const libraries = ["places"];
    const mapContainerStyle = {
      width: "100vw",
      height: "100vh",
    };

    const center = {
      lat: userLat,
      lng: userLng,
    };

  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: `AIzaSyBniFhD5gyPyOrEm212cVIAYVythPk2JcE`,
    libraries,
  });


  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, [])

  const handleChat = () => {
    setShowChat(true);
    alert(' chat showing true and map is not')
  }

  

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";
  console.log(requestArr);
  
  return (
    <ChatContext.Provider>

    </ChatContext.Provider>
    
  );
};




// export const Search =() => {
    


//     const [userLat, setUserLat] = useState(0);
//     const [userLng, setUserLng] = useState(0);

//     useEffect(() => {
//       getUserLocation();
//     }, []);

//     const getUserLocation = () => {
//       window.navigator.geolocation.getCurrentPosition(
//         (position) => {
//           let { latitude, longitude } = position.coords;
//           console.log(latitude, longitude);
//           setUserLat(latitude);
//           setUserLng(longitude);
//         },
//         (error) => {
//           if (error.code === 1) {
//             // setLat(do something)
//             // setLng(do something)
//             alert(
//               "Kindly allow location, for a more immersive experience with the app."
//             );
//             console.log(error);
//           }
//         }
//       );
//     };
    
    
//     // change the location later
//     const { ready, value, suggestions: {status, data}, setValue, clearSuggestions } = usePlacesAutocomplete({
//       requestOptions: { 
//             location: { lat: () => userLat, lng: () => userLng },
//             radius: 200 * 1000,
//       },
//     });
    
//     // console.log(userLat)
    
//     return (
//       <div className="">
//         <Combobox
//           style={{ zIndex: "100000" }}
//           onSelect={(address) => {
//             console.log(address);
//             alert(address)
//           }}
//         >
//           <ComboboxInput
//             style={{ zIndex: "100000" }}
//             disabled={!ready}
//             placeholder="Enter a location"
//             value={value}
//             onChange={(e) => {
//               setValue(e.target.value);
//             }}
//           />

//           {/* <TextField
//             disabled={!ready} 

//             autoFocus
//             margin="dense"
//             id="location"
//             label="location"
//             type="location"
//             variant="outlined"
//             // fullWidth
//             onChange={(e) => {
//               setValue(e.target.value);
//             }}
//             value={value}
//           />  */}

//           <ComboboxPopover style={{ zIndex: "100000" }}>
//             {status === "OK" &&
//               data.map(({ id, description }) => (
//                 <ComboboxOption key={id} value={description} />
//               ))}
//           </ComboboxPopover>
//         </Combobox>
//       </div>
//     );
// }
