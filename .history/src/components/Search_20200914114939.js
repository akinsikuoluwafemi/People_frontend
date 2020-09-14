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

