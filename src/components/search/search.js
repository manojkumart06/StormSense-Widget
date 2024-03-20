import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";
import './search.css'

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("Response from API:", response); // Add this console log
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.name}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((error) => {
        console.error("Error fetching options:", error); // Add this console log
        return { options: [] }; // or handle error accordingly
      });
  };
  

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <div className="search-container"> 
    <AsyncPaginate
      placeholder="Search for city..."
      debounceTimeout={500}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  </div>
  );
};

export default Search;