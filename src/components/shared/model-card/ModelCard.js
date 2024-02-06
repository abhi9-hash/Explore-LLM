import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./ModelCard.css";

const ModelCard = ({ model }) => {
  const options = {
    value: model.ratings,
    readOnly: true,
    precision: 0.5,
    isHalf: true,
  };
  return (
    <Link className="modelCard" to={`/model/${model.id}`}>
      <img
        src={model.images[0].url}
        alt={model.name}
        width="100%"
        height="100%"
      />
      <p>{model.name}</p>
      <div style={{ display: "block" }}>
        <ReactStars {...options} />
        <span className="modelCardSpan">({model.numOfReviews} reviews)</span>
      </div>
      <span>{`${model.category} Model`}</span>
    </Link>
  );
};

export default ModelCard;
