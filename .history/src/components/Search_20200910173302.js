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
    // change the location later
    const {} = usePlacesAutocomplete({
      requestOptions: {
            location: { lat: () => 6.524379, lng: () => 6.524379 },
            radius: 200
      },
    });
    
    
    return (
        <div>
            
        </div>
    )
}
