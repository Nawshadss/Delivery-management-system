import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import AxiosPublic from "../../hooks/AxiosPublic.jsx";
import Swal from "sweetalert2";
import axios from "axios";

const BookParcel = () => {
  const { userState } = useAuth();
  const axiosPub = AxiosPublic();
  const [user, setUser] = useState({});

  console.log(userState.email);
  useEffect(() => {
    axios.get(`http://localhost:5000/user/${userState.email}`).then((data) => {
      setUser(data.data);
      console.log(data.data.name);
    });
  }, []);

  const [formData, setFormData] = useState({
    phoneNumber: "",
    parcelType: "",
    parcelWeight: 0,
    receiverName: "",
    receiverPhoneNumber: "",
    parcelDeliveryAddress: "",
    requestedDeliveryDate: "",
    deliveryAddressLatitude: "",
    deliveryAddressLongitude: "",
    price: 0,
    status: "pending",
    bookingDate: new Date().toJSON().slice(0, 10),
    parcelBookerName: userState.displayName,
    parcelEmail: userState.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const calculatePrice = (weight) => {
    if (weight <= 1) return 50;
    if (weight == 2) return 100;
    return 150;
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      price: calculatePrice(prevData.parcelWeight),
    }));
  }, [formData.parcelWeight]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resut = await axiosPub.post(
      `/bookparcel/${userState.email}`,
      formData
    );
    console.log(formData);
    if (resut.data.result.acknowledged) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Parcel added",
        showConfirmButton: false,
        timer: 1500,
      });
      e.target.reset();
    }
  };

  return (
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
            value={formData.phoneNumber}
            onChange={handleChange}
            className="border rounded-md"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div className="border rounded-md" style={{ marginBottom: "15px" }}>
          <label>Parcel Type</label>
          <input
            type="text"
            name="parcelType"
            value={formData.parcelType}
            onChange={handleChange}
            className="border rounded-md"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div className="border rounded-md" style={{ marginBottom: "15px" }}>
          <label>Parcel Weight</label>
          <input
            type="number"
            name="parcelWeight"
            value={formData.parcelWeight}
            onChange={handleChange}
            className="border rounded-md"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div className="border rounded-md" style={{ marginBottom: "15px" }}>
          <label>Receiver’s Name</label>
          <input
            type="text"
            name="receiverName"
            value={formData.receiverName}
            onChange={handleChange}
            className="border rounded-md"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div className="border rounded-md" style={{ marginBottom: "15px" }}>
          <label>Receiver's Phone Number</label>
          <input
            type="text"
            name="receiverPhoneNumber"
            value={formData.receiverPhoneNumber}
            onChange={handleChange}
            className="border rounded-md"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div className="border rounded-md" style={{ marginBottom: "15px" }}>
          <label>Parcel Delivery Address</label>
          <input
            type="text"
            name="parcelDeliveryAddress"
            value={formData.parcelDeliveryAddress}
            onChange={handleChange}
            className="border rounded-md"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div className="border rounded-md" style={{ marginBottom: "15px" }}>
          <label>Requested Delivery Date</label>
          <input
            type="date"
            name="requestedDeliveryDate"
            value={formData.requestedDeliveryDate}
            onChange={handleChange}
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
            value={formData.deliveryAddressLatitude}
            onChange={handleChange}
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
            value={formData.deliveryAddressLongitude}
            onChange={handleChange}
            className="border rounded-md"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div className="border rounded-md" style={{ marginBottom: "15px" }}>
          <label>Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
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
          Book
        </button>
      </form>
    </div>
  );
};

export default BookParcel;
