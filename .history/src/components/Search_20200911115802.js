import React, {useState, useEffect, useContext} from 'react';
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
// import { GoogleMap as GoogleMapp, withScriptjs, withGoogleMap } from 'react-google-maps';
import { formatRelative } from 'date-fns';
import { LatitudeContext, LongitudeContext } from "./LocationContext";
import requestData from "./requestData.json";




export const Map = () => {
  const [userLat, setUserLat] = useState(0);
    const [userLng, setUserLng] = useState(0);
    

  const [requestArr, setRequestArr] = useState(requestData);



  useEffect(() => {
    getUserLocation();


    requestArr.data.map(request => {
      console.log(request)
    })

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

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: `AIzaSyBniFhD5gyPyOrEm212cVIAYVythPk2JcE`,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";
  console.log(requestArr);
  
  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={center}>
      {requestArr.data.map((request) => (
        <Marker
          key={request.id}
          position={{ lat: request.location[0], lng: request.location[1] }}

        />
      ))}


     

      
    </GoogleMap>
  );
};


// const Map = () => {
//     const [userLat, setUserLat] = useState(0);
//     const [userLng, setUserLng] = useState(0);

//     const [requestArr, setRequestArr] = useState(requestData);

//     useEffect(() => {
//       getUserLocation();
//     }, []);

//       const getUserLocation = () => {
//         window.navigator.geolocation.getCurrentPosition(
//           (position) => {
//             let { latitude, longitude } = position.coords;
//             console.log(latitude, longitude);
//             setUserLat(latitude);
//             setUserLng(longitude);
//           },
//           (error) => {
//             if (error.code === 1) {
//               // setLat(do something)
//               // setLng(do something)
//               alert(
//                 "Kindly allow location, for a more immersive experience with the app."
//               );
//               console.log(error);
//             }
//           }
//         );
//       };

 

//   return <GoogleMapp
//     defaultZoom={10}
//     defaultCenter={{
//       lat: userLat,
//       lng: userLng
//     }}
//   >


//   </GoogleMapp>;
// }







// const WrappedMap = withScriptjs(withGoogleMap(Map));

// export const MapHolder = () => {
//   return (
//     <div>
      
//       <WrappedMap
//         googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBniFhD5gyPyOrEm212cVIAYVythPk2JcE`}
//         loadingElement={<div style={{ height: "100%" }} />}
//         containerElement={<div style={{ height: "100%" }} />}
//         mapElement={<div style={{ height: "100%" }} />}
//       />
//     </div>
//   );
// };




export const Search =() => {
    


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
    
    
    // change the location later
    const { ready, value, suggestions: {status, data}, setValue, clearSuggestions } = usePlacesAutocomplete({
      requestOptions: {
            location: { lat: () => userLat, lng: () => userLng },
            radius: 200 * 1000,
      },
    });
    
    // console.log(userLat)
    
    return (
      <div>
        <Combobox
          onSelect={(address) => {
            console.log(address);
          }}
        >
          {/* <ComboboxInput
            // disabled={!ready}
            placeholder="Enter a location"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          /> */}

          <TextField
            // disabled={!ready}

            autoFocus
            margin="dense"
            id="location"
            label="location"
            type="location"
            variant="outlined"
            // fullWidth
            onChange={(e) => {
              setValue(e.target.value);
            }}
            value={value}
          />


          <ComboboxPopover>
            {status === "OK" &&
              data.map((id, description) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxPopover>
        </Combobox>
      </div>
    );
}
