import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";
import './search.css'

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [optionsError, setOptionsError] = useState(null);

  const loadOptions = (inputValue) => {
    setLoadingOptions(true);
    setOptionsError(null); // Reset error state

    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("Response from API:", response);
        setLoadingOptions(false); // Set loading state to false when options are fetched
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
        console.error("Error fetching options:", error);
        setOptionsError("Failed to fetch options"); // Set error state with appropriate message
        setLoadingOptions(false); // Set loading state to false when error occurs
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
        debounceTimeout={900}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
      {/* Conditionally render loading indicator or error message */}
      {loadingOptions && <p>Loading options...</p>}
      {optionsError && <p>{optionsError}</p>}
    </div>
  );
};


export default Search;