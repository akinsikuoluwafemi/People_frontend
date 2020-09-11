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
import { formatRelative } from 'date-fns';
import { LatitudeContext, LongitudeContext } from "./LocationContext";
import requestData from "../data/requestData.json";




export const Map = () => {
  const [userLat, setUserLat] = useState(0);
    const [userLng, setUserLng] = useState(0);
    

  const [requestArr, setRequestArr] = useState(requestData);
  const [selectedRequest, setSelectedRequest] = useState(null);


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
          position={{
            lat: request.location[0],
            lng: request.location[1],
          }}
          onClick={() => {
            setSelectedRequest(request);
          }}
        />
      ))}

      {selectedRequest && (
        <InfoWindow
          position={{
            lat: selectedRequest.location[0],
            lng: selectedRequest.location[1],
          }}
          onCloseClick={() => {
            setSelectedRequest(null);
          }}
        >
          <div>
            <p>{selectedRequest.description}</p>
            <p>type: {selectedRequest.type}</p>
            <p>
              lat: {selectedRequest.location[0]}, lng:{" "}
              {selectedRequest.location[1]}
            </p>
            <p>Location: {selectedRequest.query}</p>
            <p>status: {selectedRequest.status}</p>
            <p>
              responders:{" "}
              {selectedRequest.responders.map((name) => (
                
))}
            </p>

            <p>requester: {selectedRequest.requester}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};




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
