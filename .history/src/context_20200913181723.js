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

  componentDidMount() {}

  getUserLocation = () => {
      window.navigator.geolocation.getCurrentPosition(
         (position) => {
             
          },
         (error) 
      )
  } 

  render() {
    return (
      <RequestContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </RequestContext.Provider>
    );
  }
}


const RequestConsumer = RequestContext.Consumer;

export { RequestProvider, RequestConsumer, RequestContext };
