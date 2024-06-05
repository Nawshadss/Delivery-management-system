import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const DashBoearMenu = () => {
  const { userState } = useAuth();
  const [user, setUser] = useState({});

  console.log(userState?.email);
  useEffect(() => {
    fetch(`http://localhost:5000/user/${userState.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        console.log(data);
      });
  }, []);
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col ">
          <img src={userState.photoURL} />
          <div>
            <h1 className="text-5xl font-bold">User Name:{user.name}</h1>
            <h1 className="text-4xl font-bold my-4">
              User Category:{user.category}
            </h1>
            <h1 className="text-2xl font-bold">User Id:{user._id}</h1>
            {user.role === "admin" && (
              <p className="text-2xl font-bold">User Role:Admin</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoearMenu;
