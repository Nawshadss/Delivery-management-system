import React, { useEffect, useState } from "react";
import AxiosPublic from "../../hooks/AxiosPublic";
import { TbTruckDelivery } from "react-icons/tb";

const AllDeliverayMan = () => {
  const axioPub = AxiosPublic();
  const [delivaryMan, setDelivaryMan] = useState([]);
  useEffect(() => {
    axioPub.get("/allDelivaryMan").then((res) => {
      setDelivaryMan(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Category</th>
              <th>Total Delivary</th>
              <th>Avarage Tatings</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {delivaryMan.map((data, index) => (
              <tr key={data._id}>
                <th>{index + 1}</th>
                <td>{data.name}</td>
                <td>{data.category}</td>
              </tr>
            ))}
            {/* row 2 */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllDeliverayMan;
