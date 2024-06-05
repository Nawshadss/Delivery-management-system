import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logo.png";
import useAuth from "../../../hooks/useAuth.jsx";

const Navbar = () => {
  const { userState, handlesignOut, loading } = useAuth();
  // const [user, setUser] = useState({});
  const logOut = () => {
    handlesignOut().then((data) => console.log(data));
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="home"></NavLink>
      </li>
      <li>
        <NavLink to="home">Home</NavLink>
      </li>
      <li>
        <NavLink to="home">Home</NavLink>
      </li>
    </>
  );
  return (
    <div className="">
      <div className="navbar bg-[#192a56] ">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            ></div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {links}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">
            {" "}
            <img src={logo} alt="" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white font-semibold">
            {links}
          </ul>
        </div>
        <div>
          <div className="  navbar flex gap-3">
            {userState ? (
              <>
                <div className="dropdown">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn m-1 bg-transparent border-none"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        className="rounded-full h-10"
                        alt="Tailwind CSS Navbar component"
                        src={userState.photoURL}
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[20] menu p-2 shadow bg-base-100 rounded-box w-52 "
                  >
                    <li>
                      <button onClick={logOut}>logOUt</button>
                    </li>
                    <li>
                      <a>{userState.displayName}</a>
                    </li>
                    <li>
                      <Link to={`/dashboard/${userState.email}`}>
                        Dashboard
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn">
                  LogIn
                </Link>
                <Link to="/register" className="btn">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
