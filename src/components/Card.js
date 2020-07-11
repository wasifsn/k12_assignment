import React, { useRef } from "react";

const Card = React.forwardRef(({ data }, ref) => {
  return (
    <>
      <div ref={ref} className="card-container">
        <img src={data.avatar} />
        <div className="user-details">
          <h2>{data.last_name}</h2>
          <p>{data.first_name}</p>
          <p className="user-email">{data.email}</p>
        </div>
      </div>
    </>
  );
});

export default Card;
