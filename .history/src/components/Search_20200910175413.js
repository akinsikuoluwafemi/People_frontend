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

export default function Search() {
    // change the location later
    const { ready, value, suggestions: {status, data}, setValue, clearSuggestions } = usePlacesAutocomplete({
      requestOptions: {
            location: { lat: () => 6.524379, lng: () => 6.524379 },
            radius: 200 * 1000,
      },
    });
    
    
    return (
      <div className="search">
        <Combobox
          onSelect={(address) => {
            console.log(address);
          }}
        >
          <ComboboxInput
            // disabled={!ready}
            placeholder="Enter a location"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="location"
            label="location"
            type="location"
            fullWidth
            onChange={handleDescription}
            value={description}
          />
        </Combobox>
      </div>
    );
}
