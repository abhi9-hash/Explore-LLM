import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useNavigate, useParams } from "react-router-dom";
import "./ModelDetails.css";
import { useDispatch, useSelector } from "react-redux";

import { clearingError, getModelDetails } from "../../../actions/ModelAction";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "../../shared/review-card/ReviewCard.js";
import Loader from "../../layout/loader/Loader";
import { useAlert } from "react-alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Model from "../../models/Model";

const ModelDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { model, error, loading } = useSelector((state) => state.modelDetails);
  const options = {
    size: "large",
    value: model?.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const router = useNavigate();
  window.scrollTo({ top: 0, left: 0 });
  const [open, setOpen] = useState(false);
  const [showTryOutSection, setShowTryOutSection] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const tryOutToggle = () => {
    setShowTryOutSection(true);
    router("#model");
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", params.id);

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearingError);
    }

    dispatch(getModelDetails(params.id));
  }, [dispatch, params.id, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="modelDetails">
            <div className="carousel-div">
              <Carousel height={400} className="carousel">
                {model?.images?.map((item, i) => (
                  <img
                    width="100%"
                    height="100%"
                    className="CarouselImage"
                    key={item.url}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{model.name}</h2>
                <p>Product # {model._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({model.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h3>{`${model.category} Model`}</h3>
                {/* <div className="detailsBlock-3-1"> */}
                <button onClick={tryOutToggle} className="submitButton">
                  <a className="submitButtonLink" href="#model">
                    Try It Out
                  </a>
                </button>
                {/* </div> */}

                <p>
                  Service Status:
                  <b className={!model.inService ? "redColor" : "greenColor"}>
                    {!model.inService ? " Out Of Service" : " In Service"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description : <p>{model.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitButton">
                Submit Review
              </button>

              <Dialog
                aria-labelledby="simple-dialog-title"
                open={open}
                onClose={submitReviewToggle}
              >
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent className="submitDialog">
                  <Rating
                    onChange={(e) => setRating(e.target.value)}
                    value={rating}
                    size="large"
                  />

                  <textarea
                    className="submitDialogTextArea"
                    cols="30"
                    rows="5"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </DialogContent>
                <DialogActions>
                  <Button onClick={submitReviewToggle} color="secondary">
                    Cancel
                  </Button>
                  <Button onClick={reviewSubmitHandler} color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
          {showTryOutSection && (
            <Model category={model.category} code={model.code} />
          )}

          <h3 className="reviewsHeading">REVIEWS</h3>

          {model.reviews && model.reviews[0] ? (
            <div className="reviews">
              {model.reviews &&
                model.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ModelDetails;
