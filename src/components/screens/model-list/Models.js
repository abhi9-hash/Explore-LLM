import React, { Fragment, useEffect } from "react";
import "./Models.css";
import { useSelector, useDispatch } from "react-redux";
import { clearingError, getModel } from "../../../actions/ModelAction";
import Loader from "../../layout/loader/Loader";
import ModelCard from "../../shared/model-card/ModelCard";
import { useAlert } from "react-alert";
import MetaData from "../../layout/MetaData";
import FilterBox from "../../shared/filter-box/FilterBox";
import Search from "../../shared/search/Search";

const Models = () => {
  const dispatch = useDispatch();
  const { models, filteredModels, loading, error } = useSelector(
    (state) => state.models
  );
  const alert = useAlert();

  // const params = useParams();
  // const keyword = params.keyword;

  // const [currentPage, setCurrentPage] = useState(1);

  // const setCurrentPageNo = (e) => {
  //   setCurrentPage(e);
  // };

  console.log({ models, filteredModels });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearingError);
    }
    dispatch(getModel());
  }, [dispatch]);

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
              {(filteredModels ? filteredModels : models)?.map((model) => (
                <ModelCard key={model.id} model={model} />
              ))}
            </div>
          </div>

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
