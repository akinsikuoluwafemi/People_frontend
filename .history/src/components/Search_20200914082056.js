import React, {useState, useEffect, useContext, useRef, useCallback} from 'react';
import './Search.scss';
import TextField from "@material-ui/core/TextField";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { LatitudeContext, LongitudeContext, ChatContext, QueriedLocationContext } from "./Context";
import requestData from "../data/requestData.json";
import mapStyles from '../mapStyles';



export const Map = () => {
  
    
  let { userLat, setUserLat } = useContext(LatitudeContext);
  let { userLng, setUserLng } = useContext(LongitudeContext);

  const [requestArr, setRequestArr] = useState(requestData);
  const [selectedRequest, setSelectedRequest] = useState(null);

  let {showChat, setShowChat} = useContext(ChatContext)
  const [getQueriedLocation, setGetQueriedLocation] = useState(false);

  // let { getQueriedLocation, setGetQueriedLocation } = useContext(QueriedLocationContext);
  // console.log(`getqUERIEDlOCATION IS ${getQueriedLocation}`)


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
    // disableDefaultUI: true,
    // zoomControl: true
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
    console.log(showChat);
  }

  

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";
  console.log(requestArr);
  
  return (
    <QueriedLocationContext.Provider
        value={{ getQueriedLocation, setGetQueriedLocation }}
      ></QueriedLocationContext.Provider>
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {requestArr.data.map((request) => (
          <Marker
            key={request.id}
            position={{
              lat: request.location[0],
              lng: request.location[1],
            }}
            icon={{
              url: `http://maps.google.com/mapfiles/ms/icons/${
                request.status === "unfulfilled" ? `pink-dot` : `green-dot`
              }.png`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
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
              <h6>Description: {selectedRequest.description}</h6>
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
                  <li className="ul-info">[{name}]</li>
                ))}
              </p>

              <p>requester:{selectedRequest.requester}</p>
              <button onClick={handleChat} className="btn-sm btn-success">
                Volunteer
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
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
