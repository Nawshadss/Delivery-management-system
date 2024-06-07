import React from "react";
import AxiosPublic from "../hooks/AxiosPublic";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Manipulation } from "swiper/modules";

const Modal = ({ parcel }) => {
  const Parcel = parcel;
  const axiosPub = AxiosPublic();
  const { data: allDeliveryMan = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPub.get("/allDelivaryMan");
      return res.data;
    },
  });
  console.log(allDeliveryMan);
  const assaignParcel = (manId, parcelId) => {
    axios
      .post(`http://localhost:5000/assaignParcel/${manId}`, Parcel)
      .then((res) => {
        console.log(res.data);
        refetch();
      });
    console.log(manId);
  };
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        open modal
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>

                  <th>Total Delivary</th>
                  <th>Avarage Tatings</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}

                {allDeliveryMan.map((data, index) => (
                  <tr key={data._id}>
                    <th>{index + 1}</th>
                    <td>{data.name}</td>

                    <td>{data.totalParcelDelivered}</td>
                    <td>
                      {(
                        data.averageRatings / data.totalParcelDelivered
                      ).toFixed(2)}
                    </td>
                    <td>
                      <button
                        onClick={() => assaignParcel(data._id, parcel._id)}
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
