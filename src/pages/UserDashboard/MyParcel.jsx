import React from "react";
import AxiosPublic from "../../hooks/AxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyParcel = () => {
  const axiosPub = AxiosPublic();
  const { userState } = useAuth();
  const { data: myparcels = [], refetch } = useQuery({
    queryKey: ["myparcel"],
    queryFn: async () => {
      const res = await axiosPub.get(`/myparcel/${userState.email}`);
      return res.data;
    },
  });
  const handleDelete = (id) => {
    axiosPub.patch(`/deleteParcel/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Parcel added",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };
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
                <td> {data?.approxDate}</td>
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
                      <button onClick={() => handleDelete(data._id)}>
                        Cancel
                      </button>
                    </td>
                    <td>
                      <button>
                        <Link to={`/dashboard/update/${data._id}`}>Update</Link>
                      </button>
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
