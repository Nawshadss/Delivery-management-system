import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { FaFileUpload } from "react-icons/fa";
import AxiosPublic from "../../hooks/AxiosPublic";
import { updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";

const DashBoearMenu = () => {
  const { userState } = useAuth();
  const axiosPub = AxiosPublic();
  const [user, setUser] = useState({});
  const [file, setFile] = useState({});

  console.log(userState?.email);
  const hnadlefile = (e) => {
    console.log(e.target.files);
    setFile(e.target.files[0]);
  };
  const hnadleupdateProfile = (e) => {
    e.preventDefault();
    console.log(file);
    const image = { image: file };
    axios
      .post(
        `https://api.imgbb.com/1/upload?key=e86e00c66324e00c118eac3676b4a582`,
        image,
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((res) => {
        console.log(res.data.data);
        updateProfile(auth.currentUser, {
          displayName: userState.displayName,
          photoURL: res.data.data.display_url,
        })
          .then((res) => window.location.reload())
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    e.target.reset();
  };
  useEffect(() => {
    axios
      .get(
        `https://assaignment12-server-site.vercel.app/user/${userState.email}`
      )
      .then((data) => {
        setUser(data.data);
        console.log(data.data);
      });
  }, []);
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col ">
          <img
            className="border-[10px] max-h-[500px] p-6"
            src={userState.photoURL}
          />
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
          <h1 className="text-center text-3xl">Update Profile Picture</h1>
          <form onSubmit={hnadleupdateProfile}>
            <div>
              <label htmlFor="file">
                <input
                  onChange={hnadlefile}
                  type="file"
                  name="file"
                  required
                  className="file-input w-full max-w-xs"
                />
              </label>
            </div>
            <button type="submit">Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DashBoearMenu;
