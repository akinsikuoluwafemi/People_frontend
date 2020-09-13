import React, { Component, createContext } from 'react'

const LatitudeContext = createContext();
const LongitudeContext = createContext();
const ChatContext = createContext();
const RequestContext = createContext();



export default class RequestProvider extends Component {
    
    
    
    render() {
        return (
            <ContextProvider>
                
            </ContextProvider>
        )
    }
}
