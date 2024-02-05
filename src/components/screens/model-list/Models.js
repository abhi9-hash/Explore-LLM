import React, { Fragment, useEffect } from "react";
import "./Models.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearingError,
  getModel,
} from "../../../actions/ModelAction";
import Loader from "../../layout/loader/Loader";
import ModelCard from "../../shared/model-card/ModelCard";
import { useAlert } from "react-alert";
import MetaData from "../../layout/MetaData";
import FilterBox from "../../shared/filter-box/FilterBox";
import Search from "../../shared/search/Search";

const Models = () => {
  const dispatch = useDispatch();
  const {
    models,
    loading,
    error,
  } = useSelector((state) => state.models);
  const alert = useAlert();



  // const params = useParams();
  // const keyword = params.keyword;

  // const [currentPage, setCurrentPage] = useState(1);

  // const [filters, setFilters] = useState({
  //   price: [0, 150000],
  //   category: "",
  //   ratings: 0,
  // });

  // const [secodnCall, setSecondCall] = useState(false);

  // const setCurrentPageNo = (e) => {
  //   setCurrentPage(e);
  // };

  // const filterHandler = (name, value) => {
  //   console.log({ name, value });
  //   // console.log({...filters,[event.target.name]:event.target.value})
  //   setFilters({ ...filters, [name]: value });
  // };

  console.log(models);
  useEffect(() => {
    console.log(models);
    if (error) {
      alert.error(error);
      dispatch(clearingError);
    }
    dispatch(getModel());
  }, [dispatch]);

  // useEffect(() => {
  //   console.log(models);
  //   if (error) {
  //     alert.error(error);
  //     dispatch(clearingError);
  //   }

  //   if (secodnCall) {
  //     dispatch(getFilteredModel(filters));
  //   }
  // }, [secodnCall, keyword, currentPage, filters, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`Models--SmartChoice`} />
          <Search />
          <h2 className="modelsHeading"> Models </h2>

          <div className="modelsWrapper">
            {/* <div style={{width:'10vw'}}> */}
            <FilterBox />
            {/* </div> */}
            <div className="models">
              {models?.map((model) => (
                <ModelCard key={model.id} model={model} />
              ))}
            </div>
          </div>

          {/* <div className="filterBox">
            <Typography>
              <b>Price</b>
            </Typography>
            <Slider
              value={filters.price}
              name="price"
              onChange={(_, value) => filterHandler("price", value)}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={150000}
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
                    filterHandler("category", category)}}
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
                dispatch(getProduct());
              }}
            >
              Reset Filters
            </button>
          </div> */}

          {/* <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={8}
              totalItemsCount={models?.length()}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div> */}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Models;
