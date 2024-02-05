import React, { useState, Fragment } from "react";
import MetaData from "../../layout/MetaData";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import { getFilteredModel } from "../../../actions/ModelAction";
import { useDispatch } from "react-redux";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(getFilteredModel({ searchQuery }));
    } else {
      navigate("/models");
    }
  };

  return (
    <Fragment>
      <MetaData title="Search A Model -- ECOMMERCE" />

      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Model ..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </Fragment>
  );
};

export default Search;
