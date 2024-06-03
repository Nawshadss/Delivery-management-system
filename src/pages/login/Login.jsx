import React, { useContext } from "react";
import "./Login.css";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth.jsx";
import { AuthProvider } from "../../context/AuthContext.jsx";
import { GoogleAuthProvider } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
// 1F8FFF 192a56
const Login = () => {
  const navigate = useNavigate();
  const { logInUser } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const provider = new GoogleAuthProvider();
  const onSubmit = (data) => {
    console.log(data);
    logInUser(data.email, data.password).then((res) => {
      console.log(res);
      navigate("/");
    });
  };
  const { googleSignInPop } = useContext(AuthProvider);
  const handleGoogleLogin = () => {
    googleSignInPop(provider).then((res) => {
      console.log(res);
      navigate("/");
    });
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="email"
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-error">This field is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="password"
                className="input input-bordered"
                required
              />
              {errors.password && (
                <span className="text-error">This field is required</span>
              )}
            </div>
            <div className="form-control mt-6">
              <input
                value="Login"
                type="submit"
                className="btn bg-[#1F8FFF] text-white font-bold"
              />
            </div>
          </form>
          <div>
            Dont have an acount?
            <Link className="link text-blue-600" to="/register">
              Register here...
            </Link>
          </div>
          <div className="form-control  flex">
            <button className="btn  w-36 mx-auto mb-4">
              <FcGoogle onClick={handleGoogleLogin} className="w-12 h-8" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
