import React from 'react';
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







export const Search () {
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
