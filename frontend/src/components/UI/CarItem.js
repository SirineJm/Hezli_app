import React from "react";

const CarItem = (props) => {
  const { category, type, imgUrl, carName} = props.item;
  return (
    <div className="car__item">
      <div className="car__item-top">
        <div className="car__item-tile">
          <h3>{carName}</h3>
          <span>
            <i class="ri-heart-line"></i>
          </span>
        </div>
        <p>{category}</p>
      </div>

      <div className="car__img">
        <img src={imgUrl} alt="" />
      </div>

      <div className="car__item-bottom">
        <div className="car__bottom-left">
          <p>
            <i class="ri-repeat-line"></i>
            {type}
          </p>
        </div>

        
      </div>
    </div>
  );
};

export default CarItem;
