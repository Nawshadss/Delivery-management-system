import React from "react";
import "../App.css";

const HomeCard = ({ image, title, para }) => {
  return (
    <div>
      <div className="card bg w-96 h-[350px] shadow-xl border border-[##1F8FFF]   my-2">
        <figure className="px-10 pt-10">
          <img src={image} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-[#1F8FFF] font-bold">{title}</h2>
          <p className=" text-white font-semibold">{para}</p>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
