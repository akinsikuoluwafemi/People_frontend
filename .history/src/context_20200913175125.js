import React, { Component, createContext } from 'react'

const LatitudeContext = createContext();
const LongitudeContext = createContext();
const ChatContext = createContext();
const RequestContext = createContext();



export default class ContextProvider extends Component {
    
    
    
    render() {
        return (
            <ContextProvider>
                
            </ContextProvider>
        )
    }
}
