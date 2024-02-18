import React from 'react'
import ReactStars from 'react-rating-stars-component';

const ReviewCard = ({review}) => {
    const options = {
        edit:false,
        value: review.rating,
        readOnly: true,
        precision: 0.5,
        isHalf:true
      };
  return (
    <div className="reviewCard">
        <p>{review.name}</p>
        <ReactStars {...options}/>
        <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard
