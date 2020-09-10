import React from 'react';
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
    
    const { } = usePlacesAutocomplete({
        requestOptions: {
            location: {lat: lng: }
        }
    })
    
    
    return (
        <div>
            
        </div>
    )
}
