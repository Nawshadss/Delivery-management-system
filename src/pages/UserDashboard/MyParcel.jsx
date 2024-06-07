import React from "react";
import AxiosPublic from "../../hooks/AxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const MyParcel = () => {
  const axiosPub = AxiosPublic();
  const { userState } = useAuth();
  const { data: myparcels = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPub.get(`/myparcel/${userState.email}`);
      return res.data;
    },
  });
  console.log(myparcels);
  return (
    <div>
      <div className="overflow-x-auto overflow-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Parcel Type</th>
              <th> Approximate Delivery Date,</th>
              <th>Requested Delivery Date</th>
              <th>Booking Date</th>
              <th>Delivery Men ID</th>
              <th>Booking Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {myparcels.map((data, index) => (
              <tr key={index}>
                <th>{1 + index}</th>
                <td>{data.parcelType}</td>
                <td> {data?.approxDate ? data.approxDate : "not yet given"}</td>
                <td>{data.requestedDeliveryDate}</td>
                <td>{data?.bookingDate}</td>
                <td>
                  {data?.delivaryManId
                    ? data.delivaryManId
                    : "not yet assaigned"}
                </td>
                <td>{data.status}</td>
                {data.status === "pending" && (
                  <>
                    <td>
                      <button>Cancel</button>
                    </td>
                    <td>
                      <button>Update</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcel;
