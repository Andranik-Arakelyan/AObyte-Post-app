import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchAuthors } from "./authorApi";

function Author({ authorValue, inputValue, handleChange, handleInputChange }) {
  const [fetching, setFetching] = useState(true);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetchAuthors().then(({ data }) => {
      setAuthors(data.usernames);
    });
    setFetching(false);
  }, []);

  return (
    !fetching && (
      <div>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          value={authorValue}
          onChange={handleChange}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          options={authors}
          sx={{ width: 260 }}
          renderInput={(params) => (
            <TextField {...params} label="Choose author" />
          )}
        />
      </div>
    )
  );
}

export default Author;
