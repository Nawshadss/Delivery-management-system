import React from "react";
import AxiosPublic from "../../hooks/AxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Modal from "../../components/Modal";

const AllParcels = () => {
  const axiosPub = AxiosPublic();
  const { data: allParcels = [], refetch } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axiosPub.get("/allparcel");
      return res.data;
    },
  });
  console.log(allParcels);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Booker's Name</th>
              <th>Booker's Number</th>
              <th>Requested Delivery Date</th>
              <th>Cost </th>
              <th>Status </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {allParcels.map((data, index) => (
              <tr key={data._id}>
                <th>{1 + index}</th>
                <td>{data.parcelBookerName}</td>
                <td>{data?.phoneNumber}</td>

                <td>{data.requestedDeliveryDate}</td>
                <td>{data.price}</td>
                <td>{data.status}</td>
                {data.status !== "pending" ? (
                  <td>
                    <button>Already Assaigned</button>
                  </td>
                ) : (
                  <td>
                    <button className="bg-transparent">
                      <Modal parcel={data}></Modal>
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllParcels;
