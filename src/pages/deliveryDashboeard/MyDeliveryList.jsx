import React, { useEffect, useState } from "react";
import AxiosPublic from "../../hooks/AxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const MyDeliveryList = () => {
  const axiosPub = AxiosPublic();
  const { userState } = useAuth();
  const [user, setUser] = useState({});
  useEffect(() => {
    axiosPub
      .get(
        `https://assaignment12-server-site.vercel.app/user/${userState.email}`
      )
      .then((res) => setUser(res.data));
    refetch();
  }, []);
  console.log(user);
  const { data: delivaryList = [], refetch } = useQuery({
    queryKey: ["delivaryList"],
    queryFn: async () => {
      const res = await axiosPub.get(`/mydeliveryList/${userState.email}`);
      return res.data;
    },
  });

  const handleCancel = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,Cancel Delivery",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPub
          .patch(`/cancelDelivery/${id}?email=${userState.email}`, user)
          .then((data) => {
            refetch();
            console.log(data.data);
            Swal.fire({
              title: "Canceled",
              text: "Your file has been deleted.",
              icon: "success",
            });
          });
      }
    });
  };

  const handleDelivered = (id) => {
    Swal.fire({
      title: "Is Your Parcel Delivered",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPub
          .patch(`/delivered/${id}?email=${userState.email}`, user)
          .then((data) => {
            refetch();
            console.log(data.data);
            Swal.fire({
              title: "Canceled",
              text: "Your file has been deleted.",
              icon: "success",
            });
          });
      }
    });
  };
  console.log(delivaryList);
  return (
    <div>
      <h1 className="text-4xl text-center font-bold">My delivery List</h1>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Booked User’s Name</th>
              <th>Receivers Name</th>
              <th>Booked User’s Phone</th>
              <th>Requested Delivery Date</th>
              <th>Approximate Delivery Date</th>
              <th>Recievers phone number</th>
              <th>Recievers Adress</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {delivaryList.map((data, index) => (
              <tr key={data._id}>
                <th>{1 + index}</th>
                <td>{data?.parcelBookerName}</td>
                <td>{data.receiverName}</td>
                <td>{data.phoneNumber}</td>
                <td>{data.requestedDeliveryDate}</td>
                <td>{data?.approxDate}</td>
                <td>{data?.receiverPhoneNumber}</td>
                <td>{data?.parcelDeliveryAddress}</td>
                <td>
                  <button onClick={() => handleCancel(data._id)}>Cancel</button>
                </td>
                <td>
                  <button onClick={() => handleDelivered(data._id)}>
                    Delivered
                  </button>
                </td>
              </tr>
            ))}
            {/* row 2 */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDeliveryList;
