import React, {use} from 'react';
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


const libraries = ["places"];
const mapContainerStyle = {
    width: "100vw",
    height: "100vh"
}


export const Map = () => {
  const [userLat, setUserLat] = useState(0);
  const [userLng, setUserLng] = useState(0);

  useEffect(() => {
    // getUserLocation();
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

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: `AIzaSyBniFhD5gyPyOrEm212cVIAYVythPk2JcE`,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
      ></GoogleMap>
    </div>
  );
};





export const Search =() => {
    // change the location later
    const { ready, value, suggestions: {status, data}, setValue, clearSuggestions } = usePlacesAutocomplete({
      requestOptions: {
            location: { lat: () => 6.524379, lng: () => 6.524379 },
            radius: 200 * 1000,
      },
    });
    
    
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
            fullWidth
            onChange={(e) => {
              setValue(e.target.value);
            }}
            value={value}
                />
                
                <ComboboxPopover>
                    {status === "OK" && data.map((id, description) =>
                        <ComboboxOption 
                            key={id}
                            value={description}
                    
                    
                    />)}

            </ComboboxPopover>


        </Combobox>
      </div>
    );
}
