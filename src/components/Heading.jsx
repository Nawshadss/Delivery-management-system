import React from "react";

const Heading = ({ heading }) => {
  return (
    <div>
      <h1 className="text-center py-3 text-4xl font-bold text-white">
        {heading}
      </h1>
    </div>
  );
};

export default Heading;
