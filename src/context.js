import React, { Component, createContext } from 'react'

// const LatitudeContext = createContext();
// const LongitudeContext = createContext();
// const ChatContext = createContext();

const RequestContext = createContext();



export default class RequestProvider extends Component {
  state = {
    showChat: null,
    userLat: 0,
    userLng: 0,
  };

  componentDidMount() {
    this.getUserLocation();
      
  }

  getUserLocation = () => {
      window.navigator.geolocation.getCurrentPosition(
         (position) => {
          let { latitude, longitude } = position.coords;
              this.setState({
                  userLat: latitude,
                  userLng: longitude
             })
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
      )
  } 

  render() {
    return (
      <RequestContext.Provider
        value={{ ...this.state, getUserLocation: this.getUserLocation }}
      >
        {this.props.children}
      </RequestContext.Provider>
    );
  }
}


const RequestConsumer = RequestContext.Consumer;

export { RequestProvider, RequestConsumer, RequestContext };
