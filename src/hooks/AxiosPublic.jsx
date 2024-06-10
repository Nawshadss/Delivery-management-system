import React from "react";
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://assaignment12-server-site.vercel.app",
});

const AxiosPublic = () => {
  return axiosPublic;
};

export default AxiosPublic;
