import React, { useEffect, useState } from "react";
import AxiosPublic from "../../hooks/AxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";

const MyDeliveryList = () => {
  const axiosPub = AxiosPublic();
  const { userState } = useAuth();
  const [user, setUser] = useState({});
  useEffect(() => {
    axiosPub
      .get(`http://localhost:5000/user/${userState.email}`)
      .then((res) => setUser(res.data));
  }, []);
  console.log(user);
  const { data: delivaryList = [], refetch } = useQuery({
    queryKey: ["delivaryList"],
    queryFn: async () => {
      const res = await axiosPub.get(`/deliveryList/${user._id}`);
      return res.data;
    },
  });
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
