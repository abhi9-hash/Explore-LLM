import React, { Fragment, useEffect } from "react";
// import { cgMouse } from 'react-icons/ai'
import "./Home.css";
import MetaData from "../../layout/MetaData";
import { clearingError, getFeaturedModels } from "../../../actions/ModelAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../layout/loader/Loader";
import { useAlert } from "react-alert";
import ModelCard from "../../shared/model-card/ModelCard";

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, featuredModels } = useSelector((state) => state.models);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearingError);
    }
    dispatch(getFeaturedModels());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"SmartChoice"} />
          <div className="banner">
            <p>Welcome to SmartChoice</p>
            <h1>Find Amazing LLMs Here</h1>

            <a href="#container">
              <button>Explore</button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Models</h2>

          <div className="container" id="container">
            {featuredModels?.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
