import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import AxiosPublic from "../../hooks/AxiosPublic";
import Swal from "sweetalert2";

const Update = () => {
  const parcel = useLoaderData();
  const axiosPub = AxiosPublic();
  const [updatedParce, setUpdatedParcel] = useState({});
  console.log(parcel);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newParcel = {
      phoneNumber: e.target.phoneNumber.value,
      parcelType: e.target.parcelType.value,
      parcelWeight: e.target.parcelWeight.value,
      receiverName: e.target.receiverName.value,
      receiverPhoneNumber: e.target.receiverPhoneNumber.value,
      parcelDeliveryAddress: e.target.parcelDeliveryAddress.value,
      requestedDeliveryDate: e.target.requestedDeliveryDate.value,
      deliveryAddressLatitude: e.target.deliveryAddressLatitude.value,
      deliveryAddressLongitude: e.target.deliveryAddressLongitude.value,
      price: e.target.price.value,
    };
    console.log(newParcel);
    axiosPub.patch(`/updateParcel/${parcel._id}`, newParcel).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Parcel Updated",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <div>
      <div
        className="border rounded-md"
        style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="border rounded-md" style={{ marginBottom: "15px" }}>
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              defaultValue={parcel.phoneNumber}
              className="border rounded-md"
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>

          <div className="border rounded-md" style={{ marginBottom: "15px" }}>
            <label>Parcel Type</label>
            <input
              type="text"
              name="parcelType"
              defaultValue={parcel.parcelType}
              className="border rounded-md"
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>

          <div className="border rounded-md" style={{ marginBottom: "15px" }}>
            <label>Parcel Weight</label>
            <input
              type="number"
              name="parcelWeight"
              defaultValue={parcel.parcelWeight}
              className="border rounded-md"
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>

          <div className="border rounded-md" style={{ marginBottom: "15px" }}>
            <label>Receiver’s Name</label>
            <input
              type="text"
              name="receiverName"
              defaultValue={parcel.receiverName}
              className="border rounded-md"
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>

          <div className="border rounded-md" style={{ marginBottom: "15px" }}>
            <label>Receiver's Phone Number</label>
            <input
              type="text"
              name="receiverPhoneNumber"
              defaultValue={parcel.receiverPhoneNumber}
              className="border rounded-md"
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>

          <div className="border rounded-md" style={{ marginBottom: "15px" }}>
            <label>Parcel Delivery Address</label>
            <input
              type="text"
              name="parcelDeliveryAddress"
              defaultValue={parcel.parcelDeliveryAddress}
              className="border rounded-md"
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>

          <div className="border rounded-md" style={{ marginBottom: "15px" }}>
            <label>Requested Delivery Date</label>
            <input
              type="date"
              name="requestedDeliveryDate"
              defaultValue={parcel.requestedDeliveryDate}
              className="border rounded-md"
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>

          <div className="border rounded-md" style={{ marginBottom: "15px" }}>
            <label>Delivery Address Latitude</label>
            <input
              type="number"
              step="any"
              name="deliveryAddressLatitude"
              defaultValue={parcel.deliveryAddressLatitude}
              className="border rounded-md"
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>

          <div className="border rounded-md" style={{ marginBottom: "15px" }}>
            <label>Delivery Address Longitude</label>
            <input
              type="number"
              step="any"
              name="deliveryAddressLongitude"
              defaultValue={parcel.deliveryAddressLongitude}
              className="border rounded-md"
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>

          <div className="border rounded-md" style={{ marginBottom: "15px" }}>
            <label>Price</label>
            <input
              type="text"
              name="price"
              defaultValue={parcel.price}
              readOnly
              className="border rounded-md"
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>

          <button
            type="submit"
            className="border rounded-md"
            style={{
              padding: "10px 15px",
              background: "blue",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
