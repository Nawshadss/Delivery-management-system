import React from "react";
import Heading from "./Heading";

const DeliverayCard = ({ data }) => {
  const num = (data.averageRatings / data.totalParcelDelivered).toFixed(2);

  return (
    <div>
      <div className="card w-96 h-96 bg-base-100 shadow-xl border">
        <figure className="p-5">
          <img
            className="rounded-lg hover:scale-125 transition-all "
            src={data.image}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className=" text-[#192a56] font-bold text-3xl text-center">
            {data.name}
          </h2>
          <p className="font-bold flex items-center justify-center text-2xl">
            Total Delivary:
            <span className="text-[#1F8FFF] text-center">
              {data.totalParcelDelivered}
            </span>
          </p>
          <p className="font-bold flex justify-center items-center text-2xl">
            Avarage Rating:
            <span className="text-[#1F8FFF] text-center">{num}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliverayCard;
