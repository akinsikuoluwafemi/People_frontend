import React, { Component, createContext } from 'react'

const LatitudeContext = createContext();
const LongitudeContext = createContext();
const ChatContext = createContext();
const RequestContext = createContext();



export default class RequestProvider extends Component {
    state = {
        
    }
    
    
    render() {
        return (
            <RequestContext.Provider value="hello">
                
            </RequestContext.Provider>
        )
    }
}
