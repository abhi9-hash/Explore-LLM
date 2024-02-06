import React, { useState, Fragment, useMemo } from "react";
import MetaData from "../../layout/MetaData";
import "./Search.css";
import { clearingError, getFilteredModel } from "../../../actions/ModelAction";
import { useDispatch, useSelector } from "react-redux";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { models, filteredModels, error } = useSelector(
    (state) => state.models
  );

  const dispatch = useDispatch();

  const searchedModels = useMemo(() => {
    console.log({ models });
    if (searchQuery != "")
      return models?.filter((model) =>
        Object.values(model).some((prop) =>
          prop.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    else return filteredModels;
  }, [models, filteredModels, searchQuery]);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (error) {
        alert.error(error);
        dispatch(clearingError);
      }
      dispatch(getFilteredModel(searchedModels));
    } else dispatch(getFilteredModel(models));
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
