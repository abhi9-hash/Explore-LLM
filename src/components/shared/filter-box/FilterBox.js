import React, { Fragment, useEffect, useState } from "react";
import "./FilterBox.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearingError,
  getFilteredModel,
  getModel,
} from "../../../actions/ModelAction";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";

const categories = [
'text-to-text',
'text-to-speech',
'text-to-image',
'image-to-text'
];

const FilterBox = () => {
  const dispatch = useDispatch();
  const {
    models,
    error,
  } = useSelector((state) => state.models);

  const [filters, setFilters] = useState({
    numOfReviews: [0, 150],
    category: "",
    ratings: 0,
  });

  const alert = useAlert();

  const filterHandler = (name, value) => {
    console.log({ name, value });
    setFilters({ ...filters, [name]: value });
  };


  useEffect(() => {
    console.log(models);
    if (error) {
      alert.error(error);
      dispatch(clearingError);
    }

      dispatch(getFilteredModel(filters));

  }, [ filters, error, alert]);
  return (
    <Fragment>
      <div className="filterBox">
        <Typography>
          <b>No. of Reviews</b>
        </Typography>
        <Slider
          value={filters.numOfReviews}
          name="numOfReviews"
          onChange={(_, value) => filterHandler("numOfReviews", value)}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={150}
        />

        <Typography>
          <b>Categories</b>
        </Typography>
        <ul className="categoryBox">
          {categories.map((category) => (
            <li
              className="category-link"
              key={category}
              value={filters.category}
              name="category"
              onClick={(_) => {
                // console.log({e})
                filterHandler("category", category);
              }}
            >
              {category}
            </li>
          ))}
        </ul>

        <fieldset>
          <Typography component="legend">
            <b>Ratings Above</b>
          </Typography>
          <Slider
            value={filters.ratings}
            name="ratings"
            onChange={(_, value) => filterHandler("ratings", value)}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            min={0}
            max={5}
          />
        </fieldset>
        <button
          className="filter-button"
          onClick={() => {
            dispatch(getModel());
          }}
        >
          Reset Filters
        </button>
      </div>
    </Fragment>
  );
};

export default FilterBox;
