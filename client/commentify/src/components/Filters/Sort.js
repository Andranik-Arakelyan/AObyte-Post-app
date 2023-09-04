import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";

import classes from "./Filters.module.css";

function Sort({ sortBy, sortValue, changeSortBy, changeSortValue }) {
  return (
    <div className={classes.sorting}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortBy}
          label="Sort by"
          onChange={changeSortBy}
          MenuProps={{
            style: {
              zIndex: 3000,
            },
          }}
        >
          <MenuItem value={"date"}>Creation Date</MenuItem>
          <MenuItem value={"like"}>Count of Likes</MenuItem>
        </Select>
      </FormControl>
      {sortBy && (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Show</InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sortValue}
            label="Show"
            onChange={changeSortValue}
            MenuProps={{
              style: {
                zIndex: 3000,
              },
            }}
          >
            {sortBy === "date"
              ? [
                  <MenuItem key="new" value={"new"}>
                    Newest
                  </MenuItem>,
                  <MenuItem key="old" value={"old"}>
                    Oldest
                  </MenuItem>,
                ]
              : [
                  <MenuItem key="good" value={"good"}>
                    With most likes
                  </MenuItem>,
                  <MenuItem key="bad" value={"bad"}>
                    With least likes
                  </MenuItem>,
                ]}
          </Select>
        </FormControl>
      )}
    </div>
  );
}

export default Sort;
