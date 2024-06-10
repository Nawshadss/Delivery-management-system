import React from "react";
import CountUp from "react-countup";
import { FaBoxOpen } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import "../App.css";

const statCard = ({ data }) => {
  return (
    <div>
      <div className=" min-w-48 bg my-4">
        <div className="stat">
          <div className="stat-title text-center text-white">{data.title}</div>
          <div className="stat-value text-center flex items-center justify-between">
            {data.count}
            <div className="hover:scale-150 transition-all">
              {data.title === "Total Users" && (
                <FaUserFriends className="text-2xl" />
              )}
              {data.title === "Total Booked Parcel" && (
                <FaBoxOpen className="text-2xl" />
              )}
              {data.title === "Total Parcel Delivered" && (
                <TbTruckDelivery className="text-2xl" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default statCard;
