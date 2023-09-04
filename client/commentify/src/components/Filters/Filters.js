import React, { useState } from "react";
import { Box, Button, Divider, Drawer } from "@mui/material";
import filterIcon from "../../assets/filter.svg";
import Categories from "./Categories";
import { useLocation, useNavigate } from "react-router-dom";
import Author from "./Author";
import CreationDate from "./CreationDate";
import { HOME_PAGE } from "../../constants/path";
import { useDispatch } from "react-redux";
import { changePage, setFilters } from "../../features/posts/postsSlice";
import Sort from "./Sort";

import { loginStyle } from "../../constants";
import classes from "./Filters.module.css";

function Filters() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryQuery = queryParams.get("categories")?.split(",");
  const authorQuery = queryParams.get("author");
  const date = queryParams.get("date");
  const sort = queryParams.get("sort");

  const defaultSortBy = sort
    ? sort === "new" || sort === "old"
      ? "date"
      : "like"
    : "";

  const [drawer, setDrawer] = useState(false);
  const [categories, setCategories] = useState(categoryQuery || []);

  const [author, setAuthor] = useState(authorQuery);
  const [inputValue, setInputValue] = useState("");

  const [creationDate, setCreationDate] = useState(date);
  const [sortBy, setSortBy] = useState(defaultSortBy);
  const [sortValue, setSortValue] = useState(sort || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    setDrawer(open);
  };

  const handleAuthorChange = (event, newAuthor) => {
    setAuthor(newAuthor);
  };

  const handleInputChange = (event, newValue) => {
    setInputValue(newValue);
  };

  const handleCreationDate = (e) => {
    setCreationDate(e.target.value);
  };

  const handleCategoryChange = (e) => {
    let newCategories;
    if (categories.includes(e.target.name)) {
      newCategories = categories.filter(
        (category) => category !== e.target.name
      );
    } else {
      newCategories = [...categories, e.target.name];
    }
    setCategories(newCategories);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSortValueChange = (e) => {
    setSortValue(e.target.value);
  };

  const applyFilters = () => {
    const filters = { categories, date: creationDate, author, sort };
    queryParams.set("page", 1);

    if (author) {
      queryParams.set("author", author);
    } else {
      queryParams.delete("author");
    }

    if (creationDate) {
      queryParams.set("date", creationDate);
    } else {
      queryParams.delete("date");
    }

    if (categories.length) {
      queryParams.set("categories", categories);
    } else {
      queryParams.delete("categories");
    }

    if (sortValue) {
      queryParams.set("sort", sortValue);
    } else {
      queryParams.delete("sort");
    }

    setDrawer(false);
    navigate(`${HOME_PAGE}?${queryParams.toString()}`);
    dispatch(setFilters(filters));
  };

  const content = () => (
    <Box className={classes.box} role="presentation">
      <Categories state={categories} handleChange={handleCategoryChange} />
      <Divider />
      <Author
        authorValue={author}
        inputValue={inputValue}
        handleChange={handleAuthorChange}
        handleInputChange={handleInputChange}
      />
      <Divider />
      <CreationDate value={creationDate} handleChange={handleCreationDate} />
      <Divider />
      <Sort
        sortBy={sortBy}
        sortValue={sortValue}
        changeSortBy={handleSortByChange}
        changeSortValue={handleSortValueChange}
      />
      <Button style={loginStyle} onClick={applyFilters}>
        Apply Filters
      </Button>
    </Box>
  );

  return (
    <div className={classes.filter}>
      <Button
        style={loginStyle}
        variant="outlined"
        onClick={toggleDrawer(true)}
      >
        <span>Filters</span>
        <img src={filterIcon} alt="like" />
      </Button>
      <Drawer
        className={classes.drawer}
        anchor="right"
        open={drawer}
        onClose={toggleDrawer(false)}
        sx={{ zIndex: "3000" }}
      >
        {content()}
      </Drawer>
    </div>
  );
}

export default Filters;
