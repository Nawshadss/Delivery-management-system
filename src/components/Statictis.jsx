import React from "react";
import Heading from "./Heading";
import StatCard from "./statCard";

const Statictis = ({ countData }) => {
  // console.log(countData);
  return (
    <div>
      <Heading heading={"About Our Website"}></Heading>

      <div className="flex flex-row flex-wrap justify-around">
        {countData.map((data) => (
          <StatCard data={data}></StatCard>
        ))}
      </div>
    </div>
  );
};

export default Statictis;
