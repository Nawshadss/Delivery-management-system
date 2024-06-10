import React, { useState } from "react";
import AxiosPublic from "../hooks/AxiosPublic";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Manipulation } from "swiper/modules";
import Swal from "sweetalert2";

const Modal = ({ parcel, rfetch }) => {
  const [approxDate, setApproxDate] = useState("");
  const Parcel = parcel;
  const axiosPub = AxiosPublic();
  const { data: allDeliveryMan = [], refetch } = useQuery({
    queryKey: ["allDeliveryMan"],
    queryFn: async () => {
      const res = await axiosPub.get("/allDelivaryMan");
      return res.data;
    },
  });
  console.log(allDeliveryMan);
  const handleChange = (e) => {
    setApproxDate(e.target.value);
  };
  const assaignParcel = (manId, email) => {
    const parcelWihtDate = {
      ...Parcel,
      approxDate: approxDate,
    };
    axios
      .post(
        `https://assaignment12-server-site.vercel.app/assaignParcel/${manId}?email=${email}`,
        parcelWihtDate
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.update.modifiedCount > 0) {
          rfetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Parcel assaignged",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Already assaigned added",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    console.log(parcelWihtDate);
  };
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Manage
      </button>
      <dialog id="my_modal_1" className="modal ">
        <div className="modal-box ">
          <div className="overflow-x-auto ">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>

                  <th>Total Delivary</th>
                  <th>Avarage Tatings</th>
                  <th>Set Approx date</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}

                {allDeliveryMan.map((data, index) => (
                  <tr key={data._id} className="text-black">
                    <th>{index + 1}</th>
                    <td>{data.name}</td>

                    <td>{data.totalParcelDelivered}</td>
                    <td>
                      {isNaN(
                        (
                          data.averageRatings / data.totalParcelDelivered
                        ).toFixed(2)
                      )
                        ? 0
                        : (
                            data.averageRatings / data.totalParcelDelivered
                          ).toFixed(2)}
                    </td>
                    <td>
                      <input onChange={handleChange} type="date" />
                    </td>
                    <td>
                      <button
                        onClick={() => assaignParcel(data._id, data.email)}
                      >
                        Assaingn Parcel
                      </button>
                    </td>
                  </tr>
                ))}
                {/* row 2 */}
              </tbody>
            </table>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
