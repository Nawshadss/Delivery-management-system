import React from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, updateProfile } from "firebase/auth";
const provider = new GoogleAuthProvider();
import useAuth from "../../hooks/useAuth.jsx";
import { useForm } from "react-hook-form";
import AxiosPublic from "../../hooks/AxiosPublic.jsx";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase/firebase.config.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const iamgeHostingKey = "e86e00c66324e00c118eac3676b4a582";
const Register = () => {
  const navigate = useNavigate();
  const axiosPublic = AxiosPublic();
  const { googleSignInPop, userState, creatNewUser } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const { email, category, name, password, image, number } = data;

    const user = {
      email,
      category,
      name,
      password,
      image: image,
      number,
    };
    axiosPublic.post("/register", user).then((data) => console.log(data.data));
    creatNewUser(email, password)
      .then((data) => {
        console.log(data);
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: user.image,
        })
          .then((res) => {
            console.log(res);
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err);
        toast("Email Already Exist");
      });
  };

  const handleGoogleLogin = () => {
    googleSignInPop(provider).then((res) => {
      console.log(res);

      axiosPublic
        .post(`/googlesignin/${userState.email}`, userState)
        .then((data) => console.log(data.data));
      navigate("/");
    });
  };
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <ToastContainer />
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="name"
                  className="input input-bordered"
                  required
                />
                {errors.name && (
                  <span className="text-error">This field is required</span>
                )}
              </div>
              <label htmlFor="select">Choose Category</label>
              <div className="form-control border rounded-lg">
                <select
                  defaultValue=" What you want to sign in as"
                  {...register("category", { required: true })}
                  className="select w-full max-w-xs"
                >
                  <option>User</option>
                  <option>Delivery Man</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
                {errors.email && (
                  <span className="text-error">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Number</span>
                </label>
                <input
                  type="number"
                  {...register("number", { required: true })}
                  placeholder="number"
                  className="input input-bordered"
                  required
                />
                {errors.number && (
                  <span className="text-error">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register(
                    "password",

                    {
                      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                    },
                    { required: true }
                  )}
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                {errors.password?.type === "required" && (
                  <span className="text-error">This field is required</span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-error">
                    Password must contain one uppercase one lowercase and number
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">ImageUlr</span>
                </label>
                <input
                  type="text"
                  {...register("image", { required: true })}
                  placeholder="name"
                  className="input input-bordered"
                  required
                />
                {errors.image && (
                  <span className="text-error">This field is required</span>
                )}
              </div>
              <input
                className="btn bg-[#1F8FFF] text-white font-bold"
                type="submit"
              />
              <div>
                Already have and accoutn
                <Link to="/login" className="link text-blue-600">
                  LogIn here...
                </Link>
              </div>
              <button className="btn  w-36 mx-auto mb-4">
                <FcGoogle onClick={handleGoogleLogin} className="w-12 h-8" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
