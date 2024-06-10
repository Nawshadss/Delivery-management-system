import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const Sidebar = () => {
  const { userState } = useAuth();
  const [user, setUser] = useState({});

  console.log(userState?.email);
  useEffect(() => {
    axios
      .get(
        `https://assaignment12-server-site.vercel.app/user/${userState.email}`
      )
      .then((data) => {
        console.log(data);
        setUser(data.data);
      });
  }, []);
  const links = (
    <>
      <li>
        <NavLink to={`/dashboard/${userState.email}`}>My Profile</NavLink>
      </li>
      {userState && user.category === "User" && (
        <>
          <li>
            <NavLink to="/dashboard/bookparcel">- Book a Parcel</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/myparcel">My Parcels</NavLink>
          </li>
        </>
      )}
      {userState && user.category === "Delivery Man" && (
        <>
          <li>
            <NavLink to="/dashboard/MyDeliveryList">My Delivery List</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/reviews">My Reviews</NavLink>
          </li>
        </>
      )}
      {userState && user.role === "admin" && (
        <>
          <li>
            <NavLink to="/dashboard/admin/allusers">All Users</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/admin/allparcels">All Parcels</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/admin/allDeliveryMan">
              , All Delivery Men
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/admin/statistics">Statistics</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary w-full drawer-button lg:hidden"
          >
            Open Side Menu
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            {links}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
